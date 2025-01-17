import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { CartIcon2, Products } from "../../../../data";
import { Info } from "lucide-react";
import Link from "next/link";

const page = ({ params }: { params: { id: string } }) => {
  const product = Products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="py-10">
        <div className="container">
          <div className="flex flex-col items-center gap-4">
            <Info className="h-[100px] w-[100px]" />
            <h1 className="font-bold text-4xl text-center">Product Not Found</h1>
            <p className="text-lg text-[#8D8D8D] text-center">
            The product you're looking for doesn't exist or may have been removed.
            </p>
            <Button className="bg-black rounded-full h-[56px] max-w-[280px] w-full">
              <Link href={"/products"}>Back to Shop</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="max-w-[1200px] mx-auto pr-3">
        <div className="flex justify-between flex-wrap  gap-8 items-start ">
          <div className="bg-[#F8F8F8] mx-auto  md:w-[653px] md:h-[653px] rounded-lg p-8 flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.name}
              width={1000}
              height={1000}
              className="md:w-[653px] md:h-[653px] object-cover"
            />
          </div>
          <div className="space-y-6 w-[376px] px-4 lg:px-1 lg:py-1 mx-auto">
            <div className="space-y-2">
              <h1 className="text-[36px] lg:text-[48px] leading-[36px] lg:leading-[48px]  font-[500] tracking-tight">
                {product.name}
              </h1>
              <p className="text-sm/relaxed text-muted-foreground text-balance">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
                rerum vitae cumque assumenda vero et animi dolorum error,
                voluptatem a nobis dignissimos debitis est culpa obcaecati
                maiores tempore maxime repudiandae harum delectus laborum
                molestiae quas dolor! Provident, laborum non! Beatae.{" "}
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-[36px] font-[500]">
                  {product.price}.00
                </span>
              </div>
              <Button className="rounded-full w-auto px-6 bg-black" size="lg">
                <span className="mx-2">{CartIcon2}</span>
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
