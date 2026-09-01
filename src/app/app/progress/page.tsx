import { eq } from "drizzle-orm";
import { PageHeader } from "@/components/app-shell";
import { getCurrentUser } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { bodyWeightEntries, workouts } from "@/lib/db/schema";
import { addWeightAction } from "@/lib/workouts/actions";
import { WeightChart } from "@/components/weight-chart";

export default async function ProgressPage() {
  const user = await getCurrentUser();
  const items = user ? await db.select().from(workouts).where(eq(workouts.userId, user.id)) : [];
  const weights = user ? await db.select().from(bodyWeightEntries).where(eq(bodyWeightEntries.userId, user.id)).limit(12) : [];
  const totalMin = Math.round(items.reduce((a, w) => a + w.durationSeconds, 0) / 60);
  const activeDays = new Set(items.map((w) => new Date(w.completedAt).toDateString()));
  const byCat = items.reduce<Record<string, number>>((a, w) => ((a[w.category] = (a[w.category] || 0) + 1), a), {});
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const thisMonth = new Date().getMonth();
  const monthDays = new Set(items.filter(w => new Date(w.completedAt).getMonth() === thisMonth).map(w => new Date(w.completedAt).getDate()));
  return (
    <section>
      <PageHeader eyebrow="Constancia" title="Progreso" description="Rachas, calendario mensual, categorías y peso corporal." />
      <div className="grid grid-cols-2 gap-3"><Card label="Días activos" value={`${activeDays.size}`} /><Card label="Total" value={`${items.length} entrenos`} /><Card label="Minutos" value={`${totalMin} min`} /><Card label="Último peso" value={weights[0] ? `${weights[0].weight} kg` : "—"} /></div>
      <section className="mt-5 rounded-[2rem] bg-white/80 p-5 shadow-sm ring-1 ring-black/5"><h2 className="mb-4 font-bold">Calendario mensual</h2><div className="grid grid-cols-7 gap-2 text-center text-sm">{days.map((day) => <div key={day} className={`rounded-xl py-2 font-semibold ${monthDays.has(day) ? "bg-primary text-white" : "bg-[#f4f7f3] text-[#607169]"}`}>{day}</div>)}</div></section>
      <section className="mt-5 rounded-[2rem] bg-white/80 p-5 shadow-sm ring-1 ring-black/5"><h2 className="mb-3 font-bold">Por categoría</h2>{Object.keys(byCat).length ? Object.entries(byCat).map(([c,n])=><p key={c} className="flex justify-between border-b border-black/5 py-2"><span>{c}</span><b>{n}</b></p>) : <p className="text-sm text-[#607169]">Sin datos todavía.</p>}</section>
      <section className="mt-5 rounded-[2rem] bg-white/80 p-5 shadow-sm ring-1 ring-black/5"><h2 className="mb-3 font-bold">Evolución de peso</h2><WeightChart data={weights.slice().reverse().map((w) => ({ date: new Date(w.recordedAt).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit" }), weight: Number(w.weight) }))} /></section>
      <form action={addWeightAction} className="mt-5 space-y-3 rounded-[2rem] bg-white/80 p-5 shadow-sm ring-1 ring-black/5"><h2 className="font-bold">Añadir peso</h2><input name="weight" type="number" step="0.1" min="1" placeholder="Peso (kg)" required className="w-full rounded-2xl bg-[#f8faf7] px-4 py-3" /><input name="notes" placeholder="Nota opcional" className="w-full rounded-2xl bg-[#f8faf7] px-4 py-3" /><button className="w-full rounded-2xl bg-[#23352b] py-3 font-bold text-white">Añadir peso</button></form>
    </section>
  );
}
function Card({ label, value }: { label: string; value: string }) { return <article className="rounded-[1.5rem] bg-white/80 p-4 shadow-sm ring-1 ring-black/5"><p className="text-2xl font-bold">{value}</p><p className="text-sm text-[#607169]">{label}</p></article>; }
