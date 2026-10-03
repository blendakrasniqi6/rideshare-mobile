import Link from "next/link";
import { notFound } from "next/navigation";
import { gjejUdhetimin } from "@/lib/udhetimet";

export default async function FaqjaKerkeses({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const udhetim = gjejUdhetimin(id);
  if (!udhetim) {
    notFound();
  }

  if (udhetim.vendetELira === 0) {
    notFound();
  }

  return (
    <main className="page page-kerkesa">
      <nav className="nav-back">
        <Link href={`/udhetimi/${id}`}>← Mbrapa te detajet</Link>
      </nav>

      <h1>Kërkesë për vend</h1>
      <p className="kerkesa-route">
        {udhetim.nisja} → {udhetim.destinacioni}
      </p>

      <p className="simulim-status" role="status">
        Simulim: Në pritje
      </p>

      <p className="simulim-info">
        Ky është vetëm simulim për ushtrimin — nuk ka rezervim real, databazë
        apo pagesë.
      </p>

      <div className="karta-actions">
        <Link className="btn btn-secondary" href={`/udhetimi/${id}`}>
          Mbrapa
        </Link>
        <Link className="btn btn-secondary" href="/">
          Kthehu te lista
        </Link>
      </div>
    </main>
  );
}
