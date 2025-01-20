"use client"

import React, { useState } from 'react'
import Left from './Left'
import Right from './Right'
import { createOrder } from "@/sanity/lib/order";
import { useRouter } from "next/navigation";
import { useBasketStore } from '../../../../../store';

const Checkout = () => {
  const [formData, setFormData] = useState({});
  const groupItems = useBasketStore((state) => state.getGroupedItems());
  const router = useRouter();

  const calculateTotalPrice = () => {
    return groupItems.reduce((total, item) => total + (item.product.price || 0) * item.quantity, 0);
  };

  const handleFormChange = (data: any) => {
    setFormData(data);
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
      const orderId = await createOrder(orderData);
      router.push(`/success?orderId=${orderId}`);
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  };

  return (
    <div className='py-10 mb-8'>
      <div className="max-w-[880px] mx-auto">
        <div className="flex flex-col px-2 gap-6 lg:flex-row lg:gap-0 lg:px-0">
          <Left onFormChange={handleFormChange} />
          <Right formData={formData} />
        </div>
        <button onClick={handleCheckout} className="mt-4 bg-black text-white py-2 px-4 rounded">
          Create Order
        </button>
      </div>
    </div>
  )
}

export default Checkout