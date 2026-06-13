import express from 'express';
import { randomUUID } from 'crypto';
import { query, getClient } from '../db.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// helper to shape product with nested sections/items
async function fetchProductBySlug(slug) {
  const { rows: prodRows } = await query(
    'SELECT id, slug, title, category, model_no, summary, main_image, features FROM products WHERE slug=$1',
    [slug]
  );
  if (!prodRows.length) return null;
  const product = prodRows[0];

  const { rows: sectionRows } = await query(
    'SELECT id, heading, position FROM sections WHERE product_id=$1 ORDER BY position ASC, created_at ASC',
    [product.id]
  );

  const sectionIds = sectionRows.map(s => s.id);
  let itemRows = [];
  if (sectionIds.length) {
    const placeholders = sectionIds.map((_, i) => `$${i + 1}`).join(',');
    const { rows } = await query(
      `SELECT id, section_id, name, model_no, description, image, position FROM section_items WHERE section_id IN (${placeholders}) ORDER BY position ASC, created_at ASC`,
      sectionIds
    );
    itemRows = rows;
  }

  const sections = sectionRows.map(s => ({
    id: s.id,
    title: s.heading,
    position: s.position,
    items: itemRows.filter(it => it.section_id === s.id).map(it => ({
      id: it.id,
      name: it.name,
      modelNo: it.model_no,
      description: it.description,
      image: it.image,
      position: it.position,
    }))
  }));

  return {
    id: product.id,
    slug: product.slug,
    title: product.title,
    category: product.category,
    modelNo: product.model_no,
    summary: product.summary,
    mainImage: product.main_image,
    features: product.features || [],
    sections,
  };
}

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const { category, search, include } = req.query;
    const clauses = [];
    const params = [];
    if (category) {
      params.push(category);
      clauses.push(`category=$${params.length}`);
    }
    if (search) {
      params.push(`%${search}%`);
      clauses.push(`(title ILIKE $${params.length} OR summary ILIKE $${params.length})`);
    }

    const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
    // Return products in a stable, natural order so they match how they were seeded
    const { rows } = await query(
      `SELECT slug FROM products ${where} ORDER BY created_at ASC, title ASC LIMIT 200`,
      params
    );

    if (include === 'full') {
      const results = [];
      for (const r of rows) {
        const p = await fetchProductBySlug(r.slug);
        if (p) results.push(p);
      }
      return res.json(results);
    } else {
      // lightweight list
      const light = [];
      for (const r of rows) {
        const { rows: pr } = await query(
          'SELECT slug, title, category, model_no, main_image, summary FROM products WHERE slug=$1',
          [r.slug]
        );
        if (pr.length) {
          light.push({
            slug: pr[0].slug,
            title: pr[0].title,
            category: pr[0].category,
            modelNo: pr[0].model_no,
            image: pr[0].main_image,
            description: pr[0].summary,
          });
        }
      }
      return res.json(light);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/products/:slug
router.get('/:slug', async (req, res) => {
  try {
    const product = await fetchProductBySlug(req.params.slug);
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/products/upload  (image upload)
router.post('/upload', requireAuth, upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file' });
    const publicPath = `/uploads/${file.filename}`;
    res.json({ path: publicPath });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// POST /api/products (create product with nested sections)
router.post('/', requireAuth, async (req, res) => {
  const client = await getClient();
  try {
    const { slug, title, category, modelNo, summary, mainImage, features = [], sections = [] } = req.body || {};
    if (!slug || !title || !category) return res.status(400).json({ error: 'slug, title, category required' });

    await client.query('BEGIN');
    const prodId = randomUUID();
    await client.query(
      'INSERT INTO products (id, slug, title, category, model_no, summary, main_image, features, created_at, updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8, now(), now())',
      [prodId, slug, title, category, modelNo || null, summary || null, mainImage || null, features]
    );

    for (let i = 0; i < sections.length; i++) {
      const sec = sections[i];
      const secId = randomUUID();
      await client.query(
        'INSERT INTO sections (id, product_id, heading, position, created_at) VALUES ($1,$2,$3,$4, now())',
        [secId, prodId, sec.title, i]
      );
      const items = Array.isArray(sec.items) ? sec.items : [];
      for (let j = 0; j < items.length; j++) {
        const it = items[j];
        const itemId = randomUUID();
        await client.query(
          'INSERT INTO section_items (id, section_id, name, model_no, description, image, position, created_at) VALUES ($1,$2,$3,$4,$5,$6,$7, now())',
          [itemId, secId, it.name, it.modelNo || null, it.description || null, it.image || null, j]
        );
      }
    }

    await client.query('COMMIT');
    const product = await fetchProductBySlug(slug);
    res.status(201).json(product);
  } catch (err) {
    await client.query('ROLLBACK');
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ error: 'Create failed' });
  } finally {
    client.release();
  }
});

// PUT /api/products/:slug (update + replace sections/items)
router.put('/:slug', requireAuth, async (req, res) => {
  const client = await getClient();
  try {
    const slug = req.params.slug;
    const { slug: newSlug, title, category, modelNo, summary, mainImage, features = [], sections = [] } = req.body || {};
    const { rows } = await client.query('SELECT id FROM products WHERE slug=$1', [slug]);
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    const prodId = rows[0].id;

    await client.query('BEGIN');
    await client.query(
      'UPDATE products SET slug=$1, title=$2, category=$3, model_no=$4, summary=$5, main_image=$6, features=$7, updated_at=now() WHERE id=$8',
      [newSlug || slug, title, category, modelNo || null, summary || null, mainImage || null, features, prodId]
    );

    // replace sections/items (simpler for now)
    await client.query('DELETE FROM section_items WHERE section_id IN (SELECT id FROM sections WHERE product_id=$1)', [prodId]);
    await client.query('DELETE FROM sections WHERE product_id=$1', [prodId]);

    for (let i = 0; i < sections.length; i++) {
      const sec = sections[i];
      const secId = randomUUID();
      await client.query(
        'INSERT INTO sections (id, product_id, heading, position, created_at) VALUES ($1,$2,$3,$4, now())',
        [secId, prodId, sec.title, i]
      );
      const items = Array.isArray(sec.items) ? sec.items : [];
      for (let j = 0; j < items.length; j++) {
        const it = items[j];
        const itemId = randomUUID();
        await client.query(
          'INSERT INTO section_items (id, section_id, name, model_no, description, image, position, created_at) VALUES ($1,$2,$3,$4,$5,$6,$7, now())',
          [itemId, secId, it.name, it.modelNo || null, it.description || null, it.image || null, j]
        );
      }
    }

    await client.query('COMMIT');
    const product = await fetchProductBySlug(newSlug || slug);
    res.json(product);
  } catch (err) {
    await client.query('ROLLBACK');
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ error: 'Update failed' });
  } finally {
    client.release();
  }
});

// DELETE /api/products/:slug
router.delete('/:slug', requireAuth, async (req, res) => {
  const client = await getClient();
  try {
    const slug = req.params.slug;
    await client.query('BEGIN');
    const { rows } = await client.query('SELECT id FROM products WHERE slug=$1', [slug]);
    if (!rows.length) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Not found' });
    }
    const prodId = rows[0].id;
    await client.query('DELETE FROM section_items WHERE section_id IN (SELECT id FROM sections WHERE product_id=$1)', [prodId]);
    await client.query('DELETE FROM sections WHERE product_id=$1', [prodId]);
    await client.query('DELETE FROM products WHERE id=$1', [prodId]);
    await client.query('COMMIT');
    res.json({ ok: true });
  } catch (err) {
    await client.query('ROLLBACK');
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ error: 'Delete failed' });
  } finally {
    client.release();
  }
});

export default router;
