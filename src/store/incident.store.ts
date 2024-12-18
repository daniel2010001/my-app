import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

import { IncidentsStore } from "@/models";

const __incidentStoreMiddleware = (
  initializer: StateCreator<IncidentsStore, [["zustand/persist", unknown]], []>
) => persist(initializer, { name: "incident-store" });

export const useIncidentStore = create<IncidentsStore>()(
  __incidentStoreMiddleware((set) => ({
    incidents: [],
    addIncident: (incident) => set((state) => ({ incidents: state.incidents.concat(incident) })),
    deleteIncident: (id) =>
      set((state) => ({ incidents: state.incidents.filter((incident) => incident.id !== id) })),
    clearIncidents: () => set(() => ({ incidents: [] })),
  }))
);
