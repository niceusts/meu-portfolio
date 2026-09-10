'use client';
import { useEffect, useState } from 'react';
import { getMessages, markMessageRead, deleteMessage } from '@/lib/admin-api';

export default function MensagensPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setMessages(await getMessages());
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, []);

  async function handleRead(id: number) {
    await markMessageRead(id);
    setMessages((ms) =>
      ms.map((m) => (m.id === id ? { ...m, read: true } : m)),
    );
  }

  async function handleDelete(id: number) {
    if (!confirm('Deletar mensagem?')) return;
    await deleteMessage(id);
    await load();
  }

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-3xl font-bold">📬 Mensagens</h1>
        {unread > 0 && (
          <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {unread} não lidas
          </span>
        )}
      </div>

      {loading ? (
        <p className="text-gray-400">Carregando...</p>
      ) : (
        <div className="flex flex-col gap-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`rounded-xl p-4 flex gap-4 items-start border transition ${m.read ? 'bg-gray-900 border-gray-800' : 'bg-gray-900 border-blue-700'}`}
            >
              {!m.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold">{m.name}</span>
                  <span className="text-gray-400 text-sm">{m.email}</span>
                  <span className="text-gray-600 text-xs ml-auto">
                    {new Date(m.createdAt).toLocaleString('pt-BR')}
                  </span>
                </div>
                {m.subject && (
                  <div className="text-blue-300 text-sm mt-0.5">
                    {m.subject}
                  </div>
                )}
                <div className="text-gray-300 text-sm mt-1 whitespace-pre-wrap">
                  {m.body}
                </div>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                {!m.read && (
                  <button
                    onClick={() => handleRead(m.id)}
                    title="Marcar como lida"
                    className="bg-green-900/50 hover:bg-green-800 px-3 py-1.5 rounded-lg text-sm"
                  >
                    ✓
                  </button>
                )}
                <button
                  onClick={() => handleDelete(m.id)}
                  className="bg-red-900/50 hover:bg-red-800 px-3 py-1.5 rounded-lg text-sm"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
          {messages.length === 0 && (
            <p className="text-gray-500">Nenhuma mensagem ainda.</p>
          )}
        </div>
      )}
    </div>
  );
}
