import React from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PaymentCardSection from "./PaymentCardSection";
import PaymentDetailsSection from "./PaymentDetailsSection";

function PaymentHomePage() {
  const navigate = useNavigate();

  const { agentExcursionCart } = useSelector((state) => state.agentExcursions);
  return (
    <>
      <div className="">
        <div className="">
          <div className="max-w-screen-xl mx-auto">
            <div className="py-10 px-5">
              <div className="lg:flex lg:justify-between shadow-mn text-darktext p-4 bg-white  rounded cursor-default space-y-2 sm:space-y-0">
                <div className="lg:space-y-5 font-light ">
                  <div className="">You've got the best price</div>
                </div>
                <div className=" space-y-2 font-medium">
                  <div className="font-light text-sm ">
                    Currently, you have {agentExcursionCart?.length} item(s) in
                    your cart
                  </div>
                  <div className="">
                    <button
                      className="px-3 h-8 bg-orange-500 text-xs transition-all duration-300 rounded-sm text-light flex items-center space-x-2 hover:border border-BEColor hover:bg-light hover:text-BEColor"
                      onClick={() => {
                        navigate(-1);
                      }}
                    >
                      <span className="">
                        <AiOutlineLeft />{" "}
                      </span>
                      <span className="">Continue shopping</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:grid grid-cols-12 lg:gap-7 space-y-3 lg:space-y-0 lg:mt-5">
                <div className="1 col-span-8">
                  <PaymentDetailsSection />
                </div>
                <div className="2 col-span-4 lg:border-l">
                  <PaymentCardSection />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentHomePage;
