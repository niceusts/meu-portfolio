'use client';
import { useEffect, useState } from 'react';
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from '@/lib/admin-api';

const EMPTY: any = {
  company: '',
  role: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  summary: '',
  bullets: [],
  order: 0,
};

export default function ExperienciasPage() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(undefined);
  const [form, setForm] = useState<any>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    setExperiences(await getExperiences());
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, []);

  function openNew() {
    setEditing(null);
    setForm(EMPTY);
  }
  function openEdit(e: any) {
    setEditing(e);
    setForm({
      ...e,
      startDate: e.startDate
        ? new Date(e.startDate).toISOString().slice(0, 10)
        : '',
      endDate: e.endDate ? new Date(e.endDate).toISOString().slice(0, 10) : '',
      bullets: e.bullets?.join('\n') ?? '',
    });
  }

  async function handleSave(ev: React.FormEvent) {
    ev.preventDefault();
    setSaving(true);
    const data = {
      ...form,
      order: Number(form.order),
      startDate: new Date(form.startDate).toISOString(),
      endDate:
        form.current || !form.endDate
          ? null
          : new Date(form.endDate).toISOString(),
      bullets:
        typeof form.bullets === 'string'
          ? form.bullets
              .split('\n')
              .map((b: string) => b.trim())
              .filter(Boolean)
          : form.bullets,
    };
    try {
      if (editing) await updateExperience(editing.id, data);
      else await createExperience(data);
      setEditing(undefined);
      await load();
    } catch (err: any) {
      alert(err?.response?.data?.message ?? 'Erro ao salvar');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Deletar experiência?')) return;
    await deleteExperience(id);
    await load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">💼 Experiências</h1>
        <button
          onClick={openNew}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          + Nova
        </button>
      </div>

      {editing !== undefined && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleSave}
            className="bg-gray-900 rounded-2xl p-6 w-full max-w-lg flex flex-col gap-3 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-xl font-bold">
              {editing ? 'Editar' : 'Nova'} Experiência
            </h2>

            {[
              { label: 'Empresa', key: 'company', required: true },
              { label: 'Cargo', key: 'role', required: true },
              { label: 'Localização', key: 'location' },
            ].map(({ label, key, required }) => (
              <label key={key} className="flex flex-col gap-1 text-sm">
                <span className="text-gray-400">{label}</span>
                <input
                  required={required}
                  value={form[key] ?? ''}
                  onChange={(e) =>
                    setForm((f: any) => ({ ...f, [key]: e.target.value }))
                  }
                  className="bg-gray-800 rounded-lg px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
            ))}

            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-gray-400">Início</span>
                <input
                  type="date"
                  required
                  value={form.startDate}
                  onChange={(e) =>
                    setForm((f: any) => ({ ...f, startDate: e.target.value }))
                  }
                  className="bg-gray-800 rounded-lg px-3 py-2 text-white outline-none"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-gray-400">Fim</span>
                <input
                  type="date"
                  disabled={form.current}
                  value={form.endDate ?? ''}
                  onChange={(e) =>
                    setForm((f: any) => ({ ...f, endDate: e.target.value }))
                  }
                  className="bg-gray-800 rounded-lg px-3 py-2 text-white outline-none disabled:opacity-40"
                />
              </label>
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                checked={form.current}
                onChange={(e) =>
                  setForm((f: any) => ({ ...f, current: e.target.checked }))
                }
              />
              Emprego atual
            </label>

            <label className="flex flex-col gap-1 text-sm">
              <span className="text-gray-400">Resumo</span>
              <textarea
                required
                rows={3}
                value={form.summary ?? ''}
                onChange={(e) =>
                  setForm((f: any) => ({ ...f, summary: e.target.value }))
                }
                className="bg-gray-800 rounded-lg px-3 py-2 text-white outline-none resize-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm">
              <span className="text-gray-400">Bullets (uma por linha)</span>
              <textarea
                rows={4}
                value={
                  typeof form.bullets === 'string'
                    ? form.bullets
                    : form.bullets?.join('\n')
                }
                onChange={(e) =>
                  setForm((f: any) => ({ ...f, bullets: e.target.value }))
                }
                className="bg-gray-800 rounded-lg px-3 py-2 text-white outline-none resize-none focus:ring-2 focus:ring-blue-500"
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
        <div className="flex flex-col gap-3">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-gray-900 rounded-xl p-4 flex gap-4 items-start"
            >
              <div className="flex-1">
                <div className="font-semibold">{exp.role}</div>
                <div className="text-blue-400 text-sm">{exp.company}</div>
                <div className="text-gray-400 text-xs mt-1">
                  {new Date(exp.startDate).toLocaleDateString('pt-BR', {
                    month: 'short',
                    year: 'numeric',
                  })}{' '}
                  →{' '}
                  {exp.current
                    ? 'Atual'
                    : exp.endDate
                      ? new Date(exp.endDate).toLocaleDateString('pt-BR', {
                          month: 'short',
                          year: 'numeric',
                        })
                      : '—'}
                  {exp.location ? ` · ${exp.location}` : ''}
                </div>
              </div>
              <button
                onClick={() => openEdit(exp)}
                className="bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg text-sm"
              >
                ✏️
              </button>
              <button
                onClick={() => handleDelete(exp.id)}
                className="bg-red-900/50 hover:bg-red-800 px-3 py-1.5 rounded-lg text-sm"
              >
                🗑️
              </button>
            </div>
          ))}
          {experiences.length === 0 && (
            <p className="text-gray-500">Nenhuma experiência cadastrada.</p>
          )}
        </div>
      )}
    </div>
  );
}
