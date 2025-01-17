import Image from "next/image";
import React from "react";
import { DeleteIcon, HeartIcon, Products } from "../../../../data";
import Link from "next/link";

const Cart = () => {
  const product1 = Products.find(
    (product) => product.name === "Nike Dri-FIT ADV TechKnit Ultra"
  );
  const product2 = Products.find(
    (product) => product.name === "Nike Air Max 97 SE"
  );

  return (
    <>
      <div className="max-w-[1100px] mx-auto px-2">
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
            <h2 className="text-xl font-bold my-6">Bag</h2>

            {/* PRoducts */}
            {[product1, product2].map((product, index) => (
              product && (
                <div
                  key={index} // Always provide a unique key when mapping over arrays
                  className="flex items-start justify-between border-b pb-4 mb-6"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="w-[150px] h-[150px] object-cover"
                    height={1000}
                    width={1000}
                  />
                  <div className="flex-1 ml-4 space-y-1">
                    <p className="text-[15px] font-medium">{product.name}</p>
                    <p className="text-[15px] text-[#757575]">
                      {product.shortDescription}
                    </p>
                    <p className="text-[15px] text-[#757575]">
                      {product.colors.join("/")}
                    </p>
                    <p className="price text-[15px] lg:hidden">MRP: {product.price}.00</p>
                    <div className="flex gap-10">
                      <p className="text-[15px] text-[#757575]">Size: L</p>
                      <p className="text-[15px] text-[#757575]">Quantity: 1</p>
                    </div>
                    <div className="flex gap-4 items-center pt-6">
                      <span>{HeartIcon}</span> {/* Ensure HeartIcon is defined */}
                      <span>{DeleteIcon}</span>{" "}
                      {/* Ensure DeleteIcon is defined */}
                    </div>
                  </div>
                  <p className="price text-[15px] hidden lg:block">MRP: {product.price}.00</p>
                </div>
              )
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
            <div className="flex justify-between text-[15px] mb-4 ">
              <p>Subtotal</p>
              <p>₹20,890.00</p>
            </div>
            <div className="flex justify-between text-[15px] mb-4 border-b pb-4">
              <p>Estimated Delivery & Handling</p>
              <p>Free</p>
            </div>
            <div className="flex justify-between text-[14px] mb-6 border-b pb-6">
              <p>Total</p>
              <p className="font-medium">₹ 20,890.00</p>
            </div>
            <button className="w-full h-[60px] py-2 bg-black text-[15px] text-white font-medium rounded-full">
              <Link href={"/checkout"}>
              Member Checkout
              </Link>
            </button>
          </div>
        </div>
      </div>
      <div className="pt-10">
        <h1 className="text-[19px] font-medium">You Might Also Like</h1>
        <div className="mt-6">
          <Image
            src={Products[16].image}
            alt="Nike Dri-FIT ADV TechKnit Ultra"
            height={1000}
            width={1000}
            className="w-[431.78px] h-[431.78px] rounded object-cover"
          />
          <div className="py-4">
            <span className="text-[#9E3500] text-[15px] font-[500]">
              {Products[16].tag}
            </span>
            <div className="text-[15px] font-[500]">{Products[16].name}</div>
            <div className="text-lightColor text-[15px]">
              {Products[16].shortDescription}
            </div>
            <div className="text-[15px] font-[500] mt-1">
              MRP : <span>{Products[16].price}.00</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
