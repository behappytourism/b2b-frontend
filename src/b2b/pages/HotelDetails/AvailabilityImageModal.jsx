import React, { useRef } from "react";
import { MdClose } from "react-icons/md";
import useHandleClickOutside from "../../../hooks/useHandleClickOutside";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useState } from "react";
import { config } from "../../../constants";

function AvailbilityImageModal({ setIsImageModalOpen, images, isLoading }) {
  const wrapperRef = useRef();

  const [image, setImage] = useState(images?.length > 0 ? images[0] : "");

  useHandleClickOutside(wrapperRef, () => setIsImageModalOpen(false));
  return (
    <div className="fixed inset-0 w-full h-full lightglass flex items-center justify-center z-20 ">
      <div
        ref={wrapperRef}
        className="relative bg-[#fff] w-full max-h-[90vh] max-w-screen-lg  shadow-[0_1rem_3rem_rgb(0_0_0_/_18%)] overflow-y-auto rounded-xl"
      >
        <div className="flex items-center justify-between border-b p-4 bg-primaryColor">
          <h2 className="font-medium mb-2 text-white">Image Gallery</h2>
          <button
            className="h-auto bg-transparent text-white text-xl "
            onClick={() => {
              setIsImageModalOpen(false);
            }}
          >
            <MdClose />
          </button>
        </div>
        <div className="p-10 w-full">
          <div className="w-full h-[50vh] rounded-xl overflow-hidden">
            <img
              src={
                images?.length > 0 && image?.isRelative
                  ? config.SERVER_URL + image?.path
                  : image?.path
              }
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex justify-between mt-2">
            <div className="text-xl font-semibold text-darktext mb-4 cursor-default">
              Images
            </div>
            {images.length > 6 && (
              <div className="hidden lg:flex space-x-5">
                <button
                  className="bg-light rounded-full w-12 h-12 flex justify-center items-center hover:text-light text-xl hover:bg-main text-main duration-500"
                  onClick={() => {
                    document.querySelector(".containerBAL").scrollLeft -= 200;
                  }}
                >
                  <AiOutlineLeft />
                </button>
                <button
                  className="bg-light rounded-full w-12 h-12 flex justify-center items-center hover:text-light text-xl hover:bg-main text-main duration-500"
                  onClick={() => {
                    document.querySelector(".containerBAL").scrollLeft += 200;
                  }}
                >
                  <AiOutlineRight />{" "}
                </button>
              </div>
            )}
          </div>
          <div className="containerBAL scroll-smooth flex overflow-x-auto snap-x overflow-y-hidden  gap-5 scrollbar-hide">
            {images?.map((item, index) => (
              <div key={index}>
                <div className=" snap-start mt-2 bg-light p-3 rounded-3xl cursor-pointer h-[96%] ">
                  <div className=" relative w-[10em]">
                    <div
                      onClick={() => {
                        if (!isLoading) {
                          setImage(item);
                        }
                      }}
                      className="overflow-hidden rounded-2xl h-[7rem]"
                    >
                      <img
                        className="hover:scale-110 object-cover  h-full w-full transition-all duration-500 cursor-pointer"
                        src={
                          item?.isRelative
                            ? config.SERVER_URL + item?.path
                            : item?.path?.replace("/original/", "/medium/")
                        }
                        alt={item?._id}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AvailbilityImageModal;
