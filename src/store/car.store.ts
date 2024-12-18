import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

import { CarsStore } from "@/models";

const __carStoreMiddleware = (
  initializer: StateCreator<CarsStore, [["zustand/persist", unknown]], []>
) => persist(initializer, { name: "car-store" });

export const useCarStore = create<CarsStore>()(
  __carStoreMiddleware((set) => ({
    cars: [],
    addCar: (car) => set((state) => ({ cars: state.cars.concat(car) })),
    deleteCar: (id) => set((state) => ({ cars: state.cars.filter((car) => car.id !== id) })),
    clearCars: () => set(() => ({ cars: [] })),
  }))
);
