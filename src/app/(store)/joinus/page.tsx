"use client"; //It tells Next.js it's a Client Component

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/app/data";
import Image from "next/image";
export default function Login() {
  const [country, setCountry] = useState("India"); // Default value

  return (
    <div className="max-w-[380px] mx-auto py-10 flex items-center justify-center">
      <div className="px-4 md:px-8 rounded-lg w-full max-w-md">
        {/*The VAULTSNEAK Logo */}
        <div className="flex justify-center mb-4">
          <Image 
            src={"/VaultSneak_Logo-01.png"}
            alt="Logo"
            height={1000}
            width={1000}
            className="w-40"
          />
        </div>
        {/*Our Heading */}
        <h1 className="text-2xl font-bold text-center mb-4">
          BECOME A VAULTSNEAK MEMBERS
        </h1>
        <p className="text-[14px] font-[22px] max-w-[315px] text-balance  mx-auto text-[#8D8D8D] text-center mb-6">
          Create your VAULTSNEAK Member profile and get first access to the very best
          of VAULTSNEAK products, inspiration and community.{" "}
        </p>
        {/*The Login Form */}
        <div className="space-y-4">
          {/* Email Input */}
          <Input
            type="email"
            className="border border-[#E5E5E5] p-2 w-full rounded h-[40px]"
            placeholder="Email Address"
          />

          {/*The Password Input */}
          <Input
            type="password"
            className="border border-[#E5E5E5] p-2 w-full rounded h-[40px]"
            placeholder="Password"
          />

          {/*The First Name */}
          <Input
            type="text"
            className="border border-[#E5E5E5] p-2 w-full rounded h-[40px]"
            placeholder="First Name"
          />

          {/*The Last Name */}
          <Input
            type="text"
            className="border border-[#E5E5E5] p-2 w-full rounded h-[40px]"
            placeholder="Last Name"
          />

          <div>
            {/*The Birthday Input */}
            <Input
              type="text"
              className="border border-[#E5E5E5] p-2 w-full rounded h-[40px]"
              placeholder="Date of Birth"
            />
            {/*The Birthday Question */}
            <div className="text-[11px] text-center text-[#8D8D8D] mt-2">
              Get a VAULTSNEAK Member Reward every year on your Birthday.
            </div>
          </div>

          <Select
            value={country}
            onValueChange={(value: string) => setCountry(value)}
          >
            <SelectTrigger className="border border-gray-300 p-2 w-full rounded h-[40px] text-[#8D8D8D]">
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

          {/*The Gender Selection */}
          <div className="mt-4 flex gap-4">
            <button
              type="button"
              className="flex-1 border border-[#E5E5E5] text-[#8D8D8D] rounded  p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              Male
            </button>
            <button
              type="button"
              className="flex-1 border border-[#E5E5E5] text-[#8D8D8D] rounded  p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              Female
            </button>
          </div>

          {/*The Terms and Conditions */}
          <div className="max-w-[280px] mx-auto text-[#8D8D8D]">
            <div className="text-[12px] text-center">
              By logging in, you agree to VAULTSNEAK's{" "}
              <Link href={"#"} className="underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href={"#"} className="underline">
                Terms of Use
              </Link>
              .
            </div>
          </div>

          {/*The Join Us Button */}
          <Button className="bg-black rounded h-[40px] w-full text-[11px]">
            SIGN IN
          </Button>

          {/*The Already Signed-In Link */}
          <div className="flex items-center justify-center gap-2 whitespace-nowrap text-[12px] text-[#8D8D8D]">
          Already a Member?{" "}
            <Link href={"/login"} className="underline text-black">
            Sign In.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
