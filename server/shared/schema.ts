import { pgTable, pgEnum, text, serial, integer, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define Enums
export const riskLevelEnum = pgEnum("risk_level", ["low", "medium", "high"]);
export const priorityEnum = pgEnum("priority", ["immediate", "short_term", "long_term"]);

export const glacialLakes = pgTable("glacial_lakes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  elevation: real("elevation").notNull(),
  volume: real("volume").notNull(),
  riskLevel: riskLevelEnum("risk_level").notNull(),
  daysToFlood: integer("days_to_flood"),
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
});

export const sensorData = pgTable("sensor_data", {
  id: serial("id").primaryKey(),
  lakeId: integer("lake_id").notNull().references(() => glacialLakes.id, { onDelete: "cascade" }),
  temperature: real("temperature").notNull(),
  waterLevel: real("water_level").notNull(),
  precipitation: real("precipitation").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const preventiveMeasures = pgTable("preventive_measures", {
  id: serial("id").primaryKey(),
  lakeId: integer("lake_id").notNull().references(() => glacialLakes.id, { onDelete: "cascade" }),
  measure: text("measure").notNull(),
  priority: priorityEnum("priority").notNull(),
});

export const insertGlacialLakeSchema = createInsertSchema(glacialLakes).extend({
  riskLevel: z.enum(["low", "medium", "high"]),
});

export const insertSensorDataSchema = createInsertSchema(sensorData);
export const insertPreventiveMeasureSchema = createInsertSchema(preventiveMeasures).extend({
  priority: z.enum(["immediate", "short_term", "long_term"]),
});

// Corrected Type Inference
export type GlacialLake = typeof glacialLakes.$inferSelect;
export type SensorData = typeof sensorData.$inferSelect;
export type PreventiveMeasure = typeof preventiveMeasures.$inferSelect;

export type InsertGlacialLake = z.infer<typeof insertGlacialLakeSchema>;
export type InsertSensorData = z.infer<typeof insertSensorDataSchema>;
export type InsertPreventiveMeasure = z.infer<typeof insertPreventiveMeasureSchema>;
