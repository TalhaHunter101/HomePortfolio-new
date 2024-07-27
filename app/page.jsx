'use client';

import React from "react";
import { Button, Input, Card, CardHeader, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Link from "next/link";

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
    description: "public transit near me",
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

let questions2 = [
  {
    description: "show me family friendly neighborhoods",
    value: "family",
    cardDetails: {
      title: "Family details",
      description: "The neighborhood is family friendly",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    }
  },
  {
    description: "hows the market right now",
    value: "market",
    cardDetails: {
      title: "Market Details",
      description: "The market is good",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    }
  },
  {
    description: "homes built after 1980",
    value: "year",
    cardDetails: {
      title: "Year Built",
      description: "The home was built after 1980",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    }
  },
  {
    description: "tell me more about the area",
    value: "air",
    cardDetails: {
      title: "Air Quality",
      description: "The air quality is good",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    }
  },
];

const places = [
  { id: 1, location: "London", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 2, location: "Manchester", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 3, location: "Liverpool", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 4, location: "Nottingham", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 5, location: "Bristol", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 6, location: "Leeds", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 7, location: "Birmingham", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 8, location: "Clacton-on-Sea", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 9, location: "Stratford-upon-Avon", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 10, location: "Norwich", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
];
let places1 = [
  { id: 1, location: "London", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 2, location: "Manchester", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 3, location: "Liverpool", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 4, location: "Nottingham", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 5, location: "Bristol", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 6, location: "Leeds", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 7, location: "Birmingham", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 8, location: "Clacton-on-Sea", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 9, location: "Stratford-upon-Avon", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 10, location: "Norwich", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
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
            <div className="w-11/12 lg:w-1/2 z-10 relative flex flex-col gap-y-8 items-center justify-center h-full text-center">
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
        <div className="flex flex-col p-8 md:p-24 w-full justify-center ">
          <h1 className="text-black font-serif lg:text-6xl md:5xl sm:text-3xl">Don’t buy a home without HomePortfolio AI.</h1>
          <p className="mt-2">Find your exact match with powerful market insights.</p>
          <div className="w-full grid grid-cols-1 gap-6 mt-4 md:grid-cols-2 lg:grid-cols-2">
            <div className="flex flex-col mt-5 justify-start">
              <div className="w-full">
                <div className="font-serif text-5xl pb-5">
                  <h1>Ask about Home</h1>
                </div>

                {questions.map((question, index) => (
                  <div key={index} className="pb-5">
                    <button
                      onMouseOver={() => {
                        console.log(question.value);
                        setSelectedQuestionKey(question.value);
                      }}
                      className="w-full flex text-left p-2 rounded-lg hover:bg-black hover:text-white"
                    >
                      {question.description}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col ml-0 md:ml-20 mt-5 items-center w-full md:w-[300px] h-[280px] justify-end">
              {SelectedQuestionKey &&
                questions.map((question, index) => {
                  if (question.value === SelectedQuestionKey) {
                    return (
                      <motion.div
                        key={index}
                        initial={{
                          x: 0,
                          y: 0,
                          scale: 0.8,
                        }}
                        animate={{
                          x: -5,
                          y: 1,
                          scale: 1,
                          duration: 2,
                        }}
                      >
                        <Card
                          color="primary"
                          variant="bordered"
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
        <div className="flex flex-col p-8 md:p-24 w-full justify-center ">
          <div className="w-full grid grid-cols-1 gap-6 mt-4 md:grid-cols-2 lg:grid-cols-2">
            <div className="flex flex-col mt-5 justify-start">
              <div className="w-full">
                <div className="font-serif text-5xl pb-5">
                  <h1>Look for a Home.</h1>
                </div>

                {questions2.map((question, index) => (
                  <div key={index} className="pb-5">
                    <button
                      onMouseOver={() => {
                        console.log(question.value);
                        setSelectedQuestionKey(question.value);
                      }}
                      className="w-full flex text-left p-2 rounded-lg hover:bg-black hover:text-white"
                    >
                      {question.description}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col ml-0 md:ml-20 mt-5 items-center w-full md:w-[300px] h-[280px] justify-end">
              {SelectedQuestionKey &&
                questions2.map((question, index) => {
                  if (question.value === SelectedQuestionKey) {
                    return (
                      <motion.div
                        key={index}
                        initial={{
                          x: 0,
                          y: 0,
                          scale: 0.8,
                        }}
                        animate={{
                          x: -5,
                          y: 1,
                          scale: 1,
                          duration: 2,
                        }}
                      >
                        <Card
                          color="primary"
                          variant="bordered"
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
          <div className="flex flex-col p-8 md:p-24 w-full items-center ">
            <div className="font-serif pb-4">
              <p>Ready to see what AI can do for you?</p>
            </div>
            <Button className="w-[300px] flex items-center flex-col p-2 rounded-lg hover:bg-black hover:text-white">
              Start your AI powered search
            </Button>
          </div>
        </div>
        <div className="flex flex-col p-8 md:p-24 w-full justify-center ">
          <div className="w-full grid items-center justify-center">
            <h1 className="font-serif text-5xl pb-5">Your dream home is out there, let us find it</h1>
          </div>
          <div className="w-full text-center text-2xl grid items-center justify-center">
            <p>So you’re looking for your dream home but you have some pretty specific requirements? HomePortfolio’s here to help you.</p>
            <br />
            <p>We love picky homebuyers! With more home data and search filters than anyone else, there’s no better place for your home search.</p>
          </div>
          <div className="flex flex-col p-5 w-full items-center ">
            <Button className="w-[300px] flex items-center flex-col p-2 rounded-lg hover:bg-black hover:text-white">
              Browse new builds for sale
            </Button>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {places.map((place, index) => (
              <Card
                isHoverable={true}
                key={place.id}
                className={`border-none transition-transform transform hover:scale-105 cursor-pointer`}
                isFooterBlurred
                radius="lg"
              >
                <Image
                  alt={`Image of ${place.location}`}
                  className="object-cover"
                  height={200}
                  src={place.imageUrl}
                  width="100%"
                />
                <CardFooter className="justify-between bg-white/10 border-white/20 border-1 py-1 absolute rounded-lg bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                  <p className="text-tiny text-white/80">{place.location}</p>
                  <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
                    View homes
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        <div className="flex flex-col p-8 md:p-24 bg-gray-100 w-full justify-center ">
          <div className="w-full grid items-center justify-center">
            <h1 className="text-5xl font-bold pb-5">Data you can trust, all in one place for free, instantly</h1>
          </div>
          <div className="w-full text-center flex text-xl grid items-center justify-center">
            <p>HomePortfolio provides a comprehensive database and in-depth analysis for every UK new residential property, neighbourhood, town, city and school - in one platform - for free.</p> <br />
            <p>We put together all the residential property data and mix in demographics, macro-economic, school quality, planning applications, crime rate, energy efficiency, environmental, census, local information data, and much more, enabling you to quickly streamline your research and diligence, make informed decisions with confidence - save time and effort.</p>
          </div>
          <Card className="flex flex-col md:flex-row justify-between items-center mt-10 shadow-cardShadow py-2 px-5 rounded-md bg-white">
            <div className="flex flex-col p-10 justify-start">
              <h3 className="my-4 md:text-3xl font-bold text-[#101828]">250+ comparison datapoints</h3>
              <div className="w-full md:w-1/2 grid justify-start">
                <p className="text-xl">Narrow down your new dream home search with over 250 comparison datapoints! With the most in-depth analysis available anywhere else, find homes that fits your needs, wants, budget, and more.</p>
              </div>
              <div className="w-full md:w-1/2 grid pt-5 justify-start">
                <Button className="w-[300px] flex items-center flex-col p-2 rounded-lg hover:bg-black hover:text-white">
                  Browse
                </Button>
              </div>
            </div>
            <div className="w-full grid items-center justify-end">
              <Image
                width={400}
                height={400}
                alt="NextUI hero Image"
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              />
            </div>
          </Card>
        </div>
        <div className="flex flex-col py-8 md:py-24 w-full justify-center">
          <div className="w-full p-10 grid bg-blue-100 items-center justify-start">
            <h3 className="text-3xl font-bold pb-5">Popular Nearby Developments</h3>
          </div>
          <div className="w-full grid items-center justify-end">
            {/* <Button variant="faded">
              Search Developments
            </Button> */}
          </div>
          <div className="flex flex-col w-full grid p-10">
            <div className="w-full p-10 grid items-center justify-start">
              <h4 className="text-3xl font-bold pb-5">Explore by regions</h4>
              <p className="text-xl">HomePortfolio provides a comprehensive database and in-depth analysis for every new UK residential property, neighbourhood, town, city and school - in one platform - for free. Explore the best new homes developments across the UK, by clicking on the region to get the right information about the area you will love to live</p>
              <div className="w-full grid items-center justify-start">
                <div className="grid pt-10 grid-cols-1 sm:grid-cols-2 gap-4">
                  {places1.map((place) => (
                    <Card
                      key={place.id}
                      isHoverable
                      className="border-none flex flex-row items-center"
                      radius="lg"
                    >
                      <div className="relative">
                        <Image
                          alt={`Image of ${place.location}`}
                          height={100}
                          shadow="md"
                          src={place.imageUrl}
                          width={100}
                        />
                      </div>

                      <div className="flex-grow p-4">
                        <p className="text-md font-semibold">{place.location}</p>
                      </div>
                      <Icon icon="mdi:chevron-right" width="24" height="24" />
                    </Card>
                  ))}
                </div>
              </div>
            </div>
            {/* map to be integrated */}
            <div className="w-full grid items-center justify-end">
              <p>map to be integrated</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
