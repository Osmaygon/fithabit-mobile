"use client";

import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { quickCompleteRoutineAction } from "@/lib/workouts/actions";

export type WorkoutStep = { name: string; mode: "time" | "reps"; value: number; instructions?: string; muscles?: string };

export function WorkoutRunner({ name, category, minutes, steps }: { name: string; category: string; minutes: number; steps: WorkoutStep[] }) {
  const safeSteps = steps.length ? steps : [{ name: "Entrenamiento libre", mode: "time" as const, value: minutes * 60, muscles: "General", instructions: "Realiza la actividad con ritmo cómodo." }];
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [left, setLeft] = useState<number>(safeSteps[0].value);
  const step = safeSteps[index];
  const done = index >= safeSteps.length;
  function nextStep() { setIndex((current) => { const next = current + 1; setLeft(safeSteps[next]?.value ?? 0); return next; }); }
  useEffect(() => { if (!started || !step || step.mode !== "time") return; const t = setTimeout(() => { if (left <= 1) nextStep(); else setLeft((v) => v - 1); }, 1000); return () => clearTimeout(t); });

  if (!started) return <main className="mx-auto min-h-screen max-w-md px-4 py-8"><p className="text-sm font-bold text-primary-dark">Rutina de hoy</p><h1 className="font-serif text-4xl font-semibold">{name}</h1><p className="mt-2 text-[#607169]">{minutes} minutos · {safeSteps.length} ejercicios</p><section className="mt-6 space-y-3">{safeSteps.map((s, i) => <article key={`${s.name}-${i}`} className="rounded-[1.5rem] bg-white/85 p-4 shadow-sm ring-1 ring-black/5"><div className="flex items-start justify-between gap-3"><div><p className="font-bold">{i + 1}. {s.name}</p><p className="text-sm font-semibold text-primary-dark">{s.mode === "time" ? `${s.value} segundos` : `${s.value} repeticiones`}</p></div><span className="rounded-full bg-[#e8f2ea] px-3 py-1 text-xs font-bold text-primary-dark">{s.muscles ?? "General"}</span></div><p className="mt-3 text-sm leading-6 text-[#607169]">{s.instructions}</p></article>)}</section><button onClick={() => setStarted(true)} className="sticky bottom-5 mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#23352b] py-4 font-bold text-white shadow-xl"><Play size={20}/>Comenzar rutina</button></main>;

  return <main className="mx-auto flex min-h-screen max-w-md flex-col px-4 py-8"><p className="text-sm font-bold text-primary-dark">Entrenamiento</p><h1 className="font-serif text-4xl font-semibold">{name}</h1>{done ? <form action={quickCompleteRoutineAction} className="mt-8 space-y-4 rounded-[2rem] bg-white/80 p-5"><input type="hidden" name="name" value={name}/><input type="hidden" name="category" value={category}/><input type="hidden" name="minutes" value={minutes}/><h2 className="text-2xl font-bold">Rutina completada</h2><select name="intensity" className="w-full rounded-2xl bg-[#f8faf7] px-4 py-3"><option value="easy">Fácil</option><option value="medium">Medio</option><option value="hard">Difícil</option></select><button className="w-full rounded-2xl bg-[#23352b] py-4 font-bold text-white">Guardar resumen</button></form> : <section className="mt-8 flex flex-1 flex-col justify-center rounded-[2rem] bg-[#23352b] p-6 text-center text-white"><p className="text-white/60">{index + 1} / {safeSteps.length}</p><h2 className="my-6 font-serif text-5xl font-semibold">{step.name}</h2><p className="text-6xl font-bold">{step.mode === "time" ? left : step.value}</p><p className="mt-2 text-white/60">{step.mode === "time" ? "segundos" : "repeticiones"}</p><p className="mt-4 text-sm text-white/70">{step.muscles}</p><button onClick={nextStep} className="mt-8 rounded-2xl bg-white py-4 font-bold text-[#23352b]">Siguiente</button></section>}</main>;
}
