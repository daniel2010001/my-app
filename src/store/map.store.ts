import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

import { PointsAdapter } from "@/adapters";
import { loadAbortable } from "@/lib";
import { MapStore } from "@/models";
import { getPoints } from "@/services";

const __mapStoreMiddleware = (
  initializer: StateCreator<MapStore, [["zustand/persist", unknown]], []>
) =>
  persist(initializer, {
    name: "map-store",
    onRehydrateStorage: () => async (state) => {
      if (!state) return state;
      const response = await loadAbortable(getPoints());
      if (response && !(response instanceof Error))
        state.points = response.data.map(PointsAdapter.toPoint);
      return state;
    },
  });

export const useMapStore = create<MapStore>()(
  __mapStoreMiddleware((set) => ({
    points: [],
    routePoints: [],
    setRoutePoints: (routePoints) => set(() => ({ routePoints })),
    addPoint: (point) => set((state) => ({ points: state.points.concat(point) })),
    deletePoint: (id) =>
      set((state) => ({ points: state.points.filter((point) => point.id !== id) })),
    updatePoint: (id, point) =>
      set((state) => ({ points: state.points.map((p) => (p.id === id ? { ...p, ...point } : p)) })),
    clearPoints: () => set(() => ({ points: [] })),
  }))
);
