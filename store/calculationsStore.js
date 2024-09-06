import { create,  } from "zustand";

export const useCalculationsStore = create((set) => ({
  // Total Investment
  purchasePrice: 0,
  stampDuty: 0,
  closingCost: 5000,
  closingCostPercentage: 0,
  refurbishmentCost: 0,
  furnishingsCost: 0,
  otherInitialCost: 0,
  //Financing
  financingMethod: "mortgage",
  ltv: 75,
  deposit: 0,
  loanAmount: 0,
  interestRate: 11,
  mortgageFees: 0,
  mortgageTerm: 5,
  interestType: "capital_Interest",
  monthlyPayment: 0,
  //Revenue
  monthlyRevenue: 0,
  annualRevenue: 0,
  ProjectedMonthlyRevenue: 0,
  //Expenses
  propertyManagementFee: 0,
  propertyManagementFeePercentage: 15,
  serviceCharge: 0,
  groundRent: 0,
  insurance: 0,
  utilities: 0,
  utilitiesPercentage: 0,
  maintenance: 0,
  otherExpenses: 0,
  totalExpenses: 0,

  //Calculations
  totalInvestment: 0,
  netOperatingIncomeMonthly: 0,
  netOperatingIncomeAnnual: 0,
  leveragedNetCashFlowMonthly: 0,
  leveragedNetCashFlowAnnual: 0,

  ROI: 0,
  netAnnualCashFlow: 0,
  grossYield: 0,
  cashOnCash: 0,



    setPurchasePrice: (purchasePrice) => set({ purchasePrice }),
    setStampDuty: (stampDuty) => set({ stampDuty }),
    setClosingCost: (closingCost) => set({ closingCost }),
    setRefurbishmentCost: (refurbishmentCost) => set({ refurbishmentCost }),
    setFurnishingsCost: (furnishingsCost) => set({ furnishingsCost }),

    setFinancingMethod: (financingMethod) => set({ financingMethod }),
    setLtv: (ltv) => set({ ltv }),
    setDeposit: (deposit) => set({ deposit }),
    setLoanAmount: (loanAmount) => set({ loanAmount }),
    setInterestRate: (interestRate) => set({ interestRate }),
    setMortgageFees: (mortgageFees) => set({ mortgageFees }),
    setMortgageTerm: (mortgageTerm) => set({ mortgageTerm }),
    setInterestType: (interestType) => set({ interestType }),
    setMonthlyPayment: (monthlyPayment) => set({ monthlyPayment }),

    setMonthlyRevenue: (monthlyRevenue) => set({ monthlyRevenue }),
    setAnnualRevenue: (annualRevenue) => set({ annualRevenue }),
    setProjectedMonthlyRevenue: (ProjectedMonthlyRevenue) => set({ ProjectedMonthlyRevenue }),

    setPropertyManagementFee: (propertyManagementFee) => set({ propertyManagementFee }),
    setServiceCharge: (serviceCharge) => set({ serviceCharge }),
    setGroundRent: (groundRent) => set({ groundRent }),
    setInsurance: (insurance) => set({ insurance }),
    setUtilities: (utilities) => set({ utilities }),
    setMaintenance: (maintenance) => set({ maintenance }),
    setOtherExpenses: (otherExpenses) => set({ otherExpenses }),
    setTotalExpenses: (totalExpenses) => set({ totalExpenses }),

    setTotalInvestment: (totalInvestment) => set({ totalInvestment }),
    setNetOperatingIncomeMonthly: (netOperatingIncomeMonthly) => set({ netOperatingIncomeMonthly }),
    setNetOperatingIncomeAnnual: (netOperatingIncomeAnnual) => set({ netOperatingIncomeAnnual }),
    setLeveragedNetCashFlowMonthly: (leveragedNetCashFlowMonthly) => set({ leveragedNetCashFlowMonthly }),
    setLeveragedNetCashFlowAnnual: (leveragedNetCashFlowAnnual) => set({ leveragedNetCashFlowAnnual }),

    setClosingCostPercentage: (closingCostPercentage) => set({ closingCostPercentage }),
    setPropertyManagementFeePercentage: (propertyManagementFeePercentage) => set({ propertyManagementFeePercentage }),
    setUtilitiesPercentage: (utilitiesPercentage) => set({ utilitiesPercentage }),

    setOtherInitialCost: (otherInitialCost) => set({ otherInitialCost }),




    setAll: (all) => set({ ...all }),







}));
