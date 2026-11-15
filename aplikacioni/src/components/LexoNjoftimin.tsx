
"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function LexoNjoftimin() {
  const searchParams = useSearchParams();
  const njoftimId = searchParams.get("njoftim");

  useEffect(() => {
    if (!njoftimId || !/^\d+$/.test(njoftimId)) {
      return;
    }

    fetch(`/api/njoftimet/${njoftimId}`, {
      method: "PATCH",
    }).catch(() => {
      console.error("Njoftimi nuk mund të shënohet si i lexuar.");
    });
  }, [njoftimId]);

  return null;
}
