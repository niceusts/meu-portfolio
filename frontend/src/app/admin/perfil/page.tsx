'use client';
import { useEffect, useState } from 'react';
import { Check, Loader2, Upload } from 'lucide-react';
import { getSettings, updateSetting, uploadImage } from '@/lib/admin-api';

export default function PerfilPage() {
  const [photoUrl, setPhotoUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    getSettings()
      .then((rows: { key: string; value: string }[]) => {
        const photo = rows.find((r) => r.key === 'hero_photo_url');
        if (photo) setPhotoUrl(photo.value);
      })
      .catch(() => setFeedback('Erro ao carregar configurações.'))
      .finally(() => setLoading(false));
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setFeedback('');
    try {
      const url = await uploadImage(file);
      setPhotoUrl(url);
      setFeedback('Upload concluído. Clique em Salvar para publicar.');
    } catch {
      setFeedback('Erro no upload. Tente de novo.');
    } finally {
      setUploading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!photoUrl.trim()) {
      setFeedback('Informe a URL da foto ou faça upload.');
      return;
    }
    setSaving(true);
    setFeedback('');
    try {
      await updateSetting('hero_photo_url', photoUrl.trim());
      setFeedback('Foto publicada! Veja na home do site.');
    } catch {
      setFeedback('Erro ao salvar.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-white">Foto de perfil</h1>
      <p className="mt-1 text-sm text-zinc-500">
        Imagem exibida no hero da página inicial.
      </p>

      {loading ? (
        <div className="glass mt-6 h-64 animate-pulse" />
      ) : (
        <form onSubmit={handleSave} className="glass mt-6 p-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            {photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photoUrl}
                alt="Prévia da foto de perfil"
                className="h-40 w-40 shrink-0 rounded-2xl border border-zinc-700 object-cover"
              />
            ) : (
              <div className="flex h-40 w-40 shrink-0 items-center justify-center rounded-2xl border border-dashed border-zinc-700 text-xs text-zinc-600">
                sem foto
              </div>
            )}
            <div className="w-full">
              <label className="mb-1.5 block text-xs font-semibold text-zinc-300">
                Enviar nova foto
              </label>
              <label className="btn-ghost w-full cursor-pointer">
                {uploading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Upload size={16} />
                    Escolher arquivo
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
              <p className="mt-2 text-[11px] text-zinc-600">
                JPG/PNG de até 10 MB. Vai para o Azure Blob.
              </p>
            </div>
          </div>

          <label className="mb-1.5 mt-5 block text-xs font-semibold text-zinc-300">
            Ou cole a URL da imagem
          </label>
          <input
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder="https://... ou /perfil.JPG"
            className="input-modern"
          />

          <button
            type="submit"
            disabled={saving}
            className="btn-primary mt-5 w-full"
          >
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Check size={16} />
                Publicar foto
              </>
            )}
          </button>

          {feedback && (
            <p className="mt-3 rounded-xl border border-zinc-700 bg-zinc-900/60 px-3.5 py-2.5 text-center text-[13px] text-zinc-300">
              {feedback}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
