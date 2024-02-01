import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AllTransaction from "./AllTransaction";
import priceConversion from "../../../utils/PriceConversion";
import { setTransaction } from "../../../redux/slices/walletSlice";
import BtnLoader from "../../components/BtnLoader";
import WithdrawModal from "./WithdrawModal";
import { Pagination } from "../../components";
import axios from "../../../axios";
import Deposit from "./Deposit";
import DepositRequest from "./DepositRequest";
import Withdrawal from "./Withdrawal";
import WithdrawalRequest from "./WithdrawalRequest";
import DepositModal from "./DepositModal";

function Wallet() {
   const dispatch = useDispatch();
   const [component, setComponent] = useState({
      transactions: true,
      deposit: false,
      depositRequest: false,
      withdrawal: false,
      withdrawalRequest: false,
   });
   const [filters, setFilters] = useState({
      limit: 10,
      skip: 0,
      totalTransactions: 0,
      status: "",
   });
   const [isLoading, setIsLoading] = useState(false);
   const [viewWithdrawModal, setViewWithdrawModal] = useState(false);
   const [isDropDown, setIsDropDown] = useState(false)
   const [isModal, setIsModal] = useState(false)

   const { balance, pendingBalance, loading } = useSelector(
      (state) => state.wallet
   );
   const { selectedCurrency } = useSelector((state) => state.home);
   const { token } = useSelector((state) => state.agents);

   // fetching transaction
   const fetchTransactions = async ({ ...filters }) => {
      try {
         console.log("transaction fetching...");
         setIsLoading(true);

         const searchQuery = `skip=${filters?.skip}&limit=${filters.limit}&status=${filters.status}`;
         let response;
         response = await axios.get(`/b2b/transactions/all?${searchQuery}`, {
            headers: { authorization: `Bearer ${token}` },
         });
         dispatch(setTransaction(response?.data || []));

         setFilters((prev) => {
            return {
               ...prev,
               totalTransactions:
                  response?.data?.result?.totalTransactions || 0,
            };
         });
         setIsLoading(false);
      } catch (err) {
         console.log(err);
         setIsLoading(false);

      }
   };

   useEffect(() => {
      fetchTransactions({ ...filters });
      console.log("working");
   }, [filters.skip, filters.status]);

   const handleModal = ()=>{
      setIsModal(!isModal)
   }

   return (
         <div className="max-w-screen-xl mx-auto ">
            <div className="px-5 py-10 ">
               <div className=" ">
                  <div className="sm:grid sm:grid-cols-2 space-y-2 sm:space-y-0   gap-5 lg:gap-12">
                     <div className="">
                        <div className="bg-black  rounded-lg py-3 shadow-sm px-3 h-full lg:px-7">
                           <div className="h-full">
                              <div className="h-full">
                                 <h2 className="lg:text-3xl text-2xl text-center lg:text-start font-black text-gray-200 tracking-wider mb-3">
                                    Wallet Balance
                                 </h2>
                                 <h5 className="text-xs lg:text-sm text-text mb-3">
                                    My balance*
                                 </h5>
                                 <div className="flex space-x-2 text-2xl tracking-wider font-bold  ">
                                    {loading ? (
                                       <BtnLoader />
                                    ) : (
                                       <p className="text-gray-200">
                                          {priceConversion(
                                             balance,
                                             selectedCurrency,
                                             true
                                          )}
                                       </p>
                                    )}
                                 </div>
                                 <div className="mb-5">
                                    <h5 className="text-xs lg:text-sm text-text mb-3">
                                       is left on your wallet!
                                    </h5>
                                    <div className="relative flex  h-full w-full gap-3">
                                       <div className="w-full ">
                                          {/* <Link to="/payment/approval"> */}
                                             <button className="w-full bg-BEColor shadow-mn text-gray-100 py-3 rounded-[0.25rem] text-xs lg:text-sm" onClick={()=> setIsDropDown(!isDropDown)}>
                                                DEPOSIT
                                             </button>
                                          {/* </Link> */}
                                       </div>
                                       {
                                          isDropDown && (
                                             <div className="absolute top-12 bottom-0 left-0 right-0 w-64">
                                                <div className=" bg-slate-100 border-2 shadow-lg rounded">
                                                   <div className="border-b-2 w-full">
                                                   <Link to="/payment/approval">
                                                      <button className="w-full hover:bg-slate-300" onClick={()=> setIsDropDown(false)}>ADD MONEY <span className="text-sm">(Online Payment)</span></button>
                                                    </Link>
                                                   </div>
                                                   <div className="w-full">
                                                      <button className="w-full hover:bg-slate-300" onClick={()=>{
                                                            handleModal()
                                                            setIsDropDown(false)
                                                      }}>DEPOSIT BANK</button>
                                                   </div>
                                                </div>
                                             </div>
                                          )
                                       }
                                   
                                       <div className="w-full">
                                          <button
                                             className="w-full bg-BEColor shadow-mn text-gray-100 py-3 rounded-[0.25rem] text-xs lg:text-sm"
                                             onClick={() =>
                                                setViewWithdrawModal(true)
                                             }
                                          >
                                             WITHDRAW
                                          </button>
                                          {/* asbolutemodal */}
                                          {viewWithdrawModal && (
                                             <WithdrawModal
                                                setViewWithdrawModal={
                                                   setViewWithdrawModal
                                                }
                                             />
                                          )}
                                          {/* asbolutemodal */}
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="h-full ">
                        <div className="bg-black h-full rounded-xl py-3 shadow-sm px-3 lg:px-7">
                           <div className="flex justify-between">
                              <div className="">
                                 <h2 className="lg:text-3xl text-2xl text-center lg:text-start font-black text-gray-200 tracking-wider mb-3">
                                    Pending Balance
                                 </h2>
                                 <h5 className="text-xs lg:text-sm text-text mb-3">
                                    Pending balance*
                                 </h5>
                                 <div className="flex space-x-2 text-2xl tracking-wider font-bold  ">
                                    {loading ? (
                                       <BtnLoader />
                                    ) : (
                                       <p className="text-gray-200">
                                          {priceConversion(
                                             pendingBalance,
                                             selectedCurrency,
                                             true
                                          )}
                                       </p>
                                    )}
                                 </div>
                                 <div className="mb-5">
                                    <h5 className="text-xs lg:text-sm text-text mb-3">
                                       amount is pending!
                                    </h5>
                                    <h5 className="text-xs text-text mb-3">
                                       add money to your wallet and expolre
                                       destinations
                                    </h5>
                                    <h5 className="text-xs text-text mb-3">
                                       withdraw the money in to your account.
                                    </h5>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  {/* tables */}
                  <div className=" my-10 ">
                     <div className="w-full mt-3">
                        <ul className="flex -mb-4">
                           <li className="mb-4 mr-8">
                              <span
                                 className={`inline-block pb-4 ${
                                    component.transactions
                                       ? " text-blue-500 border-blue-500  "
                                       : " text-gray-400 border-transparent "
                                 } font-semibold border-b  hover:border-gray-400 transition duration-200 cursor-pointer`}
                                 onClick={() => {
                                    setComponent((prev) => {
                                       return {
                                          ...prev,
                                          transactions: true,
                                          deposit: false,
                                          depositRequest: false,
                                          withdrawal: false,
                                          withdrawalRequest: false,
                                       };
                                    });
                                    setFilters((prev) => {
                                       return { ...prev, status: "" };
                                    });
                                 }}
                              >
                                  Transactions
                              </span>
                           </li>
                           <li className="mb-4 mr-8">
                              <span
                                 className={`inline-block pb-4 ${
                                    component.deposit
                                       ? " text-blue-500 border-blue-500  "
                                       : " text-gray-400 border-transparent "
                                 } font-semibold border-b  hover:border-gray-400 transition duration-200 cursor-pointer`}
                                 onClick={() => {
                                    setComponent((prev) => {
                                       return { 
                                          ...prev,
                                          transactions: false,
                                          deposit: true,
                                          depositRequest: false,
                                          withdrawal: false,
                                          withdrawalRequest: false,
                                       };
                                    });
                             
                                 }}
                              >
                                 Deposit  
                              </span>
                           </li>
                           <li className="mb-4 mr-8">
                              <span
                                 className={`inline-block pb-4 ${
                                    component.depositRequest
                                       ? " text-blue-500 border-blue-500  "
                                       : " text-gray-400 border-transparent "
                                 } font-semibold border-b  hover:border-gray-400 transition duration-200 cursor-pointer`}
                                 onClick={() => {
                                    setComponent((prev) => {
                                       return {
                                          ...prev,
                                          transactions: false,
                                          deposit: false,
                                          depositRequest: true,
                                          withdrawal: false,
                                          withdrawalRequest: false,
                                       };
                                    });
                             
                                 }}
                              >
                                 Deposit Request
                              </span>
                           </li>
                           <li className="mb-4 mr-8">
                              <span
                                 className={`inline-block pb-4 ${
                                    component.withdrawal
                                       ? " text-blue-500 border-blue-500  "
                                       : " text-gray-400 border-transparent "
                                 } font-semibold border-b  hover:border-gray-400 transition duration-200 cursor-pointer`}
                                 onClick={() => {
                                    setComponent((prev) => {
                                       return {
                                          ...prev,
                                          transactions: false,
                                          deposit: false,
                                          depositRequest: false,
                                          withdrawal: true,
                                          withdrawalRequest: false,
                                       };
                                    });
                          
                                 }}
                              >
                                 Withdrawal
                              </span>
                           </li>
                           <li className="mb-4 mr-8">
                              <span
                                 className={`inline-block pb-4 ${
                                    component.withdrawalRequest
                                       ? " text-blue-500 border-blue-500  "
                                       : " text-gray-400 border-transparent "
                                 } font-semibold border-b  hover:border-gray-400 transition duration-200 cursor-pointer`}
                                 onClick={() => {
                                    setComponent((prev) => {
                                       return {
                                          ...prev,
                                          transactions: false,
                                          deposit: false,
                                          depositRequest: false,
                                          withdrawal: false,
                                          withdrawalRequest: true,
                                       };
                                    });
                           
                                 }}
                              >
                                 Withdrawal Request
                              </span>
                           </li>
                        </ul>
                     </div>
                     {
                        component.transactions ? (
                           <div className="overflow-x-auto shadow-[0_0_7px_2px_rgb(56_65_74_/_5%)]">
                              <AllTransaction />
                              <div className="p-4">
                                 <Pagination
                                    limit={filters?.limit}
                                    skip={filters?.skip}
                                    total={filters?.totalTransactions}
                                    incOrDecSkip={(number) =>
                                       setFilters((prev) => {
                                          return {
                                             ...prev,
                                             skip: Number(prev.skip) + Number(number),
                                          };
                                       })
                                    }
                                    updateSkip={(skip) =>
                                       setFilters((prev) => {
                                          return { ...prev, skip };
                                       })
                                    }
                                 />
                              </div>
                           </div>
                           
                        ) : component.deposit ? (
                           <div className="overflow-x-auto shadow-[0_0_7px_2px_rgb(56_65_74_/_5%)]">
                           <Deposit />
                           <div className="p-4">
                             
                           </div>
                        </div>
                        ) : component.depositRequest ? (
                           <div className="overflow-x-auto shadow-[0_0_7px_2px_rgb(56_65_74_/_5%)]">
                           <DepositRequest />
                           <div className="p-4">
                            
                           </div>
                        </div>
                        ) : component.withdrawal ? (
                           <div className="overflow-x-auto shadow-[0_0_7px_2px_rgb(56_65_74_/_5%)]">
                           <Withdrawal />
                           <div className="p-4">
                             
                           </div>
                        </div>
                        ) : component.withdrawalRequest ? (
                           <div className="overflow-x-auto shadow-[0_0_7px_2px_rgb(56_65_74_/_5%)]">
                           <WithdrawalRequest />
                           <div className="p-4">
                           </div>
                        </div>
                        ) : " "
                     }

                  </div>
               </div>
               {
                  isModal && (
                     <div>
                       <DepositModal setIsModal={setIsModal}/>
                     </div>
                  )
               }
            </div>
         </div>
   );
}

export default Wallet;
