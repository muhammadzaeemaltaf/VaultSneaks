import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ReuseableFunction = ({
  title,
  image,
  heading,
  paragraph,
  buttonText,
  buttonLink,
}: {
  title: string;
  image: string;
  heading: string;
  paragraph: string;
  buttonText: string;
  buttonLink: string;
}) => {
  return (
    <div>
      <div className="container space-y-4">
        <h2 className="text-[23px] font-[500]">{title}</h2>
        <div className="925px">
          <Image
            src={image}
            alt="Feature"
            height={1000}
            width={1000}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-3 items-center">
          <h1 className="text-2xl text-center md:text-[54px] font-[500] leading-[24px] md:mt-10">{heading}</h1>
          <p className="text-[15px] text-center md:mt-6">
           {paragraph}
          </p>
          <Button className="bg-black rounded-full mt-3"><Link href={buttonLink}>{buttonText}</Link></Button>
        </div>
      </div>
    </div>
  );
};

export default ReuseableFunction;
