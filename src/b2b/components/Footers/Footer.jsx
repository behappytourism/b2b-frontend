import React, { useEffect, useState } from "react";
import { config } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import { BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";
import { companyLogo } from "../../../static/imagesB2B";
import { useSelector } from "react-redux";

// modules = general | a2as | hotels | visas | attractions | quotations

function Footer({ module = "general" }) {
  const navigate = useNavigate();
  const { agent } = useSelector((state) => state.agents);
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

  console.log(whatsapp, "whatsapp number");

  return (
    <div className="flex justify-center bg-gray-100 mt-10 py-5 pb-20 md:pb-0 shadow-round">
      <div className="">
        <Link to="/">
          <div className="mb-5 flex justify-center">
            <img className="h-10 md:h-[50px]" src={companyLogo} alt={"img"} />
          </div>
        </Link>

        <div className="flex flex-nowrap gap-4 text-xl justify-center">
          <a
            href={config.FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            <BsFacebook size={30} />
          </a>
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500"
          >
            <BsWhatsapp size={30} />
          </a>
          <a
            href={config.INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600"
          >
            <BsInstagram size={30} />
          </a>
        </div>
        <div className="flex justify-center py-4">
          <p
            onClick={() => navigate("/privacy-policy")}
            className="text-gray-400 text-sm cursor-pointer"
          >
            Privacy Policy
          </p>
        </div>
        <div className="border-t mt-4 flex text-gray-300 border-gray-50 w-[100%] text-center ">
          <p className="pt-4 pb-3 text-[10px]">
            License No. 671267 The logos, images, and other visual content
            displayed on our Website are used for informational and illustrative
            purposes only. These images may include, but are not limited to,
            logos of various travel agencies, hotels, airlines, and destination
            logos. Please note that these logos and images may be the property
            of third parties, such as businesses, organizations, or government
            entities, and are subject to copyright and trademark protections.
            The Google logo and Play Store logo are the intellectual property of
            Google LLC. These logos are protected by copyright and trademark
            laws. Google's terms of use and branding guidelines apply to the use
            of their logos.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
