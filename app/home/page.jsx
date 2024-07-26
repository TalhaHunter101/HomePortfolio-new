'use client';

import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Input, Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Icon } from "@iconify/react";

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

export default function Home() {
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
            <Navbar className="absolute top-0 left-0 w-full z-10">
              <div className="flex justify-start">
                <NavbarContent className="flex-grow justify-start">
                  <NavbarBrand className="flex h-16 items-center">
                    <p className="font-bold text-2xl text-inherit">Dummyname</p>
                  </NavbarBrand>

                  <Dropdown>
                    <DropdownTrigger>
                      <Button endContent={<Icon icon="mdi:chevron-down" />} className="text-2xl" radius="none" variant="light">Buy</Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem key="new">New file</DropdownItem>
                      <DropdownItem key="copy">Copy link</DropdownItem>
                      <DropdownItem key="edit">Edit file</DropdownItem>
                      <DropdownItem key="delete" className="text-danger" color="danger">
                        Delete file
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button endContent={<Icon icon="mdi:chevron-down" />} className="text-2xl" radius="none" variant="light">Sell</Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem key="new">New file</DropdownItem>
                      <DropdownItem key="copy">Copy link</DropdownItem>
                      <DropdownItem key="edit">Edit file</DropdownItem>
                      <DropdownItem key="delete" className="text-danger" color="danger">
                        Delete file
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button endContent={<Icon icon="mdi:chevron-down" />} className="text-2xl" radius="none" variant="light">Resource</Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem key="new">New file</DropdownItem>
                      <DropdownItem key="copy">Copy link</DropdownItem>
                      <DropdownItem key="edit">Edit file</DropdownItem>
                      <DropdownItem key="delete" className="text-danger" color="danger">
                        Delete file
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Button radius="none" className="text-2xl" variant="light">Feed</Button>
                </NavbarContent>
              </div>
              <div className="flex justify-end">
                <NavbarContent justify="end">
                  <NavbarItem className="hidden lg:flex">
                    <Link className="text-2xl" href="#">Login</Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Button className="text-2xl" as={Link} color="primary" href="#" variant="flat">
                      Sign Up
                    </Button>
                  </NavbarItem>
                </NavbarContent>
              </div>
            </Navbar>
            <div className="w-1/2 z-10 relative flex flex-col gap-y-32px items-center justify-center h-full text-center">
              <h1 className="text-white text-[70px] sm:text-[5xl] md:text-[6xl] text-shadow-4 font-serif">
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
                  <Card key={index} className="p-4 bg-black border border-default-200">
                    <h3 className="text-default-500 mt-2">{feature.description}</h3>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[15vh] bg-black">
          <h1 className="text-white">forbes, mynaui, nextjs, tailwind</h1>
        </div>
        <div className="flex flex-col p-24  w-full justify-center ">
            <h1 className="text-black font-serif text-7xl">Don’t buy a home without Flyhomes AI.</h1>
            <p>Find your exact match with powerful market insights.</p>
            <div className="w-full grid grid-cols-1 gap-6 mt-4 md:grid-cols-2 lg:grid-cols-2">
                <div className="flex flex-col mt-5 justify-start">
                    <div className="w-full ">
                    <div className=" font-serif text-5xl pb-5">
                                <h1>Ask about Home</h1>
                            </div>
                    <div className="pb-5 ">
                        <Input
                            bordered
                            clearable
                            fullWidth
                            color="gray"
                            size="lg"
                            placeholder="is there high seismic risk"
                            
                        />
                    </div>
                    <div className="pb-5">
                          
                    <Input
                            bordered
                            clearable
                            fullWidth
                            color="gray"
                            size="lg"
                            placeholder="is this home near a voltage line"
                             
                        />
                    </div>
                    <div className="pb-5">
                    <Input
                            bordered
                            clearable
                            fullWidth
                            color="gray"
                            size="md"
                            placeholder="what repairs have been done"
                           
                        />
                    </div>
                    <div className="pb-5">
                    <Input
                            bordered
                            clearable
                            fullWidth
                            color="gray"
                            size="md"
                            placeholder="hows the air quality"
                           
                        />
                    </div>


                    </div>
                </div>
                <div className="flex flex-col justify-center ml-20 mt-5 items-center w-[300px] h-[280px] justify-end">
                <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Daily Mix</p>
        <small className="text-default-500">12 Tracks</small>
        <h4 className="font-bold text-large">Frontend Radio</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://nextui.org/images/hero-card-complete.jpeg"
          width={270}
        />
      </CardBody>
    </Card>
                </div>

            </div>
        </div>
      </main>
    </>
  );
}
