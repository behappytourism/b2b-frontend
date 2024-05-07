import React, { useState } from "react";
import { FaBars, FaWallet } from "react-icons/fa";
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
import { TbBrandBooking } from "react-icons/tb";
import { FaXmark } from "react-icons/fa6";
import { BsDash } from "react-icons/bs";

function BottomNav({ setSidebarView }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuModal, setMenuModal] = useState(false);
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
        <div className="flex justify-between px-6 w-full">
          <div className="flex justify-center items-center">
            <div
              className="cursor-pointer"
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
              className="cursor-pointer"
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
          {/* <div className="flex justify-center items-center">
            <div
              className="cursor-pointer" 
              onClick={() => {
                // setSidebarView(true)
                navigate("/order");
              }} 
            >
              <div className="flex justify-center items-center text-[20px]">
               <TbBrandBooking />
              </div>
              <div className="">
                <p className="text-xs">Booking Reports</p> 
              </div>
            </div>
          </div> */}
          {/* <div className=" flex justify-center items-center">
            <div className="cursor-pointer" onClick={() => navigate("/wallet")}>
              <div className="flex justify-center items-center text-[20px]">
                <FaWallet />
              </div>
              <div className="">
                <p className="text-xs">Wallet</p>
              </div>
            </div>
          </div> */}
          <div className=" flex justify-center items-center relative">
            <div
              className="absolute -top-7 w-[60px] h-[60px] bg-orange-600 rounded-full flex justify-center items-center cursor-pointer"
             onClick={() => setMenuModal(true)}
            >
              <div className="flex justify-center items-center text-2xl">
                <TbLayoutDashboard />
              </div>
            </div>
          </div>
          <div className=" flex justify-center items-center">
            <div
              className="cursor-pointer"
              onClick={() => navigate("/resellers")}
            >
              <div className="flex justify-center items-center text-[20px]">
                <RxPerson />
              </div>
              <div className="">
                <p className="text-xs">Agents</p>
              </div>
            </div>
          </div>
          {/* <div className=" flex justify-center items-center">
            <div className="cursor-pointer" onClick={() => navigate("/markup/attraction")}>
              <div className="flex justify-center items-center text-[20px]">
                <RiMarkupFill />
              </div>
              <div className="">
                <p className="text-xs">Markup</p>
              </div>
            </div>
          </div> */}
          <div className=" flex justify-center items-center">
            <div className="cursor-pointer" onClick={() => navigate("/home/cart")}>
              <div className="flex justify-center items-center text-[20px]">
                <IoMdCart />
              </div>
              <div className="">
                <p className="text-xs">Cart</p>
              </div>
            </div>
          </div>

          {/* <div className=" flex justify-center items-center">
            <div className="cursor-pointer" onClick={() => setMenuModal(true)}>
              <div className="flex justify-center items-center text-[20px]">
                <FaBars />
              </div>
              <div className="">
                <p className="text-xs">Menu</p>
              </div>
            </div>
          </div> */}
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

      {menuModal && (
        <div className="fixed w-full h-full z-50 left-0 top-0  backdrop-blur-xl bg-opacity-30 bg-black">
          <div className="flex w-full justify-center">
            {/* <div
           onClick={() => setMenuModal(false)}
           className="absolute md:top-[110px]  top-[60px] md:right-[260px] right-[20px] bg-white rounded-full cursor-pointer"
         >
           <FaXmark height={40} width={40} />
         </div> */}
            <div className="w-full h-fit      md:mt-[80px] md:m-0 text-center overflow-x-auto py-5 rounded-t-2xl shadow-2xl">
           
              <div className="flex flex-col fixed py-5 bg-white rounded-t-3xl bottom-0 justify-center w-full">
              <p
                onClick={() => setMenuModal(false)}
                className="text-lg flex justify-center mb-3 font-semibold underline pb-2"
              >
                <FaXmark height={20} width={20} className="text-3xl" />
              </p>
                <p className="text-sm text-left">
                  <div className="flex flex-col gap-3 px-2 w-full">
                    <div className="flex justify-center items-center">
                      <div
                        className="cursor-pointer flex items-center gap-3"
                        onClick={() => {
                          // setSidebarView(true)
                          navigate("/tours");
                          setMenuModal(false);
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

                    <div className=" flex justify-center items-center">
                      <div
                        className="cursor-pointer flex items-center gap-3"
                        onClick={() => {
                          navigate("/wallet");
                          setMenuModal(false);
                        }}
                      >
                        <div className="flex justify-center items-center text-[20px]">
                          <FaWallet />
                        </div>
                        <div className="">
                          <p className="text-xs">Wallet</p>
                        </div>
                      </div>
                    </div>

                    <div className=" flex justify-center items-center">
                      <div
                        className="cursor-pointer flex items-center gap-3"
                        onClick={() => {
                          navigate("/resellers");
                          setMenuModal(false);
                        }}
                      >
                        <div className="flex justify-center items-center text-[20px]">
                          <RxPerson />
                        </div>
                        <div className="">
                          <p className="text-xs">Agents</p>
                        </div>
                      </div>
                    </div>
                    <div className=" flex justify-center items-center">
                      <div
                        className="cursor-pointer flex items-center gap-3"
                        onClick={() => {
                          navigate("/markup/attraction");
                          setMenuModal(false);
                        }}
                      >
                        <div className="flex justify-center items-center text-[20px]">
                          <RiMarkupFill />
                        </div>
                        <div className="">
                          <p className="text-xs">Markup</p>
                        </div>
                      </div>
                    </div>
                    <div className=" flex justify-center items-center">
                      <div
                        className="cursor-pointer flex items-center gap-3"
                        onClick={() => {
                          navigate("/order");
                          setMenuModal(false);
                        }}
                      >
                        <div className="flex justify-center items-center text-[20px]">
                          <IoMdCart />
                        </div>
                        <div className="">
                          <p className="text-xs">Orders</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center items-center">
                      <div
                        className="cursor-pointer flex items-center gap-3"
                        onClick={() => {
                          // setSidebarView(true)
                          navigate("/transfer");
                          setMenuModal(false);
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

                    <div className="flex justify-center items-center">
                      <div
                        className="cursor-pointer flex items-center gap-3"
                        onClick={() => {
                          // setSidebarView(true)
                          navigate("/order");
                          setMenuModal(false);
                        }}
                      >
                        <div className="flex justify-center items-center text-[20px]">
                          <TbBrandBooking />
                        </div>
                        <div className="">
                          <p className="text-xs">Booking Reports</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BottomNav;
