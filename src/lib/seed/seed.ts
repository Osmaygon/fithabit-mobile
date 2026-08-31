import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { equipment, exercises, routineFamilies } from "@/lib/db/schema";
import { equipmentSeed, exercisesSeed, routineFamiliesSeed } from "./data";

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
}
