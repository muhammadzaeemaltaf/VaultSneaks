"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/sanity/user/userLogin"; // Import login helper function
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useUserStore } from "../../../../store";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const router = useRouter();
  const setUser = useUserStore((state: any) => state.setUser);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const user = await loginUser(email, password, keepSignedIn);
      setUser(user);
      router.push("/");
    } catch (error: any) {
      setError("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="py-14">
        <div className="max-w-[380px] h-[489px] mx-auto space-y-6">
          <div className="flex justify-center">
            <Image
              src={"/VaultSneak_Logo-01.png"}
              alt="Logo"
              height={1000}
              width={1000}
              className="w-40"
            />
          </div>
          <div>
            <div className="w-[186.5px] mx-auto">
              <h1 className="text-lg font-[700] text-center">
                YOUR ACCOUNT FOR EVERYTHING VAULTSNEAK
              </h1>
            </div>
          </div>
          <div className="max-w-[324px] mx-auto space-y-4 text-[#BCBCBC]">
            {error && <div className="text-red-500 text-center">{error}</div>}
            <Input
              className="h-[40px] border shadow-none border-[#E5E5E5]"
              placeholder="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <Input
                className="h-[40px] border shadow-none border-[#E5E5E5] pr-10"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>
            <div className="text-xs flex items-center justify-between">
              <div className="flex items-center gap-3 py-3">
                <Checkbox
                  id="check"
                  className="border-[#8D8D8D]"
                  checked={keepSignedIn}
                  onCheckedChange={(checked) => setKeepSignedIn(checked === true)}
                />
                <Label htmlFor="check">Keep me signed in</Label>
              </div>
              <Link href={"#"}>Forgotten your password?</Link>
            </div>
            <div className="max-w-[280px] mx-auto">
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
            <Button
              className="bg-black rounded h-[40px] w-full text-[11px]"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Signing In..." : "SIGN IN"}
            </Button>
            <div className="flex items-center justify-center gap-2 whitespace-nowrap text-[12px] text-[#8D8D8D]">
              Not a Member?{" "}
              <Link href={"/joinus"} className="underline text-black">
                Join Us.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
