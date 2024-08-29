"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Input, Button, Card, Spinner } from "@nextui-org/react";
import { ReportModal } from "@/components/QuestionFlow/QfModal";
import Link from "next/link";

export default function Component() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null); // State for selected address

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/search-house-address`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: value }),
        });
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setResults([]);
    }
  };

  const handleAddressClick = (address, uprn) => {
    setQuery(address); // Update the input field with the selected address
    const selected = { address, uprn };
    setSelectedAddress(selected); // Store the selected address and UPRN
    console.log(selected); 
    setResults([]); // Clear the results
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#ffffff] to-[#b792f6b5]">
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          Get an instant{" "}
          <span className="relative inline-block">
            <span className="relative z-10">home evaluation</span>
            <span className="absolute inset-0 bg-[#874debb5] z-0 transform -skew-x-6" />
          </span>
          , powered by HomeportFolio AI
        </h1>
      </div>
      <div className="mt-8">
        <Card className="flex flex-row items-center p-4 shadow-lg rounded-lg min-w-[50vw]">
          <Input
            fullWidth
            placeholder="Enter address"
            startContent={<Icon icon="bi:house-fill" fontSize={28} />}
            className="mr-4"
            value={query}
            onChange={handleInputChange}
          />
          <Button auto flat className="font-bold" color="secondary" onPress={handleOpenModal}>
            Get My Report
          </Button>
        </Card>
      </div>
      {/* Pass the selectedAddress to the ReportModal */}
      <ReportModal isOpen={isModalOpen} onOpenChange={handleCloseModal} selectedAddress={selectedAddress} />
      <div className="mt-2 flex flex-col items-center space-y-4">
        {isLoading && <Spinner />}
        {results.length > 0 && (
          <Card className="flex flex-row items-center p-4 shadow-lg rounded-lg min-w-[50vw]">
            <ul>
              {results.map((data, index) => (
                <li
                  key={index}
                  className="py-2 border-b cursor-pointer"
                  onClick={() => handleAddressClick(data?._source?.full_address, data?._source?.uprn)}
                >
                  {data?._source?.full_address}
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    </div>
  );
}
