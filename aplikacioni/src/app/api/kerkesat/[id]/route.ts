
import { NextResponse } from "next/server";
import { profiliIm } from "@/lib/lejet";
import { getSql } from "@/lib/db";

export const dynamic = "force-dynamic";

type Context = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: Context) {
  try {
    const profili = await profiliIm();

    if (!profili) {
      return NextResponse.json(
        { error: "Duhet të kyçesh fillimisht." },
        { status: 401 }
      );
    }

    if (profili.roli !== "shofer") {
      return NextResponse.json(
        { error: "Vetëm shoferi mund të ndryshojë kërkesën." },
        { status: 403 }
      );
    }

    const { id } = await context.params;

    if (!/^\d+$/.test(id)) {
      return NextResponse.json(
        { error: "Kërkesa nuk është valide." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const veprimi = body.veprimi;

    if (veprimi !== "prano" && veprimi !== "refuzo") {
      return NextResponse.json(
        { error: "Veprimi nuk është valid." },
        { status: 400 }
      );
    }

    const sql = getSql();

    if (veprimi === "refuzo") {
      const rows = await sql`
        WITH refuzuar AS (
          UPDATE kerkesat_udhetimit k
          SET statusi = 'rejected',
              updated_at = NOW()
          FROM udhetimet u
          WHERE k.id = ${id}
            AND k.udhetim_id = u.id
            AND u.shofer_id = ${profili.id}
            AND k.statusi = 'pending'
          RETURNING
            k.id,
            k.udhetim_id,
            k.udhetar_id,
            k.statusi
        ),
        njoftimi AS (
          INSERT INTO njoftimet (
            kerkesa_id,
            perdoruesi_id,
            titulli,
            mesazhi
          )
          SELECT
            id,
            udhetar_id,
            'Kërkesa u refuzua',
            'Shoferi e refuzoi kërkesën për udhëtimin #' || udhetim_id
          FROM refuzuar
          ON CONFLICT (kerkesa_id) DO NOTHING
          RETURNING id
        )
        SELECT r.id, r.statusi
        FROM refuzuar r
        LEFT JOIN njoftimi n ON TRUE
      `;

      if (rows.length === 0) {
        return NextResponse.json(
          { error: "Kërkesa nuk ekziston ose nuk është më në pritje." },
          { status: 409 }
        );
      }

      return NextResponse.json({ ok: true, kerkesa: rows[0] });
    }

    const rows = await sql`
      WITH kerkesa_e_bllokuar AS MATERIALIZED (
        SELECT
          k.id,
          k.udhetim_id,
          k.udhetar_id
        FROM kerkesat_udhetimit k
        JOIN udhetimet u ON u.id = k.udhetim_id
        WHERE k.id = ${id}
          AND k.statusi = 'pending'
          AND u.shofer_id = ${profili.id}
          AND u.vende > 0
        FOR UPDATE OF k, u
      ),
      pranuar AS (
        UPDATE kerkesat_udhetimit k
        SET statusi = 'accepted',
            updated_at = NOW()
        FROM kerkesa_e_bllokuar b
        WHERE k.id = b.id
        RETURNING
          k.id,
          k.udhetim_id,
          k.udhetar_id,
          k.statusi
      ),
      zbrit_vendin AS (
        UPDATE udhetimet u
        SET vende = u.vende - 1
        FROM pranuar p
        WHERE u.id = p.udhetim_id
        RETURNING u.id, u.vende
      ),
      njoftimi AS (
        INSERT INTO njoftimet (
          kerkesa_id,
          perdoruesi_id,
          titulli,
          mesazhi
        )
        SELECT
          id,
          udhetar_id,
          'Kërkesa u pranua',
          'Shoferi e pranoi kërkesën për udhëtimin #' || udhetim_id
        FROM pranuar
        ON CONFLICT (kerkesa_id) DO NOTHING
        RETURNING id
      )
      SELECT
        p.id,
        p.udhetim_id AS "udhetimId",
        z.vende
      FROM pranuar p
      JOIN zbrit_vendin z ON z.id = p.udhetim_id
      LEFT JOIN njoftimi n ON TRUE
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Nuk ka vende të lira ose kërkesa nuk është më në pritje." },
        { status: 409 }
      );
    }

    return NextResponse.json({
      ok: true,
      kerkesa: rows[0],
    });
  } catch {
    return NextResponse.json(
      { error: "Ndryshimi i kërkesës dështoi." },
      { status: 500 }
    );
  }
}
