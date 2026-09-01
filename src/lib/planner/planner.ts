import { and, eq, isNull, or } from "drizzle-orm";
import { db } from "@/lib/db";
import { equipment, routines, userEquipment, userPreferences } from "@/lib/db/schema";

type Routine = typeof routines.$inferSelect;

const goalPriority: Record<string, string[]> = {
  stay_active: ["Fuerza", "Cardio", "Movilidad", "Estiramientos", "Flexibilidad"],
  strength: ["Fuerza", "Tren superior", "Core", "Cardio", "Estiramientos"],
  mobility: ["Movilidad", "Estiramientos", "Flexibilidad", "Relajación", "Core"],
  fat_loss: ["Cardio", "Fuerza", "Core", "Movilidad", "Estiramientos"],
};

const weeklyTemplates: Record<number, string[]> = {
  2: ["Fuerza", "Movilidad"],
  3: ["Fuerza", "Cardio", "Estiramientos"],
  4: ["Fuerza", "Cardio", "Core", "Movilidad"],
  5: ["Fuerza", "Cardio", "Core", "Movilidad", "Estiramientos"],
};

function difficultyScore(level: string) {
  return level === "advanced" ? 3 : level === "intermediate" ? 2 : 1;
}

function routineScore(routine: Routine, prefs: { goal: string; availableTime: number; level: string }, targetCategory?: string) {
  let score = 0;
  if (targetCategory && routine.category === targetCategory) score += 40;
  const priorities = goalPriority[prefs.goal] ?? goalPriority.stay_active;
  const goalIndex = priorities.indexOf(routine.category);
  if (goalIndex >= 0) score += 30 - goalIndex * 4;
  score += Math.max(0, 20 - Math.abs(routine.estimatedMinutes - prefs.availableTime) * 2);
  score -= Math.max(0, difficultyScore(routine.difficulty) - difficultyScore(prefs.level)) * 12;
  if (routine.isDefault) score += 4;
  return score;
}

export async function getWorkoutPlan(userId: string) {
  const prefs = (await db.select().from(userPreferences).where(eq(userPreferences.userId, userId)).limit(1))[0] ?? {
    goal: "stay_active",
    availableTime: 10,
    level: "beginner",
    daysPerWeek: 3,
  };

  const userMaterials = await db
    .select({ slug: equipment.slug })
    .from(userEquipment)
    .innerJoin(equipment, eq(userEquipment.equipmentId, equipment.id))
    .where(and(eq(userEquipment.userId, userId), eq(userEquipment.hasEquipment, true)));

  const materialSlugs = new Set(userMaterials.map((m) => m.slug));
  materialSlugs.add("none");

  // MVP: las rutinas todavía no tienen tabla de material requerido enlazada.
  // Priorizamos por objetivo, tiempo y nivel; queda preparado para filtrar por material requerido.
  const allRoutines = await db
    .select()
    .from(routines)
    .where(or(eq(routines.isDefault, true), and(eq(routines.userId, userId), isNull(routines.deletedAt))));

  const days = Math.min(Math.max(Number(prefs.daysPerWeek) || 3, 2), 5);
  const template = weeklyTemplates[days] ?? weeklyTemplates[3];
  const selected: Routine[] = [];

  for (const category of template) {
    const candidate = allRoutines
      .filter((r) => !selected.some((s) => s.id === r.id))
      .sort((a, b) => routineScore(b, prefs, category) - routineScore(a, prefs, category))[0];
    if (candidate) selected.push(candidate);
  }

  const recommendation = [...allRoutines].sort((a, b) => routineScore(b, prefs) - routineScore(a, prefs))[0] ?? null;

  return {
    prefs,
    materialSlugs: [...materialSlugs],
    recommendation,
    weeklyPlan: selected.map((routine, index) => ({
      day: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"][index],
      routine,
      reason: `Encaja con ${prefs.availableTime} min, nivel ${prefs.level} y objetivo ${prefs.goal}.`,
    })),
  };
}
