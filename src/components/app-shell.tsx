import Link from "next/link";
import { CalendarDays, Dumbbell, Home, LineChart, Settings } from "lucide-react";

const tabs = [
  ["/app", "Hoy", Home],
  ["/app/routines", "Rutinas", Dumbbell],
  ["/app/history", "Historial", CalendarDays],
  ["/app/progress", "Progreso", LineChart],
  ["/app/settings", "Ajustes", Settings],
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-4 md:px-8">
      <div className="mx-auto w-full max-w-md flex-1 pb-28 lg:max-w-4xl">{children}</div>
      <nav className="safe-bottom fixed inset-x-0 bottom-0 z-20 mx-auto max-w-md px-4 lg:hidden">
        <div className="grid grid-cols-5 rounded-[1.6rem] bg-white/90 p-2 shadow-2xl shadow-green-900/15 ring-1 ring-black/5 backdrop-blur">
          {tabs.map(([href, label, Icon]) => (
            <Link key={href} href={href} className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[0.68rem] font-bold text-[#607169]">
              <Icon size={19} />
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </main>
  );
}

export function PageHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <header className="mb-5 pt-2">
      {eyebrow && <p className="text-sm font-bold text-primary-dark">{eyebrow}</p>}
      <h1 className="font-serif text-4xl font-semibold tracking-tight">{title}</h1>
      {description && <p className="mt-2 text-[#607169]">{description}</p>}
    </header>
  );
}
