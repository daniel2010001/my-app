import { createAxiosCall } from "@/lib";
import { Parcel, ParcelRequest, ParcelResponse } from "@/models";

const __apiParcels = "/api/parcelas";

export const createParcel = (data: ParcelRequest) =>
  createAxiosCall<ParcelResponse, ParcelRequest>("POST", `${__apiParcels}`, data);

export const getParcels = () => createAxiosCall<ParcelResponse[]>("GET", `${__apiParcels}`);

export const getParcel = (id: Parcel["id"]) =>
  createAxiosCall<ParcelResponse, ParcelRequest>("GET", `${__apiParcels}/${id}`);

export const updateParcel = (id: Parcel["id"], data: ParcelRequest) =>
  createAxiosCall<ParcelResponse, ParcelRequest>("PUT", `${__apiParcels}/${id}`, data);

export const removeParcel = (id: Parcel["id"]) =>
  createAxiosCall<ParcelResponse>("DELETE", `${__apiParcels}/${id}`);

export const removeAllParcels = () =>
  createAxiosCall<ParcelResponse[]>("DELETE", `${__apiParcels}/all`);
