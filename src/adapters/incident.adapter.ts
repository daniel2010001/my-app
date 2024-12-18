import { isObject } from "@/lib";
import {
  Incident,
  IncidentRequest,
  IncidentRequestKeys,
  IncidentResponse,
  IncidentSchema,
  IncidentStatus,
  IncidentType,
} from "@/models";

export class IncidentsAdapter {
  static isIncidentRequest(data: unknown): data is IncidentRequest {
    return isObject(IncidentRequestKeys, data);
  }

  static toIncidentRequest(incident: IncidentSchema): IncidentRequest {
    return {
      id_parcela: Number(incident.parcelId) ?? 0,
      tipo_incidencia: IncidentType[incident.type] ?? IncidentType.OTHER,
      descripcion: incident.description,
      impacto_kg: incident.impactKg ?? null,
      nueva_fecha: incident.newCollectionDate?.toISOString() ?? null,
      estado_actual: IncidentStatus[incident.status] ?? null,
      observaciones: incident.observations ?? null,
    };
  }

  static toIncident(incident: IncidentResponse): Incident {
    return {
      id: incident.id.toString(),
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
