import { createAxiosCall } from "@/lib";
import { CollectionCenterRequest, CollectionCenterResponse } from "@/models";

export const createCollectionCenter = (data: CollectionCenterRequest) =>
  createAxiosCall<CollectionCenterResponse, CollectionCenterRequest>(
    "POST",
    "/api/centro-acopios",
    data
  );

export const getCollectionCenters = () =>
  createAxiosCall<CollectionCenterResponse[]>("GET", "/api/centro-acopios");
