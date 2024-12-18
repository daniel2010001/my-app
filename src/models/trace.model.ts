import { z } from "zod";

import { CarType, CarsType } from "./car.model";

export const Snappings = {
  motorway: "Autopista",
  trunk: "Carretera",
  bridge: "Puente",
  ford: "Embalse",
  tunnel: "Túnel",
  ferry: "Ferry",
} as const;
export type Snapping = keyof typeof Snappings;

export const Details = {
  street_name: "Nombre de la calle",
  street_ref: "Número de la calle",
  street_destination: "Destino de la calle",
  leg_time: "Tiempo de la ruta",
  leg_distance: "Distancia de la ruta",
  roundabout: "Red de cruce",
  country: "País",
  time: "Tiempo",
  distance: "Distancia",
  max_speed: "Velocidad máxima",
  max_weight: "Peso máximo",
  max_width: "Ancho máximo",
  toll: "Penalidad",
  road_class: "Clase de carretera",
  road_class_link: "Enlace de clase de carretera",
  road_access: "Acceso a la carretera",
  road_environment: "Medio ambiente de la carretera",
  hazmat: "Hazmat",
  hazmat_tunnel: "Hazmat del túnel",
  hazmat_water: "Hazmat del agua",
  lanes: "Carreteras",
  surface: "Superficie",
  smoothness: "Suavidad",
  hike_rating: "Calificación de senderismo",
  mtb_rating: "Calificación de senderismo de montaña",
  foot_network: "Red de senderismo",
  bike_network: "Red de bicicletas",
} as const;
export type Detail = keyof typeof Details;

export const TraceSchema = z
  .object({
    vehicle: z.enum(Object.keys(CarsType) as [CarType]),
    points: z.array(z.string()),
    coordinates: z.array(
      z.tuple([
        z
          .number({ invalid_type_error: "Latitud no válida" })
          .min(-90)
          .max(90)
          .refine((value) => value !== 0, { message: "El valor no puede ser 0" }),
        z
          .number({ invalid_type_error: "Longitud no válida" })
          .min(-180)
          .max(180)
          .refine((value) => value !== 0, { message: "El valor no puede ser 0" }),
      ])
    ),
    point_hints: z.array(z.string()),
    snap_preventions: z.array(z.enum(Object.keys(Snappings) as [Snapping])),
    details: z.array(z.enum(Object.keys(Details) as [Detail])),
  })
  .refine((data) => data.points.length + data.coordinates.length > 1, {
    message: "Se requieren al menos 2 puntos",
    path: ["points"],
  });
export type TraceFormData = z.infer<typeof TraceSchema>;
export type TraceRequest = Omit<TraceFormData, "coordinates" | "points"> & {
  points: [number, number][];
};

export interface Instruction {
  distance: number;
  heading?: number;
  sign: number;
  interval: number[];
  text: string;
  time: number;
  street_name: string;
  last_heading?: number;
}

export type Coordinates = { type: "LineString"; coordinates: [number, number] };
export interface Points {
  points: Coordinates[];
  points_order: number[];
  points_encoded: false;
  snapped_waypoints: Coordinates[];
}
export interface PointsEncoded {
  points: string;
  points_order: number[];
  points_encoded: true;
  points_encoded_multiplier: number;
  snapped_waypoints: string;
}

export type PointsResponse = Points | PointsEncoded;

export const TraceResponseKeys = [
  "distance",
  "weight",
  "time",
  "transfers",
  "bbox",
  "instructions",
  "legs",
  "details",
  "ascend",
  "descend",
  "points_encoded",
  "points_encoded_multiplier",
] as const;
export type TraceResponse = {
  distance: number;
  weight: number;
  time: number;
  transfers: number;
  bbox: [number, number, number, number];
  instructions: Instruction[];
  legs: unknown[]; // Puede ser mejor especificar el tipo si se conoce
  details: Record<Detail, [number, number, string | null][]>;
  ascend: number;
  descend: number;
} & PointsResponse;

export type Trace = {
  /** Representa la distancia total de la ruta en metros */
  distance: number;
  /** Representa el peso total de la ruta considerando factores como distancia, tiempo y otros criterios personalizados */
  weight: number;
  /** Indica el tiempo total estimado para recorrer la ruta en milisegundos */
  time: number;
  /** Define el cuadro delimitador de la ruta
   * @format [minLong, minLat, maxLong, maxLat]
   */
  bbox: [number, number, number, number];
  instructions: Instruction[];
  details: Record<Detail, [number, number, string | null][]>;
  /** Representa la distancia total que se sube durante la ruta */
  ascend: number;
  /** Representa la distancia total que se baja durante la ruta */
  descend: number;
  snappedWaypoints: [number, number][];
  points: [number, number][];
  pointsOrder: number[];
};
