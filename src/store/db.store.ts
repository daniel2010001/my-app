import { create, StateCreator } from "zustand";

import { DBStore } from "@/models";
import { persist } from "zustand/middleware";

const __dbStoreMiddleware = (
  initializer: StateCreator<DBStore, [["zustand/persist", unknown]], []>
) => persist(initializer, { name: "db" });

export const useDBStore = create<DBStore>()(
  __dbStoreMiddleware((set) => ({ db: '{"points":[]}', setDB: (db) => set({ db }) }))
);
