import React from "react";
import { useState } from "react";
import priceConversion from "../../../utils/PriceConversion";
import { useSelector } from "react-redux";
import ClientVisaMarkupModal from "./ClientVisaMarkupModal";

function VisaMarkupListSingleRow({ item }) {
  const [markup, setMarkup] = useState(false);

  const [markupData, setMarkupData] = useState(item?.clientMarkup);

  const { selectedCurrency } = useSelector((state) => state.home);

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
    <>
      <tr className="border-b border-tableBorderColor">
        <td className="p-3">{item?.visaName}</td>

        <td className="p-3">
          <span className="flex space-x-2">
            <p className="">{renderMarkupValue(markupData)}</p>
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
        <ClientVisaMarkupModal
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
