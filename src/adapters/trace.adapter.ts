import { decode } from "@googlemaps/polyline-codec";

import { isObject } from "@/lib";
import {
  Point,
  Trace,
  TraceFormData,
  TraceRequest,
  TraceResponse,
  TraceResponseKeys,
} from "@/models";

export class TraceAdapter {
  static isResponse(routeResponse: unknown): routeResponse is TraceResponse {
    return isObject(TraceResponseKeys, routeResponse);
  }

  static coordinatesConvert({ coordinates }: { coordinates: [number, number] }): [number, number] {
    return [coordinates[1], coordinates[0]];
  }

  static toTrace(routeResponse: unknown): Trace {
    if (!TraceAdapter.isResponse(routeResponse))
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

  static toResponse(data: TraceFormData, points: Point[]): TraceRequest {
    return {
      details: data.details,
      snap_preventions: data.snap_preventions,
      vehicle: data.vehicle,
      point_hints: data.point_hints,
      points: [
        ...points
          .filter(({ id }) => data.points.includes(id))
          .map<[number, number]>(({ lat, lng }) => [lng, lat]),
        ...data.coordinates.map<[number, number]>(([lat, lng]) => [lng, lat]),
      ],
    };
  }
}
