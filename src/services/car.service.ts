import { createAxiosCall } from "@/lib";
import { Car, CarRequest, CarResponse } from "@/models";

const __apiCars = "/api/vehiculos";

export const createCar = (data: CarRequest) =>
  createAxiosCall<CarResponse, CarRequest>("POST", __apiCars, data);

export const getCars = () => createAxiosCall<CarResponse[]>("GET", __apiCars);

export const updateCar = (id: Car["id"], data: CarRequest) =>
  createAxiosCall<CarResponse, CarRequest>("PUT", `${__apiCars}/${id}`, data);

export const removeCar = (id: Car["id"]) =>
  createAxiosCall<CarResponse>("DELETE", `${__apiCars}/${id}`);

export const removeAllCars = () => createAxiosCall<CarResponse[]>("DELETE", `${__apiCars}/all`);
