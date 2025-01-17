import Image from "next/image";
import React from "react";

const Right = () => {
  return (
    <div className="h-full pt-20 lg:pt-0">
      <div className="px-6 flex flex-col items-center min-w-[313.25px] lg:border-l h-full lg:pl-20">
        <h1 className="text-[28px] font-medium mb-6">CONTACT US</h1>
        <div className="space-y-16 lg:max-w-[265.25px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1">
          {/* Phone Section */}
          <div className="text-center text-base">
            <div className="mb-2 flex justify-center">
              <Image
                src={"/phone.png"}
                alt="Phone Icon"
                width={1000}
                height={1000}
                className="h-16 w-16"
              />
            </div>
            <p className="font-semibold">000 800 919 0566</p>
            <p>Products & Orders: 24 hours a day, 7 days a week</p>
            <p>Company Info & Enquiries: 07:30 - 16:30, Monday - Friday</p>
          </div>

          {/* Chat Section */}
          <div className="text-center text-base">
            <div className="mb-2 flex justify-center">
              <Image
                src={"/msg.png"}
                alt="Chat Icon"
                width={1000}
                height={1000}
                className="h-16 w-16"
              />
            </div>
            <p className="font-semibold">24 hours a day</p>
            <p>7 days a week</p>
          </div>

          {/* Email Section */}
          <div className="text-center text-base">
            <div className="mb-2 flex justify-center">
              <Image
                src={"/email.png"}
                alt="Email Icon"
                width={1000}
                height={1000}
                className="h-16 w-16"
              />
            </div>
            <p className="font-semibold">We’ll reply within</p>
            <p>five business days</p>
          </div>

          {/* Store Locator Section */}
          <div className="text-center text-base">
            <div className="mb-2 flex justify-center">
              <Image
                src={"/locator.png"}
                alt="Locator Icon"
                width={1000}
                height={1000}
                className="h-16 w-16"
              />
            </div>
            <p className="font-semibold">STORE LOCATOR</p>
            <p>Find Nike retail stores near you</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Right;
