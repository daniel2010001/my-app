import { Point, PointRequest, PointResponse } from "@/models";

export class PointsAdapter {
  static isPointRequest(data: unknown): data is PointRequest {
    return (
      typeof data === "object" &&
      data !== null &&
      ["nombre", "latitud", "longitud"].every((key) => key in data)
    );
  }

  static toPointRequest(point: Omit<Point, "id">): PointRequest {
    return {
      nombre: point.name,
      latitud: point.lat,
      longitud: point.lng,
    };
  }

  static toResponse(point: Point): PointResponse {
    return {
      id: point.id,
      nombre: point.name,
      latitud: point.lat,
      longitud: point.lng,
    };
  }

  static toPoint(pointRequest: PointRequest): Point {
    return {
      id: Date.now().toString(),
      name: pointRequest.nombre,
      lat: pointRequest.latitud,
      lng: pointRequest.longitud,
    };
  }
}
