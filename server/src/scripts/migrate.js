import { query } from '../db.js';

async function migrate() {
  await query(`CREATE EXTENSION IF NOT EXISTS pgcrypto;`);

  await query(`CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
  );`);

  await query(`DO $$ BEGIN
    CREATE TYPE product_category AS ENUM ('uniforms','shoes');
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;`);

  await query(`CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category product_category NOT NULL,
    model_no TEXT,
    summary TEXT,
    main_image TEXT,
    features TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
  );`);

  await query(`CREATE TABLE IF NOT EXISTS sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    heading TEXT NOT NULL,
    position INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
  );`);

  await query(`CREATE TABLE IF NOT EXISTS section_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_id UUID REFERENCES sections(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    model_no TEXT,
    description TEXT,
    image TEXT,
    position INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
  );`);

  // eslint-disable-next-line no-console
  console.log('Migrations complete');
  process.exit(0);
}

migrate().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
