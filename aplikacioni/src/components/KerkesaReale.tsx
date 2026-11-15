
"use client";

import { useCallback, useEffect, useState } from "react";

type Props = {
  udhetimId: string;
  vendeFillestare: number;
  nisja: string;
};

type Kerkesa = {
  id: number;
  statusi: "pending" | "accepted" | "rejected";
};

const mesazhet: Record<Kerkesa["statusi"], string> = {
  pending: "Kërkesa është dërguar. Në pritje të shoferit.",
  accepted: "Shoferi e pranoi kërkesën!",
  rejected: "Shoferi e refuzoi kërkesën.",
};

export function KerkesaReale({
  udhetimId,
  vendeFillestare,
  nisja,
}: Props) {
  const [statusi, setStatusi] = useState<Kerkesa["statusi"] | null>(null);
  const [vende, setVende] = useState(vendeFillestare);
  const [dukeDeruar, setDukeDeruar] = useState(false);
  const [gabimi, setGabimi] = useState("");
  const [rilidhja, setRilidhja] = useState(false);

  const kontrolloGjendjen = useCallback(async () => {
    try {
      const [kerkesaResponse, udhetimetResponse] = await Promise.all([
        fetch(`/api/kerkesat?udhetimId=${udhetimId}`, {
          cache: "no-store",
        }),
        fetch("/api/udhetimet", {
          cache: "no-store",
        }),
      ]);

      if (!kerkesaResponse.ok || !udhetimetResponse.ok) {
        throw new Error("Lidhja nuk është e disponueshme.");
      }

      const kerkesaData = await kerkesaResponse.json();
      const udhetimetData = await udhetimetResponse.json();

      const kerkesa = kerkesaData.kerkesat?.[0] as Kerkesa | undefined;

      setStatusi(kerkesa?.statusi ?? null);

      const udhetimi = udhetimetData.trips?.find(
        (item: { id: string; vende: number }) =>
          String(item.id) === udhetimId
      );

      if (udhetimi) {
        setVende(Number(udhetimi.vende));
      }

      setGabimi("");
      setRilidhja(false);
    } catch {
      setRilidhja(true);
      setGabimi("Po rilidhemi...");
    }
  }, [udhetimId]);

  useEffect(() => {
    const kontrolloLidhjen = () => {
      if (!navigator.onLine) {
        setRilidhja(true);
        setGabimi("Po rilidhemi...");
      } else {
        kontrolloGjendjen();
      }
    };

    kontrolloLidhjen();

    const interval = window.setInterval(() => {
      if (navigator.onLine) {
        kontrolloGjendjen();
      } else {
        setRilidhja(true);
        setGabimi("Po rilidhemi...");
      }
    }, 3000);

    window.addEventListener("online", kontrolloLidhjen);
    window.addEventListener("offline", kontrolloLidhjen);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("online", kontrolloLidhjen);
      window.removeEventListener("offline", kontrolloLidhjen);
    };
  }, [kontrolloGjendjen]);

  async function dergoKerkesen() {
    setDukeDeruar(true);
    setGabimi("");

    try {
      const response = await fetch("/api/kerkesat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ udhetimId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Dërgimi i kërkesës dështoi.");
      }

      setStatusi("pending");
      await kontrolloGjendjen();
    } catch (error) {
      setGabimi(
        error instanceof Error
          ? error.message
          : "Dërgimi i kërkesës dështoi."
      );
    } finally {
      setDukeDeruar(false);
    }
  }

  return (
    <section>
      <h1>Kërkesa për udhëtim</h1>

      <p>Destinacioni: {nisja}</p>

      <p>
        Vende të lira:{" "}
        <strong data-testid="available-seats">{vende}</strong>
      </p>

      {rilidhja && (
        <p role="status" data-testid="connection-status">
          Po rilidhemi...
        </p>
      )}

      {statusi && (
        <p role="status" data-testid="request-status">
          {mesazhet[statusi]}
        </p>
      )}

      {gabimi && (
        <p role="alert" data-testid="request-error">
          {gabimi}
        </p>
      )}

      {!statusi && (
        <button
          type="button"
          onClick={dergoKerkesen}
          disabled={dukeDeruar || vende <= 0 || rilidhja}
          data-testid="send-request"
        >
          {dukeDeruar ? "Duke dërguar..." : "Dërgo kërkesën"}
        </button>
      )}
    </section>
  );
}
