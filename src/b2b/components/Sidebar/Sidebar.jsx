import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";
import SidebarMenu from "./SidebarMenu";
import { sidebarMenus } from "../../data";
import { BsWallet2 } from "react-icons/bs";
import { useSelector } from "react-redux";
import priceConversion from "../../../utils/PriceConversion";
import { RxAvatar } from "react-icons/rx";
import { companyLogo, logoPng } from "../../../static/imagesB2B";
import { config } from "../../../constants";

export default function Sidebar({ setSidebarView, sidebarView }) {
  const navigate = useNavigate();

  const { balance, creditAmount, creditUsed } = useSelector(
    (state) => state.wallet
  );
  const { selectedCurrency } = useSelector((state) => state.home);
  const { agent } = useSelector((state) => state.agents);

  const menuList = sidebarMenus?.filter((item) => item?.name !== "Agents");

  return (
    <>
      <div
        className={`z-20 sidebar top-0 left-0 flex h-[100vh] py-1  lg:px-4 bg-[#003580]  ${
          sidebarView ? "w-[250px]" : "w-0 lg:w-[250px]"
        } overflow-hidden fixed flex-col transition-all `}
      >
        <div className="flex items-center justify-between lg:justify-around  py-5 cursor-pointer px-2 ">
          <div
            className="h-12 bg-gray-200 px-5 py-1 rounded-xl"
            onClick={() => navigate("/")}
          >
            <img src={companyLogo} alt="logo" className="h-full object-fill" />
          </div>
          <p
            className="lg:hidden text-light text-xl"
            onClick={() => setSidebarView(false)}
          >
            <BiMenuAltRight />
          </p>
        </div>

        <div id="sidebar" className="flex-1 mt-2 px-2 lg:px-0 ">
          <div className="group flex py-3 px-6 items-center bg-gray-600 hover:bg-gray-500 rounded-xl transition duration-200">
            <div className="flex px-2 h-12 items-center justify-center bg-gray-500 group-hover:bg-gray-600 rounded-lg text-3xl text-white">
              <RxAvatar />
            </div>
            <div className="relative h-[100%] flex gap-[10px] items-center px-[12px] cursor-pointer">
              <div className="block">
                <span className="block text-[12px] text-grayColor">
                  {agent?.agentCode}
                </span>
                <span className="block text-[12px] font-medium text-white capitalize">
                  {agent?.companyName}
                </span>
              </div>
            </div>
          </div>
          <ul className="mt-4">
            {agent?.role === "sub-agent" ? (
              <>
                {menuList.map((item, index) => {
                  return (
                    <SidebarMenu
                      key={index}
                      {...item}
                      setSidebarView={setSidebarView}
                      sidebarView={sidebarView}
                    />
                  );
                })}
              </>
            ) : (
              <>
                {sidebarMenus.map((item, index) => {
                  return (
                    <SidebarMenu
                      key={index}
                      {...item}
                      setSidebarView={setSidebarView}
                      sidebarView={sidebarView}
                    />
                  );
                })}
              </>
            )}
          </ul>
          <div className="">
            <Link
              to="/wallet"
              className="group block py-4 px-3 mb-4 bg-blue-500 hover:bg-blue-600 rounded-xl transition duration-200"
              onClick={() => setSidebarView(false)}
            >
              <div className="flex justify-around items-center">
                <div className="flex w-12 h-12 mb-4 items-center justify-center bg-blue-600 group-hover:bg-blue-500 rounded-xl">
                  <span className="text-white">
                    <BsWallet2 />
                  </span>
                </div>
                <h5 className="text-sm font-medium text-blue-50 mb-2">
                  {priceConversion(balance, selectedCurrency, true)}
                </h5>
              </div>
              <p className="text-xs leading-normal font-semibold text-blue-200 text-center">
                Available balance
              </p>
            </Link>
            {(Number(creditAmount) > 0 || Number(creditUsed) > 0) && (
              <Link
                to="/wallet"
                className="group block py-4 px-3 mb-4 bg-dark hover:bg-dark/90 rounded-xl transition duration-200"
                onClick={() => setSidebarView(false)}
              >
                <div className="flex justify-around items-center">
                  <div className="flex w-12 h-12 mb-4 items-center justify-center bg-gray-600 group-hover:bg-gray-500 rounded-xl">
                    <span className="text-white">
                      <BsWallet2 />
                    </span>
                  </div>
                  <div>
                    {Number(creditAmount) > 0 && (
                      <>
                        <p className="text-xs leading-normal font-semibold text-blue-200 text-start">
                          Credit Amount
                        </p>
                        <h5 className="text-sm font-medium text-blue-50 mb-2">
                          {priceConversion(
                            creditAmount,
                            selectedCurrency,
                            true
                          )}
                        </h5>
                      </>
                    )}
                    {Number(creditUsed) > 0 && (
                      <>
                        <p className="text-xs leading-normal font-semibold text-blue-200 text-start">
                          Used Credit
                        </p>
                        <h5 className="text-sm font-medium text-blue-50 mb-2">
                          {priceConversion(creditUsed, selectedCurrency, true)}
                        </h5>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>

        <div className="px-[30px] mt-[2.5em] pb-4">
          <p className="text-[#9590ae] text-[12px] font-[500] mt-[5px]">
            <span className="text-[11px] font-[400]">
              &#169; {new Date().getFullYear()} All Rights Reserved
            </span>
          </p>
        </div>
      </div>
      <div
        onClick={() => setSidebarView(false)}
        className={`${
          sidebarView ? " fixed " : " hidden "
        } lightglass fixed top-0 bottom-0 right-0 left-0 z-10`}
      ></div>
    </>
  );
}
