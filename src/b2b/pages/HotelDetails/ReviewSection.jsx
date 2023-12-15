import React from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { useSelector } from "react-redux";
import Rating from "../../components/Rating/Rating";
import { usersPng } from "../../../static/imagesB2B";

function ReviewSection() {
   const { UAE } = useSelector((state) => state.home);
   return (
      <div className="text-darktext">
         <div className="flex justify-between">
            <span>
               <h2 className="text-[20px] font-[700]">Reviews</h2>
               <Rating value={3} color={"#FED049"} />
            </span>
            <span>
               <button className="bg-blue-500 text-[14px] font-[600] uppercase rounded-md text-white p-2">
                  View All
               </button>
            </span>
         </div>
         <div className="grid grid-cols-3 gap-10 mt-5">
            <div className="">
               <div className="flex gap-2 items-center mb-1">
                  <label
                     for="file"
                     className="text-[14px] uppercase font-semibold text-stone-500"
                  >
                     Staff
                  </label>
                  <span className="text-green-600 ">
                     <AiOutlineArrowUp />{" "}
                  </span>
               </div>
               <div>
                  <div className="w-full h-[10px] bg-gray-300/50 rounded-full overflow-hidden">
                     <div className="w-[30%] h-full flex justify-start bg-sky-500"></div>
                  </div>
               </div>
            </div>
            <div className="">
               <div className="flex gap-2 items-center mb-1">
                  <label
                     for="file"
                     className="text-[14px] uppercase font-semibold text-stone-500"
                  >
                     Facilities
                  </label>
                  <span className="text-green-600 ">
                     <AiOutlineArrowUp />{" "}
                  </span>
               </div>
               <div>
                  <div className="w-full h-[10px] bg-gray-300/50 rounded-full overflow-hidden">
                     <div className="w-[30%] h-full flex justify-start bg-sky-500"></div>
                  </div>
               </div>
            </div>
            <div className="">
               <div className="flex gap-2 items-center mb-1">
                  <label
                     for="file"
                     className="text-[14px] uppercase font-semibold text-stone-500"
                  >
                     Cleanliness
                  </label>
                  <span className="text-green-600 ">
                     <AiOutlineArrowUp />{" "}
                  </span>
               </div>
               <div>
                  <div className="w-full h-[10px] bg-gray-300/50 rounded-full overflow-hidden">
                     <div className="w-[30%] h-full flex justify-start bg-sky-500"></div>
                  </div>
               </div>
            </div>
            <div className="">
               <div className="flex gap-2 items-center mb-1">
                  <label
                     for="file"
                     className="text-[14px] uppercase font-semibold text-stone-500"
                  >
                     Comfort
                  </label>
                  <span className="text-green-600 ">
                     <AiOutlineArrowUp />{" "}
                  </span>
               </div>
               <div>
                  <div className="w-full h-[10px] bg-gray-300/50 rounded-full overflow-hidden">
                     <div className="w-[30%] h-full flex justify-start bg-sky-500"></div>
                  </div>
               </div>
            </div>
            <div className="">
               <div className="flex gap-2 items-center mb-1">
                  <label
                     for="file"
                     className="text-[14px] uppercase font-semibold text-stone-500"
                  >
                     Value of money
                  </label>
                  <span className="text-green-600 ">
                     <AiOutlineArrowUp />{" "}
                  </span>
               </div>
               <div>
                  <div className="w-full h-[10px] bg-gray-300/50 rounded-full overflow-hidden">
                     <div className="w-[30%] h-full flex justify-start bg-sky-500"></div>
                  </div>
               </div>
            </div>
            <div className="">
               <div className="flex gap-2 items-center mb-1">
                  <label
                     for="file"
                     className="text-[14px] uppercase font-semibold text-stone-500"
                  >
                     Location
                  </label>
                  <span className="text-green-600 ">
                     <AiOutlineArrowUp />{" "}
                  </span>
               </div>
               <div>
                  <div className="w-full h-[10px] bg-gray-300/50 rounded-full overflow-hidden">
                     <div className="w-[30%] h-full flex justify-start bg-sky-500"></div>
                  </div>
               </div>
            </div>
            <div className="">
               <div className="flex gap-2 items-center mb-1">
                  <label
                     for="file"
                     className="text-[14px] uppercase font-semibold text-stone-500"
                  >
                     Free wifi
                  </label>
                  <span className="text-green-600 ">
                     <AiOutlineArrowUp />{" "}
                  </span>
               </div>
               <div>
                  <div className="w-full h-[10px] bg-gray-300/50 rounded-full overflow-hidden">
                     <div className="w-[30%] h-full flex justify-start bg-sky-500"></div>
                  </div>
               </div>
            </div>
         </div>
         <div className="mt-5 space-y-2">
            <h5 className="text-stone-500 font-semibold">
               {" "}
               Checkout the Reviews of guests
            </h5>
            <div className="grid grid-cols-3 gap-5">
               {[1,2,3].map((item) => (
               <div
                  className="w-full bg-gray-100/50 p-4 rounded-2xl shadow-sm"
                  key={item}
               >
                  <div className="flex gap-3 items-center">
                     <div className="w-12 h-12 overflow-hidden rounded-full bg-white shadow-sm">
                        <img
                           src={usersPng}
                           alt=""
                           className="object-cover w-full min-h-full"
                        />
                     </div>
                     <div className="text-[14px]">
                        <p className=" uppercase">Sam Philipie</p>
                        <span className="flex gap-2 items-center">
                           <img
                              src={UAE?.flag}
                              alt="country"
                              className="w-5 h-5"
                           />
                           <p className="capitalize">United arab emirates</p>
                        </span>
                     </div>
                  </div>
                  <p className=" text-[14px] mt-3 line-clamp-5">
                     “Everything was more than wonderful, me and the children
                     enjoyed a lot. The room is clean and quiet soonI will book
                     again. I give 10/10”
                  </p>
                  <div className="flex justify-end">
                     <button className="border p-2 rounded-md text-stone-500 text-[12px] font-medium cursor-pointer">
                        Read more
                     </button>
                  </div>
               </div>
               ))}
            </div>
         </div>
      </div>
   );
}

export default ReviewSection;
