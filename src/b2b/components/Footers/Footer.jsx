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
    <div className="w-full">
      <div className="pt-10 min-h-80 bg-white">
        <div className="p-5 mx-auto bg-slate-50 w-full ">
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

              <div className="md:flex gap-10">
              {
                  socialMedias?.footer?.length ? (
                    <div>
                      {
                  socialMedias?.footer?.map((ele)=>{
                    return (
                      <div>
                      {
                        ele?.navLinks?.map((items)=>{
                          return (
                            <div className="">
                              <div className="pt-5">
                              <button
                                className="text-gray-300 text-sm font-extralight hover:border-b"
                                onClick={()=>{
                                  navigate(items?.link)
                                }}
                                >{items?.name}</button>
                              </div>
                            
                            </div>
                          )
                        })
                      }
                      </div>
                    )
                  })
                }
                    </div>
                  ) : ""
                }
                <div className=" pt-3 justify-center">
           
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
            </div>
          </div>
          <div className=" flex text-gray-300 border-gray-50 w-[100%] text-center ">
            <p className="mb-2 text-[10px]">
              {socialMedias?.footerDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
