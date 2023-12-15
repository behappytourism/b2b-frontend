import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   setVisaAgentMarkup,
   setVisaClientMarkup,
} from "../../../redux/slices/markupSlice";
import priceConversion from "../../../utils/PriceConversion";
import AgentVisaMarkupModal from "./AgentVisaMarkupModal";
import ClientVisaMarkupModal from "./ClientVisaMarkupModal";

function VisaMarkupChipList({ item }) {
   const dispatch = useDispatch();
   const [markup, setMarkup] = useState({
      agent: false,
      client: false,
   });

   const [markupData, setMarkupData] = useState({
      agent: item?.markupSubAgent,
      client: item?.markupClient,
   });

   const { selectedCurrency } = useSelector((state) => state.home);
   return (
      <>
         <div class="mb-2.5 bg-neutral-50 border border-neutral-100 m-4 shadow-sm rounded-xl">
            <div class="p-4">
               <div class="w-full">
                  <table class="w-full ">
                     <tbody>
                        <tr>
                           <td class=" pb-3">
                              <div class="flex flex-wrap items-center">
                                 <div class="w-auto space-y-2">
                                    <span class="block text-sm font-semibold">
                                       {item?.visaName}
                                    </span>
                                    <span className="flex text-[13px] capitalize py-1 ">
                                       <p className="px-3 bg-gray-200 text-slate-800 rounded-full">
                                          {item?.visa}
                                       </p>
                                    </span>
                                    <div className="sm:flex flex-wrap gap-2">
                                       <span class="block text-xs text-neutral-500">
                                          Default Price -{" "}
                                          {priceConversion(
                                             item?.visaPrice,
                                             selectedCurrency,
                                             true
                                          ) || "N/A"}
                                       </span>

                                       <span class="block text-xs text-neutral-500">
                                          Agent Markup -{" "}
                                          {markupData?.agent &&
                                          markupData?.agent != {}
                                             ? (markupData?.agent
                                                  ?.markupType === "flat" &&
                                                  priceConversion(
                                                     markupData?.agent?.markup,
                                                     selectedCurrency,
                                                     true
                                                  )) ||
                                               (markupData?.agent
                                                  ?.markupType ===
                                                  "percentage" &&
                                                  `${markupData?.agent?.markup} %`)
                                             : "N/A"}
                                       </span>

                                       <span class="block text-xs text-neutral-500">
                                          Client Markup -{" "}
                                          {markupData?.client &&
                                          markupData?.client != {}
                                             ? (markupData?.client
                                                  ?.markupType === "flat" &&
                                                  priceConversion(
                                                     markupData?.client?.markup,
                                                     selectedCurrency,
                                                     true
                                                  )) ||
                                               (markupData?.client
                                                  ?.markupType ===
                                                  "percentage" &&
                                                  `${markupData?.client?.markup} %`)
                                             : "N/A"}
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           </td>
                        </tr>
                        <tr>
                           <td class="pr-4">
                              <div class="flex gap-2 sm:justify-start justify-between items-center">
                                 <button
                                    class="px-4 py-3 font-medium text-xs border hover:border-neutral-200 rounded-lg"
                                    onClick={() => {
                                       setMarkup({
                                          client: false,
                                          agent: true,
                                       });
                                       dispatch(
                                          setVisaAgentMarkup({
                                             _id: item?._id,
                                             name: item?.title,
                                             agentMarkup: markupData?.agent,
                                          })
                                       );
                                    }}
                                 >
                                    Add Agent Markup
                                 </button>
                                 <button
                                    class="px-4 py-3 font-medium text-xs border hover:border-neutral-200 rounded-lg"
                                    onClick={() => {
                                       setMarkup({
                                          client: true,
                                          agent: false,
                                       });
                                       dispatch(
                                          setVisaClientMarkup({
                                             _id: item?._id,
                                             name: item?.title,
                                             clientMarkup: markupData?.client,
                                          })
                                       );
                                    }}
                                 >
                                    Add Client Markup
                                 </button>
                              </div>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
         {markup.client && (
            <ClientVisaMarkupModal
               setMarkup={setMarkup}
               setMarkupData={setMarkupData}
            />
         )}
         {markup.agent && (
            <AgentVisaMarkupModal
               setMarkup={setMarkup}
               setMarkupData={setMarkupData}
            />
         )}
      </>
   );
}

export default VisaMarkupChipList;
