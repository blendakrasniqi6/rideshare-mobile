import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page">
      <h1>Udhëtimi nuk u gjet</h1>
      <p>Nuk ekziston udhëtim me këtë ID.</p>
      <Link href="/">← Kthehu te lista</Link>
    </main>
  );
}
