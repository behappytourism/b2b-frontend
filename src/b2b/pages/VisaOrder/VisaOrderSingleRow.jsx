import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import priceConversion from "../../../utils/PriceConversion";

function VisaOrderSingleRow({ item }) {
  const navigate = useNavigate();

  const { selectedCurrency } = useSelector((state) => state.home);
  return (
    <>
      <tr
        className="border-b border-tableBorderColor"
        onClick={() => navigate(`/visa/order/${item?._id}/details`)}
      >
        <td className="px-3 py-5">{item?.referenceNumber} </td>
        <td className="px-3 py-5">{item?.visaType?.visa?.country?.countryName} </td>
        <td className="px-3 py-5">
          {item?.travellers?.map((item) => (
            <p className="capitalize">{`${item?.title} ${item?.firstName} ${item?.lastName}`}</p>
          ))}{" "}
        </td>
        <td className="px-3 py-5">
          {priceConversion(item?.totalAmount, selectedCurrency, true)}{" "}
        </td>
        <td className="px-3 py-5 capitalize">{item?.status} </td>
      </tr>
    </>
  );
}

export default VisaOrderSingleRow;
