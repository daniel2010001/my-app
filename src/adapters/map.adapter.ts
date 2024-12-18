import { isObject } from "@/lib";
import { Line, Point } from "@/models";

export class MapAdapter {
  static isPoint(data: unknown): data is Point {
    return isObject(["id", "lat", "lng", "name"] as const, data);
  }
  static isLine(data: unknown): data is Line {
    return isObject(["id", "points"] as const, data);
  }

  static toLine(data: unknown): Line {
    if (!MapAdapter.isLine(data)) throw new Error("Invalid line data");
    return data;
  }

  static toPoint(data: unknown): Point {
    if (!MapAdapter.isPoint(data)) throw new Error("Invalid point data");
    return data;
  }
}
