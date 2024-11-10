"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Input, Button, Card, Spinner } from "@nextui-org/react";
import { ReportModal } from "@/components/QuestionFlow/QfModal";
import Link from "next/link";
// import NavBar from "../../components/common/Nav/Navbar";

export default function HomeValuation() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null); // State for selected address
  const [isgettingreport, setIsGettingReport] = useState(false);
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
  const handleSubmit = async() => {
    
    // Check if selectedAddress is not null/undefined and email is valid
    if (selectedAddress ) {
      // Log selectedAddress and email
     
      setIsGettingReport(true);

   await  fetch("/api/send-report", {
        method: "POST",
        body: JSON.stringify({
        //  email: email,
         url: "https://home-portfolio-weld.vercel.app/home-valuation/report"+ selectedAddress.uprn
        }),
      });
      window.location.href = "/home-valuation/report/"+ selectedAddress.uprn
      
      // onSubmit({ selectedAddress, email });

    } else {
      console.log(selectedAddress);
      // Additional feedback or error handling can be added here if needed
      console.log("Please enter a valid email and select an address.");
    }
  };
  const handleAddressClick = (address, uprn) => {
    setQuery(address); // Update the input field with the selected address
    const selected = { address, uprn };
    setSelectedAddress(selected); // Store the selected address and UPRN
    setResults([]); // Clear the results
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* NavBar at the top */}
      {/* <NavBar /> */}
      
      {/* Main content */}
      <div
        style={{
          backgroundColor: "#fff",
          backgroundImage: `url('/bg-plain-banner.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          flex: 1, // This ensures the div takes remaining space
        }}
        className="flex flex-col items-center justify-center"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            Get an instant{" "}
            <span className="relative inline-block">
              <span className="relative z-10">home evaluation</span>
              <span className="absolute" />
            </span>
            , powered by HomeportFolio AI
          </h1>
        </div>

        {/* Rest of your components */}
        <div className="mt-8">
          <Card className="flex flex-row items-center p-4 shadow-lg rounded-lg min-w-[50vw]">
            <Input
              fullWidth
              radius="sm"
              placeholder="Enter address"
              startContent={<Icon icon="bi:house-fill" fontSize={28} />}
              className="mr-4"
              value={query}
              onChange={handleInputChange}
            />
            <Button 
              auto 
              flat 
              radius="sm" 
              className="font-semibold text-xs md:text-base" 
              color="secondary" 
              onPress={handleSubmit}
            >
              Get My Report
            </Button>
          </Card>
        </div>

        {/* <ReportModal 
          isOpen={isModalOpen} 
          onOpenChange={handleCloseModal} 
          selectedAddress={selectedAddress} 
        /> */}

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
    </div>
  );
}
