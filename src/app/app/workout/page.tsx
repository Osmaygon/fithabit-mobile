import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { exercises, routines, routineSteps } from "@/lib/db/schema";
import { WorkoutRunner, type WorkoutStep } from "./runner";

export default async function WorkoutPage({ searchParams }: { searchParams: Promise<{ routineId?: string }> }) {
  const { routineId } = await searchParams;
  let name = "Full Body 10 min";
  let category = "Fuerza";
  let minutes = 10;
  let steps: WorkoutStep[] = [
    { name: "Jumping jacks", mode: "time", value: 30 },
    { name: "Sentadillas", mode: "reps", value: 15 },
    { name: "Plancha", mode: "time", value: 30 },
  ];
  if (routineId) {
    const routine = (await db.select().from(routines).where(eq(routines.id, routineId)).limit(1))[0];
    if (routine) {
      name = routine.name; category = routine.category; minutes = routine.estimatedMinutes;
      const rows = await db.select({ step: routineSteps, exercise: exercises }).from(routineSteps).leftJoin(exercises, eq(routineSteps.exerciseId, exercises.id)).where(eq(routineSteps.routineId, routineId)).orderBy(asc(routineSteps.order));
      steps = rows.map(({ step, exercise }) => ({ name: exercise?.name ?? "Ejercicio", mode: step.mode, value: step.value }));
    }
  }
  return <WorkoutRunner name={name} category={category} minutes={minutes} steps={steps} />;
}
