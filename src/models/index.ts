export * from "./axios.model";
export * from "./car.model";
export * from "./collection-center.model";
export * from "./incident.model";
export * from "./map.model";
export * from "./parcel.model";
export * from "./response.model";
export * from "./recollection.model";
export * from "./route.model";
export * from "./trace.model";
export type TypeWithKey<T> = { [key: string]: T };
export type ValueOf<T> = T[keyof T];
