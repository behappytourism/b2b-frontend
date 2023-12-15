import React from "react";
import {
  MdOutlineArrowDownward,
  MdOutlineArrowUpward,
} from "react-icons/md";
import { BsExclamationLg } from "react-icons/bs";
import { useSelector } from "react-redux";
import priceConversion from "../../../utils/PriceConversion";

function AllTransaction() {
  const { transaction } = useSelector((state) => state.wallet);
  const { selectedCurrency } = useSelector((state) => state.home);


  const convertDateAndTime = (date) => {
    if (date ) {
      const year = new Date(date).getFullYear();
      const month = new Date(date).getMonth()
      const day = new Date(date).getDate()
      const hours = new Date(date).getHours()
      const minutes = new Date(date).getMinutes()
      const seconds = new Date(date).getSeconds()
  
      const formattedDateAndTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      return formattedDateAndTime;
    }
  };
  

  return (
    <table className="w-full text-textColor">
      <thead className=" text-gray-400  border-b-2 border-gray-400 text-[14px] text-left overflow-auto">
        <tr>
          <th className="font-[600] py-4 px-3">Transaction No.</th>
          <th className="font-[600] py-4 px-3">Product</th>
          <th className="font-[600] py-4 px-3">Payment Processor</th>
          <th className="font-[600] py-4 px-3">Date & Time</th>
          <th className="font-[600] py-4 px-3">Description</th>
          <th className="font-[600] py-4 px-3">Debit</th>
          <th className="font-[600] py-4 px-3">Credit</th>
          <th className="font-[600] py-4 px-3">Direct</th>
          <th className="font-[600] py-4 px-3">Closing Balance</th>
          <th className="font-[600] py-4 px-3">Due Amount</th>
          <th className="font-[600] py-4 px-3">Remark</th>
        </tr>
      </thead>
      <tbody className="text-sm text-textColor">
        {transaction?.result?.data?.map((item, index) => (
          <tr className="border-b border-tableBorderColor" key={index}>
            <td className="px-3 py-4 "># {item?.b2bTransactionNo}</td>
            <td className="px-3 py-4 capitalize">{item?.product ? item?.product : "N/A"}</td>
            <td className="px-3 py-4 capitalize">{item?.paymentProcessor}</td>
            <td className="px-3 py-4 capitalize">{convertDateAndTime(item?.dateTime) }</td>
            <td className="px-3 py-4 capitalize">{item?.description ? item?.description : "N/A"}</td>
            <td className="px-3 py-4 capitalize">{item?.debitAmount?.toFixed(2)} AED</td>
            <td className="px-3 py-4 capitalize">{item?.creditAmount?.toFixed(2)} AED</td>
            <td className="px-3 py-4 capitalize">{item?.directAmount?.toFixed(2)} AED</td>
            <td className="px-3 py-4 capitalize">{item?.closingBalance?.toFixed(2)} AED</td>
            <td className="px-3 py-4 capitalize">{item?.dueAmount?.toFixed(2)} AED</td>
            <td className="px-3 py-4 capitalize">{item?.remark}</td>

            {/* <td className="px-3 py-4 whitespace-nowrap">
              {item?.createdAt?.slice(0, 10)}{" "}
            </td> */}
            {/* <td className="px-3 py-4 ">
              {new Date(item?.createdAt)?.toLocaleTimeString()}
            </td> */}
            {/* <td className="px-3 py-4 flex space-x-1 items-center ">
              {item?.status === "success" ? (
                <span className="text-green-600 bg-green-100 capitalize px-2 py-[1px] shadow-mn">
                  Success
                </span>
              ) : item?.status === "pending" ? (
                <span className="text-orange-400 bg-orange-100 capitalize px-2 py-[1px] shadow-mn">
                  Pending
                </span>
              ) : (
                <span className="text-red-600 bg-red-100 capitalize px-2 py-[1px] shadow-mn">
                  Cancel
                </span>
              )}
            </td> */}
            {/* <td className="px-3 py-4">
              {item?.transactionType === "deposit" ? (
                <p className="capitalize font-semibold flex gap-1 items-center text-green-600">
                  {item?.transactionType}
                  <span className="">
                    <MdOutlineArrowUpward />
                  </span>
                </p>
              ) : item?.transactionType === "deduct" ? (
                <p className="capitalize font-semibold flex gap-1 items-center text-red-600">
                  {item?.transactionType}
                  <span className="">
                    <MdOutlineArrowDownward />
                  </span>
                </p>
              ) : item?.transactionType === "withdraw" ? (
                <p className="capitalize font-semibold flex gap-1 items-center text-red-600">
                  {item?.transactionType}
                  <span className="">
                    <MdOutlineArrowDownward />
                  </span>
                </p>
              ) : item?.transactionType === "refund" ? (
                <p className="capitalize font-semibold flex gap-1 items-center text-green-600">
                  {item?.transactionType}
                  <span className="">
                    <MdOutlineArrowUpward />
                  </span>
                </p>
              ) : item?.transactionType === "markup" ? (
                <p className="capitalize font-semibold flex gap-1 items-center text-green-600">
                  {item?.transactionType}
                  <span className="">
                    <BsExclamationLg />
                  </span>
                </p>
              ) : (
                ""
              )}
            </td> */}
            {/* <td className="px-3 py-4">
              {priceConversion(item?.amount, selectedCurrency, true)}
            </td> */}
            {/* <td className="px-3 py-4">
              <p className="max-w-[300px]">
                {item?.note && item?.note.length > 0 ? item?.note : "N/A"}
              </p>
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AllTransaction;
