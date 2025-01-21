import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div>
      <div className="bg-themeGray h-[44px] flex flex-col items-center justify-end gap-1 pt-1">
        <h4 className="text-[15px] font-[500] h-[17px]">Hello VAULTSNEAK App</h4>
        <p className="text-[11px] h-[24px]">
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
