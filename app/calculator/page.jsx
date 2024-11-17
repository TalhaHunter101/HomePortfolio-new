import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Link from "next/link";

function CalculatorHome() {
  return (
    <div
      className="h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `url('/DALL·E 2024-11-16 19.16.27 - A modern, abstract background image with a focus on vibrant and clear shades of purple. The design features a smooth gradient from dark purple to ligh.webp')`,
      }}
    >
      <div className="mt-20 max-w-7xl mx-auto p-8 space-y-12">
        <div className="grid gap-12 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {/* Rental Property Calculator Card */}
          <Card className="p-6 bg-white/80 shadow-lg backdrop-blur-md">
            <CardHeader className="flex items-start gap-4 mb-4">
              <Icon icon="mdi:home-outline" className="flex-shrink-0 h-10 w-10 text-blue-500" />
              <div className="flex-1">
                <p className="text-2xl font-bold leading-snug">Rental Property Calculator</p>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <Icon icon="mdi:check-circle-outline" className="flex-shrink-0 h-8 w-8 text-green-500" />
                  <p className="text-base leading-normal">
                    Determine the profitability potential of single-family, multi-family, or commercial property.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <Icon icon="mdi:check-circle-outline" className="flex-shrink-0 h-8 w-8 text-green-500" />
                  <p className="text-base leading-normal">Analyze cash flow, ROI, and more.</p>
                </li>
                <li className="flex items-start gap-4">
                  <Icon icon="mdi:check-circle-outline" className="flex-shrink-0 h-8 w-8 text-green-500" />
                  <p className="text-base leading-normal">
                    Create printable reports perfect for showing lenders, partners, or investors (Pro Members).
                  </p>
                </li>
              </ul>
            </CardBody>
            <CardFooter className="flex flex-col space-y-3">
              <Button color="primary" className="w-full">
                Use Calculator
              </Button>
              <Button variant="bordered" color="primary" className="w-full">
                View my previous reports
              </Button>
            </CardFooter>
          </Card>

          {/* BRRR Calculator Card */}
          <Card className="p-6 bg-white/80 shadow-lg backdrop-blur-md">
            <CardHeader className="flex items-start gap-4 mb-4">
              <Icon icon="ri:exchange-dollar-line" className="flex-shrink-0 h-10 w-10 text-blue-500" />
              <div className="flex-1">
                <p className="text-2xl font-bold leading-snug">BRRR Calculator</p>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <Icon icon="mdi:check-circle-outline" className="flex-shrink-0 h-8 w-8 text-green-500" />
                  <p className="text-base leading-normal">
                    Get accurate ROI analysis on rehab properties with detailed calculations.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <Icon icon="mdi:check-circle-outline" className="flex-shrink-0 h-8 w-8 text-green-500" />
                  <p className="text-base leading-normal">Estimate cash flow and plan for unforeseen expenses.</p>
                </li>
                <li className="flex items-start gap-4">
                  <Icon icon="mdi:check-circle-outline" className="flex-shrink-0 h-8 w-8 text-green-500" />
                  <p className="text-base leading-normal">
                    Create printable reports perfect for showing lenders, partners, or investors (Pro Members).
                  </p>
                </li>
              </ul>
            </CardBody>
            <CardFooter className="flex flex-col space-y-3">
              <Link className="w-full" href="/calculator/brrr" passHref>
                <Button color="primary" className="w-full">
                  Use Calculator
                </Button>
              </Link>
              <Button variant="bordered" color="primary" className="w-full">
                View my previous reports
              </Button>
            </CardFooter>
          </Card>

          {/* Fix and Flip Calculator Card */}
          <Card className="p-6 bg-white/80 shadow-lg backdrop-blur-md">
            <CardHeader className="flex items-start gap-4 mb-4">
              <Icon icon="mdi:hammer-wrench" className="flex-shrink-0 h-10 w-10 text-blue-500" />
              <div className="flex-1">
                <p className="text-2xl font-bold leading-snug">Fix and Flip Calculator</p>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <Icon icon="mdi:check-circle-outline" className="flex-shrink-0 h-8 w-8 text-green-500" />
                  <p className="text-base leading-normal">
                    Calculate your potential profit on a fix and flip property before investing.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <Icon icon="mdi:check-circle-outline" className="flex-shrink-0 h-8 w-8 text-green-500" />
                  <p className="text-base leading-normal">
                    Analyze holding costs and calculate profit over a 30-, 90-, and 270-day period.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <Icon icon="mdi:check-circle-outline" className="flex-shrink-0 h-8 w-8 text-green-500" />
                  <p className="text-base leading-normal">
                    Create printable reports perfect for showing lenders, partners, or investors (Pro Members).
                  </p>
                </li>
              </ul>
            </CardBody>
            <CardFooter className="flex flex-col space-y-3">
              <Button color="primary" className="w-full">
                Use Calculator
              </Button>
              <Button variant="bordered" color="primary" className="w-full">
                View my previous reports
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CalculatorHome;
