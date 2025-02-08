"use client";

import { Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useWishlistStore, useBasketStore } from "../../../../store";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "../../../../sanity.types";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import { useState, useEffect } from "react"; // Import useState and useEffect
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

export default function WishlistPage() {
  const { items: wishlistItems, removeItem } = useWishlistStore();
  const addItemToBasket = useBasketStore((state) => state.addItem);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    if (wishlistItems.length > 0) {
      setLoading(false);
    } else {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [wishlistItems]);

  const handleAddToCart = (product: Product) => {
    if (product.colors && product.colors.length > 0) {
      addItemToBasket(product, product.colors[0]);
      removeItem(product._id);
      toast(`${product.productName} added to cart and removed from wishlist`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Wishlist</h1>
        <p className="text-muted-foreground">Items you've saved for later</p>
      </div>

      {/* Wishlist items */}
      <div className="grid gap-6">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="p-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <Skeleton className="w-20 h-20 sm:w-[150px] sm:h-[150px] object-cover rounded-md" />
                </div>
                <div className="flex-grow">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-6 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            </Card>
          ))
        ) : wishlistItems.length > 0 ? (
          wishlistItems.map((item) => (
            <Card key={item._id} className="p-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <Image
                    src={
                      item.image ? urlFor(item.image).url() : "/placeholder.svg"
                    }
                    alt={item.productName || "Product Image"}
                    width={1000}
                    height={1000}
                    className="w-20 h-20 sm:w-[150px] sm:h-[150px] object-cover rounded-md"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between flex-wrap gap-2">
                    <div>
                      <Link href={`/products/${item.productName}`} className="font-semibold text-lg line-clamp-2">
                        {item.productName}
                      </Link>
                      <div className="mt-2">
                        <span className="font-semibold">Rs {item.price}</span>
                      </div>  
                      <p className="text-muted-foreground mt-2 flex gap-1">
                        {item.colors?.map((color, colorIndex) => (
                          <span
                            key={colorIndex}
                            className="flex justify-center items-center w-4 h-4 rounded-full border"
                          >
                            <span
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: color }}
                            ></span>
                          </span>
                        ))}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeItem(item._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleAddToCart(item)}
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-muted-foreground mb-4">
              Browse our products and add items to your wishlist
            </p>
            <Button>
              <Link href={"/products"}>Continue Shopping</Link>
            </Button>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
