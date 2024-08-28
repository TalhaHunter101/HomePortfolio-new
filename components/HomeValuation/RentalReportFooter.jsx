import React from 'react';
import { Icon } from '@iconify/react';

const RentalReportFooter = () => {
  return (
    <footer className="mt-8 p-6 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Powered by Homeprotfolio</h2>
      
      <p className="mb-4 text-sm">
        Homeprotfolio makes it easy to view rent prices, comps and local market trends for any property in the US, and track your
        rental portfolio with real-time alerts and market updates.
      </p>
      
      <p className="mb-6 text-sm">
        Start growing your rental portfolio and maximizing your cash flow with Homeprotfolio. Try it free at{' '}
        <a href="https://Homeprotfolio.io" className="text-blue-600 hover:underline">https://Homeprotfolio.io</a>.
      </p>
      
      <div className="flex justify-center mb-8">
        <Icon icon="mdi:chart-box" className="w-8 h-8 text-blue-500 mr-2" />
        <span className="text-blue-500 font-semibold text-2xl">Homeprotfolio</span>
      </div>
      
      <h3 className="text-xl font-bold mb-4">Disclaimer</h3>
      
      <p className="mb-4 text-xs">
        This Report is provided solely for general business information purposes. No advisory, fiduciary or other
        relationship is created by any acceptance or use of this Report.
      </p>
      
      <p className="mb-4 text-xs">
        The inclusion of this Report with any other materials does not constitute an endorsement by Homeprotfolio of any third
        party or any third partys products or services. The projected valuation, financial and investment return information,
        conclusions and other information contained in this Report are based upon tested methodologies for accuracy.
        However, such information and conclusions are not definitive forecasts, appraisals or opinions of valuations. All
        such information and conclusions are stated in terms of probability of likelihood based on market factors and
        information submitted to Homeprotfolio, and such information and conclusions are not guaranteed by Homeprotfolio and
        should not be construed as a certified appraisal or valuation, or investment advice.
      </p>
      
      <p className="mb-6 text-xs">
        Homeprotfolio uses or has used public and/or confidential data and assumptions provided to Homeprotfolio by third parties,
        and Homeprotfolio has not independently verified the data and assumptions used in these analyses or data sets.
        Attributes for properties may be inaccurate because county assessor and property data records do not always
        include recent additions and/or modifications to property structures. Changes in the underlying data or operating
        assumptions, or any loss of access to any one or more sources will clearly impact the analyses, information and
        conclusions set forth in this Report.
      </p>
      
      <h3 className="text-xl font-bold mb-4">Data Sources</h3>
      
      <p className="mb-4 text-xs">
        The rental data and rental property listing information contained in this Report is aggregated and compiled from
        publicly available online listing websites and directories.
      </p>
      
      <p className="text-xs">
        Rental property valuation estimates are calculated based on similar nearby rental property listings, their listed rents
        and similarity to the subject property.
      </p>
    </footer>
  );
};

export default RentalReportFooter;