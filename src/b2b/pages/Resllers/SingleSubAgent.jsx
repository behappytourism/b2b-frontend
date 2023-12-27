import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { MdAccountBalanceWallet } from "react-icons/md";
import { GiCash, GiTakeMyMoney } from "react-icons/gi";
import { avatarpng } from "../../../static/images";
import { useDispatch, useSelector } from "react-redux";
import { PageLoader } from "../../components";
import formatDate from "../../../utils/formatDate";
import { fetchSingleReseller } from "../../../redux/slices/resellerSlice";
import SingleSubAgentDetails from "../../components/Resellers/SingleSubAgentDetails";
import OrderHistory from "../../components/Resellers/OrderHistory";
import TransactionHistoryTable from "../../components/Resellers/TransactionHistoryTable";
import { IoCash } from "react-icons/io5";
import priceConversion from "../../../utils/PriceConversion";
import Configuration from "../../components/Resellers/Configuration";
import Markup from "./Markup/Markup";

export default function SingleSubAgent() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams({ tab: "details" });
  const { agent } = useSelector((state) => state.agents);

  const activeTab = searchParams.get("tab");

  const { id } = useParams();
  const { reseller, loading, resellerWalletInfo } = useSelector(
    (state) => state.resellers
  );
  const { selectedCurrency } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(fetchSingleReseller(id));
  }, [dispatch]);

  const renderTab = (tab) => {
    switch (tab) {
      case "details":
        return <SingleSubAgentDetails  />;
      case "markup":
        return <Markup subAgentId={id} />;
      case "configuration":
        return <Configuration />;
      default:
        return "";
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      {loading ? (
        <PageLoader />
      ) : (
        <div className="px-5 py-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[15px]">
              <div className="w-[45px] h-[45px] rounded-full overflow-hidden">
                <img
                  src={avatarpng}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="block font-[600] text-lg">
                  {reseller?.name}
                </span>
                <span className="block text-sm text-gray-200">
                  {reseller?.createdAt && formatDate(reseller?.createdAt)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div>
                <span className="text-sm text-grayColor">Agent Code</span>
                <span className="ml-3 text-center font-medium mt-1">
                  {reseller?.agentCode}
                </span>
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-4 gap-4 mt-6 text-gray-200">
            <div className="to-BEColor bg-gradient-to-r from-black shadow-sm rounded-xl p-4 flex items-start justify-between">
              <div>
                <span className="block text-lg font-[600]">
                  {priceConversion(
                    resellerWalletInfo?.balance,
                    selectedCurrency,
                    true
                  ) || `0 ${selectedCurrency?.isocode}`}{" "}
                </span>
                <span className="block text-sm text-gray-200 font-thin mt-[2px]">
                  Available Balance
                </span>
              </div>
              <span className="text-3xl">
                <MdAccountBalanceWallet />
              </span>
            </div>
            <div className=" to-BEColor bg-gradient-to-r from-black shadow-sm rounded-xl p-4 flex items-start justify-between">
              <div>
                <span className="block text-lg font-[600]">
                  {" "}
                  {priceConversion(
                    resellerWalletInfo?.totalEarnings,
                    selectedCurrency,
                    true
                  ) || `0 ${selectedCurrency?.isocode}`}{" "}
                </span>
                <span className="block text-sm text-gray-200 font-thin mt-[2px]">
                  Total Earnings
                </span>
              </div>
              <span className="text-3xl">
                <GiTakeMyMoney />
              </span>
            </div>
            <div className="to-BEColor bg-gradient-to-r from-black shadow-sm rounded-xl p-4 flex items-start justify-between">
              <div>
                <span className="block text-lg font-[600]">
                  {" "}
                  {priceConversion(
                    resellerWalletInfo?.pendingEarnings,
                    selectedCurrency,
                    true
                  ) || `0 ${selectedCurrency?.isocode}`}{" "}
                </span>
                <span className="block text-sm text-gray-200 font-thin mt-[2px]">
                  Pending Earnings
                </span>
              </div>
              <span className="text-3xl">
                <GiCash />
              </span>
            </div>
            <div className="to-BEColor bg-gradient-to-r from-black shadow-sm rounded-xl p-4 flex items-start justify-between">
              <div>
                <span className="block text-lg font-[600]">
                  {" "}
                  {priceConversion(
                    resellerWalletInfo?.withdrawTotal,
                    selectedCurrency,
                    true
                  ) || `0 ${selectedCurrency?.isocode}`}{" "}
                </span>
                <span className="block text-sm text-gray-200 font-thin mt-[2px]">
                  Total Withdrawal
                </span>
              </div>
              <span className="text-3xl">
                <IoCash />
              </span>
            </div>
          </div>

          <div className=" mt-6">
            <div className="flex items-center gap-[13px] px-4 border-b border-b-dahsed">
              <button
                className={`${
                  activeTab == "details"
                    ? " border-b border-b-blue-500 text-blue-500 "
                    : " text-textColor "
                }   px-2 py-4 h-auto bg-transparent  font-medium rounded-none`}
                onClick={() => {
                  setSearchParams(
                    (prev) => {
                      prev.set("tab", "details");
                      return prev;
                    },
                    { replace: true }
                  );
                }}
              >
                Details
              </button>
              <button
                className={`${
                  activeTab == "markup"
                    ? " border-b border-b-blue-500 text-blue-500 "
                    : " text-textColor "
                }   px-2 py-4 h-auto bg-transparent  font-medium rounded-none`}
                onClick={() => {
                  setSearchParams(
                    (prev) => {
                      prev.set("tab", "markup");
                      return prev;
                    },
                    { replace: true }
                  );
                }}
              >
                Markup
              </button>
              <button
                className={`${
                  activeTab == "configuration"
                    ? " border-b border-b-blue-500 text-blue-500 "
                    : " text-textColor "
                }   px-2 py-4 h-auto bg-transparent  font-medium rounded-none`}
                onClick={() => {
                  setSearchParams(
                    (prev) => {
                      prev.set("tab", "configuration");
                      return prev;
                    },
                    { replace: true }
                  );
                }}
              >
                B2B Cofiguration
              </button>
            </div>
            {renderTab(activeTab)}
          </div>
        </div>
      )}
    </div>
  );
}
