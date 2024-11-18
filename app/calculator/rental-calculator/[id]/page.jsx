import FirstSection from '@/components/RentalCalculator/FirstSection';
import FourthSection from '@/components/RentalCalculator/FourthSection';
import SecondSection from '@/components/RentalCalculator/SecondSection';
import ThirdSection from '@/components/RentalCalculator/ThirdSection';
import { Icon } from '@iconify/react';
import { Divider } from '@nextui-org/react';
import React from 'react';

export default function RentalReportId({ params }) {
  return (
    <div className='flex flex-col max-w-6xl mx-auto mt-16'>

        {/* New Section Added and Centered on the Top of the Screen */}
        <div className="flex justify-center items-center ">
          <div className="bg-white p-8 rounded-md shadow-md flex flex-col items-center max-w-sm">
            <h2 className="text-2xl font-bold mb-2">{params.id}</h2>
            <p className="text-gray-600">sa, California, `213`</p>
            <div className="flex items-center mt-4">
              <span className="text-green-500 font-bold text-lg"><Icon className='inline mr-2' icon="mingcute:cash-2-fill" />$913</span>
              <span className="text-gray-600 ml-2">monthly cash flow</span>
            </div>
          </div>
        </div>

        <FirstSection />
        <Divider className='my-6' />
        <SecondSection />
        <Divider className='my-6' />
        <ThirdSection />
        <Divider className='my-6' />
        <FourthSection />
    </div>
  );
}
