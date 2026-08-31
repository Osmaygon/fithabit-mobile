"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { equipment, userEquipment, userPreferences } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth/session";

export async function saveOnboardingAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const selectedEquipment = formData.getAll("equipment").map(String);
  const allEquipment = await db.select().from(equipment);

  await db
    .update(userPreferences)
    .set({
      goal: String(formData.get("goal") ?? "stay_active"),
      availableTime: Number(formData.get("availableTime") ?? 10),
      level: String(formData.get("level") ?? "beginner") as "beginner" | "intermediate" | "advanced",
      daysPerWeek: Number(formData.get("daysPerWeek") ?? 3),
      onboardingCompleted: true,
      updatedAt: new Date(),
    })
    .where(eq(userPreferences.userId, user.id));

  for (const item of allEquipment) {
    await db
      .insert(userEquipment)
      .values({ userId: user.id, equipmentId: item.id, hasEquipment: selectedEquipment.includes(item.slug) })
      .onConflictDoUpdate({
        target: [userEquipment.userId, userEquipment.equipmentId],
        set: { hasEquipment: selectedEquipment.includes(item.slug), updatedAt: new Date() },
      });
  }

  redirect("/app");
}

export async function skipOnboardingAction() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  await db.update(userPreferences).set({ onboardingCompleted: true, updatedAt: new Date() }).where(eq(userPreferences.userId, user.id));
  redirect("/app");
}
