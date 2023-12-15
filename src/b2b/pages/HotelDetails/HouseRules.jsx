import React from "react";
import {
   BsBoxArrowInLeft,
} from "react-icons/bs";
import { HiOutlineArrowsRightLeft } from "react-icons/hi2";
import { MdOutlinePets, MdOutlineSmokeFree, MdPayment } from "react-icons/md";
import { config } from "../../../constants";

function HouseRules({hotel}) {
   return (
      <div className="text-darktext pb-5 ">
         <h2 className="text-[20px] capitalize font-[700]">House Rules</h2>
         <div className="border border-gray-200/50 shadow-sm mt-2 rounded-2xl p-5">
            <div className="p-5 grid grid-cols-12 gap-5 border-b">
               <div className="first__section col-span-3 space-y-3">
                  <div className="flex gap-2 items-center text-stone-500 font-[600]">
                     <p className="">
                        <BsBoxArrowInLeft />
                     </p>
                     <p className="">Check-In-Out</p>
                  </div>
               </div>
               <div className="second__section col-span-9">
                  <div className="">
                     <span className="flex gap-3">
                        <p className="">{hotel?.checkInTime}</p>
                        <p className="">
                           <HiOutlineArrowsRightLeft />
                        </p>
                        <p className="">{hotel?.checkOutTime}</p>
                     </span>
                  </div>
               </div>
            </div>
            {/* <div className="p-5 grid grid-cols-12 gap-5 border-b">
               <div className="first__section col-span-3 space-y-3">
                  <div className="flex gap-2 items-center text-stone-500 font-[600]">
                     <p className="">
                        <AiOutlineInfoCircle />
                     </p>
                     <p className="">Cancellation/prepayment</p>
                  </div>
               </div>
               <div className="second__section col-span-9">
                  <div className="">
                     <span className="flex gap-3">
                        <p className="">
                           Cancellation and prepayment policies vary according
                           to apartment type. Please check the
                           <span className="text-blue-400 underline">
                              {" "}
                              Apartment Conditions
                           </span>
                           when selecting your apartment above.
                        </p>
                     </span>
                  </div>
               </div>
            </div>
            <div className="p-5 grid grid-cols-12 gap-5 border-b">
               <div className="first__section col-span-3 space-y-3">
                  <div className="flex gap-2 items-center text-stone-500 font-[600]">
                     <p className="">
                        <AiOutlineInfoCircle />
                     </p>
                     <p className="">Damage policy</p>
                  </div>
               </div>
               <div className="second__section col-span-9">
                  <div className="">
                     <span className="flex gap-3">
                        <p className="">
                           If you cause damage to the property during your stay,
                           you could be asked to pay up to AED 1145 after
                           check-out, according to this property's
                           <span className="text-blue-500 underline">
                              {" "}
                              Damage Policy.
                           </span>
                        </p>
                     </span>
                  </div>
               </div>
            </div>
            <div className="p-5 grid grid-cols-12 gap-5 border-b">
               <div className="first__section col-span-3 space-y-3">
                  <div className="flex gap-2 items-center text-stone-500 font-[600]">
                     <p className="">
                        <ImMan />
                     </p>
                     <p className="">Age restriction</p>
                  </div>
               </div>
               <div className="second__section col-span-9">
                  <div className="">
                     <span className="flex gap-3">
                        <p className="">The minimum age for check-in is 18</p>
                     </span>
                  </div>
               </div>
            </div>
            <div className="p-5 grid grid-cols-12 gap-5 border-b">
               <div className="first__section col-span-3 space-y-3">
                  <div className="flex gap-2 items-center text-stone-500 font-[600]">
                     <p className="">
                        <MdPayment />
                     </p>
                     <p className="">Payments </p>
                  </div>
               </div>
               <div className="second__section col-span-9">
                  <div className="">
                     <span className="flex gap-3">
                        <p className="">
                           {config.TITLE_NAME} takes your payment for this stay on
                           behalf of the property, but make sure you have cash
                           for any extras once you get there.
                        </p>
                     </span>
                  </div>
               </div>
            </div> */}
            <div className="p-5 grid grid-cols-12 gap-5 border-b">
               <div className="first__section col-span-3 space-y-3">
                  <div className="flex gap-2 items-center text-stone-500 font-[600]">
                     <p className="">
                        <MdOutlineSmokeFree />
                     </p>
                     <p className="">Smoking</p>
                  </div>
               </div>
               <div className="second__section col-span-9">
                  <div className="">
                     <span className="flex gap-3">
                        <p className="">{hotel?.isSmokingRoomsAvailable ? " Smoking is allowed." : " Smoking is not allowed."}</p>
                     </span>
                  </div>
               </div>
            </div>
            {/* <div className="p-5 grid grid-cols-12 gap-5 border-b">
               <div className="first__section col-span-3 space-y-3">
                  <div className="flex gap-2 items-center text-stone-500 font-[600]">
                     <p className="">
                        <GiPartyPopper />
                     </p>
                     <p className="">Parties</p>
                  </div>
               </div>
               <div className="second__section col-span-9">
                  <div className="">
                     <span className="flex gap-3">
                        <p className="">Parties/events are not allowed</p>
                     </span>
                  </div>
               </div>
            </div>
            <div className="p-5 grid grid-cols-12 gap-5 border-b">
               <div className="first__section col-span-3 space-y-3">
                  <div className="flex gap-2 items-center text-stone-500 font-[600]">
                     <p className="">
                        <BsMoonStarsFill />
                     </p>
                     <p className="">Quiet hours</p>
                  </div>
               </div>
               <div className="second__section col-span-9">
                  <div className="">
                     <span className="flex gap-3">
                        <p className="">
                           Guests need be quiet between 10:00 PM and 8:00 AM.
                        </p>
                     </span>
                  </div>
               </div>
            </div> */}
            <div className="p-5 grid grid-cols-12 gap-5 border-b">
               <div className="first__section col-span-3 space-y-3">
                  <div className="flex gap-2 items-center text-stone-500 font-[600]">
                     <p className="">
                        <MdOutlinePets />
                     </p>
                     <p className="">Pets</p>
                  </div>
               </div>
               <div className="second__section col-span-9">
                  <div className="">
                     <span className="flex gap-3">
                        <p className="">{hotel?.isPetAllowed ? "Pets are not allowed." : "Pets are not allowed"}</p>
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default HouseRules;
