"use client";

import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useBasketStore, useUserStore } from "../../../../../store"; // Import useUserStore
import { useRouter } from "next/navigation";
import { createOrderInSanity } from "@/lib/index";
import {  DeliveredIcon, StripeIcon } from "@/app/data";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserFromSanity } from "@/sanity/user/updateUserInSanity";
import {
  createCheckoutSession,
  Metadata,
} from "../../../../../actions/createCheckoutSession";

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    postalCode: "",
    locality: "",
    country: "Pakistan",
    email: "",
    phoneNumber: "",
    pan: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [processing, setProcessing] = useState(false);
  const [processingButton, setProcessingButton] = useState<string | null>(null); // Added state to track which button is processing
  const [currency, setCurrency] = useState("PKR");
  const [conversionRate, setConversionRate] = useState(1); // new state for conversion factor
  const [loading, setLoading] = useState(true);
  const groupItems = useBasketStore((state) => state.getGroupedItems());
  const { getUser, setUser: setUserStore } = useUserStore();
  const storedUser = getUser();
  const [user, setUser] = useState(storedUser);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserData = async () => {
    try {
      const data = await getUserFromSanity(user._id);
      setUser(data);
      setUserStore(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      fetchUserData();
    }
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        addressLine1: user.addressLine1 || "",
        addressLine2: user.addressLine2 || "",
        addressLine3: user.addressLine3 || "",
        postalCode: user.postalCode || "",
        locality: user.locality || "",
        country: user.country || "Pakistan",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        pan: user.pan || "",
      });
    }
  }, [user]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const calculateTotalPrice = () => {
    const total = groupItems.reduce(
      (sum, item) => sum + (item.product.price || 0) * item.quantity,
      0
    );
    return total * conversionRate;
  };

  const handleFormChange = (data: any) => {
    setFormData(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phoneNumber" && !/^03\d{0,9}$/.test(value)) {
      setErrors((prevErrors: { [key: string]: string }) => ({
        ...prevErrors,
        [name]: "Invalid phone number",
      }));
    } else if (
      name === "email" &&
      !/^[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]*\.[a-zA-Z]{0,}$/.test(value)
    ) {
      setErrors((prevErrors: { [key: string]: string }) => ({
        ...prevErrors,
        [name]: "Invalid email address",
      }));
    } else {
      setErrors((prevErrors: { [key: string]: string }) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    handleFormChange({ ...formData, [name]: value });
  };

  // New helper to fetch conversion rate from PKR to target currency
  const fetchConversionRate = async (targetCurrency: string) => {
    if (targetCurrency === "PKR") return 1;
    try {
      const res = await fetch("https://api.exchangerate-api.com/v4/latest/PKR");
      if (!res.ok) throw new Error("Failed to fetch rate.");
      const data = await res.json();
      return data.rates[targetCurrency] || 1;
    } catch (error) {
      console.error("Conversion rate error:", error);
      return 1;
    }
  };

  const handleCountryChange = async (value: string) => {
    // Update form data
    setFormData((prevData) => ({ ...prevData, country: value }));
    handleFormChange({ ...formData, country: value });
    // Map country to currency code
    let newCurrency = "PKR";
    switch (value) {
      case "USA":
        newCurrency = "USD";
        break;
      case "Canada":
        newCurrency = "CAD";
        break;
      case "UK":
        newCurrency = "GBP";
        break;
      case "Australia":
        newCurrency = "AUD";
        break;
      case "India":
        newCurrency = "INR";
        break;
      case "Pakistan":
      default:
        newCurrency = "PKR";
    }
    setCurrency(newCurrency);
    const rate = await fetchConversionRate(newCurrency);
    setConversionRate(rate);
  };

  const validateFormData = () => {
    const newErrors: any = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.addressLine1)
      newErrors.addressLine1 = "Address Line 1 is required";
    if (!formData.postalCode) newErrors.postalCode = "Postal Code is required";
    if (!formData.locality) newErrors.locality = "Locality is required";
    if (
      !formData.email ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    )
      newErrors.email = "Invalid email address";
    if (!formData.phoneNumber || !/^03\d{9}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Invalid phone number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = async () => {
    if (!validateFormData()) return;

    setProcessing(true);
    setProcessingButton("COD"); // Set processing button to COD

    const orderData = {
      orderNumber: `ORD-${Date.now()}`,
      userId: user?._id || "",
      ...formData,
      products: groupItems.map((item) => ({
        _key: crypto.randomUUID(),
        product: {
          _type: "reference",
          _ref: item.product._id,
        },
        color: item.selectedColor,
        quantity: item.quantity,
      })),
      totalPrice: calculateTotalPrice(),
      currency: currency,
      amountDiscount: 0,
      status: "pending",
      paymentMethod: "COD",
      orderDate: new Date().toISOString(),
      estimatedDeliveryDate: new Date(
        Date.now() + 4 * 24 * 60 * 60 * 1000
      ).toISOString(),
    };

    try {
      const orderId = await createOrderInSanity(orderData);

      // Send order confirmation email
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: formData.email,
          subject: "Order Confirmation",
          text: "Your order has been placed with Cash On Delivery.",
          userId: user?._id,
          isOrderEmail: true,
          fullName: formData.firstName + " " + formData.lastName,
          orderNumber: orderData.orderNumber,
        }),
      });

      router.push(`/success?orderId=${orderId.orderNumber}`);
    } catch (error) {
      console.error("Failed to create order:", error);
      setProcessing(false);
      setProcessingButton(null); // Reset processing button
    }
  };

  const handleOnlineCheckout = async () => {
    if (!validateFormData()) return;
    if (!user) return;
    setIsLoading(true);
    setProcessingButton("Online");

    try {
      const metadata: Metadata = {
        orderNumber: `ORD-${Date.now()}`,
        customerName: user.firstName + " " + user.lastName,
        customerEmail: user.email ?? "Unknown",
        userId: user._id,
        paymentMethod: "Online",
        currency: currency,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        addressLine3: formData.addressLine3,
        postalCode: formData.postalCode,
        locality: formData.locality,
        country: formData.country,
        phoneNumber: formData.phoneNumber,
      };

      const checkoutUrl = await createCheckoutSession(groupItems, metadata, conversionRate);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Checkout session error: ", error);
      setIsLoading(false);
      setProcessingButton(null);
    }
  };

  return (
    <div className="py-10 mb-8">
      <div className="max-w-[880px] mx-auto px-4">
        {!user?.isActive && (
          <div
            className="w-full mb-10 text-center bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Warning:</strong>
            <span className="block sm:inline">
              {" "}
              Your account is not activated. Please activate your account to
              checkout process.
            </span>
          </div>
        )}
        <div className="flex flex-col px-2 gap-6 lg:flex-row lg:gap-0 lg:px-0">
          <div className="space-y-10">
            <div className="lg:max-w-[440px] space-y-4">
              <h1 className="text-[21px] font-medium">
                How would you like to get your order?
              </h1>
              <p className="text-[15px] text-[#757575] pr-8">
                Customs regulation for India require a copy of the recipient's
                KYC. The address on the KYC needs to match the shipping address.
                Our courier will contact you via SMS/email to obtain a copy of
                your KYC. The KYC will be stored securely and used solely for
                the purpose of clearing customs (including sharing it with
                customs officials) for all orders and returns. If your KYC does
                not match your shipping address, please click the link for more
                information. Learn More
              </p>
              <div className="h-[82px] border border-black rounded-xl flex items-center gap-4 p-6 !mt-8">
                <span>{DeliveredIcon}</span>
                <p className="text-[15px] font-medium">Deliver It</p>
              </div>
            </div>

            <div className="lg:max-w-[440px]">
              <h1 className="text-[21px] font-medium">
                Enter your name and address:
              </h1>
              <div className="mt-6 space-y-6">
                <Input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className=" h-[56px] rounded shadow-none"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
                <Input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className=" h-[56px] rounded shadow-none"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
                <div>
                  <Input
                    type="text"
                    placeholder="Address Line 1"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    className=" h-[56px] rounded shadow-none"
                  />
                  {errors.addressLine1 && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.addressLine1}
                    </p>
                  )}
                  <p className="text-[11px] text-[#757575] px-4">
                    We do not ship to P.O. boxes
                  </p>
                </div>
                <Input
                  type="text"
                  placeholder="Address Line 2"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  className=" h-[56px] rounded shadow-none"
                />
                <Input
                  type="text"
                  placeholder="Address Line 3"
                  name="addressLine3"
                  value={formData.addressLine3}
                  onChange={handleChange}
                  className=" h-[56px] rounded shadow-none"
                />
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <Input
                      type="number"
                      placeholder="Postal Code"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className=" h-[56px] rounded shadow-none"
                    />
                    {errors.postalCode && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.postalCode}
                      </p>
                    )}
                  </div>

                  <Input
                    type="text"
                    placeholder="Locality"
                    name="locality"
                    value={formData.locality}
                    onChange={handleChange}
                    className=" h-[56px] rounded shadow-none w-1/2"
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <Select
                      value={formData.country}
                      onValueChange={handleCountryChange}
                    >
                      <SelectTrigger className="border border-gray-300 p-2 w-full rounded h-[56px] ">
                        <SelectValue placeholder="Select a Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pakistan">Pakistan</SelectItem>
                        <SelectItem value="India">India</SelectItem>
                        <SelectItem value="USA">USA</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="UK">UK</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="relative flex-1">
                    <Input
                      type="text"
                      placeholder="India"
                      value={formData.country}
                      readOnly
                      className=" h-[56px] rounded shadow-none"
                    />
                    <span className="h-2 w-2 rounded-full bg-[#19AB20] absolute top-1/2 -translate-y-1/2 right-4"></span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Checkbox
                      id="ap"
                      className="border-[#CCCCCC] shadow-none"
                    />
                    <Label className="text-[15px] cursor-pointer" htmlFor="ap">
                      Save this address to my profile
                    </Label>
                  </div>
                  <div className="flex gap-2">
                    <Checkbox
                      id="pa"
                      className="bg-[#CCCCCC] border-none shadow-none"
                    />
                    <Label className="text-[15px] cursor-pointer" htmlFor="pa">
                      Make this my preferred address
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:max-w-[440px]">
              <h1 className="text-[21px] font-medium">
                What's your contact information?
              </h1>
              <div className="space-y-4 mt-6">
                <div>
                  <Input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className=" h-[56px] rounded shadow-none"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                  <p className="text-[11px] text-[#757575] px-4">
                    A confirmation email will be sent after checkout.
                  </p>
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className=" h-[56px] rounded shadow-none"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phoneNumber}
                    </p>
                  )}
                  <p className="text-[11px] text-[#757575] px-4">
                    A carrier might contact you to confirm delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:max-w-[320px] lg:ml-auto">
            <div>
              <h2 className="text-[21px] font-medium">Order Summary</h2>
            </div>
            <div className="space-y-6">
              {loading ? (
                <Skeleton className="h-[50px] w-full" />
              ) : (
                groupItems.map((item, index) => (
                  <div
                    className="flex justify-between items-center mb-4"
                    key={index}
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={
                          item.product.image
                            ? urlFor(item.product.image).url()
                            : ""
                        }
                        alt={item.product.productName || "Product Image"}
                        className="w-[50px] h-[50px] object-cover"
                        height={50}
                        width={50}
                      />
                      <span
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: item.selectedColor }}
                      ></span>
                      <p className="text-[15px]">x{item.quantity}</p>
                    </div>
                    <p className="text-[15px]">
                      {currency}{" "}
                      {(
                        (item.product.price
                          ? item.product.price * item.quantity
                          : 0) * conversionRate
                      ).toFixed(2)}
                    </p>
                  </div>
                ))
              )}
              <div className="space-y-2">
                <div className="flex justify-between text-[14px] text-[#8D8D8D]">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>
                    {currency} {calculateTotalPrice().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-[14px] text-[#8D8D8D]">
                  <span className="text-muted-foreground">
                    Delivery/Shipping
                  </span>
                  <span>Free</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>
                    {currency} {calculateTotalPrice().toFixed(2)}
                  </span>
                </div>
                <Separator className="my-2" />
                <p className="text-[9px]  mt-1">
                  (The total reflects the price of your order, including all
                  duties and taxes)
                </p>
              </div>

              <div className="space-y-1 text-sm">
                <p className="font-bold text-[15px]">
                  Estimated Delivery Date:{" "}
                  {new Date(
                    Date.now() + 4 * 24 * 60 * 60 * 1000
                  ).toDateString()}
                </p>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full h-[60px] py-2 bg-black text-[15px] text-white font-medium rounded-xl disabled:opacity-65"
                disabled={processing || !user?.isActive}
              >
                {processingButton === "COD" ? "Processing..." : "Checkout"}
              </button>
              <div className="flex items-center justify-center gap-4">
                <div className="w-full h-[1px] bg-black rounded-full" />
                <span>OR</span>
                <div className="w-full h-[1px] bg-black rounded-full" />
              </div>
              <button
                onClick={handleOnlineCheckout}
                className="w-full h-[60px] bg-white border-2 border-[#6772E5] text-[#6772E5] hover:text-white hover:bg-[#6772E5] transition-all duration-150 text-[15px] font-semibold rounded-xl disabled:opacity-65"
                disabled={processing || !user?.isActive}
              >
                {processingButton === "Online" ? (
                  "Processing..."
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Payment with {StripeIcon}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
