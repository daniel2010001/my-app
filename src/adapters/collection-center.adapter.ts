import { isObject } from "@/lib";
import {
  CollectionCenter,
  CollectionCenterRequest,
  CollectionCenterRequestKeys,
  CollectionCenterResponse,
  CollectionCentersSchema,
  Point,
} from "@/models";

export class CollectionCentersAdapter {
  static isRequest(data: unknown): data is CollectionCenterRequest {
    return isObject(CollectionCenterRequestKeys, data);
  }

  static toRequest(data: CollectionCentersSchema): CollectionCenterRequest {
    return { nombre: data.name, latitud: data.lat, longitud: data.lng };
  }

  static toCollectionCenters(data: CollectionCenterResponse): CollectionCenter {
    return { id: data.id.toString(), name: data.nombre, lat: data.latitud, lng: data.longitud };
  }

  static toPoint(data: CollectionCenterResponse): Point {
    return {
      id: `collection-center-${data.id}`,
      lat: Number(data.latitud),
      lng: Number(data.longitud),
      name: data.nombre,
      icon: "collection-center",
    };
  }
}
