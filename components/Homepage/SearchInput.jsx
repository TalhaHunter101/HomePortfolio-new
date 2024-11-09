import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { debounce } from "lodash";

export default function SearchInput() {
  const router = useRouter();

  const handleSearch = useCallback(
    debounce((value) => {
      router.push(`/pages/page?searchTerm=${value}`);
    }, 300), // Adjust the debounce delay as needed
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    handleSearch(value);
  };

  return (
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="Search for your property"
        className="w-1/2 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        onChange={handleChange}
      />
    </div>
  );
}
