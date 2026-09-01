import Link from "next/link";
import { Activity, Bell, Dumbbell, Flame, HeartPulse, StretchHorizontal } from "lucide-react";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth/session";
import { getWorkoutPlan } from "@/lib/planner/planner";
import { db } from "@/lib/db";
import { workouts } from "@/lib/db/schema";

export default async function HomePage() {
  const user = await getCurrentUser();
  if (!user) return null;
  const plan = await getWorkoutPlan(user.id);
  const history = await db.select().from(workouts).where(eq(workouts.userId, user.id));
  const recommendation = plan.recommendation;
  const weekMinutes = Math.round(history.reduce((sum, item) => sum + item.durationSeconds, 0) / 60);
  const activeDays = new Set(history.map((item) => new Date(item.completedAt).toDateString())).size;

  return (
    <section className="flex flex-col gap-5">
      <header className="flex items-center justify-between pt-2">
        <div>
          <p className="text-sm font-semibold text-primary-dark">FitHabit</p>
          <h1 className="font-serif text-4xl font-semibold tracking-tight">Hoy</h1>
        </div>
        <Link href="/app/settings" className="rounded-full bg-white/80 p-3 shadow-sm ring-1 ring-black/5" aria-label="Recordatorios"><Bell size={20} /></Link>
      </header>

      <section className="overflow-hidden rounded-[2rem] bg-[#23352b] p-6 text-white shadow-xl shadow-green-900/10">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div><p className="mb-2 text-sm text-white/65">Rutina recomendada</p><h2 className="max-w-[14rem] font-serif text-4xl font-semibold leading-none">{recommendation?.name ?? "Full Body 10 min"}</h2></div>
          <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold text-white/80">{recommendation?.variantLabel ?? "Sin material"}</span>
        </div>
        <div className="mb-6 grid grid-cols-3 gap-2 text-center text-sm"><Mini value={String(plan.weeklyPlan.length)} label="días plan"/><Mini value={String(recommendation?.estimatedMinutes ?? 10)} label="min"/><Mini value="Fácil" label="nivel"/></div>
        <Link href={recommendation ? `/app/workout?routineId=${recommendation.id}` : "/app/workout"} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#f8faf7] py-4 font-bold text-[#23352b] shadow-lg shadow-black/20"><Activity size={20} />Empezar entrenamiento</Link>
      </section>

      <section className="grid grid-cols-2 gap-3"><article className="rounded-[1.5rem] bg-white/75 p-4 shadow-sm ring-1 ring-black/5"><Flame className="mb-3 text-primary-dark" size={22} /><p className="text-2xl font-bold">{activeDays}</p><p className="text-sm text-[#607169]">Días activos</p></article><article className="rounded-[1.5rem] bg-white/75 p-4 shadow-sm ring-1 ring-black/5"><HeartPulse className="mb-3 text-primary-dark" size={22} /><p className="text-2xl font-bold">{weekMinutes} min</p><p className="text-sm text-[#607169]">Total registrado</p></article></section>

      <section className="rounded-[1.75rem] bg-white/70 p-4 shadow-sm ring-1 ring-black/5"><div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-bold">Plan sugerido</h2><Link href="/app/routines" className="text-sm font-bold text-primary-dark">Ver rutinas</Link></div><div className="space-y-3">{plan.weeklyPlan.map(({ day, routine, reason }) => <article key={routine.id} className="flex items-center gap-3 rounded-2xl bg-[#f4f7f3] p-3"><div className="flex size-12 items-center justify-center rounded-2xl bg-white text-primary-dark shadow-sm">{routine.category.includes("Estir") ? <StretchHorizontal size={22} /> : <Dumbbell size={22} />}</div><div className="min-w-0 flex-1"><p className="font-bold">{day}: {routine.name}</p><p className="text-sm text-[#607169]">{routine.estimatedMinutes} min · {reason}</p></div></article>)}</div></section>
    </section>
  );
}
function Mini({ value, label }: { value: string; label: string }) { return <div className="rounded-2xl bg-white/10 p-3"><p className="text-xl font-bold">{value}</p><p className="text-white/60">{label}</p></div>; }
