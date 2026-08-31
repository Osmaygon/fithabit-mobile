import { NextResponse } from "next/server";
import { seedBaseData } from "@/lib/seed/seed";

export async function POST() {
  if (process.env.NODE_ENV === "production" && process.env.SEED_SECRET) {
    // Se puede proteger más adelante con header secreto.
  }

  await seedBaseData();
  return NextResponse.json({ ok: true });
}
