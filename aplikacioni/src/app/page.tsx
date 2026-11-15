import Link from "next/link";
import { KartaUdhetimi } from "@/components/KartaUdhetimi";
import { lexoUdhetimet, type Udhetim } from "@/lib/udhetimet";
import { lexoIdPreferuara } from "@/lib/preferuarat";
import { Java8Kontrollet } from "@/components/Java8Kontrollet";

export const dynamic = "force-dynamic";

export default async function Home() {
  let udhetimet: Udhetim[];
  let preferuarat: string[] = [];

  try {
    const rezultatet = await Promise.all([
      lexoUdhetimet(),
      lexoIdPreferuara().catch(() => [] as string[]),
    ]);

    udhetimet = rezultatet[0];
    preferuarat = rezultatet[1];
  } catch {
    return (
      <main>
        <h1>RideShare</h1>
        <Java8Kontrollet />
        <p>
          <Link href="/panel">Hyr / Paneli im</Link>
        </p>
        <p role="alert">
          Nuk u lidhëm me databazën. Provo përsëri.
        </p>
        <a className="action" href="/">
          Provo përsëri
        </a>
      </main>
    );
  }

  return (
    <main>
      <h1>RideShare · Udhëtimet për AAB</h1>

      <Java8Kontrollet />

      <p>
        <Link href="/panel">Hyr / Paneli im</Link>
      </p>

      <p>Burimi: Neon · të dhëna fiktive për ushtrime</p>

      {udhetimet.length === 0 ? (
        <p>Nuk ka udhëtime për momentin.</p>
      ) : (
        <div className="trip-list">
          {udhetimet.map((udhetim) => (
            <KartaUdhetimi
              key={udhetim.id}
              udhetim={udhetim}
              fillimishtPreferuar={preferuarat.includes(udhetim.id)}
            />
          ))}
        </div>
      )}
    </main>
  );
}