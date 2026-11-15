
"use client";

import { useCallback, useEffect, useState } from "react";

type Kerkesa = {
  id: number;
  udhetimId: string;
  udhetarId: string;
  statusi: "pending" | "accepted" | "rejected";
  createdAt: string;
};

const statuset = {
  pending: "Në pritje",
  accepted: "Pranuar",
  rejected: "Refuzuar",
};

export function KerkesatShoferit() {
  const [kerkesat, setKerkesat] = useState<Kerkesa[]>([]);
  const [gabimi, setGabimi] = useState("");
  const [rilidhja, setRilidhja] = useState(false);
  const [veprimiAktiv, setVeprimiAktiv] = useState<number | null>(null);

  const lexoKerkesat = useCallback(async () => {
    try {
      const response = await fetch("/api/kerkesat", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Kërkesat nuk mund të lexohen.");
      }

      const data = await response.json();

      setKerkesat(data.kerkesat ?? []);
      setGabimi("");
      setRilidhja(false);
    } catch {
      setGabimi("Po rilidhemi...");
      setRilidhja(true);
    }
  }, []);

  useEffect(() => {
    lexoKerkesat();

    const interval = window.setInterval(() => {
      if (navigator.onLine) {
        lexoKerkesat();
      } else {
        setGabimi("Po rilidhemi...");
        setRilidhja(true);
      }
    }, 3000);

    const kurRilidhet = () => lexoKerkesat();

    const kurShkeputet = () => {
      setGabimi("Po rilidhemi...");
      setRilidhja(true);
    };

    window.addEventListener("online", kurRilidhet);
    window.addEventListener("offline", kurShkeputet);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("online", kurRilidhet);
      window.removeEventListener("offline", kurShkeputet);
    };
  }, [lexoKerkesat]);

  async function ndryshoKerkesen(
    id: number,
    veprimi: "prano" | "refuzo"
  ) {
    setVeprimiAktiv(id);
    setGabimi("");

    try {
      const response = await fetch(`/api/kerkesat/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ veprimi }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Veprimi dështoi.");
      }

      await lexoKerkesat();
    } catch (error) {
      setGabimi(
        error instanceof Error
          ? error.message
          : "Veprimi dështoi."
      );
    } finally {
      setVeprimiAktiv(null);
    }
  }

  return (
    <section>
      <h2>Kërkesat për udhëtimet e mia</h2>

      {rilidhja && (
        <p role="status" data-testid="connection-status">
          Po rilidhemi...
        </p>
      )}

      {gabimi && (
        <p role="alert" data-testid="request-error">
          {gabimi}
        </p>
      )}

      {kerkesat.length === 0 ? (
        <p>Nuk ka kërkesa për momentin.</p>
      ) : (
        <ul>
          {kerkesat.map((kerkesa) => (
            <li key={kerkesa.id}>
              <p>
                <strong>Kërkesa #{kerkesa.id}</strong>
              </p>

              <p>Udhëtimi: {kerkesa.udhetimId}</p>
              <p>Udhëtari: {kerkesa.udhetarId}</p>

              <p data-testid={`request-status-${kerkesa.id}`}>
                Statusi: {statuset[kerkesa.statusi]}
              </p>

              {kerkesa.statusi === "pending" && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      ndryshoKerkesen(kerkesa.id, "prano")
                    }
                    disabled={veprimiAktiv !== null}
                    data-testid={`accept-${kerkesa.id}`}
                  >
                    {veprimiAktiv === kerkesa.id
                      ? "Duke përpunuar..."
                      : "Prano"}
                  </button>{" "}

                  <button
                    type="button"
                    onClick={() =>
                      ndryshoKerkesen(kerkesa.id, "refuzo")
                    }
                    disabled={veprimiAktiv !== null}
                    data-testid={`reject-${kerkesa.id}`}
                  >
                    Refuzo
                  </button>
                </>
              )}

              <hr />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
