import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsPhone } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { config } from "../../../constants";

function VisaApplyCard() {
  return (
    <>
      <div className="pb-2 w-full md:w-fit md:p-0 p-1">
        <div className="border md:mx-2 rounded-md md:px-2 md:py-4 lg:mt-2 md:w-[99%] w-full">
          <div className=" lg:block rounded-2xl p-2   space-y-4 bg-white md:p-1 md:px-4 relative ">
            <input
              type="checkbox"
              defaultChecked
              className="peer absolute top-5 w-full h-5 inset-x-0  cursor-pointer opacity-0"
            />
            <div className="flex justify-between  ">
              <span className="text-xl">Contact Us</span>
              <span className="text-xl">
                <AiOutlinePlus />{" "}
              </span>
            </div>
            {/* peer-checked:max-h-[100vh] max-h-0 */}
            <div className=" transition-all duration-500 overflow-hidden space-y-3">
              <div className="space-y-1 w-full">
                <div className="flex items-center space-x-2 ">
                  <span className=" text-">
                    <BsPhone />
                  </span>
                  <span className="text-xs uppercase">Phone Number</span>
                </div>
                <div className="">
                  <p className="text-gray-400 font-[400] text-sm">
                    +{config.COMPANY_CONTACT_NUMBER_ONE}
                  </p>
                </div>
              </div>
              <div className="space-y-2 w-full">
                <div className="flex items-center space-x-2">
                  <span className=" ">
                    <BsPhone />
                  </span>
                  <span className="text-xs uppercase">Phone Number</span>
                </div>
                <div className="">
                  <p className="text-gray-400 font-[400] text-sm">
                    +{config.COMPANY_CONTACT_NUMBER_TWO}{" "}
                  </p>
                </div>
              </div>
              <div className="space-y-2 w-full mb-3">
                <div className="flex items-center space-x-2 ">
                  <span className=" ">
                    <MdEmail />
                  </span>
                  <span className="text-xs uppercase">Email Id</span>
                </div>
                <div className="">
                  <p className="text-gray-400 font-[400] text-sm">
                    {config.COMPANY_EMAIL}{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VisaApplyCard;
