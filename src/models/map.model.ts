export type Point = {
  id: string;
  lat: number;
  lng: number;
  name: string;
  icon: "parcel" | "collection-center";
};
export type Line = { id: string; points: [number, number][] };

export interface MapStore {
  points: Point[];
  addPoint: (point: Point | Point[]) => void;
  deletePoint: (id: Point["id"]) => void;
  clearPoints: () => void;
  lines: Line[];
  addLine: (route: Line[] | Line) => void;
  deleteLine: (id: Line["id"]) => void;
  clearLines: () => void;
  bounds: [[number, number], [number, number]];
  setBounds: (bbox: [number, number, number, number]) => void;
}
