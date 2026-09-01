import { desc, eq } from "drizzle-orm";
import { PageHeader } from "@/components/app-shell";
import { getCurrentUser } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { workouts } from "@/lib/db/schema";
import { addManualWorkoutAction } from "@/lib/workouts/actions";

export default async function HistoryPage() {
  const user = await getCurrentUser();
  const items = user ? await db.select().from(workouts).where(eq(workouts.userId, user.id)).orderBy(desc(workouts.completedAt)).limit(20) : [];
  return (
    <section>
      <PageHeader eyebrow="Registro" title="Historial" description="Rutinas completadas y entrenamientos manuales." />
      <form action={addManualWorkoutAction} className="mb-5 space-y-3 rounded-[2rem] bg-white/80 p-5 shadow-sm ring-1 ring-black/5">
        <h2 className="font-bold">Añadir entrenamiento manual</h2>
        <input name="name" placeholder="Nombre" required className="w-full rounded-2xl bg-[#f8faf7] px-4 py-3" />
        <div className="grid grid-cols-2 gap-2">
          <select name="category" required className="rounded-2xl bg-[#f8faf7] px-4 py-3"><option>Fuerza</option><option>Cardio</option><option>Movilidad</option><option>Estiramientos</option><option>Flexibilidad</option><option>Caminata</option><option>Otro</option></select>
          <input name="minutes" type="number" min="1" placeholder="Minutos" required className="rounded-2xl bg-[#f8faf7] px-4 py-3" />
          <input name="date" type="date" className="rounded-2xl bg-[#f8faf7] px-4 py-3" />
          <select name="intensity" required className="rounded-2xl bg-[#f8faf7] px-4 py-3"><option value="easy">Fácil</option><option value="medium">Medio</option><option value="hard">Difícil</option></select>
        </div>
        <textarea name="notes" placeholder="Notas opcionales" className="w-full rounded-2xl bg-[#f8faf7] px-4 py-3" />
        <button className="w-full rounded-2xl bg-[#23352b] py-3 font-bold text-white">Guardar</button>
      </form>
      <div className="space-y-3">
        {items.length === 0 ? <Empty /> : items.map((w) => <article key={w.id} className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-black/5"><p className="font-bold">{w.name}</p><p className="text-sm text-[#607169]">{w.category} · {Math.round(w.durationSeconds / 60)} min · {labelIntensity(w.intensity)}</p><p className="text-xs text-[#607169]">{new Date(w.completedAt).toLocaleDateString("es-ES")}</p></article>)}
      </div>
    </section>
  );
}
function Empty(){return <div className="rounded-[2rem] bg-white/80 p-6 text-center shadow-sm ring-1 ring-black/5"><p className="font-bold">Sin entrenamientos todavía</p><p className="mt-2 text-sm text-[#607169]">Completa una rutina o añade una actividad manual.</p></div>}
function labelIntensity(value: string) { return value === "easy" ? "Fácil" : value === "hard" ? "Difícil" : "Medio"; }
