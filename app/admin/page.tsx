"use client";

import { useEffect, useState } from "react";
import { AdminFrame } from "@/components/admin/AdminFrame";

type Stats = { products: number; categories: number; hidden: number; edits: number; news: number; stores: number; campaigns: number; banners: number; user: { username: string; is_superuser: boolean } };

export default function AdminHomePage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats").then((response) => response.json()).then((data) => {
      if (data.ok) setStats(data);
    });
  }, []);

  return (
    <AdminFrame>
      <h1>İdarə paneli</h1>
      <p className="admin-lead">Kataloq, xəbərlər, mağazalar, kampaniyalar və ana səhifə buradan idarə olunur.</p>
      <div className="admin-cards">
        <article><span>Məhsul</span><strong>{stats?.products ?? "—"}</strong></article>
        <article><span>Kateqoriya</span><strong>{stats?.categories ?? "—"}</strong></article>
        <article><span>Xəbər</span><strong>{stats?.news ?? "—"}</strong></article>
        <article><span>Mağaza</span><strong>{stats?.stores ?? "—"}</strong></article>
        <article><span>Kampaniya</span><strong>{stats?.campaigns ?? "—"}</strong></article>
        <article><span>Banner</span><strong>{stats?.banners ?? "—"}</strong></article>
        <article><span>Gizlədilən</span><strong>{stats?.hidden ?? "—"}</strong></article>
        <article><span>Dəyişiklik</span><strong>{stats?.edits ?? "—"}</strong></article>
      </div>
    </AdminFrame>
  );
}
