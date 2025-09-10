"use client"
import React, { useEffect } from 'react'
import { FaBottleWater, FaCircleMinus } from 'react-icons/fa6'
import Progress from './Progress'
import Image from 'next/image'
import { IoIosAddCircle } from 'react-icons/io'
import Tips from './Tips'
import { useWaterStore } from '@/lib/waterstore'
import { parseSizeToMl } from '@/lib/parseSize'
import { toast, Toaster } from 'sonner'
import { useWaterData } from '@/lib/useWaterdata'
import TotalWaterDisplay from './TotalWaterDisplay'
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Dashboard = () => {
  const { waterSize, totalWater, addWater } = useWaterStore();
  const { waterdata, setData } = useWaterData();
  const queryClient = useQueryClient();

  const addWaterMutation = useMutation({
    mutationFn: async (amount: number) => {
      await fetch("/api/water", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["water", "today"] });
    },
  });

  const addWaterIntake = async () => {
    if (!waterSize) {
      toast.error("Please select a water size first!");
      return;
    }

    try {
      const amount = parseSizeToMl(waterSize.size);
      const res = await fetch("/api/water", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: amount }),
      });

      if (!res.ok) throw new Error("Failed to save water intake");

      const savedEntry = await res.json();

      setData({
        id: savedEntry._id,
        day: savedEntry.day,
        date: new Date(savedEntry.date).toISOString().split("T")[0],
        value: savedEntry.value,
      });

      addWater(amount);
      addWaterMutation.mutate(amount);
      toast.success("Water intake added!");
    } catch (error) {
      console.error(error);
      toast.error("Error saving water intake!");
    }
  };

  const removeWaterIntake = () => {
    if (waterSize && totalWater > 0) {
      const amount = parseSizeToMl(waterSize.size);
      addWater(-amount);
    } else {
      toast.error("Please select a water size first!");
    }
  };

  useEffect(() => {
    if (waterdata) {
      console.log(waterdata);
    }
  }, [waterdata]);

  return (
    <div className="flex flex-col p-4 md:p-8 w-full md:max-w-7xl md:mx-24 h-full min-h-screen">
      <Toaster position="top-center" richColors />
      <p className="text-xl md:text-2xl text-black/60 mb-2">Water Intake</p>

      <div className="flex items-center gap-2 mb-6">
        <FaBottleWater className="text-blue-500 text-xl md:text-2xl" />
        <TotalWaterDisplay />
      </div>

      <div className="flex flex-col lg:flex-row rounded-2xl bg-white p-4 w-full gap-6 shadow-md">
        {/* Progress */}
        <div className=" flex ">
          <Progress />
        </div>

        {/* Image */}
        <div className="flex justify-start items-center">
          <Image
            src={totalWater / 10 < 100 ? "/water_guy.png" : "/happy.png"}
            alt="water guy"
            width={250}
            height={250}
            className="w-40 h-40 md:w-80 md:h-80 object-contain"
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col justify-center items-center text-3xl text-blue-500 gap-4">
          <IoIosAddCircle onClick={() => addWaterIntake()} className="cursor-pointer hover:scale-110 transition" />
          <FaCircleMinus
            onClick={() => removeWaterIntake()}
            className={`${totalWater === 0 ? "text-gray-200 cursor-not-allowed" : "cursor-pointer hover:scale-110 transition"}`}
          />
        </div>

        {/* Tips */}
        <div className="flex-1 flex items-center justify-center">
          <Tips />
        </div>
      </div>
    </div>
  );
}

export default Dashboard
