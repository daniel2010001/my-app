import { isObject } from "@/lib";
import { Parcel, ParcelRequest, ParcelRequestKeys, ParcelResponse, ParcelSchema } from "@/models";

export class ParcelsAdapter {
  static isParcelRequest(data: unknown): data is ParcelRequest {
    return isObject(ParcelRequestKeys, data);
  }

  static toParcelRequest(parcel: ParcelSchema): ParcelRequest {
    return {
      nombre: parcel.name,
      variedad_maiz: parcel.corn,
      latitud: parcel.lat,
      longitud: parcel.lng,
      cantidad_kg: parcel.amountKg,
      distancia_km: parcel.distanceKm,
      estado_via: parcel.roadCondition,
      ventana_inicio: parcel.windowStart,
      ventana_fin: parcel.windowEnd,
      incidencias: [],
      recolecciones: [],
    };
  }

  static toParcel(parcel: ParcelResponse): Parcel {
    return {
      id: parcel.id,
      name: parcel.nombre,
      corn: parcel.variedad_maiz,
      lat: parcel.latitud,
      lng: parcel.longitud,
      amountKg: parcel.cantidad_kg,
      distanceKm: parcel.distancia_km,
      roadCondition: parcel.estado_via,
      windowStar: parcel.ventana_inicio,
      windowEnd: parcel.ventana_fin,
      incidents: parcel.incidencias,
      collections: parcel.recolecciones,
    };
  }
}