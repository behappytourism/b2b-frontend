import React from "react";
import { config } from "../../../constants";
import { useLocation, useNavigate, useResolvedPath } from "react-router-dom";

function LandingPageHeader() {
  const navigate = useNavigate();
  const { pathname } = useResolvedPath();

  return (
    <div className="bg-slate-50">
      <div className="flex justify-between p-4 max-w-screen-2xl mx-auto ">
        <div className="h-16 md:h-16 w-40">
          <img
            onClick={()=>{
              navigate('/login')
            }}
            className="h-full w-full object-cover"
            src={config.COMPANY_LOGO}
            alt=""
          />
        </div>
        <div className="flex gap-10  ">
          {/* <div className="hidden md:block ">
            <button className="text-sm font-lg font-demo  font-bold w-10 h-10 rounded-full hover:bg-sky-100 p-2 hover:text-sky-400 transition duration-300">
              Destinations
            </button>
          </div> */}
          {/* <div className="ml-4">
            <button className="text-sm font-lg font-demo  font-bold w-10 h-10 rounded-full hover:bg-sky-100 p-2 hover:text-sky-400 transition duration-300">
              English
            </button>
          </div> */}
          <div className="hidden lg:block ">
            <button
              className="text-sm font-lg font-demo  font-bold h-10 rounded-full hover:bg-sky-100 p-2 hover:text-sky-400 transition duration-300 whitespace-nowrap"
              onClick={() => navigate("/about-us")}
            >
              About Us{" "}
            </button>
          </div>
          <div className="hidden md:block ">
            <button
              className="text-sm font-lg font-demo  font-bold h-10 rounded-full hover:bg-sky-100 p-2 hover:text-sky-400 transition duration-300"
              // onClick={() => navigate("/contactusb2b")}
            >
              Services{" "}
            </button>
          </div>
          <div className="hidden md:block ">
            <button
              className="text-sm font-lg font-demo  font-bold h-10 rounded-full hover:bg-sky-100 p-2 hover:text-sky-400 transition duration-300"
              // onClick={() => navigate("/contactusb2b")}
            >
              Tours{" "}
            </button>
          </div>
          {/* <div className="hidden md:block ">
            <button
              className="text-sm font-lg font-demo  font-bold h-10 rounded-full hover:bg-sky-100 p-2 hover:text-sky-400 transition duration-300"
              // onClick={() => navigate("/contactusb2b")}
            >
              Promotions{" "}
            </button>
          </div> */}
          <div className="hidden md:block ">
            <button
              className="text-sm font-lg font-demo  font-bold h-10 rounded-full hover:bg-sky-100 p-2 hover:text-sky-400 transition duration-300"
              onClick={() => navigate("/contactusb2b")}
            >
              Contact{" "}
            </button>
          </div>
            <div className="pt-1">
              <button
                className="border px-10 h-9 text-sm bg-sky-400 text-white rounded hover:bg-sky-500 "
                onClick={() => navigate("/register")}
              >
                Register Here
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPageHeader;
