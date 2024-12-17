import { isObject } from "@/lib";
import { Car, CarRequest, CarRequestKeys, CarResponse, CarSchema, Available } from "@/models";

export class CarsAdapter {
  static isCarRequest(data: unknown): data is CarRequest {
    return isObject(CarRequestKeys, data);
  }

  static toCarRequest(car: CarSchema): CarRequest {
    return {
      tipo: car.type,
      capacidad_kg: car.capacity,
      volumen_max: car.volume,
      disponibilidad: Available[car.available],
    };
  }

  static toCar(car: CarResponse): Car {
    return {
      id: car.id,
      type: car.tipo,
      capacity: car.capacidad_kg,
      volume: Number(car.volumen_max),
      available: car.disponibilidad,
    };
  }
}
