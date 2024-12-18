import { z } from "zod";

export const RouteKeys = [
  "id_origen",
  "id_destino",
  "texto",
  "distancia_km",
  "tiempo_estimado",
  "costo",
] as const;
export const RouteSchema = z.object({
  origen: z.string(),
  destino: z.string(),
  text: z.string(),
  distanceKm: z.string(),
  timeEstimated: z.string(),
  cost: z.string(),
});
export type RouteSchema = z.infer<typeof RouteSchema>;

export const RouteRequestKeys = [
  "id_origen",
  "id_destino",
  "texto",
  "distancia_km",
  "tiempo_estimado",
] as const;
export type RouteRequest = {
  id_origen: string;
  id_destino: string;
  texto: string;
  distancia_km: string;
  tiempo_estimado: string;
};

export const RouteResponseKeys = [
  "id",
  "id_origen",
  "id_destino",
  "texto",
  "distancia_km",
  "tiempo_estimado",
  "costo",
] as const;
export type RouteResponse = {
  id: number;
  id_origen: number;
  id_destino: number;
  texto: string;
  distancia_km: string;
  tiempo_estimado: string;
  costo: string;
};

export type Route = {
  id: string;
  idOrigen: string;
  idDestino: string;
  points: [number, number][];
  distanceKm: string;
  timeEstimated: string;
  cost: string;
};

export type RoutesStore = {
  routes: Route[];
  addRoute: (route: Route) => void;
  deleteRoute: (id: Route["id"]) => void;
  clearRoutes: () => void;
};
