import { useState, useEffect } from "react";
import InvestorReturnCal from "./InvestorReturnCal";
import TotalInvestmentCard from "./TotalInvestmentCard";
import FinancingCard from "./FinancingCard";
import RevenueCard from "./RevenueCard";
import ExpensesCard from "./ExpensesCard";
import FinancialSummary from "./FinancialSummary";
import { useCalculationsStore } from "../../../store/calculationsStore";

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
    <div className="border border-gray-200 bg-default-white rounded-lg p-2">
      <InvestorReturnCal propertyPrice={purchasePrice} />
      <TotalInvestmentCard />
      <FinancingCard />
      <RevenueCard />
      <ExpensesCard />
      <FinancialSummary />
    </div>
  );
}

export default Calculation;