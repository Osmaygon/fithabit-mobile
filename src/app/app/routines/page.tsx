import { db } from "@/lib/db";
import { exercises, routineFamilies } from "@/lib/db/schema";
import { PageHeader } from "@/components/app-shell";

export default async function RoutinesPage() {
  const families = await db.select().from(routineFamilies);
  const baseExercises = await db.select().from(exercises).limit(6);
  return (
    <section>
      <PageHeader eyebrow="Biblioteca" title="Rutinas" description="Familias de rutinas y ejercicios base para entrenar en casa." />
      <div className="grid gap-3 md:grid-cols-2">
        {families.map((family) => (
          <article key={family.id} className="rounded-[1.6rem] bg-white/80 p-4 shadow-sm ring-1 ring-black/5">
            <p className="font-bold">{family.name}</p>
            <p className="mt-1 text-sm text-[#607169]">{family.description}</p>
            <button className="mt-4 rounded-2xl bg-[#e8f2ea] px-4 py-2 text-sm font-bold text-primary-dark">Ver variantes</button>
          </article>
        ))}
      </div>
      <h2 className="mb-3 mt-6 text-lg font-bold">Ejercicios base</h2>
      <div className="space-y-3">
        {baseExercises.map((exercise) => (
          <article key={exercise.id} className="rounded-2xl bg-[#f4f7f3] p-4">
            <p className="font-bold">{exercise.name}</p>
            <p className="text-sm text-[#607169]">{exercise.category} · {exercise.recommendedType === "time" ? "Tiempo" : "Repeticiones"}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
