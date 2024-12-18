import { createAxiosCall } from "@/lib";
import { Incident, IncidentRequest, IncidentResponse } from "@/models";

const __apiIncidents = "/api/incidencias";

export const getIncidents = () => createAxiosCall<IncidentResponse[]>("GET", __apiIncidents);

export const createIncident = (data: IncidentRequest) =>
  createAxiosCall<IncidentResponse, IncidentRequest>("POST", __apiIncidents, data);

export const updateIncident = (id: Incident["id"], data: IncidentRequest) =>
  createAxiosCall<IncidentResponse, IncidentRequest>("PUT", `${__apiIncidents}/${id}`, data);

export const removeIncident = (id: Incident["id"]) =>
  createAxiosCall<IncidentResponse>("DELETE", `${__apiIncidents}/${id}`);

export const removeAllIncidents = () =>
  createAxiosCall<IncidentResponse[]>("DELETE", `${__apiIncidents}/all`);

export const getIncident = (id: Incident["id"]) =>
  createAxiosCall<IncidentResponse>("GET", `${__apiIncidents}/${id}`);
