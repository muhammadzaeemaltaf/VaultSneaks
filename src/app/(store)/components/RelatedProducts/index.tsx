"use client";

import React, { useState, useEffect } from "react";
import { Product } from "../../../../../sanity.types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { useWishlistStore } from "../../../../../store";
import { HeartIcon } from "lucide-react";

interface RelatedProductsProps {
  products: Product[];
}

const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 md:p-10">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="p-1">
          <div className="relative overflow-hidden group rounded transition-all duration-150 h-[250px] bg-gray-300"></div>
          <div className="py-4 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  const [loading, setLoading] = useState(true);
  const [showNoProductsMessage, setShowNoProductsMessage] = useState(false);

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
    if (products.length > 0) {
      setLoading(false);
    } else {
      setTimeout(() => {
        setLoading(false);
        setShowNoProductsMessage(true);
      }, 2000); // Show loader for 2 seconds
    }
  }, [products]);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (showNoProductsMessage) {
    return (
      <div className="py-10">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <p>No related products found.</p>
      </div>
    );
  }

  return (
    <div className="py-10">
      <h2 className="text-2xl font-bold mb-6 px-4">Related Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 md:p-10">
        {products.map((product, index) => (
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
                  className="object-cover"
                />
                <span className="absolute top-2 right-2 z-10 cursor-pointer w-6 h-6">
                  <HeartIcon
                    className={` active:animate-ping ${
                      wishlistItems.find(
                        (wishlistItem) => wishlistItem._id === product._id
                      )
                        ? "fill-gray-500 "
                        : "text-gray-500"
                    }`}
                    onClick={() => toggleWishlist(product)}
                  />
                </span>
              </div>
              <div className="py-4">
                <div className="text-[15px] font-[500]">
                  {product.productName}
                </div>
                <div className="text-lightColor text-[15px] line-clamp-2">
                  {product.description}
                </div>
                <div className="flex space-x-1 mt-2">
                  {product.colors?.map((color, colorIndex) => (
                    <span
                      key={colorIndex}
                      className="flex justify-center items-center w-4 h-4 rounded-full border"
                    >
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: color }}
                      ></span>
                    </span>
                  ))}
                </div>
                <div className="text-[15px] font-[600] mt-1">
                Rs: <span>{product.price}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
