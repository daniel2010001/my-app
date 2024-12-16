export * from "./axios.model";
export * from "./db.model";
export * from "./map.model";
export * from "./points.model";
export * from "./response.model";
export * from "./route.model";
export type TypeWithKey<T> = { [key: string]: T };
export type ValueOf<T> = T[keyof T];
