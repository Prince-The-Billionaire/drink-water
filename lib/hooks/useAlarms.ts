"use client";

import { useQuery } from "@tanstack/react-query";

export function useAlarms() {
  return useQuery({
    queryKey: ["alarms"],
    queryFn: async () => {
      const res = await fetch("/api/alarm");
      if (!res.ok) throw new Error("Failed to fetch alarms");
      return res.json();
    },
  });
}
