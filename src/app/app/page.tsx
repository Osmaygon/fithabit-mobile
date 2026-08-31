import { Activity, Bell, CalendarDays, Dumbbell, Flame, HeartPulse, Home, LineChart, Settings, StretchHorizontal } from "lucide-react";

const routineFamilies = [
  { name: "Full Body", variant: "Sin material", minutes: 10, level: "Principiante" },
  { name: "Estiramiento", variant: "Esterilla", minutes: 8, level: "Principiante" },
  { name: "Core", variant: "Sin material", minutes: 8, level: "Intermedio" },
];

const tabs = [
  { label: "Hoy", icon: Home },
  { label: "Rutinas", icon: Dumbbell },
  { label: "Historial", icon: CalendarDays },
  { label: "Progreso", icon: LineChart },
  { label: "Ajustes", icon: Settings },
];

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-4 text-foreground md:px-8 lg:grid lg:grid-cols-[1fr_390px] lg:gap-8">
      <section className="mx-auto flex w-full max-w-md flex-1 flex-col gap-5 pb-28 lg:max-w-none lg:pb-8">
        <header className="flex items-center justify-between pt-2">
          <div>
            <p className="text-sm font-semibold text-primary-dark">FitHabit</p>
            <h1 className="font-serif text-4xl font-semibold tracking-tight">Hoy</h1>
          </div>
          <button className="rounded-full bg-white/80 p-3 shadow-sm ring-1 ring-black/5" aria-label="Recordatorios">
            <Bell size={20} />
          </button>
        </header>

        <section className="overflow-hidden rounded-[2rem] bg-[#23352b] p-6 text-white shadow-xl shadow-green-900/10">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-sm text-white/65">Rutina recomendada</p>
              <h2 className="max-w-[12rem] font-serif text-4xl font-semibold leading-none">Full Body 10 min</h2>
            </div>
            <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold text-white/80">Sin material</span>
          </div>

          <div className="mb-6 grid grid-cols-3 gap-2 text-center text-sm">
            <div className="rounded-2xl bg-white/10 p-3">
              <p className="text-xl font-bold">7</p>
              <p className="text-white/60">ejercicios</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-3">
              <p className="text-xl font-bold">10</p>
              <p className="text-white/60">min</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-3">
              <p className="text-xl font-bold">Fácil</p>
              <p className="text-white/60">nivel</p>
            </div>
          </div>

          <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#f8faf7] py-4 font-bold text-[#23352b] shadow-lg shadow-black/20">
            <Activity size={20} />
            Empezar entrenamiento
          </button>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <article className="rounded-[1.5rem] bg-white/75 p-4 shadow-sm ring-1 ring-black/5">
            <Flame className="mb-3 text-primary-dark" size={22} />
            <p className="text-2xl font-bold">2 días</p>
            <p className="text-sm text-[#607169]">Racha actual</p>
          </article>
          <article className="rounded-[1.5rem] bg-white/75 p-4 shadow-sm ring-1 ring-black/5">
            <HeartPulse className="mb-3 text-primary-dark" size={22} />
            <p className="text-2xl font-bold">42 min</p>
            <p className="text-sm text-[#607169]">Esta semana</p>
          </article>
        </section>

        <section className="rounded-[1.75rem] bg-white/70 p-4 shadow-sm ring-1 ring-black/5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">Rutinas compatibles</h2>
            <button className="text-sm font-bold text-primary-dark">Ver todas</button>
          </div>
          <div className="space-y-3">
            {routineFamilies.map((routine) => (
              <article key={routine.name} className="flex items-center gap-3 rounded-2xl bg-[#f4f7f3] p-3">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-white text-primary-dark shadow-sm">
                  {routine.name === "Estiramiento" ? <StretchHorizontal size={22} /> : <Dumbbell size={22} />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold">{routine.name}</p>
                  <p className="text-sm text-[#607169]">{routine.variant} · {routine.minutes} min · {routine.level}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>

      <aside className="hidden py-8 lg:block">
        <div className="sticky top-8 rounded-[2rem] bg-white/65 p-6 shadow-sm ring-1 ring-black/5">
          <p className="mb-2 text-sm font-bold text-primary-dark">Plan del MVP</p>
          <h2 className="mb-4 font-serif text-3xl font-semibold">PWA de entrenamiento en casa</h2>
          <ul className="space-y-3 text-sm text-[#607169]">
            <li>Cuenta con correo y contraseña.</li>
            <li>Onboarding con material disponible.</li>
            <li>Rutinas por familia y variantes.</li>
            <li>Temporizador automático.</li>
            <li>Progreso, rachas, peso y recordatorios.</li>
          </ul>
        </div>
      </aside>

      <nav className="safe-bottom fixed inset-x-0 bottom-0 z-20 mx-auto max-w-md px-4 lg:hidden">
        <div className="grid grid-cols-5 rounded-[1.6rem] bg-white/90 p-2 shadow-2xl shadow-green-900/15 ring-1 ring-black/5 backdrop-blur">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = tab.label === "Hoy";
            return (
              <button key={tab.label} className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[0.68rem] font-bold ${active ? "bg-[#e8f2ea] text-primary-dark" : "text-[#607169]"}`}>
                <Icon size={19} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>
    </main>
  );
}
