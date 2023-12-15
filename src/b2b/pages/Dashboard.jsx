import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
// import HeroSearch from './Attraction/HeroSearch'
import SearchCards from "../components/Cards/SearchCards";

import {
   bookingCancelledPng,
   bookingConfirmedPng,
   bookingReceivedPng,
   ticketBoughtPng,
   ticketCancelledPng,
   ticketConfirmedPng,
   totalRevenuePng,
   usersPng,
} from "../../static/imagesB2B";
import TopCard from "../components/features/TopCard";
import WalletCard from "../components/features/WalletCard";
import { AiFillAlert } from "react-icons/ai";
import TopDestination from "./TopDestination";
import { setMenuStatus } from "../../redux/slices/generalSlice";
import { Calender } from "../components";

export default function Dashboard() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { agent } = useSelector((state) => state.agents);
   const { balance } = useSelector((state) => state.wallet);
   const { b2bMenuStatus } = useSelector((state) => state.general);
   const { visaCountries } = useSelector((state) => state.home);

   useEffect(() => {
      dispatch(
         setMenuStatus({
            attraction: true,
            hotel: false,
            visa: false,
            transfer: false,
            flight: false,
         })
      );
   }, []);

   return (
      <div className="">
         {/* <div className="bg-white flex items-center justify-between gap-[10px] lg:px-6 px-2 shadow-sm border-t py-2">
                <h1 className="font-[600] text-[15px] uppercase">
                    Dashboard
                </h1>

                <div className="text-sm text-grayColor">
                    <Link to="/" className="text-textColor">
                        Dashboard{" "}
                    </Link>
                </div>
            </div> */}
         <div className="lg:px-6 p-2 min-h-screen">
            {/* <div className="flex items-center justify-between gap-[10px] mb-5">
                    <div>
                        <span className="font-medium text-textColor">
                            Good morning, {agent?.name}
                        </span>
                        <span className="block mt-1 text-[13px] text-grayColor">
                            Here's what's happening with your website today.
                        </span>
                    </div>
                    <div>
                        <select name="" id="" className="select lg:w-[150px] w-[100px]">
                            <option value="">All Time</option>
                        </select>
                    </div>
                </div> */}

            <div className="my-2 ">
               <SearchCards />
            </div>

            <div className="my-2">
               {b2bMenuStatus?.attraction && <TopDestination />}
               {b2bMenuStatus?.visa && (
                  <div>
                     <div className="text-xl md:text-2xl font-semibold text-darktext mb-4">
                        Top Visited Countries
                     </div>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                        {visaCountries?.map((item, index) => (
                           <div
                              className="mt-2 relative cursor-pointer shadow-md rounded-2xl"
                              key={index}
                              onClick={() => navigate(`/visa/${item?._id}`)}
                           >
                              <div className="overflow-hidden rounded-2xl">
                                 <img
                                    className="hover:scale-110 object-cover rounded-2xl h-[7em] md:h-[13em] w-full  transition-all duration-500 cursor-pointer"
                                    src={item?.flag}
                                    alt={item?.countryName}
                                 />
                              </div>
                              <div
                                 className={`absolute bottom-2 left-4  ${
                                    item?.isocode === "US"
                                       ? "text-darktext"
                                       : "text-light"
                                 }`}
                              >
                                 <div className="font-semibold capitalize ">
                                    {item?.countryName}{" "}
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               )}
               {b2bMenuStatus?.a2a && <Calender />}
            </div>

            {/* <div className="md:grid md:grid-cols-2 space-y-2 md:space-y-0 lg:grid-cols-4 gap-6">
                    <WalletCard
                        title={"Wallet Balance"}
                        value={balance}
                        link="/wallet"
                        linkText="View all details"
                        icon={totalRevenuePng}
                        isAmount={true}
                    />
                    <WalletCard
                        title={"Wallet Deposit"}
                        value={balance}
                        link="/wallet"
                        linkText="Deposit to wallet"
                        icon={totalRevenuePng}
                        isAmount={true}
                    />
                    <WalletCard
                        title={"Wallet Withdraw"}
                        value={balance}
                        link="/wallet"
                        linkText="Withdraw from wallet"
                        icon={totalRevenuePng}
                        isAmount={true}
                    />
                    <WalletCard
                        title={"Profit"}
                        value={200}
                        link="/b2b/profit"
                        linkText="Profit recieved"
                        icon={totalRevenuePng}
                        isAmount={true}
                    />
                </div> */}

            {/* <div className="md:grid md:grid-cols-2 lg:grid-cols-4 space-y-2 lg:space-y-0 gap-6 mt-2 lg:mt-6">
                    <TopCard
                        title={"Total Revenue"}
                        value={300}
                        link="/"
                        linkText="View all details"
                        icon={totalRevenuePng}
                        isAmount={true}
                    />
                    <TopCard
                        title={"Total Booking Received"}
                        value={3}
                        link="/"
                        linkText="View all booking"
                        icon={bookingReceivedPng}
                    />
                    <TopCard
                        title={"Total Booking Confimed"}
                        value={2}
                        link="/"
                        linkText="View all booking"
                        icon={bookingConfirmedPng}
                    />
                    <TopCard
                        title={"Total Booking Cancelled"}
                        value={1}
                        link="/"
                        linkText="View all booking"
                        icon={bookingCancelledPng}
                    />
                    <TopCard
                        title={"Total Users Signed"}
                        value={20}
                        link="/"
                        linkText="View all booking"
                        icon={usersPng}
                    />
                    <TopCard
                        title={"Total Ticket Bought"}
                        value={10}
                        link="/"
                        linkText="View all booking"
                        icon={ticketBoughtPng}
                    />
                    <TopCard
                        title={"Total Ticket Confirmed"}
                        value={6}
                        link="/"
                        linkText="View all booking"
                        icon={ticketConfirmedPng}
                    />
                    <TopCard
                        title={"Total Ticket Cancelled"}
                        value={4}
                        link="/"
                        linkText="View all booking"
                        icon={ticketCancelledPng}
                    />
                </div> */}
         </div>
      </div>
   );
}
