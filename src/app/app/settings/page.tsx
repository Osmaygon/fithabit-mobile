import { PageHeader } from "@/components/app-shell";
import { logoutAction } from "@/lib/auth/actions";
import { getCurrentUser } from "@/lib/auth/session";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  return (
    <section>
      <PageHeader eyebrow="Cuenta" title="Ajustes" description="Perfil, material disponible, preferencias y recordatorios." />
      <div className="space-y-3">
        <article className="rounded-[2rem] bg-white/80 p-5 shadow-sm ring-1 ring-black/5">
          <h2 className="font-bold">Perfil</h2>
          <p className="mt-2 text-sm text-[#607169]">{user?.name}</p>
          <p className="text-sm text-[#607169]">{user?.email}</p>
        </article>
        <article className="rounded-[2rem] bg-white/80 p-5 shadow-sm ring-1 ring-black/5">
          <h2 className="font-bold">Recordatorios</h2>
          <p className="mt-2 text-sm text-[#607169]">Entrenar y estirar, días de semana, rango horario y frecuencia.</p>
        </article>
        <form action={logoutAction}>
          <button className="w-full rounded-2xl bg-[#23352b] py-4 font-bold text-white">Cerrar sesión</button>
        </form>
      </div>
    </section>
  );
}
