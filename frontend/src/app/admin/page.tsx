'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [secret, setSecret] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiUrl = (
        process.env.NEXT_PUBLIC_API_URL ||
        process.env.NEXT_PRIVATE_API_URL ||
        'http://localhost:3333'
      ).replace(/\/$/, '');
      const res = await fetch(`${apiUrl}/api/admin/projects`, {
        headers: { Authorization: `Bearer ${secret}` },
      });

      if (res.status === 401) {
        setError('Senha incorreta.');
        setLoading(false);
        return;
      }

      localStorage.setItem('admin_secret', secret);
      router.push('/admin/dashboard');
    } catch {
      setError('Erro ao conectar com a API.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-sm flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-white text-center">🔒 Admin</h1>
        <p className="text-gray-400 text-sm text-center">
          Digite a senha de administrador
        </p>

        <input
          type="password"
          placeholder="Senha"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className="bg-gray-800 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
