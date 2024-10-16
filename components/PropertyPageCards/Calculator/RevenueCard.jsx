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
    }
  }, [monthlyRevenue, annualRevenue, setAnnualRevenue]);

  // Calculate monthly revenue based on annual revenue
  useEffect(() => {
    if (annualRevenue > 0) {
      const newMonthlyRevenue = annualRevenue / 12;
      if (newMonthlyRevenue !== monthlyRevenue) {
        setMonthlyRevenue(newMonthlyRevenue);
      }
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
          <Icon icon="solar:calculator-minimalistic-bold" width={20} className="text-purple-900" />
        </div>
      </button>
      {isOpen && (
        <CardBody>
          <Input
            label="Monthly Revenue"
            value={monthlyRevenue}
            onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
          />
          <Input
            label="Annual Revenue"
            value={annualRevenue}
            onChange={(e) => setAnnualRevenue(Number(e.target.value))}
          />
        </CardBody>
      )}
    </div>
  );
}