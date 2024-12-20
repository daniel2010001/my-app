import { isObject } from "@/lib";
import {
  Parcel,
  ParcelRequest,
  ParcelRequestKeys,
  ParcelResponse,
  ParcelSchema,
  Point,
  RoadCondition,
} from "@/models";
import { IncidentsAdapter, RecollectionsAdapter } from ".";

export class ParcelsAdapter {
  static isRequest(data: unknown): data is ParcelRequest {
    return isObject(ParcelRequestKeys, data);
  }

  static toRequest(
    parcel: ParcelSchema & { distanceKm: number; roadCondition: RoadCondition }
  ): ParcelRequest {
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
      id_centro: Number(parcel.centerId),
    };
  }

  static toParcel(parcel: ParcelResponse): Parcel {
    return {
      id: `parcel-${parcel.id}`,
      name: parcel.nombre,
      corn: parcel.variedad_maiz,
      lat: Number(parcel.latitud),
      lng: Number(parcel.longitud),
      amountKg: parcel.cantidad_kg,
      distanceKm: Number(parcel.distancia_km),
      roadCondition: parcel.estado_via,
      windowStar: new Date(parcel.ventana_inicio),
      windowEnd: new Date(parcel.ventana_fin),
      incidents: parcel.incidencias.map(IncidentsAdapter.toIncident),
      collections: parcel.recolecciones.map(RecollectionsAdapter.toRecollection),
    };
  }

  static toPoint(parcel: ParcelResponse): Point {
    return {
      id: `parcel-${parcel.id}`,
      lat: Number(parcel.latitud),
      lng: Number(parcel.longitud),
      name: parcel.nombre,
      icon: "parcel",
    };
  }
}
