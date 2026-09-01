import { ResetConfirmForm } from "@/components/reset-confirm-form";

export default function ConfirmResetPage() {
  return <section className="space-y-6"><div><p className="text-sm font-bold text-primary-dark">FitHabit</p><h1 className="font-serif text-4xl font-semibold">Nueva contraseña</h1><p className="mt-2 text-[#607169]">Pega el token generado y define una contraseña nueva.</p></div><ResetConfirmForm /></section>;
}
