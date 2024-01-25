import React, { useEffect, useState } from "react";
import { config } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
// import { BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";
// import { companyLogo } from "../../../static/imagesB2B";
import { useSelector } from "react-redux";
// import { ImYoutube } from "react-icons/im";
import { FaTwitter, FaYoutube } from "react-icons/fa";
// import { BiLogoTripAdvisor } from "react-icons/bi";

// import React from "react";
import { FaFacebook, FaSquareInstagram } from "react-icons/fa6";
// import { IoLogoWhatsapp } from "react-icons/io";
// import { useNavigate } from "react-router-dom";
// import { FaYoutube } from "react-icons/fa6";
// import { FaTwitter } from "react-icons/fa6";
import { TbBrandTripadvisor } from "react-icons/tb";

// modules = general | a2as | hotels | visas | attractions | quotations

function Footer({ module = "general" }) {
  const navigate = useNavigate();
  const { agent } = useSelector((state) => state.agents);
  const { socialMedias } = useSelector((state) => state.home);
  const [whatsapp, setWhatsapp] = useState("");

  useEffect(() => {
    if (
      module == "general" ||
      !agent?.whatsappDetails?.hasOwnProperty(module)
    ) {
      setWhatsapp(config?.COMPANY_WHATSAPP_NUMBER?.replace(/[+\s]/g, ""));
    } else {
      setWhatsapp(
        agent?.whatsappDetails[module]?.phoneNumber?.replace(/[+\s]/g, "")
      );
    }
  }, [agent]);

  return (
    // <div className="flex justify-center bg-gray-100 mt-10 py-5 pb-20 md:pb-0 shadow-round">
    //   <div className="">
    //     <Link to="/">
    //       <div className="mb-5 flex justify-center">
    //         <img
    //           className="h-20 md:h-32"
    //           src={config.COMPANY_LOGO}
    //           alt={"img"}
    //         />
    //       </div>
    //     </Link>

    //     <div className="flex flex-nowrap gap-4 text-xl justify-center">
    //       <a
    //         href={config.FACEBOOK_URL}
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className="text-blue-500"
    //       >
    //         <BsFacebook size={30} />
    //       </a>
    //       <a
    //         href={`https://wa.me/${whatsapp}`}
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className="text-green-500"
    //       >
    //         <BsWhatsapp size={30} />
    //       </a>
    //       <a
    //         href={config.INSTAGRAM_URL}
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className="text-pink-600"
    //       >
    //         <BsInstagram size={30} />
    //       </a>
    //       <a
    //         href={"http://www.youtube.com/@behappytraveltourismllc-du7563"}
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className="text-red-600"
    //       >
    //         <ImYoutube size={30} />
    //       </a>
    //       <a
    //         href={"https://twitter.com/behappydubai"}
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className="text-sky-500"
    //       >
    //         <FaTwitter size={30} />
    //       </a>
    //       <a
    //         href={"https://www.tripadvisor.com/Attraction_Review-g295424-d23319552-Reviews-BE_HAPPY_TRAVEL_TOURISM_LLC-Dubai_Emirate_of_Dubai.html"}
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className="text-orange-500"
    //       >
    //         <BiLogoTripAdvisor  size={30} />
    //       </a>
    //     </div>
    //     <div className="flex justify-center py-4">
    //       <p
    //         onClick={() => navigate("/privacy-policy")}
    //         className="text-gray-400 text-sm cursor-pointer"
    //       >
    //         Privacy Policy
    //       </p>
    //     </div>
    //     <div className="border-t mt-4 flex text-gray-300 border-gray-50 w-[100%] text-center ">
    //       <p className="pt-4 pb-3 text-[10px]">
    //         License No. 671267 The logos, images, and other visual content
    //         displayed on our Website are used for informational and illustrative
    //         purposes only. These images may include, but are not limited to,
    //         logos of various travel agencies, hotels, airlines, and destination
    //         logos. Please note that these logos and images may be the property
    //         of third parties, such as businesses, organizations, or government
    //         entities, and are subject to copyright and trademark protections.
    //         The Google logo and Play Store logo are the intellectual property of
    //         Google LLC. These logos are protected by copyright and trademark
    //         laws. Google's terms of use and branding guidelines apply to the use
    //         of their logos.
    //       </p>
    //     </div>
    //   </div>
    // </div>
    <div>
      <div className="pt-10 min-h-80 bg-white w-full">
        <div className="p-5 max-w-screen-2xl bg-slate-50 mx-auto ">
          <div className="border-b mb-4 ">
            <div className="grid md:grid-cols-2  pt-10 mb-5 divide-y md:divide-y-0">
              <div>
                <div className="md:flex md:gap-10 md:justify-start">
                  <div className="flex justify-start px-5">
                    <img
                      className="h-full object-fill w-[250px]"
                      src={config.COMPANY_LOGO}
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-10">
                <div className="">
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
                <div className=" pt-3 justify-center">
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
                  {socialMedias?.facebookUrl?.length ? (
                    <a href={socialMedias?.facebookUrl}>
                      <div className=" flex gap-1  w-8 h-8 text-xl">
                        <h1 className="p-[10px] bg-white  rounded-full  shadow-xl">
                          <FaFacebook />
                        </h1>
                        <div className="pt-3">
                          <h1 className="text-xs text-gray-400">Facebook</h1>
                        </div>
                      </div>
                    </a>
                  ) : (
                    ""
                  )}
                  <div className="pt-1">
                    {socialMedias?.instagramUrl?.length ? (
                      <a href={socialMedias?.instagramUrl}>
                        <div className="  flex gap-1  w-8 h-8 text-xl">
                          <h1 className="p-[10px] bg-white  rounded-full  shadow-xl">
                            <FaSquareInstagram />
                          </h1>
                          <div className="pt-3">
                            <h1 className="text-xs text-gray-400">Instagram</h1>
                          </div>
                        </div>
                      </a>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="pt-1">
                    {socialMedias?.youtubeUrl?.length ? (
                      <a href={socialMedias?.youtubeUrl}>
                        <div className=" flex gap-1  w-8 h-8 text-xl">
                          <h1 className="p-[10px] bg-white  rounded-full  shadow-xl">
                            <FaYoutube />
                          </h1>
                          <div className="pt-3">
                            <h1 className="text-xs text-gray-400">YouTube</h1>
                          </div>
                        </div>
                      </a>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="pt-1">
                    {socialMedias?.twitterUrl?.length ? (
                      <a href={socialMedias?.twitterUrl}>
                        <div className="  flex gap-1  w-8 h-8 text-xl">
                          <h1 className="p-[7px] bg-white  rounded-full  shadow-xl">
                            <FaTwitter />
                          </h1>
                          <div className="pt-3">
                            <h1 className="text-xs text-gray-400">Twitter</h1>
                          </div>
                        </div>
                      </a>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="pt-1">
                    {socialMedias?.tripAdvisorUrl?.length ? (
                      <a href={socialMedias?.tripAdvisorUrl}>
                        <div className="  flex gap-1  w-8 h-8 text-xl">
                          <h1 className="p-[7px] bg-white  rounded-full  shadow-xl">
                            <TbBrandTripadvisor />
                          </h1>
                          <div className="pt-3">
                            <h1 className="text-xs text-gray-400">
                              Tripadviser
                            </h1>
                          </div>
                        </div>
                      </a>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
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
          <div className=" flex text-gray-300 border-gray-50 w-[100%] text-center ">
            <p className="mb-2 text-[10px]">
              {/* License No. 671267 The logos, images, and other visual content
             displayed on our Website are used for informational and illustrative
             purposes only. These images may include, but are not limited to,
             logos of various travel agencies, hotels, airlines, and destination
             logos. Please note that these logos and images may be the property
             of third parties, such as businesses, organizations, or government
             entities, and are subject to copyright and trademark protections.
             The Google logo and Play Store logo are the intellectual property of
             Google LLC. These logos are protected by copyright and trademark
             laws. Google's terms of use and branding guidelines apply to the use
            of their logos. */}
              {socialMedias?.footerDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
