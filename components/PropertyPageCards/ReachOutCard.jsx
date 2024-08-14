import React from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export function ReachOutCard({ title }) {
  return (
    <Card className="m-4 " style={{ minHeight: '150px' }}>
      <CardHeader>
        <h2 className="text-xl font-bold">{title}</h2>
      </CardHeader>
      <CardBody>
        <div className="px-16 py-5 bg-default-white border border-default-200 rounded-md">
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
                placeholder="Ask Question ..."
                className="w-full px-4 py-2 border bg-default-100 border-default-300 rounded-md focus:outline-none focus:border-blue-500"
              ></textarea>
              <button className="w-full transition-all duration-300 ease-in-out border-2 border-primary hover:bg-white hover:text-primary bg-primary px-3 py-1.5 text-white rounded-md">
                Send Message
              </button>
            </div>
          </div>
          <div>
            <p className="text-[12px] text-secondary font-medium">
              {/* // eslint-disable-next-line react/no-unescaped-entities */}
              By pressing Send Message, you agree that HomePortfolio and real estate professionals Real Estate Professionals includes the real estate agents and brokers, mortgage loan lenders and officers, property managers, and other professionals you interact with through HomePortfolio may contact you via email or phone/text about your inquiry. This may involve the use of automated means. You do not need to consent as a condition of buying any property, goods or services. Message/data rates may apply. You also agree to our <a href="" className="text-blue-600 visited:text-purple-600">Terms of Use</a> and <a href="" className="text-blue-600 visited:text-purple-600">Privacy Policy</a>. We may share your recent and future site activity with your agent to help them better understand what you are looking for in a home.
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
