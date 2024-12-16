export const PointRequestKeys = ["nombre", "latitud", "longitud"] as const;
export interface PointRequest extends Record<(typeof PointRequestKeys)[number], unknown> {
  nombre: string;
  latitud: number;
  longitud: number;
}

export const PointResponseKeys = ["id", "nombre", "latitud", "longitud"] as const;
export interface PointResponse extends Record<(typeof PointResponseKeys)[number], unknown> {
  id: string;
  nombre: string;
  latitud: number;
  longitud: number;
}

export const PointKeys = ["id", "name", "lat", "lng"] as const;
export interface Point extends Record<(typeof PointKeys)[number], unknown> {
  id: string;
  name: string;
  lat: number;
  lng: number;
}
