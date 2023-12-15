import React, { useState } from "react";
import {  useSelector } from "react-redux";
import priceConversion from "../../../utils/PriceConversion";

import ClientMarkupModal from "./ClientMarkupModal";
import { FaRegEdit } from "react-icons/fa";

function ActivityListTable({ activity, index }) {

  const [markup, setMarkup] = useState(false);

  const { selectedCurrency } = useSelector((state) => state.home);

  const [markupData, setMarkupData] = useState(activity?.clientMarkup);

  const renderMarkupValue = (data) => {
    const markupValue = data?.markup;
    const markupValueType = data?.markupType;
    switch (markupValueType) {
      case "flat":
        return markupValue > 0
          ? priceConversion(markupData?.markup, selectedCurrency, true)
          : "N/A";
      case "percentage":
        return markupValue > 0 ? `${markupData?.markup} %` : "N/A";
      default:
        return "N/A";
    }
  };

  return (
    <tr>
      <td className="p-3">{index + 1}</td>
      <td className="p-3 max-w-xs">{activity?.name}</td>

      <td className="p-3">
        <span className="flex space-x-2">
          <p className="">
          {renderMarkupValue(markupData)}
          </p>
          <p
            className="underline text-lightblue text-lg cursor-pointer"
            onClick={() => {
              setMarkup(true);
            }}
          >
            <FaRegEdit />
          </p>
        </span>
      </td>
      {markup && (
        <ClientMarkupModal
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
