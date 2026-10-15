"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    setPending(false);
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setError(data?.error || "Giriş alınmadı.");
      return;
    }
    router.replace("/admin");
  }

  return (
    <div className="admin-login">
      <form onSubmit={submit}>
        <p className="admin-kicker">Baku Electronics</p>
        <h1>Admin panel</h1>
        <p>Superuser ilə daxil olun.</p>
        <label>
          İstifadəçi adı
          <input value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" />
        </label>
        <label>
          Şifrə
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" />
        </label>
        {error && <p className="admin-error">{error}</p>}
        <button type="submit" disabled={pending}>{pending ? "Giriş..." : "Daxil ol"}</button>
      </form>
    </div>
  );
}
