import CenterSubSection from "@/components/HomeValuation/CenterSubSection";
import DisplayMap from "@/components/HomeValuation/DisplayMap";
import HeaderValuation from "@/components/HomeValuation/HeaderValuation";
import HistoricSalesChart from "@/components/HomeValuation/HistoricSalesChart";
import PropertyComparisonTable from "@/components/HomeValuation/PropertyComparisonTable";
import PropertyDetails from "@/components/HomeValuation/PropertyDetails";
import RentalReportFooter from "@/components/HomeValuation/RentalReportFooter";
import RentEstimate from "@/components/HomeValuation/RentEstimate";
import SaleEstimatesChart from "@/components/HomeValuation/SaleEstimatesChart";
import { ValuationMapStatic } from "@/components/Maps";
import { Card } from "@nextui-org/react";

const THEME_COLORS = {
  primary: "#4F46E5",
  secondary: "#10B981",
  accent: "#F59E0B",
  text: "#1F2937",
  background: "#F9FAFB",
  chart: {
    primary: "#4F46E5",
    secondary: "#10B981",
    accent: "#F59E0B",
    gradient: ["#4F46E5", "#10B981"],
  },
};

const getHomeDetails = async (uprn_id) => {
  let data = await fetch(
    "https://home-portfolio-weld.vercel.app/api/house_data",
    {
      method: "POST",
      body: JSON.stringify({ uprn: uprn_id }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  let response = await data.json();

  return response;
};

export default async function HomeEvaluation({ params }) {
  let uprn_id = params.id;

  let homeDetails = await getHomeDetails(uprn_id);

  const defaultProps = [
    {
      lat: Number(23.079727),
      lng: Number(77.37855),
    },
  ];

  return (
    <div className="mt-14 p-8 bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-lg mx-auto max-w-7xl">
      <HeaderValuation data={homeDetails} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <RentEstimate data={homeDetails} colors={THEME_COLORS} />
        <PropertyDetails data={homeDetails} colors={THEME_COLORS} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Price Trends
          </h3>
          <SaleEstimatesChart data={homeDetails} colors={THEME_COLORS} />
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Historic Sales
          </h3>
          <HistoricSalesChart data={homeDetails} colors={THEME_COLORS} />
        </Card>
      </div>

      <Card className="mt-6 p-6 h-64">
        <ValuationMapStatic height={500} center={defaultProps} />
      </Card>

      <Card className="mt-6 p-6 ">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Comparable Properties
        </h2>
        <PropertyComparisonTable data={homeDetails} colors={THEME_COLORS} />
      </Card>

      <RentalReportFooter />
    </div>
  );
}
