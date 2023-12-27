import React, { useState } from "react";
import { FaWallet } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiFilePaper2Line } from "react-icons/ri";
import { TbLayoutDashboard } from "react-icons/tb";
import { IoMdCart } from "react-icons/io";
import { RiMarkupFill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import SearchCardModal from "./SearchCardModal";
import { FaCar } from "react-icons/fa";
import { MdTravelExplore } from "react-icons/md";
import { RxPerson } from "react-icons/rx";



function BottomNav({ setSidebarView }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchModal, setSearchModal] = useState(false);
  return (
    <> 
      <div
        className={`${
          location.pathname.includes("/attractions/details/")
            ? "hidden"
            : "block"
        } lg:hidden fixed w-full bottom-0 bg-BEColor text-white h-[48px] flex justify-center items-center`}
      >
        <div className="grid grid-cols-7 gap-4 px-2 w-full">
        <div className="flex justify-center items-center">
            <div
              className="" 
              onClick={() => {
                // setSidebarView(true)
                navigate("/tours");
              }}
            >
              <div className="flex justify-center items-center text-[20px]">
              <MdTravelExplore />
              </div>
              <div className="">
                <p className="text-xs">Tours</p> 
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div
              className="" 
              onClick={() => {
                // setSidebarView(true)
                navigate("/transfer");
              }}
            >
              <div className="flex justify-center items-center text-[20px]">
              <FaCar />
              </div>
              <div className="">
                <p className="text-xs">Transfer</p>
              </div>
            </div>
          </div>
          <div className=" flex justify-center items-center">
            <div className="" onClick={() => navigate("/wallet")}>
              <div className="flex justify-center items-center text-[20px]">
                <FaWallet />
              </div>
              <div className="">
                <p className="text-xs">Wallet</p>
              </div>
            </div>
          </div>
          <div className=" flex justify-center items-center relative">
            <div
              className="absolute -top-7 w-[60px] h-[60px] bg-main rounded-full flex justify-center items-center"
              onClick={() => navigate("/")}
            >
              <div className="flex justify-center items-center text-2xl">
                <TbLayoutDashboard />
              </div>
            </div>
          </div>
          <div className=" flex justify-center items-center">
            <div className="" onClick={() => navigate("/resellers")}>
              <div className="flex justify-center items-center text-[20px]">
              <RxPerson />
              </div>
              <div className="">
                <p className="text-xs">Agents</p>
              </div>
            </div>
          </div>
          <div className=" flex justify-center items-center">
            <div className="" onClick={() => navigate("/markup/attraction")}>
              <div className="flex justify-center items-center text-[20px]">
                <RiMarkupFill />
              </div>
              <div className="">
                <p className="text-xs">Markup</p>
              </div>
            </div>
          </div>
          <div className=" flex justify-center items-center">
            <div className="" onClick={() => navigate("/order")}>
              <div className="flex justify-center items-center text-[20px]">
                <IoMdCart />
              </div>
              <div className="">
                <p className="text-xs">Orders</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {searchModal && (
        <>
          <div
            className="lightglass absolute top-0 left-0 right-0 bottom-0 z-10"
            onClick={() => setSearchModal(false)}
          ></div>
          <SearchCardModal
            setSearchModal={setSearchModal}
            searchModal={searchModal}
          />
        </>
      )}
    </>
  );
}

export default BottomNav;
