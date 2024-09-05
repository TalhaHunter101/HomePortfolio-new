import { useState, useMemo, useEffect } from "react";
import { Card, CardBody } from "@nextui-org/react";
import InvestorReturnCal from "./InvestorReturnCal";
import TotalInvestmentCard from "./TotalInvestmentCard";
import FinancingCard from "./FinancingCard";
import RevenueCard from "./RevenueCard";
import ExpensesCard from "./ExpensesCard";
import FinancialSummary from "./FinancialSummary";

function Calculation({ title, propertyPrice, rentEstimate }) {
  // Manage all relevant states here
  const [purchasePrice, setPurchasePrice] = useState(propertyPrice);
  const [closingCostsPercentage, setClosingCostsPercentage] = useState(0);
  const [closingCosts, setClosingCosts] = useState(5000);
  const [refurbCost, setRefurbCost] = useState(5000);
  const [fees, setFees] = useState(0);
  const [furnishingCost, setFurnishingCost] = useState(0);
  const [otherExpenses, setOtherExpenses] = useState(0);

  const [totalInvestment, setTotalInvestment] = useState(0);

  const [ltv, setLtv] = useState(75); // Loan-to-Value
  const [deposit, setDeposit] = useState(555000);
  const [loanAmount, setLoanAmount] = useState(2220000);
  const [mortgageRate, setMortgageRate] = useState(5);
  const [mortgageFees, setMortgageFees] = useState(1.5);
  const [mortgageTerm, setMortgageTerm] = useState(5);
  const [monthlyMortgagePayment, setMonthlyMortgagePayment] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(38447);
  const [annualRevenue, setAnnualRevenue] = useState(461360);

  const [channelFee, setChannelFee] = useState(3.00);
  const [propertyManagementFee, setPropertyManagementFee] = useState(0);
  const [propertyManagementFeePercentage, setPropertyManagementFeePercentage] = useState(0);
  const [supplyFees, setSupplyFees] = useState(0);
  const [groundRent, setGroundRent] = useState(2166);
  const [insurance, setInsurance] = useState(800);
  const [utilities, setUtilities] = useState(1538);
  const [maintenance, setMaintenance] = useState(1153);
  const [otherExp, setOtherExp] = useState(0);
  const [stampDuty, setStampDuty] = useState(0);

  const [interestType, setInterestType] = useState("capital_Interest");
  const [financingMethod, setFinancingMethod] = useState("mortgage");


  // Calculate Stamp Duty
  // const stampDuty = useMemo(() => {
 
  // }, [purchasePrice]);
  //275000 * 0.05 = 13750


  function calculateStampDuty(amount) {
    if (amount < 40000) {
        return amount * 0;  // 0% for amounts less than 40,000
    } else if (amount < 250000) {
        return amount * 0.03;  // 3% for amounts between 40,000 and 249,999
    } else if (amount < 925000) {
        return ((amount - 250000) * 0.08) + 7500;  // 8% for amounts between 250,000 and 924,999
    } else if (amount < 1500000) {
        return ((amount - 925000) * 0.13) + 61500;  // 13% for amounts between 925,000 and 1,499,999
    } else {
        return ((amount - 1500000) * 0.15) + 136250;  // 15% for amounts 1,500,000 and above
    }
}


  useEffect(() => {
  let duty =  calculateStampDuty(purchasePrice);
  setStampDuty(duty);
// round to the 2 decimal places
  let closingCostsPercentage = Math.round((closingCosts / purchasePrice) * 100 * 100) / 100;
  setClosingCostsPercentage(closingCostsPercentage);


  }, [propertyPrice, closingCosts, purchasePrice]);



  // Calculate Total Investment
    useEffect(() => {
      // Convert all values to numbers
      const purchasePriceNum = Number(purchasePrice);
      const stampDutyNum = Number(stampDuty);
      const refurbCostNum = Number(refurbCost);
      const feesNum = Number(fees);
      const furnishingCostNum = Number(furnishingCost);
      const otherExpensesNum = Number(otherExpenses);
      const closingCostsPercentageNum = Number(closingCostsPercentage);
      const ltvNum = Number(ltv);
      const mortgageRateNum = Number(mortgageRate);
      const mortgageTermNum = Number(mortgageTerm);
    
      // Calculate closing costs
      const closingCosts = (purchasePriceNum * closingCostsPercentageNum) / 100;
    
      // Calculate total investment
      const totalInvestment = purchasePriceNum + stampDutyNum + refurbCostNum + feesNum + furnishingCostNum + otherExpensesNum + closingCosts;
    
      // Calculate deposit and loan amount
      const deposit = Math.round(totalInvestment * (ltvNum / 100));
      const loanAmount = totalInvestment - deposit;
    
      // Calculate monthly mortgage payment
      let monthlyMortgagePayment = Math.round(
        (loanAmount * (mortgageRateNum / 100) / 12) /
        (1 - Math.pow(1 + (mortgageRateNum / 100) / 12, -mortgageTermNum * 12))
      );
    
      if (interestType === "Interest_only") {
        monthlyMortgagePayment = Math.round(loanAmount * (mortgageRateNum / 100) / 12);
      }
    
      if (financingMethod === "cash") {
        monthlyMortgagePayment = 0;
      }
    
      // Set state values
      setDeposit(deposit);
      setLoanAmount(loanAmount);
      setTotalInvestment(totalInvestment);
      setMonthlyMortgagePayment(monthlyMortgagePayment);
    
    }, [
      purchasePrice, stampDuty, refurbCost, fees, furnishingCost, otherExpenses,
      closingCostsPercentage, ltv, mortgageRate, mortgageTerm, interestType, financingMethod
    ]);
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


   useEffect(() => {
    const calculatedLoanAmount =  purchasePrice * (ltv / 100);

    const calculatedDeposit = purchasePrice - calculatedLoanAmount;
  
    setDeposit(calculatedDeposit);
    setLoanAmount(calculatedLoanAmount);
  }, [purchasePrice, ltv]);





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
            closingCosts={closingCosts}
            setClosingCosts={setClosingCosts}
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
            setMonthlyMortgagePayment={setMonthlyMortgagePayment}
            monthlyMortgagePayment={monthlyMortgagePayment}
            interestType={interestType}
            setInterestType={setInterestType}
            financingMethod={financingMethod}
            setFinancingMethod={setFinancingMethod}
          />
          <RevenueCard 
            monthlyRevenue={monthlyRevenue}
            annualRevenue={annualRevenue}
            setMonthlyRevenue={setMonthlyRevenue}
            setAnnualRevenue={setAnnualRevenue}
            rentEstimate={rentEstimate}
          />
          <ExpensesCard 
            channelFee={channelFee}
            propertyManagementFee={propertyManagementFee}
            propertyManagementFeePercentage={propertyManagementFeePercentage}
            supplyFees={supplyFees}
            groundRent={groundRent}
            insurance={insurance}
            utilities={utilities}
            maintenance={maintenance}
            otherExpenses={otherExp}
            setChannelFee={setChannelFee}
            setPropertyManagementFee={setPropertyManagementFee}
            setPropertyManagementFeePercentage={setPropertyManagementFeePercentage}
            setSupplyFees={setSupplyFees}
            setGroundRent={setGroundRent}
            setInsurance={setInsurance}
            setUtilities={setUtilities}
            setMaintenance={setMaintenance}
            setOtherExp={setOtherExp}

            monthlyRevenue={monthlyRevenue}
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
