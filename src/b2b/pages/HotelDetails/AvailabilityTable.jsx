import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { CgSandClock } from "react-icons/cg";
import { GiSofa } from "react-icons/gi";
import { IoBed, IoBedOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function AvailabilityTable() {
  const navigate = useNavigate();
  return (
    <div className="w-full rounded overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="w-full bg-green-400 ">
            <th className="font-[600] text-gray-400 py-3 px-2">
              Accommodation
            </th>
            <th className="font-[600] text-gray-400 py-3 px-2">Sleeps</th>
            <th className="font-[600] text-gray-400 py-3 px-2">
              Price for N night
            </th>
            <th className="font-[600] text-gray-400 py-3 px-2">Includes</th>
            <th className="font-[600] text-gray-400 py-3 px-2">Book</th>
          </tr>
        </thead>
        <tbody>
          <tr className="">
            <td className="p-3 text-textColor max-w-[200px]">
              <div className="">
                <div className="left__section">
                  <h2 className="text-[17px] font-[700] ">
                    Palm King Room - Full board and Extraordinary Inclusions
                  </h2>
                  <p className="text-red-800 font-medium text-xs flex gap-1 items-center">
                    <span className="">
                      <CgSandClock />
                    </span>
                    <span className="">Only 2 rooms left on our site</span>
                  </p>
                  <p className="flex gap-1 items-center">
                    <span className="">
                      <IoBed />
                    </span>{" "}
                    1 king bed and{" "}
                    <span className="">
                      <GiSofa />
                    </span>{" "}
                    1 sofa bed{" "}
                  </p>
                  <p className="text-stone-400 text-[12px]">
                    Guests will enjoy the following exclusive benefits worth
                    over 3500 AED:
                  </p>
                </div>
                <div className="right__section ">
                  <div>
                    <div className="flex gap-2 flex-wrap  justify-start pb-2 border-b">
                      <div className="flex gap-2 items-center">
                        <p className="bg-blue-100/50 text-sky-500 text-sm p-1 rounded-md">
                          <IoBedOutline />
                        </p>
                        <p className="text-xs">Pool View</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <p className="bg-blue-100/50 text-sky-500 text-sm p-1 rounded-md">
                          <IoBedOutline />
                        </p>
                        <p className="text-xs">Pool View</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <p className="bg-blue-100/50 text-sky-500 text-sm p-1 rounded-md">
                          <IoBedOutline />
                        </p>
                        <p className="text-xs">Pool View</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <p className="bg-blue-100/50 text-sky-500 text-sm p-1 rounded-md">
                          <IoBedOutline />
                        </p>
                        <p className="text-xs">Pool View</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <p className="bg-blue-100/50 text-sky-500 text-sm p-1 rounded-md">
                          <IoBedOutline />
                        </p>
                        <p className="text-xs">Pool View</p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap  justify-start mt-2">
                      <div className="flex gap-2 items-center">
                        <p className="text-sky-500">
                          <AiOutlineCheckCircle />
                        </p>
                        <p className="text-xs">A/C</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <p className="text-sky-500">
                          <AiOutlineCheckCircle />
                        </p>
                        <p className="text-xs">Balcony</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <p className="text-sky-500">
                          <AiOutlineCheckCircle />
                        </p>
                        <p className="text-xs">ADA Room</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <p className="text-sky-500">
                          <AiOutlineCheckCircle />
                        </p>
                        <p className="text-xs">Small Room</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <p className="text-sky-500">
                          <AiOutlineCheckCircle />
                        </p>
                        <p className="text-xs">Living Room</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <p className="text-sky-500">
                          <AiOutlineCheckCircle />
                        </p>
                        <p className="text-xs">Prvate pool</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td className="p-3 text-textColor   ">
              <div className="flex  gap-3 justify-center items-start mt-2 text-[13px] uppercase rounded py-1 bg-gray-700 text-gray-200">
                <p className="font-[650]">Sleeps</p>
                <p className="flex items-center gap-1">
                  <span className="">
                    <BsPersonFill />
                  </span>
                  <span className="font-[650]">x 6</span>
                </p>
              </div>
            </td>
            <td className="p-3 text-textColor flex items-start">
              <div className="flex justify-end items-end ">
                <div>
                  <p className="text-[16px] font-semibold mt-3">
                    Price for 4 Nights
                  </p>

                  <p className="text-[12px] text-red-500">
                    <s>140 AED</s>
                  </p>

                  <p className="font-[650] text-[20px]">120 AED</p>
                  <p className="text-stone-400 text-[12px]">
                    +10 AED taxes and charges
                  </p>
                </div>
              </div>
            </td>
            <td className="p-3 text-textColor">
              <ul>
                <li>Total cost to cancel</li>
                <li>Only 1 room left on our site</li>
                <li>NO PREPAYMENT NEEDED – pay at the property</li>
              </ul>
            </td>
            <td className="p-3 text-textColor flex items-start">
              <div className=" space-y-2">
                <p className="flex gap-2 items-end">
                  <span className="text-red-500 text-[12px]">
                    <s>140 AED</s>
                  </span>
                  <span className="font-[650]">140 AED</span>
                </p>
                <p className="text-[12px] text-gray-400">for 1 apartment </p>
                <p className="text-[10px] text-stone-400">
                  + 10 AED taxes and charges
                </p>
                <button
                  className="w-full py-2 rounded bg-[#003580] text-gray-100 text-[12px] uppercase "
                  onClick={() => navigate("/hotel/apply")}
                >
                  Reserve Now
                </button>
                <ul className="ml-5 list-disc text-[11px]">
                  <li>Confirmation is immediate</li>
                  <li>No booking or credit card fees!</li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AvailabilityTable;
