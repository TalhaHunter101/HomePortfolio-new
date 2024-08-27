'use client'
import { useState } from "react"
import { ReportModal } from "@/components/QuestionFlow/QfModal"
import { Icon } from "@iconify/react"
import { Input, Button, Card, useDisclosure } from "@nextui-org/react"


export default function Component() {
  
  const [isModalOpen, setModalOpen] = useState(false); // Use useState to manage modal state

  const handleOpenModal = () => setModalOpen(true); // Function to open the modal
  const handleCloseModal = () => setModalOpen(false); 
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
          />
         <Button auto flat className="font-bold" color="secondary" onPress={handleOpenModal}>
            Get My Report
          </Button>
         
        </Card>
      </div>
      <ReportModal isOpen={isModalOpen} onOpenChange={handleCloseModal} /> 
      <div className="mt-8 flex flex-row justify-center space-x-4 text-muted-foreground">
        {/* <span>As seen on:</span>
        <img src="/placeholder.svg" alt="CP24" className="h-6" />
        <img src="/placeholder.svg" alt="OMNI" className="h-6" />
        <img src="/placeholder.svg" alt="CTV" className="h-6" />
        <img src="/placeholder.svg" alt="Radio One" className="h-6" /> */}
      </div>
    </div>
  )
}

