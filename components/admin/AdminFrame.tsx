"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type SessionUser = { username: string; email: string; is_staff: boolean; is_superuser: boolean };

const links = [
  { href: "/admin", label: "İdarə paneli" },
  { href: "/admin/content", label: "Sayt məzmunu" },
  { href: "/admin/products", label: "Məhsullar" },
  { href: "/admin/users", label: "İstifadəçilər" },
];

export function AdminFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    fetch("/api/admin/session")
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => setUser(data.user))
      .catch(() => router.replace("/admin/login"));
  }, [router]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  if (!user) return <div className="admin-app"><p className="admin-loading">Yoxlanılır...</p></div>;

  return (
    <div className="admin-app">
      <aside className="admin-side">
        <div className="admin-brand">Baku Electronics</div>
        <p className="admin-side-note">Admin panel</p>
        <nav>
          {links.map((link) => (
            <a key={link.href} href={link.href} className={pathname === link.href ? "is-active" : ""}>
              {link.label}
            </a>
          ))}
        </nav>
        <a href="/az">Mağazaya qayıt</a>
      </aside>
      <div className="admin-main">
        <header className="admin-top">
          <div>
            <strong>{user.username}</strong>
            {user.is_superuser && <span className="admin-badge">superuser</span>}
          </div>
          <button type="button" onClick={logout}>Çıxış</button>
        </header>
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
