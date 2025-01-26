"use client";

import React, { useEffect, useRef, useState } from "react";
import { categories, FilterIcon } from "@/app/data";
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
import { ChevronDown, ChevronLeft, ChevronRight, HeartIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Category, Product } from "../../../../sanity.types";
import { getAllProducts } from "@/sanity/products/getAllProducts";
import { getProductByCategory } from "@/sanity/products/getProductByCategory";
import { getProductsUnderPriceRange } from "@/sanity/products/getProductsUnderPriceRange";
import { urlFor } from "@/sanity/lib/image";
import { getAllCategories } from "@/sanity/category/getAllCategories";
import { useWishlistStore } from "../../../../store";

const genderOptions = ["Men", "Women", "Unisex"];
const priceRanges = ["Under Rs 2,500.00", "Rs 2,501.00 - Rs 5,000.00", "Rs 5,001.00+"];

const SkeletonLoader = () => (
  <div className="animate-pulse w-full">
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className="p-1">
          <div className="relative overflow-hidden group rounded transition-all duration-150 h-[348px] bg-gray-300"></div>
          <div className="py-4 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SidebarSkeletonLoader = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
    <div className="space-y-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="h-4 bg-gray-300 rounded w-full"></div>
      ))}
    </div>
    <hr />
    <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
    <div className="space-y-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="h-4 bg-gray-300 rounded w-full"></div>
      ))}
    </div>
    <hr />
    <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
    <div className="space-y-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="h-4 bg-gray-300 rounded w-full"></div>
      ))}
    </div>
  </div>
);

const Page = () => {
  const [Products, setProducts] = useState<Product[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sortLoading, setSortLoading] = useState(true);
  const [sortBy, setSortBy] = useState("name");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [Categories, setCategories] = useState<Category[] | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(
    null
  );
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const productsPerPage = 9;
  const totalPages = Math.ceil(Products.length / productsPerPage);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const { addItem, removeItem, getItems } = useWishlistStore();
  const wishlistItems = getItems();

  const toggleWishlist = (product: Product) => {
    if (wishlistItems.find((item) => item._id === product._id)) {
      removeItem(product._id);
    } else {
      addItem(product);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setSortLoading(true);
      let data;
      if (selectedCategories.length > 0) {
        data = await getProductByCategory(selectedCategories);
      } else if (selectedPriceRange) {
        data = await getProductsUnderPriceRange(selectedPriceRange);
      } else if (selectedGender) {
        data = await getProductByCategory([selectedGender]);
      } else {
        data = await getAllProducts(sortBy);
      }
      setTimeout(() => {
        setProducts(data);
        setLoading(false);
        setSortLoading(false);
      }, 500);
    };
    fetchProducts();
  }, [sortBy, selectedCategories, selectedPriceRange, selectedGender]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsFilterOpen(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((category) => category !== value)
        : [...prev, value]
    );
    setSelectedPriceRange(null);
    setSelectedGender(null);
  };

  const handlePriceRangeChange = (value: string | null) => {
    if (selectedPriceRange === value) {
      setSelectedPriceRange(null);
    } else {
      setSelectedPriceRange(value);
      setSelectedCategories([]);
      setSelectedGender(null);
    }
  };

  const handleGenderChange = (value: string | null) => {
    if (selectedGender === value) {
      setSelectedGender(null);
    } else {
      setSelectedGender(value);
      setSelectedCategories([]);
      setSelectedPriceRange(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="py-10 relative">
          <div className="flex mt-6">
            <div className="w-[260px] filterMenu fixed z-20 top-0 pt-20 lg:pt-0 pl-3 lg:pl-0 bg-white lg:relative lg:!left-0 transition-all duration-300 overflow-y-scroll h-screen pb-[400px]">
              <SidebarSkeletonLoader />
            </div>
            <div className="lg:w-[1092px] lg:pl-10 w-full">
              <SkeletonLoader />
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            All ({Products.length})
          </div>
          <div className="flex gap-3">
            <p
              className="flex items-center gap-2 text-base cursor-pointer lg:hidden"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              {isFilterOpen ? "Hide Filter" : "Show Filter"}{" "}
              <span>{FilterIcon}</span>
            </p>
            <Select
              onValueChange={(value) => {
                setSortBy(value);
                setSortLoading(false);
              }}
            >
              <SelectTrigger className="w-[100px] border-none shadow-none focus:ring-0">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="productName">Name</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
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
                New ({Products.length})
              </div>

              <hr />
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between py-2 text-sm">
                  Categories
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 py-2">
                  {Categories &&
                    Categories.map((category, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                          id={category.categoryName || ""}
                          checked={selectedCategories.includes(category.categoryName || "")}
                          onCheckedChange={() =>
                            handleCategoryChange(category.categoryName || "")
                          }
                        />
                        <label htmlFor={category.categoryName || ""} className="text-sm">
                          {category.categoryName}
                        </label>
                      </div>
                    ))}
                </CollapsibleContent>
              </Collapsible>

              {/* <hr />
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between py-2 text-sm">
                  Gender
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 py-2">
                  {genderOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={option}
                        onCheckedChange={() => handleGenderChange(option)}
                      />
                      <label htmlFor={option} className="text-sm">
                        {option}
                      </label>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible> */}

              <hr />
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between py-2 text-sm">
                  Shop By Price
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 py-2">
                  {priceRanges.map((range) => (
                    <div key={range} className="flex items-center space-x-2">
                      <Checkbox
                        id={range}
                        checked={selectedPriceRange === range}
                        onCheckedChange={() => handlePriceRangeChange(range)}
                      />
                      <label htmlFor={range} className="text-sm">
                        {range}
                      </label>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>

          <div className="lg:w-[1092px] lg:pl-10 w-full">
            {" "}
            {/* Products Section */}
            <div className="text-sm">
              Showing {startProduct}-{endProduct} of {Products.length} items
            </div>
            {sortLoading ? (
              <SkeletonLoader />
            ) : Products.length === 0 ? (
              <div className="text-center py-10">No product found</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* Product cards */}
                {displayedProducts.map((product, index) => (
                  <div key={index}>
                    <div className="p-1 relative">
                      <Link
                        href={`/products/${product.productName}`}
                        className="absolute inset-0 z-10"
                      />
                      <div className="relative overflow-hidden group rounded transition-all duration-150">
                        <Image
                          src={product.image ? urlFor(product.image).url() : ""}
                          alt={product.productName || "Product Image"}
                          height={1000}
                          width={1000}
                          className="sm:h-[348px] sm:w-[348px] object-cover"
                        />

                        <span className="absolute top-2 right-2 z-10  cursor-pointer w-6 h-6">
                          <HeartIcon
                            className={` active:animate-ping ${
                              wishlistItems.find(
                                (wishlistItem) =>
                                  wishlistItem._id === product._id
                              )
                                ? "fill-gray-500 "
                                : "text-gray-500"
                            }`}
                            onClick={() => toggleWishlist(product)}
                          />
                        </span>

                        {sortBy === "category" && (
                          <div className="text-lightColor text-[15px] absolute z-10 top-2 left-2 bg-white px-2 py-1 rounded">
                            {product.categoryName! || "Unknown Category"}
                          </div>
                        )}
                      </div>
                      <div className="py-2">
                      <span className="text-[#9E3500] text-[15px] font-[500]">
                        {product.status}
                      </span>
                        <div className="text-[15px] font-[600] mt-2">
                          {product.productName}
                        </div>

                        <div className="text-lightColor text-[15px] line-clamp-2">
                          {product.description}
                        </div>
                        <div className="flex gap-2">
                          {product.colors?.map((color, colorIndex) => (
                            <span
                              key={colorIndex}
                              className={`flex justify-center items-center w-4 h-4 rounded-full border mt-1 cursor-pointe`}
                            >
                              <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: color }}
                              ></span>
                            </span>
                          ))}
                        </div>
                        <div className="text-[15px] font-[600] mt-1">
                          PKR : <span>{product.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Pagination */}
        <div className="flex justify-center items-center mt-6">
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="w-6 h-6 rounded-full text-xs bg-gray-200 flex items-center justify-center"
              disabled={currentPage === 1}
            >
              <ChevronLeft  className="h-5 w-5"/>
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`w-6 h-6 rounded-full text-xs ${
                  currentPage === index + 1
                    ? "bg-black text-white"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="w-6 h-6 rounded-full text-xs bg-gray-200 flex items-center justify-center"
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-5 w-5"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
