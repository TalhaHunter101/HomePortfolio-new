import React, { useState, useMemo } from "react";
import { Input, Button, Spinner } from "@nextui-org/react";
import { Icon } from "@iconify/react";

const Step6 = ({ onBack, selectedAddress }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
const [isgettingreport, setIsGettingReport] = useState(false);
  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

  const isEmailInvalid = useMemo(() => {
    if (email === "") return false;
    return !validateEmail(email);
  }, [email]);

  const isFullNameInvalid = useMemo(() => fullName.trim() === "", [fullName]);

  const handleSubmit = async() => {
    
    // Check if selectedAddress is not null/undefined and email is valid
    if (selectedAddress && email) {
      // Log selectedAddress and email
      console.log("Selected Address:", selectedAddress);
      console.log("Email:", email);
      setIsGettingReport(true);

   await  fetch("/api/send-report", {
        method: "POST",
        body: JSON.stringify({
         email: email,
         url: "https://home-portfolio-weld.vercel.app/home-valuation/"+ selectedAddress.uprn
        }),
      });
      window.location.href = "/home-valuation/"+ selectedAddress.uprn
      
      // onSubmit({ selectedAddress, email });

    } else {
      console.log(selectedAddress, email);
      // Additional feedback or error handling can be added here if needed
      console.log("Please enter a valid email and select an address.");
    }
  };

  return (
    <>

{
  isgettingreport && <div className="flex justify-center items-center w-full h-full fixed top-0 left-0 bg-black bg-opacity-50 z-50">
  <div className="flex flex-col justify-center items-center w-full">
    <p className="text-center text-xl text-700 mb-6 text-white flex flex-col space-x-2">
      <Spinner size="large" />
      Generating your report...
    </p>
  </div>
</div>
}

     <div className="flex flex-col justify-center items-center w-full">
      <p className="text-center text-lg text-default-700 mb-6">
        Lastly, please enter your <strong>full name</strong> and{" "}
        <strong>email</strong> so I can finish generating your report:
      </p>
      <div className="flex w-full justify-center space-x-4 mb-6">
        <Input
          fullWidth
          label="Full Name"
          placeholder="Enter your Full Name"
          color={isFullNameInvalid ? "danger" : "secondary"}
          className="text-secondary max-w-xs"
          endContent={<Icon icon="bi:person-fill" />}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          isInvalid={isFullNameInvalid}
          errorMessage={isFullNameInvalid ? "Full Name is required" : ""}
        />
        <Input
          fullWidth
          placeholder="Enter your email"
          type="email"
          label="Email"
          color={isEmailInvalid ? "danger" : "secondary"}
          className="text-secondary max-w-xs"
          endContent={<Icon icon="bi:envelope-fill" />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isInvalid={isEmailInvalid}
          errorMessage={isEmailInvalid ? "Please enter a valid email" : ""}
        />
      </div>
      <div className="flex justify-end w-full">
        <Button
          size="lg"
          endContent={<Icon icon="tabler:report-search" width={20} height={20} />}
          radius="full"
          className="bg-black text-white px-8 py-3"
          onClick={handleSubmit}
          disabled={isFullNameInvalid || isEmailInvalid || !selectedAddress}
        >
          View My Report
        </Button>
      </div>
    </div>
    </>
   
  );
};

export default Step6;
