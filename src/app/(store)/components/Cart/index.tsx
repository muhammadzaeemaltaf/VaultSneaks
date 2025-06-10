"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { DeleteIcon} from "@/app/data";
import Link from "next/link";
import { useBasketStore, useUserStore, useWishlistStore } from "../../../../../store";
import { urlFor } from "@/sanity/lib/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HeartIcon } from "lucide-react";

const SkeletonLoader = () => (
  <div className="animate-pulse md:w-full">
    <div className="flex gap-3 flex-col lg:flex-row">
      <div className="flex flex-wrap lg:w-[80%]">
        <div className="flex-1">
          <div className="bg-[#F7F7F7] h-[62.89px] flex flex-col justify-center gap-1 px-4 mb-6">
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
    <div className="h-8 bg-gray-300 rounded w-1/4 mb-6 ml-3 "></div>
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="flex items-start justify-between border-b pb-4 mb-6 px-3"
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
        <div className="h-8 bg-gray-300 rounded w-[150px] mb-4 px-4"></div>
        {Array.from({ length: 2 }).map((_, index) => (
          <div className="flex gap-10 justify-between items-center" key={index}>
            <div className="h-4 bg-gray-300 rounded w-[240px] mb-4 "></div>
            <div className="h-4 bg-gray-300 rounded w-[50px] mb-4 "></div>
          </div>
        ))}
        <div className="flex justify-between text-[15px] py-4 border-y border-gray-100 ">
          <div className="h-4 bg-gray-300 rounded w-[150px] mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-[50px] mb-4"></div>
        </div>
        <div className="h-14 bg-gray-300 w-full rounded-full mt-4"></div>
      </div>
    </div>
    <div className="h-8 bg-gray-300 rounded w-1/4 mb-4 mt-4"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
  </div>
);

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const groupItems = useBasketStore((state) => state.getGroupedItems());
  const removeItem = useBasketStore((state) => state.removeItem);
  const increaseQuantity = useBasketStore((state) => state.increaseQuantity);
  const decreaseQuantity = useBasketStore((state) => state.decreaseQuantity);
  const wishlistItems = useWishlistStore((state) => state.getItems());
  const user = useUserStore((state) => state.user);

  const calculateTotalPrice = () => {
    return groupItems.reduce((total, item) => total + (item.product.price || 0) * item.quantity, 0);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Show loader for 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleRemoveItem = (product: any) => {
    removeItem(product);
    toast.warn(`${product.productName || "Item"} removed from cart!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
      <div className="container mx-auto p-4 flex flex-col justify-center items-center min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h1>
        <p className="text-gray-600 text-lg">Your Cart is empty</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto px-2">
      <ToastContainer />
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Bag Section */}
        <div className="flex-1">
          <div className="bg-[#F7F7F7] min-h-[62.89px] flex flex-col py-2 justify-center gap-1 px-4">
            <h1 className="text-[13px] font-medium ">Free Delivery</h1>
            <p className="text-sm text-gray-600">
              Applies to orders of Rs 14,000.00 or more.{" "}
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
                className="h-24 w-24 sm:w-[150px] sm:h-[150px] object-cover"
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
                <p className="text-[15px] text-[#757575] flex items-center gap-2">
                  Available Colors:
                  {item.product.colors?.map((color, colorIndex) => (
                    <span
                    className="w-5 h-5 rounded-full border"
                    style={{ backgroundColor: color }}
                  ></span>
                  ))}
                </p>
                <p className="price text-[15px] lg:hidden">
                Rs: {item.product.price}
                </p>
                <div className="flex gap-4 flex-wrap items-center">
                  <p className="text-[15px] text-[#757575]">
                    Quantity: {item.quantity}
                  </p>
                  <div className="flex items-center">
                    <button
                      className="flex justify-center w-7 h-7 bg-gray-200 rounded"
                      onClick={() => decreaseQuantity(item.product)}
                    >
                      <span>
                        -
                      </span>
                    </button>
                    <button
                      className="flex justify-center w-7 h-7 bg-gray-200 rounded ml-2"
                      onClick={() => increaseQuantity(item.product)}
                    >
                      <span className="pt-[2px]">
                        +
                      </span>
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
                  <span><HeartIcon/></span> {/* Ensure HeartIcon is defined */}
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
              Rs: {item.product.price}
              </p>
            </div>
          ))}
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
              <p className="text-[15px]">Rs {item.product.price ? item.product.price * item.quantity : 0}</p>
            </div>
          ))}
          <div className="flex justify-between text-[15px] mb-4 ">
            <p>Subtotal</p>
            <p>Rs {calculateTotalPrice()}</p>
          </div>
          <div className="flex justify-between text-[14px] mb-6 border-b pb-6">
            <p>Total</p>
            <p className="font-medium">Rs {calculateTotalPrice()}</p>
          </div>
          <button className="w-full h-[60px] py-2 bg-black text-[15px] text-white font-medium rounded-full">
           {
              user ? (
                <Link href={"/checkout"}>Member Checkout</Link>
              ) : (
                <Link href={"/login"}>Login to Checkout</Link>
              )
           }
          </button>
        </div>
      </div>

      <p className="text-start text-[21px] text-black font-medium mt-10">
        Favourites
      </p>
      {wishlistItems.length === 0 ? (
        <p className="text-start text-[15px] text-gray-500">
          There are no items saved to your favourites.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 mt-6">
          {wishlistItems.map((product, index) => (
            <div key={index} className="p-1 relative">
              <Link href={`/products/${product.productName}`} className="absolute inset-0 z-10" />
              <div className="relative overflow-hidden group rounded transition-all duration-150">
                <Image
                  src={product.image ? urlFor(product.image).url() : ""}
                  alt={product.productName || "Product Image"}
                  height={1000}
                  width={1000}
                  className="object-cover"
                />
                <span className="absolute top-2 right-2 cursor-pointer w-6 h-6">
                  <HeartIcon className="fill-gray-500" />
                </span>
              </div>
              <div className="py-4">
                <div className="text-[15px] font-[500]">
                  {product.productName}
                </div>
                <div className="flex gap-2">
                  {product.colors?.map((color, colorIndex) => (
                    <span
                      key={colorIndex}
                      className={`flex justify-center items-center w-4 h-4 rounded-full border mt-1 cursor-pointer`}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
