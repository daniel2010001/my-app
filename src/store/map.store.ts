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
    routes: [],
    addRoute: (route) => set((state) => ({ routes: state.routes.concat(route) })),
    deleteRoute: (id) =>
      set((state) => ({ routes: state.routes.filter((route) => route.id !== id) })),
    clearRoutes: () => set(() => ({ routes: [] })),
  }))
);
