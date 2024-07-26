'use client';

import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Input, Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

let features = [
  {
    description: "Are There any facilities nearby",
  },
  {
    description: "learn about the location",
  },
  {
    description: "show me homes",
  },
  {
    description: "public transut near me",
  },
];

let questions = [
  {
    description: "is there high seismic risk",
    value: "risk",
    cardDetails: {
      title: "Seismic Risk",
      description: "The risk of an earthquake is high",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    }
  },
  {
    description: "is this home near a voltage line",
    value: "voltage",
    cardDetails: {
      title: "Voltage Line",
      description: "The home is near a voltage line",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    }
  },
  {
    description: "what repairs have been done",
    value: "repairs",
    cardDetails: {
      title: "Repairs",
      description: "The home has had repairs",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    }
  },
  {
    description: "hows the air quality",
    value: "air",
    cardDetails: {
      title: "Air Quality",
      description: "The air quality is good",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    }
  },
];







export default function Home() {



  const [SelectedQuestionKey, setSelectedQuestionKey] = React.useState(null);


  return (
    <>
      <main>
        <div className="relative min-h-screen">
          <div
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              minHeight: "100vh",
            }}
            className="flex items-center justify-center"
          >
            <div className="w-1/2 z-10 relative flex flex-col gap-y-32px items-center justify-center h-full text-center">
              <h1 className="text-white lg:text-6xl sm:text-4xl md:text-5xl text-shadow-4 font-serif">
                The world’s first
                <br />
                AI-powered home search.
              </h1>
              <div className="w-full">
                <Input
                  bordered
                  clearable
                  fullWidth
                  color="primary"
                  size="lg"
                  placeholder="Search for homes"
                  endContent={<Icon icon="mynaui:search-square" className="text-black " width="3rem" height="3rem" />}
                />
              </div>

              <div className="w-full grid grid-cols-1 gap-6 mt-4 md:grid-cols-2 lg:grid-cols-2">
                {features.map((feature, index) => (
                  <Button key={index} className="w-full h-12 text-start p-2 rounded-lg bg-primary-50 hover:bg-black hover:text-white">
                    {feature.description}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-24  w-full justify-center ">
          <h1 className="text-black font-serif lg:text-6xl md:5xl sm:3xl">Don’t buy a home without HomePortfolio AI.</h1>
          <p>Find your exact match with powerful market insights.</p>
          <div className="w-full grid grid-cols-1 gap-6 mt-4 md:grid-cols-2 lg:grid-cols-2">
            <div className="flex flex-col mt-5 justify-start">
              <div className="w-full ">
                <div className=" font-serif text-5xl pb-5">
                  <h1>Ask about Home</h1>
                </div>

                {questions.map((question, index) => (
                  <div key={index} className="pb-5">
                    <button
                      onMouseOver={() => {
                        console.log(question.value);
                        setSelectedQuestionKey(question.value);
                      }}
                      className="w-full flex  text-left p-2 rounded-lg hover:bg-black hover:text-white"
                    >
                      {question.description}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col  ml-20 mt-5 items-center w-[300px] h-[280px] justify-end">
              {SelectedQuestionKey &&
                questions.map((question, index) => {
                  if (question.value === SelectedQuestionKey) {
                    return (
                       
                      <motion.div  key={index}   
                    
                      initial={{
                        x: 0,
                        y: 0,
                        scale: 0.8,
                        // rotate: 0,
                      }}
                    
                      animate={{
                        x: -5,
                        y: 1,
                        scale: 1,
                        duration: 2,
                        // rotate: 23,
                      }}                  
                   
                   >

                      <Card
                        color="primary"
                        variant="bordered"
                        width="300px"
                        height="280px"
                        className="animate-fade-in"
                      >
                        <CardHeader>
                          <h4>{question.cardDetails.title}</h4>
                        </CardHeader>
                        <CardBody>
                          <p>{question.cardDetails.description}</p>
                          <Image src={question.cardDetails.image} alt="image" />
                        </CardBody>
                      </Card>
                      </motion.div>

                    );
                  }
                })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
