"use client";

import React from "react";
import { Divider, Link } from "@nextui-org/react";
import { Icon } from "@iconify/react";

import { AcmeIcon } from "./acme";

const footerNavigation = {
  services: [
    { name: "Branding", href: "#" },
    { name: "Data Analysis", href: "#" },
    { name: "E-commerce Solutions", href: "#" },
    { name: "Market Research", href: "#" },
  ],

  Platform: [
    { name: "Search Listings", href: "/" },
    // { name: "Search Schools", href: "#" },
    // { name: "Sold Prices", href: "#" },
    // { name: "My HomePortfolio", href: "#" },
    {
      name: "Home Valuation",
      href: "/home-valuation",
    },
    {
      name: "rankings",
      href: "/ranking",
    },{
      name: "Neighbourhood Guide",
      href: "/neighbourhood-guide"
    }
  ],

  Resources: [
    { name: "Home Buying Guides", href: "#" },
    { name: "Neighborhood Guides", href: "#" },
    { name: "Property Market Analysis", href: "#" },
    { name: "Property Valuation", href: "#" },
    { name: "Property Data API", href: "#" },
  ],

  Company: [
    { name: "About Us", href: "/AboutUs" },
    { name: "Our Blog", href: "#" },
    { name: "Contact Us", href: "/ContactUs" },
    { name: "Privacy Policy", href: "/PrivacyPolicy" },
    { name: "Terms & Conditions", href: "/Terms&Conditions" },
    
  ],

  social: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/homeportfoliohq/",
      icon: (props) => <Icon {...props} icon="fontisto:facebook" />,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/homeportfolio_/",
      icon: (props) => <Icon {...props} icon="fontisto:instagram" />,
    },
    {
      name: "Twitter",
      href: "https://www.twitter.com/home_portfolio",
      icon: (props) => <Icon {...props} icon="fontisto:twitter" />,
    },
    {
      name: "Youtube",
      href: "https://www.youtube.com/@home_portfolio",
      icon: (props) => <Icon {...props} icon="mingcute:youtube-fill" width={20} height={24} />,
    },
    {
      name: "Pinterest",
      href: "https://www.pinterest.com/home_portfolio/",
      icon: (props) => <Icon {...props} icon="mdi:pinterest" width={20} height={24} />,
    }

 
  ],
};

export default function Footer() {
  const renderList = React.useCallback(
    ({ title, items }) => (
      <div>
        <p className="text-small font-semibold text-default-600">{title}</p>
        <ul className="mt-6 space-y-4">
          {items?.map((item) => (
            <li key={item.name}>
              <Link className="text-default-400" href={item.href} size="sm">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ),
    []
  );

  return (
    <footer className="flex w-screen flex-col">
      <div className="px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 md:pr-8">
            <div className="flex items-center justify-start">
              {/* <AcmeIcon size={44} /> */}
              {/* <span className="text-medium font-medium">HomePortfolio</span> */}
              <img src="/HpLogo.jpeg" alt="logo" className="h-12 w-32 object-contain" />

            </div>
            <p className="text-sm text-default-500">
              We provide comprehensive database and in-depth analysis for every UK new residential property, neighbourhood, town, city and school - in one platform - for free
            </p>
            <div className="flex space-x-6">
              {footerNavigation.social.map((item) => (
                <Link key={item.name} isExternal className="text-default-400" href={item.href}>
                  <span className="sr-only">{item.name}</span>
                  <item.icon aria-hidden="true" className="w-6" />
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-16 lg:ml-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:col-span-2 xl:mt-0">
  {/* Platform Section */}
  <div>
    {renderList({ title: "Platform", items: footerNavigation.Platform })}
  </div>

  {/* Resources Section */}
  <div>
    {renderList({ title: "Resources", items: footerNavigation.Resources })}
  </div>

  {/* Company Section */}
  <div>
    {renderList({ title: "Company", items: footerNavigation.Company })}
  </div>
</div>


        </div>
        <Divider className="mt-16 sm:mt-20 lg:mt-24" />
        <div className="flex flex-wrap justify-between gap-2 pt-8">
          <p className="text-small text-default-400">&copy; 2024 HomePortfolio All rights reserved.</p>
          {/* <ThemeSwitch /> */}
        </div>
      </div>
    </footer>
  );
}
