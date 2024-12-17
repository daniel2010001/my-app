import { z } from "zod";

export const CollectionCentersSchema = z.object({
  name: z.string(),
  lat: z.number(),
  lng: z.number(),
});
export type CollectionCentersSchema = z.infer<typeof CollectionCentersSchema>;

export const CollectionCenterRequestKeys = ["nombre", "latitud", "longitud"] as const;
export type CollectionCenterRequest = { nombre: string; latitud: number; longitud: number };

export const CollectionCenterResponseKeys = ["nombre", "latitud", "longitud", "id"] as const;
export type CollectionCenterResponse = {
  id: number;
  nombre: string;
  latitud: number;
  longitud: number;
};

export type CollectionCenter = { id: number; name: string; lat: number; lng: number };
