import { useEffect, useState } from "react";
import { Input, CardBody } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useCalculationsStore } from "../../../store/calculationsStore";

export default function RevenueCard() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    monthlyRevenue,
    setMonthlyRevenue,
    annualRevenue,
    setAnnualRevenue,
    ProjectedMonthlyRevenue,
  } = useCalculationsStore();

  // Calculate annual revenue based on monthly revenue
  useEffect(() => {
    if (monthlyRevenue > 0) {
      const newAnnualRevenue = monthlyRevenue * 12;
      if (newAnnualRevenue !== annualRevenue) {
        setAnnualRevenue(newAnnualRevenue);
      }
      if (newAnnualRevenue !== annualRevenue) setAnnualRevenue?.(newAnnualRevenue);
    }
  }, [monthlyRevenue, annualRevenue, setAnnualRevenue]);

  // Calculate monthly revenue based on annual revenue
  useEffect(() => {
    if (annualRevenue > 0) {
      const newMonthlyRevenue = annualRevenue / 12;
      if (newMonthlyRevenue !== monthlyRevenue) setMonthlyRevenue?.(newMonthlyRevenue);
    }
  }, [annualRevenue, monthlyRevenue, setMonthlyRevenue]);

  return (
    <div className="mt-2">
      <button
        className="w-full flex justify-between items-center p-4 bg-purple-50 hover:bg-purple-100 shadow rounded-xl transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-md lg:text-xl font-bold text-purple-900">Revenue</span>
        <div className="flex items-center">
          <span className="text-md lg:text-xl font-bold text-purple-900 mr-2">
            £{monthlyRevenue?.toLocaleString('en-GB')}/mo
          </span>
          <Icon
            icon="mdi:chevron-down"
            className={`w-6 h-6 text-purple-900 transition-transform duration-300 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Monthly Revenue
            </label>
            <Input
              type="text"
              value={monthlyRevenue?.toLocaleString('en-GB') || ''}
              onChange={(e) => {
                const value = parseFloat(e.target.value.replace(/,/g, ''));
                if (!isNaN(value) && value !== monthlyRevenue) {
                  setMonthlyRevenue?.(value);
                  setAnnualRevenue?.(value * 12); // Automatically update annual revenue
                }
              }}
              startContent={
                <div className="pointer-events-none text-gray-400">£</div>
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Annual Revenue
            </label>
            <Input
              type="text"
              value={annualRevenue?.toLocaleString('en-GB') || ''}
              onChange={(e) => {
                const value = parseFloat(e.target.value.replace(/,/g, ''));
                if (!isNaN(value) && value !== annualRevenue) {
                  setAnnualRevenue?.(value);
                  setMonthlyRevenue?.(value / 12); // Automatically update monthly revenue
                }
              }}
              startContent={
                <div className="pointer-events-none text-gray-400">£</div>
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Projected Monthly Rent
            </label>
            <Input
              type="text"
              disabled
              value={ProjectedMonthlyRevenue?.toLocaleString('en-GB') || ''}
              defaultValue={ProjectedMonthlyRevenue?.toLocaleString('en-GB') || ''}
              startContent={
                <div className="pointer-events-none text-gray-400">£</div>
              }
            />
            <p className="text-xs text-gray-500 mt-1">
              {ProjectedMonthlyRevenue} is the projected monthly rent estimate based
              on comparables for this specific property, according to our valuation
              tool.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
