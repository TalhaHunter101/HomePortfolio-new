import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";
import InvestorReturnCal from "./InvestorReturnCal";
import TotalInvestmentCard from "./TotalInvestmentCard";
import FinancingCard from "./FinancingCard";
import RevenueCard from "./RevenueCard";
import ExpensesCard from "./ExpensesCard";
import FinancialSummary from "./FinancialSummary";

function Calculation({ title, propertyPrice }) {
  
  return (
    <Card className="m-4" style={{ minHeight: "400px", minWidth: "800px" }}>
      <CardHeader>
        <h2 className="text-xl font-bold">{title}</h2>
      </CardHeader>

      <CardBody>
        <InvestorReturnCal propertyPrice={propertyPrice} />
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
