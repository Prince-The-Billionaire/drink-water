"use client";
import { useTodayWater } from "@/lib/hooks/useWater";

const TotalWaterDisplay = () => {
  const { data: totalWater = 0, isLoading } = useTodayWater();

  if (isLoading) {
    return (
      <p className="text-4xl font-bold text-gray-400 animate-pulse">...</p>
    );
  }

  return (
    <p className="text-4xl font-bold">
      {totalWater / 10}
      <span className="text-black/60 text-sm">cl</span>
    </p>
  );
};

export default TotalWaterDisplay;
