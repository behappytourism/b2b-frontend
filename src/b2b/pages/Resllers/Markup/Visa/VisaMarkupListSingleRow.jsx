import React from "react";
import { useState } from "react";
import AgentVisaMarkupModal from "./AgentVisaMarkupModal";
import priceConversion from "../../../../../utils/PriceConversion";
import { useSelector } from "react-redux";

function VisaMarkupListSingleRow({ item }) {
  const [markup, setMarkup] = useState(false);

  const [markupData, setMarkupData] = useState(item?.subAgentMarkup);

  const { selectedCurrency } = useSelector((state) => state.home);

  const renderPrice = (markups) => {
    const markupTypes = markups?.markupType;
    const val = markups?.markup;
    switch (markupTypes) {
      case "flat":
        return val > 0
          ? `${priceConversion(markupData?.markup, selectedCurrency, true)}`
          : "N/A";
      case "percentage":
        return val > 0 ? `${markupData?.markup} %` : "N/A";
      default:
        "N/A";
    }
  };
  return (
    <>
      <tr className="border-b border-tableBorderColor">
        <td className="p-3">{item?.visaName}</td>
        {/* <td className="p-3 capitalize">{item?.visa} </td>
        <td className="p-3">
          {priceConversion(item?.visaPrice, selectedCurrency, true) || "N/A"}{" "}
        </td> */}
        <td className="p-3">
          <span className="flex space-x-2">
            <p className="">{renderPrice(markupData)}</p>
            <p
              className="underline text-lightblue cursor-pointer"
              onClick={() => {
                setMarkup(true);
              }}
            >
              Edit
            </p>
          </span>
        </td>
      </tr>

      {markup && (
        <AgentVisaMarkupModal
          setMarkup={setMarkup}
          setMarkupData={setMarkupData}
          markupData={markupData}
          visa={item}
        />
      )}
    </>
  );
}

export default VisaMarkupListSingleRow;
