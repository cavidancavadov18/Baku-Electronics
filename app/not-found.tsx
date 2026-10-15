import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap page">
      <h1 className="page-title">Səhifə tapılmadı</h1>
      <p>Ünvan yanlışdır və ya səhifə köçürülüb.</p>
      <Link className="primary" href="/az">Ana səhifə</Link>
    </div>
  );
}
