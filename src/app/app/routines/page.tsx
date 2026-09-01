import Link from "next/link";
import { db } from "@/lib/db";
import { routines } from "@/lib/db/schema";
import { PageHeader } from "@/components/app-shell";

export default async function RoutinesPage() {
  const items = await db.select().from(routines);
  return (
    <section>
      <PageHeader eyebrow="Biblioteca" title="Rutinas" description="Rutinas listas para entrenar en casa." />
      <div className="mb-5 grid grid-cols-2 gap-2"><Link href="/app/routines/new" className="block rounded-2xl bg-[#23352b] py-3 text-center font-bold text-white">Crear rutina</Link><Link href="/app/exercises/new" className="block rounded-2xl bg-white/80 py-3 text-center font-bold text-primary-dark ring-1 ring-black/5">Crear ejercicio</Link></div>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((routine) => (
          <article key={routine.id} className="rounded-[1.6rem] bg-white/80 p-4 shadow-sm ring-1 ring-black/5">
            <p className="font-bold">{routine.name}</p>
            <p className="mt-1 text-sm text-[#607169]">{routine.category} · {routine.estimatedMinutes} min · {routine.variantLabel}</p>
            <p className="mt-2 text-sm text-[#607169]">{routine.description}</p>
            <Link href={`/app/routines/${routine.id}`} className="mt-4 inline-block rounded-2xl bg-[#e8f2ea] px-4 py-2 text-sm font-bold text-primary-dark">Ver rutina</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
