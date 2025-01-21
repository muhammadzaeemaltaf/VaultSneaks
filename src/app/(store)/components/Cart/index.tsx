"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { DeleteIcon, HeartIcon } from "@/app/data";
import Link from "next/link";
import { useBasketStore } from "../../../../../store";
import { urlFor } from "@/sanity/lib/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SkeletonLoader = () => (
  <div className="animate-pulse container">
    <div className="flex gap-3 flex-col lg:flex-row">
      <div className="flex flex-wrap lg:w-[80%]">
        <div className="flex-1">
          <div className="bg-[#F7F7F7] h-[62.89px] flex flex-col justify-center gap-1 px-4 mb-6">
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
    <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="flex items-start justify-between border-b pb-4 mb-6"
            >
              <div className="w-[150px] h-[150px] bg-gray-300 rounded"></div>
              <div className="flex-1 ml-4 space-y-1">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                <div className="flex gap-4 items-center pt-6">
                  <div className="h-4 bg-gray-300 rounded w-6"></div>
                  <div className="h-4 bg-gray-300 rounded w-6"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1">
        <div className="h-8 bg-gray-300 rounded w-[150px] mb-4"></div>
        {Array.from({ length: 2 }).map((_, index) => (
          <div className="flex gap-10 justify-between items-center" key={index}>
            <div className="h-4 bg-gray-300 rounded w-[250px] mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-[50px] mb-4"></div>
          </div>
        ))}
        <div className="flex justify-between text-[15px] py-4 border-y border-gray-100">
          <div className="h-4 bg-gray-300 rounded w-[150px] mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-[50px] mb-4"></div>
        </div>
        <div className="h-14 bg-gray-300 w-full rounded-full mt-4"></div>
      </div>
    </div>
    <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
  </div>
);

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const groupItems = useBasketStore((state) => state.getGroupedItems());
  const removeItem = useBasketStore((state) => state.removeItem);
  const increaseQuantity = useBasketStore((state) => state.increaseQuantity);
  const decreaseQuantity = useBasketStore((state) => state.decreaseQuantity);

  const calculateTotalPrice = () => {
    return groupItems.reduce((total, item) => total + (item.product.price || 0) * item.quantity, 0);
  };

  useEffect(() => {
    if (groupItems.length > 0) {
      setLoading(false);
    }
  }, [groupItems]);

  const handleRemoveItem = (product: any) => {
    removeItem(product);
    toast.warn(`${product.productName} removed from cart!`);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex flex-col justify-center items-center min-h-screen">
        <SkeletonLoader />
      </div>
    );
  }

  if (groupItems.length === 0) {
    return (
      <div className="container mx-auto p-4 flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Basket</h1>
        <p className="text-gray-600 text-lg">Your basket is empty</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto px-2">
      <ToastContainer />
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Bag Section */}
        <div className="flex-1">
          <div className="bg-[#F7F7F7] h-[62.89px] flex flex-col justify-center gap-1 px-4">
            <h1 className="text-[13px] font-medium ">Free Delivery</h1>
            <p className="text-sm text-gray-600">
              Applies to orders of ₹14,000.00 or more.{" "}
              <span className="text-black underline cursor-pointer mx-4">
                View details
              </span>
            </p>
          </div>
          <h2 className="text-xl font-bold my-6">Cart</h2>

          {/* Products */}
          {groupItems.map((item, index) => (
            <div
              key={index} // Always provide a unique key when mapping over arrays
              className="flex items-start justify-between border-b pb-4 mb-6"
            >
              <Image
                src={item.product.image ? urlFor(item.product.image).url() : ""}
                alt={item.product.productName || "Product Image"}
                className="w-[150px] h-[150px] object-cover"
                height={1000}
                width={1000}
              />
              <div className="flex-1 ml-4 space-y-1">
                <p className="text-[15px] font-medium">
                  {item.product.productName}
                </p>
                <p className="text-[15px] text-[#757575] line-clamp-2">
                  {item.product.description}
                </p>
                <p className="text-[15px] text-[#757575]">
                  {item.product.colors}
                </p>
                <p className="price text-[15px] lg:hidden">
                  MRP: {item.product.price}.00
                </p>
                <div className="flex gap-10">
                  <p className="text-[15px] text-[#757575]">Size: L</p>
                  <p className="text-[15px] text-[#757575]">
                    Quantity: {item.quantity}
                  </p>
                  <div className="flex items-center">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded"
                      onClick={() => decreaseQuantity(item.product)}
                    >
                      -
                    </button>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded ml-2"
                      onClick={() => increaseQuantity(item.product)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] text-[#757575]">Color:</span>
                  <span
                    className="w-6 h-6 rounded-full border"
                    style={{ backgroundColor: item.selectedColor }}
                  ></span>
                </div>
                <div className="flex gap-4 items-center pt-6">
                  <span>{HeartIcon}</span> {/* Ensure HeartIcon is defined */}
                  <span
                    className="cursor-pointer"
                    onClick={() => handleRemoveItem(item.product)}
                  >
                    {DeleteIcon}
                  </span>{" "}
                  {/* Ensure DeleteIcon is defined */}
                </div>
              </div>
              <p className="price text-[15px] hidden lg:block">
                MRP: {item.product.price}
              </p>
            </div>
          ))}

          <p className="text-start text-[21px] text-black font-medium mt-10">
            Favourites
          </p>
          <p className="text-start text-[15px] text-gray-500">
            There are no items saved to your favourites.
          </p>
        </div>

        {/* Summary Section */}
        <div className="w-full lg:w-[350.67px] bg-white p-6 mt-6 lg:mt-0">
          <h2 className="text-[21px] font-medium mb-4">Summary</h2>
          {groupItems.map((item, index) => (
            <div className="flex justify-between items-center mb-4" key={index}>
            <div className="flex items-center gap-3">
            <Image
                src={item.product.image ? urlFor(item.product.image).url() : ""}
                alt={item.product.productName || "Product Image"}
                className="w-[50px] h-[50px] object-cover"
                height={50}
                width={50}
              />
              {/* <p className="text-[15px]">{item.product.productName}</p> */}
              <span
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: item.selectedColor }}
              ></span>
              <p className="text-[15px]">x{item.quantity}</p>
            </div>
              <p className="text-[15px]">₹{item.product.price ? item.product.price * item.quantity : 0}</p>
            </div>
          ))}
          <div className="flex justify-between text-[15px] mb-4 ">
            <p>Subtotal</p>
            <p>₹{calculateTotalPrice()}</p>
          </div>
          <div className="flex justify-between text-[15px] mb-4 border-b pb-4">
            <p>Estimated Delivery & Handling</p>
            <p>Free</p>
          </div>
          <div className="flex justify-between text-[14px] mb-6 border-b pb-6">
            <p>Total</p>
            <p className="font-medium">₹{calculateTotalPrice()}</p>
          </div>
          <button className="w-full h-[60px] py-2 bg-black text-[15px] text-white font-medium rounded-full">
            <Link href={"/checkout"}>Member Checkout</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
