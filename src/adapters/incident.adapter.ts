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
  static isRequest(data: unknown): data is IncidentRequest {
    return isObject(IncidentRequestKeys, data);
  }

  static toRequest(incident: IncidentSchema): IncidentRequest {
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
      parcelID: incident.id_parcela,
      type: incident.tipo_incidencia,
      description: incident.descripcion,
      impactKg: incident.impacto_kg,
      data: incident.nueva_fecha,
      status: incident.estado_actual,
      observations: incident.observaciones,
    };
  }
}
