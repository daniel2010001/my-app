import { z } from "zod";
import { ValueOf } from ".";

export const RecollectionStatus = {
  IN_PROGRESS: "En_Curso",
  PENDING: "Pendiente",
  COMPLETED: "Completada",
} as const;
export type RecollectionStatus = keyof typeof RecollectionStatus;
export const RecollectionSchema = z.object({
  id: z.number(),
  id_parcela: z.number(),
  id_vehiculo: z.number(),
  id_centro: z.number(),
  fecha: z.date(),
  estado: z.enum(Object.keys(RecollectionStatus) as [RecollectionStatus]),
});
export type RecollectionSchema = z.infer<typeof RecollectionSchema>;

export const RecollectionRequestKeys = ["id_parcela", "id_vehiculo", "id_centro", "fecha"] as const;
export type RecollectionRequest = {
  id_parcela: number;
  id_vehiculo: number;
  id_centro: number;
  fecha: Date;
  estado: ValueOf<typeof RecollectionStatus>;
};

export const RecollectionResponseKeys = [
  "id",
  "id_parcela",
  "id_vehiculo",
  "id_centro",
  "fecha",
  "estado",
] as const;
export type RecollectionResponse = {
  id: number;
  id_parcela: number;
  id_vehiculo: number;
  id_centro: number;
  fecha: Date;
  estado: ValueOf<typeof RecollectionStatus>;
};

export type Recollection = {
  id: string;
  parcelId: string;
  carId: string;
  collectionCenterId: string;
  date: Date;
  status: ValueOf<typeof RecollectionStatus>;
};

export type RecollectionsStore = {
  recollections: Recollection[];
  addRecollection: (recollection: Recollection | Recollection[]) => void;
  deleteRecollection: (id: Recollection["id"]) => void;
  clearRecollections: () => void;
};
