"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Dumbbell, Home, LineChart, Settings } from "lucide-react";

const tabs = [
  ["/app", "Hoy", Home],
  ["/app/routines", "Rutinas", Dumbbell],
  ["/app/history", "Historial", CalendarDays],
  ["/app/progress", "Progreso", LineChart],
  ["/app/settings", "Ajustes", Settings],
] as const;

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="safe-bottom fixed inset-x-0 bottom-0 z-20 mx-auto max-w-md px-4 lg:hidden">
      <div className="grid grid-cols-5 rounded-[1.6rem] bg-white/90 p-2 shadow-2xl shadow-green-900/15 ring-1 ring-black/5 backdrop-blur">
        {tabs.map(([href, label, Icon]) => {
          const active = href === "/app" ? pathname === href : pathname.startsWith(href);
          return (
            <Link key={href} href={href} className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[0.68rem] font-bold transition ${active ? "bg-[#e8f2ea] text-primary-dark" : "text-[#607169]"}`}>
              <Icon size={19} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
