// /lib/water-store.ts
import { create } from "zustand";

type WaterSize = {
  name: string;
  size: string; // e.g., "50cl"
  img: string;
};

type WaterState = {
  waterLimit: number; // in milliliters
  setWaterLimit: (limit: number) => void;

  waterSize: WaterSize | null;
  setWaterSize: (size: WaterSize) => void;

  totalWater: number; // in milliliters
  addWater: (amount: number) => void;
  resetWater: () => void;
};

export const useWaterStore = create<WaterState>((set) => ({
  waterLimit: 2000, // default = 2 liters
  setWaterLimit: (limit) => set({ waterLimit: limit }),

  waterSize: null,
  setWaterSize: (size) => set({ waterSize: size }),

  totalWater: 0,
  addWater: (amount) =>
    set((state) => ({ totalWater: state.totalWater + amount })),
  resetWater: () => set({ totalWater: 0 }),
}));
