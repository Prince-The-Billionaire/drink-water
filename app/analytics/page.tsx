import Analytics from '@/components/Analytics'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const page = () => {
  return (
    <div className="bg-gray-100 relative text-black min-h-screen flex">
      <Sidebar/>
      <Analytics/>
    </div>
  )
}

export default page