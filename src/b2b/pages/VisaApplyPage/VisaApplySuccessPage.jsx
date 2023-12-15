import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { successAnimation } from "../../../data";
import { useSelector } from "react-redux";
import priceConversion from "../../../utils/PriceConversion";
import axios from "../../../axios";

function VisaApplySuccessPage() {
   const navigate = useNavigate();
   const { id } = useParams();

   const [error, setError] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [visaApplyResponse, setVisaApplyResponse] = useState({});

   // const { visaApplyResponse } = useSelector((state) => state.visa);
   const { token, agent } = useSelector((state) => state.agents);
   const { selectedCurrency } = useSelector((state) => state.home);

   // if(!visaApplyResponse) {
   //   navigate('/b2b')
   // }

   const fetchData = async () => {
      try {
         setIsLoading(true);
         setError("");

         const config = {
            headers: {
               authorization: `Bearer ${token}`,
            },
         };
         const response = await axios.get(
            `/b2b/visa/application/invoice/${id}`,
            config
         );
         setIsLoading(false);
         setVisaApplyResponse(response.data);
         console.log(response.data);
         return response.data;
      } catch (error) {
         setError(
            error?.response?.data?.error || "Something went wrong, Try again"
         );
         setIsLoading(false);
      }
   };

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <div className=" ">
         <div className="p-2">
            <div className=" mt-2 ">
               <div className="main__section mt-4">
                  <div className="flex justify-center">
                     <div className="">
                        <span className="flex justify-center">
                           <div className=" w-[250px] ">
                              <Lottie animationData={successAnimation} />
                           </div>
                        </span>
                        <div className="text-center">
                           <h2 className="text-[25px] text-[#12acfd] font-[650]">
                              You have Successfully Applied for Visa!
                           </h2>
                        </div>
                     </div>
                  </div>

                  <div className="flex justify-center w-full mt-5">
                     <div className="first__section  w-full">
                        <div className="bg-white shadow-sm m-6 rounded-[0.30rem] p-6 w-full sm:w-11/12 md:w-9/12 lg:w-6/12 mx-auto ">
                           <div className="text-center">
                              <h2 className="text-xl font-[600] text-darktext">
                                 {agent?.companyName}
                              </h2>
                           </div>
                           <div className="flex justify-between items-end">
                              <div>
                                 <p className="text-sm text-gray-500 font-[600]">
                                    {/* {visaApplyResponse?.createdAt.slice(0, 10)} */}
                                 </p>
                                 <div className="flex gap-2 items-center">
                                    <p className="text-[16px] font-[650]">
                                       {priceConversion(
                                          visaApplyResponse?.totalAmount,
                                          selectedCurrency,
                                          true
                                       )}
                                    </p>
                                    <span className="text-xs bg-[#cbedfd] px-2 rounded text-lightblue py-[2px]">
                                       Success
                                    </span>
                                 </div>
                              </div>
                              <div>
                                 <p className="text-sm font-[400] text-darktext">
                                    {visaApplyResponse?.referenceNumber}
                                 </p>
                              </div>
                           </div>
                           <div className="bg-soft my-2 rounded-[.30rem] p-3">
                              {visaApplyResponse?.travellers?.map(
                                 (item, index) => (
                                    <div key={index}>
                                       <div className="grid grid-cols-12 mt-2">
                                          <div className="grid__first col-span-7">
                                             <p className="text-[14px] font-[600] text-darktext">
                                                {
                                                   visaApplyResponse?.visaType
                                                      ?.visaName
                                                }
                                             </p>
                                             <p className="text-[14px] text-[#12acfd] uppercase">
                                                {visaApplyResponse?.onwardDate.slice(
                                                   0,
                                                   10
                                                )}
                                             </p>
                                          </div>
                                          <div className="grid__first col-span-5 text-right">
                                             <p className="text-[14px] font-[600] text-darktext capitalize">
                                                {
                                                   visaApplyResponse?.visaType
                                                      ?.visa?.country
                                                      ?.countryName
                                                }
                                             </p>
                                             <p className="text-[14px] text-[#12acfd] uppercase">
                                                {visaApplyResponse?.returnDate.slice(
                                                   0,
                                                   10
                                                )}
                                             </p>
                                          </div>
                                       </div>
                                       <div className="grid grid-cols-12 py-3 border-b">
                                          <div className="grid__first col-span-7 flex gap-2">
                                             <div className="">
                                                <p className="text-[13px] text-gray-400 ">
                                                   Name
                                                </p>
                                             </div>
                                          </div>
                                          <div className="grid__first col-span-5 flex justify-end items-end">
                                             <p className="text-[13px] text-gray-400 font-[500]">
                                                {item?.firstName +
                                                   " " +
                                                   item?.lastName}
                                             </p>
                                          </div>
                                          <div className="grid__first col-span-7 flex gap-2">
                                             <div className="">
                                                <p className="text-[13px] text-gray-400 ">
                                                   Contact Number
                                                </p>
                                             </div>
                                          </div>
                                          <div className="grid__first col-span-5 flex justify-end items-end">
                                             <p className="text-[13px] text-gray-400 font-[500]">
                                                {item?.contactNo}
                                             </p>
                                          </div>
                                          <div className="grid__first col-span-7 flex gap-2">
                                             <div className="">
                                                <p className="text-[13px] text-gray-400 ">
                                                   Passport Number
                                                </p>
                                             </div>
                                          </div>
                                          <div className="grid__first col-span-5 flex justify-end items-end">
                                             <p className="text-[13px] text-gray-400 font-[500]">
                                                {item?.passportNo}
                                             </p>
                                          </div>
                                          <div className="grid__first col-span-7 flex gap-2">
                                             <div className="">
                                                <p className="text-[13px] text-gray-400 ">
                                                   Date of Expiry
                                                </p>
                                             </div>
                                          </div>
                                          <div className="grid__first col-span-5 flex justify-end items-end">
                                             <p className="text-[13px] text-gray-400 font-[500]">
                                                {item?.expiryDate?.day +
                                                   " / " +
                                                   item?.expiryDate?.month +
                                                   " / " +
                                                   item?.expiryDate?.year}
                                             </p>
                                          </div>
                                       </div>
                                    </div>
                                 )
                              )}

                              <div className="grid grid-cols-12 py-3 border-b">
                                 <div className="grid__first col-span-7">
                                    <p className="text-[14px] text-gray-400">
                                       Service Charge
                                    </p>
                                    {/* <p className="text-[10px] text-lightblue bg-[#cbedfd] uppercase w-fit px-2 rounded  py-[2px]">
                          null
                        </p> */}
                                 </div>
                                 <div className="grid__first col-span-5 flex justify-end items-end">
                                    <p className="text-[16px] text-gray-400">
                                       {priceConversion(
                                          visaApplyResponse?.visaType
                                             ?.serviceCharge,
                                          selectedCurrency,
                                          true
                                       )}{" "}
                                    </p>
                                 </div>
                              </div>
                              <div className="grid grid-cols-12 py-3 border-b">
                                 <div className="grid__first col-span-7">
                                    <p className="text-[14px] text-gray-400">
                                       Tax Amount
                                    </p>
                                 </div>
                                 <div className="grid__first col-span-5 flex justify-end items-end">
                                    <p className="text-[16px] text-gray-400">
                                       {priceConversion(
                                          visaApplyResponse?.visaType?.tax,
                                          selectedCurrency,
                                          true
                                       )}
                                    </p>
                                 </div>
                              </div>
                              <div className="grid grid-cols-12 py-3">
                                 <div className="grid__first col-span-7">
                                    <p className="text-[16px] font-[650] text-darktext">
                                       Grand Total
                                    </p>
                                 </div>
                                 <div className="grid__first col-span-5 flex justify-end items-end">
                                    <p className="text-[16px] text-darktext">
                                       {priceConversion(
                                          visaApplyResponse?.totalAmount,
                                          selectedCurrency,
                                          true
                                       )}
                                    </p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="second__section mx-auto w-full sm:w-11/12 md:w-9/12 lg:w-6/12">
                     <div className="py-4 flex justify-between">
                        <div className="text-gray-500 text-sm">
                           <p className="">
                              Your visa application is done successfully.
                              Further details are given in your corresponding
                              email
                           </p>
                           <p className="text-[#12acfd]">
                              Download the invoice from here!
                           </p>
                        </div>
                        <div className="">
                           <button className="bg-[#12acfd] rounded-sm shadow-mn px-4 h-10 text-white">
                              Download
                           </button>
                        </div>
                     </div>
                     <div className="flex justify-center py-10">
                        <button
                           className="text-light bg-darktext px-5 h-10 rounded-sm shadow-mn"
                           onClick={() => navigate("/")}
                        >
                           Return Home
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default VisaApplySuccessPage;
