import React from "react";
const dta = [
    {
      id: "1-information-we-collect",
      title: "1. Information We Collect",
      content: [
        "1.1. Personal Information: When you create an account or use certain features of HomePortfolio, we may collect personal information such as your name, email address, and other contact details.",
        "1.2. Usage Data: We may collect data about how you use HomePortfolio, including your interactions with the platform and the features you access.",
        "1.3. Cookies and Similar Technologies: HomePortfolio may use cookies and similar tracking technologies to enhance your experience and gather information about your usage patterns."
      ]
    },
    {
      id: "2-how-we-use-your-information",
      title: "2. How We Use Your Information",
      content: [
        "2.1. We use the information collected to provide, maintain, and improve HomePortfolio’s services and user experience.",
        "2.2. Your personal information may be used to communicate with you regarding important updates, announcements, or other relevant information.",
        "2.3. We may use aggregated and anonymized data for analytical and statistical purposes."
      ]
    },
    {
      id: "3-data-sharing-and-disclosure",
      title: "3. Data Sharing and Disclosure",
      content: [
        "3.1. HomePortfolio will not sell, rent, or lease your personal information to third parties.",
        "3.2. We may share your information with trusted service providers who assist us in operating and maintaining HomePortfolio, but they will be bound by confidentiality obligations.",
        "3.3. We may disclose your information if required by law or when we believe such action is necessary to protect our rights or comply with legal proceedings."
      ]
    },
    {
      id: "4-data-security",
      title: "4. Data Security",
      content: [
        "4.1. HomePortfolio implements industry-standard security measures to protect your personal information from unauthorized access, loss, misuse, or alteration.",
        "4.2. While we take reasonable precautions, no method of data transmission over the internet or electronic storage is entirely secure. Therefore, we cannot guarantee absolute security."
      ]
    },
    {
      id: "5-third-party-links",
      title: "5. Third-Party Links",
      content: [
        "5.1. HomePortfolio may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these websites. Please review their privacy policies before using them."
      ]
    },
    {
      id: "6-childrens-privacy",
      title: "6. Children’s Privacy",
      content: [
        "6.1. HomePortfolio is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us to delete it."
      ]
    },
    {
      id: "7-changes-to-this-privacy-policy",
      title: "7. Changes to this Privacy Policy",
      content: [
        "7.1. We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the “Last updated” date will be revised accordingly."
      ]
    },
    {
      id: "8-contact-us",
      title: "8. Contact Us",
      content: [
        "8.1. If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at [your contact email]."
      ]
    }
  ];
  
  export default function PrivacyPolicy() {
    return (
      <div className="max-w-screen-xl mx-auto px-5 pb-10">
        <div className="mt-20 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold lg:tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-lg mt-4 text-slate-500 mx-auto max-w-xl">
            Last updated on 09 Aug 2023
          </p>
        </div>
  
        <div className="mx-auto prose mt-10">
          <p>
            At HomePortfolio, we value your privacy and are committed to protecting
            your personal information. This Privacy Policy outlines how we
            collect, use, and safeguard your data when you use our
            Software-as-a-Service (SaaS) platform.
          </p>
          <p>
            By using HomePortfolio, you consent to the practices described in this
            Privacy Policy. If you do not agree with any part of this policy,
            please refrain from using HomePortfolio.
          </p>
  
          {dta.map((section) => (
            <div key={section.id} className="mt-8">
              <h2 id={section.id} className="text-3xl font-semibold pb-6">
                {section.title}
              </h2>
              {section.content.map((text, index) => (
                <p className="py-3 text-lg text-slate-500" key={index}>{text}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
  