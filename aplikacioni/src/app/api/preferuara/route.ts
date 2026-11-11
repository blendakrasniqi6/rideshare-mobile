import { NextResponse } from "next/server";
import { profiliIm } from "@/lib/lejet";
import { getSql } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const profili = await profiliIm();

    if (!profili) {
      return NextResponse.json(
        { error: "Duhet të kyçesh fillimisht." },
        { status: 401 }
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
      SELECT id FROM udhetimet WHERE id = ${udhetimId}
    `;

    if (udhetimet.length === 0) {
      return NextResponse.json(
        { error: "Udhëtimi nuk ekziston." },
        { status: 404 }
      );
    }

    await sql`
      INSERT INTO udhetimet_preferuara (github_id, udhetim_id)
      VALUES (${profili.id}, ${udhetimId})
      ON CONFLICT (github_id, udhetim_id) DO NOTHING
    `;

    return NextResponse.json({ ok: true, saved: true });

  } catch {
    return NextResponse.json(
      { error: "Ruajtja dështoi. Provo përsëri." },
      { status: 500 }
    );
  }
}