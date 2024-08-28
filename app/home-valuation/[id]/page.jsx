import CenterSubSection from "@/components/HomeValuation/CenterSubSection";
import DisplayMap from "@/components/HomeValuation/DisplayMap";
import HeaderValuation from "@/components/HomeValuation/HeaderValuation";
import HistoricSalesChart from "@/components/HomeValuation/HistoricSalesChart";
import PropertyComparisonTable from "@/components/HomeValuation/PropertyComparisonTable";
import PropertyDetails from "@/components/HomeValuation/PropertyDetails";
import RentalReportFooter from "@/components/HomeValuation/RentalReportFooter";
import RentEstimate from "@/components/HomeValuation/RentEstimate";
import SaleEstimatesChart from "@/components/HomeValuation/SaleEstimatesChart";
import { Card } from "@nextui-org/react";

const getHomeDetails = async (uprn_id) => {
  let data = await fetch("http://localhost:3000/api/house_data", {
    method: "POST",
    body: JSON.stringify({ uprn: uprn_id }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let response = await data.json();

  return response;
};

export default async function HomeEvaluation({ params }) {
  let uprn_id = params.id;

  let homeDetails = await getHomeDetails(uprn_id);

  const defaultProps = {
    lat: Number(23.079727),
    lng: Number(77.37855),

    zoom: 13,
  };

  return (
    <div className=" mt-14 p-4 bg-white shadow-lg rounded-lg mx-7">
      <HeaderValuation data={homeDetails} />
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <RentEstimate data={homeDetails} />
        <PropertyDetails data={homeDetails} />
      </div>
      <CenterSubSection data={homeDetails} />
      <DisplayMap defaultProps={defaultProps} />
      <Card className="p-4">
        <p className="text-xl font-bold my-3">Sales Estimates</p>
        <SaleEstimatesChart data={homeDetails} />
      </Card>

      <Card className="p-4 my-4">
        <p className="text-xl font-bold my-3">Historic Sales</p>

        <HistoricSalesChart data={homeDetails} />
      </Card>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Comparable Properties</h2>

        <PropertyComparisonTable data={homeDetails} />
      </div>

      <RentalReportFooter />
    </div>
  );
}
