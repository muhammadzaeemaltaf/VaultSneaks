"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  CartIcon,
  HeaderLinks,
  HeartIcon,
  Logo,
  SearchIcon,
  TopLogo,
} from "@/app/data";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <nav className="bg-themeGray">
        <div className="h-9 container  md:px-[40px]">
          <div className="flex justify-between items-center h-full">
            <span>{TopLogo}</span>

            <div className="flex divide-x-[1px] divide-black text-[11px] h-[26px] items-center  md:w-[272.81px] justify-between">
              <Link href={"/products"} className="flex-1 px-2 md:px-3 whitespace-nowrap">
                Find a Store
              </Link>
              <Link href={"/contact"} className="flex-1 px-2 md:px-3 whitespace-nowrap">
                Help
              </Link>
              <Link href={"/joinus"} className="flex-1 px-2 md:px-3 whitespace-nowrap">
                Join Us
              </Link>
              <Link href={"/login"} className="flex-1 pl-3 whitespace-nowrap">Sign In</Link>
            </div>
          </div>
        </div>
      </nav>

      <header
        className="relative"
        ref={menuRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="container h-[60px] flex justify-between items-center  md:px-[40px]">
          <div className="logo scale-75 md:scale-100 -ml-2 md:ml-0">
            <Link href={"/"} onClick={() => setIsMenuOpen(false)}>{Logo}</Link>
          </div>
          <div className="hidden lg:flex ml-40">
            <ul className="flex text-base gap-5">
              {HeaderLinks.map((link, index) => {
                return (
                  <li key={index}>
                    <Link href={link.link}>{link.title}</Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex gap-6">
              <div className="relative">
                <span className="absolute top-1/2 -translate-y-1/2 left-3 ">
                  {SearchIcon}
                </span>
                <input
                  type="search"
                  placeholder="Search"
                  className="bg-themeGray h-[40px] w-[180px] rounded-full p-2 pl-10"
                />
              </div>
            </div>
            <span >{HeartIcon}</span>
            <Link href={"/cart"} className="relative">{CartIcon}<span className="text-[10px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-0.5">2</span></Link>
            <button className="lg:hidden" onClick={toggleMenu}>
              ☰
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full z-10 bg-white shadow-lg transition-transform duration-300 ease-in-out transform">
            <div className="relative p-4">
              <span className="absolute top-1/2 -translate-y-1/2 left-7 ">
                {SearchIcon}
              </span>
              <input
                type="search"
                placeholder="Search"
                className="bg-themeGray h-[40px] w-full rounded-full p-2 pl-10"
              />
            </div>
            <ul className="flex flex-col text-base gap-2 p-4">
              {HeaderLinks.map((link, index) => {
                return (
                  <li key={index}>
                    <Link href={link.link} onClick={() => setIsMenuOpen(false)}>{link.title}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
