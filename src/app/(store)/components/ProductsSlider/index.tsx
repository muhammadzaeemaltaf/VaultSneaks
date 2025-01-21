"use client";

import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../../../../../sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { useWishlistStore } from "../../../../../store";
import { HeartIcon } from "lucide-react";

const SkeletonLoader = ({ half }: { half?: boolean }) => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-300 rounded w-[150px] mb-4 ml-auto"></div>
    <div className="space-y-4">
      <div className={`flex gap-4 `}>
        <div
          className={`h-64 bg-gray-300 rounded ${half ? "w-full lg:w-1/2" : "w-full md:w-1/3 lg:w-1/4"} mb-4`}
        ></div>
        <div
          className={`h-64 bg-gray-300 rounded ${half ? "w-full hidden" : "w-full md:w-1/3 lg:w-1/4 hidden md:block"} mb-4`}
        ></div>
        <div
          className={`h-64 bg-gray-300 rounded ${half ? "w-full hidden" : "w-full md:w-1/3 lg:w-1/4 hidden lg:block"} mb-4`}
        ></div>
        <div
          className={`h-64 bg-gray-300 rounded ${half ? "w-full hidden lg:block lg:w-1/2" : "w-full md:w-1/3 lg:w-1/4"} mb-4`}
        ></div>
      </div>
    </div>
  </div>
);

const ProductSlider = ({
  heading,
  anchor,
  anchorText,
  half,
  obj,
}: {
  heading?: string;
  anchor: string;
  anchorText: string;
  half?: boolean;
  obj: Product[];
}) => {
  const [loading, setLoading] = useState(true);
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
    if (obj.length > 0) {
      setLoading(false);
    }
  }, [obj]);

  if (loading) {
    return (
      <div className={`${half ? "w-full md:w-1/2" : "container"}`}>
        <div className="md:py-16 space-y-5 relative">
          <div className={`mb-20 md:mb-0`}>
            {heading && (
              <div className="h-8 bg-gray-300 rounded w-[150px] mb-4"></div>
            )}
          </div>
          <SkeletonLoader half={half} />
        </div>
      </div>
    );
  }

  return (
    <div className={`${half ? "w-full md:w-1/2" : "container"}`}>
      <div className="md:py-16 space-y-5 relative">
        <div className={`mb-20 md:mb-0`}>
          {heading && <h1 className="text-[22px] font-[500]">{heading}</h1>}
        </div>

        <div>
          {half ? (
            <Carousel
              className="w-full"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <div className="flex gap-3  absolute right-5 -top-10">
                <Link href={anchor} className="-mt-2.5 text-[15px] font-[500]">
                  {anchorText}
                </Link>
                <CarouselPrevious className="relative top-0 left-0 bottom-0 right-0 md:p-5 border-none bg-themeGray" />
                <CarouselNext className="relative top-0 left-0 bottom-0 right-0 md:p-5 border-none bg-themeGray" />
              </div>
              <CarouselContent className="-ml-1">
                {obj.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-1 basis-full lg:basis-1/2"
                  >
                    <div className="relative">
                      <Link
                        href={`/products/${item.productName}`}
                        className="p-1 relative"
                      >
                        <div className="aspect-square relative overflow-hidden group rounded transition-all duration-150">
                          <Image
                            src={item.image ? urlFor(item.image).url() : ""}
                            alt={item.productName || "Product Image"}
                            height={1000}
                            width={1000}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="py-4">
                          <div className="flex justify-between text-[15px] font-[500] pr-4">
                            <p className="">{item.productName}</p>
                            <p>Rs {item.price}</p>
                          </div>
                          <div className="text-lightColor text-[15px] w-[215px] line-clamp-2">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                      <span className="absolute top-8 right-2 z-[100] cursor-pointer w-6 h-6">
                        <HeartIcon
                          className={` active:animate-ping ${
                          wishlistItems.find(
                            (wishlistItem) => wishlistItem._id === item._id
                          )
                            ? "fill-gray-500 "
                            : "text-gray-500"
                          }`}
                          onClick={() => toggleWishlist(item)}
                        />
                        </span>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          ) : (
            <Carousel
              className="w-full "
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <div className="flex gap-3  absolute right-5 -top-10">
                <Link href={anchor} className="-mt-2.5 text-[15px] font-[500]">
                  {anchorText}
                </Link>
                <CarouselPrevious className="relative top-0 left-0 bottom-0 right-0 p-5 border-none bg-themeGray" />
                <CarouselNext className="relative top-0 left-0 bottom-0 right-0 p-5 border-none bg-themeGray" />
              </div>
              <CarouselContent className="-ml-1">
                {obj.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="relative">
                      <Link
                        href={`/products/${item.productName}`}
                        className="p-1"
                      >
                        <div className="aspect-square relative overflow-hidden group rounded transition-all duration-150">
                          <Image
                            src={item.image ? urlFor(item.image).url() : ""}
                            alt={item.productName || "Product Image"}
                            height={1000}
                            width={1000}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="py-4">
                          <div className="flex justify-between text-[15px] font-[500] pr-4">
                            <p className="">{item.productName}</p>
                            <p>Rs {item.price}</p>
                          </div>
                          <div className="text-lightColor text-[15px] line-clamp-2 w-[80%]">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                        <span className="absolute top-8 right-2 z-[100] cursor-pointer w-6 h-6">
                        <HeartIcon
                          className={` active:animate-ping ${
                          wishlistItems.find(
                            (wishlistItem) => wishlistItem._id === item._id
                          )
                            ? "fill-gray-500 "
                            : "text-gray-500"
                          }`}
                          onClick={() => toggleWishlist(item)}
                        />
                        </span>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
