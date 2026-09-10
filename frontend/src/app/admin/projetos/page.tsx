'use client';
import { useEffect, useState } from 'react';
import { Pencil, Plus, Star, Trash2, X } from 'lucide-react';
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

const FIELDS: {
  label: string;
  key: string;
  required?: boolean;
  type?: string;
}[] = [
  { label: 'Título', key: 'title', required: true },
  { label: 'Slug', key: 'slug', required: true },
  { label: 'Link', key: 'link' },
  { label: 'Repo URL', key: 'repoUrl' },
  { label: 'Tags (separadas por vírgula)', key: 'tags' },
  { label: 'Ordem', key: 'order', type: 'number' },
];

export default function ProjetosPage() {
  const [projects, setProjects] = useState<any[]>([]);
  // undefined = modal fechado | null = novo | objeto = editando
  const [editing, setEditing] = useState<any>(undefined);
  const [form, setForm] = useState<any>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      setProjects(await getProjects());
    } catch {
      setProjects([]);
    } finally {
      setLoading(false);
    }
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
  function closeModal() {
    setEditing(undefined);
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
      closeModal();
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
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Projetos</h1>
          <p className="mt-1 text-sm text-zinc-500">
            {projects.length} {projects.length === 1 ? 'item' : 'itens'} ·
            clique em editar para alterar ou crie um novo
          </p>
        </div>
        <button onClick={openNew} className="btn-primary">
          <Plus size={16} />
          Novo projeto
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <form
            onSubmit={handleSave}
            onClick={(e) => e.stopPropagation()}
            className="glass max-h-[90vh] w-full max-w-lg overflow-y-auto p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">
                {editing ? 'Editar projeto' : 'Novo projeto'}
              </h2>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Fechar"
                className="rounded-lg border border-zinc-800 p-1.5 text-zinc-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {FIELDS.map(({ label, key, required, type }) => (
                <label key={key} className="flex flex-col gap-1.5 text-sm">
                  <span className="text-xs font-semibold text-zinc-300">
                    {label}
                  </span>
                  <input
                    type={type ?? 'text'}
                    required={required}
                    value={form[key] ?? ''}
                    onChange={(e) =>
                      setForm((f: any) => ({ ...f, [key]: e.target.value }))
                    }
                    className="input-modern"
                  />
                </label>
              ))}

              <label className="flex flex-col gap-1.5 text-sm">
                <span className="text-xs font-semibold text-zinc-300">
                  Descrição
                </span>
                <textarea
                  required
                  rows={3}
                  value={form.description ?? ''}
                  onChange={(e) =>
                    setForm((f: any) => ({
                      ...f,
                      description: e.target.value,
                    }))
                  }
                  className="input-modern resize-none"
                />
              </label>

              <div className="flex flex-col gap-1.5 text-sm">
                <span className="text-xs font-semibold text-zinc-300">
                  Imagem
                </span>
                {form.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={form.imageUrl}
                    alt="preview"
                    className="h-24 w-full rounded-xl border border-zinc-800 object-cover"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="text-xs text-zinc-400 file:mr-3 file:rounded-lg file:border file:border-zinc-700 file:bg-zinc-800 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-zinc-200"
                />
                {uploading && (
                  <span className="text-xs text-blue-400">Enviando...</span>
                )}
                <input
                  placeholder="Ou cole a URL da imagem"
                  value={form.imageUrl ?? ''}
                  onChange={(e) =>
                    setForm((f: any) => ({ ...f, imageUrl: e.target.value }))
                  }
                  className="input-modern"
                />
              </div>

              <div className="flex gap-5">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300">
                  <input
                    type="checkbox"
                    checked={!!form.published}
                    onChange={(e) =>
                      setForm((f: any) => ({
                        ...f,
                        published: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 accent-blue-600"
                  />
                  Publicado
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300">
                  <input
                    type="checkbox"
                    checked={!!form.featured}
                    onChange={(e) =>
                      setForm((f: any) => ({
                        ...f,
                        featured: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 accent-blue-600"
                  />
                  Destaque
                </label>
              </div>

              <div className="mt-1 flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary flex-1"
                >
                  {saving ? 'Salvando...' : 'Salvar'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn-ghost"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="glass h-40 animate-pulse" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="glass p-10 text-center">
          <p className="font-medium text-zinc-300">
            Nenhum projeto cadastrado.
          </p>
          <button onClick={openNew} className="btn-primary mx-auto mt-4">
            <Plus size={16} />
            Criar o primeiro
          </button>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((p) => (
            <div key={p.id} className="glass glass-hover flex gap-3 p-4">
              {p.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="h-16 w-16 shrink-0 rounded-xl border border-zinc-800 object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-dashed border-zinc-700 text-xs text-zinc-600">
                  sem img
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-bold text-white">
                  {p.title}
                </div>
                <div className="truncate text-xs text-zinc-500">
                  {p.description}
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {p.tags?.slice(0, 3).map((t: string) => (
                    <span key={t} className="tag !px-2 !py-0.5 !text-[10px]">
                      {t}
                    </span>
                  ))}
                  {p.featured && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/25 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                      <Star size={10} />
                      Destaque
                    </span>
                  )}
                  {!p.published && (
                    <span className="rounded-full border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-[10px] font-semibold text-zinc-400">
                      Rascunho
                    </span>
                  )}
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-1.5">
                <button
                  onClick={() => openEdit(p)}
                  aria-label="Editar"
                  className="rounded-lg border border-zinc-800 p-2 text-zinc-400 transition hover:border-zinc-600 hover:text-white"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  aria-label="Excluir"
                  className="rounded-lg border border-zinc-800 p-2 text-zinc-400 transition hover:border-red-500/50 hover:text-red-400"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
