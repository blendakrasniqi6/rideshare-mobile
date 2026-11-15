import { NextResponse } from "next/server";
import { profiliIm } from "@/lib/lejet";
import { getSql } from "@/lib/db";

export const dynamic = "force-dynamic";

type Context = {
  params: Promise<{ id: string }>;
};

export async function PATCH(
  request: Request,
  context: Context
) {
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
        { error: "Vetëm udhëtarët mund t'i ndryshojnë njoftimet." },
        { status: 403 }
      );
    }

    const { id } = await context.params;

    if (!/^\d+$/.test(id)) {
      return NextResponse.json(
        { error: "Njoftimi nuk është valid." },
        { status: 400 }
      );
    }

    const sql = getSql();

    const rows = await sql`
      UPDATE njoftimet
      SET lexuar = TRUE
      WHERE id = ${id}
        AND perdoruesi_id = ${profili.id}
      RETURNING
        id,
        kerkesa_id AS "kerkesaId",
        lexuar
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Njoftimi nuk ekziston ose nuk të përket." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      njoftimi: rows[0],
    });
  } catch {
    return NextResponse.json(
      { error: "Njoftimi nuk mund të shënohet si i lexuar." },
      { status: 500 }
    );
  }
}