import { isObject } from "@/lib";
import { Point, PointRequest, PointRequestKeys, PointResponse } from "@/models";

export class PointsAdapter {
  static isPointRequest(data: unknown): data is PointRequest {
    return isObject(PointRequestKeys, data);
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
