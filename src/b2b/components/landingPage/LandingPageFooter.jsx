import React from "react";
import { FaFacebook, FaSquareInstagram } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { config } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { FaYoutube } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { TbBrandTripadvisor } from "react-icons/tb";

function LandingPageFooter() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="pt-10 min-h-80 bg-white w-full">
        <div className="p-5 max-w-screen-2xl mx-auto ">
          <div className="border-b mb-10">
            <div className="flex justify-start md:justify-evenly flex-col md:flex-row gap-5 md:gap-20 pt-10 mb-5 divide-y md:divide-y-0">
              <div>
                <div className="md:flex md:gap-10 md:justify-start">
                  <div>
                    <img
                      className="h-full object-fill w-[250px]"
                      src={config.COMPANY_LOGO}
                      alt=""
                    />
                  </div>
                  
                </div>
             
              </div>
              <div className="grid gap-2 pt-3 justify-center">
                {/* <a href="">
                     <div className=" flex gap-1 w-8 h-8 text-xl">
                    <h1 className="p-[10px] bg-white  rounded-full  shadow-xl">
                      <IoLogoWhatsapp />
                    </h1>
                    <div className="pt-3">
                      <h1 className="text-xs text-gray-400">Whatsapp</h1>
                    </div>
                  </div>
                </a> */}
                <a href="https://www.facebook.com/behappytourism">
                  <div className=" flex gap-1  w-8 h-8 text-xl">
                    <h1 className="p-[10px] bg-white  rounded-full  shadow-xl">
                      <FaFacebook />
                    </h1>
                    <div className="pt-3">
                      <h1 className="text-xs text-gray-400">Facebook</h1>
                    </div>
                  </div>
                </a>
                <a href="https://www.instagram.com/behappydubai">
                  <div className="  flex gap-1  w-8 h-8 text-xl">
                    <h1 className="p-[10px] bg-white  rounded-full  shadow-xl">
                      <FaSquareInstagram />
                    </h1>
                    <div className="pt-3">
                      <h1 className="text-xs text-gray-400">Instagram</h1>
                    </div>
                  </div>
                </a>
                <a href="http://www.youtube.com/@behappytraveltourismllc-du7563">
                  <div className=" flex gap-1  w-8 h-8 text-xl">
                    <h1 className="p-[10px] bg-white  rounded-full  shadow-xl">
                    <FaYoutube />
                    </h1>
                    <div className="pt-3">
                      <h1 className="text-xs text-gray-400">YouTube</h1>
                    </div>
                  </div>
                </a>
                <a href="https://twitter.com/behappydubai">
                  <div className="  flex gap-1  w-8 h-8 text-xl">
                    <h1 className="p-[7px] bg-white  rounded-full  shadow-xl">
                    <FaTwitter />
                    </h1>
                    <div className="pt-3">
                      <h1 className="text-xs text-gray-400">Twitter</h1>
                    </div>
                  </div>
                </a>
                <a href="https://www.tripadvisor.com/Attraction_Review-g295424-d23319552-Reviews-BE_HAPPY_TRAVEL_TOURISM_LLC-Dubai_Emirate_of_Dubai.html">
                  <div className="  flex gap-1  w-8 h-8 text-xl">
                    <h1 className="p-[7px] bg-white  rounded-full  shadow-xl">
                    <TbBrandTripadvisor  />
                    </h1>
                    <div className="pt-3">
                      <h1 className="text-xs text-gray-400">Tripadviser</h1>
                    </div>
                  </div>
                </a>
                </div>  
              <div className="">
                {/* <div>
                  <h1 className="text-md font-light text-slate-500">
                    Terms & Settings
                  </h1>
                </div> */}
                <div className="pt-5">
                  <button className="text-gray-300 text-sm font-extralight hover:border-b cursor-pointer">
                    Terms & conditions
                  </button>
                </div>
                <div className="pt-2">
                  <button className="text-gray-300 text-sm font-extralight hover:border-b cursor-pointer">
                    Privacy Policy
                  </button>
                </div>
                <div className="pt-2">
                  <button
                    className="text-gray-300 text-sm font-extralight hover:border-b cursor-pointer"
                    onClick={() => navigate("/contactusb2b")}
                  >
                    Contact Us
                  </button>
                </div>
                {/* <div className="pt-2">
                  <button className="text-gray-300 text-sm font-extralight hover:border-b cursor-pointer">
                    B2C Login
                  </button>
                </div>
                <div className="pt-2">
                  <button className="text-gray-300 text-sm font-extralight hover:border-b cursor-pointer">
                    Knowledge Base
                  </button>
                </div> */}
              </div>
              {/* <div>
                <div>
                  <h1 className="text-md font-light text-slate-500">
                    Top Desitnations
                  </h1>
                </div>
                <div className="pt-5">
                  <h1 className="text-gray-300 text-sm font-extralight hover:border-b cursor-pointer">
                    Dubai
                  </h1>
                </div>
                <div className="pt-2">
                  <h1 className="text-gray-300 text-sm font-extralight hover:border-b cursor-pointer">
                    Abu Dhabi
                  </h1>
                </div>
                <div className="pt-2">
                  <h1 className="text-gray-300 text-sm font-extralight hover:border-b cursor-pointer">
                    Ajman
                  </h1>
                </div>
                <div className="pt-2">
                  <h1 className="text-gray-300 text-sm font-extralight hover:border-b cursor-pointer">
                    Fujairah
                  </h1>
                </div>
                <div className="pt-2">
                  <h1 className="text-gray-300 text-sm font-extralight hover:border-b cursor-pointer">
                    Hatta
                  </h1>
                </div>
                <div className="pt-2">
                  <h1 className="text-gray-300 text-sm font-extralight hover:border-b cursor-pointer">
                    Sharjah
                  </h1>
                </div>
              </div> */}
              {/* <div>
                <div>
                  <h1 className="text-md font-light text-slate-500 hover:border-b cursor-pointer">
                    Top Attractions
                  </h1>
                </div>
                <div className="pt-5">
                  <h1 className="text-gray-300 text-sm font-extralight hover:border-b cursor-pointer">
                    {" "}
                    I Fly
                  </h1>
                </div>
                <div className="pt-2">
                  <h1 className="text-gray-300 text-sm font-extralight hover:border-b cursor-pointer">
                    Dinner In the Sky
                  </h1>
                </div>
                <div className="pt-2">
                  <h1 className="text-gray-300 text-sm font-extralight hover:border-b cursor-pointer">
                    Gyrocopter Flight Dubai
                  </h1>
                </div>
                <div className="pt-2">
                  <h1 className="text-gray-300 text-sm font-extralight hover:border-b cursor-pointer">
                    Xline Zipline Dubai
                  </h1>
                </div>
                <div className="pt-2">
                  <h1 className="text-gray-300 text-sm font-extralight hover:border-b cursor-pointer">
                    Qasr Al Watan
                  </h1>
                </div>
                <div className="pt-2">
                  <h1 className="text-gray-300 text-sm font-extralight hover:border-b cursor-pointer">
                    Dubai Parks & Resorts
                  </h1>
                </div>
              </div> */}
              {/* <div>
                <div>
                  <h1 className="text-md font-light text-slate-500">Hotels</h1>
                </div>
                <div className="pt-5">
                  <h1 className="text-gray-300 text-sm font-extralight hover:border-b cursor-pointer">
                    Citymax Hotel Al Barsha
                  </h1>
                </div>
                <div className="pt-2">
                  <h1 className="text-gray-300 text-sm font-extralight hover:border-b cursor-pointer">
                    Citymax Hotel Bur Dubai
                  </h1>
                </div>
                <div className="pt-2">
                  <h1 className="text-gray-300 text-sm font-extralight hover:border-b cursor-pointer">
                    Grand Astoria Hotel
                  </h1>
                </div>
                <div className="pt-2">
                  <h1 className="text-gray-300 text-sm font-extralight hover:border-b cursor-pointer">
                    Royal Falcon Hotel
                  </h1>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPageFooter;
