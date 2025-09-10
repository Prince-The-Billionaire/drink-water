// lib/useWaterData.ts
"use client";

import { useQuery } from "@tanstack/react-query";

export function useDataWater() {
  return useQuery({
    queryKey: ["water", "all"],
    queryFn: async () => {
      const res = await fetch("/api/water");
      if (!res.ok) throw new Error("Failed to fetch water entries");

      return res.json(); // array of { day, date, value, user }
    },
    refetchOnWindowFocus: true,
  });
}
