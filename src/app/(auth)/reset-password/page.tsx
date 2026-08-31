import { AuthForm } from "@/components/auth-form";

export default function ResetPasswordPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-bold text-primary-dark">FitHabit</p>
        <h1 className="font-serif text-4xl font-semibold">Recuperar contraseña</h1>
        <p className="mt-2 text-[#607169]">MVP: genera un token visible para cambiar la contraseña más adelante.</p>
      </div>
      <AuthForm mode="reset" />
    </section>
  );
}
