"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { passwordResetTokens, userPreferences, users } from "@/lib/db/schema";
import { createSession, createToken, destroySession, hashPassword, hashToken, verifyPassword } from "./session";

const registerSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Correo no válido.").toLowerCase(),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres."),
});

const loginSchema = z.object({
  email: z.string().email("Correo no válido.").toLowerCase(),
  password: z.string().min(1, "Introduce la contraseña."),
});

export type AuthState = { error?: string; resetToken?: string };

export async function registerAction(_: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = registerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const existing = await db.select({ id: users.id }).from(users).where(eq(users.email, parsed.data.email)).limit(1);
  if (existing.length) return { error: "Ya existe una cuenta con ese correo." };

  const passwordHash = await hashPassword(parsed.data.password);
  const inserted = await db
    .insert(users)
    .values({ name: parsed.data.name, email: parsed.data.email, passwordHash })
    .returning({ id: users.id });

  await db.insert(userPreferences).values({ userId: inserted[0].id });
  await createSession(inserted[0].id);
  redirect("/onboarding");
}

export async function loginAction(_: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const found = await db.select().from(users).where(eq(users.email, parsed.data.email)).limit(1);
  const user = found[0];
  if (!user) return { error: "Correo o contraseña incorrectos." };

  const valid = await verifyPassword(parsed.data.password, user.passwordHash);
  if (!valid) return { error: "Correo o contraseña incorrectos." };

  await createSession(user.id);
  redirect("/app");
}

export async function logoutAction() {
  await destroySession();
  redirect("/login");
}

export async function requestPasswordResetAction(_: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").toLowerCase();
  const found = await db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1);

  if (!found[0]) return { error: "No existe una cuenta con ese correo." };

  const token = createToken();
  await db.insert(passwordResetTokens).values({
    userId: found[0].id,
    tokenHash: hashToken(token),
    expiresAt: new Date(Date.now() + 1000 * 60 * 30),
  });

  return { resetToken: token };
}
