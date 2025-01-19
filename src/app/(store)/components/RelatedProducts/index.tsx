import React from "react";
import { Product } from "../../../../../sanity.types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="py-10">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <p>No related products found.</p>
      </div>
    );
  }

  return (
    <div className="py-10">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
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

export default RelatedProducts;
