import { createAxiosCall } from "@/lib";
import { Parcel, ParcelRequest, ParcelResponse } from "@/models";

export const createParcel = (data: ParcelRequest) =>
  createAxiosCall<ParcelResponse, ParcelRequest>("POST", "/api/parcelas", data);

export const getParcels = () => createAxiosCall<ParcelResponse[]>("GET", "/api/parcelas");

export const getParcel = (id: Parcel["id"]) =>
  createAxiosCall<ParcelResponse, ParcelRequest>("GET", `/api/parcelas/${id}`);

export const updateParcel = (id: Parcel["id"], data: ParcelRequest) =>
  createAxiosCall<ParcelResponse, ParcelRequest>("PUT", `/api/parcelas/${id}`, data);

export const removeParcel = (id: Parcel["id"]) =>
  createAxiosCall<ParcelResponse>("DELETE", `/api/parcelas/${id}`);

export const removeAllParcels = () =>
  createAxiosCall<ParcelResponse[]>("DELETE", "/api/parcelas/all");
