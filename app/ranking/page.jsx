'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Chip, Input } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import AutocompleteSearch from '../autocompleteSearchBar';
import { motion } from 'framer-motion';
import RankingAutoCompleteSearch from '@/components/Ranking/RankingAutoCompleteSearch';


let dummyData = {
  "neighborhoods": {
    "Austin": [
      { "name": "Crestview", "guideUrl": "/guides/crestview" },
      { "name": "Allandale", "guideUrl": "/guides/allandale" },
      { "name": "North Loop", "guideUrl": "/guides/north-loop" }
    ],
    "Atlanta": [
      { "name": "Buckhead Village", "guideUrl": "/guides/buckhead-village" },
      { "name": "Summerhill", "guideUrl": "/guides/summerhill" },
      { "name": "Westview", "guideUrl": "/guides/westview" },
      { "name": "East Atlanta", "guideUrl": "/guides/east-atlanta" }
    ]
  }
}

export default function RankingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to /ranking/[county]
      router.push(`/ranking/${searchQuery}`);
    }
  };

  const [guides, setGuides] = useState(dummyData.neighborhoods);


  return (
    // <div className="max-w-[87rem] mt-20 mx-auto flex flex-col items-center justify-center">
    //   <h1 className="text-5xl font-bold text-center">Best Places To Live</h1>
    //   <p className="mt-4 text-center text-lg text-gray-600 p-4">
    //   Location, location, location: it’s key in finding the best place to live, as is price. That&#39;s why we’ve ranked the top 10 cheapest, most affordable, and most expensive areas to live in across America - with all the stats to back it up. Whether you want to splurge or save, find your ideal area now.
    //   </p>
    //   <form className="mt-8 w-full max-w-lg" onSubmit={handleSearch}>
    //     <Input
    //       variant="bordered"
    //       onSubmit={handleSearch}
    //       clearable
    //       fullWidth
    //       size="lg"
    //       placeholder="Search for city or county"
    //       value={searchQuery}
    //       onChange={(e) => setSearchQuery(e.target.value)}
    //       endContent={<Icon onClick={handleSearch} className='cursor-pointer' icon="ic:baseline-search" height={24} width={24} />}
    //     />
    //   </form>
    // </div>
    <div>
   <div className="relative mt-16 w-screen justify-center min-h-[40vh] md:min-h-[80vh] lg:min-h-[50vh] xl:min-h-[40vh] px-4 sm:px-6">
    <div
      style={{
        backgroundColor: "#fff",
        backgroundImage: `url('/bg-plain-banner.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
      }}
      className="flex items-center justify-center pt-8 bg-background min-h-[40vh] md:min-h-[80vh] lg:min-h-[50vh] xl:min-h-[40vh]   px-4 sm:px-6"
    >
      <div className="flex flex-col justify-center items-center w-full max-w-screen-xl mx-auto px-5">
        <div className="place-items-center h-auto relative p-8 flex flex-col justify-center items-center h-full w-full min-w-[95vw] z-10 px-4 sm:px-6">
          <Chip variant="flat" color="secondary" className="mb-2">
            AI-Powered Place Ranking system
          </Chip>
          <h1
            style={{ lineHeight: "1.25" }}
            className="leading-6 text-lg md:text-3xl lg:text-5xl font-bold lg:tracking-tight mt-4 text-center z-10"
          >
         Best Places To Live
          </h1>
          <p className="mt-4 text-sm md:text-lg lg:text-xl text-slate-600 text-center z-10">
          Location, location, location: it’s key in finding the best place to live, as is price.
          <br/>
           That&#39;s why we’ve ranked the top 10 cheapest, most affordable, and most expensive areas to live in across UK - with all the stats to back it up.
           <br/>
            Whether you want to splurge or save, find your ideal area now.
          </p>
          <div className="mt-2 w-full sm:max-w-[90vw] md:max-w-[60vw] lg:max-w-[800px] flex justify-center gap-3 z-10">
            <RankingAutoCompleteSearch />
          </div>
        </div>

      </div> 
    </div>
  </div>
  

  {/* <div className="p-8 max-w-[87rem] mx-auto">
      Neighborhood Guides Section
      {Object.entries(guides).map(([city, neighborhoods], index) => (
        <div key={index} className="mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-600 mb-8">
            {city} Neighborhood Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {neighborhoods.map((neighborhood, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Card
                  variant="flat"
                  isPressable
                  className="bg-gradient-to-b from-black to-gray-800 text-white p-8 rounded-lg shadow-md h-64 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">
                      {neighborhood.name} Guide
                    </h3>
                  </div>
                  <Button
                    variant="ghost"
                    color="primary"
                    endContent={<Icon icon="ic:outline-arrow-forward-ios" />}
                    className="self-start"
                  >
                    Show me
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div> */}
    </div>
 







  );
}
