import { z } from "zod";

export const IncidentSchema = z.object({
  id_parcela: z.number(),
  tipo_incidencia: z.string(),
  descripcion: z.string(),
  impacto_kg: z.number().optional(),
  nueva_fecha: z.date().optional(),
  estado_actual: z.string().optional(),
  observaciones: z.string().optional(),
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
  nueva_fecha: Date | null;
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
