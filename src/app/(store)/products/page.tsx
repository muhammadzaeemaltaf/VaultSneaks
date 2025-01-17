"use client";

import React, { useEffect, useRef, useState } from "react";
import { categories, FilterIcon, Products } from "../../../data";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

const genderOptions = ["Men", "Women", "Unisex"];
const kidsOptions = ["Boys", "Girls"];
const priceRanges = ["Under ₹2,500.00", "₹2,501.00 - ₹5,000.00", "₹5,001.00+"];

const Page = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const totalPages = Math.ceil(Products.length / productsPerPage);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsFilterOpen(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const displayedProducts = Products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = Math.min(currentPage * productsPerPage, Products.length);

  return (
    <div className="container">
      <div className="py-10 relative">
        {/* Header Section */}
        <div className="flex justify-end lg:justify-between items-center">
          <div className="w-[260px] text-2xl font-medium hidden lg:block">
            New (500)
          </div>
          <div className="flex gap-3">
            <p
              className="flex items-center gap-2 text-base cursor-pointer lg:pointer-events-none"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              {isFilterOpen ? "Hide Filter" : "Show Filter"}{" "}
              <span>{FilterIcon}</span>
            </p>
            <Select>
              <SelectTrigger className="w-[100px] border-none shadow-none focus:ring-0">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="category">Category</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex mt-6">
          {/* Filter Sidebar */}
          <div
            ref={menuRef}
            className={`w-[260px] filterMenu fixed z-20 top-0 pt-20 lg:pt-0 pl-3 lg:pl-0 bg-white lg:relative lg:!left-0 transition-all duration-300 ${
              isFilterOpen ? "left-0" : "-left-full"
            } overflow-y-scroll h-screen pb-[400px]`}
          >
            <div className="w-[192px] space-y-4 ">
              <div className="text-2xl font-medium block lg:hidden">
                New (500)
              </div>

              {categories.map((category, index) => (
                <ul key={`${category}-${index}`}>
                  <li className="text-[15px] space-y-1 pr-6">{category}</li>
                </ul>
              ))}

              <hr />
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between py-2 text-sm">
                  Gender
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 py-2">
                  {genderOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox id={option} />
                      <label htmlFor={option} className="text-sm">
                        {option}
                      </label>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              <hr />
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between py-2 text-sm">
                  Kids
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 py-2">
                  {kidsOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox id={option} />
                      <label htmlFor={option} className="text-sm">
                        {option}
                      </label>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              <hr />
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between py-2 text-sm">
                  Shop By Price
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 py-2">
                  {priceRanges.map((range) => (
                    <div key={range} className="flex items-center space-x-2">
                      <Checkbox id={range} />
                      <label htmlFor={range} className="text-sm">
                        {range}
                      </label>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>

          <div className="lg:w-[1092px] lg:pl-10">
            {" "}
            {/* Products Section */}
            <div className="text-sm">
              Showing {startProduct}-{endProduct} of {Products.length} items
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Product cards */}
              {displayedProducts.map((product, index) => (
                <div key={index}>
                  <div className="p-1 relative">
                    <Link
                      href={`/products/${product.id}`}
                      className="absolute inset-0 z-10"
                    />
                    <div className="relative overflow-hidden group rounded transition-all duration-150">
                      <Image
                        src={product.image}
                        alt={product.name}
                        height={1000}
                        width={1000}
                        className="h-[348px] w-[348px] object-cover"
                      />
                    </div>
                    <div className="py-4">
                      <span className="text-[#9E3500] text-[15px] font-[500]">
                        {product.tag}
                      </span>
                      <div className="text-[15px] font-[500]">
                        {product.name}
                      </div>
                      <div className="text-lightColor text-[15px]">
                        {product.shortDescription}
                      </div>
                      <div className="text-lightColor text-[15px]">
                        {product.colors.length} Color
                      </div>
                      <div className="text-[15px] font-[600] mt-1">
                        MRP : <span>{product.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Pagination */}
        <div className="flex justify-center items-center mt-6">
          <div className="flex">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 mx-1 ${
                  currentPage === index + 1
                    ? "bg-black text-white"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
