"use client";

import React from "react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2Icon } from "lucide-react";
import { useBasketStore } from "../../../../store";

const page = () => {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const clearBasket = useBasketStore((state) => state.clearBasket);

  useEffect(() => {
    if (orderNumber) {
      clearBasket();
    }
  }, [orderNumber, clearBasket]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <CheckCircle2Icon className="text-green-500 h-20 w-20" />
      <h1 className="text-4xl font-bold mb-6 text-center">
        Thank you for your order!
      </h1>

      <div className="border-t border-b border-gray-200 py-6 mb-6">
        <p className="text-lg text-gray-700 mb-4">
          Your order has been confirmed and will be shipped shortly.
        </p>
        <div className="space-y-2">
          {orderNumber && (
            <p className="text-gray-680 flex items-center space-x-5">
              <span>Order Number:</span>
              <span className="font-mono text-sm text-black-600">
                {orderNumber}
              </span>
            </p>
          )}
          {/* {sessionId && (
      <p className="text-gray-600 flex justify-between">
        <span>Transaction ID:</span>
        <span className="font-mono text-sm">{sessionId}</span> 
      </p>
    )} */}
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-gray-600">
            A confirmation email has been sent to your email address.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-black hover:bg-gray-900">
                <Link href={"/orders"}>View Order Details</Link>
            </Button>
            <Button asChild variant={"outline"}>
            <Link href={"/"}>Continue Shopping</Link>
            </Button>
        </div>

      </div>
    </div>
  );
};

export default page;