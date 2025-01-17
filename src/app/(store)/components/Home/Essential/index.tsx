import Image from "next/image";
import Link from "next/link";
import React from "react";

const Essential = () => {
  return (
    <div className="container">
      <div className="mb-12 mt-10 md:mt-0">
        <h1 className="text-[23px] font-[500]">The Essentials</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 justify-items-center mb-12 mt-6">
          <Link href="/mens" className="block">
            <div className="overflow-hidden">
              <div className="p-0 relative sm:w-[440px] md:w-auto">
                <Image
                  src="/e1.png"
                  alt="Men's essentials featuring sneakers and clothing"
                  width={400}
                  height={400}
                  className="object-cover md:w-[440px] md:h-[540px]"
                />
                <div className="absolute w-[108.89px] h-[39px] flex justify-center items-center bottom-6 left-6 md:bottom-12 md:left-12 bg-white px-4 py-1 rounded-full">
                  <span className="text-sm font-medium ">Men's</span>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/womens" className="block">
            <div className="overflow-hidden">
              <div className="p-0 relative sm:w-[440px] md:w-auto">
                <Image
                  src="/e2.png"
                  alt="Women's essentials featuring yellow apparel"
                  width={400}
                  height={400}
                  className="object-cover md:w-[440px] md:h-[540px]"
                />
                <div className="absolute w-[108.89px] h-[39px] flex justify-center items-center bottom-6 left-6 md:bottom-12 md:left-12 bg-white px-4 py-1 rounded-full">
                  <span className="text-sm font-medium ">Women's</span>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/kids" className="block">
            <div className="overflow-hidden">
              <div className="p-0 relative sm:w-[440px] md:w-auto">
                <Image
                  src="/e3.png"
                  alt="Kids' essentials featuring yellow lockers"
                  width={400}
                  height={400}
                  className="object-cover md:w-[440px] md:h-[540px]"
                />
                <div className="absolute w-[108.89px] h-[39px] flex justify-center items-center bottom-6 left-6 md:bottom-12 md:left-12 bg-white px-4 py-1 rounded-full">
                  <span className="text-sm font-medium ">Kids'</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:w-[900px] mx-auto">
          <div>
            <h2 className="font-bold mb-4">Icons</h2>
            <ul className="space-y-3 text-xs sm:text-base">
              <li>
                <Link
                  href="/icons/air-force-1"
                  className="text-gray-600 hover:text-black"
                >
                  Air Force 1
                </Link>
              </li>
              <li>
                <Link
                  href="/icons/huarache"
                  className="text-gray-600 hover:text-black"
                >
                  Huarache
                </Link>
              </li>
              <li>
                <Link
                  href="/icons/air-max-90"
                  className="text-gray-600 hover:text-black"
                >
                  Air Max 90
                </Link>
              </li>
              <li>
                <Link
                  href="/icons/air-max-95"
                  className="text-gray-600 hover:text-black"
                >
                  Air Max 95
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold mb-4">Shoes</h2>
            <ul className="space-y-3 text-xs sm:text-base">
              <li>
                <Link
                  href="/shoes/all"
                  className="text-gray-600 hover:text-black"
                >
                  All Shoes
                </Link>
              </li>
              <li>
                <Link
                  href="/shoes/custom"
                  className="text-gray-600 hover:text-black"
                >
                  Custom Shoes
                </Link>
              </li>
              <li>
                <Link
                  href="/shoes/jordan"
                  className="text-gray-600 hover:text-black"
                >
                  Jordan Shoes
                </Link>
              </li>
              <li>
                <Link
                  href="/shoes/running"
                  className="text-gray-600 hover:text-black"
                >
                  Running Shoes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold mb-4">Clothing</h2>
            <ul className="space-y-3 text-xs sm:text-base">
              <li>
                <Link
                  href="/clothing/all"
                  className="text-gray-600 hover:text-black"
                >
                  All Clothing
                </Link>
              </li>
              <li>
                <Link
                  href="/clothing/modest-wear"
                  className="text-gray-600 hover:text-black"
                >
                  Modest Wear
                </Link>
              </li>
              <li>
                <Link
                  href="/clothing/hoodies-pullovers"
                  className="text-gray-600 hover:text-black"
                >
                  Hoodies & Pullovers
                </Link>
              </li>
              <li>
                <Link
                  href="/clothing/shirts-tops"
                  className="text-gray-600 hover:text-black"
                >
                  Shirts & Tops
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold mb-4">Kids'</h2>
            <ul className="space-y-3 text-xs sm:text-base">
              <li>
                <Link
                  href="/kids/infant-toddler"
                  className="text-gray-600 hover:text-black"
                >
                  Infant & Toddler Shoes
                </Link>
              </li>
              <li>
                <Link
                  href="/kids/shoes"
                  className="text-gray-600 hover:text-black"
                >
                  Kids' Shoes
                </Link>
              </li>
              <li>
                <Link
                  href="/kids/jordan"
                  className="text-gray-600 hover:text-black"
                >
                  Kids' Jordan Shoes
                </Link>
              </li>
              <li>
                <Link
                  href="/kids/basketball"
                  className="text-gray-600 hover:text-black"
                >
                  Kids' Basketball Shoes
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Essential;
