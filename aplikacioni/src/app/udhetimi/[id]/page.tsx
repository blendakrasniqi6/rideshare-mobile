
import Link from "next/link";
import { notFound } from "next/navigation";
import { gjejUdhetimin } from "@/lib/udhetimet";
import { Java8Kontrollet } from "@/components/Java8Kontrollet";
import { KerkesaReale } from "@/components/KerkesaReale";
import { LexoNjoftimin } from "@/components/LexoNjoftimin";

export const dynamic = "force-dynamic";

export default async function Kerkesa({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let udhetim;

  try {
    udhetim = await gjejUdhetimin(id);
  } catch {
    return (
      <main>
        <h1>RideShare</h1>
        <p role="alert">Nuk u lidhëm me databazën. Provo përsëri.</p>
        <Link href="/">← Kthehu te lista</Link>
      </main>
    );
  }

  if (!udhetim) notFound();

  return (
    <main>
      <LexoNjoftimin />

      <Link href="/">← Kthehu te lista e udhëtimeve</Link>

      {udhetim.vende > 0 ? (
        <KerkesaReale
          udhetimId={String(udhetim.id)}
          vendeFillestare={Number(udhetim.vende)}
          nisja={udhetim.nisja}
        />
      ) : (
        <h1>Nuk ka vende të lira.</h1>
      )}

      {id === "2" && <Java8Kontrollet />}
    </main>
  );
}
