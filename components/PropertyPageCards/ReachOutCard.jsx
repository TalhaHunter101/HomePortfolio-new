'use client';
import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Image, Link } from "@nextui-org/react";
import { Icon } from '@iconify/react';
import toast, { Toaster } from 'react-hot-toast';

export function ReachOutCard({data}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I am interested in ${data?.address}.`
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/samos@homeportfolio.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        toast.success('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      setLoading(false);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Card className="m-4" style={{ minHeight: '150px' }}>
      <CardHeader>
  <div className="flex items-center my-2 w-full">
    {/* Left side content (Icon and Heading) */}
    <div className="flex items-center">
      <div className="flex items-center justify-center w-8 h-8 bg-purple-200 rounded-full mr-2">
        <Icon
          icon="solar:chat-round-call-outline"
          width={16}
          className="text-purple-700"
        />
      </div>
      <h2 className="text-xl font-bold text-gray-700">Want to reach out?</h2>
    </div>

    {/* Spacer to push the button to the right */}
    <div className="flex-grow"></div>

    {/* Right side button */}
    <button className="font-medium px-4 py-2 bg-purple-100 text-default-600 rounded-md focus:outline-none">
     <li>House For Sale</li> 
    </button>
  </div>
</CardHeader>


        <CardBody>
          <div className="p-5 bg-white rounded-md">
            <div>
              {/* {
                JSON.stringify(data?.branch)
              }
               */}
              <p className="text-base font-bold mb-3">Reach out to us</p>
              <p className="text-base font-medium">
                Ask a question about {data?.address}, and HomePortfolio will get back to you within 24 hours.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-4 my-4">
              <div className="col-span-6 md:col-span-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mb-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mb-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mb-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="col-span-6 md:col-span-3">
                <textarea
                  rows="4"
                  name="message"
                  placeholder={` I am interested in ${data?.address}. Please contact me.`}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                ></textarea>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 transition-all duration-300 ease-in-out border-2 border-primary hover:bg-white hover:text-primary bg-primary px-3 py-1.5 text-white rounded-md"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
            <div>
              <p className="text-xs text-secondary">
                By pressing Send Message, you agree that HomePortfolio and real estate professionals may contact you via email or phone/text about your inquiry. This may involve the use of automated means. You do not need to consent as a condition of buying any property, goods, or services. Message/data rates may apply. You also agree to our{' '}
                <a href="#" className="text-blue-600 visited:text-purple-600">
                  Terms of Use
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 visited:text-purple-600">
                  Privacy Policy
                </a>
                . We may share your recent and future site activity with your agent to help them better understand what you are looking for in a home.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
   
    </>
  );
}
