
"use client";

import { useState } from "react";

type GjendjaLokacionit =
  | "idle"
  | "loading"
  | "success"
  | "denied"
  | "timeout"
  | "unavailable";

export function Java8Kontrollet() {
  const [vendtakimiInput, setVendtakimiInput] = useState("Biblioteka");
  const [vendtakimiKonfirmuar, setVendtakimiKonfirmuar] = useState("Biblioteka");
  const [gabimiTakimit, setGabimiTakimit] = useState("");

  const [gjendja, setGjendja] = useState<GjendjaLokacionit>("idle");
  const [saktësia, setSaktësia] = useState<number | null>(null);

  function konfirmoVendtakimin() {
    const vendtakimi = vendtakimiInput.trim();

    if (!vendtakimi) {
      setGabimiTakimit("Shkruaj një vendtakim para konfirmimit.");
      return;
    }

    setVendtakimiKonfirmuar(vendtakimi);
    setGabimiTakimit("");
  }

  function merrLokacionin() {
    setSaktësia(null);

    if (!navigator.geolocation) {
      setGjendja("unavailable");
      return;
    }

    setGjendja("loading");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setSaktësia(position.coords.accuracy);
        setGjendja("success");
      },
      (error) => {
        if (error.code === 1) {
          setGjendja("denied");
        } else if (error.code === 3) {
          setGjendja("timeout");
        } else {
          setGjendja("unavailable");
        }
      },
      { timeout: 10000 }
    );
  }

  return (
    <section>
      <h2>Ndryshimi i vendtakimit</h2>

      <input
        data-testid="meeting-input"
        value={vendtakimiInput}
        onChange={(e) => setVendtakimiInput(e.target.value)}
      />

      <button
        data-testid="confirm-meeting"
        onClick={konfirmoVendtakimin}
      >
        Konfirmo
      </button>

      <p data-testid="confirmed-meeting">
        Vendtakimi i konfirmuar: {vendtakimiKonfirmuar}
      </p>

      <p data-testid="meeting-error">{gabimiTakimit}</p>

      <hr />

      <h2>Lokacioni im</h2>

      <button
        data-testid="locate-me"
        onClick={merrLokacionin}
        disabled={gjendja === "loading"}
      >
        {gjendja === "loading" ? "Duke kërkuar..." : "Merr lokacionin"}
      </button>

      <p data-testid="location-status" data-state={gjendja}>
        {gjendja === "loading" && "Duke kërkuar lokacionin..."}
        {gjendja === "success" && "Lokacioni u gjet."}
        {gjendja === "denied" && "Nuk e ke lejuar lokacionin."}
        {gjendja === "timeout" && "Koha e pritjes ka kaluar."}
        {gjendja === "unavailable" && "Lokacioni nuk është i disponueshëm."}
      </p>

      <p data-testid="location-accuracy">
        {saktësia !== null ? `Saktësia: ${saktësia} metra.` : ""}
      </p>
    </section>
  );
}
