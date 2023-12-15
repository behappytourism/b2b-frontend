import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../axios";
import SuspenseLoader from "../../components/Loaders/SuspenseLoader";
import { setAgentAllExcursions } from "../../../redux/slices/agentExcursionSlice";
import SearchHomePage from "./SearchHomePage";
import SearchRecentlyViewedSection from "./SearchRecentlyViewedSection";
const SearchListViewSection = React.lazy(() =>
   import("./SearchListViewSection")
);

function SearchingResultPage() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const params = useParams();

   const [viewCategory, setViewCategory] = useState(false);
   const [category, setCategory] = useState("");

   const [error, setError] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   const { token } = useSelector((state) => state.agents);

   const fetchAgentAllExcursionData = async (args) => {
      try {
         setError("");
         setIsLoading(true);
         const response = await axios.get(
            `/b2b/resellers/client/attraction/all?limit=100&destination=${args.destination}&category=${args.category}`,
            {
               headers: {
                  authorization: `Bearer ${token}`,
               },
            }
         );
         dispatch(setAgentAllExcursions(response.data));
         setIsLoading(false);
      } catch (err) {
         console.log(err);
      }
   };

   let destination = params.slug;
   useEffect(() => {
      fetchAgentAllExcursionData({ destination, category });
   }, [dispatch, destination, category]);

   return (
      <div className=" max-w-screen-xl mx-auto">
         <div className="">
            <div className="">
               <SearchHomePage
                  viewCategory={viewCategory}
                  setViewCategory={setViewCategory}
                  category={category}
                  setCategory={setCategory}
               />
               <div className="">
                  <div className="">
                     <div className="">
                        {isLoading ? (
                           <>
                              <div className="md:grid md:grid-cols-3 gap-2">
                                 {[1, 2, 3, 4, 5, 6].map((item, index) => (
                                    <div
                                       role="status"
                                       className="w-full p-4 border border-gray-200 rounded-2xl shadow animate-pulse md:p-6 "
                                       key={index}
                                    >
                                       <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-2xl ">
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
                                       <div className="h-4 bg-gray-200 rounded-full  w-48 mb-4"></div>
                                       <div className="h-3 bg-gray-200 rounded-full  mb-2.5"></div>
                                       <div className="h-3 bg-gray-200 rounded-full  mb-2.5"></div>
                                       <div className="h-3 bg-gray-200 rounded-full  mb-2.5"></div>
                                       <div className="h-3 bg-gray-200 rounded-full "></div>
                                    </div>
                                 ))}
                              </div>
                           </>
                        ) : (
                           <Suspense
                              fallback={
                                 <div className="">
                                    <SuspenseLoader />
                                 </div>
                              }
                           >
                              <SearchListViewSection />
                           </Suspense>
                        )}
                     </div>
                  </div>
                  <div className="">
                     <SearchRecentlyViewedSection />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default SearchingResultPage;
