import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { equipment } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth/session";
import { saveOnboardingAction, skipOnboardingAction } from "@/lib/onboarding/actions";

export default async function OnboardingPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const materials = await db.select().from(equipment);

  return (
    <main className="mx-auto min-h-screen w-full max-w-md px-4 py-8">
      <form action={saveOnboardingAction} className="space-y-6">
        <div>
          <p className="text-sm font-bold text-primary-dark">Configuración inicial</p>
          <h1 className="font-serif text-4xl font-semibold">Ajusta FitHabit</h1>
          <p className="mt-2 text-[#607169]">Puedes cambiarlo después en ajustes.</p>
        </div>

        <Select name="goal" label="Objetivo" options={[["stay_active", "Mantenerme activo"], ["strength", "Ganar fuerza"], ["mobility", "Movilidad"], ["fat_loss", "Perder grasa"]]} />
        <Select name="availableTime" label="Tiempo disponible" options={[["5", "5 minutos"], ["10", "10 minutos"], ["15", "15 minutos"], ["20", "20 minutos"]]} />
        <Select name="level" label="Nivel" options={[["beginner", "Principiante"], ["intermediate", "Intermedio"], ["advanced", "Avanzado"]]} />
        <Select name="daysPerWeek" label="Días por semana" options={[["2", "2 días"], ["3", "3 días"], ["4", "4 días"], ["5", "5+ días"]]} />

        <section className="rounded-[2rem] bg-white/80 p-5 shadow-sm ring-1 ring-black/5">
          <h2 className="mb-4 font-bold">Material disponible</h2>
          <div className="grid grid-cols-2 gap-2">
            {materials.map((item) => (
              <label key={item.id} className="flex items-center gap-2 rounded-2xl bg-[#f4f7f3] p-3 text-sm font-semibold">
                <input type="checkbox" name="equipment" value={item.slug} defaultChecked={item.slug === "none"} />
                {item.name}
              </label>
            ))}
          </div>
        </section>

        <button className="w-full rounded-2xl bg-[#23352b] py-4 font-bold text-white">Guardar y continuar</button>
      </form>
      <form action={skipOnboardingAction} className="mt-3">
        <button className="w-full rounded-2xl bg-white/70 py-4 font-bold text-primary-dark ring-1 ring-black/5">Saltar por ahora</button>
      </form>
    </main>
  );
}

function Select({ name, label, options }: { name: string; label: string; options: string[][] }) {
  return (
    <label className="block space-y-2 rounded-[2rem] bg-white/80 p-5 shadow-sm ring-1 ring-black/5">
      <span className="font-bold">{label}</span>
      <select name={name} className="w-full rounded-2xl border border-black/10 bg-[#f8faf7] px-4 py-3 outline-none">
        {options.map(([value, text]) => <option key={value} value={value}>{text}</option>)}
      </select>
    </label>
  );
}
