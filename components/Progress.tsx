"use client";
import { useWaterStore } from "@/lib/waterstore";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useTodayWater } from "@/lib/hooks/useWater";

const Progress = () => {
  const { waterLimit } = useWaterStore(); // still keeping limit in Zustand
  const progressRef = useRef<HTMLDivElement>(null);
  const [colorClass, setColorClass] = useState("");

  const { data: totalWater = 0, isLoading } = useTodayWater();

  // Animate height when totalWater changes
  useEffect(() => {
    if (progressRef.current) {
      const progress = Math.min((totalWater / waterLimit) * 100, 100);

      gsap.to(progressRef.current, {
        height: `${progress}%`,
        duration: 1,
        ease: "power2.out",
      });

      if (totalWater < 600) {
        setColorClass(
          "bg-gradient-to-r from-red-300/70 via-red-200/60 to-red-400/70"
        );
      } else if (totalWater > waterLimit) {
        setColorClass(
          "bg-gradient-to-r from-green-300/70 via-green-200/60 to-green-400/70"
        );
      } else {
        setColorClass(
          "bg-gradient-to-r from-blue-300/70 via-blue-200/60 to-blue-400/70"
        );
      }
    }
  }, [totalWater, waterLimit]);

  if (isLoading) {
    return (
      <div className="h-full w-10 flex items-end justify-end rounded-full bg-gray-200">
        <div className="w-full h-1/2 bg-gray-300 animate-pulse rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="h-full w-10 flex items-end justify-end rounded-full bg-gray-200">
      <div
        ref={progressRef}
        className={`w-full rounded-full 
          ${colorClass} 
          backdrop-blur-xl border border-white/30 shadow-lg
          relative overflow-hidden`}
        style={{ height: "0%" }}
      >
        <div className="absolute inset-0 rounded-full bg-white/20 mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 w-1/3 h-full bg-white/10 blur-2xl rounded-full"></div>
      </div>
    </div>
  );
};

export default Progress;
