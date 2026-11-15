"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ndryshoOren } from "@/lib/lejet";

export async function ruajOren(formData: FormData) {
  let mesazh: string;

  try {
    mesazh = await ndryshoOren(
      String(formData.get("id") ?? ""),
      String(formData.get("nisja") ?? ""),
      String(formData.get("ora") ?? ""),
      String(formData.get("vende") ?? "")
    );
  } catch {
    mesazh = "databaza";
  }

  if (mesazh === "ruajtur") {
    revalidatePath("/");
    revalidatePath("/udhetimi/2");
  }

  redirect("/panel?m=" + mesazh);
}
