import Link from "next/link";
import { notFound } from "next/navigation";
import { gjejUdhetimin } from "@/lib/udhetimet";

function formatData(data: string): string {
  const [viti, muaji, dita] = data.split("-");
  return `${dita}.${muaji}.${viti}`;
}

export default async function DetajetUdhetimit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const udhetim = gjejUdhetimin(id);
  if (!udhetim) {
    notFound();
  }

  const kaVende = udhetim.vendetELira > 0;

  return (
    <main className="page page-detail">
      <nav className="nav-back">
        <Link href="/">← Kthehu te lista</Link>
      </nav>

      <h1>
        {udhetim.nisja} → {udhetim.destinacioni}
      </h1>

      <dl className="detaje-liste">
        <div>
          <dt>Data</dt>
          <dd>{formatData(udhetim.data)}</dd>
        </div>
        <div>
          <dt>Ora e nisjes</dt>
          <dd>{udhetim.ora}</dd>
        </div>
        <div className="detaje-vendtakimi">
          <dt>Vendtakimi</dt>
          <dd>{udhetim.vendtakimi}</dd>
        </div>
        <div>
          <dt>Numri i vendeve në makinë</dt>
          <dd>{udhetim.numriVendeve}</dd>
        </div>
        <div>
          <dt>Vende të lira</dt>
          <dd className={kaVende ? "vende-ok" : "vende-zero"}>
            {kaVende
              ? udhetim.vendetELira
              : "0 — Nuk ka vende të lira për këtë udhëtim"}
          </dd>
        </div>
      </dl>

      <div className="karta-actions">
        {kaVende ? (
          <Link className="btn btn-primary" href={`/udhetimi/${id}/kerkesa`}>
            Kërko vend
          </Link>
        ) : (
          <button type="button" className="btn btn-primary" disabled>
            Nuk ka vende të lira
          </button>
        )}
      </div>
    </main>
  );
}
