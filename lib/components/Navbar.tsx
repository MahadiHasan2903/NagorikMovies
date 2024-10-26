import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";

export const navItems = [
  { to: "/", label: "Home" },
  { to: "#about", label: "About" },
  { to: "#contact-us", label: "Contact Us" },
  { to: "#privacy", label: "Privacy Policy" },
  { to: "#help", label: "Help" },
];

const Navbar = () => {
  return (
    <div className="w-full relative z-[99] flex items-center justify-center bg-white">
      <div className="flex items-center justify-between w-full xl:w-[1440px] mx-auto pr-5 lg:pr-0">
        <Link href="/">
          <div className="w-[100px] lg:w-[200px] h-[80px] relative text-left">
            <Image
              src="/logo.png"
              alt="logo"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
        </Link>

        {/* Navbar section */}
        <div className="justify-center hidden xl:flex">
          <div className="relative flex items-center w-full gap-x-5 lg:gap-x-8 xl:gap-x-12">
            {navItems.map((link, index) => (
              <Link
                key={index}
                href={link.to}
                className="text-sm font-medium transition-all lg:text-lg text-black hover:text-blue-500"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <RxHamburgerMenu size={25} className="block xl:hidden cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
