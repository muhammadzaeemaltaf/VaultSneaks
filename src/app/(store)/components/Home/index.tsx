"use client";

import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import Look from "./Look";
import ProductSlider from "../ProductsSlider";
import ReuseableFunction from "./ReuseableFunction";
import Essential from "./Essential";
import { getAllProducts } from "@/sanity/products/getAllProducts";
import { getMenProducts } from "@/sanity/products/getMenProducts";
import { getWomenProducts } from "@/sanity/products/getWomenProducts";
import { Product } from "../../../../../sanity.types";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [menProducts, setMenProducts] = useState<Product[]>([]);
  const [womenProducts, setWomenProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const products = await getAllProducts();
      const menProducts = await getMenProducts();
      const womenProducts = await getWomenProducts();
      setProducts(products);
      setMenProducts(menProducts);
      setWomenProducts(womenProducts);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Banner />
      <Look />
      <ProductSlider
        heading="Best of Air Max"
        anchor="/shop"
        anchorText="Shop"
        obj={products}
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
            obj={menProducts}
          />
          <ProductSlider
            anchor="/shop"
            anchorText="Shop Women's"
            half={true}
            obj={womenProducts}
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
