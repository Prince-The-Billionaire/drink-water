"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import AlarmModal from "@/components/AlarmModal";
import ToggleSwitch from "@/components/ToggleSwitch";
import { useWaterStore } from "@/lib/waterstore";
import { useAlarmCheck } from "@/lib/hooks/useAlarmCheck";
import { FaBottleWater, FaClock, FaGlassWater, FaPlus } from "react-icons/fa6";
import { Toaster } from "sonner";
import TotalWaterDisplay from "@/components/TotalWaterDisplay";
import { useQuery } from "@tanstack/react-query";

interface Alarm {
  _id: string;
  name: string;
  time: string;
  isOn: boolean;
}

const SettingsPage = () => {
  const { waterLimit, setWaterLimit } = useWaterStore();
  const [modal, setModal] = useState(false);

  // start checking alarms
  useAlarmCheck();

  // ask for notification permission once
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // fetch alarms
  const { data: alarms, isLoading } = useQuery<Alarm[]>({
    queryKey: ["alarms"],
    queryFn: async () => {
      const res = await fetch("/api/alarm");
      if (!res.ok) throw new Error("Failed to fetch alarms");
      return res.json();
    },
  });

  return (
    <div className="bg-gray-100 relative text-black min-h-screen flex">
      <Sidebar />

      <div className="flex flex-col gap-6 p-6 md:p-12 lg:p-40 lg:py-12 w-full">
        {/* Alarm Modal */}
        <AlarmModal modal={modal} setModal={setModal} />

        <Toaster position="top-center" richColors />

        {/* Water Intake Summary */}
        <div>
          <p className="text-2xl md:text-3xl text-black/60">Water Intake</p>
          <div className="flex items-center flex-row gap-2">
            <FaBottleWater className="text-blue-500 text-2xl md:text-3xl" />
            <TotalWaterDisplay />
          </div>
        </div>

        {/* Reminder / Alarm Section */}
        <div className="bg-white border w-full lg:w-[80vw] p-4 md:p-6 rounded-3xl">
          <div className="flex flex-row items-center gap-2 mt-2">
            <FaClock className="text-blue-500 size-5 md:size-6" />
            <p className="font-bold text-2xl md:text-3xl lg:text-4xl">
              Reminder To Drink
            </p>
          </div>

          {isLoading ? (
            <p className="mt-6 text-gray-500">Loading alarms...</p>
          ) : (
            <ul className="mt-6 space-y-4">
              {alarms?.map((alarm) => (
                <li
                  key={alarm._id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between rounded-2xl border p-3"
                >
                  <div>
                    <p className="text-xl md:text-2xl font-bold font-sans mb-1 text-black/80">
                      {alarm.name}
                    </p>
                    <p className="text-lg md:text-xl text-gray-600">
                      {alarm.time}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <ToggleSwitch alarmId={alarm._id} enabled={alarm.isOn} />
                  </div>
                </li>
              ))}
            </ul>
          )}

          <button
            onClick={() => setModal(true)}
            className="bg-black flex items-center rounded-xl p-2 w-full mt-6 justify-center"
          >
            <FaPlus className="text-white" />
          </button>
        </div>

        {/* Daily Water Limit */}
        <div className="bg-white border w-full lg:w-[80vw] p-4 md:p-6 rounded-3xl">
          <div className="flex flex-row items-center gap-2 mt-2">
            <FaGlassWater className="text-blue-500 size-5 md:size-6" />
            <p className="font-bold text-2xl md:text-3xl lg:text-4xl">
              Daily Water Limit
            </p>
          </div>

          <div className="flex flex-row gap-4 items-center mt-6">
            <input
              className="w-16 h-16 bg-gray-100 text-center rounded-xl"
              type="number"
              value={waterLimit / 10}
              onChange={(e) => setWaterLimit(Number(e.target.value) * 10)}
            />
            <p className="text-xl md:text-2xl text-black/60">cl</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
