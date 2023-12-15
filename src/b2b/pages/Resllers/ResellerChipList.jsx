import React, { useState } from "react";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios";
import { setResellers } from "../../../redux/slices/resellerSlice";

function ResellerChipList({ item }) {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [error, setError] = useState("");

   const { resellers } = useSelector((state) => state.resellers);
   const { token } = useSelector((state) => state.agents);

   const deleteReseller = async (id) => {
      try {
         console.log(id);
         setError("");
         const response = await axios.delete(`/b2b/resellers/delete/${id}`, {
            headers: {
               authorization: `Bearer ${token}`,
            },
         });
         const result = resellers?.filter((item) => item._id !== id);
         dispatch(setResellers(result));
      } catch (error) {
         setError(
            error?.response?.data?.error || "Something went wrong, Try again"
         );
      }
   };
   return (
      <>
         <div className="mb-2.5 bg-neutral-50 border border-neutral-100 rounded-xl m-4 shadow-sm">
            <div className="p-4">
               <div className="w-full overflow-x-auto">
                  <table className="w-full min-w-max">
                     <tbody>
                        <tr>
                           <td className="pr-4 pb-3">
                              <div className="flex flex-wrap items-center -m-2">
                                 <div className="w-auto p-2"></div>
                                 <div className="w-auto p-2 space-y-2">
                                    <span className="block text-sm font-semibold">
                                       {item?.companyName}
                                    </span>
                                    <span className="text-xs flex gap-4 capitalize text-slate-800">
                                       <span className="bg-gray-200 py-[4px] px-2 rounded-full">
                                          {item?.agentCode}
                                       </span>

                                       <span className="bg-gray-200 py-[4px] px-2 rounded-full">
                                          {item?.designation}
                                       </span>
                                    </span>
                                    <div className="space-y-1 ">
                                       <div className="sm:flex flex-wrap gap-2">
                                          <span className="flex text-xs ">
                                             <p className="text-neutral-400">
                                                Representative Name -
                                             </p>
                                             <p className="font-[500] text-[13px] text-neutral-500">
                                                {item?.name}
                                             </p>
                                          </span>
                                          <span className="flex text-xs ">
                                             <p className="text-neutral-400">
                                                Email -
                                             </p>
                                             <p className="font-[500] text-[13px] text-neutral-500">
                                                {item?.email}
                                             </p>
                                          </span>
                                       </div>
                                       <div className="sm:flex flex-wrap gap-2">
                                          <span className="flex text-xs ">
                                             <p className="text-neutral-400">
                                                Phone Number -
                                             </p>
                                             <p className="font-[500] text-[13px] text-neutral-500">
                                                {item?.phoneNumber}
                                             </p>
                                          </span>
                                          <span className="flex text-xs ">
                                             <p className="text-neutral-400">
                                                Whatsapp Number -
                                             </p>
                                             <p className="font-[500] text-[13px] text-neutral-500">
                                                {item?.whatsappNumber}
                                             </p>
                                          </span>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </td>
                        </tr>
                        <tr>
                           <td className="pr-4">
                              <div className="flex  gap-2 sm:justify-start justify-between items-center">
                                 <button
                                    className="text-green-600 px-4 py-3 font-medium flex gap-1 items-center justify-center w-full sm:w-auto text-xs border hover:border-neutral-200 rounded-lg"
                                    onClick={() =>
                                       navigate(`/reseller/${item?._id}`)
                                    }
                                 >
                                    <span>View</span>
                                    <span className="text-[15px]">
                                       <AiFillEye />
                                    </span>
                                 </button>
                                 <button
                                    className="text-blue-600 px-4 py-3 font-medium flex gap-1 items-center justify-center w-full sm:w-auto text-xs border hover:border-neutral-200 rounded-lg"
                                    onClick={() =>
                                       navigate(
                                          `/reseller/${item?._id}/edit`
                                       )
                                    }
                                 >
                                    <span>Edit</span>
                                    <span className="text-[14px]">
                                       <AiFillEdit />
                                    </span>
                                 </button>
                                 <button
                                    className="text-main px-4 py-3 font-medium flex gap-1 items-center justify-center w-full sm:w-auto text-xs border hover:border-neutral-200 rounded-lg"
                                    onClick={() => deleteReseller(item?._id)}
                                 >
                                    <span>Delete</span>
                                    <span className="text-[14px]">
                                       <AiFillDelete />
                                    </span>
                                 </button>
                              </div>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </>
   );
}

export default ResellerChipList;
