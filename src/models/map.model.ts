export type Point = { id: string; lat: number; lng: number; name: string };
export type Line = { id: string; points: [number, number][] };

export interface MapStore {
  points: Point[];
  addPoint: (point: Point) => void;
  deletePoint: (id: Point["id"]) => void;
  clearPoints: () => void;
  routes: Line[];
  addRoute: (route: Line[]) => void;
  deleteRoute: (id: Line["id"]) => void;
  clearRoutes: () => void;
}
