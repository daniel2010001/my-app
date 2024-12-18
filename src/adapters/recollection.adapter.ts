import { isObject } from "@/lib";
import {
  Recollection,
  RecollectionRequest,
  RecollectionRequestKeys,
  RecollectionResponse,
  RecollectionSchema,
  RecollectionStatus,
} from "@/models";

export class RecollectionsAdapter {
  static isRequest(data: unknown): data is RecollectionRequest {
    return isObject(RecollectionRequestKeys, data);
  }

  static toRequest(recollection: RecollectionSchema): RecollectionRequest {
    return {
      id_parcela: recollection.id_parcela,
      id_vehiculo: recollection.id_vehiculo,
      id_centro: recollection.id_centro,
      fecha: recollection.fecha,
      estado: RecollectionStatus[recollection.estado] ?? RecollectionStatus.IN_PROGRESS,
    };
  }

  static toRecollection(recollection: RecollectionResponse): Recollection {
    return {
      id: recollection.id.toString(),
      parcelId: recollection.id_parcela.toString(),
      carId: recollection.id_vehiculo.toString(),
      collectionCenterId: recollection.id_centro.toString(),
      date: recollection.fecha,
      status: recollection.estado,
    };
  }
}
