"use client";

import { useEffect, useState } from "react";
import { AdminFrame } from "@/components/admin/AdminFrame";
import { money } from "@/lib/format";

type Row = {
  id: string;
  name: string;
  brand: string;
  code: string;
  category: string;
  price: number;
  oldPrice: number;
  image: string;
  hidden: boolean;
};

export default function AdminProductsPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState<Row[]>([]);
  const [edit, setEdit] = useState<Row | null>(null);
  const [saved, setSaved] = useState("");

  async function load(nextPage = page, nextQuery = query) {
    const params = new URLSearchParams({ q: nextQuery, page: String(nextPage) });
    const response = await fetch(`/api/admin/products?${params}`);
    const data = await response.json();
    if (!data.ok) return;
    setItems(data.items);
    setPages(data.pages);
    setTotal(data.total);
    setPage(data.page);
  }

  useEffect(() => {
    load(1, "");
  }, []);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (!edit) return;
    const response = await fetch("/api/admin/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: edit.id,
        name: edit.name,
        price: Number(edit.price),
        oldPrice: Number(edit.oldPrice),
        hidden: edit.hidden,
      }),
    });
    if (response.ok) {
      setSaved("Yadda saxlandı.");
      setEdit(null);
      load();
    }
  }

  return (
    <AdminFrame>
      <h1>Məhsullar</h1>
      <p className="admin-lead">{total} məhsul</p>
      <form className="admin-search" onSubmit={(event) => { event.preventDefault(); load(1, query); }}>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ad, marka və ya kod" />
        <button type="submit">Axtar</button>
      </form>
      {saved && <p className="admin-ok">{saved}</p>}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Məhsul</th>
            <th>Kod</th>
            <th>Qiymət</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="admin-product">
                  <img src={item.image} alt="" />
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.brand}</span>
                  </div>
                </div>
              </td>
              <td>{item.code}</td>
              <td>{money(item.price)}</td>
              <td>{item.hidden ? "Gizli" : "Saytda"}</td>
              <td><button type="button" onClick={() => { setSaved(""); setEdit(item); }}>Dəyiş</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="admin-pager">
        <button type="button" disabled={page <= 1} onClick={() => load(page - 1)}>Əvvəl</button>
        <span>{page} / {pages}</span>
        <button type="button" disabled={page >= pages} onClick={() => load(page + 1)}>Növbəti</button>
      </div>
      {edit && (
        <div className="admin-modal">
          <form onSubmit={save}>
            <h2>Məhsulu dəyiş</h2>
            <label>Ad<input value={edit.name} onChange={(event) => setEdit({ ...edit, name: event.target.value })} /></label>
            <label>Qiymət<input type="number" step="0.01" value={edit.price} onChange={(event) => setEdit({ ...edit, price: Number(event.target.value) })} /></label>
            <label>Köhnə qiymət<input type="number" step="0.01" value={edit.oldPrice} onChange={(event) => setEdit({ ...edit, oldPrice: Number(event.target.value) })} /></label>
            <label className="admin-check"><input type="checkbox" checked={edit.hidden} onChange={(event) => setEdit({ ...edit, hidden: event.target.checked })} /> Saytdan gizlət</label>
            <div className="admin-actions">
              <button type="button" onClick={() => setEdit(null)}>Bağla</button>
              <button type="submit">Yadda saxla</button>
            </div>
          </form>
        </div>
      )}
    </AdminFrame>
  );
}
