import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

import { ParcelsStore } from "@/models";

const __parcelStoreMiddleware = (
  initializer: StateCreator<ParcelsStore, [["zustand/persist", unknown]], []>
) => persist(initializer, { name: "parcel-store" });

export const useParcelStore = create<ParcelsStore>()(
  __parcelStoreMiddleware((set) => ({
    parcels: [],
    addParcel: (parcel) => set((state) => ({ parcels: state.parcels.concat(parcel) })),
    deleteParcel: (id) =>
      set((state) => ({ parcels: state.parcels.filter((parcel) => parcel.id !== id) })),
    clearParcels: () => set(() => ({ parcels: [] })),
  }))
);
