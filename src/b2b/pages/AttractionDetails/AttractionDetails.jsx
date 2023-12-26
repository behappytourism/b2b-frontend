import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import HeroSection from "./HeroSection";
import ImageSection from "./ImageSection";
import SearchCards from "../../components/Cards/SearchCards";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../axios";
import { setAgentExcursion } from "../../../redux/slices/agentExcursionSlice";

function AttractionDetails() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { id } = useParams();

   const [error, setError] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   const { token } = useSelector((state) => state.agents);

   const fetchData = async (id) => {
      try {
         setError("");
         setIsLoading(true);
         const response = await axios.get(
            `/b2b/resellers/client/attraction/single/${id}`,
            {
               headers: {
                  authorization: `Bearer ${token}`,
               },
            }
         );
         dispatch(setAgentExcursion(response.data));
         setIsLoading(false);
      } catch (err) {
         setError(err?.response?.data?.error);
         console.log(error);
         // navigate("/error");
      }
   };

   useEffect(() => {
      fetchData(id);
   }, [id]);

   return (
      <div className="">
         <div className="">
            {/* <SearchCards /> */}
            <div className=" max-w-screen-xl mx-auto px-5">
               {isLoading ? (
                  <div className=" rounded animate-pulse p-6">
                     <div className="lg:grid lg:grid-cols-12 gap-1">
                        <div className="col-span-3 space-y-3 px-5 ">
                           <div className="hidden lg:block  h-[55vh] space-y-2">
                              <div className="flex w-full md:h-full items-center justify-center mb-4 bg-gray-300 rounded-2xl ">
                                 <svg
                                    className="w-12 h-12 text-gray-200 "
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 640 512"
                                 >
                                    <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                                 </svg>
                              </div>
                           </div>
                        </div>
                        <div className="col-span-9 ">
                           <div className="flex w-full md:h-full items-center justify-center mb-4 bg-gray-300 rounded-2xl ">
                              <svg
                                 className="w-12 h-12 text-gray-200 "
                                 xmlns="http://www.w3.org/2000/svg"
                                 aria-hidden="true"
                                 fill="currentColor"
                                 viewBox="0 0 640 512"
                              >
                                 <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                              </svg>
                           </div>
                        </div>
                     </div>
                     <div className="lg:max-w-screen-xl lg:mx-auto">
                        <div className="">
                           <div className="relative lg:grid lg:grid-cols-12 gap-5 py-2 lg:my-0 lg:py-5">
                              <div className="1st lg:col-span-8 space-y-5">
                                 <div className="bg-gray-200 h-[25vh] mt-5 rounded-2xl p-5 mx-2 my-2 lg:my-0 lg:mx-0 text-darktext">
                                    <div className="h-7 bg-gray-400 rounded-full  w-48 mb-4"></div>
                                    <div className="h-5 bg-gray-400 rounded-full  mb-2.5"></div>
                                    <div className="h-5 bg-gray-400 rounded-full  mb-2.5"></div>
                                    <div className="h-5 bg-gray-400 rounded-full mb-2.5"></div>
                                    <div className="h-5 bg-gray-400 rounded-full "></div>
                                 </div>

                                 <div className="bg-gray-200 h-[25vh] mt-5 rounded-2xl p-5 mx-2 my-2 lg:my-0 lg:mx-0 text-darktext"></div>

                                 <div className="bg-gray-200 h-[25vh] mt-5 rounded-2xl p-5 mx-2 my-2 lg:my-0 lg:mx-0 text-darktext"></div>

                                 <div className="mx-2 lg:mx-0 lg:mt-4 mt-2">
                                    <div className="bg-gray-200 h-[25vh] mt-5  rounded-2xl p-5 mx-2 my-2 lg:my-0 lg:mx-0 text-darktext"></div>
                                 </div>
                                 <div className="md:my-5 mx-2 lg:mx-0 space-y-5">
                                    <>
                                       <div className="bg-gray-200 h-[25vh] mt-5 rounded-2xl p-5 mx-2 my-2 lg:my-0 lg:mx-0 text-darktext"></div>

                                       <div className="bg-gray-200 h-[25vh] mt-5 rounded-2xl p-5 mx-2 my-2 lg:my-0 lg:mx-0 text-darktext"></div>

                                       {[1, 2, 3].map((item) => (
                                          <div className="bg-gray-200 h-[25vh] mt-5 rounded-2xl p-5 mx-2 my-2 lg:my-0 lg:mx-0 text-darktext"></div>
                                       ))}

                                       <div className="bg-gray-200 h-[25vh] mt-5 rounded-2xl p-5 mx-2 my-2 lg:my-0 lg:mx-0 text-darktext"></div>
                                       <div className="bg-gray-200 h-[25vh] mt-5 rounded-2xl p-5 mx-2 my-2 lg:my-0 lg:mx-0 text-darktext"></div>
                                    </>
                                 </div>
                              </div>

                              <div className="2nd lg:col-span-4">
                                 <div className="bg-gray-200 h-[40vh] rounded-2xl p-5 mx-2 my-2 lg:my-0 lg:mx-0 text-darktext">
                                    <div className="h-7 bg-gray-400 rounded-full  w-48 mb-4"></div>
                                    <div className="h-3 bg-gray-400 rounded-full  mb-2.5"></div>
                                    <div className="h-3 bg-gray-400 rounded-full  mb-2.5"></div>
                                    <div className="h-3 bg-gray-400 rounded-full mb-2.5"></div>
                                    <div className="h-3 bg-gray-400 rounded-full "></div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               ) : (
                  <>
                     <ImageSection />
                     <HeroSection />
                  </>
               )}
            </div>
         </div>
      </div>
   );
}

export default AttractionDetails;
