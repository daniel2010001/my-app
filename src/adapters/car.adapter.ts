import { isObject } from "@/lib";
import { Car, CarRequest, CarRequestKeys, CarResponse, CarSchema, CarsAvailable } from "@/models";

export class CarsAdapter {
  static isRequest(data: unknown): data is CarRequest {
    return isObject(CarRequestKeys, data);
  }

  static toRequest(car: CarSchema): CarRequest {
    return {
      tipo: car.type,
      capacidad_kg: car.capacity,
      volumen_max: car.volume.toString(),
      disponibilidad: CarsAvailable[car.available],
    };
  }

  static toCar(car: CarResponse): Car {
    return {
      id: `car-${car.id}`,
      type: car.tipo,
      capacity: car.capacidad_kg,
      volume: Number(car.volumen_max),
      available: car.disponibilidad,
    };
  }

  // static toPoint(car: CarResponse): Point {
  //   return {
  //     id: `car-${car.id}`,
  //     lat: Number(car.latitud),
  //     lng: Number(car.longitud),
  //     name: car.tipo,
  //   };
  // }
}
