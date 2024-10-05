"use client"
import React from "react";
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, Button} from "@nextui-org/react";
import DropDown from "./DropDown"
import Link from "next/link";
// import {AcmeLogo} from "./AcmeLogo.jsx";
import { usePathname } from "next/navigation";










export default function NavBar() {



  let pathname = usePathname();


  console.log(pathname);
  // check if the url contains the word "home-valuation"
  let isHomeValuation = pathname ? pathname.includes("home-valuation") : false;

  if (isHomeValuation) {
    return (
      <div>
      </div>
    )
  }



  const menuItems = [
{
  name: "Home",
  link: "/"
}
  ];

  return (
    <Navbar className="fixed z-50 " disableAnimation isBordered>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand as={Link} href={'/'}>
          {/* <AcmeLogo /> */}

          <p className="font-bold text-inherit">HomePortfolio</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <Link href={'/'}>
          <p className="font-bold text-inherit">HomePortfolio</p>
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
          <Link color="foreground" href="#">
          About us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
         Blogs
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/login">Login</Link>
        </NavbarItem>



        <NavbarItem>
          <Button as={Link} color="secondary" className="font-semibold text-white" href="/register">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
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
