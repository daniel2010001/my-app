import { createAxiosCall } from "@/lib";
import { ParcelRequest, ParcelResponse } from "@/models";

export const createParcel = (data: ParcelRequest) =>
  createAxiosCall<ParcelResponse, ParcelRequest>("POST", "/api/parcelas", data);

export const getParcels = () => createAxiosCall<ParcelResponse[]>("GET", "/api/parcelas");

export const updateParcel = (id: string, data: ParcelRequest) =>
  createAxiosCall<ParcelResponse, ParcelRequest>("PUT", `/api/parcelas/${id}`, data);

export const removeParcel = (id: string) =>
  createAxiosCall<ParcelResponse>("DELETE", `/api/parcelas/${id}`);

export const removeAllParcels = () =>
  createAxiosCall<ParcelResponse[]>("DELETE", "/api/parcelas/all");

export const getParcel = (id: string) =>
  createAxiosCall<ParcelResponse, ParcelRequest>("GET", `/api/parcelas/${id}`);
