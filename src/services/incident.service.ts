import { IncidentRequest, IncidentResponse } from "@/models";
import { createAxiosCall } from "@/lib";

export const getIncidents = () => createAxiosCall<IncidentResponse[]>("GET", "/api/incidencias");

export const createIncident = (data: IncidentRequest) =>
  createAxiosCall<IncidentResponse, IncidentRequest>("POST", "/api/incidencias", data);

export const updateIncident = (id: IncidentResponse["id"], data: IncidentRequest) =>
  createAxiosCall<IncidentResponse, IncidentRequest>("PUT", `/api/incidencias/${id}`, data);

export const removeIncident = (id: IncidentResponse["id"]) =>
  createAxiosCall<IncidentResponse>("DELETE", `/api/incidencias/${id}`);

export const removeAllIncidents = () =>
  createAxiosCall<IncidentResponse[]>("DELETE", "/api/incidencias/all");

export const getIncident = (id: IncidentResponse["id"]) =>
  createAxiosCall<IncidentResponse>("GET", `/api/incidencias/${id}`);
