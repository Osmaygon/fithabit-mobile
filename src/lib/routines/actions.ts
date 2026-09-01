"use server";

import { redirect } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { exercises, routines, routineSteps } from "@/lib/db/schema";
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
  const routine = (await db.select().from(routines).where(eq(routines.id, id)).limit(1))[0];
  if (routine && !routine.isDefault && routine.userId === user.id) {
    await db.update(routines).set({ deletedAt: new Date() }).where(eq(routines.id, id));
  }
  redirect("/app/routines");
}

export async function addRoutineStepAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const routineId = String(formData.get("routineId"));
  const routine = (await db.select().from(routines).where(eq(routines.id, routineId)).limit(1))[0];
  if (!routine || routine.isDefault || routine.userId !== user.id) redirect(`/app/routines/${routineId}`);
  const current = await db.select().from(routineSteps).where(eq(routineSteps.routineId, routineId));
  await db.insert(routineSteps).values({
    routineId,
    exerciseId: String(formData.get("exerciseId")),
    order: current.length + 1,
    mode: String(formData.get("mode")) as "time" | "reps",
    value: Number(formData.get("value") || 10),
    restSeconds: Number(formData.get("restSeconds") || 15),
  });
  redirect(`/app/routines/${routineId}`);
}

export async function removeRoutineStepAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const routineId = String(formData.get("routineId"));
  const stepId = String(formData.get("stepId"));
  const routine = (await db.select().from(routines).where(eq(routines.id, routineId)).limit(1))[0];
  if (routine && !routine.isDefault && routine.userId === user.id) await db.delete(routineSteps).where(eq(routineSteps.id, stepId));
  redirect(`/app/routines/${routineId}`);
}

export async function createExerciseAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  await db.insert(exercises).values({
    userId: user.id,
    name: String(formData.get("name") || "Ejercicio"),
    category: String(formData.get("category") || "Fuerza"),
    recommendedType: String(formData.get("recommendedType") || "reps") as "time" | "reps",
    instructions: String(formData.get("instructions") || "Realiza el ejercicio con control."),
    tips: String(formData.get("tips") || "Mantén una técnica cómoda y estable."),
    commonMistakes: String(formData.get("commonMistakes") || "Evita movimientos bruscos."),
    muscles: String(formData.get("muscles") || "General"),
    difficulty: "beginner",
    isDefault: false,
  });
  redirect("/app/routines");
}
