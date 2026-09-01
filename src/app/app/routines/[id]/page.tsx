import Link from "next/link";
import { eq, asc } from "drizzle-orm";
import { db } from "@/lib/db";
import { exercises, routines, routineSteps } from "@/lib/db/schema";

export default async function RoutineDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const routine = (await db.select().from(routines).where(eq(routines.id, id)).limit(1))[0];
  if (!routine) return <main className="p-6">Rutina no encontrada</main>;
  const steps = await db.select({ step: routineSteps, exercise: exercises }).from(routineSteps).leftJoin(exercises, eq(routineSteps.exerciseId, exercises.id)).where(eq(routineSteps.routineId, id)).orderBy(asc(routineSteps.order));
  return <main className="mx-auto min-h-screen max-w-md px-4 py-8"><p className="text-sm font-bold text-primary-dark">{routine.category}</p><h1 className="font-serif text-4xl font-semibold">{routine.name}</h1><p className="mt-2 text-[#607169]">{routine.description}</p><div className="my-5 grid grid-cols-3 gap-2 text-center"><Box value={`${routine.estimatedMinutes}`} label="min"/><Box value={`${steps.length}`} label="pasos"/><Box value="Fácil" label="nivel"/></div><Link href={`/app/workout?routineId=${routine.id}`} className="block rounded-2xl bg-[#23352b] py-4 text-center font-bold text-white">Empezar</Link><section className="mt-6 space-y-3">{steps.map(({ step, exercise }) => <article key={step.id} className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-black/5"><p className="font-bold">{step.order}. {exercise?.name}</p><p className="text-sm text-[#607169]">{step.mode === "time" ? `${step.value} segundos` : `${step.value} repeticiones`} · descanso {step.restSeconds}s</p><details className="mt-2 text-sm text-[#607169]"><summary className="font-bold text-primary-dark">Instrucciones</summary>{exercise?.instructions}</details></article>)}</section></main>;
}
function Box({value,label}:{value:string;label:string}){return <div className="rounded-2xl bg-white/80 p-3"><p className="text-xl font-bold">{value}</p><p className="text-sm text-[#607169]">{label}</p></div>}
