'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const nav = [
  { href: '/admin/dashboard', label: '🏠 Dashboard' },
  { href: '/admin/projetos', label: '🗂️ Projetos' },
  { href: '/admin/skills', label: '⚡ Skills' },
  { href: '/admin/experiencias', label: '💼 Experiências' },
  { href: '/admin/mensagens', label: '📬 Mensagens' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== '/admin' && !localStorage.getItem('admin_secret')) {
      router.push('/admin');
    }
  }, [pathname, router]);

  function handleLogout() {
    localStorage.removeItem('admin_secret');
    router.push('/admin');
  }

  if (pathname === '/admin') return <>{children}</>;

  return (
    <div className="min-h-screen flex bg-gray-950 text-white">
      {/* Sidebar */}
      <aside className="w-56 bg-gray-900 flex flex-col p-4 gap-2 shrink-0">
        <h1 className="text-lg font-bold mb-4 text-blue-400">⚙️ Admin Panel</h1>
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 py-2 rounded-lg text-sm transition ${
              pathname.startsWith(item.href)
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            {item.label}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="mt-auto px-3 py-2 text-sm text-red-400 hover:bg-gray-800 rounded-lg text-left transition"
        >
          🚪 Sair
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
