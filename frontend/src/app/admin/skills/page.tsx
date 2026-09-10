'use client';
import { useEffect, useState } from 'react';
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from '@/lib/admin-api';

const EMPTY: any = {
  category: 'frontend',
  title: '',
  level: 80,
  logo: '',
  order: 0,
};
const CATEGORIES = ['frontend', 'backend', 'database', 'devops', 'arquitetura'];

export default function SkillsPage() {
  const [skills, setSkills] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(undefined);
  const [form, setForm] = useState<any>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    setSkills(await getSkills());
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, []);

  function openNew() {
    setEditing(null);
    setForm(EMPTY);
  }
  function openEdit(s: any) {
    setEditing(s);
    setForm({ ...s });
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const data = {
      ...form,
      level: Number(form.level),
      order: Number(form.order),
    };
    try {
      if (editing) await updateSkill(editing.id, data);
      else await createSkill(data);
      setEditing(undefined);
      await load();
    } catch (err: any) {
      alert(err?.response?.data?.message ?? 'Erro ao salvar');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Deletar skill?')) return;
    await deleteSkill(id);
    await load();
  }

  const grouped = CATEGORIES.map((cat) => ({
    cat,
    items: skills.filter((s) => s.category === cat),
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">⚡ Skills</h1>
        <button
          onClick={openNew}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          + Nova skill
        </button>
      </div>

      {editing !== undefined && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleSave}
            className="bg-gray-900 rounded-2xl p-6 w-full max-w-md flex flex-col gap-3"
          >
            <h2 className="text-xl font-bold">
              {editing ? 'Editar Skill' : 'Nova Skill'}
            </h2>

            <label className="flex flex-col gap-1 text-sm">
              <span className="text-gray-400">Título</span>
              <input
                required
                value={form.title}
                onChange={(e) =>
                  setForm((f: any) => ({ ...f, title: e.target.value }))
                }
                className="bg-gray-800 rounded-lg px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm">
              <span className="text-gray-400">Categoria</span>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((f: any) => ({ ...f, category: e.target.value }))
                }
                className="bg-gray-800 rounded-lg px-3 py-2 text-white outline-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1 text-sm">
              <span className="text-gray-400">Nível ({form.level}%)</span>
              <input
                type="range"
                min={0}
                max={100}
                value={form.level}
                onChange={(e) =>
                  setForm((f: any) => ({ ...f, level: e.target.value }))
                }
                className="accent-blue-500"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm">
              <span className="text-gray-400">Logo (URL ou ícone)</span>
              <input
                value={form.logo ?? ''}
                onChange={(e) =>
                  setForm((f: any) => ({ ...f, logo: e.target.value }))
                }
                className="bg-gray-800 rounded-lg px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm">
              <span className="text-gray-400">Ordem</span>
              <input
                type="number"
                value={form.order}
                onChange={(e) =>
                  setForm((f: any) => ({ ...f, order: e.target.value }))
                }
                className="bg-gray-800 rounded-lg px-3 py-2 text-white outline-none"
              />
            </label>

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
                onClick={() => setEditing(undefined)}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p className="text-gray-400">Carregando...</p>
      ) : (
        <div className="flex flex-col gap-6">
          {grouped.map(({ cat, items }) =>
            items.length === 0 ? null : (
              <div key={cat}>
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  {cat}
                </h2>
                <div className="flex flex-col gap-2">
                  {items.map((s) => (
                    <div
                      key={s.id}
                      className="bg-gray-900 rounded-xl px-4 py-3 flex items-center gap-4"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{s.title}</div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                          <div
                            className="bg-blue-500 h-1.5 rounded-full"
                            style={{ width: `${s.level}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-gray-400 text-sm w-10 text-right">
                        {s.level}%
                      </span>
                      <button
                        onClick={() => openEdit(s)}
                        className="bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg text-sm"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="bg-red-900/50 hover:bg-red-800 px-3 py-1.5 rounded-lg text-sm"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}
