"use client";

import { useActionState } from "react";
import Link from "next/link";
import { confirmPasswordResetAction, type AuthState } from "@/lib/auth/actions";

export function ResetConfirmForm() {
  const [state, action, pending] = useActionState(confirmPasswordResetAction, {} as AuthState);
  return (
    <form action={action} className="space-y-4 rounded-[2rem] bg-white/80 p-5 shadow-sm ring-1 ring-black/5">
      <input name="token" placeholder="Token" required className="w-full rounded-2xl bg-[#f8faf7] px-4 py-3" />
      <input name="password" type="password" placeholder="Nueva contraseña" required className="w-full rounded-2xl bg-[#f8faf7] px-4 py-3" />
      {state.error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{state.error}</p>}
      {state.success && <p className="rounded-2xl bg-[#e8f2ea] px-4 py-3 text-sm font-semibold text-primary-dark">{state.success}</p>}
      <button disabled={pending} className="w-full rounded-2xl bg-[#23352b] py-4 font-bold text-white">Cambiar contraseña</button>
      <Link href="/login" className="block text-center text-sm font-bold text-primary-dark">Volver a login</Link>
    </form>
  );
}
