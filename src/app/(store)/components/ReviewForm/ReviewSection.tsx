"use client";

import { useState, useEffect, useRef } from "react";
import { ReviewForm } from "./ReviewForm";
import { ReviewList } from "./ReviewList";
import { getProductReviews } from "@/sanity/reviews/getProductReviews";
import { Review } from "../../../../../sanity.types";
import { client } from "@/sanity/lib/client";

const SkeletonLoader = () => (
  <div className="animate-pulse max-w-6xl mx-auto p-4 mt-10 border-t border-gray-200">
    <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
    <div className="space-y-4">
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className="space-y-2 border-b border-gray-100 pb-4">
          <div className="flex flex-wrap gap-2">
            <div className="h-6 bg-gray-300 rounded w-[100px]"></div>
            <div className="h-6 bg-gray-300 rounded w-[150px]"></div>
            <div className="h-6 bg-gray-300 rounded w-[120px]"></div>
          </div>
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  </div>
);

export function ReviewSection({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState("read");
  const [loading, setLoading] = useState(true);
  const tabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const addReview = async (newReview: Omit<Review, "_id" | "date" | "productId">) => {
    const review: Review = {
      ...newReview,
      _id: `${productId}-${Date.now()}`,
      reviewDate: new Date().toISOString(),
      productId,
    };

    try {
      await client.create({
        _type: "review",
        product: { _type: "reference", _ref: productId },
        productId: productId,
        reviewerName: review.reviewerName,
        rating: review.rating,
        reviewText: review.reviewText,
        reviewDate: review.reviewDate,
      });
      setReviews([review, ...reviews]);
      setActiveTab("read");
    } catch (error) {
      console.error("Failed to create review:", error);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const fetchedReviews = await getProductReviews(productId);
      console.log(fetchedReviews)
      setReviews(fetchedReviews);
      setLoading(false);
    };

    fetchReviews();
  }, [productId]);

  useEffect(() => {
    const setIndicatorPosition = () => {
      const tabs = tabsRef.current;
      const activeTabElement = tabs?.querySelector(`[data-tab="${activeTab}"]`);
      const indicator = indicatorRef.current;

      if (tabs && activeTabElement && indicator) {
        const tabRect = activeTabElement.getBoundingClientRect();
        const tabsRect = tabs.getBoundingClientRect();

        indicator.style.left = `${tabRect.left - tabsRect.left}px`;
        indicator.style.width = `${tabRect.width}px`;
      }
    };

    setIndicatorPosition();
    window.addEventListener("resize", setIndicatorPosition);

    return () => {
      window.removeEventListener("resize", setIndicatorPosition);
    };
  }, [activeTab]);

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 mt-10 border-t border-gray-200">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      <div className="relative mb-4">
        <div ref={tabsRef} className="flex">
          <button
            className={`px-4 py-2 ${activeTab === "read" ? "text-primary" : "text-gray-500"}`}
            onClick={() => setActiveTab("read")}
            data-tab="read"
          >
            Read Reviews
          </button>
          <button
            className={`px-4 py-2 ${activeTab === "write" ? "text-primary" : "text-gray-500"}`}
            onClick={() => setActiveTab("write")}
            data-tab="write"
          >
            Write a Review
          </button>
        </div>
        <div
          ref={indicatorRef}
          className="absolute bottom-0 h-0.5 bg-black transition-all duration-300 ease-in-out"
        />
      </div>
      {activeTab === "read" ? (
        reviews.length > 0 ? (
          <ReviewList reviews={reviews} />
        ) : (
          <p>No reviews for this product.</p>
        )
      ) : (
        <ReviewForm onSubmit={addReview} />
      )}
    </div>
  );
}
