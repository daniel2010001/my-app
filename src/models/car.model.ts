import { z } from "zod";

export const CarSchema = z.object({
  type: z.string(),
  capacity: z.number(),
  volume: z.number(),
  available: z.boolean(),
  collections: z.array(z.number()),
});
export type CarSchema = z.infer<typeof CarSchema>;

export const CarRequestKeys = [
  "tipo",
  "capacidad_kg",
  "volumen_max",
  "disponibilidad",
  "recolecciones",
] as const;
export type CarRequest = {
  tipo: string;
  capacidad_kg: number;
  volumen_max: number;
  disponibilidad: boolean;
  recolecciones: number[];
};

export const CarResponseKeys = [
  "id",
  "tipo",
  "capacidad_kg",
  "volumen_max",
  "disponibilidad",
  "recolecciones",
] as const;
export type CarResponse = {
  id: number;
  tipo: string;
  capacidad_kg: number;
  volumen_max: number;
  disponibilidad: boolean;
  recolecciones: number[];
};

export type Car = {
  id: number;
  type: string;
  capacity: number;
  volume: number;
  available: boolean;
  collections: number[];
};
