import { NextResponse } from "next/server";
import { profiliIm } from "@/lib/lejet";
import { getSql } from "@/lib/db";

export const dynamic = "force-dynamic";

// Leximi i kërkesave të udhëtarit ose shoferit
export async function GET(request: Request) {
  try {
    const profili = await profiliIm();

    if (!profili) {
      return NextResponse.json(
        { error: "Duhet të kyçesh fillimisht." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const udhetimId = searchParams.get("udhetimId");

    const sql = getSql();

    if (profili.roli === "shofer") {
      const rows = await sql`
        SELECT
          k.id,
          k.udhetim_id AS "udhetimId",
          k.udhetar_id AS "udhetarId",
          k.statusi,
          k.created_at AS "createdAt"
        FROM kerkesat_udhetimit k
        JOIN udhetimet u ON u.id = k.udhetim_id
        WHERE u.shofer_id = ${profili.id}
        ORDER BY k.created_at DESC
      `;

      return NextResponse.json({ kerkesat: rows });
    }

    if (!udhetimId || !/^[123]$/.test(udhetimId)) {
      return NextResponse.json(
        { error: "Udhëtimi nuk është valid." },
        { status: 400 }
      );
    }

    const rows = await sql`
      SELECT id, statusi
      FROM kerkesat_udhetimit
      WHERE udhetim_id = ${udhetimId}
        AND udhetar_id = ${profili.id}
    `;

    return NextResponse.json({ kerkesat: rows });
  } catch {
    return NextResponse.json(
      { error: "Kërkesat nuk mund të lexohen." },
      { status: 500 }
    );
  }
}

// Dërgimi i kërkesës nga udhëtari
export async function POST(request: Request) {
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
        { error: "Vetëm udhëtarët mund të dërgojnë kërkesa." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const udhetimId = body.udhetimId;

    if (typeof udhetimId !== "string" || !/^[123]$/.test(udhetimId)) {
      return NextResponse.json(
        { error: "Udhëtimi nuk është valid." },
        { status: 400 }
      );
    }

    const sql = getSql();

    const udhetimet = await sql`
      SELECT id, vende
      FROM udhetimet
      WHERE id = ${udhetimId}
    `;

    if (udhetimet.length === 0) {
      return NextResponse.json(
        { error: "Udhëtimi nuk ekziston." },
        { status: 404 }
      );
    }

    if (Number(udhetimet[0].vende) <= 0) {
      return NextResponse.json(
        { error: "Nuk ka vende të lira." },
        { status: 409 }
      );
    }

    const rows = await sql`
      INSERT INTO kerkesat_udhetimit
        (udhetim_id, udhetar_id)
      VALUES
        (${udhetimId}, ${profili.id})
      ON CONFLICT (udhetim_id, udhetar_id)
      DO NOTHING
      RETURNING id, statusi
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Ke dërguar tashmë kërkesë për këtë udhëtim." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { ok: true, kerkesa: rows[0] },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Dërgimi i kërkesës dështoi." },
      { status: 500 }
    );
  }
}