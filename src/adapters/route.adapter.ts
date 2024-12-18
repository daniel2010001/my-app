import { isObject } from "@/lib";
import { Route, RouteRequest, RouteRequestKeys, RouteResponse, RouteSchema } from "@/models";

export class RoutesAdapter {
  static isRouteRequest(data: unknown): data is RouteRequest {
    return isObject(RouteRequestKeys, data);
  }

  static toRouteRequest(route: RouteSchema): RouteRequest {
    return {
      id_origen: route.origen,
      id_destino: route.destino,
      texto: route.text,
      distancia_km: route.distanceKm,
      tiempo_estimado: route.timeEstimated,
    };
  }

  static toRoute(route: RouteResponse): Route {
    return {
      id: route.id.toString(),
      idOrigen: route.id_origen.toString(),
      idDestino: route.id_destino.toString(),
      points: JSON.parse(route.texto),
      distanceKm: route.distancia_km,
      timeEstimated: route.tiempo_estimado,
      cost: route.costo,
    };
  }
}
