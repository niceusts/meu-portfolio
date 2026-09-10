'use client';
import { useEffect, useState } from 'react';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  uploadImage,
} from '@/lib/admin-api';

const EMPTY: any = {
  slug: '',
  title: '',
  description: '',
  imageUrl: '',
  link: '',
  repoUrl: '',
  featured: false,
  published: true,
  order: 0,
  tags: [],
};

export default function ProjetosPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState<any>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function load() {
    setLoading(true);
    setProjects(await getProjects());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function openNew() {
    setEditing(null);
    setForm(EMPTY);
  }
  function openEdit(p: any) {
    setEditing(p);
    setForm({ ...p, tags: p.tags?.join(', ') ?? '' });
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setForm((f: any) => ({ ...f, imageUrl: url }));
    } catch {
      alert('Erro no upload');
    } finally {
      setUploading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const data = {
      ...form,
      order: Number(form.order),
      tags:
        typeof form.tags === 'string'
          ? form.tags
              .split(',')
              .map((t: string) => t.trim())
              .filter(Boolean)
          : form.tags,
    };
    try {
      if (editing) await updateProject(editing.id, data);
      else await createProject(data);
      setEditing(undefined as any);
      setForm(EMPTY);
      await load();
    } catch (err: any) {
      alert(err?.response?.data?.message ?? 'Erro ao salvar');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Deletar projeto?')) return;
    await deleteProject(id);
    await load();
  }

  const isOpen = editing !== undefined;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">🗂️ Projetos</h1>
        <button
          onClick={openNew}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          + Novo projeto
        </button>
      </div>

      {/* Modal / Form */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleSave}
            className="bg-gray-900 rounded-2xl p-6 w-full max-w-lg flex flex-col gap-3 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-xl font-bold">
              {editing ? 'Editar Projeto' : 'Novo Projeto'}
            </h2>

            {[
              { label: 'Título', key: 'title', required: true },
              { label: 'Slug', key: 'slug', required: true },
              { label: 'Link', key: 'link' },
              { label: 'Repo URL', key: 'repoUrl' },
              { label: 'Tags (separadas por vírgula)', key: 'tags' },
              { label: 'Ordem', key: 'order', type: 'number' },
            ].map(({ label, key, required, type }) => (
              <label key={key} className="flex flex-col gap-1 text-sm">
                <span className="text-gray-400">{label}</span>
                <input
                  type={type ?? 'text'}
                  required={required}
                  value={form[key] ?? ''}
                  onChange={(e) =>
                    setForm((f: any) => ({ ...f, [key]: e.target.value }))
                  }
                  className="bg-gray-800 rounded-lg px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
            ))}

            <label className="flex flex-col gap-1 text-sm">
              <span className="text-gray-400">Descrição</span>
              <textarea
                required
                rows={3}
                value={form.description ?? ''}
                onChange={(e) =>
                  setForm((f: any) => ({ ...f, description: e.target.value }))
                }
                className="bg-gray-800 rounded-lg px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm">
              <span className="text-gray-400">Imagem</span>
              {form.imageUrl && (
                <img
                  src={form.imageUrl}
                  alt="preview"
                  className="h-20 object-cover rounded-lg"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="text-gray-400"
              />
              {uploading && (
                <span className="text-blue-400 text-xs">Enviando...</span>
              )}
              <input
                placeholder="Ou cole a URL da imagem"
                value={form.imageUrl ?? ''}
                onChange={(e) =>
                  setForm((f: any) => ({ ...f, imageUrl: e.target.value }))
                }
                className="bg-gray-800 rounded-lg px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500 mt-1"
              />
            </label>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) =>
                    setForm((f: any) => ({ ...f, published: e.target.checked }))
                  }
                />
                Publicado
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm((f: any) => ({ ...f, featured: e.target.checked }))
                  }
                />
                Destaque
              </label>
            </div>

            <div className="flex gap-3 mt-2">
              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 transition flex-1"
              >
                {saving ? 'Salvando...' : 'Salvar'}
              </button>
              <button
                type="button"
                onClick={() => setEditing(undefined as any)}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <p className="text-gray-400">Carregando...</p>
      ) : (
        <div className="flex flex-col gap-3">
          {projects.map((p) => (
            <div
              key={p.id}
              className="bg-gray-900 rounded-xl p-4 flex items-center gap-4"
            >
              {p.imageUrl && (
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="w-16 h-16 object-cover rounded-lg shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="font-semibold">{p.title}</div>
                <div className="text-gray-400 text-sm truncate">
                  {p.description}
                </div>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {p.tags?.map((t: string) => (
                    <span
                      key={t}
                      className="bg-blue-900/50 text-blue-300 text-xs px-2 py-0.5 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                  {p.featured && (
                    <span className="bg-yellow-900/50 text-yellow-300 text-xs px-2 py-0.5 rounded-full">
                      ⭐ Destaque
                    </span>
                  )}
                  {!p.published && (
                    <span className="bg-gray-700 text-gray-400 text-xs px-2 py-0.5 rounded-full">
                      Rascunho
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => openEdit(p)}
                  className="bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg text-sm transition"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-900/50 hover:bg-red-800 px-3 py-1.5 rounded-lg text-sm transition"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <p className="text-gray-500">Nenhum projeto cadastrado.</p>
          )}
        </div>
      )}
    </div>
  );
}
