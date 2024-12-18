import { createAxiosCall } from "@/lib";
import { Recollection, RecollectionRequest, RecollectionResponse } from "@/models";

const __apiRecollections = "/api/recolecciones";

export const getRecollections = () =>
  createAxiosCall<RecollectionResponse[]>("GET", __apiRecollections);

export const createRecollection = (data: RecollectionRequest) =>
  createAxiosCall<RecollectionResponse, RecollectionRequest>("POST", __apiRecollections, data);

export const getRecollection = (id: Recollection["id"]) =>
  createAxiosCall<RecollectionResponse, RecollectionRequest>("GET", `${__apiRecollections}/${id}`);

export const removeAllRecollections = () =>
  createAxiosCall<RecollectionResponse[]>("DELETE", `${__apiRecollections}/all`);

export const updateRecollection = (id: Recollection["id"], data: RecollectionRequest) =>
  createAxiosCall<RecollectionResponse, RecollectionRequest>(
    "PUT",
    `${__apiRecollections}/${id}`,
    data
  );

export const removeRecollection = (id: Recollection["id"]) =>
  createAxiosCall<RecollectionResponse>("DELETE", `${__apiRecollections}/${id}`);
