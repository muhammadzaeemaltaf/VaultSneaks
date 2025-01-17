import { Input } from "@/components/ui/input";
import React from "react";
import { SearchIcon } from "../../../../data";
import Left from "./Left";
import Right from "./Right";

const ContactUs = () => {
  return (
    <div className="py-10">
      <div className="container">
        <h1 className="font-[500] text-[32px] text-center">GET HELP</h1>
        <div className="max-w-[457.33px] relative mx-auto">
          <Input
            type="search"
            className="w-full h-[56px]"
            placeholder="What can we help you with?"
          />
          <span className="absolute top-1/2 -translate-y-1/2 right-5">
            {SearchIcon}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row mt-8">
          <div>
            <Left />
          </div>
          <div className="flex-1">
            <Right />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
