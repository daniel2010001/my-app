import { isObject } from "@/lib";
import { Car, CarRequest, CarRequestKeys, CarResponse, CarSchema } from "@/models";

export class CarsAdapter {
  static isCarRequest(data: unknown): data is CarRequest {
    return isObject(CarRequestKeys, data);
  }

  static toCarRequest(car: CarSchema): CarRequest {
    return {
      tipo: car.type,
      capacidad_kg: car.capacity,
      volumen_max: car.volume,
      disponibilidad: car.available,
      recolecciones: car.collections,
    };
  }

  static toCar(car: CarResponse): Car {
    return {
      id: car.id,
      type: car.tipo,
      capacity: car.capacidad_kg,
      volume: car.volumen_max,
      available: car.disponibilidad,
      collections: car.recolecciones,
    };
  }
}
