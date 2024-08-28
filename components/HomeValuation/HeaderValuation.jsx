import { Icon } from '@iconify/react'
import React from 'react'

function HeaderValuation({data}) {
  return (
    <div className="border-l-4 border-blue-500 pl-4">
    <h1 className="text-2xl font-bold">{data?.full_address}</h1>
    <p className="text-gray-600">Rental Property Report</p>
    <div className="flex items-center mt-2">
      <Icon icon="mdi:chart-box" className="w-6 h-6 text-blue-500" />
      <span className="ml-2 text-blue-500 font-semibold">Homeprotfolio</span>
    </div>
  </div>
  )
}

export default HeaderValuation