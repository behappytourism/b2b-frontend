import React, { useRef } from "react";
import { MdClose } from "react-icons/md";
import useHandleClickOutside from "../../../hooks/useHandleClickOutside";
import { RxDotFilled } from "react-icons/rx";

function MoreAmenityModal({ setMoreAmenityOpen, amenities }) {
  const wrapperRef = useRef();

  useHandleClickOutside(wrapperRef, () => setMoreAmenityOpen(false));
  return (
    <div className="fixed inset-0 w-full h-full lightglass flex items-center justify-center z-20 ">
      <div
        ref={wrapperRef}
        className="bg-[#fff] w-full max-h-[90vh] max-w-[700px]  shadow-[0_1rem_3rem_rgb(0_0_0_/_18%)] overflow-y-auto rounded-xl"
      >
        <div className="flex items-center justify-between border-b p-4 bg-primaryColor">
          <h2 className="font-medium mb-2 text-white">Amenities</h2>
          <button
            className="h-auto bg-transparent text-white text-xl"
            onClick={() => setMoreAmenityOpen(false)}
          >
            <MdClose />
          </button>
        </div>
        <div className="p-10 w-full">
            <div className="flex flex-wrap gap-4">
                {amenities?.map((item) => (
                    
                    <p key={item?._id} className="flex gap-1 items-center">
                      <span className="text-stone-500">
                        <RxDotFilled />
                      </span>
                      <span className="text-sm text-gray-400">{item?.name}</span>
                    </p>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}

export default MoreAmenityModal;
