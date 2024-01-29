import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CurrencyModal from "./CurrencyModal";
import { useHandleClickOutside } from "../../../hooks";
import { AiOutlineDown, AiOutlineLogout } from "react-icons/ai";
import { getWalletBalance } from "../../../redux/slices/walletSlice";
import { IoIosWallet, IoMdNotificationsOutline } from "react-icons/io";
import { BsPerson } from "react-icons/bs";
import CartModal from "./CartModal";
import { IoPricetagOutline } from "react-icons/io5";
import { logoutAgent } from "../../../redux/slices/agentSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { RiFilePaper2Line } from "react-icons/ri";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { RxPerson } from "react-icons/rx";
import priceConversion from "../../../utils/PriceConversion";
import { config } from "../../../constants";
import { companyLogo } from "../../../static/imagesB2B";
import { BiRightArrowCircle } from "react-icons/bi";
import { FaCar } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { TbBrandBooking } from "react-icons/tb";
import { MdTravelExplore } from "react-icons/md";


export default function Header({ setSidebarView, sidebarView }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  

  const [currency, setCurrency] = useState(false);
  const [cart, setCart] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isProfile, setIsProfile] = useState(false);

  const { balance } = useSelector((state) => state.wallet);
  const { selectedCurrency } = useSelector((state) => state.home);
  const { agent,agenttempLogo, isLoggedIn } = useSelector((state) => state.agents);

  const currencyRef = useRef();
  useHandleClickOutside(currencyRef, () => setCurrency(false));

  const cartRef = useRef();
  useHandleClickOutside(cartRef, () => setCart(false));

  const profileRef = useRef();
  useHandleClickOutside(profileRef, () => setIsProfile(false));

  useEffect(() => {
    dispatch(getWalletBalance());
  }, [dispatch]);

  return (
    <section className="bg-white">
      <div className="  bg-white border-b h-20   ">
        <div className="max-w-screen-xl mx-auto px-5 2xl:px-0">
          <div className="flex w-full items-center justify-between -mx-2">
            <div className="  rounded-b-xl mb-2  h-20">
              <div className=" h-full " onClick={() => navigate("/")}>
                <img
                  // src={agent?.companyLogo ? config.SERVER_URL + agent?.companyLogo : config.COMPANY_LOGO}
                  // src={agent?.companyLogo ? config.SERVER_URL + agent?.companyLogo : agenttempLogo?agenttempLogo:config.COMPANY_LOGO}
                  src={agenttempLogo?agenttempLogo: agent?.companyLogo ? config.SERVER_URL + agent?.companyLogo:config.COMPANY_LOGO}
                  // src={config.COMPANY_LOGO}
                  alt="logo"
                  className="h-full w-full rounded-b-xl object-fill"
                />
              </div>
            </div>
            <div className=" w-auto gap-3 sm:gap-5 md:flex hidden ">
              {isLoggedIn ? (
                <>
                  <div
                    onMouseOver={() => setIsWalletModalOpen(true)}
                    onMouseOut={() => setIsWalletModalOpen(false)}
                    onClick={() => navigate("/wallet")}
                    className="relative  flex items-center gap-1 cursor-pointer"
                  >
                    <p className="flex">
                      <IoIosWallet />
                      <span className="text-sm ml-1 ">Wallet</span>
                    </p>
                    {isWalletModalOpen && (
                      <div className="absolute w-[200px] top-12 z-10">
                        <div className="w-full relative overflow-hidden">
                          <div className="w-full bg-white shadow-mn rounded-md p-5">
                            <h3 className="text-gray-400 font-[700] text-center">
                              Wallet Amount
                            </h3>
                            <p className="text-black font-[800] text-sm text-center">
                              {" "}
                              {priceConversion(balance, selectedCurrency, true)}
                            </p>
                          </div>
                          <div className="absolute w-20 rounded-full h-20 bg-BEColor opacity-40 -top-5 -left-5"></div>
                          <div className="absolute w-10 rounded-full h-10 bg-BEColor opacity-50 -bottom-5 -right-5"></div>
                          <div className="absolute w-20 rounded-full h-20 bg-BEColor opacity-50 -bottom-12 right-3"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="">|</div>
                </>
              ) : (
                ""
              )}
              <div
                ref={currencyRef}
                className="flex space-x-1 items-center cursor-pointer relative "
                onClick={() => setCurrency(!currency)}
              >
                <span className="text-base">
                  <img
                    src={selectedCurrency ? selectedCurrency?.flag : ""}
                    className="w-[32px]"
                    alt="$"
                  />
                </span>
                <span className="text-sm ">
                  {selectedCurrency ? selectedCurrency?.isocode : ""}
                </span>
                <span className="text-sm ">
                  <AiOutlineDown />
                </span>
                {/* absolute modal */}
                {currency && (
                  <div className="absolute z-20 top-7 md:top-0 right-0 bg-light  rounded-md w-[200px]">
                    <CurrencyModal
                      setCurrency={setCurrency}
                      currency={currency}
                    />
                  </div>
                )}
                {/* absolute modal */}
              </div>
              {isLoggedIn ? (
                <>
                  <div className="">|</div>
                  <div ref={profileRef} className="relative cursor-pointer">
                    <div
                      onClick={() => setIsProfile(!isProfile)}
                      className=" flex gap-2 justify-center items-center sm:text-xl cursor-pointer ml-2"
                    >
                      <div className="w-8 h-8 rounded-full shadow-sm bg-gray-300">
                        <img
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=${agent?.name}`}
                          alt="avatar"
                          className=" border border-gray-100 h-full w-full rounded-full"
                        />
                      </div>
                      <div className="">
                        <p className="text-xs font-semibold">
                          {"Welcome " + agent.name}
                        </p>
                        <p className="text-xs ">{agent.companyName}</p>
                      </div>
                    </div>
                    {isProfile ? (
                      <div className="absolute w-[250px] top-12 right-0 z-10 shadow-round">
                        <div className="w-full relative overflow-hidden">
                          <div className="w-full bg-white text-gray-400 rounded-md p-2">
                            <ul className="divide-y ">
                              <li
                                onClick={() => {
                                  navigate("/settings");
                                  setIsProfile(false);
                                }}
                                className="flex items-center gap-2 py-1 hover:bg-gray-50 px-2"
                              >
                                <p className="w-5 flex justify-center items-center text-xl">
                                  <BsPerson />
                                </p>
                                <p className="font-demo tracking-wide font-medium ">
                                  Profile
                                </p>
                              </li>
                              {agent?.role === "reseller" ? (
                                <li
                                  onClick={() => {
                                    navigate('/resellers')
                                  }}
                                  className="flex items-center gap-2 py-1 hover:bg-gray-50 px-2"
                                >
                                  <p className="w-5 flex justify-center items-center text-lg">
                                    <RxPerson />
                                  </p>
                                  <p className="font-demo tracking-wide font-medium ">
                                    Agents
                                  </p>
                                </li>
                              ) : (
                                ""
                              )}
                              <li
                                onClick={() => {
                                  if (agent?.configuration?.showAttraction) {
                                    navigate("/markup/attraction");
                                  }
                                }}
                                className="flex items-center gap-2 py-1 hover:bg-gray-50 px-2"
                              >
                                <p className="w-5 flex justify-center items-center text-lg">
                                  <IoPricetagOutline />
                                </p>
                                <p className="font-demo tracking-wide font-medium ">
                                  Markup
                                </p>
                              </li>
                              <li
                                onClick={() => {
                                  dispatch(logoutAgent());
                                  setIsProfile(false);
                                }}
                                className="flex items-center gap-2 py-1 hover:bg-gray-50 px-2"
                              >
                                <p className="w-5 flex justify-center items-center text-lg">
                                  <AiOutlineLogout />
                                </p>
                                <p className="font-demo tracking-wide font-medium ">
                                  Logout
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      {isLoggedIn ? (
        <div className="hidden md:block shadow-mn">
          <div className="max-w-screen-xl mx-auto py-4 px-5">
            <div className="flex justify-between items-center  w-full">
              <div className="flex gap-12 items-center">
                <div
                  onClick={() => navigate("/")}
                  className="flex flex-col cursor-pointer items-center"
                >
                  <p
                    className={`text-3xl text-center  ${
                      location.pathname === "/" ||
                      location.pathname === "/attraction"
                        ? // location.pathname === "/visa" ||
                          // location.pathname === "/a2a" ||
                          // location.pathname === "/flight" ||
                          // location.pathname === "/flight/order/results" ||
                          // location.pathname === "/insurance"
                          " text-blue-500 "
                        : " text-gray-400 "
                    }`}
                  >
                    <IoMdHome />
                  </p>
                  <p
                    className={`text-sm ${
                      location.pathname === "/" ||
                      location.pathname === "/attraction"
                        ? // location.pathname === "/visa" ||
                          // location.pathname === "/a2a" ||
                          // location.pathname === "/flight" ||
                          // location.pathname === "/flight/order/results" ||
                          // location.pathname === "/insurance"
                          " text-blue-500 "
                        : " text-gray-400 "
                    }`}
                  >
                    Home
                  </p>
                </div>

                <div
                  onClick={() => navigate("/tours")}
                  className="flex flex-col cursor-pointer items-center"
                >
                  <p
                    className={`text-3xl text-center  ${
                      location.pathname === "/tours"
                        ? " text-blue-500 "
                        : " text-gray-400 "
                    }`}
                  >
                    <MdTravelExplore />
                  </p>
                  <p
                    className={`text-sm ${
                      location.pathname === "/tours"
                        ? " text-blue-500 "
                        : " text-gray-400 "
                    }`}
                  >
                    Tours
                  </p>
                </div>

                <div
                  onClick={() => navigate("/transfer")}
                  className="flex flex-col cursor-pointer items-center"
                >
                  <p
                    className={`text-3xl text-center  ${
                      location.pathname === "/transfer" ||
                      location.pathname === "/transfer/list"
                        ? " text-blue-500 "
                        : " text-gray-400 "
                    }`}
                  >
                    <FaCar />
                  </p>
                  <p
                    className={`text-sm  ${
                      location.pathname === "/transfer"
                        ? " text-blue-500 "
                        : " text-gray-400 "
                    }`}
                  >
                    Transfer
                  </p>
                </div>
                {/* {agent?.configuration?.showQuotaion ? (
                  <div
                    onClick={() => navigate("/quotation")}
                    className="flex flex-col cursor-pointer items-center"
                  >
                    <p
                      className={`text-3xl text-center ${
                        location.pathname.includes("/quotation") &&
                        location.pathname !== "/markup/quotation"
                          ? " text-blue-500 "
                          : " text-gray-400 "
                      } `}
                    >
                      <RiFilePaper2Line />
                    </p>
                    <p
                      className={`text-sm ${
                        location.pathname.includes("/quotation") &&
                        location.pathname !== "/markup/quotation"
                          ? " text-blue-500 "
                          : " text-gray-400 "
                      }`}
                    >
                      Insta Quote
                    </p>
                  </div>
                ) : (
                  ""
                )} */}
                {/* 
              <div className="flex flex-col cursor-pointer items-center">
                <p className="text-3xl text-center text-gray-400">
                  <IoMdNotificationsOutline />
                </p>
                <p className="text-sm text-gray-400">Notification</p>
              </div> */}

                <div
                  onClick={() => {
                    if (agent?.configuration?.showAttraction) {
                      navigate("/order");
                    }
                  }}
                  className="flex flex-col cursor-pointer items-center"
                >
                  <p
                    className={`text-3xl text-center ${
                      location.pathname === "/order/details" ||
                      location.pathname === "/order"
                        ? " text-blue-500 "
                        : " text-gray-400 "
                    } `}
                  >
                    <TbBrandBooking />
                  </p>
                  <p
                    className={`"text-sm ${
                      location.pathname === "/order/details" ||
                      location.pathname === "/order"
                        ? " text-blue-500 "
                        : " text-gray-400 "
                    }`}
                  >
                    Booking Reports
                  </p>
                </div>
              </div>
              <div className="">
                <div className="relative  cursor-pointer">
                  <div
                    // onClick={() => setCart(!cart)}
                    onClick={() => navigate("/home/cart")}
                    className="flex flex-col items-center"
                  >
                    <p className="text-3xl text-center text-gray-400">
                      <HiOutlineShoppingCart />
                    </p>
                    <p className="text-sm text-gray-400">Cart</p>
                  </div>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}
