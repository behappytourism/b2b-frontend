import React, { useState, useEffect } from "react";

import { IoLocationOutline } from "react-icons/io5";
import {
  MdAppRegistration,
  MdOutlineBookOnline,
  MdOutlineMarkUnreadChatAlt,
  MdEmail,
} from "react-icons/md";
import { GiVibratingShield } from "react-icons/gi";
import { RiSecurePaymentFill, RiPriceTag2Fill } from "react-icons/ri";
import MobileAppCard from "../Footers/MobileAppCard";

import LandingPageFooter from "./LandingPageFooter";
import LandingPageHeader from "./LandingPageHeader";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import LoginSection from "./LoginSection";
import ErrorAlert from "../Alerts/ErrorAlert";
import axios from "../../../axios";
import { config } from "../../../constants";
import { 
  MdOutlineMiscellaneousServices, 
  MdFolderSpecial, 
  MdAttractions, 
  MdOutlineSupportAgent
} from "react-icons/md";
import { SiAdguard } from "react-icons/si";
import { IoCarSportSharp } from "react-icons/io5";
import { TbBrandBooking } from "react-icons/tb";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

function LandingPage() {
  //
  const renderServiceSection = () => {
    return (
      <div className="pt-24 bg-white min-h-[500px]">
        <div className="flex md:flex-row flex-col gap-5 md:gap-3 justify-center  p-5">
          <div className="order-last md:order-first grid grid-cols-2 gap-5">
            <div className="">
              <div className="">
                <h1 className="text-sky-500 text-5xl flex justify-center items-center h-16 bg-sky-100 w-16 rounded"><SiAdguard /></h1>
              </div>
              <div className=" max-w-[250px] pt-4">
                <h1 className="text-xl font-bold">Best Price Guarantee</h1>
                {/* <h1 className="text-sm text-slate-400 pt-1 ">
                  We are committed to serve the best with customers{" "}
                </h1> */}
              </div>
            </div>
            <div className="">
              <div className="">
              <h1 className="text-sky-500 text-5xl flex justify-center items-center h-16 bg-sky-100 w-16 rounded"><MdFolderSpecial /></h1>
              </div>
              <div className=" max-w-[250px] pt-4">
                <h1 className="text-xl font-bold">Special Deals</h1>
                {/* <h1 className="text-sm text-slate-400 pt-1 ">
                  The tour guide will help you in your destination
                </h1> */}
              </div>
            </div>
            <div className="">
              <div className="">
              <h1 className="text-sky-500 text-5xl flex justify-center items-center h-16 bg-sky-100 w-16 rounded"><MdAttractions /></h1>
              </div>
              <div className=" max-w-[250px] pt-4">
                <h1 className="text-xl font-bold">Top Attractions</h1>
                {/* <h1 className="text-sm text-slate-400 pt-1 ">
                  The best destination in the whole world are ready for you{" "}
                </h1> */}
              </div>
            </div>
            <div className="">
              <div className="">
              <h1 className="text-sky-500 text-5xl flex justify-center items-center h-16 bg-sky-100 w-16 rounded"><IoCarSportSharp /></h1>
              </div>
              <div className=" max-w-[250px] pt-4">
                <h1 className="text-xl font-bold">Transfers</h1>
                {/* <h1 className="text-sm text-slate-400 pt-1 ">
                  The best destination in the whole world are ready for you{" "}
                </h1> */}
              </div>
            </div>
            <div className="">
              <div className="">
              <h1 className="text-sky-500 text-5xl flex justify-center items-center h-16 bg-sky-100 w-16 rounded"><MdOutlineSupportAgent /></h1>
              </div>
              <div className=" max-w-[250px] pt-4">
                <h1 className="text-xl font-bold">24x7 Support</h1>
                {/* <h1 className="text-sm text-slate-400 pt-1 ">
                  The best destination in the whole world are ready for you{" "}
                </h1> */}
              </div>
            </div>
            <div className="">
              <div className="">
               <h1 className="text-sky-500 text-5xl flex justify-center items-center h-16 bg-sky-100 w-16 rounded"><TbBrandBooking /></h1>
              </div>
              <div className=" max-w-[250px] pt-4">
                <h1 className="text-xl font-bold">Easy Booking</h1>
                {/* <h1 className="text-sm text-slate-400 pt-1 ">
                  Ease of booking process for customers convenience{" "}
                </h1> */}
              </div>
            </div>
          </div>
          <div className="order-first md:order-last">
            <div>
              <h1 className="max-w-[350px] text-5xl font-extrabold">
                Who we are!
              </h1>
              <div className="pt-10">
                <h1 className="text-slate-400 text-xl font-medium flex justify-content max-w-md">
                BE HAPPY TRAVEL & TOURISM L.L.C. is A Dubai based Premier Destination Management Company. focused on B2B clients.
                We vow to Provide the best Deals and Quality Service to our travel partners, and create unforgettable memories for the clients.
                </h1>

              </div>
            </div>
          </div>
        </div>
         
      </div>
    );
  };
  //
  //
  const renderTopAttractions = () => {
    const [topAttractionsData, setTopAttractionsData] = useState([]);

    const getTopAttractions = async () => {
      try {
        const res = await axios.get("/home");
        setTopAttractionsData(res?.data?.topAttractions);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      getTopAttractions();
    }, []);

    return (
      <div className="bg-white w-full h-auto">
      {
        topAttractionsData?.length ? (
          <div className="pt-10">
            <h1 className="text-center text-3xl font-extrabold">
              Top Attractions
            </h1>
          </div>
        ) : ""
      }
        <div className="flex justify-center p-10 ">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {topAttractionsData?.map((ele, index) => {
              return (
                <div
                  key={index}
                  className="w-80 h-auto rounded-md bg-slate-50 "
                >
                  <div>
                    <img
                      className="object-cover h-64 rounded-lg"
                      src={
                        ele?.images?.length
                          ? config.SERVER_URL + ele?.images[0]
                          : ""
                      }
                      alt=""
                    />
                  </div>
                  <div className="pt-5 p-2">
                    <h1 className="text-2xl font-bold">{ele?.title}</h1>
                  </div>
                  <div className="flex gap-2 pt-2 p-2">
                    <div>
                      <h1 className="text-xl text-gray-300">
                        <IoLocationOutline />
                      </h1>
                    </div>
                    <div>
                      <h1 className="text-gray-300 ">
                        {ele?.destination?.name}
                      </h1>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  //
  const renderChooseUsSection = () => {
    return (
      <div className="">
        <div className="pt-10 px-10 bg-white">
          <div>
            <h1 className="text-center text-3xl font-bold">WHY CHOOSE US?</h1>
          </div>
          <div className="py-5">
            <div className="grid md:grid-cols-2 gap-10 p-5 max-w-screen-2xl mx-auto">
              <div className="flex gap-5 justify-center">
                <div className="pt-2">
                  <h1 className="text-4xl text-sky-500 rounded-full bg-sky-50 p-3">
                    <MdAppRegistration />
                  </h1>
                </div>
                <div>
                  <div>
                    <h1 className="text-lg font-medium">
                    Competitive Pricing
                    </h1>
                  </div>
                  <div className="max-w-lg text-gray-400 text-sm">
                    <h1>
                     Access to competitive and negotiated rates, ensuring cost-effectiveness for your clients.
                    </h1>
                  </div>
                </div>
              </div>
              <div className="flex gap-5 justify-center">
                <div className="pt-2">
                  <h1 className="text-4xl text-sky-500 rounded-full bg-sky-50 p-3">
                    <MdOutlineBookOnline />
                  </h1>
                </div>
                <div>
                  <div>
                    <h1 className="text-lg font-medium">
                    24/7 Support
                    </h1>
                  </div>
                  <div className="max-w-lg text-gray-400 text-sm">
                    <h1>
                    Dedicated customer support available around the clock to address any issues or queries promptly.
                    </h1>
                  </div>
                </div>
              </div>
              <div className="flex gap-5 justify-center">
                <div className="pt-6">
                  <h1 className="text-4xl text-sky-500 rounded-full bg-sky-50 p-3">
                    <GiVibratingShield />
                  </h1>
                </div>

                <div>
                  <div>
                    <h1 className="text-lg font-medium">
                    Free & instant Registration
                    </h1>
                  </div>
                  <div className="max-w-lg text-gray-400 text-sm">
                    <h1>
                      Meet Eligibility, Enjoy the Perks: Secure Free & Quick Registration Today!
                    </h1>
                  </div>
                </div>
              </div>
              <div className="flex gap-5 justify-center">
                <div className="pt-8">
                  <h1 className="text-4xl text-sky-500 rounded-full bg-sky-50 p-3">
                    <MdOutlineMarkUnreadChatAlt />
                  </h1>
                </div>
                <div>
                  <div>
                    <h1 className="text-lg font-medium">
                    Easy online booking
                    </h1>
                  </div>
                  <div className="max-w-lg text-gray-400 text-sm">
                    <h1>
                      Effortless Transactions, Anytime, anywhere: Experience the Ease of Online bookings!
                    </h1>
                  </div>
                </div>
              </div>
              <div className="flex gap-5 justify-center">
                <div className="pt-2">
                  <h1 className="text-4xl text-sky-500 rounded-full bg-sky-50 p-3">
                    <RiSecurePaymentFill />
                  </h1>
                </div>
                <div>
                  <div>
                    <h1 className="text-lg font-medium">
                    Secure Online Transaction
                    </h1>
                  </div>
                  <div className="max-w-lg text-gray-400 text-sm">
                    <h1>
                     Confidence in Every Click: Experience Secure Online Transactions with Peace of Mind.
                    </h1>
                  </div>
                </div>
              </div>
              <div className="flex gap-5 justify-center">
                <div className="pt-5">
                  <h1 className="text-4xl text-sky-500 rounded-full bg-sky-50 p-3 ">
                    <RiPriceTag2Fill />
                  </h1>
                </div>
                <div>
                  <div>
                    <h1 className="text-lg font-medium">
                       Happy Customers
                    </h1>
                  </div>
                  <div className="max-w-lg text-gray-400 text-sm">
                    <h1>
                      Customer Happiness, Our Pride – Where Every Interaction Sparks a Smile.
                    </h1>
                  </div>
                </div>
              </div>
              <div className="flex gap-5 justify-center">
                <div className="pt-5">
                  <h1 className="text-4xl text-sky-500 rounded-full bg-sky-50 p-3 ">
                    <MdOutlineMiscellaneousServices />
                  </h1>
                </div>
                <div>
                  <div>
                    <h1 className="text-lg font-medium">
                      Commitment to Quality Services
                    </h1>
                  </div>
                  <div className="max-w-lg text-gray-400 text-sm">
                    <h1>
                     Customer Happiness, Our Pride – Where Every Interaction Sparks a Smile.
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  //
  const renderStatisticSection = () => {
    return (
      <div className="w-full min-h-[500px] bg-slate-50">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-32 items-center justify-center md:pt-32 py-10">
          <div>
            <img
              className="w-80 h-72"
              src="https://www.nivabupa.com/content/dam/nivabupa/Image/new-travel-assure/travelassure_screen1_HeroImage.svg"
              alt=""
            />
          </div>
          <div>
            <div>
              <h1 className="text-4xl font-bold max-w-md">
                Our Best Experience And Service For You
              </h1>
            </div>
            <div className="pt-10">
              <h1 className="text-sm text-gray-300 max-w-md">
              Our commitment is to provide you with the finest experience and impeccable service. From start to finish, your satisfaction is our priority. Choose us for a journey that exceeds expectations and a service that stands as our best, exclusively for you
              </h1>
            </div>
            <div className="pt-10 flex gap-20">
              <div>
                <h1 className="text-4xl text-blue-400 font-medium">10+</h1>
                <h1 className="text-gray-300 max-w-[30px]">Year Experience</h1>
              </div>
              <div>
                <h1 className="text-4xl text-blue-400 font-medium">1000+</h1>
                <h1 className="text-gray-300 max-w-[30px]">Top Attractions</h1>
              </div>
              <div>
                <h1 className="text-4xl text-blue-400 font-medium">90K</h1>
                <h1 className="text-gray-300 max-w-[30px]">Happy Travelers</h1>
              </div>
              <div>
                <h1 className="text-4xl text-blue-400 font-medium">200+</h1>
                <h1 className="text-gray-300 max-w-[30px]">Our Partners</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="bg-slate-50">
      <div>
        <LandingPageHeader />
      </div>

      {/* <div>
            <div className='w-full relative'>
                <img className='w-full h-62' src="https://img.veenaworld.com/customized-holidays/world/dubai-egypt-israel/shdz1/shdz1-bnn-1.jpg" alt="" />
            </div>
            <div className='absolute top-36 right-52 bg-white rounded-3xl w-96 h-96 shadow-xl'>
                <div className='pt-8 pl-8'>
                    <h1 className='text-lg font-semibold'>Login Now</h1>
                </div>
                <div className='grid p-5 pl-8 gap-5'>
                    <div className=''>
                        <div className='flex'>
                            <div className='h-12 w-10 bg-slate-200 rounded-l-full'>
                                <h1 className='p-[14px] text-xl text-gray-400'>
                                <BsPersonFill/>
                                </h1>
                            </div>
                            <div>
                                <input type="text" className='bg-slate-200 h-12 w-72 rounded-r-full outline-none placeholder:text-sm placeholder:' placeholder='Agent Code' />
                            </div>
                        </div>
                    </div>
                    <div>
                    <div className='flex'>
                            <div className='h-12 w-10 bg-slate-200 rounded-l-full'>
                                <h1 className='p-[14px] text-xl text-gray-400'>
                                <MdEmail/>
                                </h1>
                            </div>
                            <div>
                                <input type="text" className='bg-slate-200 h-12 w-72 rounded-r-full outline-none placeholder:text-sm placeholder:' placeholder='Email' />
                            </div>
                        </div>
                    </div>
                    <div>
                    <div className='flex'>
                            <div className='h-12 w-10 bg-slate-200 rounded-l-full'>
                                <h1 className='p-[14px] text-xl text-gray-400'>
                                <IoIosLock/>
                                </h1>
                            </div>
                            <div>
                                <input type="text" className='bg-slate-200 h-12 w-72 rounded-r-full outline-none placeholder:text-sm placeholder:' placeholder='Password' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-end mr-8 '>
                    <h1 className='text-sm cursor-pointer'>Forgot password?</h1>
                </div>
                <div className='flex justify-center'>
                    <div className='pt-5'>
                        <button className='border rounded-full w-32 h-9 hover:bg-black hover:text-white bg-slate-50'>Submit</button>
                    </div>
                </div>
            </div>
        </div> */}

      {/* new changes for just try */}
      <LoginSection />
      {renderServiceSection()}
      <div>
      <div className="flex justify-center Items-center pt-20">
            <h1 className="text-xl md:text-2xl font-bold">Service Excellence, Trust Always – Your Best Choice, Every Time.</h1>
          </div>
        <div className="w-full min-h-96 pt-20">
          {renderTopAttractions()}

          {renderStatisticSection()}
          {renderChooseUsSection()}

          {/* Mobile App Add */}
          {/* <div className='w-full h-[400px] bg-slate-50'>
                    <div className='pt-20 '>
                        <MobileAppCard/>
                    </div>
                </div> */}

          {/* Footer */}
          <div>
            <LandingPageFooter />
          </div>
        </div>
        <ErrorAlert />
      </div>
    </div>
  );
}

export default LandingPage;
