export interface PointRequest {
  nombre: string;
  latitud: number;
  longitud: number;
}

export interface PointResponse {
  id: string;
  nombre: string;
  latitud: number;
  longitud: number;
}

export interface Point {
  id: string;
  name: string;
  lat: number;
  lng: number;
}
