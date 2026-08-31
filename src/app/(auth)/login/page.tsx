import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-bold text-primary-dark">FitHabit</p>
        <h1 className="font-serif text-4xl font-semibold">Entrar</h1>
        <p className="mt-2 text-[#607169]">Accede a tus rutinas, progreso y recordatorios.</p>
      </div>
      <AuthForm mode="login" />
    </section>
  );
}
