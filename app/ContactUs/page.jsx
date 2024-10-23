'use client';
import { Input, Textarea, Button, Card } from '@nextui-org/react';
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // FormSubmit endpoint for sending form data
    const response = await fetch('https://formsubmit.co/fariq4949@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.text(); 
    setLoading(false);

    if (response.ok) {
      setResultMessage('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } else {
      setResultMessage('Something went wrong. Please try again.');
    }

    setTimeout(() => {
      setResultMessage('');
    }, 5000);
  };

  return (
    <div className="max-w-4xl mx-auto px-5 mt-20">
      <div className="text-center mt-16">
        <h1 className="text-4xl lg:text-5xl font-bold">Contact</h1>
        <p className="text-lg mt-4 text-gray-500 max-w-xl mx-auto">Got Questions? We are here to help.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-10 mt-16">
        <div>
          <h2 className="text-2xl font-medium text-gray-800">Contact Us</h2>
          <p className="text-lg text-gray-500 mt-3">
            Have something to say? We are here to help. Fill up the form or send an email or call.
          </p>
          <div className="mt-5 space-y-3">
            <div className="flex items-center space-x-2 text-gray-600">
              {/* Address information */}
              <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                {/* SVG path here */}
              </svg>
              <span>1734 San Francisco, CA 93063</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              {/* Email information */}
              <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                {/* SVG path here */}
              </svg>
              <a href="mailto:hello@astroship-pro.com">hello@astroship-pro.com</a>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              {/* Phone information */}
              <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                {/* SVG path here */}
              </svg>
              <a href="tel:+19874587899">+1 (987) 4587 899</a>
            </div>
          </div>
        </div>
        <Card className="bg-gray-50 p-5 md:p-8 rounded-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              clearable
             
              variant='bordered'
            
              size="lg"
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              clearable
             
              variant='bordered'
              color="primary"
              size="lg"
              placeholder="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Textarea
             variant='bordered'
              color="secondary"
              placeholder="Your Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <Button type="submit" color="primary" className="w-full" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </Button>
            {resultMessage && <p className="text-center text-lg mt-3">{resultMessage}</p>}
          </form>
        </Card>
      </div>
    </div>
  );
}
