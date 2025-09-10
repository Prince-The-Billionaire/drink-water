import { create } from "zustand";

interface WaterData {
  id: string;
  day: string;
  date: string;
  value: number;
}

interface WaterDataStore {
  waterdata: WaterData;
  setData: (newData: WaterData) => void;
}

export const useWaterData = create<WaterDataStore>((set) => ({
  waterdata: { id: "", day: "", date: "", value: 0 },
  setData: (newData) => set({ waterdata: newData }),
}));
