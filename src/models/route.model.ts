import { z } from "zod";

export const Cars = {
  small_truck: "Camioneta",
  truck: "Camión",
  car: "Coche",
} as const;
export type Car = keyof typeof Cars;

export const Snappings = {
  motorway: "Autopista",
  trunk: "Autopista",
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

export interface Route {
  vehicle: Car;
  points: [number, number][];
  /** Arreglo de puntos que se utilizan para sugerir rutas
   * @example ["Heroínas", "Ayacucho"] La ruta pasará por Heroínas y Ayacucho
   */
  point_hints: string[];
  /** Arreglo de puntos que se utilizan para evitar rutas
   * @example ["motorway"] La ruta no pasará por autopistas
   * @example ["ferry"] La ruta no pasará por ferries
   */
  snap_preventions: Snapping[];
  details: Detail[];
  /** Permite optimizar la ruta para un objetivo específico
   * @default false
   */
  optimize: boolean;
  instructions: boolean;
}

export const routeSchema = z.object({
  vehicle: z.enum(Object.keys(Cars) as [Car]),
  points: z.array(z.tuple([z.number(), z.number()])).min(2, "Se requieren al menos 2 puntos"),
  point_hints: z.array(z.string()),
  snap_preventions: z.array(z.enum(Object.keys(Snappings) as [Snapping])),
  details: z.array(z.enum(Object.keys(Details) as [Detail])),
  optimize: z.boolean().default(false),
  instructions: z.boolean(),
});
export type RouteFormData = z.infer<typeof routeSchema>;
