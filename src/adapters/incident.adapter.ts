import { isObject } from "@/lib";
import {
  Incident,
  IncidentRequest,
  IncidentRequestKeys,
  IncidentResponse,
  IncidentSchema,
} from "@/models";

export class IncidentsAdapter {
  static isIncidentRequest(data: unknown): data is IncidentRequest {
    return isObject(IncidentRequestKeys, data);
  }

  static toIncidentRequest(incident: IncidentSchema): IncidentRequest {
    return {
      id_parcela: incident.parcelId,
      tipo_incidencia: incident.type,
      descripcion: incident.description,
      impacto_kg: incident.impactKg ?? null,
      nueva_fecha: incident.newCollectionDate?.toISOString() ?? null,
      estado_actual: incident.status ?? null,
      observaciones: incident.observations ?? null,
    };
  }

  static toIncident(incident: IncidentResponse): Incident {
    return {
      id: incident.id,
      id_parcela: incident.id_parcela,
      tipo_incidencia: incident.tipo_incidencia,
      descripcion: incident.descripcion,
      impacto_kg: incident.impacto_kg,
      nueva_fecha: incident.nueva_fecha,
      estado_actual: incident.estado_actual,
      observaciones: incident.observaciones,
    };
  }
}
