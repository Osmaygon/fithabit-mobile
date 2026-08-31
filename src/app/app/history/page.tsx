import { PageHeader } from "@/components/app-shell";

export default function HistoryPage() {
  return (
    <section>
      <PageHeader eyebrow="Registro" title="Historial" description="Aquí aparecerán las rutinas completadas y entrenamientos manuales." />
      <div className="rounded-[2rem] bg-white/80 p-6 text-center shadow-sm ring-1 ring-black/5">
        <p className="font-bold">Sin entrenamientos todavía</p>
        <p className="mt-2 text-sm text-[#607169]">Cuando completes una rutina, quedará registrada aquí.</p>
        <button className="mt-5 rounded-2xl bg-[#23352b] px-5 py-3 font-bold text-white">Añadir entrenamiento manual</button>
      </div>
    </section>
  );
}
