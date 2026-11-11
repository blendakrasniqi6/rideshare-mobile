import Link from "next/link";
import type { Udhetim } from "@/lib/udhetimet";
import { ButoniPreferuar } from "./ButoniPreferuar";

export function KartaUdhetimi({
  udhetim,
  fillimishtPreferuar,
}: {
  udhetim: Udhetim;
  fillimishtPreferuar: boolean;
}) {
  return (
    <article className="trip-card">
      <h2>
        {udhetim.nisja} – {udhetim.destinacioni}
      </h2>

      <p>
        Ora: {udhetim.ora} · Vende të lira: {udhetim.vende}
      </p>

      <Link className="action" href={`/udhetimi/${udhetim.id}`}>
        Shiko detajet
      </Link>

      <ButoniPreferuar
        udhetimId={udhetim.id}
        fillimishtPreferuar={fillimishtPreferuar}
      />
    </article>
  );
}