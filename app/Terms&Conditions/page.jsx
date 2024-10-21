import React from 'react'

const dta = [
    {
      id: "1-account-creation-and-usage",
      title: "1. Account Creation and Usage",
      content: [
        "1.1. You must be at least 18 years old to use HomePortfolio and create an account.",
        "1.2. You are responsible for maintaining the confidentiality of your account credentials (username and password) and ensuring their proper use. Any activity on your account is your responsibility.",
        "1.3. You agree not to use HomePortfolio for any illegal or unauthorized purposes and to comply with all applicable laws and regulations."
      ]
    },
    {
      id: "2-service-usage",
      title: "2. Service Usage",
      content: [
        "2.1. HomePortfolio provides a web-based SaaS platform for [describe the core service(s) provided by HomePortfolio].",
        "2.2. You understand that your use of HomePortfolio may be subject to limitations, such as storage space, number of users, or other usage constraints.",
        "2.3. You agree not to interfere with the proper functioning of HomePortfolio or attempt to gain unauthorized access to any part of our platform.",
        "2.4. We reserve the right to modify, suspend, or discontinue any part of HomePortfolio without prior notice."
      ]
    },
    {
      id: "3-data-and-privacy",
      title: "3. Data and Privacy",
      content: [
        "3.1. We respect your privacy and handle your personal data in accordance with our Privacy Policy [link to the Privacy Policy].",
        "3.2. By using HomePortfolio, you grant us the right to collect and process data related to your usage of the platform.",
        "3.3. We may use aggregated and anonymized data for statistical and analytical purposes."
      ]
    },
    {
      id: "4-intellectual-property",
      title: "4. Intellectual Property",
      content: [
        "4.1. All content and materials provided on HomePortfolio, including but not limited to software, text, graphics, logos, images, and trademarks, are the property of HomePortfolio or its licensors.",
        "4.2. You may not copy, modify, distribute, or reproduce any part of HomePortfolio without our explicit written consent."
      ]
    },
    {
      id: "5-payment-and-subscription",
      title: "5. Payment and Subscription",
      content: [
        "5.1. HomePortfolio may require payment for certain services or features. By subscribing to our paid services, you agree to pay the fees associated with your chosen plan.",
        "5.2. Subscription fees are non-refundable unless otherwise stated in our Refund Policy [link to the Refund Policy].",
        "5.3. We reserve the right to modify our subscription fees, but any changes will be communicated to you in advance."
      ]
    },
    {
      id: "6-disclaimer-of-warranties",
      title: "6. Disclaimer of Warranties",
      content: [
        "6.1. HomePortfolio is provided “as is” without any warranties or guarantees, whether express or implied.",
        "6.2. We do not warrant that HomePortfolio will be error-free, secure, or uninterrupted."
      ]
    },
    {
      id: "7-limitation-of-liability",
      title: "7. Limitation of Liability",
      content: [
        "7.1. In no event shall HomePortfolio or its affiliates be liable for any direct, indirect, incidental, special, or consequential damages arising from the use or inability to use our platform."
      ]
    },
    {
      id: "8-termination",
      title: "8. Termination",
      content: [
        "8.1. You may terminate your account at any time by following the account closure process.",
        "8.2. HomePortfolio reserves the right to terminate or suspend your account for any violation of these Terms and Conditions."
      ]
    },
    {
      id: "9-governing-law",
      title: "9. Governing Law",
      content: [
        "9.1. These Terms and Conditions shall be governed by and construed in accordance with the laws of [Your Country/State], without regard to its conflict of laws principles."
      ]
    }
  ];
  
  export default function TermsAndConditions() {
    return (
      <div className="max-w-screen-xl mx-auto px-5 pb-10">
        <div className="mt-20 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold lg:tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-lg mt-4 text-slate-500 mx-auto max-w-xl">
            Last updated on 09 Aug 2023
          </p>
        </div>
  
        <div className="mx-auto prose mt-10 text-slate-600 text-lg">
          <p>
            Welcome to HomePortfolio! We’re excited to have you as a user of our
            Software-as-a-Service (SaaS) platform. Before you get started, please
            take a moment to read through our Terms and Conditions outlined below.
          </p>
          <p>
            By using our platform, you agree to be bound by these terms. If you do
            not agree with any part of these terms, please refrain from using
            HomePortfolio.
          </p>
  
          {dta.map((section) => (
            <div key={section.id} className="mt-8">
              <h2 id={section.id} className="text-3xl font-semibold">
                {section.title}
              </h2>
              {section.content.map((text, index) => (
                <p className='py-3 text-lg text-slate-500' key={index}>{text}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
  