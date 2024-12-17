import { Point } from "./points.model";

export interface MapStore {
  points: Point[];
  routePoints: [number, number][][];
  setRoutePoints: (route: [number, number][][]) => void;
  addPoint: (point: Point) => void;
  deletePoint: (id: string) => void;
  updatePoint: (id: string, point: Partial<Point>) => void;
  clearPoints: () => void;
}
