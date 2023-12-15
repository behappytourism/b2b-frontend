import axios from "../../../axios";
import React, { useEffect, useState } from "react";
import { BsFillFileEarmarkPersonFill } from "react-icons/bs";
import { GrNotes } from "react-icons/gr";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import priceConversion from "../../../utils/PriceConversion";
import formatDate from "../../../utils/formatDate";
import A2aOderPersonal from "./A2aOderPersonal";

function A2AorderIndividualPage() {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [a2aOrderDetail, setA2aOrderDetail] = useState({});
  const [passengerDetail, setPassengerDetail] = useState([]);

  const { token } = useSelector((state) => state.agents);
  const { selectedCurrency } = useSelector((state) => state.home);

  const fetchSingleVisaOrder = async () => {
    try {
      setIsLoading(true);
      if (token) {
        const response = await axios.get(`/b2b/a2a/orders/single/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setIsLoading(false);
        setA2aOrderDetail(response.data || []);
        setPassengerDetail(response?.data?.passengerDetails || []);
      }
    } catch (err) {
      console.log(err);
      throw Error("Cant find Order Detail");
    }
  };

  useEffect(() => {
    fetchSingleVisaOrder();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="px-5 py-10">
        <div className="">
          <div>
            <div className="p-4 grid grid-cols-2 gap-[20px] text-darktext">
              <div>
                <div className="flex items-center gap-[8px] mb-3">
                  <span>
                    <GrNotes />
                  </span>
                  <span className="font-[600] text-[15px] ">A2A Details</span>
                </div>
                <div className="">
                  <span className="block text-[12px] text-grayColor">A2A</span>
                  <span className="block text-[15px]">
                    {`${a2aOrderDetail?.a2aTicket?.airportFromIata} - ${a2aOrderDetail?.a2aTicket?.airportToIata} - ${a2aOrderDetail?.a2aTicket?.airportFromIata}`}
                  </span>
                </div>
                <div className="mt-3">
                  <span className="block text-[12px] text-grayColor">
                    Airport Onward
                  </span>
                  <span className="block text-[15px] capitalize">
                    {a2aOrderDetail?.a2aTicket?.airportFromName}
                  </span>
                </div>
                <div className="mt-3">
                  <span className="block text-[12px] text-grayColor">
                    Airport Return
                  </span>
                  <span className="block text-[15px]">
                    {a2aOrderDetail?.a2aTicket?.airportToName}
                  </span>
                </div>
                <div className="mt-3">
                  <span className="block text-[12px] text-grayColor">
                    Airline
                  </span>
                  <span className="block text-[15px] capitalize">
                    {a2aOrderDetail?.a2aTicket?.airlineOnward +
                      " - " +
                      a2aOrderDetail?.a2aTicket?.airlineReturn}
                  </span>
                  <span className="block text-[13px] capitalize">
                    {a2aOrderDetail?.a2aTicket?.airlineOnwardNo +
                      " - " +
                      a2aOrderDetail?.a2aTicket?.airlineReturnNo}
                  </span>
                </div>
                <div className="mt-3">
                  <span className="block text-[12px] text-grayColor">
                    Onward Date & Time
                  </span>
                  <div className="block text-[15px]">
                    <p className="">
                      {formatDate(a2aOrderDetail?.a2aTicket?.onwardDate)}
                    </p>
                    <p className="text-xs">
                      {a2aOrderDetail?.a2aTicket?.takeOffTimeOnward +
                        " - " +
                        a2aOrderDetail?.a2aTicket?.landingTimeOnward}
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="block text-[12px] text-grayColor">
                    Return Date & Time
                  </span>
                  <div className="block text-[15px]">
                    <p className="">
                      {formatDate(a2aOrderDetail?.a2aTicket?.returnDate)}
                    </p>
                    <p className="text-xs">
                      {a2aOrderDetail?.a2aTicket?.takeOffTimeReturn +
                        " - " +
                        a2aOrderDetail?.a2aTicket?.landingTimeReturn}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-[8px] mb-3">
                  <span>
                    <BsFillFileEarmarkPersonFill />
                  </span>
                  <span className="font-[600] text-[15px]">
                    Enquiry Details
                  </span>
                </div>
                <div className="">
                  <span className="block text-[12px] text-grayColor">
                    Reference Number
                  </span>
                  <span className="block text-[15px]">
                    {a2aOrderDetail?.referenceNumber}
                  </span>
                </div>
                <div className="">
                  <span className="block text-[12px] text-grayColor">
                    Reseller
                  </span>
                  <span className="block text-[15px]">
                    {a2aOrderDetail?.reseller?.name}
                  </span>
                </div>
                <div className="">
                  <span className="block text-[12px] text-grayColor">
                    Reseller Company Name
                  </span>
                  <span className="block text-[15px] capitalize">
                    {a2aOrderDetail?.reseller?.companyName}
                  </span>
                </div>
                <div className="mt-3">
                  <span className="block text-[12px] text-grayColor">
                    Reseller Phone Number
                  </span>
                  <span className="block text-[15px]">
                    {a2aOrderDetail?.reseller?.phoneNumber}
                  </span>
                </div>
                <div className="mt-3">
                  <span className="block text-[12px] text-grayColor">
                    Applied at
                  </span>
                  <span className="block text-[15px]">
                    {a2aOrderDetail?.createdAt?.slice(0, 10)}
                  </span>
                </div>
                <div className="mt-3">
                  <span className="block text-[12px] text-grayColor">
                    Total Amount
                  </span>
                  <span className="text-[15px] flex items-center gap-[10px]">
                    {a2aOrderDetail?.totalAmount}
                  </span>
                </div>
                <div className="mt-3">
                  <span className="block text-[12px] text-grayColor">
                    Status
                  </span>
                  <span className="text-[15px] flex items-center gap-[10px] capitalize">
                    {a2aOrderDetail?.orderStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="overflow-x-auto shadow-[0_0_7px_2px_rgb(56_65_74_/_5%)]">
              <table className="w-full">
                <thead className=" text-gray-400 border-b-2 border-gray-400 text-[14px] text-left">
                  <tr>
                    <th className="font-[500] px-3 py-4">No.</th>
                    <th className="font-[500] px-3 py-4">Name</th>
                    <th className="font-[500] px-3 py-4">Passport</th>
                    <th className="font-[500] px-3 py-4">Phone Number</th>
                    <th className="font-[500] px-3 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-grayColor">
                  {passengerDetail?.map((item, index) => (
                    <A2aOderPersonal
                      key={item?._id}
                      item={item}
                      index={index}
                      passengerDetail={passengerDetail}
                      setPassengerDetail={setPassengerDetail}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default A2AorderIndividualPage;
