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
    console.log(recollection);
    return {
      id_parcela: Number(recollection.parcelId.split("-")[1]),
      id_vehiculo: Number(recollection.carId.split("-")[1]),
      id_centro: Number(recollection.centerId.split("-")[2]),
      fecha: recollection.date,
      estado: RecollectionStatus[recollection.status] ?? RecollectionStatus.IN_PROGRESS,
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
