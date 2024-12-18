import { createAxiosCall } from "@/lib";
import { Route, RouteRequest, RouteResponse } from "@/models";

const __apiRoutes = "/api/rutas";

export const getRoutes = () => createAxiosCall<RouteResponse[]>("GET", `${__apiRoutes}`);

export const createRoute = (data: RouteRequest) =>
  createAxiosCall<RouteResponse[], RouteRequest>("POST", `${__apiRoutes}`, data);

export const getRoute = (id: Route["id"]) =>
  createAxiosCall<RouteResponse, RouteRequest>("GET", `${__apiRoutes}/${id}`);

export const removeAllRoutes = () =>
  createAxiosCall<RouteResponse[]>("DELETE", `${__apiRoutes}/all`);

export const updateRoute = (id: Route["id"], data: RouteRequest) =>
  createAxiosCall<RouteResponse, RouteRequest>("PUT", `${__apiRoutes}/${id}`, data);

export const removeRoute = (id: Route["id"]) =>
  createAxiosCall<RouteResponse>("DELETE", `${__apiRoutes}/${id}`);
