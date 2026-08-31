import { PageHeader } from "@/components/app-shell";
import { logoutAction } from "@/lib/auth/actions";
import { getCurrentUser } from "@/lib/auth/session";
import { updateNameAction, saveReminderAction } from "@/lib/settings/actions";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  return (
    <section>
      <PageHeader eyebrow="Cuenta" title="Ajustes" description="Perfil, material disponible, preferencias y recordatorios." />
      <div className="space-y-4">
        <form action={updateNameAction} className="space-y-3 rounded-[2rem] bg-white/80 p-5 shadow-sm ring-1 ring-black/5">
          <h2 className="font-bold">Perfil</h2>
          <input name="name" defaultValue={user?.name} className="w-full rounded-2xl bg-[#f8faf7] px-4 py-3" />
          <p className="text-sm text-[#607169]">{user?.email}</p>
          <button className="rounded-2xl bg-[#e8f2ea] px-4 py-3 font-bold text-primary-dark">Guardar nombre</button>
        </form>
        <form action={saveReminderAction} className="space-y-3 rounded-[2rem] bg-white/80 p-5 shadow-sm ring-1 ring-black/5">
          <h2 className="font-bold">Recordatorios</h2>
          <label className="flex items-center gap-2 text-sm font-bold"><input name="enabled" type="checkbox" /> Activar recordatorios</label>
          <div className="grid grid-cols-2 gap-2 text-sm"><label><input name="types" value="workout" type="checkbox" defaultChecked /> Entrenar</label><label><input name="types" value="stretch" type="checkbox" defaultChecked /> Estirar</label></div>
          <div className="grid grid-cols-4 gap-2 text-xs">{[1,2,3,4,5,6,0].map(d => <label key={d} className="rounded-xl bg-[#f8faf7] p-2 text-center"><input name="days" value={d} type="checkbox" defaultChecked={d>0&&d<6} /> {['D','L','M','X','J','V','S'][d]}</label>)}</div>
          <div className="grid grid-cols-3 gap-2"><input name="startTime" type="time" defaultValue="09:00" className="rounded-2xl bg-[#f8faf7] px-3 py-3"/><input name="endTime" type="time" defaultValue="23:00" className="rounded-2xl bg-[#f8faf7] px-3 py-3"/><select name="frequencyHours" defaultValue="3" className="rounded-2xl bg-[#f8faf7] px-3 py-3"><option value="1">1h</option><option value="2">2h</option><option value="3">3h</option><option value="4">4h</option></select></div>
          <button className="w-full rounded-2xl bg-[#23352b] py-3 font-bold text-white">Guardar recordatorios</button>
        </form>
        <form action={logoutAction}><button className="w-full rounded-2xl bg-[#23352b] py-4 font-bold text-white">Cerrar sesión</button></form>
      </div>
    </section>
  );
}
