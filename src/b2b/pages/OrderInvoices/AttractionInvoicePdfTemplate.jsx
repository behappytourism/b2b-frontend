import React from "react";
import { RiFileTextLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import priceConversion from "../../../../src/utils/PriceConversion";

const AttractionInvoicePdfTemplate = ({ data }) => {
  const { selectedCurrency } = useSelector((state) => state.home);
  console.log("data", data);

  return (
    <div className="p-[30px] pt-[40px] w-[21cm] bg-transparent  h-[29cm] relative mt-4">
      <div className="absolute top-0 left-0 w-[21cm] h-[29cm] bg-[whitesmoke] z-[-1] overflow-hidden">
        <div className="absolute top-[-27.3cm] w-[21cm] h-[40cm] bg-[#DADEF7] transform -rotate-[70deg]">
          {" "}
        </div>
        <div className="absolute top-[-28cm] w-[21cm] h-[40cm] bg-[#C7D4F2] transform -rotate-[75deg]">
          {" "}
        </div>
        <div className="absolute top-[-28.75cm] w-[21cm] h-[40cm] bg-blue-200 transform -rotate-[80deg]">
          {" "}
        </div>
      </div>
      <div className="p-5 flex justify-between">
        <h1 className="text-[50px] font-medium text-[#828185] flex gap-4 items-center">
          Invoice{" "}
          <span className="text-[#616DAB]">
            <RiFileTextLine />{" "}
          </span>
        </h1>
        <div className="bg-white"></div>
      </div>
      <div className="p-10 pt-8 flex justify-around  align-bottom bg-white rounded-[40px] shadow-lg mt-4">
        <div className="text-3 font-normal flex flex-col gap-y-1">
          <p className="text-[16px] mb-2 font-semibold">Invoice To:</p>
          <p className="text-[18px] font-semibold text-[#7F9BD4] capitalize ">
            {data?.name}
          </p>
          <p className="text-[14px] font-normal">{data?.email}</p>
          <p className="text-[14px] font-normal">{data?.phoneNumber}</p>
          <p className="text-[14px] font-normal capitalize">
            {data?.country?.countryName}
          </p>
        </div>
        <div className="text-[12px] font-normal flex flex-col gap-y-1 ">
          <p className="text-[16px] mb-2 font-semibold ">Invoice Details</p>
          <p className="text-[14px] font-normal  pt-1">
            <span>Date: </span>
            <span></span>
          </p>
          <p className="text-[14px] font-normal ">
            <span>Invoice No: {data?.referenceNumber}</span>
            <span></span>
          </p>
        </div>
      </div>
      <div className="pb-5 w-[100%] mt-14">
        <div className="table w-[100%] rounded-xl overflow-hidden shadow-lg">
          <table id="invoice" className="w-[100%] border-collapse ">
            <thead className="text-[16px]">
              <tr className="text-white text-left bg-[#616DAB]">
                <th className="p-2 pl-4  border-solid border-r-[1px]  ">
                  Name
                </th>
                <th className="p-2  border-solid border-r-[1px] ">Amount</th>
              </tr>
            </thead>
            <tbody className="text-[16px]">
              {data?.activites?.map((ele) => (
                <>
                  <tr className="text-center bg-white">
                    <td className="p-2 pl-4 border-solid  border-r-[1px] text-left flex flex-col">
                      {ele?.activity?.name}
                      <span>Adult : {ele?.adultsCount}</span>
                      {ele?.childrenCount > 0 && (
                        <span>Child : {ele?.childrenCount}</span>
                      )}
                      {ele?.infantCount > 0 && (
                        <span>Infant : {data?.activities?.infantCount}</span>
                      )}
                    </td>
                    <td className="p-2 ">
                      <div className="flex flex-col gap-y-1">
                        {ele?.adultTickets?.length > 0 && (
                          <span>
                            Adult : {ele?.adultTickets?.[0]?.cost} AED
                          </span>
                        )}
                        {ele?.childTickets?.length > 0 && (
                          <span>
                            Adult : {ele?.childTickets?.[0]?.cost} AED
                          </span>
                        )}
                        {ele?.infantTickets?.length > 0 && (
                          <span>
                            Adult : {ele?.infantTickets?.[0]?.cost} AED
                          </span>
                        )}
                        <span> Total : {ele?.grandTotal} AED</span>
                      </div>
                    </td>
                  </tr>
                  {ele?.transferType !== "without" && (
                    <tr className="text-center bg-white border-t-[1px]">
                      <td className="p-2 pl-4 border-solid  border-r-[1px] text-left flex flex-col">
                        <span className="capitalize">
                          Transfer Type : {ele?.transferType}
                        </span>
                      </td>
                      <td className="p-2 ">{ele?.amount} AED</td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pt-[20px] flex justify-end w-[100%] text-[16px] ">
          <div className="grand_total w-[340px] bg-white p-4 rounded-md shadow-lg">
            <div className="flex justify-between text-[16px]">
              <p className="text-[#C0BFC7]">Sub-Total</p>
              <p className="w-[40%]  text-right text-[#7F9BD4]">
                {priceConversion(data?.totalAmount, selectedCurrency, true)}{" "}
              </p>
            </div>

            <div className="flex justify-between text-[18px] font-semibold">
              <p className=" text-[#8E8E9C] ">Grand Total</p>
              <p className="w-[40%] text-right text-[#7F9BD4]">
                {priceConversion(data?.totalAmount, selectedCurrency, true)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-2 flex justify-start text-[16px] mt-4">
        <div className=" flex flex-col text-[14px] gap-y-2">
          <div className=" font-semibold mb-2">
            <h4 className="text-[20px]">Terms & Condition</h4>
          </div>
          <p className="">
            By default, Tailwind includes grid-template-column utilities f
          </p>
          <p className="">
            By default, Tailwind includes grid-template-column utilities f
          </p>
        </div>
      </div>
    </div>
  );
};

export default AttractionInvoicePdfTemplate;
