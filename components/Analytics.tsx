"use client"
import React, { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker"
import { Toaster } from "sonner"
import { FaBottleWater, FaClock } from "react-icons/fa6"
import Image from "next/image"
import TotalWaterDisplay from "./TotalWaterDisplay"
import { useDataWater } from "@/lib/hooks/useDataWater"
import { format, parseISO } from "date-fns"

const AnalyticsPage = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const { data: allEntries = [], isLoading } = useDataWater()

  // ✅ Aggregate totals per day
  const dailyTotals = allEntries.reduce((acc: any, entry: any) => {
    const date = format(parseISO(entry.date), "yyyy-MM-dd")
    const day = format(parseISO(entry.date), "EEE") // e.g. Mon, Tue

    if (!acc[date]) {
      acc[date] = { day, date, value: 0 }
    }
    acc[date].value += entry.value
    return acc
  }, {})

  const allData = Object.values(dailyTotals)

  // ✅ Apply date range filter
  const filteredData = allData.filter((d: any) => {
    if (!dateRange?.from || !dateRange?.to) return true
    const time = new Date(d.date).getTime()
    return time >= dateRange.from.getTime() && time <= dateRange.to.getTime()
  })

  return (
    <div className="flex flex-col gap-6 p-6 md:p-12 lg:p-40 lg:py-12">
      <Toaster position="top-center" richColors />

      {/* Water Intake Summary */}
      <div>
        <p className="text-2xl font-sans text-black/60">Water Intake</p>
        <div className="flex items-center flex-row gap-2">
          <FaBottleWater className="text-blue-500 text-2xl" />
          <TotalWaterDisplay />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Chart */}
        <div className="flex-1 min-h-[300px] lg:min-w-[600px] lg:h-[80%] bg-white rounded-xl shadow p-4">
          {isLoading ? (
            <p className="text-center text-gray-500">Loading chart...</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Calendar + Info */}
        <div className="w-full lg:w-auto lg:h-screen">
          <div className="rounded-3xl bg-white border p-4 mb-6">
            <div className="flex flex-row p-3 rounded-2xl items-center bg-blue-500">
              <Image src={"/Idea.png"} alt="idea" width={50} height={50} />
              <p className="text-white/70 ml-2">
                Drinking at least 2 liters of water a day improves the skin
              </p>
            </div>
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={1}
              className="w-full"
            />
          </div>

          {/* First drink example */}
          <p className="text-2xl font-bold mb-2">Your Activities</p>
          <div className="max-w-lg flex flex-col items-center bg-white rounded-2xl py-2 justify-center">
            <div className="flex flex-row items-center gap-2 p-4 mt-2">
              <FaClock className="text-blue-500" />
              <p className="font-bold">First Drink</p>
            </div>
            <Image
              src={"/SparklingWater.png"}
              alt="sparkling water"
              width={100}
              height={100}
            />
            <p className="font-bold">
              04:00 <span className="text-black/50">a.m</span>
            </p>
            <p className="font-bold text-black/50">50cl</p>
            <div className="flex flex-row gap-2 mt-4 mb-4">
              {Array(10)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className={`rounded-full size-3 ${
                      index === 1 ? "bg-blue-500" : "bg-blue-500/50"
                    }`}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage
