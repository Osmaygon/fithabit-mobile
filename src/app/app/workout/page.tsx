"use client";

import { useEffect, useState } from "react";
import { quickCompleteRoutineAction } from "@/lib/workouts/actions";

const steps = [
  ["Jumping jacks", "time", 30], ["Sentadillas", "reps", 15], ["Plancha", "time", 30], ["Flexión adaptada", "reps", 10], ["Postura del niño", "time", 40]
] as const;

export default function WorkoutPage() {
  const [index, setIndex] = useState(0);
  const [left, setLeft] = useState(steps[0][2]);
  const step = steps[index];
  const done = index >= steps.length;
  useEffect(() => { if (!step || step[1] !== "time") return; setLeft(step[2]); }, [index, step]);
  useEffect(() => {
    if (!step || step[1] !== "time" || left <= 0) return;
    const t = setTimeout(() => setLeft((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [left, step]);
  useEffect(() => { if (step?.[1] === "time" && left === 0) setIndex((i) => i + 1); }, [left, step]);
  return <main className="mx-auto flex min-h-screen max-w-md flex-col px-4 py-8"><p className="text-sm font-bold text-primary-dark">Entrenamiento</p><h1 className="font-serif text-4xl font-semibold">Full Body 10 min</h1>{done ? <form action={quickCompleteRoutineAction} className="mt-8 space-y-4 rounded-[2rem] bg-white/80 p-5"><input type="hidden" name="name" value="Full Body 10 min"/><input type="hidden" name="category" value="Fuerza"/><input type="hidden" name="minutes" value="10"/><h2 className="text-2xl font-bold">Rutina completada</h2><select name="intensity" className="w-full rounded-2xl bg-[#f8faf7] px-4 py-3"><option value="easy">Fácil</option><option value="medium">Medio</option><option value="hard">Difícil</option></select><button className="w-full rounded-2xl bg-[#23352b] py-4 font-bold text-white">Guardar resumen</button></form> : <section className="mt-8 flex flex-1 flex-col justify-center rounded-[2rem] bg-[#23352b] p-6 text-center text-white"><p className="text-white/60">{index + 1} / {steps.length}</p><h2 className="my-6 font-serif text-5xl font-semibold">{step[0]}</h2><p className="text-6xl font-bold">{step[1] === "time" ? left : step[2]}</p><p className="mt-2 text-white/60">{step[1] === "time" ? "segundos" : "repeticiones"}</p><button onClick={() => setIndex((i) => i + 1)} className="mt-8 rounded-2xl bg-white py-4 font-bold text-[#23352b]">Siguiente</button></section>}</main>;
}
