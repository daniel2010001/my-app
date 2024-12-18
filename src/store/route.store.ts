import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

import { RoutesStore } from "@/models";

const __routeStoreMiddleware = (
  initializer: StateCreator<RoutesStore, [["zustand/persist", unknown]], []>
) => persist(initializer, { name: "route-store" });

export const useRouteStore = create<RoutesStore>()(
  __routeStoreMiddleware((set) => ({
    routes: [],
    addRoute: (route) => set((state) => ({ routes: state.routes.concat(route) })),
    deleteRoute: (id) =>
      set((state) => ({ routes: state.routes.filter((route) => route.id !== id) })),
    clearRoutes: () => set(() => ({ routes: [] })),
  }))
);
