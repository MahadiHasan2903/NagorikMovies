import Image from "next/image";
import Link from "next/link";
import React from "react";

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
      <div className="flex items-center justify-between w-full xl:w-[1440px] mx-auto">
        <Link href="/">
          <div className="w-[150px] h-[80px] relative">
            <Image
              src="/nagorik.jpeg"
              alt="logo"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
        </Link>

        {/* Navbar section */}
        <div className="justify-center hidden md:flex">
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
      </div>
    </div>
  );
};

export default Navbar;
