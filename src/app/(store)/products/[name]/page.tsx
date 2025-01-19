"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CartIcon2 } from "@/app/data";
import { Info } from "lucide-react";
import Link from "next/link";
import { getProductByName } from "@/sanity/products/getProductByName";
import { getRelatedProducts } from "@/sanity/products/getRelatedProducts";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "../../../../../sanity.types";
import RelatedProducts from "../../components/RelatedProducts";
import { useBasketStore } from "../../../../../store";
import { ReviewSection } from "../../components/ReviewForm/ReviewSection";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SkeletonLoader = () => (
  <div className="py-10">
    <div className="container">
      <div className="flex flex-col lg:flex-row  gap-8 items-start ">
        <div className="bg-[#F8F8F8] mx-auto w-[300px] h-[300px]  md:w-[600px] md:h-[600px] rounded-lg flex items-center justify-center">
          <div className="h-full w-full bg-gray-300 rounded-md animate-pulse"></div>
        </div>
        <div className="space-y-6 max-w-[450px] px-4  lg:px-1 lg:py-10 mx-auto flex-1">
          <div className="space-y-2">
            <div className="h-10 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-10 bg-gray-300 rounded w-3/4 mb-6"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
          </div>
          <div className="space-y-4">
            <div className="h-12 bg-gray-300 rounded w-[250px]"></div>
            <div className="h-10 bg-gray-300 rounded-full w-[200px]"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Page = ({ params }: { params: { name: string } }) => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const addItem = useBasketStore((state) => state.addItem);

  const handleAddToCart = (product: Product) => {
    addItem(product);
    toast.success(`${product.productName} added to cart!`);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProductByName(
        decodeURIComponent(params.name)
      );

      if (productData && !Array.isArray(productData)) {
        setProduct(productData as Product);
        const relatedProductsData = await getRelatedProducts(
          productData.category || "",
          productData._id
        );
        setRelatedProducts(relatedProductsData);
      } else {
        setProduct(null);
      }

      setLoading(false);
    };
    fetchProduct();
  }, [params.name]);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (!product) {
    return (
      <div className="py-10">
        <div className="container">
          <div className="flex flex-col items-center gap-4">
            <Info className="h-[100px] w-[100px]" />
            <h1 className="font-bold text-4xl text-center">
              Product Not Found
            </h1>
            <p className="text-lg text-[#8D8D8D] text-center">
              The product you're looking for doesn't exist or may have been
              removed.
            </p>
            <Button className="bg-black rounded-full h-[56px] max-w-[280px] w-full">
              <Link href={"/products"}>Back to Shop</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="max-w-[1200px] mx-auto pr-3">
        <div className="flex justify-between flex-wrap gap-8 items-start ">
          <div className="bg-[#F8F8F8] mx-auto  md:w-[600px] md:h-[600px] rounded-lg flex items-center justify-center">
            <Image
              src={product.image ? urlFor(product.image).url() : ""}
              alt={product.productName || "Product Image"}
              width={1000}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-6 max-w-[400px] px-4 lg:px-1 lg:py-1 mx-auto">
            <div className="space-y-2">
              <h1 className="text-[36px] lg:text-[48px] leading-[36px] lg:leading-[48px]  font-[500] tracking-tight">
                {product.productName}
              </h1>
              <p className="text-sm/relaxed text-muted-foreground text-balance">
                {product.description}
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-[36px] font-[500]">
                  MRP : <span>{product.price}</span>
                </span>
              </div>
              <Button
                className="rounded-full w-auto px-6 bg-black"
                size="lg"
                onClick={() => handleAddToCart(product)}
              >
                <span className="mx-2">{CartIcon2}</span>
                Add To Cart
              </Button>
              <Button
                className="rounded-full w-auto px-6 bg-gray-500 ml-4"
                size="lg"
              >
                <Link
                  href={`/compare?product=${encodeURIComponent(product.productName || "")}`}
                >
                  Compare
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <ReviewSection />

        <RelatedProducts products={relatedProducts} />
        <ToastContainer />
      </div>
    </div>
  );
};

export default Page;
