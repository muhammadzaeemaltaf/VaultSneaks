"use client"

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useBasketStore } from "../../../../../../store";
import { useRouter } from "next/navigation";
import { createOrderInSanity } from "@/lib/index";

export default function OrderSummary({ formData }: { formData: any }) {
  const groupItems = useBasketStore((state) => state.getGroupedItems());
  const router = useRouter();

  const calculateTotalPrice = () => {
    return groupItems.reduce((total, item) => total + (item.product.price || 0) * item.quantity, 0);
  };

  const handleCheckout = async () => {
    const orderData = {
      orderNumber: `ORD-${Date.now()}`,
      ...formData,
      products: groupItems.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      totalPrice: calculateTotalPrice(),
      currency: "INR",
      amountDiscount: 0,
      status: "pending",
      paymentMethod: "COD",
      orderDate: new Date().toISOString(),
    };

    try {
      const orderId = await createOrderInSanity(orderData);
      router.push(`/success?orderId=${orderId}`);
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  };

  return (
    <div className="max-w-[320px] lg:ml-auto">
      <div>
        <h2 className="text-[21px] font-medium">Order Summary</h2>
      </div>
      <div className="space-y-6">
        {groupItems.map((item, index) => (
          <div className="flex justify-between items-center mb-4" key={index}>
            <div className="flex items-center gap-3">
              <Image
                src={item.product.image ? urlFor(item.product.image).url() : ""}
                alt={item.product.productName || "Product Image"}
                className="w-[50px] h-[50px] object-cover"
                height={50}
                width={50}
              />
              <p className="text-[15px]">x{item.quantity}</p>
            </div>
            <p className="text-[15px]">₹{item.product.price ? item.product.price * item.quantity : 0}</p>
          </div>
        ))}
        <div className="space-y-2">
          <div className="flex justify-between text-[14px] text-[#8D8D8D]">
            <span className="text-muted-foreground">Subtotal</span>
            <span>₹{calculateTotalPrice()}</span>
          </div>
          <div className="flex justify-between text-[14px] text-[#8D8D8D]">
            <span className="text-muted-foreground">Delivery/Shipping</span>
            <span>Free</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>₹{calculateTotalPrice()}</span>
          </div>
          <Separator className="my-2" />
          <p className="text-[9px]  mt-1">
            (The total reflects the price of your order, including all duties
            and taxes)
          </p>
        </div>

        <div className="space-y-1 text-sm">
          <p className="font-bold text-[15px]">
            Arrives Mon, 27 Mar - Wed, 12 Apr
          </p>
        </div>
        <button onClick={handleCheckout} className="w-full h-[60px] py-2 bg-black text-[15px] text-white font-medium rounded-full">
          Checkout
        </button>
      </div>
    </div>
  );
}
