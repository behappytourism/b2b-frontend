import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import priceConversion from "../../../../../utils/PriceConversion";
import {
  setAgentMarkup,
  setClientMarkup,
} from "../../../../../redux/slices/markupSlice";
import AgentMarkupModal from "./AgentMarkupModal";
import { FaRegEdit } from "react-icons/fa";

function ActivityListTable({ activity, index }) {
  const dispatch = useDispatch();

  const [markup, setMarkup] = useState(false);

  const { selectedCurrency } = useSelector((state) => state.home);

  const [markupData, setMarkupData] = useState(activity?.subAgentMarkup);

  return (
    <tr>
      <td className="p-3">{index + 1}</td>
      <td className="p-3 max-w-xs">{activity?.name}</td>

      <td className="p-3">
        <span className="flex space-x-2">
          <p className="">
            {markupData && markupData != {}
              ? (markupData?.markupType === "flat" &&
                  priceConversion(
                    markupData?.markup,
                    selectedCurrency,
                    true
                  )) ||
                (markupData?.markupType === "percentage" &&
                  `${markupData?.markup} %`)
              : "N/A"}
          </p>
          <p
            className="underline text-lightblue  text-lg cursor-pointer"
            onClick={() => {
              setMarkup(true);
            }}
          >
            <FaRegEdit />
          </p>
        </span>
      </td>

      {markup && (
        <AgentMarkupModal
          setMarkup={setMarkup}
          setMarkupData={setMarkupData}
          markupData={markupData}
          activity={activity}
        />
      )}
    </tr>
  );
}

export default ActivityListTable;
