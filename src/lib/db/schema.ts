import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const difficultyEnum = pgEnum("difficulty", ["beginner", "intermediate", "advanced"]);
export const exerciseModeEnum = pgEnum("exercise_mode", ["time", "reps"]);
export const intensityEnum = pgEnum("intensity", ["easy", "medium", "hard"]);
export const workoutSourceEnum = pgEnum("workout_source", ["routine", "manual"]);
export const requirementTypeEnum = pgEnum("requirement_type", ["required", "optional"]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const sessions = pgTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  tokenHash: text("token_hash").notNull().unique(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const passwordResetTokens = pgTable("password_reset_tokens", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  tokenHash: text("token_hash").notNull().unique(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  usedAt: timestamp("used_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const userPreferences = pgTable("user_preferences", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull().unique(),
  goal: text("goal").notNull().default("stay_active"),
  availableTime: integer("available_time").notNull().default(10),
  level: difficultyEnum("level").notNull().default("beginner"),
  daysPerWeek: integer("days_per_week").notNull().default(3),
  onboardingCompleted: boolean("onboarding_completed").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const equipment = pgTable("equipment", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
});

export const userEquipment = pgTable("user_equipment", {
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  equipmentId: uuid("equipment_id").references(() => equipment.id, { onDelete: "cascade" }).notNull(),
  hasEquipment: boolean("has_equipment").notNull().default(false),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const exercises = pgTable("exercises", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  slug: text("slug"),
  category: text("category").notNull(),
  recommendedType: exerciseModeEnum("recommended_type").notNull(),
  instructions: text("instructions").notNull(),
  tips: text("tips").notNull(),
  commonMistakes: text("common_mistakes").notNull(),
  muscles: text("muscles").notNull().default("General"),
  difficulty: difficultyEnum("difficulty").notNull().default("beginner"),
  isDefault: boolean("is_default").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const exerciseEquipment = pgTable("exercise_equipment", {
  exerciseId: uuid("exercise_id").references(() => exercises.id, { onDelete: "cascade" }).notNull(),
  equipmentId: uuid("equipment_id").references(() => equipment.id, { onDelete: "cascade" }).notNull(),
  requirementType: requirementTypeEnum("requirement_type").notNull(),
});

export const routineFamilies = pgTable("routine_families", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  goal: text("goal").notNull(),
});

export const routines = pgTable("routines", {
  id: uuid("id").defaultRandom().primaryKey(),
  familyId: uuid("family_id").references(() => routineFamilies.id),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  sourceRoutineId: uuid("source_routine_id"),
  variantLabel: text("variant_label"),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  goal: text("goal").notNull(),
  difficulty: difficultyEnum("difficulty").notNull().default("beginner"),
  estimatedMinutes: integer("estimated_minutes").notNull(),
  isDefault: boolean("is_default").notNull().default(false),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const routineSteps = pgTable("routine_steps", {
  id: uuid("id").defaultRandom().primaryKey(),
  routineId: uuid("routine_id").references(() => routines.id, { onDelete: "cascade" }).notNull(),
  exerciseId: uuid("exercise_id").references(() => exercises.id),
  order: integer("order").notNull(),
  mode: exerciseModeEnum("mode").notNull(),
  value: integer("value").notNull(),
  restSeconds: integer("rest_seconds").notNull().default(0),
  notes: text("notes"),
});

export const workouts = pgTable("workouts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  routineId: uuid("routine_id").references(() => routines.id),
  name: text("name").notNull(),
  category: text("category").notNull(),
  durationSeconds: integer("duration_seconds").notNull(),
  intensity: intensityEnum("intensity").notNull(),
  completedAt: timestamp("completed_at", { withTimezone: true }).notNull(),
  source: workoutSourceEnum("source").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const workoutExercises = pgTable("workout_exercises", {
  id: uuid("id").defaultRandom().primaryKey(),
  workoutId: uuid("workout_id").references(() => workouts.id, { onDelete: "cascade" }).notNull(),
  exerciseId: uuid("exercise_id").references(() => exercises.id),
  name: text("name").notNull(),
  mode: exerciseModeEnum("mode").notNull(),
  targetValue: integer("target_value").notNull(),
  completedValue: integer("completed_value"),
  order: integer("order").notNull(),
});

export const bodyWeightEntries = pgTable("body_weight_entries", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  weight: numeric("weight", { precision: 5, scale: 2 }).notNull(),
  unit: text("unit").notNull().default("kg"),
  recordedAt: timestamp("recorded_at", { withTimezone: true }).notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const notificationPreferences = pgTable("notification_preferences", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull().unique(),
  enabled: boolean("enabled").notNull().default(false),
  reminderTypes: jsonb("reminder_types").$type<Array<"workout" | "stretch">>().notNull().default(["workout", "stretch"]),
  daysOfWeek: jsonb("days_of_week").$type<number[]>().notNull().default([1, 2, 3, 4, 5]),
  startTime: text("start_time").notNull().default("09:00"),
  endTime: text("end_time").notNull().default("23:00"),
  frequencyHours: integer("frequency_hours").notNull().default(3),
  pausedUntil: timestamp("paused_until", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const userRelations = relations(users, ({ many, one }) => ({
  sessions: many(sessions),
  preferences: one(userPreferences),
  workouts: many(workouts),
  weights: many(bodyWeightEntries),
}));
