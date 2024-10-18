'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@nextui-org/react';
import { Icon } from '@iconify/react';

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

  return (
    <div className="max-w-[87rem] mt-20 mx-auto flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-center">Best Places To Live</h1>
      <p className="mt-4 text-center text-lg text-gray-600 p-4">
      Location, location, location: it’s key in finding the best place to live, as is price. That&#39;s why we’ve ranked the top 10 cheapest, most affordable, and most expensive areas to live in across America - with all the stats to back it up. Whether you want to splurge or save, find your ideal area now.
      </p>
      <form className="mt-8 w-full max-w-lg" onSubmit={handleSearch}>
        <Input
          variant="bordered"
          onSubmit={handleSearch}
          clearable
          fullWidth
          size="lg"
          placeholder="Search for city or county"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          endContent={<Icon onClick={handleSearch} className='cursor-pointer' icon="ic:baseline-search" height={24} width={24} />}
        />
      </form>
    </div>
  );
}
