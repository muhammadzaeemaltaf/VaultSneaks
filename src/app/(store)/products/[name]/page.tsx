"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CartIcon2 } from "@/app/data";
import { Info, HeartIcon, Star } from "lucide-react";
import Link from "next/link";
import { getProductByName } from "@/sanity/products/getProductByName";
import { getRelatedProducts } from "@/sanity/products/getRelatedProducts";
import { urlFor } from "@/sanity/lib/image";
import { Product, Review } from "../../../../../sanity.types";
import RelatedProducts from "../../components/RelatedProducts";
import { useBasketStore, useWishlistStore, useCompareStore } from "../../../../../store";
import { ReviewSection } from "../../components/ReviewForm/ReviewSection";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProductReviews } from "@/sanity/reviews/getProductReviews";

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
  const [selectedColor, setSelectedColor] = useState<string>("");
  const addItem = useBasketStore((state) => state.addItem);
  const {
    addItem: addWishlistItem,
    removeItem: removeWishlistItem,
    getItems: getWishlistItems,
  } = useWishlistStore();
  const wishlistItems = getWishlistItems();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const { setProductCompareTo } = useCompareStore();

  const handleAddToCart = (product: Product) => {
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }
    addItem(product, selectedColor);
    toast.success(`${product.productName} added to cart!`);
  };

  const toggleWishlist = (product: Product) => {
    if (wishlistItems.find((item) => item._id === product._id)) {
      removeWishlistItem(product._id);
    } else {
      addWishlistItem(product);
    }
  };

  const handleNewReview = (newReview: Review) => {
    setReviews(prevReviews => [...prevReviews, newReview]);
    const totalRating = reviews.reduce((sum, review) => sum + (review.rating ?? 0), 0) + (newReview.rating ?? 0);
    setAverageRating(totalRating / (reviews.length + 1));
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProductByName(
        decodeURIComponent(params.name)
      );

      if (productData && !Array.isArray(productData)) {
        setProduct(productData as Product);
        const relatedProductsData = await getRelatedProducts(
          productData.category?._ref || "",
          productData._id
        );
        setRelatedProducts(relatedProductsData);

        const fetchedReviews = await getProductReviews(productData._id);
        setReviews(fetchedReviews);
        if (fetchedReviews.length > 0) {
          const totalRating = fetchedReviews.reduce(
            (sum, review) => sum + (review.rating ?? 0),
            0
          );
          setAverageRating(totalRating / fetchedReviews.length);
        } else {
          setAverageRating(null);
        }
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
          <div className="bg-[#F8F8F8] mx-auto  md:w-[600px] md:h-[600px] rounded-lg flex items-center justify-center relative">
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
              <p className="">
                Category: <strong>{product.categoryName || "Unknown"}</strong>
              </p>
            </div>
            <span className="block cursor-pointer w-6 h-6 mt-5">
              <HeartIcon
                className={`active:animate-ping ${
                  wishlistItems.find(
                    (wishlistItem) => wishlistItem._id === product._id
                  )
                    ? "fill-gray-500"
                    : "text-gray-500"
                }`}
                onClick={() => toggleWishlist(product)}
              />
            </span>
            <div className="flex items-center gap-1">
              <span className="text-lg text-muted-foreground text-balance mt-2">
                Colors:
              </span>
              {product.colors?.map((color, colorIndex) => (
                <span
                  key={colorIndex}
                  className={`flex justify-center items-center w-6 h-6 rounded-full border mt-1 cursor-pointer ${selectedColor === color ? "border-black" : ""}`}
                  onClick={() => setSelectedColor(color)}
                >
                  <span
                    className="w-5 h-5 rounded-full"
                    style={{ backgroundColor: color }}
                  ></span>
                </span>
              ))}
            </div>
            {averageRating !== null && (
              <div className="flex items-center gap-1 mt-2">
                <span className="text-lg text-muted-foreground text-balance">
                  Rating:
                </span>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= averageRating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({averageRating.toFixed(1)})
                </span>
              </div>
            )}
            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-[36px] font-[500]">
                  Rs: <span>{product.price}</span>
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
                onClick={() => setProductCompareTo(product)}
              >
                <Link
                  href={`/comparision?product=${encodeURIComponent(product.productName || "")}`}
                >
                  Compare
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <ReviewSection productId={product._id} onNewReview={handleNewReview} />

        <RelatedProducts products={relatedProducts} />
        <ToastContainer />
      </div>
    </div>
  );
};

export default Page;
