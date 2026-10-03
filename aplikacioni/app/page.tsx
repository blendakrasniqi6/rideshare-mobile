import { KartaUdhetimi } from "@/components/KartaUdhetimi";
import { udhetimet } from "@/lib/udhetimet";

export default function FaqjaKryesore() {

  return (
    <main className="page">
      <header className="page-header">
        <h1>RideShare – Udhëtime drejt AAB</h1>
        <p className="page-subtitle">Zgjidh një udhëtim dhe kërko vend</p>
      </header>

      <ul className="lista-kartash">
        {udhetimet.map((udhetim) => (
          <li key={udhetim.id}>
            <KartaUdhetimi udhetim={udhetim} />
          </li>
        ))}
      </ul>
    </main>
  );
}
