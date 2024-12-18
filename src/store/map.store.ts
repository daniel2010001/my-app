import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

import { MapStore } from "@/models";

const __mapStoreMiddleware = (
  initializer: StateCreator<MapStore, [["zustand/persist", unknown]], []>
) => persist(initializer, { name: "map-store" });

export const useMapStore = create<MapStore>()(
  __mapStoreMiddleware((set) => ({
    points: [],
    addPoint: (point) => set((state) => ({ points: state.points.concat(point) })),
    deletePoint: (id) =>
      set((state) => ({ points: state.points.filter((point) => point.id !== id) })),
    clearPoints: () => set(() => ({ points: [] })),
    lines: [],
    addLine: (route) => set((state) => ({ lines: state.lines.concat(route) })),
    deleteLine: (id) => set((state) => ({ lines: state.lines.filter((route) => route.id !== id) })),
    clearLines: () => set(() => ({ lines: [] })),
    bounds: [
      [-17.62, -66.1],
      [-17.66, -65.7],
    ],
    setBounds: (bbox) =>
      set(() => ({
        bounds: [
          [bbox[1], bbox[0]],
          [bbox[3], bbox[2]],
        ],
      })),
  }))
);
