import { urlFor } from "@/sanity/lib/image";
import { getProductByCategory } from "@/sanity/products/getProductByCategory";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const decodeSlug = decodeURIComponent(slug);

  const products = await getProductByCategory(decodeSlug);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4">
      <h1 className="text-3xl font-bold my-6 text-center">
        {decodeSlug
          .split("-")
          .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
          .join(" ")}{" "}
        Collection
      </h1>

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
              </div>
              <div className="py-4">
                <div className="text-[15px] font-[500]">
                  {product.productName}
                </div>
                <div className="text-lightColor text-[15px] line-clamp-2">
                  {product.description}
                </div>
                <div className="text-lightColor text-[15px]">
                  {product.colors ? product.colors.length : ""} Color
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
  );
};

export default CategoryPage;
