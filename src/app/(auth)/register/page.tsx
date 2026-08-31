import { AuthForm } from "@/components/auth-form";

export default function RegisterPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-bold text-primary-dark">FitHabit</p>
        <h1 className="font-serif text-4xl font-semibold">Crear cuenta</h1>
        <p className="mt-2 text-[#607169]">Empieza con una cuenta simple de correo y contraseña.</p>
      </div>
      <AuthForm mode="register" />
    </section>
  );
}
