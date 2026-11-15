
import Link from "next/link";
import Hyrja from "@/components/Hyrja";
import { KerkesatShoferit } from "@/components/KerkesatShoferit";
import { Njoftimet } from "@/components/Njoftimet";
import { profiliIm } from "@/lib/lejet";
import { getSql } from "@/lib/db";
import { ruajOren } from "./actions";

export const dynamic = "force-dynamic";

const mesazhet: Record<string, string> = {
  hyr: "Hyr në llogari para se të ndryshosh udhëtimin.",
  ndaluar: "Nuk ke leje për këtë udhëtim. Të dhënat nuk ndryshuan.",
  fushe_id: "ID e udhëtimit duhet të jetë 1, 2 ose 3.",
  fushe_nisja: "Shkruaj qytetin ose vendin e nisjes.",
  fushe_ora: "Zgjidh një orë të vlefshme të nisjes.",
  fushe_vende: "Numri i vendeve duhet të jetë numër i plotë më i madh se 0.",
  ruajtur: "Të dhënat e udhëtimit u ruajtën me sukses.",
  databaza: "Nuk u lidhëm me databazën. Kontrollo Neon dhe provo përsëri.",
};

export default async function Panel({
  searchParams,
}: {
  searchParams: Promise<{ m?: string }>;
}) {
  const { m } = await searchParams;
  let p;
  let udhetimi: {
    nisja: string;
    ora: string;
    vende: number;
  } | null = null;

  try {
    p = await profiliIm();

    if (p?.roli === "shofer") {
      const sql = getSql();

      const rows = await sql`
        SELECT nisja, ora, vende
        FROM udhetimet
        WHERE id = '2'
          AND shofer_id = ${p.id}
      `;

      udhetimi = (rows[0] as typeof udhetimi) ?? null;
    }
  } catch {
    return (
      <main className="app-shell">
        <h1>Paneli im</h1>
        <p role="alert">{mesazhet.databaza}</p>
        <Link href="/panel">Provo përsëri</Link>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <h1>Paneli im</h1>

      {m && mesazhet[m] && (
        <p role="status">{mesazhet[m]}</p>
      )}

      {!p ? (
        <p>
          Lista është publike. Për panelin hyr me llogarinë tënde GitHub.
        </p>
      ) : (
        <>
          <p>
            Përshëndetje, {p.emri}. Roli: <strong>{p.roli}</strong>.
          </p>
          <p>
            ID ime GitHub: <code>{p.id}</code>
          </p>
        </>
      )}

      <Hyrja brenda={Boolean(p)} />

      {p?.roli === "shofer" ? (
        <>
          <form action={ruajOren}>
            <h2>Ndrysho të dhënat e udhëtimit tim</h2>

            <input type="hidden" name="id" value="2" />

            <label htmlFor="nisja">Vendi i nisjes</label>{" "}
            <input
              id="nisja"
              name="nisja"
              type="text"
              defaultValue={udhetimi?.nisja ?? "Fushë Kosovë"}
              required
            />

            <br />

            <label htmlFor="ora">Ora e nisjes</label>{" "}
            <input
              id="ora"
              name="ora"
              type="time"
              defaultValue={udhetimi?.ora ?? "08:15"}
              required
            />

            <br />

            <label htmlFor="vende">Numri i vendeve</label>{" "}
            <input
              id="vende"
              name="vende"
              type="number"
              min="1"
              step="1"
              defaultValue={udhetimi?.vende ?? 1}
              required
            />

            <br />

            <button type="submit">Ruaj ndryshimet</button>

            <p>
              Formulari i laboratorit provon ID 2. Serveri kontrollon
              të dhënat dhe verifikon pronarin e udhëtimit.
            </p>
          </form>

          <KerkesatShoferit />
        </>
      ) : (
        p && (
          <>
            <Njoftimet />

            <p>
              Si udhëtar mund të shohësh udhëtimet; nuk mund të ndryshosh
              të dhënat e shoferit.
            </p>
          </>
        )
      )}

      <p>
        <Link href="/">Kthehu te udhëtimet</Link>
      </p>
    </main>
  );
}
