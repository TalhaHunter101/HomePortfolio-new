import { useEffect, useState } from "react";
import { Input, CardBody, Slider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useCalculationsStore } from "../../../store/calculationsStore";

export default function ExpensesCard() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    propertyManagementFee,
    propertyManagementFeePercentage,
    serviceCharge,
    groundRent,
    insurance,
    utilities,
    utilitiesPercentage,
    maintenance,
    otherExpenses,
    setPropertyManagementFee,
    setPropertyManagementFeePercentage,
    setServiceCharge,
    setGroundRent,
    setInsurance,
    setUtilities,
    setUtilitiesPercentage,
    setMaintenance,
    setOtherExpenses,
    monthlyRevenue,
    totalExpenses,
    setTotalExpenses,
  } = useCalculationsStore();

  // Calculate property management fee based on percentage
  useEffect(() => {
    if (propertyManagementFeePercentage > 0 && monthlyRevenue > 0) {
      const newPropertyManagementFee = (propertyManagementFeePercentage / 100) * monthlyRevenue;
      if (newPropertyManagementFee !== propertyManagementFee) setPropertyManagementFee(newPropertyManagementFee);
    }
  }, [propertyManagementFeePercentage, monthlyRevenue, propertyManagementFee, setPropertyManagementFee]);

  // Calculate utilities based on percentage
  useEffect(() => {
    if (utilitiesPercentage > 0 && monthlyRevenue > 0) {
      const newUtilities = (utilitiesPercentage / 100) * monthlyRevenue;
      if (newUtilities !== utilities) setUtilities(newUtilities);
    }
  }, [utilitiesPercentage, monthlyRevenue, utilities, setUtilities]);

  // Calculate total expenses
  useEffect(() => {
    const newTotalExpenses = propertyManagementFee + serviceCharge + groundRent + insurance + utilities + maintenance + otherExpenses;
    if (newTotalExpenses !== totalExpenses) setTotalExpenses(newTotalExpenses);
  }, [propertyManagementFee, serviceCharge, groundRent, insurance, utilities, maintenance, otherExpenses, totalExpenses, setTotalExpenses]);

  return (
    <div className="mt-2">
  <button
    className="w-full flex justify-between items-center p-4 bg-purple-50 hover:bg-purple-100 shadow rounded-xl transition-colors"
    onClick={() => setIsOpen(!isOpen)}
  >
    <span className="text-md lg:text-xl font-bold text-purple-900">Expenses</span>

    <div className="flex items-center">
      <span className="text-md lg:text-xl font-bold text-purple-900 mr-2">
        £{totalExpenses.toLocaleString('en-GB')}/mo
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
          Property Management Fee
        </label>
        <Input
          type="text"
          value={propertyManagementFee.toLocaleString('en-GB')}
          startContent={
            <div className="pointer-events-none text-gray-400">£</div>
          }
          onChange={(e) => {
            const value = parseFloat(e.target.value.replace(/,/g, ''));
            if (!isNaN(value) && value !== propertyManagementFee)
              setPropertyManagementFee(value);
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-500 mb-1">
          Property Management Fee (%)
        </label>
        <Slider
          value={propertyManagementFeePercentage}
          onChange={(e) => setPropertyManagementFeePercentage(e)}
          min={0}
          max={100}
          step={1}
          endContent={
            <div className="pointer-events-none text-gray-400">
              {propertyManagementFeePercentage}%
            </div>
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-500 mb-1">
          Service Charge
        </label>
        <Input
          type="text"
          value={serviceCharge.toLocaleString('en-GB')}
          startContent={
            <div className="pointer-events-none text-gray-400">£</div>
          }
          onChange={(e) => {
            const value = parseFloat(e.target.value.replace(/,/g, ''));
            if (!isNaN(value) && value !== serviceCharge)
              setServiceCharge(value);
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-500 mb-1">
          Ground Rent
        </label>
        <Input
          type="text"
          value={groundRent.toLocaleString('en-GB')}
          startContent={
            <div className="pointer-events-none text-gray-400">£</div>
          }
          onChange={(e) => {
            const value = parseFloat(e.target.value.replace(/,/g, ''));
            if (!isNaN(value) && value !== groundRent) setGroundRent(value);
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-500 mb-1">
          Insurance
        </label>
        <Input
          type="text"
          value={insurance.toLocaleString('en-GB')}
          startContent={
            <div className="pointer-events-none text-gray-400">£</div>
          }
          onChange={(e) => {
            const value = parseFloat(e.target.value.replace(/,/g, ''));
            if (!isNaN(value) && value !== insurance) setInsurance(value);
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-500 mb-1">
          Utilities
        </label>
        <Input
          type="text"
          value={utilities.toLocaleString('en-GB')}
          startContent={
            <div className="pointer-events-none text-gray-400">£</div>
          }
          className="flex-grow"
          onChange={(e) => {
            const value = parseFloat(e.target.value.replace(/,/g, ''));
            if (!isNaN(value) && value !== utilities) setUtilities(value);
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-500 mb-1">
          Utilities (%)
        </label>
        <Slider
          value={utilitiesPercentage}
          onChange={(e) => setUtilitiesPercentage(e)}
          min={0}
          max={100}
          step={1}
          className="flex-grow"
          endContent={
            <div className="pointer-events-none text-gray-400">
              {utilitiesPercentage}%
            </div>
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-500 mb-1">
          Maintenance
        </label>
        <Input
          type="text"
          value={maintenance.toLocaleString('en-GB')}
          startContent={
            <div className="pointer-events-none text-gray-400">£</div>
          }
          onChange={(e) => {
            const value = parseFloat(e.target.value.replace(/,/g, ''));
            if (!isNaN(value) && value !== maintenance) setMaintenance(value);
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-500 mb-1">
          Other Expenses
        </label>
        <Input
          type="text"
          value={otherExpenses.toLocaleString('en-GB')}
          startContent={
            <div className="pointer-events-none text-gray-400">£</div>
          }
          className="flex-grow"
          onChange={(e) => {
            const value = parseFloat(e.target.value.replace(/,/g, ''));
            if (!isNaN(value) && value !== otherExpenses)
              setOtherExpenses(value);
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-500 mb-1">
          Other Expenses (%)
        </label>
        <Slider
          value={0} // Assuming other expenses percentage is not used
          onChange={() => {}}
          min={0}
          max={100}
          step={1}
          className="flex-grow"
          endContent={
            <div className="pointer-events-none text-gray-400">%</div>
          }
        />
      </div>
    </div>
  </div>
</div>

  );
}