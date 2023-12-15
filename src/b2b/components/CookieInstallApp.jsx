import React from "react";
import { MobileAppLogoJpeg } from "../../static/images";
import { AiOutlineClose } from "react-icons/ai";
import { config } from "../../constants";
import Rating from "../components/Rating/Rating";

function CookieInstallApp({ setIsFirst }) {
  return (
    <div className="md:hidden w-full h-24 bg-white shadow-mn px-5 py-5 flex justify-between">
      <div className="flex gap-2 items-center">
        <div
          onClick={() => {
            localStorage.setItem("isFirst", false);
            setIsFirst(false);
          }}
          className="text-lg cursor-pointer"
        >
          <AiOutlineClose />
        </div>
        <div className="w-14 h-14 rounded-xl overflow-hidden shadow-mn cursor-default">
          <img
            src={MobileAppLogoJpeg}
            alt="logo"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="">
          <h2 className="text-sm font-mono text-blue-600 font-semibold cursor-default">
            {config.TITLE_NAME}
          </h2>
          <div className="text-xs">
            <Rating value={5} color={"#FFB100"} />
          </div>
          <p className="text-[10px] text-gray-300"> Play store</p>
        </div>
      </div>
      <div className="flex items-center">
        <a href={config?.PLAYSTORE_URL} target="_blank" rel="noopener">
          <p className="text-gray-600 text-sm font-bold font-mono cursor-pointer">
            {" "}
            Install
          </p>
        </a>
      </div>
    </div>
  );
}

export default CookieInstallApp;
