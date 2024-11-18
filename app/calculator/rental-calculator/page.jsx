import { Progress } from "@nextui-org/react";

export default function RentalReportForm() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 mt-20">
      {/* Progress Bar */}
      <div className="w-full max-w-3xl mb-6">
        <Progress
          size="lg"
          aria-label="New Rental Report Progress"
          value={30}
        />
      </div>

      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
        {/* Sidebar and Form Container */}
        <div className="flex">
          {/* Sidebar */}
          <div className="w-1/4 pr-6">
            <div className="flex flex-col gap-4">
              <div className="border border-dashed border-gray-400 h-36 rounded-md flex items-center justify-center">
                <button className="text-gray-600">📷 Add photo</button>
              </div>
              <ul className="space-y-4 text-gray-800">
                <li className="font-semibold text-green-600">
                  Property info ✔
                </li>
                <li>Purchase</li>
                <li>Loan details</li>
                <li>Rental income</li>
                <li>Expenses</li>
              </ul>
              <button className="w-full mt-4 bg-blue-500 text-white rounded-md py-2">
                Finish analysis
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="w-3/4">
            {/* Property Information Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Property information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="street-address"
                  >
                    Street address *
                  </label>
                  <input
                    type="text"
                    id="street-address"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="city"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="state"
                  >
                    State
                  </label>
                  <select
                    id="state"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  >
                    <option>California</option>
                    <option>New York</option>
                    <option>Texas</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="zip"
                  >
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zip"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="mt-4">
                <button className="text-blue-500 text-sm underline">
                  Optional: property features, description
                </button>
              </div>
              <div className="mt-6">
                <button className="bg-blue-500 text-white rounded-md py-2 px-4">
                  Next: Purchase
                </button>
              </div>
            </div>

            {/* Purchase Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Purchase</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="purchase-price"
                  >
                    Purchase price *
                  </label>
                  <input
                    type="text"
                    id="purchase-price"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="closing-costs"
                  >
                    Purchase closing costs *
                  </label>
                  <input
                    type="text"
                    id="closing-costs"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="mt-4">
                <button className="text-blue-500 text-sm underline">
                  Advanced: provide individual closing costs
                </button>
              </div>
              <div className="mt-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-500"
                  />
                  <span className="ml-2 text-sm">
                    I will be rehabbing this property
                  </span>
                </label>
              </div>

              <div className="mt-4">
                <button className="text-blue-500 text-sm underline">
                  Optional: property features, description
                </button>
              </div>
              <div className="mt-6">
                <button className="bg-blue-500 text-white rounded-md py-2 px-4">
                  Next: Loan details
                </button>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Loan details</h2>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="cash-purchase"
                  className="form-checkbox h-5 w-5 text-blue-500"
                />
                <label
                  htmlFor="cash-purchase"
                  className="ml-2 text-sm font-medium"
                >
                  Cash purchase?
                </label>
              </div>

              {/* Down Payment */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Down payment
                </label>
                <div className="flex items-center space-x-4 mb-2">
                  <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md focus:outline-none">
                    0%
                  </button>
                  <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md focus:outline-none">
                    10%
                  </button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none">
                    20%
                  </button>
                  <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md focus:outline-none">
                    25%
                  </button>
                  <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md focus:outline-none">
                    Other
                  </button>
                </div>
                <div className="text-sm text-gray-600">£2,469</div>
              </div>

              {/* Interest Rate */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="interest-rate"
                >
                  Interest rate *
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    id="interest-rate"
                    className="w-16 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                  <span className="ml-2 text-sm">%</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 mb-4 rounded-md flex items-start">
              <p className="text-sm text-blue-700">
                Pro tip: Check out some of our{" "}
                <a href="#" className="text-blue-500 underline">
                  Pro Featured Lenders
                </a>
                .
              </p>
              <button className="ml-auto text-gray-500">✖️</button>
            </div>

            {/* Points Charged */}
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="points-charged"
              >
                Points charged
              </label>
              <input
                type="text"
                id="points-charged"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Loan Term */}
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="loan-term"
              >
                Loan term *
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  id="loan-term"
                  className="w-16 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
                <span className="ml-2 text-sm">years</span>
              </div>
            </div>

            {/* Help Links */}
            <div className="text-sm text-gray-600 mt-4">
              <a href="#" className="text-blue-500 underline">
                What are loan points?
              </a>
              <br />
              <a href="#" className="text-blue-500 underline">
                What loan terms are most common?
              </a>

              <div className="mt-6">
                <button className="bg-blue-500 text-white rounded-md py-2 px-4">
                  Next: Income
                </button>
              </div>
            </div>

            <div className="mb-4 mt-10">
              {/* Rental Income Section */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Rental income</h2>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="gross-income"
                  >
                    Gross monthly income *
                  </label>
                  <div className="flex items-center">
                    <span className="mr-2">£</span>
                    <input
                      type="text"
                      id="gross-income"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <button className="text-blue-500 text-sm underline mb-4">
                  Advanced: provide income breakdown
                </button>
                <div className="bg-blue-50 p-4 mb-4 rounded-md flex items-start">
                  <p className="text-sm text-blue-700">
                    Pro tip: Use our{" "}
                    <a href="#" className="text-blue-500 underline">
                      Rent Estimator
                    </a>{" "}
                    to determine market rental prices.
                  </p>
                  <button className="ml-auto text-gray-500">✖️</button>
                </div>
                <button className="text-blue-500 text-sm underline mb-6">
                  Optional: income growth
                </button>
                <div>
                  <button className="bg-blue-500 text-white rounded-md py-2 px-4">
                    Next: Expenses
                  </button>
                </div>
              </div>

              {/* Expenses Section */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Expenses</h2>
                {/* Property Taxes */}
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="property-taxes"
                  >
                    Property taxes *
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <span className="mr-2">£</span>
                      <input
                        type="text"
                        id="property-taxes"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <select
                      id="taxes-frequency"
                      className="w-28 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    >
                      <option>annual</option>
                      <option>monthly</option>
                    </select>
                  </div>
                </div>

                {/* Insurance */}
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="insurance"
                  >
                    Insurance *
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <span className="mr-2">£</span>
                      <input
                        type="text"
                        id="insurance"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <select
                      id="insurance-frequency"
                      className="w-28 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    >
                      <option>annual</option>
                      <option>monthly</option>
                    </select>
                  </div>
                </div>

                {/* Repairs & Maintenance */}
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="repairs-maintenance"
                  >
                    Repairs & maintenance *
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      id="repairs-maintenance"
                      className="w-16 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <span className="ml-2 text-sm">%</span>
                    <span className="ml-4 text-sm text-gray-600">
                      £0/month (0% of income)
                    </span>
                  </div>
                </div>

                {/* Help Links */}
                <div className="text-sm text-gray-600 mt-4 space-y-2">
                  <a href="#" className="text-blue-500 underline">
                    How to calculate gross monthly income
                  </a>
                  <br />
                  <a href="#" className="text-blue-500 underline">
                    How much rent can I charge?
                  </a>
                  <br />
                  <a href="#" className="text-blue-500 underline">
                    How to determine your property’s tax bill
                  </a>
                  <br />
                  <a href="#" className="text-blue-500 underline">
                    How to determine your property’s insurance costs
                  </a>
                  <br />
                  <a href="#" className="text-blue-500 underline">
                    Ongoing maintenance and repairs
                  </a>
                </div>
              </div>

              {/* Extended Expenses Section */}
              <div className="mb-8">
                {/* Vacancy */}
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="vacancy"
                  >
                    Vacancy
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      id="vacancy"
                      className="w-16 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <span className="ml-2 text-sm">%</span>
                    <span className="ml-4 text-sm text-gray-600">
                      £0/month (0% of income)
                    </span>
                  </div>
                </div>
                <a href="#" className="text-blue-500 text-sm underline">
                  Vacancy rates
                </a>

                {/* Capital Expenditures */}
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="capital-expenditures"
                  >
                    Capital expenditures
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      id="capital-expenditures"
                      className="w-16 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <span className="ml-2 text-sm">%</span>
                    <span className="ml-4 text-sm text-gray-600">
                      £0/month (0% of income)
                    </span>
                  </div>
                </div>
                <a href="#" className="text-blue-500 text-sm underline">
                  What are capital expenditures?
                </a>

                {/* Pro Tip Section */}
                <div className="bg-blue-50 p-4 mb-4 rounded-md flex items-start">
                  <p className="text-sm text-blue-700">
                    Pro Tip: Reduce management fees with our{" "}
                    <a href="#" className="text-blue-500 underline">
                      Preferred Property Management Software
                    </a>{" "}
                    or stay legal and save money with our{" "}
                    <a href="#" className="text-blue-500 underline">
                      Landlord Forms
                    </a>
                    .
                  </p>
                  <button className="ml-auto text-gray-500">✖️</button>
                </div>

                {/* Management Fees */}
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="management-fees"
                  >
                    Management fees
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      id="management-fees"
                      className="w-16 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <span className="ml-2 text-sm">%</span>
                    <span className="ml-4 text-sm text-gray-600">
                      £0/month (0% of income)
                    </span>
                  </div>
                </div>
                <a href="#" className="text-blue-500 text-sm underline">
                  How much do property managers charge?
                </a>

                {/* Utilities - Electricity, Gas, Water & Sewer, HOA Fees, Garbage */}
                <div className="mb-4">
                  {/* Electricity */}
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="electricity"
                  >
                    Electricity
                  </label>
                  <div className="flex items-center">
                    <span className="mr-2">£</span>
                    <input
                      type="text"
                      id="electricity"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <span className="ml-2 text-sm">/month</span>
                  </div>

                  {/* Gas */}
                  <label
                    className="block text-sm font-medium mb-1 mt-4"
                    htmlFor="gas"
                  >
                    Gas
                  </label>
                  <div className="flex items-center">
                    <span className="mr-2">£</span>
                    <input
                      type="text"
                      id="gas"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <span className="ml-2 text-sm">/month</span>
                  </div>

                  {/* Water & Sewer */}
                  <label
                    className="block text-sm font-medium mb-1 mt-4"
                    htmlFor="water-sewer"
                  >
                    Water & sewer
                  </label>
                  <div className="flex items-center">
                    <span className="mr-2">£</span>
                    <input
                      type="text"
                      id="water-sewer"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <span className="ml-2 text-sm">/month</span>
                  </div>

                  {/* HOA Fees */}
                  <label
                    className="block text-sm font-medium mb-1 mt-4"
                    htmlFor="hoa-fees"
                  >
                    HOA fees
                  </label>
                  <div className="flex items-center">
                    <span className="mr-2">£</span>
                    <input
                      type="text"
                      id="hoa-fees"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <span className="ml-2 text-sm">/month</span>
                  </div>
                  <a
                    href="#"
                    className="text-blue-500 text-sm underline mt-2 inline-block"
                  >
                    What to expect with an HOA
                  </a>

                  {/* Garbage */}
                  <label
                    className="block text-sm font-medium mb-1 mt-4"
                    htmlFor="garbage"
                  >
                    Garbage
                  </label>
                  <div className="flex items-center">
                    <span className="mr-2">£</span>
                    <input
                      type="text"
                      id="garbage"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <span className="ml-2 text-sm">/month</span>
                  </div>

                  {/* Other */}
                  <label
                    className="block text-sm font-medium mb-1 mt-4"
                    htmlFor="other"
                  >
                    Other
                  </label>
                  <div className="flex items-center">
                    <span className="mr-2">£</span>
                    <input
                      type="text"
                      id="garbage"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <span className="ml-2 text-sm">/month</span>
                  </div>
                </div>

                <button className="text-blue-500 text-sm underline mb-4">
                  Advanced: provide income breakdown
                </button>

                {/* Help Links */}
                <div className="text-sm text-gray-600 mt-4 space-y-2">
                  <a href="#" className="text-blue-500 underline">
                    What monthly expenses should I expect?
                  </a>
                </div>

                <div className="mt-6">
                  <button className="bg-blue-500 text-white rounded-md py-2 px-4">
                    Finish analysis
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
