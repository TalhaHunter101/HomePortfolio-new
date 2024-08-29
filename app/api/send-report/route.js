import React, { useState, useMemo } from "react";
import { Input, Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";

const Step6 = ({ onSubmit, onBack, selectedAddress }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

  const isEmailInvalid = useMemo(() => {
    if (email === "") return false;
    return !validateEmail(email);
  }, [email]);

  const isFullNameInvalid = useMemo(() => fullName.trim() === "", [fullName]);

  const handleSubmit = async () => {
    if (selectedAddress && !isEmailInvalid) {
      // Log selectedAddress and email
      console.log("Selected Address:", selectedAddress);
      console.log("Email:", email);

      try {
        setIsSubmitting(true); // Start submission state
        const response = await fetch("/api/send-report", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uprn: selectedAddress.uprn,
            email: email,
          }),
        });

        const result = await response.json();
        if (response.ok) {
          console.log(result.message); // Success message
        } else {
          console.error(result.error); // Error message
        }
      } catch (error) {
        console.error("An error occurred while sending the report:", error);
      } finally {
        setIsSubmitting(false); // End submission state
      }
    } else {
      console.log("Please enter a valid email and select an address.");
    }
  };

  return (
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
          disabled={isFullNameInvalid || isEmailInvalid || !selectedAddress || isSubmitting}
        >
          {isSubmitting ? "Sending..." : "View My Report"}
        </Button>
      </div>
    </div>
  );
};

export default Step6;
