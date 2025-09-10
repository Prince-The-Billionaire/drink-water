"use client"
import Sidebar from '@/components/Sidebar'
import { useWaterStore } from '@/lib/waterstore'
import React from 'react'
import { FaBell, FaBottleWater, FaCircleUser } from 'react-icons/fa6'
import { Toaster } from 'sonner'
import Image from 'next/image'
import { IoDocumentText } from 'react-icons/io5'
import { BsShieldFillCheck } from 'react-icons/bs'
import { FaInfoCircle } from 'react-icons/fa'

const Page = () => {
  const { totalWater } = useWaterStore();
  return (
    <div className="bg-gray-100 relative text-black min-h-screen flex">
      <Sidebar />
      <div className="flex flex-col gap-6 p-6 md:p-12 lg:p-40 lg:py-12">
        <Toaster position="top-center" richColors />

        {/* Water Intake */}
        <div>
          <p className="text-xl md:text-2xl text-black/60">Water Intake</p>
          <div className="flex items-center flex-row gap-2">
            <FaBottleWater className="text-blue-500 text-xl md:text-2xl" />
            <p className="text-3xl md:text-4xl font-bold">
              {totalWater / 10}
              <span className="text-black/60 text-xs md:text-sm">cl</span>
            </p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white border flex flex-col sm:flex-row gap-6 sm:gap-8 w-full lg:w-[80vw] items-center p-6 rounded-3xl">
          <Image
            src="/profile.png"
            alt="Profile Image"
            width={100}
            height={100}
            className="rounded-full"
          />
          <div className="text-center sm:text-left">
            <p className="text-xl md:text-2xl font-bold mt-2 sm:mt-4">John Doe</p>
            <p className="text-black/60 text-sm md:text-base">johndoe@gmail.com</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Settings Options */}
        <div className="bg-white border flex flex-col items-start gap-6 md:gap-8 w-full lg:w-[80vw] p-6 rounded-3xl">
          <div className="flex flex-row gap-3 md:gap-4 items-center text-black/70">
            <FaCircleUser className="text-xl md:text-2xl" />
            <p>My Profile</p>
          </div>

          <div className="flex flex-row gap-3 md:gap-4 items-center text-black/70">
            <FaBell className="text-xl md:text-2xl" />
            <p>Notifications</p>
          </div>

          <div className="flex flex-row gap-3 md:gap-4 items-center text-black/70">
            <IoDocumentText className="text-xl md:text-2xl" />
            <p>Terms and Conditions</p>
          </div>

          <div className="flex flex-row gap-3 md:gap-4 items-center text-black/70">
            <BsShieldFillCheck className="text-xl md:text-2xl" />
            <p>Data & Privacy</p>
          </div>

          <div className="flex flex-row gap-3 md:gap-4 items-center text-black/70">
            <FaInfoCircle className="text-xl md:text-2xl" />
            <p>Help & Info</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
