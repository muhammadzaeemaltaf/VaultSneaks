"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getProductByName } from "@/sanity/products/getProductByName";
import { urlFor } from "@/sanity/lib/image";
import { Product, Review } from "../../../../sanity.types";
import { CartIcon2 } from "@/app/data";
import { useBasketStore } from "../../../../store";
import { getProductByCategory } from "@/sanity/products/getProductByCategory";
import { getProductReviews } from "@/sanity/reviews/getProductReviews";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SkeletonLoader = ({ single }: { single: boolean }) => (
  <div className="py-10">
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center bg-gray-300 rounded w-1/2 mx-auto h-10 animate-pulse"></h1>
      <div className={`grid ${single ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-8`}>
        <div>
          <div className="flex items-center gap-4">
            <div className="w-[250px] mb-4 h-10 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-[#F8F8F8] mx-auto w-[300px] h-[300px] rounded-lg flex items-center justify-center">
              <div className="h-full w-full bg-gray-300 rounded-md animate-pulse"></div>
            </div>
            <div className="space-y-6 max-w-[400px] w-full px-4 lg:px-1 lg:py-10 mx-auto flex-1">
              <div className="space-y-2 w-full">
                <div className="h-10 bg-gray-300 rounded mx-auto w-[200px] mb-2"></div>
                <div className="h-8 bg-gray-300 rounded mx-auto w-[100px] mb-6"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
              </div>
              <div className="space-y-4">
                <div className="h-12 bg-gray-300 mx-auto rounded w-[250px]"></div>
                <div className="h-10 bg-gray-300 mx-auto rounded-full w-[200px]"></div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${single ? "hidden" : ""}`}>
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold mb-4 bg-gray-300 rounded w-[150px] h-10 animate-pulse"></h2>
            <div className="w-[250px] mb-4 h-10 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-[#F8F8F8] mx-auto w-[300px] h-[300px] rounded-lg flex items-center justify-center">
              <div className="h-full w-full bg-gray-300 rounded-md animate-pulse"></div>
            </div>
            <div className="space-y-6 max-w-[400px] w-full px-4 lg:px-1 lg:py-10 mx-auto flex-1">
              <div className="space-y-2 w-full">
                <div className="h-10 bg-gray-300 rounded mx-auto w-[200px] mb-2"></div>
                <div className="h-8 bg-gray-300 rounded mx-auto w-[100px] mb-6"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
              </div>
              <div className="space-y-4">
                <div className="h-12 bg-gray-300 mx-auto rounded w-[250px]"></div>
                <div className="h-10 bg-gray-300 mx-auto rounded-full w-[200px]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"}>
        ★
      </span>
    );
  }
  return stars;
};

const renderAverageRating = (reviews: Review[]) => {
  if (reviews.length === 0) return <p className="text-center font-bold">-</p>;

  const totalRating = reviews.reduce((sum, review) => sum + (review.rating ?? 0), 0);
  const averageRating = totalRating / reviews.length;

  return (
    <div className="flex justify-center items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= averageRating ? "text-yellow-500" : "text-gray-300"}>
          ★
        </span>
      ))}
      <span className="ml-2">({averageRating.toFixed(1)})</span>
    </div>
  );
};

const renderPriceComparison = (price1: number, price2: number) => {
  if (price1 > price2) {
    return (
      <span className="flex justify-center items-center gap-3  w-full">
        ${price1} <ArrowUp className="inline-block text-green-500" />
      </span>
    );
  } else if (price1 < price2) {
    return (
      <span className="flex justify-center items-center gap-3  w-full">
        ${price1} <ArrowDown className="inline-block text-red-500" />
      </span>
    );
  } else {
    return <span>${price1}</span>;
  }
};

export default function ComparePage({
  searchParams,
}: {
  searchParams: { product: string };
}) {
  const [productCompareTo, setProductCompareTo] = useState<Product | any>(null);
  const [productCompareWith, setProductCompareWith] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedProductData, setSelectedProductData] = useState<Product | any>(null);
  const [loading, setLoading] = useState(true);
  const [loadingSelectedProduct, setLoadingSelectedProduct] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const addItem = useBasketStore((state) => state.addItem);
  const [reviewsCompareTo, setReviewsCompareTo] = useState<Review[]>([]);
  const [reviewsCompareWith, setReviewsCompareWith] = useState<Review[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); 
        const productTo: any = await getProductByName(decodeURIComponent(searchParams.product));
        const categoryName = productTo?.categoryName;
        const productsWith = await getProductByCategory([categoryName]);
        if (!productTo || Array.isArray(productTo) && productTo.length === 0) {
          toast.error("Product not found");
          setLoading(false);
          return;
        }
        const reviewsTo = await getProductReviews((productTo as Product)._id);
  
        if (productTo) {
          setProductCompareTo(productTo);
        } else {
          toast.error("Product not found");
        }
  
        if (productsWith) {
          setProductCompareWith(productsWith);
        } else {
          toast.error("No related products found");
        }
  
        if (reviewsTo) {
          setReviewsCompareTo(reviewsTo);
        }
  
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [searchParams.product]);

  useEffect(() => {
    const fetchSelectedProduct = async () => {
      if (!selectedProduct) return;
  
      try {
        setLoadingSelectedProduct(true);
        setShowTable(false);
        const productData = await getProductByName(selectedProduct);
        if (productData && (!Array.isArray(productData) || productData.length > 0)) {
          setSelectedProductData(productData);
          console.log(productData)
          const reviewsWith = await getProductReviews((productData as Product)._id);
          setReviewsCompareWith(reviewsWith || []);
          setShowTable(true);
        } else {
          toast.error("Selected product not found");
        }
  
        setLoadingSelectedProduct(false);
      } catch (error) {
        console.error("Error fetching selected product:", error);
        toast.error("Failed to load selected product");
        setLoadingSelectedProduct(false);
      }
    };
  
    fetchSelectedProduct();
  }, [selectedProduct]);

  const handleProductChange = (value: string) => {
    setSelectedProduct(value);
  };

  const handleAddToCart = (product: Product) => {
    if (product.colors && product.colors.length > 0) {
      addItem(product, product.colors[0]);
    } else {
      toast.error("Product colors are not available.");
    }
    toast.success(`${product.productName} added to cart!`);
  };

  if (loading) {
    return <SkeletonLoader single={false} />;
  }

  const renderProductDetails = (product: Product | null) => {
    if (!product) return null;
    return (
      <div className="flex flex-col items-center">
        <Image
          src={product.image ? urlFor(product.image).url() : "/placeholder.svg"}
          alt={product.productName || "Product Image"}
          width={300}
          height={300}
          className="mb-4 rounded-lg shadow-md object-cover"
        />
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">{product.productName}</h2>
        <p className="text-lg sm:text-xl font-bold mb-4">${product.price}</p>
        <div className="w-full max-w-md space-y-2">
          <p>
            <strong>Category:</strong> {product.categoryName || "N/A"}
          </p>
          <p>
            <strong>Description:</strong> {product.description}
          </p>
        </div>
        <Button
          className="rounded-full w-auto my-3 px-6 bg-black"
          size="lg"
          onClick={() => handleAddToCart(product)}
        >
          <span className="mx-2">{CartIcon2}</span>
          Add To Cart
        </Button>{" "}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <h1 className="text-xl sm:text-3xl font-bold mb-8 text-center">
        Product Comparison
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="sm:text-2xl font-semibold mb-4">Product to Compare</h2>
          {renderProductDetails(productCompareTo)}
        </div>
        <div>
          <div className="flex items-center gap-4 flex-wrap">
            {" "}
            <h2 className="sm:text-2xl font-semibold mb-4">Compare With</h2>
            <Select value={selectedProduct} onValueChange={handleProductChange}>
              <SelectTrigger className="w-[250px] mb-4">
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {productCompareWith.map((product) => (
                  <SelectItem
                    key={product._id}
                    value={product.productName || ""}
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={
                          product.image
                            ? urlFor(product.image).url()
                            : "/placeholder.svg"
                        }
                        alt={product.productName || "Product Image"}
                        width={30}
                        height={30}
                        className="rounded-lg"
                      />
                      {product.productName}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {loadingSelectedProduct ? (
            <SkeletonLoader single={true} />
          ) : (
            <>
              {renderProductDetails(selectedProductData)}
            </>
          )}
        </div>
      </div>
      {productCompareTo && selectedProductData && showTable && (
        <div className="mt-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border text-sm p-2">Feature</th>
                  <th className="border text-sm p-2"><span className="line-clamp-2">{productCompareTo.productName}</span></th>
                  <th className="border text-sm p-2">
                    <span className="line-clamp-2">{selectedProductData.productName}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {["categoryName", "price"].map((feature, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <td className="border text-sm sm:text-base p-2">{feature.charAt(0).toUpperCase() + feature.slice(1).toLowerCase()}</td>
                    <td className="border p-2 text-sm sm:text-base text-center">
                      {feature === "price"
                        ? renderPriceComparison(
                            productCompareTo.price,
                            selectedProductData.price
                          )
                        : productCompareTo[feature as keyof Product]}
                    </td>
                    <td className="border p-2 text-sm sm:text-base text-center">
                      {feature === "price"
                        ? renderPriceComparison(
                            selectedProductData.price,
                            productCompareTo.price
                          )
                        : selectedProductData[feature as keyof Product]}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-100">
                  <td className="border text-sm sm:text-base p-2">Average Rating</td>
                  <td className="border p-2 text-sm sm:text-base">{renderAverageRating(reviewsCompareTo)}</td>
                  <td className="border p-2 text-sm sm:text-base">{renderAverageRating(reviewsCompareWith)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
