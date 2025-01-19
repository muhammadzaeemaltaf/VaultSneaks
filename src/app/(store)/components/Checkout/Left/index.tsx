"use client";

import React, { useState } from "react";
import { DeliveredIcon } from "@/app/data";
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
import { Button } from "@/components/ui/button";
const Left = () => {
  const [country, setCountry] = useState("India"); // Default value

  return (
    <div className="space-y-10">
      <div className="max-w-[440px] space-y-4">
        <h1 className="text-[21px] font-medium">
          How would you like to get your order?
        </h1>
        <p className="text-[15px] text-[#757575] pr-8">
          Customs regulation for India require a copy of the recipient's KYC.
          The address on the KYC needs to match the shipping address. Our
          courier will contact you via SMS/email to obtain a copy of your KYC.
          The KYC will be stored securely and used solely for the purpose of
          clearing customs (including sharing it with customs officials) for all
          orders and returns. If your KYC does not match your shipping address,
          please click the link for more information. Learn More
        </p>
        <div className="h-[82px] border border-black rounded-xl flex items-center gap-4 p-6 !mt-8">
          <span>{DeliveredIcon}</span>
          <p className="text-[15px] font-medium">Deliver It</p>
        </div>
      </div>

      <div className="max-w-[440px]">
        <h1 className="text-[21px] font-medium">
          Enter your name and address:
        </h1>
        <div className="mt-6 space-y-6">
          <Input
            type="text"
            placeholder="First Name"
            className=" h-[56px] rounded shadow-none"
          />
          <Input
            type="text"
            placeholder="Last Name"
            className=" h-[56px] rounded shadow-none"
          />
          <div>
            <Input
              type="text"
              placeholder="Address Line 1"
              className=" h-[56px] rounded shadow-none"
            />
            <p className="text-[11px] text-[#757575] px-4">
              We do not ship to P.O. boxes
            </p>
          </div>
          <Input
            type="text"
            placeholder="Address Line 2"
            className=" h-[56px] rounded shadow-none"
          />
          <Input
            type="text"
            placeholder="Address Line 3"
            className=" h-[56px] rounded shadow-none"
          />
          <div className="flex gap-4">
            <Input
              type="number"
              placeholder="Postal Code"
              className=" h-[56px] rounded shadow-none"
            />
            <Input
              type="text"
              placeholder="Locality"
              className=" h-[56px] rounded shadow-none"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Select
                value={country}
                onValueChange={(value: string) => setCountry(value)}
              >
                <SelectTrigger className="border border-gray-300 p-2 w-full rounded h-[56px] ">
                  <SelectValue placeholder="Select a Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="Pakistan">Pakistan</SelectItem>
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
                value={country}
                readOnly
                className=" h-[56px] rounded shadow-none"
              />
              <span className="h-2 w-2 rounded-full bg-[#19AB20] absolute top-1/2 -translate-y-1/2 right-4"></span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Checkbox id="ap" className="border-[#CCCCCC] shadow-none" />
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

      <div className="max-w-[440px]">
        <h1 className="text-[21px] font-medium">
          What's your contact information?
        </h1>

        <div className="space-y-4 mt-6">
          <div>
            <Input
              type="text"
              placeholder="Email"
              className=" h-[56px] rounded shadow-none"
            />
            <p className="text-[11px] text-[#757575] px-4">
              A confirmation email will be sent after checkout.
            </p>
          </div>
          <div>
            <Input
              type="text"
              placeholder="Phone Number"
              className=" h-[56px] rounded shadow-none"
            />
            <p className="text-[11px] text-[#757575] px-4">
              A carrier might contact you to confirm delivery.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[440px]">
        <h1 className="text-[21px] font-medium">What's your PAN?</h1>

        <div className="space-y-4 mt-6">
          <div>
            <Input
              type="number"
              placeholder="PAN"
              className=" h-[56px] rounded shadow-none"
            />
            <p className="text-[12px] leading-[24px] text-[#757575] pl-4 pr-14">
              Enter your PAN to enable payment with UPI, Net Banking or local
              card methods
            </p>
          </div>
          <div className="flex gap-2">
            <Checkbox id="PANP" className="border-[#CCCCCC] shadow-none" />
            <Label
              className="text-[11px] cursor-pointer text-[#757575]"
              htmlFor="PANP"
            >
              Save PAN details to Nike Profile
            </Label>
          </div>
        </div>
      </div>

      <div className="max-w-[440px]">
        <div className="space-y-4 mt-6">
          <div className="flex gap-2">
            <Checkbox id="desc" className="border-[#CCCCCC] shadow-none" />
            <Label
              className="text-[12px] cursor-pointer text-[#757575] pr-8"
              htmlFor="desc"
            >
              I have read and consent to eShopWorld processing my information in
              accordance with the{" "}
              <span className="underline">Privacy Statement</span> and{" "}
              <span className="underline">Cookie Policy</span>. eShopWorld is a
              trusted Nike partner.
            </Label>
          </div>
        </div>
      </div>

      <div className="border-b pb-6">
        <Button className="bg-[#F5F5F5] hover:bg-gray-100 text-[15px] text-[#757575] font-medium max-w-[440px] w-full rounded-full shadow-none h-[60px]">
          Continue
        </Button>
      </div>

      <div className="max-w-[440px] text-[21px] font-medium space-y-3">
        <p className="border-b pb-6">Delievery</p>
        <p className="text-[#757575] border-b pb-6">Shipping</p>
        <p className="text-[#757575] border-b pb-6">Billing</p>
        <p className="text-[#757575]">Payment</p>
      </div>
    </div>
  );
};

export default Left;
