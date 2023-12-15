import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiCheckCircle } from "react-icons/bi";
import { FaPlaneCircleXmark } from "react-icons/fa6";
import { MdHealthAndSafety } from "react-icons/md";
import { RiHealthBookLine, RiLuggageCartFill } from "react-icons/ri";

function FlightInsuranceBenefits({ insuranceBenefits, setInsuranceBenefits }) {
  return (
    <div className="bg-white p-4 text-center items-center rounded fixed top-0 left-0 right-0 bottom-0 z-30 modal_overlay">
      <div
        className={`absolute cursor-pointer md:right-20 right-4  md:top-16 top-4 flex justify-center items-center bg-trans text-darktext h-16 w-16 rounded-full text-4xl`}
        onClick={() => setInsuranceBenefits(!insuranceBenefits)}
      >
        <AiOutlineClose />
      </div>
      <div className="flex justify-center  w-full h-[100vh] z-50">
        <div
          className="min-h-[80vh] p-4 bg-[#fcfeff] max-h-[200px] max-w-[400px] scrollbar-hide overflow-y-auto mt-10  rounded-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="font-bold mb-4">Insurance Benefits!</h1>
          <div className="">
            <div className="flex text-left mb-4 w-fit p-1 gap-2 rounded">
              <div>
                <MdHealthAndSafety size={24} />
              </div>
              <div>
                <h1 className="text-gray-400 text-xs">
                Emergency Medical Expenses <span className="font-semibold">Upto $ 250000</span>
                </h1>
                <h1 className="text-xs">For availing immediate emergency medical assistance required on account of any illness/injury sustained or contracted whilst on a trip, subject to the maximum insured sum in the schedule.</h1>
              </div>
            </div>

            <div className="flex text-left mb-4 w-fit p-1 gap-2 rounded">
              <div>
                <FaPlaneCircleXmark size={24} />
              </div>
              <div>
                <h1 className="text-gray-400 text-xs">
                Trip Cancellation and/or Interruption <span className="font-semibold text-xs">Upto $ 2500</span>
                </h1>
                <h1 className="text-xs">
                If the flight is cancelled before scheduled departure date or interrupted due to reasons mentioned in the Terms & Conditions section below.
                </h1>
              </div>
            </div>

            <div className="flex text-left mb-4 w-fit p-1 gap-2 rounded">
              <div>
                <RiLuggageCartFill size={24} />
              </div>
              <div>
                <h1 className="text-gray-400 text-xs">
                Delay of Checked in baggage <span className="font-semibold">Upto $ 500</span>
                </h1>
                <h1 className="text-xs">If your checked-in baggage is delayed by more than 4 hours from the expected time of delivery, by the airline.</h1>
              </div>
            </div>

            <div className="flex text-left mb-4 w-fit p-1 gap-2 rounded">
              <div>
                <BiCheckCircle size={24} />
              </div>
              <div>
                <h1 className="text-gray-400 text-xs">
                Loss of Passport and documents <span className="font-semibold">Upto $ 200</span>
                </h1>
                <h1 className="text-xs">If the passport/travel documents belonging to the insured person are lost. The actual expenses necessarily & reasonably incurred for obtaining a duplicate or fresh passport/travel document during the trip, will be reimbursed.</h1>
              </div>
            </div>

            <div className="flex text-left mb-4 w-fit p-1 gap-2 rounded">
              <div>
                <RiHealthBookLine size={24} />
              </div>
              <div>
                <h1 className="text-gray-400 text-xs">
                Personal Accident <span className="font-semibold">Upto $ 25000</span>
                </h1>
                <h1 className="text-xs">If you suffer an accidental body injury during your trip which requires urgent and immediate medical attention.</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightInsuranceBenefits;
