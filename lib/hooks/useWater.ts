// lib/hooks/useWater.ts
"use client";

import { useQuery } from "@tanstack/react-query";

export function useTodayWater() {
  return useQuery({
    queryKey: ["water", "today"],
    queryFn: async () => {
      const res = await fetch("/api/water");
      if (!res.ok) throw new Error("Failed to fetch water entries");

      const entries = await res.json();
      const today = new Date().toISOString().split("T")[0];

      return entries
        .filter((e: any) => e.date.startsWith(today))
        .reduce((sum: number, e: any) => sum + e.value, 0);
    },
    refetchOnWindowFocus: true,
  });
}
