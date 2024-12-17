import { isObject } from "@/lib";
import {
  CollectionCenter,
  CollectionCenterRequest,
  CollectionCenterRequestKeys,
  CollectionCenterResponse,
  CollectionCentersSchema,
} from "@/models";

export class CollectionCentersAdapter {
  static isCollectionCentersRequest(data: unknown): data is CollectionCenterRequest {
    return isObject(CollectionCenterRequestKeys, data);
  }

  static toCollectionCentersResponse(data: CollectionCentersSchema): CollectionCenterRequest {
    return { nombre: data.name, latitud: data.lat, longitud: data.lng };
  }

  static toCollectionCenters(data: CollectionCenterResponse): CollectionCenter {
    return { id: data.id, name: data.nombre, lat: data.latitud, lng: data.longitud };
  }
}
