"use client"
import React from 'react'
import { FaBottleWater, FaUser } from 'react-icons/fa6'
import { IoBarChart, IoSettings } from 'react-icons/io5'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
  const pathname = usePathname()

  const navLinks = [
    {
      name: 'Home',
      Icon: FaBottleWater,
      href: '/'
    },
    {
      name: 'Analytics',
      Icon: IoBarChart,
      href: '/analytics'
    },
    {
      name: 'Settings',
      Icon: IoSettings,
      href: '/settings'
    },
    {
      name: 'Profile',
      Icon: FaUser,
      href: '/profile'
    }
  ]

  return (
    <div className='flex flex-col max-md:items-center max-md:justify-between max-md:flex-row max-md:bottom-4 max-md:px-6 max-md:left-0 max-md:gap-2 gap-4 bg-black/90 backdrop-blur-2xl shadow-blue-400 shadow-md text-white absolute md:top-1/4 md:left-10 rounded-3xl max-md:p-2 max-md:w-full p-4 px-1 h-fit'>
      {navLinks.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            href={item.href}
            key={item.name}
            className={`flex flex-col items-center max-md:gap-2 p-4 max-md:p-1 rounded-2xl transition
              ${isActive ? 'text-blue-500' : 'hover:text-blue-800'}`}
          >
            <item.Icon
              size={30}
              className={`max-md:size-6 ${isActive ? 'text-blue-500' : ''}`}
            />
            <p
              className={`max-md:text-sm ${
                isActive ? 'block text-blue-500' : 'hidden'
              }`}
            >
              {item.name}
            </p>
          </Link>
        )
      })}
    </div>
  )
}

export default Sidebar
