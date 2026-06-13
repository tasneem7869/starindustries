import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFetch } from '@/services/apiClient';
import { getToken } from '@/services/auth';

function TextInput({ label, required, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        {...props}
        required={required}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#c9a962]/60 focus:border-[#c9a962]"
      />
    </div>
  );
}

function TextArea({ label, required, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <textarea
        {...props}
        required={required}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-[100px] bg-white focus:outline-none focus:ring-2 focus:ring-[#c9a962]/60 focus:border-[#c9a962]"
      />
    </div>
  );
}

export default function ProductEditor({ mode }) {
  const { slug } = useParams();
  const token = getToken();
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    slug: '',
    title: '',
    category: 'uniforms',
    modelNo: '',
    summary: '',
    mainImage: '',
    features: [],
    sections: [],
  });
  const [slugTouched, setSlugTouched] = useState(false);

  const isEdit = useMemo(() => mode === 'edit', [mode]);

  useEffect(() => {
    async function load() {
      if (!isEdit || !slug) return;
      try {
        const data = await apiFetch(`/products/${slug}`);
        setForm({
          slug: data.slug,
          title: data.title,
          category: data.category,
          modelNo: data.modelNo || '',
          summary: data.summary || '',
          mainImage: data.mainImage || '',
          features: data.features || [],
          sections: (data.sections || []).map((s) => ({
            title: s.title,
            items: (s.items || []).map((it) => ({
              name: it.name,
              modelNo: it.modelNo || '',
              description: it.description || '',
              image: it.image || '',
            })),
          })),
        });
      } catch (e) {
        setError('Failed to load product');
      }
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, slug]);

  function setField(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function slugify(v) {
    return (v || '')
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function addFeature() {
    setForm((f) => ({ ...f, features: [...(f.features || []), ''] }));
  }
  function updateFeature(i, val) {
    setForm((f) => {
      const next = [...(f.features || [])];
      next[i] = val;
      return { ...f, features: next };
    });
  }
  function removeFeature(i) {
    setForm((f) => ({ ...f, features: (f.features || []).filter((_, idx) => idx !== i) }));
  }

  function addSection() {
    setForm((f) => ({ ...f, sections: [...(f.sections || []), { title: '', items: [] }] }));
  }
  function updateSectionTitle(i, val) {
    setForm((f) => {
      const next = [...(f.sections || [])];
      next[i] = { ...next[i], title: val };
      return { ...f, sections: next };
    });
  }
  function removeSection(i) {
    setForm((f) => ({ ...f, sections: (f.sections || []).filter((_, idx) => idx !== i) }));
  }

  function addItem(sectionIndex) {
    setForm((f) => {
      const next = [...(f.sections || [])];
      const sec = next[sectionIndex];
      sec.items = [...(sec.items || []), { name: '', modelNo: '', description: '', image: '' }];
      next[sectionIndex] = { ...sec };
      return { ...f, sections: next };
    });
  }
  function updateItem(sectionIndex, itemIndex, key, val) {
    setForm((f) => {
      const next = [...(f.sections || [])];
      const sec = { ...next[sectionIndex] };
      const items = [...(sec.items || [])];
      items[itemIndex] = { ...items[itemIndex], [key]: val };
      sec.items = items;
      next[sectionIndex] = sec;
      return { ...f, sections: next };
    });
  }
  function removeItem(sectionIndex, itemIndex) {
    setForm((f) => {
      const next = [...(f.sections || [])];
      const sec = { ...next[sectionIndex] };
      sec.items = (sec.items || []).filter((_, idx) => idx !== itemIndex);
      next[sectionIndex] = sec;
      return { ...f, sections: next };
    });
  }

  async function uploadFile(file, onDone) {
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await apiFetch('/products/upload', { method: 'POST', token, body: fd });
      onDone(res.path);
    } catch (e) {
      alert('Upload failed');
    }
  }

  async function onSave(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = { ...form };
      if (isEdit) {
        await apiFetch(`/products/${slug}`, { method: 'PUT', token, body: payload });
      } else {
        await apiFetch('/products', { method: 'POST', token, body: payload });
      }
      navigate('/admin/products');
    } catch (e) {
      setError('Save failed');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1e3a5f]">{isEdit ? 'Edit' : 'New'} Product</h1>
        <button
          type="button"
          onClick={() => navigate('/admin/products')}
          className="px-3 py-2 border border-[#1e3a5f] text-[#1e3a5f] rounded-lg text-sm font-medium hover:bg-[#1e3a5f] hover:text-white transition-colors"
        >
          Back
        </button>
      </div>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <form onSubmit={onSave} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4 bg-white p-6 rounded-2xl shadow-md border border-gray-200">
          <TextInput label="Slug" required value={form.slug} onChange={(e) => { setField('slug', e.target.value); setSlugTouched(true); }} onBlur={() => setSlugTouched(true)} />
          <TextInput label="Title" required value={form.title} onChange={(e) => setField('title', e.target.value)} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category<span className="text-red-500 ml-0.5">*</span></label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#c9a962]/60 focus:border-[#c9a962]"
              value={form.category}
              onChange={(e) => setField('category', e.target.value)}
            >
              <option value="uniforms">Uniforms</option>
              <option value="shoes">Shoes</option>
            </select>
          </div>
          <TextArea label="Summary" required={false} value={form.summary} onChange={(e) => setField('summary', e.target.value)} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Main Image<span className="text-red-500 ml-0.5">*</span></label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#c9a962]/60 focus:border-[#c9a962]"
                placeholder="/uploads/.....jpg"
                value={form.mainImage}
                onChange={(e) => setField('mainImage', e.target.value)}
              />
              <label className="px-3 py-2 rounded-lg cursor-pointer bg-[#1e3a5f] text-white text-sm font-medium shadow-sm hover:bg-[#2d5a8f] transition-colors">
                Upload Image
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadFile(file, (path) => setField('mainImage', path));
                  }}
                />
              </label>
            </div>
            {form.mainImage && (
              <img src={form.mainImage} alt="main" className="h-24 w-auto mt-3 rounded-lg border border-gray-200 object-contain bg-white" />
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-[#1e3a5f]">Features</h2>
            <button
              type="button"
              onClick={addFeature}
              className="px-3 py-1 rounded-lg bg-[#1e3a5f] text-white text-sm font-medium shadow-sm hover:bg-[#2d5a8f] transition-colors"
            >
              Add Feature
            </button>
          </div>
          <div className="space-y-2">
            {(form.features || []).map((ft, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#c9a962]/60 focus:border-[#c9a962]"
                  value={ft}
                  onChange={(e) => updateFeature(i, e.target.value)}
                />
                <button
                  type="button"
                  className="px-3 py-2 rounded-lg border border-red-200 bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition-colors"
                  onClick={() => removeFeature(i)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#1e3a5f]">Sections</h2>
            <button
              type="button"
              onClick={addSection}
              className="px-3 py-1 rounded-lg bg-[#1e3a5f] text-white text-sm font-medium shadow-sm hover:bg-[#2d5a8f] transition-colors"
            >
              Add Section
            </button>
          </div>
          {(form.sections || []).map((sec, si) => (
            <div key={si} className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <input
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#c9a962]/60 focus:border-[#c9a962]"
                  placeholder="Section title"
                  value={sec.title}
                  onChange={(e) => updateSectionTitle(si, e.target.value)}
                />
                <button
                  type="button"
                  className="px-3 py-2 rounded-lg border border-red-200 bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition-colors"
                  onClick={() => removeSection(si)}
                >
                  Remove Section
                </button>
              </div>

              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-[#1e3a5f]">Items</h3>
                <button
                  type="button"
                  onClick={() => addItem(si)}
                  className="px-3 py-1 rounded-lg border border-[#1e3a5f]/30 text-[#1e3a5f] text-xs font-medium hover:bg-[#1e3a5f]/5 transition-colors"
                >
                  Add Item
                </button>
              </div>

              <div className="space-y-3">
                {(sec.items || []).map((it, ii) => (
                  <div key={ii} className="grid md:grid-cols-2 gap-3 border border-gray-200 rounded-xl p-4 bg-[#faf7f0]">
                    <TextInput label="Name" required value={it.name} onChange={(e) => updateItem(si, ii, 'name', e.target.value)} />
                    <TextInput label="Model No" required value={it.modelNo} onChange={(e) => updateItem(si, ii, 'modelNo', e.target.value)} />
                    <TextArea label="Description" value={it.description} onChange={(e) => updateItem(si, ii, 'description', e.target.value)} />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Image<span className="text-red-500 ml-0.5">*</span></label>
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#c9a962]/60 focus:border-[#c9a962]"
                          placeholder="/uploads/.....jpg"
                          value={it.image}
                          onChange={(e) => updateItem(si, ii, 'image', e.target.value)}
                        />
                        <label className="px-3 py-2 rounded-lg cursor-pointer bg-[#1e3a5f] text-white text-xs font-medium shadow-sm hover:bg-[#2d5a8f] transition-colors">
                          Upload Image
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) uploadFile(file, (path) => updateItem(si, ii, 'image', path));
                            }}
                          />
                        </label>
                      </div>
                      {it.image && (
                        <img src={it.image} alt="item" className="h-20 w-auto mt-3 rounded-lg border border-gray-200 object-contain bg-white" />
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <button
                        type="button"
                        className="px-3 py-2 rounded-lg border border-red-200 bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition-colors"
                        onClick={() => removeItem(si, ii)}
                      >
                        Remove Item
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 bg-[#1e3a5f] text-white rounded-lg font-semibold shadow-sm hover:bg-[#2d5a8f] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
