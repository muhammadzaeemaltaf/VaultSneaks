import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Look = () => {
  return (
    <div className="py-10">
      <div className="flex flex-col items-center gap-5">
        <h4 className="text-[15px] font-[600] h-[24px]">First Look</h4>
        <h1 className="font-[500] text-2xl text-center md:text-[56px]">VAULTSNEAK Air Max Pulse</h1>
        <p className="text-[15px] md:w-[511px] text-center px-2 md:px-0">
          Extreme comfort. Hyper durable. Max volume. Introducing the Air Max
          Pulse —designed to push you past your limits and help you go to the
          max.
        </p>
        <div className="flex gap-2 mt-2">
            <Button className="rounded-full bg-black">Notify me</Button>
            <Button className="rounded-full bg-black"><Link href={'/products'}>Shop Air Max</Link></Button>
        </div>
      </div>
    </div>
  );
};

export default Look;
