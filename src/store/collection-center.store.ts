import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

import { CollectionCentersStore } from "@/models";

const __collectionCenterStoreMiddleware = (
  initializer: StateCreator<CollectionCentersStore, [["zustand/persist", unknown]], []>
) => persist(initializer, { name: "collection-center-store" });

export const useCollectionCenterStore = create<CollectionCentersStore>()(
  __collectionCenterStoreMiddleware((set) => ({
    collectionCenters: [],
    addCollectionCenter: (collectionCenter) =>
      set((state) => ({ collectionCenters: state.collectionCenters.concat(collectionCenter) })),
    deleteCollectionCenter: (id) =>
      set((state) => ({
        collectionCenters: state.collectionCenters.filter(
          (collectionCenter) => collectionCenter.id !== id
        ),
      })),
    clearCollectionCenters: () => set(() => ({ collectionCenters: [] })),
  }))
);
