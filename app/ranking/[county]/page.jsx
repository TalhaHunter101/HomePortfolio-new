'use client';
import SearchCard from '@/components/SearchPage/SearchCrd';
import { Icon } from '@iconify/react';
import {  Button } from '@nextui-org/react';

export default function CountyPage({ params }) {
    const { county } = params;

    // Dummy data
    const countyData = dummyData;

    return (
        <div className="p-6 max-w-[80rem] mt-20 mx-auto  sm:px-6">
            <h1 className="text-3xl sm:text-5xl font-bold mb-6">
                Most Affordable Neighborhoods in {countyData.countyName}
            </h1>
            <p className="text-base sm:text-lg text-gray-700 mb-8">
                The affordability of a place depends on multiple factors such as the median income levels, rent-to-income ratios, and the home price-to-income ratios. These factors impact your cost of living and can give you a fair idea about the quality of life in Longmont. For instance, the median home prices can help you gauge how much you need to be making in order to afford housing in {countyData.countyName}.
                <br />
                Based on this data, here is the list of the 10 most affordable places to live in {countyData.countyName}. These neighborhoods in {countyData.countyName} have a high median income level, low rent-to-income ratio, or a relatively affordable home price-to-income ratio:
            </p>
            <div className="lg:justify-start">
                <h1 className="text-2xl sm:text-4xl font-bold text-gray-600 lg:items-start mb-6">
                    Check Out The Top 10 Most Affordable Neighborhoods To Live In {countyData.countyName}:
                </h1>
                <p className="text-base sm:text-lg text-gray-500 mb-8 lg:items-start">
                    With a median home price of $490,413 and a median rent of $1,791, {countyData.neighborhoods[0].name} is the most affordable neighborhood on our list. Based on the growth in home prices in {countyData.neighborhoods[0].name} over the last 3 years, it ranks No.11 among all the neighborhoods in {countyData.countyName}.
                </p>
            </div>

            {countyData.neighborhoods.map((neighborhood, index) => (
                <div key={index} className="mb-12">
                    <h2 className="text-2xl sm:text-3xl text-gray-700 font-semibold mb-4">
                        {index + 1}. {neighborhood.name}
                    </h2>
                    <div className="mb-6">
                        {/* Left Column */}
                        <div className="w-full">
                            <p className="text-gray-600 mb-4">
                                With a median home price of ${neighborhood.homePrice.toLocaleString()} and median rent of ${neighborhood.rent},
                                {neighborhood.name} is one of the most affordable neighborhoods in {countyData.countyName}.
                            </p>
                            <Button startContent={<Icon icon='fluent:data-trending-24-filled' />} variant='flat' color='secondary' className="mb-6 w-full sm:w-auto">
                                Learn more about the housing market in {countyData.neighborhoods[0].name}
                            </Button>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 mb-4">
                                <div>
                                    <p>Home Price to Household Income Ratio</p>
                                    <strong className='text-3xl text-blue-400 font-medium'>{neighborhood.incomeRatio}x</strong>
                                </div>
                                <div>
                                    <p>Rent to Household Income Ratio</p>
                                    <strong className='text-3xl text-blue-400 font-medium'>{neighborhood.rentIncomeRatio}%</strong>
                                </div>
                                <div>
                                    <p>Population</p>
                                    <h2 className='text-3xl font-medium text-gray-600 '>{neighborhood.population.toLocaleString()}</h2>
                                </div>
                                <div>
                                    <p>Median Home Price / Sqft</p>
                                    <h2 className='text-3xl font-medium text-gray-600'>${neighborhood.pricePerSqft}</h2>
                                </div>
                                <div>
                                    <p>Median Home Price</p>
                                    <h2 className='text-3xl font-medium text-gray-600'>${neighborhood.homePrice.toLocaleString()}</h2>
                                </div>
                                <div>
                                    <p>Median Rent</p>
                                    <h2 className='text-3xl font-medium text-gray-600'>${neighborhood.rent}</h2>
                                </div>
                            </div>

                            <p className="font-semibold text-base sm:text-lg mb-4">Must Know:</p>
                            <p className="text-gray-600 mb-4">
                                {neighborhood.name} scores below average in terms of transportation. Almost all errands require a car.
                            </p>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-4">
                                <div>
                                    <p>Walk Score</p>
                                    <h1 className='text-3xl font-semibold text-gray-600'>{neighborhood.walkScore}<Icon className='inline p-1' icon="healthicons:walking" /></h1>
                                </div>
                                <div>
                                    <p>Bike Score</p>
                                    <h1 className='text-3xl font-semibold text-gray-600'>{neighborhood.bikeScore}<Icon className='inline p-1' icon="mdi:bike" /></h1>
                                </div>
                                <div>
                                    <p>Transit Score</p>
                                    <h1 className='text-3xl font-semibold text-gray-600'>{neighborhood.transitScore}<Icon className='inline p-1' icon="mdi:bus" /></h1>
                                </div>
                            </div>

                            <p className="font-semibold text-base sm:text-lg mb-4">Is {neighborhood.name} a good place to live?</p>
                            <p className="text-gray-600 mb-6">
                                Several factors can influence the choice of place such as demographics, nearby schools, amenities, local community, and more.
                                Weve put this all together for {neighborhood.name}.
                            </p>

                            <Button variant='flat' color='warning' className="w-full sm:w-auto" startContent={<Icon icon="f7:book-fill" />}>
                                Read our {neighborhood.name} quality of life guide
                            </Button>
                        </div>

                        {/* Right Column - Cheapest Home */}
                        <div className="lg:w-1/4 w-full mt-4">
                            <SearchCard
                                property={neighborhood.cheapestHome}
                                setCardHover={() => { }}
                                isLiked={false}
                            />
                        </div>
                        <div className='mt-4'>
                            <Button startContent={<Icon icon="ic:round-home" />} variant='ghost' color='secondary' className="mb-6 w-full sm:w-auto">
                                See other homes for sale in {countyData.neighborhoods[0].name}
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

const dummyData = {
    countyName: 'Longmont',
    neighborhoods: [
        {
            name: 'Longmont Estates',
            homePrice: 490413,
            rent: 1791,
            incomeRatio: 4.3,
            rentIncomeRatio: 18.99,
            population: 36224,
            pricePerSqft: 312,
            walkScore: 15,
            bikeScore: 27,
            transitScore: 19,
            cheapestHome: {
                id: 'property1',
                maxPrice: 425000,
                images: [
                    { original: 'https://example.com/image1.jpg' },
                    { original: 'https://example.com/image2.jpg' },
                ],
                developer_logo: 'https://example.com/logo1.png',
                date: '2023-09-15T12:00:00Z',
                totalPriceChange: 'No price change',
                displayAddress: '2852 Trowell Ave, Longmont, CO 80503',
                minBedrooms: 3,
                bathrooms: 1,
                areaSize: 1128,
                fullAddress: '2852 Trowell Ave, Longmont, CO 80503',
                address: '2852 Trowell Ave, Longmont, CO 80503',
                daysAgo: 25,
            },
        },
        {
            name: 'East Side',
            homePrice: 450000,
            rent: 1600,
            incomeRatio: 4.0,
            rentIncomeRatio: 17.5,
            population: 25000,
            pricePerSqft: 300,
            walkScore: 20,
            bikeScore: 25,
            transitScore: 22,
            cheapestHome: {
                id: 'property2',
                maxPrice: 375000,
                images: [
                    { original: 'https://example.com/image3.jpg' },
                    { original: 'https://example.com/image4.jpg' },
                ],
                developer_logo: 'https://example.com/logo2.png',
                date: '2023-09-20T12:00:00Z',
                totalPriceChange: 'Price decreased by $10,000',
                displayAddress: '1234 Main St, Longmont, CO 80501',
                minBedrooms: 2,
                bathrooms: 1,
                areaSize: 1000,
                fullAddress: '1234 Main St, Longmont, CO 80501',
                address: '1234 Main St, Longmont, CO 80501',
                daysAgo: 10,
            },
        },
    ],
};
