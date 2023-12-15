import React from "react";
import { AiOutlineCheck, AiOutlineCheckCircle } from "react-icons/ai";
import { CiParking1 } from "react-icons/ci";
import { MdSportsVolleyball } from "react-icons/md";
import { SlScreenDesktop } from "react-icons/sl";
import { TbToolsKitchen2 } from "react-icons/tb";

function FacilitySection({ hotel }) {
  return (
    <>
      {hotel?.amenities?.length > 0 && (
        <div className="text-darktext pb-5">
          <h2 className="text-[20px] text-blue-600 capitalize font-[700]">
          Amenities of Hotel
          </h2>
          {hotel?.amenities?.map((item) => (
            <div className=" pt-5">
              <span className="flex gap-2 items-center text-green-600">
                <p className="text-xl">
                  <MdSportsVolleyball />
                </p>
                <p className="uppercase text-[14px] font-semibold">
                  {item?.amenity?.name}
                </p>
              </span>
              <div className="flex flex-wrap gap-5 mt-2">
                {item?.subAmenities?.map((sub) => (
                  <div className="flex gap-2 items-start">
                    <p className="text-sky-500 text-lg">
                      <AiOutlineCheck />
                    </p>
                    <p className="text-xs capitalize italic">{sub?.name}</p>
                    {sub.isPaid ? (
                      <p className="text-grayColor text-[10px] bg-gray-50 rounded-sm px-1 h-4 flex items-center">Additional charge</p>
                    ) : ""}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default FacilitySection;
