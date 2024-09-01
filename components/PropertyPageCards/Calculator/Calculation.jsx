import { useState, useMemo } from "react";
import { Card, CardBody } from "@nextui-org/react";
import InvestorReturnCal from "./InvestorReturnCal";
import TotalInvestmentCard from "./TotalInvestmentCard";
import FinancingCard from "./FinancingCard";
import RevenueCard from "./RevenueCard";
import ExpensesCard from "./ExpensesCard";
import FinancialSummary from "./FinancialSummary";

function Calculation({ title, propertyPrice }) {
  // Manage all relevant states here
  const [purchasePrice, setPurchasePrice] = useState(propertyPrice);
  const [closingCostsPercentage, setClosingCostsPercentage] = useState(2.75);
  const [refurbCost, setRefurbCost] = useState(5000);
  const [fees, setFees] = useState(2000);
  const [furnishingCost, setFurnishingCost] = useState(0);
  const [otherExpenses, setOtherExpenses] = useState(0);

  const [ltv, setLtv] = useState(555000); // Loan-to-Value
  const [deposit, setDeposit] = useState(555000);
  const [loanAmount, setLoanAmount] = useState(2220000);
  const [mortgageRate, setMortgageRate] = useState(7.25);
  const [mortgageFees, setMortgageFees] = useState(1.5);
  const [mortgageTerm, setMortgageTerm] = useState(30);
  const [monthlyRevenue, setMonthlyRevenue] = useState(38447);
  const [annualRevenue, setAnnualRevenue] = useState(461360);

  const [channelFee, setChannelFee] = useState(3.00);
  const [propertyManagementFee, setPropertyManagementFee] = useState(230);
  const [supplyFees, setSupplyFees] = useState(0);
  const [groundRent, setGroundRent] = useState(2166);
  const [insurance, setInsurance] = useState(800);
  const [utilities, setUtilities] = useState(1538);
  const [maintenance, setMaintenance] = useState(1153);
  const [otherExp, setOtherExp] = useState(0);

  // Calculate Stamp Duty
  const stampDuty = useMemo(() => {
    if (purchasePrice < 40000) {
      return 0;
    } else if (purchasePrice < 250000) {
      return purchasePrice * 0.03;
    } else if (purchasePrice < 925000) {
      return ((purchasePrice - 250000) * 0.08) + 7500;
    } else if (purchasePrice < 1500000) {
      return ((purchasePrice - 925000) * 0.13) + 61500;
    } else {
      return ((purchasePrice - 1500000) * 0.15) + 136250;
    }
  }, [purchasePrice]);

  // Calculate Total Investment
  const totalInvestment = useMemo(() => {
    const closingCosts = (purchasePrice * closingCostsPercentage) / 100;
    return purchasePrice + stampDuty + refurbCost + fees + furnishingCost + otherExpenses + closingCosts;
  }, [purchasePrice, stampDuty, refurbCost, fees, furnishingCost, otherExpenses, closingCostsPercentage]);

  // Calculate Total Expenses
  const totalExpenses = useMemo(() => {
    return (
      channelFee +
      propertyManagementFee +
      supplyFees +
      groundRent +
      insurance +
      utilities +
      maintenance +
      otherExp
    );
  }, [channelFee, propertyManagementFee, supplyFees, groundRent, insurance, utilities, maintenance, otherExp]);

  return (
    <Card className="m-4" style={{ minHeight: "400px", minWidth: "800px" }}>
      <CardBody>
        <div className="border border-gray-200 bg-default-white rounded-lg p-2">
          <InvestorReturnCal propertyPrice={purchasePrice} />
          <TotalInvestmentCard 
            purchasePrice={purchasePrice}
            closingCostsPercentage={closingCostsPercentage}
            refurbCost={refurbCost}
            fees={fees}
            furnishingCost={furnishingCost}
            otherExpenses={otherExpenses}
            setPurchasePrice={setPurchasePrice}
            setClosingCostsPercentage={setClosingCostsPercentage}
            setRefurbCost={setRefurbCost}
            setFees={setFees}
            setFurnishingCost={setFurnishingCost}
            setOtherExpenses={setOtherExpenses}
            totalInvestment={totalInvestment}
            stampDuty={stampDuty}
          />
          <FinancingCard 
            ltv={ltv}
            deposit={deposit}
            loanAmount={loanAmount}
            mortgageRate={mortgageRate}
            mortgageFees={mortgageFees}
            mortgageTerm={mortgageTerm}
            setLtv={setLtv}
            setDeposit={setDeposit}
            setLoanAmount={setLoanAmount}
            setMortgageRate={setMortgageRate}
            setMortgageFees={setMortgageFees}
            setMortgageTerm={setMortgageTerm}
          />
          <RevenueCard 
            monthlyRevenue={monthlyRevenue}
            annualRevenue={annualRevenue}
            setMonthlyRevenue={setMonthlyRevenue}
            setAnnualRevenue={setAnnualRevenue}
          />
          <ExpensesCard 
            channelFee={channelFee}
            propertyManagementFee={propertyManagementFee}
            supplyFees={supplyFees}
            groundRent={groundRent}
            insurance={insurance}
            utilities={utilities}
            maintenance={maintenance}
            otherExpenses={otherExp}
            setChannelFee={setChannelFee}
            setPropertyManagementFee={setPropertyManagementFee}
            setSupplyFees={setSupplyFees}
            setGroundRent={setGroundRent}
            setInsurance={setInsurance}
            setUtilities={setUtilities}
            setMaintenance={setMaintenance}
            setOtherExp={setOtherExp}
          />
          <FinancialSummary 
            totalInvestment={totalInvestment}
            monthlyRevenue={monthlyRevenue}
            annualRevenue={annualRevenue}
            ltv={ltv}
            loanAmount={loanAmount}
            mortgageRate={mortgageRate}
            expenses={totalExpenses}
          />
        </div>
      </CardBody>
    </Card>
  );
}


export default Calculation;
