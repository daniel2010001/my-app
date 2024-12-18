import { z } from "zod";
import { ValueOf } from ".";

export const CarsAvailable = {
  AVAILABLE: "Disponible",
  MANTENIMIENTO: "Mantenimiento",
  ON_ROUTE: "En_Ruta",
} as const;
export type CarsAvailable = keyof typeof CarsAvailable;
export const CarsType = {
  small_truck: "Camioneta",
  truck: "Camión",
  car: "Coche",
} as const;
export type CarType = keyof typeof CarsType;

export const CarSchema = z.object({
  type: z.enum(Object.keys(CarsType) as [CarType]),
  capacity: z.number().positive(),
  volume: z.number().positive(),
  available: z.enum(Object.keys(CarsAvailable) as [CarsAvailable]),
});
export type CarSchema = z.infer<typeof CarSchema>;

export const CarRequestKeys = ["tipo", "capacidad_kg", "volumen_max", "disponibilidad"] as const;
export type CarRequest = {
  tipo: string;
  capacidad_kg: number;
  volumen_max: string;
  disponibilidad: ValueOf<typeof CarsAvailable>;
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
  volumen_max: string;
  disponibilidad: ValueOf<typeof CarsAvailable>;
};

export type Car = {
  id: string;
  type: string;
  capacity: number;
  volume: number;
  available: ValueOf<typeof CarsAvailable>;
};

export type CarsStore = {
  cars: Car[];
  addCar: (car: Car | Car[]) => void;
  deleteCar: (id: Car["id"]) => void;
  clearCars: () => void;
};
