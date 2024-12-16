import { PointResponse, PointRequest, Route } from "@/models";
import { createAxiosCall } from "@/lib";

export const createPoint = (data: PointRequest) =>
  createAxiosCall<PointResponse, PointRequest>("POST", "/api/points", data);

export const getPoints = () => createAxiosCall<PointResponse[]>("GET", "/api/points");

export const updatePoint = (id: string, data: PointRequest) =>
  createAxiosCall<PointResponse, PointRequest>("PUT", `/api/points/${id}`, data);

export const removePoint = (id: string) =>
  createAxiosCall<PointResponse>("DELETE", `/api/points/${id}`);

export const removeAllPoints = () => createAxiosCall<PointResponse[]>("DELETE", "/api/points/all");

export const getRoute = (data: Route) =>
  createAxiosCall<unknown, Route>("POST", "/api/tracert", data);
