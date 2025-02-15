"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2Icon } from "lucide-react";
import { useBasketStore } from "../../../../store";

const SearchParamsComponent = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const sessionId = searchParams.get("session_id");
  const clearBasket = useBasketStore((state) => state.clearBasket);
  const [orderStatus, setOrderStatus] = useState<string>("");

  useEffect(() => {
    if (orderId) clearBasket();
  }, [orderId, clearBasket]);

  useEffect(() => {
    if (sessionId) {
      // Call the new endpoint to confirm and create the order in Sanity.
      // fetch(`/api/confirm-order?session_id=${sessionId}`)
      //   .then((res) => res.json())
      //   .then((data) => {
      //     if (data.order) {
      //       setOrderStatus("Order successfully created.");
      //     } else {
      //       setOrderStatus("Order creation failed.");
      //     }
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //     setOrderStatus("Order creation failed.");
      //   });
    }
  }, [sessionId]);

  return (
    <>
      <CheckCircle2Icon className="text-green-500 h-16 w-16 sm:h-20 sm:w-20" />
      <h1 className="text-4xl font-bold mb-6 text-center">
        Thank you for your order!
      </h1>
      {orderStatus && (
        <p className="text-center mb-4 text-sm">{orderStatus}</p>
      )}
      <div className="border-t border-b border-gray-200 py-6 mb-6">
        <p className="text-lg text-gray-700 mb-4 text-center">
          Your order has been confirmed and will be shipped shortly.
        </p>
        <div className="space-y-2">
          {orderId && (
            <p className="text-gray-680 flex items-center flex-wrap gap-5 justify-center">
              <span>Order Number:</span>
              <span className="font-mono text-sm text-black-600 bg-slate-200 px-2">
                {orderId}
              </span>
              {/* <Button asChild variant="outline">
                <Link href={`/tracking/${orderId}`}>Track Your Order</Link>
              </Button> */}
            </p>
          )}
        </div>
      </div>
      <div className="space-y-4 px-4">
        <p className="text-gray-600 text-center">
        You will receive a confirmation email shortly.
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
    </>
  );
};

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-10">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchParamsComponent />
      </Suspense>
    </div>
  );
};

export default page;