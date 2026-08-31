"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction, registerAction, requestPasswordResetAction, type AuthState } from "@/lib/auth/actions";

const initialState: AuthState = {};

export function AuthForm({ mode }: { mode: "login" | "register" | "reset" }) {
  const action = mode === "login" ? loginAction : mode === "register" ? registerAction : requestPasswordResetAction;
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-4 rounded-[2rem] bg-white/80 p-5 shadow-sm ring-1 ring-black/5">
      {mode === "register" && <Field name="name" label="Nombre" placeholder="Tu nombre" />}
      <Field name="email" label="Correo" type="email" placeholder="tu@email.com" />
      {mode !== "reset" && <Field name="password" label="Contraseña" type="password" placeholder="Mínimo 8 caracteres" />}

      {state.error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{state.error}</p>}
      {state.resetToken && (
        <div className="rounded-2xl bg-[#e8f2ea] px-4 py-3 text-sm text-primary-dark">
          <p className="font-bold">Token de recuperación MVP</p>
          <code className="break-all">{state.resetToken}</code>
        </div>
      )}

      <button disabled={pending} className="w-full rounded-2xl bg-[#23352b] py-4 font-bold text-white disabled:opacity-60">
        {pending ? "Procesando..." : mode === "login" ? "Entrar" : mode === "register" ? "Crear cuenta" : "Generar token"}
      </button>

      <div className="flex justify-between text-sm font-semibold text-primary-dark">
        {mode !== "login" && <Link href="/login">Entrar</Link>}
        {mode !== "register" && <Link href="/register">Crear cuenta</Link>}
        {mode !== "reset" && <Link href="/reset-password">Olvidé mi contraseña</Link>}
      </div>
    </form>
  );
}

function Field({ name, label, type = "text", placeholder }: { name: string; label: string; type?: string; placeholder?: string }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-bold text-[#607169]">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-black/10 bg-[#f8faf7] px-4 py-3 outline-none transition focus:border-primary-dark"
        required
      />
    </label>
  );
}
