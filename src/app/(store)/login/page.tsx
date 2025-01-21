import React from "react";
import { Logo } from "@/app/data";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const page = () => {
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
            <Input
              className="h-[40px] border shadow-none border-[#E5E5E5]"
              placeholder="Email address"
              type="email"
            />
            <Input
              className="h-[40px] border shadow-none border-[#E5E5E5]"
              placeholder="Password"
              type="Password"
            />
            <div className="text-xs flex items-center justify-between">
              <div className="flex items-center gap-3 py-3">
                <Checkbox id="check" className="border-[#8D8D8D]" />
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
            <Button className="bg-black rounded h-[40px] w-full text-[11px]">
              SIGN IN
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
