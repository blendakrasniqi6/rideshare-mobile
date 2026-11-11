import "server-only";
import { getSql } from "./db";
import { profiliIm } from "./lejet";

export async function lexoIdPreferuara(): Promise<string[]> {
  const profili = await profiliIm();

  if (!profili) return [];

  const sql = getSql();

  const rows = await sql`
    SELECT udhetim_id
    FROM udhetimet_preferuara
    WHERE github_id = ${profili.id}
  `;

  return rows.map((row) => String(row.udhetim_id));
}