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
                             <div className='grid md:grid-cols-4 sm:grid-cols-2 gap-3'>
                                                {
                                                    [1,2,3,4,5,6,7,8]?.map((ele)=>(
                                                        <div className='bg-white shadow-md  w-full h-[450px]'>
                                                        <div className='w-full h-52 '>
                                                            <div className='w-full  h-full bg-gray-100 animate-pulse'></div>
                                                        </div>
                                                        <div className='p-4'>
                                                            <div className=' flex justify-center'>
                                                                <div>
                                                                <h1 className='text-xl font-extralight text-center w-60 h-3 bg-gray-100 animate-pulse'></h1>
                                                                <div className='pt-2'>
                                                                <h1 className='text-xl font-extralight text-center w-60 h-3 bg-gray-100 animate-pulse'></h1>
                                                                </div>
                                                                </div>
                                                            </div>
                                                            <div className='flex gap-2 pt-2'>
                                                                <div className=''>
                                                                    <h1 className='bg-gray-100 w-20 h-4 p-1 rounded-lg text-white  text-center font-semibold text-sm'></h1>
                                                                </div>
                                                                <div>
                                                                    <h1 className=' bg-gray-100 rounded-lg h-4 w-32 text-white text-center font-semibold text-sm'></h1>
                                                                </div>
                                                            </div>
                                                            <div className='pt-1'>
                                                                <h1 className='text-xs font-light text-gray-300 h-2 animate-pulse bg-gray-100 w-24'></h1>
                                                            </div>
                                                            <div className='pt-2'>
                                                                <h1 className='font-bold text-lg bg-gray-100 w-28 animate-pulse h-2'></h1>
                                                            </div>
                                                            <div className='pt-2'>
                                                                <div className='flex justify-between'>
                                                                    <div>
                                                                    <h1 className='text-xs font-light text-gray-300 animate-pulse bg-gray-100 w-28 h-3'></h1>
                                                                    </div>
                                                                    <div className='flex gap-1'>
                                                                        <h1 className='bg-gray-100 w-20 h-4 animate-pulse'></h1>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    ))
                                                }
                                            
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
