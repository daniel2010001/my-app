import { createAxiosCall } from "@/lib";
import { PointRequest, PointResponse, RouteFormData, RouteResponse } from "@/models";

export const createPoint = (data: PointRequest) =>
  createAxiosCall<PointResponse, PointRequest>("POST", "/api/points", data);

export const getPoints = () => createAxiosCall<PointResponse[]>("GET", "/api/points");

export const updatePoint = (id: string, data: PointRequest) =>
  createAxiosCall<PointResponse, PointRequest>("PUT", `/api/points/${id}`, data);

export const removePoint = (id: string) =>
  createAxiosCall<PointResponse>("DELETE", `/api/points/${id}`);

export const removeAllPoints = () => createAxiosCall<PointResponse[]>("DELETE", "/api/points/all");

export const getRoute = (data: RouteFormData) =>
  createAxiosCall<RouteResponse[], RouteFormData>("POST", "/api/tracert", data);
