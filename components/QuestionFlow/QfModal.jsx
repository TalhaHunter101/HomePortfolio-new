import React, { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    Divider,
    Image,
    Progress,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";

export const ReportModal = ({ isOpen, onOpenChange, selectedAddress }) => {
    const [step, setStep] = useState(1);
    const [selectedPropertyType, setSelectedPropertyType] = useState("");
    const [selectedBedrooms, setSelectedBedrooms] = useState("");
    const [selectedBathrooms, setSelectedBathrooms] = useState("");
    const [hasFinishedBasement, setHasFinishedBasement] = useState("");
    const [squareFootage, setSquareFootage] = useState("");

    const handleNextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const handlePreviousStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const handlePropertyTypeSelect = (type) => {
        setSelectedPropertyType(type);
        handleNextStep();
    };

    const handleBedroomSelect = (count) => {
        setSelectedBedrooms(count);
        handleNextStep();
    };

    const handleBathroomSelect = (count) => {
        setSelectedBathrooms(count);
        handleNextStep();
    };

    const handleBasementSelect = () => {
        handleNextStep();
    };

    const handleSquareFootageSelect = (footage) => {
        setSquareFootage(footage);
        handleNextStep();
    };

    const handleSubmit = ({ email, selectedAddress }) => {
        
        console.log("email", email);
        console.log("Selected Address:", selectedAddress); // Log the selected address
        onOpenChange(false);
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <Step1 onPropertyTypeSelect={handlePropertyTypeSelect} />;
            case 2:
                return <Step2 onBedroomSelect={handleBedroomSelect} />;
            case 3:
                return <Step3 onBathroomSelect={handleBathroomSelect} />;
            case 4:
                return <Step4 onBasementSelect={handleBasementSelect} />;
            case 5:
                return <Step5 onSquareFootageSelect={handleSquareFootageSelect} />;
            case 6:
                // Pass selectedAddress to Step6 as a prop
                return <Step6  onBack={handlePreviousStep} selectedAddress={selectedAddress} />;
            default:
                return <Step1 onPropertyTypeSelect={handlePropertyTypeSelect} />;
        }
    };

    return (
        <Modal
            backdrop="blur"
            className="pb-6 w-full h-[90vh] bg-gradient-to-b from-[#ffffff] to-[#b792f6b5]"
            isDismissable={false}
            size="5xl"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col h-1/2 items-center justify-center bg-gradient-to-b from-[#ffffff] to-[#a792f6b5]">
                            <div className="w-full flex justify-between items-center pb-10">
                                <Button
                                    radius="full"
                                    variant="light"
                                    color="secondary"
                                    startContent={<Icon icon="bi:arrow-left" />}
                                    className="mr-4"
                                    onClick={handlePreviousStep}
                                    disabled={step === 1}
                                >
                                    Back
                                </Button>
                                <Progress
                                    value={(step / 7) * 100}
                                    color="secondary"
                                    className="flex-1 mx-4 max-w-xs"
                                    size="sm"
                                />
                                <Button
                                    auto
                                    flat
                                    color="error"
                                    icon={<Icon icon="bi:x" />}
                                    onClick={onClose}
                                />
                            </div>

                            <Image
                                alt="Illustration"
                                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                                width={80}
                                height={80}
                                radius="sm"
                                className="mt-4"
                            />
                            <div className="text-center mt-4">
                                <h2 className="text-3xl font-bold">
                                    Find out what your home is worth with HomePortfolio AI
                                </h2>
                                <p className="text-default-500 font-medium mt-2">
                                    In just a few clicks, you’ll have a detailed valuation tailored
                                    to your home.
                                </p>
                            </div>
                        </ModalHeader>
                        <Divider />
                        <ModalBody className="flex h-1/2 flex-col justify-center">
                            {renderStep()}
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
