import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div>
      <div className="bg-themeGray flex flex-col items-center justify-end gap-1 py-4">
        <h4 className="text-[15px] font-[500]">Hello VAULTSNEAK App</h4>
        <p className="text-[11px] text-center">
          Download the app to access everything VAULTSNEAK. Get Your Great
        </p>
      </div>
      <div className="container  md:px-[40px]">
        <Image 
            src={'/banner.png'}
            alt="Banner"
            height={1000}
            width={1000}
            className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Banner;
