import React from "react";
import { BsBagPlusFill, BsFillCheckCircleFill } from "react-icons/bs";
import { MdFlightTakeoff } from "react-icons/md";
import { barcodepng } from "../../static/images";
import { config } from "../../constants";

function Demo() {
   return (
      <div className="max-w-screen-lg mx-auto ">
         <div className="flex justify-between items-end py-3">
            <div className="h-10 w-36 bg-slate-400">Logo</div>
            <div className="h-12 ">
               <img
                  src={barcodepng}
                  alt="bar"
                  className="object-contain h-full"
               />
            </div>
         </div>
         <div className="py-3 border-y flex justify-between items-end px-2">
            <div className="space-y-1">
               <p className="text-gray-300 uppercase text-[13px] font-[700]">
                  Passenger Details
               </p>
               <p className="text-darktext font-[500]">Mr Sam Philipe</p>
               <p className="text-[11px] text-gray-300">Primary Adult</p>
            </div>
            <div className="space-y-2">
               <p className="text-green-500 flex gap-2 items-center">
                  <span className="">
                     <BsFillCheckCircleFill />
                  </span>
                  <span className="text-[14px] font-[500]">
                     Your booking is confirmed
                  </span>
               </p>
               <p className="text-[19px] font-[700] text-center text-green-700 ">
                  B2BA2A1057
               </p>
               <p className="text-[11px] text-gray-300 text-center">
                  Your booking reference
               </p>
            </div>
         </div>
         <div className="py-2 mt-5">
            <p className="text-gray-300 flex gap-2">
               <span className="">
                  <MdFlightTakeoff />
               </span>
               <span className="text-[13px] font-[600]  uppercase">
                  Departure from Dubai (DxB) - Flight(FZ 021)
               </span>
            </p>
         </div>
         <div className="px-2 py-4 rounded-lg border flex w-full">
            <div className="w-[70%] space-y-2 px-2">
               <div className="flex justify-between text-[12px] uppercase text-gray-400">
                  <p className="font-[500]">22, March 2023, Wednesday</p>
                  <p className="font-[500]">1, April 2023, Monday</p>
               </div>
               <div className="flex justify-between text-darktext">
                  <div className="text-2xl">
                     <p className="font-[700]">14:00</p>
                     <p className="font-[700] uppercase">DXB</p>
                  </div>
                  <div className="text-[12px] text-center">
                     <p className="tracking-wide">-------01h 10 min-------</p>
                     <p className="tracking-wide">Non-stop</p>
                  </div>
                  <div className="text-2xl">
                     <p className="font-[700]">14:20</p>
                     <p className="font-[700] uppercase">BAH</p>
                  </div>
               </div>
               <div className="flex justify-between text-darktext">
                  <div className="text-[12px] uppercase text-gray-300 font-[500]">
                     <p className="">Dubai International Airport</p>
                     <p className="">Terminal 2</p>
                  </div>
                  <div className="text-[12px] uppercase text-gray-300 font-[500]">
                     <p className="">Baharin Airport</p>
                     <p className=""></p>
                  </div>
               </div>
            </div>
            <div className="w-[30%] border-l px-2">
               <div className="">
                  <p className="flex gap-2 items-center text-gray-300 text-[14px]">
                     <span className="">
                        <BsBagPlusFill />
                     </span>
                     <span className="">Add Baggage</span>
                  </p>
                  <p className="flex gap-2 items-center text-gray-300 text-[14px]">
                     <span className="">
                        <BsBagPlusFill />
                     </span>
                     <span className="">Add Baggage</span>
                  </p>
                  <p className="flex gap-2 items-center text-gray-300 text-[14px]">
                     <span className="">
                        <BsBagPlusFill />
                     </span>
                     <span className="">Add Baggage</span>
                  </p>
               </div>
            </div>
         </div>
         <div className="py-2 mt-5">
            <p className="text-gray-300 flex gap-2">
               <span className="">
                  <MdFlightTakeoff />
               </span>
               <span className="text-[13px] font-[600]  uppercase">
                  Return from Baharin (DAH) - Flight(FZ 028)
               </span>
            </p>
         </div>
         <div className="px-2 py-4 rounded-lg border flex w-full">
            <div className="w-[70%] space-y-2 px-2">
               <div className="flex justify-between text-[12px] uppercase text-gray-400">
                  <p className="font-[500]">22, March 2023, Wednesday</p>
                  <p className="font-[500]">1, April 2023, Monday</p>
               </div>
               <div className="flex justify-between text-darktext">
                  <div className="text-2xl">
                     <p className="font-[700]">14:00</p>
                     <p className="font-[700] uppercase">DXB</p>
                  </div>
                  <div className="text-[12px] text-center">
                     <p className="tracking-wide">-------01h 10 min-------</p>
                     <p className="tracking-wide">Non-stop</p>
                  </div>
                  <div className="text-2xl">
                     <p className="font-[700]">14:20</p>
                     <p className="font-[700] uppercase">BAH</p>
                  </div>
               </div>
               <div className="flex justify-between text-darktext">
                  <div className="text-[12px] uppercase text-gray-300 font-[500]">
                     <p className="">Dubai International Airport</p>
                     <p className="">Terminal 2</p>
                  </div>
                  <div className="text-[12px] uppercase text-gray-300 font-[500]">
                     <p className="">Baharin Airport</p>
                     <p className=""></p>
                  </div>
               </div>
            </div>
            <div className="w-[30%] border-l px-2">
               <div className="">
                  <p className="flex gap-2 items-center text-gray-300 text-[14px]">
                     <span className="">
                        <BsBagPlusFill />
                     </span>
                     <span className="">Add Baggage</span>
                  </p>
                  <p className="flex gap-2 items-center text-gray-300 text-[14px]">
                     <span className="">
                        <BsBagPlusFill />
                     </span>
                     <span className="">Add Baggage</span>
                  </p>
                  <p className="flex gap-2 items-center text-gray-300 text-[14px]">
                     <span className="">
                        <BsBagPlusFill />
                     </span>
                     <span className="">Add Baggage</span>
                  </p>
               </div>
            </div>
         </div>
         <div className="mt-5 space-y-2 w-[50%]">
            <h3 className="text-gray-300 font-[600] text-[13px] uppercase underline">
               Payment Reference - B2BPAY10058
            </h3>
            <div className="grid grid-cols-4">
               <div className="col-span-1 text-gray-300 font-[500] text-[13px] uppercase">
                  Invoice
               </div>
               <div className="col-span-3 text-gray-400 font-[500] text-[13px] ">
               {config.TITLE_NAME}
               </div>
               <div className="col-span-1 text-gray-300 font-[500] text-[13px] uppercase">
                  Date
               </div>
               <div className="col-span-3 text-gray-400 font-[500] text-[13px] ">
                  20 March, 2023
               </div>
               <div className="col-span-1 text-gray-300 font-[500] text-[13px] uppercase">
                  Paid Via
               </div>
               <div className="col-span-3 text-gray-400 font-[500] text-[13px] ">
                  xxxxxxxxxx
               </div>
            </div>
         </div>
         <div className="mt-7 text-darktext space-y-2 border-t pt-5">
            <p className="text-[13px]">
               Please get in touch with us for any assistance with your booking.
            </p>
            <p className="text-[13px]">
               <span className="text-[12px] uppercase text-gray-300 font-[600] underline">
                  General queries
               </span>
            </p>
            <p className="text-[13px]">
               <span className="text-[12px] uppercase text-gray-300 font-[600]">
                  Contact Centre
               </span>
               <span className="">+971 600 54 44 45</span>
            </p>
            <p className="text-[13px]">
               <span className="text-[12px] uppercase text-gray-300 font-[600]">
                  email:
               </span>
               <span className="">letstalk@tctours.com</span>
            </p>
            <p className="text-[13px]">
               <span className="text-[12px] uppercase text-gray-300 font-[600] underline">
                  Business Class
               </span>
            </p>
            <p className="text-[13px]">
               <span className="text-[12px] uppercase text-gray-300 font-[600]">
                  Contact Centre
               </span>
               <span className="">+971 600 54 44 45</span>
            </p>
            <p className="text-[13px]">
               <span className="text-[12px] uppercase text-gray-300 font-[600]">
                  email:
               </span>
               <span className="">business@tctours.com</span>
            </p>
         </div>
      </div>
   );
}

export default Demo;
