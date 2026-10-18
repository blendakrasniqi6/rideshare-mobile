
import { KartaUdhetimi } from "@/components/KartaUdhetimi";
import { lexoUdhetimet } from "@/lib/udhetimet";

export const dynamic = "force-dynamic";

export default async function Home() {
  let udhetimet;

  try {
    udhetimet = await lexoUdhetimet();
  } catch (error) {
    console.error("Gabim gjatë leximit të udhëtimeve:", error);

    return (
      <main>
        <h1>RideShare · Udhëtimet për AAB</h1>
        <p>Udhëtimet nuk mundën të ngarkohen. Kontrollo lidhjen me databazën.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>RideShare · Udhëtimet për AAB</h1>
      <p>Zgjidh një nisje dhe lexo detajet para kërkesës.</p>

      <div className="trip-list">
        {udhetimet.map((udhetim) => (
          <KartaUdhetimi key={udhetim.id} udhetim={udhetim} />
        ))}
      </div>
    </main>
  );
}
