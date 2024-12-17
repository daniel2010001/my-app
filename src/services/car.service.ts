import { createAxiosCall } from "@/lib";
import { Car, CarRequest, CarResponse } from "@/models";

export const createCar = (data: CarRequest) =>
  createAxiosCall<CarResponse, CarRequest>("POST", "/api/vehiculos", data);

export const getCars = () => createAxiosCall<CarResponse[]>("GET", "/api/vehiculos");

export const updateCar = (id: Car["id"], data: CarRequest) =>
  createAxiosCall<CarResponse, CarRequest>("PUT", `/api/vehiculos/${id}`, data);

export const removeCar = (id: Car["id"]) =>
  createAxiosCall<CarResponse>("DELETE", `/api/vehiculos/${id}`);

export const removeAllCars = () => createAxiosCall<CarResponse[]>("DELETE", "/api/vehiculos/all");
