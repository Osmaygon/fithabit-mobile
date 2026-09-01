"use server";

import { redirect } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { routines, routineSteps } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth/session";

export async function duplicateRoutineAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const id = String(formData.get("routineId"));
  const original = (await db.select().from(routines).where(eq(routines.id, id)).limit(1))[0];
  if (!original) redirect("/app/routines");
  const copy = await db.insert(routines).values({
    familyId: original.familyId,
    userId: user.id,
    sourceRoutineId: original.id,
    variantLabel: original.variantLabel,
    name: `${original.name} copia`,
    description: original.description,
    category: original.category,
    goal: original.goal,
    difficulty: original.difficulty,
    estimatedMinutes: original.estimatedMinutes,
    isDefault: false,
  }).returning({ id: routines.id });
  const steps = await db.select().from(routineSteps).where(eq(routineSteps.routineId, id)).orderBy(asc(routineSteps.order));
  for (const step of steps) {
    await db.insert(routineSteps).values({ routineId: copy[0].id, exerciseId: step.exerciseId, order: step.order, mode: step.mode, value: step.value, restSeconds: step.restSeconds, notes: step.notes });
  }
  redirect(`/app/routines/${copy[0].id}`);
}

export async function createSimpleRoutineAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const routine = await db.insert(routines).values({
    userId: user.id,
    name: String(formData.get("name") || "Mi rutina"),
    description: String(formData.get("description") || "Rutina personalizada"),
    category: String(formData.get("category") || "Fuerza"),
    goal: "stay_active",
    difficulty: String(formData.get("difficulty") || "beginner") as "beginner" | "intermediate" | "advanced",
    estimatedMinutes: Number(formData.get("minutes") || 10),
    isDefault: false,
  }).returning({ id: routines.id });
  redirect(`/app/routines/${routine[0].id}`);
}

export async function deleteRoutineAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const id = String(formData.get("routineId"));
  await db.update(routines).set({ deletedAt: new Date() }).where(eq(routines.id, id));
  redirect("/app/routines");
}
