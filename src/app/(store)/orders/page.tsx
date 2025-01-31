"use client";

import { Package, Truck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { getOrdersByUserId } from "@/sanity/orders/getAllOrders";
import { ORDER_QUERYResult } from "../../../../sanity.types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { useUserStore } from "../../../../store";

const statusColors = {
  pending: "!bg-yellow-100 text-yellow-800",
  paid: "!bg-green-100 text-green-800",
  shipped: "!bg-blue-100 text-blue-800",
  delivered: "!bg-purple-100 text-purple-800",
  cancelled: "!bg-red-100 text-red-800",
}

export default function OrderPage() {
  const [orders, setOrders] = useState<ORDER_QUERYResult>([]);
  const [loading, setLoading] = useState(true);
  const user = useUserStore((state) => state.getUser()); // Get user state

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return;
      try {
        const fetchedOrders = await getOrdersByUserId(user._id);
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <p className="text-muted-foreground">Track and manage your orders</p>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="grid gap-6">
          <Card className="p-6 animate-pulse">
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-start flex-wrap gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="h-6 bg-gray-300 rounded w-36"></div>
                      <div className="h-6 bg-gray-300 rounded w-16"></div>
                    </div>
                    <div className="h-4 bg-gray-300 rounded w-32 mt-2"></div>
                  </div>
                  <div className="h-10 bg-gray-300 rounded w-24"></div>
                </div>

                <div className="flex gap-4 items-center text-sm flex-wrap">
                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                  <div className="h-4 bg-gray-300 rounded w-40"></div>
                </div>

                <Separator />

                <div className="grid gap-4 max-h-52 overflow-auto custom-scrollbar">
                  {[1, 2].map((_, index) => (
                    <div key={index} className="flex gap-4 items-center">
                      <div className="h-14 w-14 sm:h-16 sm:w-16 bg-gray-300 rounded-md"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-300 rounded w-32"></div>
                        <div className="h-4 bg-gray-300 rounded w-20 mt-2"></div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="flex justify-between text-sm">
                  <div className="grid gap-1">
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                  </div>
                  <div className="grid gap-1 text-right">
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                  </div>
                </div>
              </div>
            </Card>
        </div>
      ) : orders.length > 0 ? (
        <div className="grid gap-6">
          {orders.map((order) => (
            <Card key={order._id} className="p-6">
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-start flex-wrap gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">
                        Order #{order.orderNumber}
                      </h3>
                      <Badge className={statusColors[order.status as keyof typeof statusColors]}>{order.status}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Placed on{" "}
                      {order.orderDate
                        ? new Date(order.orderDate).toDateString()
                        : "Unknown"}
                    </p>
                  </div>
                  <Button variant="outline">Track Order</Button>
                </div>

                <div className="flex gap-4 items-center text-sm flex-wrap">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    <span className="whitespace-nowrap">
                      {order.products?.length || 0} items
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    <span className="whitespace-nowrap">Express Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="whitespace-nowrap">
                      Estimated delivery:{" "}
                      {order.estimatedDeliveryDate
                        ? new Date(order.estimatedDeliveryDate).toDateString()
                        : "Unknown"}
                    </span>
                  </div>
                </div>

                <Separator />

                {/* Products Section */}
                <div className="grid gap-4 max-h-52 overflow-auto custom-scrollbar">
                  {order.products?.map((product) => (
                    <div key={product.product?._id} className="flex gap-4 items-center">
                     {product.product?.image && (
                            <div className="relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 rounded-md overflow-hidden">
                              <Image
                                src={urlFor(product.product.image).url()}
                                alt={product.product.productName ?? ""}
                                layout="fill"
                                className="object-cover"
                              />
                            </div>
                          )}
                      <div className="flex-1">
                        <h4 className="font-medium">
                          {product.product?.productName || "Unknown Product"}
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          Quantity: {product.quantity || 0}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="flex justify-between text-sm">
                  <div className="grid gap-1">
                    {
                      order.amountDiscount! > 0 && (
                        <p className="text-red-600 font-bold">Discount</p>
                      )
                    }
                    <p>Subtotal</p>
                    <p>Shipping</p>
                    <p>Payment Method</p>
                    <p className="font-medium">Total</p>
                  </div>
                  <div className="grid gap-1 text-right">
                    {
                      order.amountDiscount! > 0 && (
                        <p className="text-red-600 font-bold">{order.amountDiscount} %</p>
                      )
                    }
                    <p>
                      {order.currency} {order.totalPrice}
                    </p>
                    <p>Free</p>
                    <p>{order.paymentMethod}</p>
                    <p className="font-medium">
                      {order.currency} {order.totalPrice}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
          <p className="text-muted-foreground mb-4">
            When you place an order, it will appear here.
          </p>
          <Button><Link href={'/products'}>Start Shopping</Link></Button>
        </div>
      )}
    </div>
  );
}
