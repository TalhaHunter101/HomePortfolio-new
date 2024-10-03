'use client';
import React from 'react';

const constraintsData = [
  { label: 'RAMSAR', status: 'Pass', statusColor: 'bg-green-100 text-green-800' },
  { label: 'SAC/SPA', status: 'Pass', statusColor: 'bg-green-100 text-green-800' },
  { label: 'Ancient Woodland', status: 'Pass', statusColor: 'bg-green-100 text-green-800' },
  { label: 'Flood Risk', status: 'Pass', statusColor: 'bg-green-100 text-green-800' },
  { label: 'Road Noise', status: 'Low', statusColor: 'bg-yellow-100 text-yellow-800' },
  { label: 'AONB', status: 'Pass', statusColor: 'bg-green-100 text-green-800' },
  { label: 'Built-up area', status: 'Warning', statusColor: 'bg-red-100 text-red-800' },
  { label: 'Common Land', status: 'Pass', statusColor: 'bg-green-100 text-green-800' },
  { label: 'Radon', status: 'Low', statusColor: 'bg-yellow-100 text-yellow-800' },
  { label: 'Rail Noise', status: 'Pass', statusColor: 'bg-green-100 text-green-800' },
];

 export const ConstraintsList = () => {
  const leftConstraints = constraintsData.slice(0, 5);
  const rightConstraints = constraintsData.slice(5);

  return (
    <div className="w-full h-350 bg-white p-4 shadow rounded-md ">
      <div className='py-10'>
      <h3 className="font-bold pb-10  text-lg mb-4">Planning Constraints</h3>
      <div className="flex justify-between">
        {/* Left Column */}
        <div className="flex-1 space-y-2">
          {leftConstraints.map((constraint, index) => (
            <div key={index} className="flex justify-between">
              <span>{constraint.label}</span>
              <span className={`px-2 py-1 rounded ${constraint.statusColor}`}>{constraint.status}</span>
            </div>
          ))}
        </div>
        
        <div className="border-r border-gray-300 mx-4"></div>
        {/* Right Column */}
        <div className="flex-1 space-y-2">
          {rightConstraints.map((constraint, index) => (
            <div key={index} className="flex justify-between">
              <span>{constraint.label}</span>
              <span className={`px-2 py-1 rounded ${constraint.statusColor}`}>{constraint.status}</span>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};


