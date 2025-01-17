import React from "react";
import Banner from "./Banner";
import Look from "./Look";
import ProductSlider from "../ProductsSlider";
import { Products } from "@/app/data";
import ReuseableFunction from "./ReuseableFunction";
import Essential from "./Essential";

const HomePage = () => {
  const menObj = Products.filter(
    (item) => item.shortDescription.includes("Men") && !item.shortDescription.includes("Shoes")
  );
  const womenObj = Products.filter(
    (item) =>
      item.shortDescription.includes("Women") && !item.shortDescription.includes("Shoes")
  );

  return (
    <div>
      <Banner />
      <Look />
      <ProductSlider
        heading="Best of Air Max"
        anchor="/shop"
        anchorText="Shop"
        obj={Products}
      />
      <ReuseableFunction
        title="Featured"
        image="/feature.jpg"
        heading="STEP INTO WHAT FEELS GOOD"
        paragraph=" Cause everyone should know the feeling of running in that perfect pair."
        buttonText="Find Your Shoe"
      />
      <div className="flex flex-col gap-2 container !mt-10 md:mt-0">
        <div>
          <h1 className="text-[23px] font-[500]">Gear Up</h1>
        </div>
        <div className="flex flex-col md:flex-row md:gap-6">
          <ProductSlider
            anchor="/shop"
            anchorText="Shop Men's"
            half={true}
            obj={menObj}
          />
          <ProductSlider
            anchor="/shop"
            anchorText="Shop Women's"
            half={true}
            obj={womenObj}
          />
        </div>
      </div>
      <ReuseableFunction
          title="Don't Miss"
          image="/dontmissimage.jpg"
          heading="FLIGHT ESSENTIALS"
          paragraph=" Your built-to-last, all-week wears—but with style only Jordan Brand can deliver."
          buttonText="Shop"
        />
        <Essential />
    </div>
  );
};

export default HomePage;
