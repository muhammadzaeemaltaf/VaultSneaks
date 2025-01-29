"use client";

import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useUserStore, useWishlistStore } from "../../../../../store";
import { Product } from "../../../../../sanity.types";
import { HeartIcon } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getMenProducts } from "@/sanity/products/getMenProducts";
import { getWomenProducts } from "@/sanity/products/getWomenProducts";
import { getProductByCategory } from "@/sanity/products/getProductByCategory";

const SkeletonLoader = () => (
  <div className="animate-pulse w-full">
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className="p-1">
          <div className="relative overflow-hidden group rounded transition-all duration-150 h-[250px] bg-gray-300"></div>
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

const CategoryPage = ({ params }: { params: { slug: string } }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [decodeSlug, setDecodeSlug] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const { addItem, removeItem, getItems } = useWishlistStore();
  const wishlistItems = getItems();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchProducts = async () => {
      const decodedSlug = decodeURIComponent(params.slug);
      setDecodeSlug(decodedSlug);
      let fetchedProducts = [];
      if (decodedSlug.toLowerCase() === "men") {
        fetchedProducts = await getMenProducts();
      } else if (decodedSlug.toLowerCase() === "women") {
        fetchedProducts = await getWomenProducts();
      } else {
        fetchedProducts = await getProductByCategory([decodedSlug]);
      }
      setProducts(fetchedProducts);
      setLoading(false);
    };

    fetchProducts();
  }, [params.slug]);

  const toggleWishlist = (product: Product) => {
    if (wishlistItems.find((item) => item._id === product._id)) {
      removeItem(product._id);
      toast.warn(`${product.productName} removed from wishlist`);
    } else {
      addItem(product);
      toast.success(`${product.productName} added to wishlist`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4">
      <h1 className="text-3xl font-bold my-6 text-center">
        {decodeSlug
          .split("-")
          .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
          .join(" ")}{" "}
        Collection
      </h1>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6 md:p-10">
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
                    className=" object-cover"
                  />
                  <span className="absolute top-2 right-2 z-10  cursor-pointer w-6 h-6">
                    {user ? (
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
                    ) : (
                      <Link href={`/login`}>
                        <HeartIcon className={` active:animate-ping`} />
                      </Link>
                    )}
                  </span>
                </div>
                <div className="py-4">
                  <div className="text-[15px] font-[500]">
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
                    MRP : <span>{product.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default CategoryPage;
