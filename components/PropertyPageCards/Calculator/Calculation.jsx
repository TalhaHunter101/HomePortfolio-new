import { useState, useEffect } from "react";
import InvestorReturnCal from "./InvestorReturnCal";
import TotalInvestmentCard from "./TotalInvestmentCard";
import FinancingCard from "./FinancingCard";
import RevenueCard from "./RevenueCard";
import ExpensesCard from "./ExpensesCard";
import FinancialSummary from "./FinancialSummary";
import { useCalculationsStore } from "../../../store/calculationsStore";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Icon } from "@iconify/react";

function Calculation({ title, propertyPrice, rentEstimate }) {
  const {
    purchasePrice,
    setPurchasePrice,
    closingCostPercentage,
    setClosingCostPercentage,
    closingCost,
    setClosingCost,
    refurbishmentCost,
    setRefurbishmentCost,
    furnishingsCost,
    setFurnishingsCost,
    otherInitialCost,
    setOtherInitialCost,
    totalInvestment,
    setTotalInvestment,
    ltv,
    setLtv,
    deposit,
    setDeposit,
    loanAmount,
    setLoanAmount,
    interestRate,
    setInterestRate,
    mortgageFees,
    setMortgageFees,
    mortgageTerm,
    setMortgageTerm,
    monthlyPayment,
    setMonthlyPayment,
    monthlyRevenue,
    setMonthlyRevenue,
    annualRevenue,
    setAnnualRevenue,
    propertyManagementFee,
    setPropertyManagementFee,
    propertyManagementFeePercentage,
    setPropertyManagementFeePercentage,
    serviceCharge,
    setServiceCharge,
    groundRent,
    setGroundRent,
    insurance,
    setInsurance,
    utilities,
    setUtilities,
    maintenance,
    setMaintenance,
    otherExpenses,
    setOtherExpenses,
    setProjectedMonthlyRevenue,
  } = useCalculationsStore();

  useEffect(() => {
    setPurchasePrice(propertyPrice);
    setMonthlyRevenue(rentEstimate);
    setProjectedMonthlyRevenue(rentEstimate);
  }, [propertyPrice, rentEstimate]);

  return (
    <Card className="m-4">
      <CardHeader>
      <div className="flex items-center my-2">
    <div className="flex items-center justify-center w-8 h-8 aspect-square bg-green-400 rounded-full mr-2">
      <Icon
        icon="solar:calculator-minimalistic-bold"
        width={20} // Adjust the icon size to fit well within the circle
        className="text-green-900" // Adjust the icon color if needed
      />
    </div>
    <h2 className="text-xl font-bold text-gray-700">What are the investment potential returns for this property?</h2>
  </div>
      </CardHeader>
      <CardBody>



      <InvestorReturnCal propertyPrice={purchasePrice} />
      <TotalInvestmentCard />
      <FinancingCard />
      <RevenueCard />
      <ExpensesCard />
      <FinancialSummary />
      </CardBody>

    </Card>
  );
}

export default Calculation;