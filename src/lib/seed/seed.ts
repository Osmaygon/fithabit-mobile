import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { equipment, exercises, routineFamilies, routines, routineSteps } from "@/lib/db/schema";
import { equipmentSeed, exercisesSeed, routineFamiliesSeed } from "./data";

const routineSeed = [
  { family: "full-body", name: "Full Body sin material", variant: "Sin material", category: "Fuerza", minutes: 10, steps: [["jumping-jacks", "time", 30], ["sentadilla", "reps", 15], ["flexion-adaptada", "reps", 10], ["plancha", "time", 30], ["postura-nino", "time", 40]] },
  { family: "cardio", name: "Cardio rápido", variant: "Sin material", category: "Cardio", minutes: 8, steps: [["jumping-jacks", "time", 40], ["mountain-climbers", "time", 25], ["sentadilla", "reps", 15]] },
  { family: "core", name: "Core 8 min", variant: "Esterilla", category: "Core", minutes: 8, steps: [["plancha", "time", 30], ["dead-bug", "reps", 12], ["mountain-climbers", "time", 25]] },
  { family: "piernas", name: "Piernas en casa", variant: "Sin material", category: "Fuerza", minutes: 10, steps: [["sentadilla", "reps", 18], ["puente-gluteos", "reps", 15], ["step-up-silla", "reps", 10]] },
  { family: "tren-superior", name: "Tren superior básico", variant: "Sin material", category: "Tren superior", minutes: 10, steps: [["flexion-adaptada", "reps", 10], ["plancha", "time", 25], ["postura-nino", "time", 30]] },
  { family: "movilidad", name: "Movilidad 5 min", variant: "Esterilla", category: "Movilidad", minutes: 5, steps: [["gato-vaca", "time", 45], ["postura-nino", "time", 45], ["mariposa", "time", 45]] },
  { family: "estiramiento", name: "Estiramiento 8 min", variant: "Esterilla", category: "Estiramientos", minutes: 8, steps: [["estiramiento-isquios", "time", 45], ["mariposa", "time", 45], ["postura-nino", "time", 60]] },
  { family: "flexibilidad-suave", name: "Flexibilidad suave", variant: "Esterilla", category: "Flexibilidad", minutes: 12, steps: [["mariposa", "time", 60], ["estiramiento-isquios", "time", 60], ["gato-vaca", "time", 45]] },
] as const;

export async function seedBaseData() {
  for (const [name, slug, description] of equipmentSeed) {
    const exists = await db.select({ id: equipment.id }).from(equipment).where(eq(equipment.slug, slug)).limit(1);
    if (!exists.length) await db.insert(equipment).values({ name, slug, description });
  }

  for (const family of routineFamiliesSeed) {
    const exists = await db.select({ id: routineFamilies.id }).from(routineFamilies).where(eq(routineFamilies.slug, family.slug)).limit(1);
    if (!exists.length) await db.insert(routineFamilies).values(family);
  }

  for (const exercise of exercisesSeed) {
    const exists = await db.select({ id: exercises.id }).from(exercises).where(eq(exercises.slug, exercise.slug)).limit(1);
    if (!exists.length) {
      await db.insert(exercises).values({
        name: exercise.name,
        slug: exercise.slug,
        category: exercise.category,
        recommendedType: exercise.type as "time" | "reps",
        instructions: exercise.instructions,
        tips: exercise.tips,
        commonMistakes: exercise.mistakes,
        difficulty: exercise.difficulty as "beginner" | "intermediate" | "advanced",
        isDefault: true,
      });
    }
  }

  for (const routine of routineSeed) {
    const exists = await db.select({ id: routines.id }).from(routines).where(eq(routines.name, routine.name)).limit(1);
    if (exists.length) continue;
    const family = (await db.select().from(routineFamilies).where(eq(routineFamilies.slug, routine.family)).limit(1))[0];
    const inserted = await db.insert(routines).values({
      familyId: family.id,
      variantLabel: routine.variant,
      name: routine.name,
      description: `Rutina ${routine.category.toLowerCase()} de ${routine.minutes} minutos para casa.`,
      category: routine.category,
      goal: family.goal,
      difficulty: "beginner",
      estimatedMinutes: routine.minutes,
      isDefault: true,
    }).returning({ id: routines.id });
    for (const [order, step] of routine.steps.entries()) {
      const ex = (await db.select().from(exercises).where(eq(exercises.slug, step[0])).limit(1))[0];
      await db.insert(routineSteps).values({ routineId: inserted[0].id, exerciseId: ex.id, order: order + 1, mode: step[1] as "time" | "reps", value: step[2], restSeconds: 15 });
    }
  }
}
