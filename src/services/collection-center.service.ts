import { createAxiosCall } from "@/lib";
import { CollectionCenter, CollectionCenterRequest, CollectionCenterResponse } from "@/models";

const __apiCollectionCenters = "/api/centro-acopios";

export const getCollectionCenters = () =>
  createAxiosCall<CollectionCenterResponse[]>("GET", __apiCollectionCenters);

export const createCollectionCenter = (data: CollectionCenterRequest) =>
  createAxiosCall<CollectionCenterResponse, CollectionCenterRequest>(
    "POST",
    __apiCollectionCenters,
    data
  );

export const getCollectionCenter = (id: CollectionCenter["id"]) =>
  createAxiosCall<CollectionCenterResponse, CollectionCenterRequest>(
    "GET",
    `${__apiCollectionCenters}/${id}`
  );

export const removeAllCollectionCenters = () =>
  createAxiosCall<CollectionCenterResponse[]>("DELETE", `${__apiCollectionCenters}/all`);

export const updateCollectionCenter = (id: CollectionCenter["id"], data: CollectionCenterRequest) =>
  createAxiosCall<CollectionCenterResponse, CollectionCenterRequest>(
    "PUT",
    `${__apiCollectionCenters}/${id}`,
    data
  );

export const removeCollectionCenter = (id: CollectionCenter["id"]) =>
  createAxiosCall<CollectionCenterResponse>("DELETE", `${__apiCollectionCenters}/${id}`);
