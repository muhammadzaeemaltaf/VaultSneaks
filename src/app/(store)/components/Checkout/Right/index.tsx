import { Separator } from "@/components/ui/separator";
import Image from "next/image";
// import { Products } from "../../../../../data";

export default function OrderSummary() {
  // const product1 = Products.find(
  //   (product) => product.name === "Nike Dri-FIT ADV TechKnit Ultra"
  // );
  // const product2 = Products.find(
  //   (product) => product.name === "Nike Air Max 97 SE"
  // );
  return (
    <div className="max-w-[320px] lg:ml-auto">
      <div>
        <h2 className="text-[21px] font-medium">Order Summary</h2>
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-[14px] text-[#8D8D8D]">
            <span className="text-muted-foreground">Subtotal</span>
            <span>₹20,890.00</span>
          </div>
          <div className="flex justify-between text-[14px] text-[#8D8D8D]">
            <span className="text-muted-foreground">Delivery/Shipping</span>
            <span>Free</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>₹20,890.00</span>
          </div>
          <Separator className="my-2" />
          <p className="text-[9px]  mt-1">
            (The total reflects the price of your order, including all duties
            and taxes)
          </p>
        </div>

        <div className="space-y-1 text-sm">
          <p className="font-bold text-[15px]">
            Arrives Mon, 27 Mar - Wed, 12 Apr
          </p>
        </div>
        {/* <div className="space-y-4">
          {[product1, product2].map(
            (product, index) =>
              product && (
                <div className="flex gap-4" key={index}>
                  <Image
                    src={product.image}
                    alt="Nike Dri-FIT Running Top"
                    width={1000}
                    height={1000}
                    className="rounded h-[150px] w-[150px] sm:h-[208px]  sm:w-[208px] object-cover"
                  />
                  <div className="flex-1 space-y-0.5">
                    <h3 className="font-medium">
                     {product.name}
                    </h3>
                    <p className="text-[13px] text-[#8D8D8D]">Qty: 1</p>
                    <p className="text-[13px] text-[#8D8D8D]">Size: L</p>
                    <p className="text-[13px] text-[#8D8D8D]">{product.price}.00</p>
                  </div>
                </div>
              )
          )}
        </div> */}
      </div>
    </div>
  );
}
