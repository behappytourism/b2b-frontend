import React from "react";
import { BiMailSend, BiPhoneCall } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAgent } from "../../../redux/slices/agentSlice";
import { config } from "../../../constants";
import { companyLogo } from "../../../static/imagesB2B";

function EntryDenied() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="my-20 px-5 py-20 shadow-round">
        <h2 className="font-[900] text-gray-400 text-2xl text-center">
          Entry Denied...!
        </h2>
        <p className="text-gray-300 text-center mt-4">
          The entry accessing the b2b portal is denied for you
        </p>
        <div className="mt-5">
          <p className="text-gray-400 font-semibold text-center">
            Contact {config.TITLE_SHORT_NAME} for support
          </p>
          <div className="w-full flex justify-center items-center  h-20">
            <img
              src={config.COMPANY_LOGO}
              className="w-36 h-full object-contain"
              alt="logo"
            />
          </div>
          <div className="flex justify-center flex-wrap gap-5 font-semibold text-main">
            <div className="flex gap-3 items-center">
              <p className="">
                <BiPhoneCall />
              </p>
              <p className="">
                {config.COMPANY_CONTACT_NUMBER_ONE}
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <p className="">
                <BiPhoneCall />
              </p>
              <p className="">
                {config.COMPANY_CONTACT_NUMBER_TWO}
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <p className="">
                <BiMailSend />
              </p>
              <p className="">{config.COMPANY_EMAIL}</p>
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <button onClick={() => {
                dispatch(logoutAgent())
                navigate("/login")
            }}
             className="text-white bg-blue-500 rounded-md text-sm shadow-mn h-10 px-5 font-semibold"
            >Login again</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntryDenied;
