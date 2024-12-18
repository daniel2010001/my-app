import { createAxiosCall } from "@/lib";
import { RouteRequest, RouteResponse } from "@/models";

export const createRoute = (data: RouteRequest) =>
  createAxiosCall<RouteResponse[], RouteRequest>("POST", "/api/ruta", data);

export const getRoute = (id: RouteResponse["id"]) =>
  createAxiosCall<RouteResponse, RouteRequest>("GET", `/api/ruta/${id}`);

export const removeAllRoutes = () => createAxiosCall<RouteResponse[]>("DELETE", "/api/ruta/all");

export const updateRoute = (id: RouteResponse["id"], data: RouteRequest) =>
  createAxiosCall<RouteResponse, RouteRequest>("PUT", `/api/ruta/${id}`, data);

export const removeRoute = (id: RouteResponse["id"]) =>
  createAxiosCall<RouteResponse>("DELETE", `/api/ruta/${id}`);
