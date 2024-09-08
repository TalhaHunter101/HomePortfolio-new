import { useState, useEffect } from "react";
import InvestorReturnCal from "./InvestorReturnCal";
import TotalInvestmentCard from "./TotalInvestmentCard";
import FinancingCard from "./FinancingCard";
import RevenueCard from "./RevenueCard";
import ExpensesCard from "./ExpensesCard";
import FinancialSummary from "./FinancialSummary";
import { useCalculationsStore } from "../../../store/calculationsStore";
import { Card, CardBody } from "@nextui-org/react";

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