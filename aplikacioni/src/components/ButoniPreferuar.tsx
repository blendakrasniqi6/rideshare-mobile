"use client";

import { useState } from "react";

type Props = {
  udhetimId: string;
  fillimishtPreferuar: boolean;
};

export function ButoniPreferuar({
  udhetimId,
  fillimishtPreferuar,
}: Props) {
  const [preferuar, setPreferuar] = useState(fillimishtPreferuar);
  const [dukeRuajtur, setDukeRuajtur] = useState(false);
  const [gabim, setGabim] = useState(false);

  async function ruaj() {
    if (dukeRuajtur || preferuar) return;

    setPreferuar(true);
    setDukeRuajtur(true);
    setGabim(false);

    try {
      const response = await fetch("/api/preferuara", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ udhetimId }),
      });

      if (!response.ok) {
        throw new Error("Ruajtja dështoi");
      }

      const data = await response.json();

      if (!data.ok || !data.saved) {
        throw new Error("Ruajtja nuk u konfirmua");
      }
    } catch {
      setPreferuar(false);
      setGabim(true);
    } finally {
      setDukeRuajtur(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={ruaj}
        disabled={dukeRuajtur || preferuar}
        aria-live="polite"
      >
        {dukeRuajtur
          ? "Duke u ruajtur..."
          : preferuar
            ? "✓ E preferuar"
            : "♡ Ruaj te të preferuarat"}
      </button>

      {gabim && (
        <div role="alert">
          <p>Ruajtja dështoi. U kthye gjendja e mëparshme.</p>
          <button type="button" onClick={ruaj}>
            Provo përsëri
          </button>
        </div>
      )}
    </div>
  );
}