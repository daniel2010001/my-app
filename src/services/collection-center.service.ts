import { createAxiosCall } from "@/lib";
import { CollectionCenter, CollectionCenterRequest, CollectionCenterResponse } from "@/models";

export const getCollectionCenters = () =>
  createAxiosCall<CollectionCenterResponse[]>("GET", "/api/centro-acopios");

export const createCollectionCenter = (data: CollectionCenterRequest) =>
  createAxiosCall<CollectionCenterResponse, CollectionCenterRequest>(
    "POST",
    "/api/centro-acopios",
    data
  );

export const getCollectionCenter = (id: CollectionCenter["id"]) =>
  createAxiosCall<CollectionCenterResponse, CollectionCenterRequest>(
    "GET",
    `/api/centro-acopios/${id}`
  );

export const removeAllCollectionCenters = () =>
  createAxiosCall<CollectionCenterResponse[]>("DELETE", "/api/centro-acopios/all");

export const updateCollectionCenter = (id: CollectionCenter["id"], data: CollectionCenterRequest) =>
  createAxiosCall<CollectionCenterResponse, CollectionCenterRequest>(
    "PUT",
    `/api/centro-acopios/${id}`,
    data
  );

export const removeCollectionCenter = (id: CollectionCenter["id"]) =>
  createAxiosCall<CollectionCenterResponse>("DELETE", `/api/centro-acopios/${id}`);
