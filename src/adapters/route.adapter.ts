import { decode } from "@googlemaps/polyline-codec";

import { isObject } from "@/lib";
import { Route, RouteResponse, RouteResponseKeys } from "@/models";

export class RouteAdapter {
  static isRouteResponse(routeResponse: unknown): routeResponse is RouteResponse {
    return isObject(RouteResponseKeys, routeResponse);
  }

  static coordinatesConvert({ coordinates }: { coordinates: [number, number] }): [number, number] {
    return [coordinates[1], coordinates[0]];
  }

  static toRoute(routeResponse: unknown): Route {
    if (!RouteAdapter.isRouteResponse(routeResponse))
      throw new Error("RouteResponse is not a valid RouteResponse");
    const points = routeResponse.points_encoded
      ? decode(routeResponse.points)
      : routeResponse.points.map(this.coordinatesConvert);
    const snappedWaypoints = routeResponse.points_encoded
      ? decode(routeResponse.snapped_waypoints)
      : routeResponse.snapped_waypoints.map(this.coordinatesConvert);
    return {
      distance: routeResponse.distance,
      weight: routeResponse.weight,
      time: routeResponse.time,
      bbox: routeResponse.bbox,
      ascend: routeResponse.ascend,
      descend: routeResponse.descend,
      details: routeResponse.details,
      instructions: routeResponse.instructions,
      pointsOrder: routeResponse.points_order,
      points,
      snappedWaypoints,
    };
  }
}
