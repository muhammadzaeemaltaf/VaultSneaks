"use client";

import { Package, Truck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { getAllOrders } from "@/sanity/orders/getAllOrders";
import { Order } from "../../../../sanity.types";
// import { Skeleton } from "@/components/ui/skeleton";
import { getProductByID } from "@/sanity/products/getProductById";

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      const fetchedOrders = await getAllOrders();
      const ordersWithProducts = await Promise.all(
        fetchedOrders.map(async (order: Order) => {
          const products = await Promise.all(
            (order.products ?? []).map(async (product) => {
              const productRef = product && product.product!._ref ; 
              if (!productRef) return product;
              const productDetails = await getProductByID(productRef);
              return { ...product, ...productDetails[0] };
            })
          );
          return { ...order, products };
        })
      );
      setOrders(ordersWithProducts);
      setLoading(false);
    }
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <p className="text-muted-foreground">Track and manage your orders</p>
      </div>

      {/* Orders list */}
      <div className="grid gap-6">
        {loading ? (
          <p>Loading</p>
        ) : (
          orders.map((order) => (
            <Card key={order._id} className="p-6">
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-start flex-wrap gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">
                        Order #{order.orderNumber}
                      </h3>
                      <Badge>{order.status}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Placed on{" "}
                      {new Date(order.orderDate ?? 0).toLocaleDateString()}
                    </p>
                  </div>
                  <Button variant="outline">Track Order</Button>
                </div>

                <div className="flex gap-4 items-center text-sm flex-wrap">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    <span className="whitespace-nowrap">{order.products && order.products.length} items</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    <span className="whitespace-nowrap">Express Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="whitespace-nowrap">
                      Estimated delivery:{" "}
                      {new Date(
                        order.estimatedDeliveryDate ?? 0
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <Separator />

                {/* <div className="grid gap-4">
                  {order.products &&
                    order.products.map((product, index) => (
                      // <div key={index} className="flex gap-4">
                      //   <img
                      //     src={product.product?.image || ""}
                      //     alt={product.product?.name || ""}
                      //     className="w-[100px] h-[100px] object-cover rounded-md"
                      //   />
                      //   <h4 className="font-medium">
                      //     {product.product?.name || "Unknown Product"}
                      //   </h4>
                      //   <p className="text-muted-foreground text-sm">
                      //     Quantity: {product.quantity || 0}
                      //   </p>
                      //   <p className="font-medium mt-1">
                      //     {product.product?.currency || "USD"}{" "}
                      //     {product.product?.price || 0}
                      //   </p>
                      // </div>
                      <p></p>
                    ))}
                </div>

                <Separator /> */}

                <div className="flex justify-between text-sm">
                  <div className="grid gap-1">
                    <p>Subtotal</p>
                    <p>Shipping</p>
                    <p className="font-medium">Total</p>
                  </div>
                  <div className="grid gap-1 text-right">
                    <p>
                      {order.currency} {order.totalPrice}
                    </p>
                    <p>Free</p>
                    <p className="font-medium">
                      {order.currency} {order.totalPrice}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Empty state */}
      {!loading && orders.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
          <p className="text-muted-foreground mb-4">
            When you place an order, it will appear here
          </p>
          <Button>Start Shopping</Button>
        </div>
      )}
    </div>
  );
}
