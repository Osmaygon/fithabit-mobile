"use client";

import { useEffect, useState } from "react";
import { quickCompleteRoutineAction } from "@/lib/workouts/actions";

type Step = { name: string; mode: "time" | "reps"; value: number };
const steps: Step[] = [
  { name: "Jumping jacks", mode: "time", value: 30 },
  { name: "Sentadillas", mode: "reps", value: 15 },
  { name: "Plancha", mode: "time", value: 30 },
  { name: "Flexión adaptada", mode: "reps", value: 10 },
  { name: "Postura del niño", mode: "time", value: 40 },
];

export default function WorkoutPage() {
  const [index, setIndex] = useState(0);
  const [left, setLeft] = useState<number>(steps[0].value);
  const step = steps[index];
  const done = index >= steps.length;

  function nextStep() {
    setIndex((current) => {
      const next = current + 1;
      setLeft(steps[next]?.value ?? 0);
      return next;
    });
  }

  useEffect(() => {
    if (!step || step.mode !== "time") return;
    const t = setTimeout(() => {
      if (left <= 1) nextStep();
      else setLeft((value) => value - 1);
    }, 1000);
    return () => clearTimeout(t);
  });

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-4 py-8">
      <p className="text-sm font-bold text-primary-dark">Entrenamiento</p>
      <h1 className="font-serif text-4xl font-semibold">Full Body 10 min</h1>
      {done ? (
        <form action={quickCompleteRoutineAction} className="mt-8 space-y-4 rounded-[2rem] bg-white/80 p-5">
          <input type="hidden" name="name" value="Full Body 10 min" />
          <input type="hidden" name="category" value="Fuerza" />
          <input type="hidden" name="minutes" value="10" />
          <h2 className="text-2xl font-bold">Rutina completada</h2>
          <select name="intensity" className="w-full rounded-2xl bg-[#f8faf7] px-4 py-3">
            <option value="easy">Fácil</option><option value="medium">Medio</option><option value="hard">Difícil</option>
          </select>
          <button className="w-full rounded-2xl bg-[#23352b] py-4 font-bold text-white">Guardar resumen</button>
        </form>
      ) : (
        <section className="mt-8 flex flex-1 flex-col justify-center rounded-[2rem] bg-[#23352b] p-6 text-center text-white">
          <p className="text-white/60">{index + 1} / {steps.length}</p>
          <h2 className="my-6 font-serif text-5xl font-semibold">{step.name}</h2>
          <p className="text-6xl font-bold">{step.mode === "time" ? left : step.value}</p>
          <p className="mt-2 text-white/60">{step.mode === "time" ? "segundos" : "repeticiones"}</p>
          <button onClick={nextStep} className="mt-8 rounded-2xl bg-white py-4 font-bold text-[#23352b]">Siguiente</button>
        </section>
      )}
    </main>
  );
}
