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
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createUserInSanity } from "@/sanity/user/createUserInSanity";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import LoadingSpinner from "../components/Spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [country, setCountry] = useState("India"); // Default value
  const [gender, setGender] = useState("");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);
    const profilePicture =
      gender === "Male"
        ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        : "https://static.vecteezy.com/system/resources/previews/046/559/240/non_2x/placeholder-avatar-female-person-default-woman-avatar-image-gray-profile-anonymous-face-picture-illustration-isolated-on-background-vector.jpg";

    const user = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      country: country,
      gender: gender,
      profilePicture: profilePicture,
    };

    const response: any = await createUserInSanity(user);

    if (response.success) {
      toast.success(response.message);
      console.log(response.message);
      router.push("/login");
    } else {
      toast.error(response.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-[380px] mx-auto py-10 flex items-center justify-center">
      <ToastContainer />
      <div className="px-4 md:px-8 rounded-lg w-full max-w-md">
        {/*The VAULTSNEAK Logo */}
        <div className="flex justify-center mb-4">
          <Image
            src={'/VaultSneak_Logo-01.png'}
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
          Create your VAULTSNEAK Member profile and get first access to the very
          best of VAULTSNEAK products, inspiration and community.{" "}
        </p>
        {/*The Login Form */}
        <div className="space-y-4">
          {/* Email Input */}
          <Input
            type="email"
            className="border border-[#E5E5E5] p-2 w-full rounded h-[40px]"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/*The Password Input */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              className="border border-[#E5E5E5] p-2 w-full rounded h-[40px]"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          {/*The First Name */}
          <Input
            type="text"
            className="border border-[#E5E5E5] p-2 w-full rounded h-[40px]"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          {/*The Last Name */}
          <Input
            type="text"
            className="border border-[#E5E5E5] p-2 w-full rounded h-[40px]"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <div>
            {/*The Birthday Input */}
            <Input
              type="date"
              className="border border-[#E5E5E5] p-2 w-full rounded h-[40px]"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
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
              className={`flex-1 border ${gender === "Male" ? "border-black" : "border-[#E5E5E5]"} text-[#8D8D8D] rounded p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black`}
              onClick={() => setGender("Male")}
            >
              Male
            </button>
            <button
              type="button"
              className={`flex-1 border ${gender === "Female" ? "border-black" : "border-[#E5E5E5]"} text-[#8D8D8D] rounded p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black`}
              onClick={() => setGender("Female")}
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
          <Button
            className="bg-black rounded h-[40px] w-full text-[11px]"
            onClick={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner /> : "REGISTER"}
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
