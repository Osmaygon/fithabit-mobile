"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { workouts } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth/session";

export async function addManualWorkoutAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  await db.insert(workouts).values({
    userId: user.id,
    name: String(formData.get("name") || "Entrenamiento manual"),
    category: String(formData.get("category") || "Otro"),
    durationSeconds: Number(formData.get("minutes") || 1) * 60,
    intensity: String(formData.get("intensity") || "medium") as "easy" | "medium" | "hard",
    completedAt: formData.get("date") ? new Date(String(formData.get("date"))) : new Date(),
    source: "manual",
    notes: String(formData.get("notes") || "") || null,
  });
  redirect("/app/history");
}

export async function quickCompleteRoutineAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  await db.insert(workouts).values({
    userId: user.id,
    routineId: String(formData.get("routineId") || "") || null,
    name: String(formData.get("name") || "Full Body 10 min"),
    category: String(formData.get("category") || "Fuerza"),
    durationSeconds: Number(formData.get("minutes") || 10) * 60,
    intensity: String(formData.get("intensity") || "medium") as "easy" | "medium" | "hard",
    completedAt: new Date(),
    source: "routine",
  });
  redirect("/app/history");
}

export async function addWeightAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const { bodyWeightEntries } = await import("@/lib/db/schema");
  await db.insert(bodyWeightEntries).values({
    userId: user.id,
    weight: String(formData.get("weight") || "0"),
    unit: "kg",
    recordedAt: new Date(),
    notes: String(formData.get("notes") || "") || null,
  });
  redirect("/app/progress");
}
