import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

import { RecollectionsStore } from "@/models";

const __recollectionStoreMiddleware = (
  initializer: StateCreator<RecollectionsStore, [["zustand/persist", unknown]], []>
) => persist(initializer, { name: "recollection-store" });

export const useRecollectionStore = create<RecollectionsStore>()(
  __recollectionStoreMiddleware((set) => ({
    recollections: [],
    addRecollection: (recollection) =>
      set((state) => ({ recollections: state.recollections.concat(recollection) })),
    deleteRecollection: (id) =>
      set((state) => ({
        recollections: state.recollections.filter((recollection) => recollection.id !== id),
      })),
    clearRecollections: () => set(() => ({ recollections: [] })),
  }))
);
