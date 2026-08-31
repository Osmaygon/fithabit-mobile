"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { notificationPreferences, users } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth/session";

export async function updateNameAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const name = String(formData.get("name") || user.name).trim();
  if (name.length >= 2) await db.update(users).set({ name, updatedAt: new Date() }).where(eq(users.id, user.id));
  redirect("/app/settings");
}

export async function saveReminderAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const values = {
    userId: user.id,
    enabled: formData.get("enabled") === "on",
    reminderTypes: formData.getAll("types") as Array<"workout" | "stretch">,
    daysOfWeek: formData.getAll("days").map(Number),
    startTime: String(formData.get("startTime") || "09:00"),
    endTime: String(formData.get("endTime") || "23:00"),
    frequencyHours: Number(formData.get("frequencyHours") || 3),
    updatedAt: new Date(),
  };
  await db.delete(notificationPreferences).where(eq(notificationPreferences.userId, user.id));
  await db.insert(notificationPreferences).values(values);
  redirect("/app/settings");
}
