"use client";

import { useState } from "react";

export function Java8Kontrollet() {
  const [vendtakimiInput, setVendtakimiInput] = useState("Biblioteka");
  const [vendtakimiKonfirmuar, setVendtakimiKonfirmuar] = useState("Biblioteka");

  const [dukeNgarkuar, setDukeNgarkuar] = useState(false);
  const [mesazhi, setMesazhi] = useState("");

  function merrLokacionin() {
    if (!navigator.geolocation) {
      setMesazhi("Pajisja nuk e mbështet lokacionin.");
      return;
    }

    setDukeNgarkuar(true);
    setMesazhi("Duke kërkuar lokacionin...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setDukeNgarkuar(false);

        const accuracy = position.coords.accuracy;

        setMesazhi("Lokacioni u gjet. Saktësia: " + accuracy + " metra.");
      },
      (error) => {
        setDukeNgarkuar(false);

        if (error.code === 1) {
          setMesazhi("Nuk e ke lejuar lokacionin.");
        } else if (error.code === 2) {
          setMesazhi("Lokacioni nuk është i disponueshëm.");
        } else if (error.code === 3) {
          setMesazhi("Koha e pritjes ka kaluar.");
        }
      },
      { timeout: 10000 }
    );
  }

  return (
    <section>
      <h2>Ndryshimi i vendtakimit</h2>

      <input
        value={vendtakimiInput}
        onChange={(e) => setVendtakimiInput(e.target.value)}
      />

      <button
        onClick={() => setVendtakimiKonfirmuar(vendtakimiInput)}
      >
        Konfirmo
      </button>

      <p>Vendtakimi i konfirmuar: {vendtakimiKonfirmuar}</p>

      <hr />

      <h2>Lokacioni im</h2>

      <button onClick={merrLokacionin} disabled={dukeNgarkuar}>
        {dukeNgarkuar ? "Duke kërkuar..." : "Merr lokacionin"}
      </button>

      <p>{mesazhi}</p>
    </section>
  );
}