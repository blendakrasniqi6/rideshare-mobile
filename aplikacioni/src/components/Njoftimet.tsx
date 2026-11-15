
"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type Njoftim = {
  id: number;
  kerkesaId: number;
  titulli: string;
  mesazhi: string;
  lexuar: boolean;
  createdAt: string;
  udhetimId: string;
  statusi: "accepted" | "rejected";
};

export function Njoftimet() {
  const [njoftimet, setNjoftimet] = useState<Njoftim[]>([]);
  const [gabimi, setGabimi] = useState("");

  const lexoNjoftimet = useCallback(async () => {
    try {
      const response = await fetch("/api/njoftimet", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Njoftimet nuk mund të lexohen.");
      }

      const data = await response.json();

      setNjoftimet(data.njoftimet ?? []);
      setGabimi("");
    } catch {
      setGabimi("Njoftimet nuk mund të ngarkohen. Provo përsëri.");
    }
  }, []);

  useEffect(() => {
    lexoNjoftimet();

    const interval = window.setInterval(() => {
      if (navigator.onLine) {
        lexoNjoftimet();
      }
    }, 5000);

    return () => window.clearInterval(interval);
  }, [lexoNjoftimet]);

  return (
    <section>
      <h2>Njoftimet e mia</h2>

      <p>
        Njoftime të palexuara:{" "}
        <strong>{njoftimet.filter((n) => !n.lexuar).length}</strong>
      </p>

      {gabimi && <p role="alert">{gabimi}</p>}

      {njoftimet.length === 0 ? (
        <p>Nuk ke njoftime për momentin.</p>
      ) : (
        <ul>
          {njoftimet.map((njoftim) => (
            <li key={njoftim.id}>
              <article>
                <h3>{njoftim.titulli}</h3>

                <p>{njoftim.mesazhi}</p>

                <p>
                  Statusi:{" "}
                  {njoftim.statusi === "accepted"
                    ? "Pranuar"
                    : "Refuzuar"}
                </p>

                <p>
                  {njoftim.lexuar ? "I lexuar" : "I palexuar"}
                </p>

                <Link
                  href={`/udhetimi/${njoftim.udhetimId}?njoftim=${njoftim.id}`}
                >
                  Hape udhëtimin
                </Link>
              </article>

              <hr />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
