import { z } from "zod";
import { ValueOf } from ".";

export const Corns = ["Blanco", "Amarillo", "Morado"] as const;
export const Corn = { WHITE: "Blanco", YELLOW: "Amarillo", GREEN: "Morado" } as const;
export type Corn = ValueOf<typeof Corn>;

export const RoadConditions = ["Muy_Buena", "Buena", "Regular", "Mala"] as const;
export const RoadCondition = {
  VERY_GOOD: "Muy_Buena",
  GOOD: "Buena",
  MEDIUM: "Regular",
  BAD: "Mala",
} as const;
export type RoadCondition = ValueOf<typeof RoadCondition>;

export const ParcelSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
  corn: z.enum(Corns, { message: "El tipo de maíz es obligatorio" }),
  lat: z.number().refine((value) => value !== 0, { message: "El valor no puede ser 0" }),
  lng: z.number().refine((value) => value !== 0, { message: "El valor no puede ser 0" }),
  amountKg: z.number().positive({ message: "La cantidad tiene que ser positiva" }),
  distanceKm: z
    .number()
    .positive({ message: "La cantidad tiene que ser positiva" })
    .refine((value) => value < 1000, { message: "La distancia no puede ser mayor a 1000 km" }),
  roadCondition: z.enum(RoadConditions),
  windowStart: z.date(),
  windowEnd: z.date(),
});
export type ParcelSchema = z.infer<typeof ParcelSchema>;

export const ParcelRequestKeys = [
  "nombre",
  "variedad_maiz",
  "latitud",
  "longitud",
  "cantidad_kg",
  "distancia_km",
  "estado_via",
  "ventana_inicio",
  "ventana_fin",
] as const;
export type ParcelRequest = {
  nombre: string;
  variedad_maiz: Corn;
  latitud: number;
  longitud: number;
  cantidad_kg: number;
  distancia_km: number;
  estado_via: RoadCondition;
  ventana_inicio: Date;
  ventana_fin: Date;
};

export const ParcelResponseKeys = [
  "id",
  "nombre",
  "variedad_maiz",
  "latitud",
  "longitud",
  "cantidad_kg",
  "distancia_km",
  "estado_via",
  "ventana_inicio",
  "ventana_fin",
  "incidencias",
  "recolecciones",
] as const;
export type ParcelResponse = {
  id: number;
  nombre: string;
  variedad_maiz: Corn;
  latitud: string;
  longitud: string;
  cantidad_kg: number;
  distancia_km: string;
  estado_via: RoadCondition;
  ventana_inicio: string;
  ventana_fin: string;
  incidencias: number[];
  recolecciones: number[];
};

export type Parcel = {
  id: string;
  name: string;
  corn: Corn;
  lat: number;
  lng: number;
  amountKg: number;
  distanceKm: number;
  roadCondition: RoadCondition;
  windowStar: Date;
  windowEnd: Date;
  incidents: number[];
  collections: number[];
};

export type ParcelsStore = {
  parcels: Parcel[];
  addParcel: (parcel: Parcel) => void;
  deleteParcel: (id: Parcel["id"]) => void;
  clearParcels: () => void;
};
