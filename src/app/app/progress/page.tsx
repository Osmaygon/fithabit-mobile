import { PageHeader } from "@/components/app-shell";

export default function ProgressPage() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  return (
    <section>
      <PageHeader eyebrow="Constancia" title="Progreso" description="Rachas, calendario mensual, categorías y peso corporal." />
      <div className="grid grid-cols-2 gap-3">
        <Card label="Racha actual" value="0 días" />
        <Card label="Mejor racha" value="0 días" />
        <Card label="Esta semana" value="0 min" />
        <Card label="Total" value="0 entrenos" />
      </div>
      <section className="mt-5 rounded-[2rem] bg-white/80 p-5 shadow-sm ring-1 ring-black/5">
        <h2 className="mb-4 font-bold">Calendario mensual</h2>
        <div className="grid grid-cols-7 gap-2 text-center text-sm">
          {days.map((day) => <div key={day} className="rounded-xl bg-[#f4f7f3] py-2 font-semibold text-[#607169]">{day}</div>)}
        </div>
      </section>
      <section className="mt-5 rounded-[2rem] bg-white/80 p-5 shadow-sm ring-1 ring-black/5">
        <h2 className="font-bold">Peso corporal</h2>
        <p className="mt-2 text-sm text-[#607169]">Gráfica simple al añadir registros de peso en kg.</p>
      </section>
    </section>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return <article className="rounded-[1.5rem] bg-white/80 p-4 shadow-sm ring-1 ring-black/5"><p className="text-2xl font-bold">{value}</p><p className="text-sm text-[#607169]">{label}</p></article>;
}
