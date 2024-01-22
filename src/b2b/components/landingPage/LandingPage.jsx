import React from "react";

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
        <div className="flex md:flex-row flex-col gap-10 md:gap-32 justify-center  p-5">
          <div className="order-last md:order-first grid grid-cols-2 gap-4">
            <div className="">
              <div className="">
                <img
                  className="w-10 h-10 rounded "
                  src="https://play-lh.googleusercontent.com/ZTOISGPcTOFkjff58ufepEY8QH5lcri3Y2X-ylNUMW1lRUDCXtlmxx3sudFgmHXYYbI"
                  alt=""
                />
              </div>
              <div className=" max-w-[250px] pt-2">
                <h1 className=" font-bold">24/7 Support</h1>
                <h1 className="text-sm text-slate-400 pt-1 ">
                  We are committed to serve the best with customers{" "}
                </h1>
              </div>
            </div>
            <div className="">
              <div className="">
                <img
                  className="w-10 h-10 rounded"
                  src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRcd82a3FCJmSRL3yaV_-1KopdWheHENkTiv8FBbYpI1cNtO3bN"
                  alt=""
                />
              </div>
              <div className=" max-w-[250px] pt-2">
                <h1 className=" font-bold">Travel Guid</h1>
                <h1 className="text-sm text-slate-400 pt-1 ">
                  The tour guide will help you in your destination
                </h1>
              </div>
            </div>
            <div className="">
              <div className="">
                <img
                  className="w-10 h-10"
                  src="https://banner2.cleanpng.com/20190708/kay/kisspng-business-cloud-computing-logo-product-information-about-hydrowwise-hydrowise-5d23a564b83346.6359897715626171887545.jpg"
                  alt=""
                />
              </div>
              <div className=" max-w-[250px] pt-2">
                <h1 className=" font-bold">Top Destination</h1>
                <h1 className="text-sm text-slate-400 pt-1 ">
                  The best destination in the whole world are ready for you{" "}
                </h1>
              </div>
            </div>
            <div className="">
              <div className="">
                <img
                  className="w-10 h-10 rounded"
                  src="https://images.assetsdelivery.com/compings_v2/vectorstockvadim/vectorstockvadim2004/vectorstockvadim200406348.jpg"
                  alt=""
                />
              </div>
              <div className=" max-w-[250px] pt-2">
                <h1 className=" font-bold">Easly Booking</h1>
                <h1 className="text-sm text-slate-400 pt-1 ">
                  Ease of booking process for customers convenience{" "}
                </h1>
              </div>
            </div>
          </div>
          <div className="order-first md:order-last">
            <div>
              <h1 className="max-w-[350px] text-4xl font-extrabold">
                Our Services For You
              </h1>
              <h1 className="text-slate-400 text-sm max-w-md">
                We have service and trust for customers to always be the best
                and their choice
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  };
  //
  //
  const renderTopAttractions = () => {
    return (
      <div className="bg-white w-full h-auto">
        <div className="pt-10">
          <h1 className="text-center text-3xl font-extrabold">
            Top Attractions
          </h1>
        </div>
        <div className="flex justify-center p-10 ">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="w-80 h-auto rounded-md bg-slate-50 ">
              <div>
                <img
                  className="object-cover h-64 rounded-lg"
                  src="https://www.careinsurance.com/upload_master/media/posts/July2022/dubai-attractions.jpg"
                  alt=""
                />
              </div>
              <div className="pt-5 p-2">
                <h1 className="text-2xl font-bold">Attractions</h1>
              </div>
              <div className="flex gap-8 pt-2 p-2">
                <div>
                  <h1 className="text-xl text-gray-300">
                    <IoLocationOutline />
                  </h1>
                </div>
                <div>
                  <h1 className="text-gray-300 ">Dubai UAE</h1>
                </div>
              </div>
            </div>

            <div className="w-80 h-auto rounded-md bg-slate-50 ">
              <div>
                <img
                  className="object-cover h-64 rounded-lg"
                  src="https://cdn-imgix.headout.com/media/images/b2f8273b7385804f5d19e8f56d31f819-Attractions%20in%20Dubai%203.jpg?fm=pjpg&auto=compress&w=1200&crop=faces&fit=min"
                  alt=""
                />
              </div>
              <div className="pt-5 p-2">
                <h1 className="text-2xl font-bold">Attractions</h1>
              </div>
              <div className="flex gap-8 pt-2 p-2 ">
                <div>
                  <h1 className="text-xl text-gray-300">
                    <IoLocationOutline />
                  </h1>
                </div>
                <div>
                  <h1 className="text-gray-300 ">Dubai UAE</h1>
                </div>
              </div>
            </div>
            <div className="w-80 h-auto rounded-md bg-slate-50 ">
              <div>
                <img
                  className="object-cover h-64 rounded-lg"
                  src="https://www.telegraph.co.uk/content/dam/Travel/Destinations/Middle%20East/Dubai/an-insiders-guide-to-dubai-lead-image-skyline.jpg"
                  alt=""
                />
              </div>
              <div className="pt-5 p-2">
                <h1 className="text-2xl font-bold">Attractions</h1>
              </div>
              <div className="flex gap-8 pt-2 p-2">
                <div>
                  <h1 className="text-xl text-gray-300">
                    <IoLocationOutline />
                  </h1>
                </div>
                <div>
                  <h1 className="text-gray-300 ">Dubai UAE</h1>
                </div>
              </div>
            </div>

            <div className="w-80 h-auto rounded-md bg-slate-50 ">
              <div>
                <img
                  className="object-cover h-64 rounded-lg"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmMgMj0pXt1_RF8pkMto5iS1u_Bsp24jl9wQ&usqp=CAU"
                  alt=""
                />
              </div>
              <div className="pt-5 p-2">
                <h1 className="text-2xl font-bold">Attractions</h1>
              </div>
              <div className="flex gap-8 pt-2 p-2">
                <div>
                  <h1 className="text-xl text-gray-300">
                    <IoLocationOutline />
                  </h1>
                </div>
                <div>
                  <h1 className="text-gray-300 ">Dubai UAE</h1>
                </div>
              </div>
            </div>

            <div className="w-80 h-auto rounded-md bg-slate-50 ">
              <div>
                <img
                  className="object-cover h-64 rounded-lg"
                  src="https://res.cloudinary.com/dyiffrkzh/image/upload/c_fill,f_auto,fl_progressive.strip_profile,g_center,h_400,q_auto,w_700/v1685356563/bbj/r3puuloarujgftyjcdeo.webp"
                  alt=""
                />
              </div>
              <div className="pt-5 p-2">
                <h1 className="text-2xl font-bold">Attractions</h1>
              </div>
              <div className="flex gap-8 pt-2 p-2">
                <div>
                  <h1 className="text-xl text-gray-300">
                    <IoLocationOutline />
                  </h1>
                </div>
                <div>
                  <h1 className="text-gray-300 ">Dubai UAE</h1>
                </div>
              </div>
            </div>

            <div className="w-80 h-auto rounded-md bg-slate-50 ">
              <div>
                <img
                  className="object-cover h-64 rounded-lg"
                  src="https://i0.wp.com/contentwriter.in/wp-content/uploads/2018/11/hotel-in-dubai.jpg?fit=700%2C450&ssl=1"
                  alt=""
                />
              </div>
              <div className="pt-5 p-2">
                <h1 className="text-2xl font-bold">Attractions</h1>
              </div>
              <div className="flex gap-8 pt-2 p-2">
                <div>
                  <h1 className="text-xl text-gray-300">
                    <IoLocationOutline />
                  </h1>
                </div>
                <div>
                  <h1 className="text-gray-300 ">Dubai UAE</h1>
                </div>
              </div>
            </div>
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
          <div className="grid md:grid-cols-2 gap-10 p-5 max-w-screen-2xl mx-auto">
            <div className="flex gap-5">
              <div className="pt-2">
                <h1 className="text-4xl text-sky-500 rounded-full bg-sky-50 p-3">
                  <MdAppRegistration />
                </h1>
              </div>
              <div>
                <div>
                  <h1 className="text-lg font-medium">
                    Free & Quick Registration
                  </h1>
                </div>
                <div className="max-w-lg text-gray-400 text-sm">
                  {/* <h1>
                    Registration is Free with TravellersChoiceb2b. Agent who
                    fulfills the criteria can register as an Agent. Once
                    registered login credentials will be sent to the registered
                    email id wherein the agent can login and access the services
                    he wants to book.
                  </h1> */}
                </div>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="pt-2">
                <h1 className="text-4xl text-sky-500 rounded-full bg-sky-50 p-3">
                  <MdOutlineBookOnline />
                </h1>
              </div>
              <div>
                <div>
                  <h1 className="text-lg font-medium">
                    Easy Online Transaction
                  </h1>
                </div>
                <div className="max-w-lg text-gray-400 text-sm">
                  {/* <h1>
                    Reliability and safety of our customers’ personal data are
                    top of mind at Travellers Choice Tours, and that’s why our
                    sophisticated online portal is thoroughly verified and
                    secured by the most advanced digital security certification
                    authority – Thawte.
                  </h1> */}
                </div>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="pt-6">
                <h1 className="text-4xl text-sky-500 rounded-full bg-sky-50 p-3">
                  <GiVibratingShield />
                </h1>
              </div>

              <div>
                <div>
                  <h1 className="text-lg font-medium">
                    Guest Reviews & Ratings
                  </h1>
                </div>
                <div className="max-w-lg text-gray-400 text-sm">
                  {/* <h1>
                    Travellers Choice Tours takes immense pride in its
                    exceptional capability to delight and wow customers by
                    offering instinctive and absolutely personalized destination
                    management services. But we don’t ask you to take our words;
                    know it for yourself by directly visiting our Testimonials
                    Page and see what our valuable guests have to say about
                    their experience of booking and taking a tour or holiday
                    with us.
                  </h1> */}
                </div>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="pt-8">
                <h1 className="text-4xl text-sky-500 rounded-full bg-sky-50 p-3">
                  <MdOutlineMarkUnreadChatAlt />
                </h1>
              </div>
              <div>
                <div>
                  <h1 className="text-lg font-medium">
                    24X7 Live Chat Support
                  </h1>
                </div>
                <div className="max-w-lg text-gray-400 text-sm">
                  {/* <h1>
                    We boast of an award-winning, round-the-clock customer
                    support center that is rapid to reply on every medium: be it
                    via Live Chat, WhatsApp. Whether you’ve any query on our
                    services or need assistance with the reservation procedures
                    or even looking for a little inspiration to decide on your
                    perfect holiday, get in touch with our crew who will listen
                    to all your travel needs anytime, anywhere, and turn it into
                    an absolute reality.
                  </h1> */}
                </div>
              </div>
            </div>
            <div className="flex gap-5">
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
                  {/* <h1>
                    Our online payment system is secure! In fact it encrypts
                    your payment information to protect you against fraud and
                    unauthorized transactions.
                  </h1> */}
                </div>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="pt-5">
                <h1 className="text-4xl text-sky-500 rounded-full bg-sky-50 p-3 ">
                  <RiPriceTag2Fill />
                </h1>
              </div>
              <div>
                <div>
                  <h1 className="text-lg font-medium">Best Price Guarantee</h1>
                </div>
                <div className="max-w-lg text-gray-400 text-sm">
                  {/* <h1>
                    Travellers Choice Tours’ Best Price Guarantee promises our
                    esteemed clients that they will not only be faultlessly
                    served with the Destination Management services of high-end
                    quality, but also the best possible value in the industry.
                  </h1> */}
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
                With all the convenience and experiences that we provide to
                customers, We will always help
              </h1>
            </div>
            <div className="pt-10 flex gap-20">
              <div>
                <h1 className="text-4xl text-blue-400 font-medium">40+</h1>
                <h1 className="text-gray-300 max-w-[30px]">Year Experience</h1>
              </div>
              <div>
                <h1 className="text-4xl text-blue-400 font-medium">10K</h1>
                <h1 className="text-gray-300 max-w-[30px]">Top Destinations</h1>
              </div>
              <div>
                <h1 className="text-4xl text-blue-400 font-medium">40K</h1>
                <h1 className="text-gray-300 max-w-[30px]">Happy Traveller</h1>
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
        <div className="w-full min-h-96 pt-32">
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
        <ErrorAlert/>
      </div>
    </div>
  );
}

export default LandingPage;
