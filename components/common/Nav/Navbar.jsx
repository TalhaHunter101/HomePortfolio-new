"use client";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Button,
  Image,
} from "@nextui-org/react";
import DropDown from "./DropDown";
import Link from "next/link";
// import {AcmeLogo} from "./AcmeLogo.jsx";
import { usePathname } from "next/navigation";
import { storeUsersData } from "@/store/authStore";
import pb from "@/lib/pocketbase";

export default function NavBar() {
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      pb.authStore.model ? setIsLoggedin(true) : setIsLoggedin(false);
    }
  }, [pb.authStore.model]);

  const handleLOgout = () => {
    pb.authStore.clear();
    setIsLoggedin(false);

    localStorage.removeItem("pocketbase_auth");
  };

  let pathname = usePathname();

  // check if the url contains the word "home-valuation"
  let isHomeValuation = pathname ? pathname.includes("report") : false;

  if (isHomeValuation) {
    return <div></div>;
  }

  const menuItems = [
    {
      name: "Home",
      link: "/",
    },
  ];

  return (
    <Navbar className="fixed z-50 " disableAnimation isBordered>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand as={Link} href={"/"}>
          {/* <AcmeLogo /> */}

          <p className="font-bold text-inherit">HomePortfolio</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <Link href={"/"}>
            <p className="font-bold text-inherit">HomePortfolio</p>
            {/* <img src="/HpLogo.jpeg" alt="logo" className="h-10 w-32 object-contain" /> */}
          </Link>
        </NavbarBrand>
        {/* <DropDown>
<NavbarItem key="item">
    <div className="">Features</div>
  </NavbarItem>
</DropDown> */}
        {/* <NavbarItem>
          <Link color="foreground" href="#" >
            Best Places
          </Link>
        </NavbarItem> */}
        <NavbarItem>
          <Link color="foreground" href="/home-valuation">
            Home valuation
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/AboutUs">
            About us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/ContactUs">
            Contact us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Blogs
          </Link>
        </NavbarItem>
        {/* <NavbarItem>
          <Link color="foreground" href="/neighbourhood-guide">
          Neighbourhood Guide
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/ranking">
          Rankings
          </Link>
        </NavbarItem> */}
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        {isLoggedin ? (
          <>
            <NavbarItem>
              <Link color="foreground" href="/dashboard">
                Dashboard
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button color="danger" onClick={handleLOgout}>
                Logout
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Button as={Link}  href="/login" color="primary"  variant="bordered">
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link}  href="/register" color="primary" variant="flat" className=" font-bold">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href={item.link}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
