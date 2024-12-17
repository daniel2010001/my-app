import { z } from "zod";

export const IncidentType = {
  BREACH: "Derrumbe",
  CRASH: "Granizo",
  DELAY: "Retraso",
  ACCIDENT: "Accidente",
  BLOCKAGE: "Bloqueo",
  COLLISION: "Colisión",
  OTHER: "Otro",
} as const;
export type IncidentType = keyof typeof IncidentType;

export const IncidentStatus = {
  IN_PROGRESS: "En Curso",
  PENDING: "Pendiente",
  COMPLETED: "Completada",
} as const;
export type IncidentStatus = keyof typeof IncidentStatus;

export const IncidentSchema = z.object({
  parcelId: z.number(),
  type: z.enum(Object.keys(IncidentType) as [IncidentType]),
  description: z.string(),
  impactKg: z.number().optional(),
  newCollectionDate: z.date().optional(),
  status: z.enum(Object.keys(IncidentStatus) as [IncidentStatus]),
  observations: z.string().optional(),
});
export type IncidentSchema = z.infer<typeof IncidentSchema>;

export const IncidentRequestKeys = [
  "id_parcela",
  "tipo_incidencia",
  "descripcion",
  "impacto_kg",
  "nueva_fecha",
  "estado_actual",
  "observaciones",
] as const;
export type IncidentRequest = {
  id_parcela: number;
  tipo_incidencia: string;
  descripcion: string;
  impacto_kg: number | null;
  nueva_fecha: string | null;
  estado_actual: string | null;
  observaciones: string | null;
};

export const IncidentResponseKeys = [
  "id",
  "id_parcela",
  "tipo_incidencia",
  "descripcion",
  "impacto_kg",
  "nueva_fecha",
  "estado_actual",
  "observaciones",
] as const;
export type IncidentResponse = {
  id: number;
  id_parcela: number;
  tipo_incidencia: string;
  descripcion: string;
  impacto_kg: number | null;
  nueva_fecha: Date | null;
  estado_actual: string | null;
  observaciones: string | null;
};

export type Incident = {
  id: number;
  id_parcela: number;
  tipo_incidencia: string;
  descripcion: string;
  impacto_kg: number | null;
  nueva_fecha: Date | null;
  estado_actual: string | null;
  observaciones: string | null;
};
