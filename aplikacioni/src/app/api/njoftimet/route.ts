import { NextResponse } from "next/server";
import { profiliIm } from "@/lib/lejet";
import { getSql } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const profili = await profiliIm();

    if (!profili) {
      return NextResponse.json(
        { error: "Duhet të kyçesh fillimisht." },
        { status: 401 }
      );
    }

    if (profili.roli !== "udhetar") {
      return NextResponse.json(
        { error: "Vetëm udhëtarët mund t'i shohin njoftimet." },
        { status: 403 }
      );
    }

    const sql = getSql();

    const rows = await sql`
      SELECT
        n.id,
        n.kerkesa_id AS "kerkesaId",
        n.titulli,
        n.mesazhi,
        n.lexuar,
        n.created_at AS "createdAt",
        k.udhetim_id AS "udhetimId",
        k.statusi
      FROM njoftimet n
      JOIN kerkesat_udhetimit k
        ON k.id = n.kerkesa_id
      WHERE n.perdoruesi_id = ${profili.id}
      ORDER BY n.created_at DESC
    `;

    return NextResponse.json({
      njoftimet: rows,
      tePalexuara: rows.filter((njoftim) => !njoftim.lexuar).length,
    });
  } catch {
    return NextResponse.json(
      { error: "Njoftimet nuk mund të lexohen." },
      { status: 500 }
    );
  }
}