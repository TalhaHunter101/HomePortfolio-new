import React from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Icon } from '@iconify/react';

export function ReachOutCard({  }) {
  return (
    <Card className="m-4 " style={{ minHeight: '150px' }}>
      <CardHeader>
      <div className="flex items-center my-2">
    <div className="flex items-center justify-center w-8 h-8 bg-purple-200 rounded-full mr-2">
      <Icon
        icon="solar:chat-round-call-outline"
        width={16} // Adjust the icon size to fit well within the circle
        className="text-purple-700" // Adjust the icon color if needed
      />
    </div>
    <h2 className="text-xl font-bold text-gray-700">Want to reach out?</h2>
  </div>
      </CardHeader>
      <CardBody>
        <div className="p-5 bg-default-white  rounded-md">
          <div>
            <button className="font-medium px-4 py-2 my-2 bg-purple-100 text-default-600 rounded-md focus:outline-none">
              <li>House For Sale</li>
            </button>
            <p className="text-[12px] font-bold text-base mb-3">Reach out to us</p>
            <p className="text-[12px] font-medium">
              Ask a question about 1906 Brentwood ST, and HomePortfolio will get back to you within 24 hours.
            </p>
          </div>
          <div className="grid grid-cols-6 gap-4 my-4">
            <div className="col-span-6 md:col-span-3">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 mb-4 bg-default-100 border border-default-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 mb-4 bg-default-100 border border-default-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-2 mb-4 bg-default-100 border border-default-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="col-span-6 md:col-span-3">
              <textarea
                rows="4"
                placeholder="Ask Address ..."
                className="w-full px-4 py-2 border bg-default-100 border-default-300 rounded-md focus:outline-none focus:border-blue-500"
              ></textarea>
              <button className="w-full transition-all duration-300 ease-in-out border-2 border-primary hover:bg-white hover:text-primary bg-primary px-3 py-1.5 text-white rounded-md">
                Send Message
              </button>
            </div>
          </div>
          <div>
            <p className="text-[12px] text-secondary text-xs">
              {/* // eslint-disable-next-line react/no-unescaped-entities */}
              By pressing Send Message, you agree that HomePortfolio and real estate professionals Real Estate Professionals includes the real estate agents and brokers, mortgage loan lenders and officers, property managers, and other professionals you interact with through HomePortfolio may contact you via email or phone/text about your inquiry. This may involve the use of automated means. You do not need to consent as a condition of buying any property, goods or services. Message/data rates may apply. You also agree to our <a href="" className="text-blue-600 visited:text-purple-600">Terms of Use</a> and <a href="" className="text-blue-600 visited:text-purple-600">Privacy Policy</a>. We may share your recent and future site activity with your agent to help them better understand what you are looking for in a home.
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
