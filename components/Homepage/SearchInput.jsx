import { useRouter } from "next/navigation";

export default function SearchInput() {
    const router = useRouter();
    
    return (
        <div className="flex justify-center">
            <input
                type="text"
                placeholder="Search for your property"
                className="w-1/2 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                onChange={(e) => router.push(`/pages/page?searchTerm=${e.target.value}`)}
            />
        </div>
    );
}
