import React, { useEffect, useState } from "react";
import { FiDownload, FiMail } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../../../axios";
import { useDispatch, useSelector } from "react-redux";
import { handleQuotationList, setInitialChangeStatus } from "../../../../redux/slices/quotationListSlice";
import BtnLoader from "../../../components/BtnLoader";
import { config } from "../../../../constants";
import QuotationNavigator from '../../../components/Quotation/Navigator/QuotationNavigator'
import QtnConfirmModal from "./QtnConfirmModal";



function QuotationView() {
  const [quotation, setQuotation] = useState({});
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [isConfirmModal, setIsConfirmModal] = useState(false)
  const [amendmentId, setAmentmentId] = useState('')
  const [allAmentMent, setAllAmentMent] = useState();
  const [status, setStatus] = useState()

  const navigate = useNavigate();
  const location = useLocation();
  const quotationNumber = location?.state;

  const { token } = useSelector((state) => state.agents);
  const {   quotationStatus } = useSelector((state)=> state.qutationList)

  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/b2b/quotations/amendments/${quotationNumber}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setQuotation(res?.data || "");
      dispatch(handleQuotationList(res?.data));
      setAllAmentMent(res?.data?.amendments);
      dispatch(setInitialChangeStatus({status:res?.data?.amendments[0]?.status, amendmentId:res?.data?.confirmedAmendment }))
      setStatus(res?.data?.amendments[0]?.status)
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = async (id) => {
    navigate(`/quotation/list/edit/${id}`);
  };

  const handleQtnConfirm = (Id) => {
    setIsConfirmModal(!isConfirmModal)
    setAmentmentId(Id)
  }

  return (
    <div className="">
      <QuotationNavigator />
      <div className="">
        <h1 className="text-2xl font-bold text-center">
          Quotation Details
        </h1>
        <div className="grid justify-center pt-2 p-2 ">
        {!loading ? (
          <>
            {allAmentMent?.map((ele, index) => {
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-8 w-[400px] md:w-full  lg:max-w-6xl border mb-5 "
                >
                  <div className="flex justify-center md:justify-end gap-1 ">
                    {
                      !quotationStatus?.amendmentId && (
                        <>
                        {
                      index === 0 && (
                    <button 
                    onClick={()=>{
                      handleQtnConfirm(ele?._id)
                    }}
                    type="button" className="text-white bg-cyan-500 rounded p-2 text-[10px] md:text-sm ">
                      Confirm quotation
                    </button>
                      )
                    }
                    {!btnLoading ? (
                      <button
                        onClick={() => handleEdit(ele._id)}
                        className="text-white p-1 text-center text-[10px] md:text-sm  flex items-center bg-blue-500 rounded"
                      >
                        Edit Quotaion
                      </button>
                    ) : (
                      <div>
                        <button className="text-white p-2  text-[10px] md:text-sm text-center bg-blue-500 rounded  ">
                          {" "}
                          <BtnLoader />
                        </button>
                      </div>
                    )}
                        </>
                      )
                    }
                    
                    <button
                      onClick={() =>
                        navigate("/quotation/email", { state: ele })
                      }
                      className="text-white bg-orange-500 rounded p-2  text-[10px] md:text-sm flex items-center"
                    >
                      <FiMail />
                      View Email
                    </button>
                    <a href={config.SERVER_URL + ele?.pdf} target="blank">
                      <button className="text-white bg-green-500 rounded p-2  text-[10px] md:text-sm flex items-center">
                        <FiDownload />
                        Download PDF
                      </button>
                    </a>
                  </div>

                  <div className="mb- pt-5 flex gap-2">
                    <p className="font-bold text-[12px]">Status :</p>
                    {
                      quotationStatus?.amendmentId ? (
                    <p className={`text-green-600 font-bold text-[12px]`}>
                        confirmed
                    </p>
                      ) : (
                        <p className={"text-red-500 font-bold text-[12px] "}>
                        not confirmed
                    </p>
                      )
                    }
                  </div>
                  <div className="mb- pt-5">
                    <p className="font-bold text-[12px]">
                      Quotation Number: {quotation?.quotationNumber}
                    </p>
                  </div>
                  <div className="mb-4">
                    {/* <h2 className="text-xl font-medium mb-2">Amendment {quotation?.totalAmendments}</h2> */}
                  </div>
                  <div className="mb-4">
                    <table>
                      <tbody>
                        <tr>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingTop: "2px",
                              paddingBottom: "2px",
                            }}
                            className="cust-border text-[12px]"
                          >
                            Quotation Number
                          </td>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingLeft: "10px",
                            }}
                            className="cust-border text-[12px]"
                          >
                            :
                          </td>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingLeft: "10px",
                            }}
                            className="cust-border text-[12px]"
                          >
                            {ele?.quotationNumber}
                          </td>
                        </tr>

                        <tr>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingTop: "2px",
                              paddingBottom: "2px",
                            }}
                            className="cust-border text-[12px]"
                          >
                            Total Pax
                          </td>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingLeft: "10px",
                            }}
                            className="cust-border text-[12px]"
                          >
                            :
                          </td>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingLeft: "10px",
                            }}
                            className="cust-border text-[12px]"
                          >
                            Adult {ele?.noOfAdults} &nbsp;&nbsp; Children{" "}
                            {ele?.noOfChildren} &nbsp;&nbsp;
                          </td>
                        </tr>
                        {ele.childrenAges.length ? (
                          <tr>
                            <td
                              style={{
                                paddingRight: "10px",
                                paddingTop: "2px",
                                paddingBottom: "2px",
                              }}
                              className="cust-border text-[12px]"
                            >
                              Children Ages
                            </td>
                            <td
                              style={{
                                paddingRight: "10px",
                                paddingLeft: "10px",
                              }}
                              className="cust-border text-sm pb-3"
                            >
                              :
                            </td>
                            {ele?.childrenAges?.map((age, ind) => {
                              return (
                                <span className=" text-[12px] ">{age},</span>
                              );
                            })}
                          </tr>
                        ) : (
                          ""
                        )}

                        <tr>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingTop: "2px",
                              paddingBottom: "2px",
                            }}
                            className="cust-border text-[12px]"
                          >
                            Package
                          </td>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingLeft: "10px",
                            }}
                            className="cust-border text-[12px]"
                          >
                            :
                          </td>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingLeft: "10px",
                            }}
                            className="cust-border text-[12px]"
                          >
                            {ele?.noOfNights}N / {ele?.noOfNights + 1}D
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingTop: "2px",
                              paddingBottom: "2px",
                            }}
                            className="cust-border text-[12px]"
                          >
                            Package Created At
                          </td>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingLeft: "10px",
                            }}
                            className="cust-border text-[12px]"
                          >
                            :
                          </td>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingLeft: "10px",
                            }}
                            className="cust-border text-[12px]"
                          >
                            {ele?.createdAt.slice(0, 10)}
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingTop: "2px",
                              paddingBottom: "2px",
                            }}
                            className="cust-border text-[12px]"
                          >
                            Check In
                          </td>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingLeft: "10px",
                            }}
                            className="cust-border text-[12px]"
                          >
                            :
                          </td>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingLeft: "10px",
                            }}
                            className="cust-border text-[12px]"
                          >
                            {ele?.checkInDate.slice(0, 10)}
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingTop: "2px",
                              paddingBottom: "2px",
                            }}
                            className="cust-border text-[12px]"
                          >
                            Check Out
                          </td>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingLeft: "10px",
                            }}
                            className="cust-border text-[12px]"
                          >
                            :
                          </td>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingLeft: "10px",
                            }}
                            className="cust-border text-[12px]"
                          >
                            {ele?.checkOutDate.slice(0, 10)}
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingTop: "2px",
                              paddingBottom: "2px",
                            }}
                            className="cust-border text-[12px]"
                          >
                            Arrival Airport
                          </td>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingLeft: "10px",
                            }}
                            className="cust-border text-[12px]"
                          >
                            :
                          </td>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingLeft: "10px",
                            }}
                            className="cust-border text-[12px]"
                          >
                            {ele?.arrivalAirportName}
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingTop: "2px",
                              paddingBottom: "2px",
                            }}
                            className="cust-border text-[12px]"
                          >
                            Departure Airport
                          </td>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingLeft: "10px",
                            }}
                            className="cust-border text-[12px]"
                          >
                            :
                          </td>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingLeft: "10px",
                            }}
                            className="cust-border text-[12px]"
                          >
                            {ele?.departureAirportName}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mb-4">
                    <div>
                      {ele?.hotelQuotation && ele?.isAlreadyBooked !== true ? (
                        <div className="relative overflow-x-auto">
                          {ele?.hotelQuotation?.stays?.map((stay, index) => {
                            return (
                              <div className="mt-6">
                                <h2 className="cust-border mb-2 text-[12px] font-bold">
                                  Stay Option {index + 1}
                                </h2>
                                <table className="w-full text-left">
                                  <thead>
                                    <tr>
                                      <th className=" font-bold text-[12px] border px-[10px] py-[10px] ">
                                        Checkin Date
                                      </th>
                                      <th className="font-bold text-[12px] border px-[10px] py-[10px]">
                                        Checkout Date
                                      </th>
                                      <th className="font-bold text-[12px] border px-[10px] py-[10px]">
                                        Star Category
                                      </th>
                                      <th className="font-bold text-[12px] border px-[10px]">
                                        Name of Hotel
                                      </th>
                                      <th className="font-bold text-[12px] border px-[10px]">
                                        Location
                                      </th>
                                      {ele?.hotelQuotation?.stays?.length > 0 &&
                                        ele?.hotelQuotation?.stays[0]?.roomOccupancyList?.map(
                                          (roomOccupancy, index) => {
                                            return (
                                              <th
                                                key={index}
                                                className="font-medium text-[15px] border px-[10px]"
                                              >
                                                {
                                                  roomOccupancy?.occupancyShortName
                                                }
                                              </th>
                                            );
                                          }
                                        )}
                                    </tr>
                                  </thead>
                                  <tbody className="text-[12px]">
                                    {stay?.hotels?.map(
                                      (item, multiHotelIndex) => {
                                        return (
                                          <tr
                                            key={multiHotelIndex}
                                            className=""
                                          >
                                            <td className="border px-[10px] py-[5px]">
                                              {item?.checkInDate
                                                ? new Date(
                                                    item?.checkInDate
                                                  ).toDateString()
                                                : "N/A"}
                                            </td>
                                            <td className="border px-[10px] py-[5px]">
                                              {item?.checkOutDate
                                                ? new Date(
                                                    item?.checkOutDate
                                                  ).toDateString()
                                                : "N/A"}
                                            </td>
                                            <td className="border px-[10px] py-[5px]">
                                              {item?.starCategory
                                                ? item?.starCategory
                                                : "N/A"}
                                            </td>
                                            <td className="border px-[10px]">
                                              {item?.hotelName || "N/A"}
                                              <br />
                                              {item?.roomOccupancyName && (
                                                <>
                                                  <span className="">
                                                    * {item?.roomOccupancyName}
                                                  </span>
                                                  <br />
                                                </>
                                              )}
                                              {/* <span className="block mt-1">
                                                                        *{" "}
                                                                        {item.isBreakfastIncluded
                                                                            ? "Breakfast Included"
                                                                            : "Room Only"}
                                                                    </span>
                                                                    <span className="block mt-1">
                                                                        *{" "}
                                                                        {item?.isRefundable
                                                                            ? "Refundable"
                                                                            : "Non Refundable"}
                                                                    </span> */}
                                              <span className="block mt-1">
                                                * Room Type :{" "}
                                                {item?.roomTypeName}
                                              </span>
                                              <span className="block mt-1">
                                                * Board Type :{" "}
                                                {item?.boardTypeCode}
                                              </span>
                                              {/* <span>
                                                                      Star Category :    {item?.starCategory
                                                                        ? item?.starCategory
                                                                        : "N/A"}
                                                                    </span> */}
                                            </td>
                                            <td className="border px-[10px]">
                                              {item?.city || "N/A"}
                                            </td>
                                            {multiHotelIndex < 1 &&
                                              stay?.roomOccupancyList?.map(
                                                (roomOccupancy, index) => {
                                                  return (
                                                    <td
                                                      rowSpan={
                                                        stay?.hotels?.length > 0
                                                          ? stay?.hotels?.length
                                                          : 0
                                                      }
                                                      key={index}
                                                      className="border px-[10px]"
                                                    >
                                                      {roomOccupancy?.priceWithTransfer
                                                        ? roomOccupancy?.priceWithTransfer?.toFixed(
                                                            2
                                                          ) +
                                                          " " +
                                                          ele?.quotationCurrency
                                                        : "N/A"}
                                                    </td>
                                                  );
                                                }
                                              )}
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="mt-5 text-[15px]">
                          {ele?.noOfAdults && (
                            <div>
                              Per person Adult price:{" "}
                              {Math.round(ele?.perPersonAdultPrice?.toFixed(2))}{" "}
                              {ele?.quotationCurrency}
                            </div>
                          )}
                          {ele?.noOfChildren ? (
                            <div className="mt-1">
                              Per person Child price:{" "}
                              {Math.round(ele?.perPersonChildPrice?.toFixed(2))}{" "}
                              {ele?.quotationCurrency}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      )}

                      <div>
                        <div>
                          {ele?.excursionQuotation?.excursions?.length ? (
                            <div>
                              <h3 className=" text-[12px] font-bold pt-5">
                                Inclusions
                              </h3>
                            </div>
                          ) : (
                            ""
                          )}
                          <div>
                            {ele?.excursionQuotation?.excursions?.map((exc) => {
                              return (
                                <div>
                                  <ul className="list-disc ml-6 text-[12px]">
                                    {exc?.transferType === "shared" ? (
                                      <>
                                        <li>
                                          {" "}
                                          {exc?.excursionName} - Tickets With
                                          SIC Transfer{" "}
                                        </li>
                                      </>
                                    ) : exc?.transferType === "without" ? (
                                      <>
                                        <li>
                                          {exc.excursionName} - Only Ticket
                                        </li>
                                      </>
                                    ) : exc?.transferType === "private" ? (
                                      <>
                                        <li>
                                          {exc?.excursionName} - Tickets
                                          With PVT Transfer
                                        </li>
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  </ul>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <div>
                        {ele?.transferQuotation?.stayTransfers.length ? (
                          <>
                            {ele?.transferQuotation?.stayTransfers?.map(
                              (tr, idx) => {
                                return (
                                  <div key={idx}>
                                    {tr?.transfers?.map((dt, ind) => {
                                      return (
                                        <div key={ind}>
                                          <ul className="list-disc ml-6 text-xs">
                                            <li>
                                              {dt?.transferFromHubName}{" "}
                                              <span className="text-xs font-semibold">
                                                To
                                              </span>{" "}
                                              {dt?.transferToHubName} - Private
                                              Transfer
                                            </li>
                                          </ul>
                                        </div>
                                      );
                                    })}
                                  </div>
                                );
                              }
                            )}
                          </>
                        ) : null}
                      </div>

                      <div>
                        <div>
                          {ele?.excSupplementQuotation?.excursions?.length ? (
                            <div>
                              <h3 className=" text-[12px] font-bold pt-5">
                                Suppliments
                              </h3>
                            </div>
                          ) : (
                            ""
                          )}
                          <div>
                            {ele?.excSupplementQuotation?.excursions?.map(
                              (exc) => {
                                return (
                                  <div>
                                    <ul className="list-disc ml-6 text-[12px]">
                                      {exc?.transferType === "shared" ? (
                                        <>
                                          <li>
                                            {" "}
                                            {exc?.excursionName} - Tickets With
                                            SIC Transfer -{" "}
                                            {`( Adult - ${exc?.adultPrice} ${
                                              ele?.quotationCurrency
                                            }  ${
                                              ele?.noOfChildren > 0
                                                ? ", Child " +
                                                  exc?.childPrice +
                                                  " " +
                                                  ele?.quotationCurrency
                                                : ""
                                            })`}
                                          </li>
                                        </>
                                      ) : exc?.transferType === "without" ? (
                                        <>
                                          <li>
                                            {exc.excursionName} - Only Ticket -{" "}
                                            {`( Adult - ${exc?.adultPrice} ${
                                              ele?.quotationCurrency
                                            }  ${
                                              ele?.noOfChildren > 0
                                                ? ", Child " +
                                                  exc?.childPrice +
                                                  " " +
                                                  ele?.quotationCurrency
                                                : ""
                                            })`}
                                          </li>
                                        </>
                                      ) : exc?.transferType === "private" ? (
                                        <>
                                          <li>
                                            {exc?.excursionName} - Tickets
                                            With PVT Transfer -{" "}
                                            {`( Adult - ${exc?.adultPrice} ${
                                              ele?.quotationCurrency
                                            }  ${
                                              ele?.noOfChildren > 0
                                                ? ", Child " +
                                                  exc?.childPrice +
                                                  " " +
                                                  ele?.quotationCurrency
                                                : ""
                                            })`}
                                          </li>
                                        </>
                                      ) : (
                                        ""
                                      )}
                                    </ul>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      </div>

                      {ele?.visa ? (
                        <div>
                          <div className="pt-10">
                            <div className="relative overflow-x-auto">
                              <div>
                                <h1 className="text-[12px] font-bold">Visa </h1>
                              </div>
                              <div className="mb-5 text-[12px]">
                                <table>
                                  <tbody>
                                    <tr>
                                      <td
                                        style={{
                                          paddingRight: "10px",
                                          paddingTop: "2px",
                                          paddingBottom: "2px",
                                        }}
                                        className="cust-border"
                                      >
                                        Visa Name
                                      </td>
                                      <td
                                        style={{
                                          paddingRight: "10px",
                                          paddingLeft: "10px",
                                        }}
                                        className="cust-border"
                                      >
                                        :
                                      </td>
                                      <td
                                        style={{
                                          paddingRight: "10px",
                                          paddingLeft: "10px",
                                        }}
                                        className="cust-border"
                                      >
                                        {ele?.visa?.visaId?.visaName}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          paddingRight: "10px",
                                          paddingTop: "2px",
                                          paddingBottom: "2px",
                                        }}
                                        className="cust-border"
                                      >
                                        Validity
                                      </td>
                                      <td
                                        style={{
                                          paddingRight: "10px",
                                          paddingLeft: "10px",
                                        }}
                                        className="cust-border"
                                      >
                                        :
                                      </td>
                                      <td
                                        style={{
                                          paddingRight: "10px",
                                          paddingLeft: "10px",
                                        }}
                                        className="cust-border"
                                      >
                                        {ele?.visa?.visaId?.validity}{" "}
                                        {ele?.visa?.visaId?.validityTimeFormat}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          paddingRight: "10px",
                                          paddingTop: "2px",
                                          paddingBottom: "2px",
                                        }}
                                        className="cust-border"
                                      >
                                        Processing Time
                                      </td>
                                      <td
                                        style={{
                                          paddingRight: "10px",
                                          paddingLeft: "10px",
                                        }}
                                        className="cust-border"
                                      >
                                        :
                                      </td>
                                      <td
                                        style={{
                                          paddingRight: "10px",
                                          paddingLeft: "10px",
                                        }}
                                        className="cust-border"
                                      >
                                        {ele?.visa?.visaId?.processingTime}{" "}
                                        {
                                          ele?.visa?.visaId
                                            ?.processingTimeFormat
                                        }
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          paddingRight: "10px",
                                          paddingTop: "2px",
                                          paddingBottom: "2px",
                                        }}
                                        className="cust-border"
                                      >
                                        Stay Period
                                      </td>
                                      <td
                                        style={{
                                          paddingRight: "10px",
                                          paddingLeft: "10px",
                                        }}
                                        className="cust-border"
                                      >
                                        :
                                      </td>
                                      <td
                                        style={{
                                          paddingRight: "10px",
                                          paddingLeft: "10px",
                                        }}
                                        className="cust-border"
                                      >
                                        {ele?.visa?.visaId?.stayPeriod}{" "}
                                        {ele?.visa?.visaId?.stayPeriodFormat}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <br />
                    <div>
                      <h3 className=" mb-2 text-[12px] font-bold">
                        Terms and Conditions
                      </h3>
                      <ul className="list-disc ml-6 text-[12px]">
                        <li>
                          All the above package cost is quoted in{" "}
                          {ele?.quotationCurrency} per person and is valid till
                          Mon May 01 2023
                        </li>
                        <li>
                          The above rates are subject to change as per hotel's
                          inputs. This could be due to withdrawal of promotional
                          by the Hotel or currency fluctuation or any additional
                          taxes or toll implemented by the Government.
                        </li>
                        <li>
                          Accommodation for Child as stated is as per the child
                          policy of the respective Hotel. Child below 02 Years
                          Is considered as an infant and from 02 years to 12
                          years as a child.
                        </li>
                        <li>
                          Above package rate is subject to availability of rooms
                          and offered inclusions and is subject to change as per
                          availability at the time of booking. Kindly reconfirm
                          with our team before confirming to the client.
                        </li>
                        <li>
                          Cancellation charges are applicable as per the Hotel
                          policy. NRF rates are subject to 100% cancellation
                          charges.
                        </li>
                        <li>
                          All the services included in the package are
                          compulsory and no refund will be given if any of the
                          services are not taken.
                        </li>
                        <li>
                          Tourism Dirham which has been levied by the hotels in
                          Dubai, same has to be paid directly by the guest at
                          the hotel upon check-in.
                        </li>
                        <li>
                          Guest need to carry QR code vaccine certificate &
                          required to provide a negative PCR test result
                          acquired within 48 hours in Dubai only, to enter Grand
                          Mosque/Ferrari world Or any Mall visit at Abu Dhabi.
                        </li>
                        <li>PCR cost Not included in above rates</li>
                        <li>
                          Please Note the Check-In time is 3:00 PM And check out
                          time Is 12:00 PM. Early Check-In or Late Check-Out Is
                          depending upon Hotel room availability and may be
                          subject to an extra charge.
                        </li>
                        <li>
                          Rooms And Rates Are Subject To Availability At The
                          Time Of Booking Confirmation kindly reconfirm before
                          the booking.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="w-full md:p-10 md:h-[450px] max-w-6xl h-[400px] border  bg-white mt-3 rounded animate-pulse">
            <div className="flex justify-end mr-20 pt-10">
              <p className="h-4 w-20 bg-grayColor mt-3 rounded animate-pulse"></p>
            </div>
            <div className="p-10">
              <p className="h-4 w-52 bg-grayColor mt-3 rounded animate-pulse"></p>
              <p className="h-4 w-52 bg-grayColor mt-3 rounded animate-pulse"></p>
              <p className="h-4 w-80 bg-grayColor mt-3 rounded animate-pulse"></p>
            </div>
            <div className="ml-20">
              <p className="h-4 w-52 bg-grayColor mt-3 rounded animate-pulse"></p>
              <p className="h-4 w-80 bg-grayColor mt-3 rounded animate-pulse"></p>
              <p className="h-4 w-96 bg-grayColor mt-3 rounded animate-pulse"></p>
              <p className="h-4 w-96 bg-grayColor mt-3 rounded animate-pulse"></p>
            </div>
            <div className="flex justify-end gap-2 mr-10">
              <p className="h-4 w-20 bg-grayColor mt-3 rounded animate-pulse"></p>
              <p className="h-4 w-20 bg-grayColor mt-3 rounded animate-pulse"></p>
              <p className="h-4 w-20 bg-grayColor mt-3 rounded animate-pulse"></p>
            </div>
          </div>
        )}
        </div>
        {
          isConfirmModal && (
          <div>
            <QtnConfirmModal setIsConfirmModal={setIsConfirmModal} amendmentId={amendmentId} allAmentMent={allAmentMent} />
          </div>
          )
        }
      </div>
    </div>
  );
}

export default QuotationView;
