import React, { useEffect, useState } from 'react'
import { companyLogo, logoPng } from '../../../../static/imagesB2B'
import { useSelector } from 'react-redux'
import { MdContentCopy } from "react-icons/md";
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { config } from '../../../../constants';


function QuotationEmail() {

  const navigate = useNavigate()

  const { quotationList } = useSelector((state)=> state.qutationList)
  const[isCopied, setIsCopied] = useState(false)

  const location = useLocation()
  const datas  = location?.state


  const copyDocument = ()=>{
    const element = document.getElementById("email-wrapper")
    let range, sel
    if(document.createRange && window.getSelection) {
      range = document.createRange()
      sel = window.getSelection()
      sel.removeAllRanges()
      range.selectNodeContents(element)
      sel.addRange(range)
    }
    document.execCommand("Copy")
    setIsCopied(true)
  }

  useEffect(()=>{
    let timeOut
    if(isCopied){
      timeOut = setTimeout(()=>{
        setIsCopied(false)
      }, 3000)
    }
    return () => clearTimeout(timeOut)
  }, [isCopied])


  return (

    <div className=''>
    <div className='mb-10 lg:mb-0 lg:p-10'>
    <div className='flex justify-end gap-2 mr-3 lg:mr-0 lg:pt-0 pt-4'>
      <button  
      onClick={()=>{navigate("/quotation/view", {state: datas?.quotationNumber})}}
      className='text-[14px] font-[600] text-white bg-blue-500 shadow-sm rounded p-2 h-8  cust-font'>
          Back
      </button>
        <button 
        onClick={copyDocument}
        className='text-[14px] font-[600] text-white bg-blue-500 shadow-sm rounded p-2 h-8 flex cust-font'>
              <MdContentCopy />
          {isCopied ? "Copied" : "Copy"}
        </button>
        {/* <button   className='text-[14px] font-[600] text-white bg-blue-500 shadow-sm rounded p-2 h-8 cust-font'>
          Send Email
      </button> */}
      </div>

       <div className="container mx-auto p-10  text-blue-900 " id='email-wrapper' style={{border:"none"}}>
       <span className="text-[12px] border-none cust-font" style={{border:"none"}}> 
          Dear {datas?.clientName}
        </span>
        <br />
        <br />
        <br />
        <div>
        <span 
        className='text-[13px] font-bold cust-border cust-font' style={{border:"none"}}
          >
            Greetings from {config.TITLE_NAME}!!!!
          <span/>
        </span>
        <br />
        <span className="text-[13px] cust-border cust-font" style={{border:"none"}}>
          Kindly find the below quote for your reference.
        </span>
        </div>
        <br />
      <div className="mb-5 text-[12px] cust-border " style={{border: 'none'}}>
     < table>
            <tbody>
              <tr>
                <td
                  style={{
                    paddingRight: "10px",
                    paddingTop: "2px",
                    paddingBottom: "2px",
                    border:"none"
                  }}
                  className="cust-border border-none cust-font" 
                >
                  Quotation Number
                </td>
                <td
                  style={{
                    paddingRight: "10px",
                    paddingLeft: "10px",
                    border:"none"
                  }}
                  className="cust-border border-none cust-font"
                >
                  :
                </td>
                <td
                  style={{
                    paddingRight: "10px",
                    paddingLeft: "10px",
                  }}
                  className="cust-border cust-font"
                >
                 {datas?.quotationNumber}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    paddingRight: "10px",
                    paddingTop: "2px",
                    paddingBottom: "2px",
                  }}
                  className="cust-border border-none cust-font"
                >
                  Total Pax
                </td>
                <td
                  style={{
                    paddingRight: "10px",
                    paddingLeft: "10px",
                  }}
                  className="cust-border border-none cust-font"
                >
                  :
                </td>
                <td
                  style={{
                    paddingRight: "10px",
                    paddingLeft: "10px",
                  }}
                  className="cust-border border-none cust-font"
                >
                    {datas?.noOfAdults} Adult, {datas?.noOfChildren} Children
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    paddingRight: "10px",
                    paddingTop: "2px",
                    paddingBottom: "2px",
                  }}
                  className="cust-border border-none cust-font"
                >
                  Package
                </td>
                <td
                  style={{
                    paddingRight: "10px",
                    paddingLeft: "10px",
                  }}
                  className="cust-border border-none cust-font"
                >
                  :
                </td>
                <td
                  style={{
                    paddingRight: "10px",
                    paddingLeft: "10px",
                  }}
                  className="cust-border border-none cust-font"
                >
                {datas?.noOfNights}N / {datas?.noOfNights + 1}D
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    paddingRight: "10px",
                    paddingTop: "2px",
                    paddingBottom: "2px",
                  }}
                  className="cust-border border-none cust-font"
                >
                  Check In
                </td>
                <td
                  style={{
                    paddingRight: "10px",
                    paddingLeft: "10px",
                  }}
                  className="cust-border border-none cust-font"
                >
                  :
                </td>
                <td
                  style={{
                    paddingRight: "10px",
                    paddingLeft: "10px",
                  }}
                  className="cust-border border-none cust-font"
                >
                  {datas?.checkInDate?.slice(0, 10)} 
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    paddingRight: "10px",
                    paddingTop: "2px",
                    paddingBottom: "2px",
                  }}
                  className="cust-border border-none cust-font"
                >
                  Check Out
                </td>
                <td
                  style={{
                    paddingRight: "10px",
                    paddingLeft: "10px",
                  }}
                  className="cust-border border-none cust-font"
                >
                  :
                </td>
                <td
                  style={{
                    paddingRight: "10px",
                    paddingLeft: "10px",
                  }}
                  className="cust-border border-none cust-font"
                >
                {datas?.checkOutDate?.slice(0, 10)}

                </td>
              </tr>
              <tr>
                  <td
                    style={{
                      paddingRight: "10px",
                      paddingTop: "2px",
                      paddingBottom: "2px",
                    }}
                    className="cust-border border-none cust-font"
                  >
                  Arrival Airport
                  </td>
                  <td
                    style={{
                      paddingRight: "10px",
                      paddingLeft: "10px",
                    }}
                    className="cust-border border-none cust-font"
                  >
                    :
                  </td>
                  <td
                    style={{
                      paddingRight: "10px",
                      paddingLeft: "10px",
                    }}
                    className="cust-border border-none cust-font"
                  >
                    {datas?.arrivalAirportName}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      paddingRight: "10px",
                      paddingTop: "2px",
                      paddingBottom: "2px",
                    }}
                    className="cust-border border-none cust-font"
                  >
                  Departure Airport
                  </td>
                  <td
                    style={{
                      paddingRight: "10px",
                      paddingLeft: "10px",
                    }}
                    className="cust-border border-none cust-font"
                  >
                    :
                  </td>
                  <td
                    style={{
                      paddingRight: "10px",
                      paddingLeft: "10px",
                    }}
                    className="cust-border border-none cust-font"
                  >
                    {datas?.departureAirportName}
                  </td>
                </tr>
            </tbody>
          </table>
      </div>
        <br />

      <div className="">
       {datas?.hotelQuotation && datas?.isAlreadyBooked !== true ? (
                <div className='relative overflow-x-auto cust-border cust-font'>
                    {datas?.hotelQuotation?.stays?.map((stay, index) => {
                        return (
                            <div className=" cust-border">
                                <h2 className="cust-border mb-2 text-[13px] font-bold border-none cust-font">
                                    Stay Option {index + 1}
                                </h2>
                                <table className="w-full text-left">
                                    <thead>
                                        <tr>
                                            <th className=" text-[12px] font-bold border px-[8px] py-[8px] cust-font">
                                                Checkin Date
                                            </th>
                                            <th className="text-[12px] font-bold border px-[8px] py-[8px] cust-font">
                                                Checkout Date
                                            </th>
                                            <th className="text-[12px] font-bold border px-[8px] py-[8px] cust-font">
                                                Star Category
                                            </th>
                                            <th className="text-[12px] font-bold border px-[8px] py-[8px] cust-font">
                                                Name of Hotel
                                            </th>
                                            <th className="text-[12px] font-bold border px-[8px] py-[8px] cust-font">
                                                Location
                                            </th>
                                            {datas?.hotelQuotation?.stays
                                                ?.length > 0 && 
                                                datas?.hotelQuotation?.stays[0]?.roomOccupancyList?.map(
                                                    (roomOccupancy, index) => {
                                                        return (
                                                            <th
                                                                key={index}
                                                                className="text-[12px] font-bold border px-[8px] cust-font"
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
                                    <tbody className="text-[12px] cust-font">
                                        {stay?.hotels?.map(
                                            (item, multiHotelIndex) => {
                                                return (
                                                    <tr
                                                        key={multiHotelIndex}
                                                        className=""
                                                    >
                                                        <td className="border px-[8px] py-[5px] cust-font">
                                                            {item?.checkInDate
                                                                ? new Date(
                                                                      item?.checkInDate
                                                                  ).toDateString()
                                                                : "N/A"}
                                                        </td>
                                                        <td className="border px-[10px] py-[5px] cust-font">
                                                            {item?.checkOutDate
                                                                ? new Date(
                                                                      item?.checkOutDate
                                                                  ).toDateString()
                                                                : "N/A"}
                                                        </td>
                                                        <td className="border px-[10px] py-[5px] cust-font">
                                                            {item?.starCategory
                                                                ? item?.starCategory
                                                                : "N/A"}
                                                        </td>
                                                        <td className="border px-[10px] cust-font">
                                                            {item?.hotelName ||
                                                                "N/A"}
                                                            <br />
                                                            {item?.roomOccupancyName && (
                                                                <>
                                                                    <span className="">
                                                                        *{" "}
                                                                        {
                                                                            item?.roomOccupancyName
                                                                        }
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
                                                            <span className="block mt-1 cust-border cust-font">
                                                                *{" "} Room Type : {item?.roomTypeName}
                                                            </span>
                                                            <span className="block mt-1 cust-border cust-font">
                                                                *{" "} Board Type : {item?.boardTypeCode}
                                                            </span>
                                                        </td>
                                                        <td className="border px-[10px] cust-font">
                                                            {item?.city ||
                                                                "N/A"}
                                                        </td>
                                                        {multiHotelIndex < 1 &&
                                                            stay?.roomOccupancyList?.map(
                                                                (
                                                                    roomOccupancy,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <td
                                                                            rowSpan={
                                                                                stay
                                                                                    ?.hotels
                                                                                    ?.length >
                                                                                0
                                                                                    ? stay
                                                                                          ?.hotels
                                                                                          ?.length
                                                                                    : 0
                                                                            }
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="border px-[10px] cust-font"
                                                                        >
                                                                            {roomOccupancy?.priceWithTransfer
                                                                                ? Math.round( roomOccupancy?.priceWithTransfer?.toFixed(2)) +
                                                                                  " " +
                                                                                  datas?.quotationCurrency 
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
                <div className=" text-[12px] cust-border cust-font">
                    {datas?.noOfAdults && (
                        <div className='cust-border cust-font'>
                            Per person Adult price:{" "}
                            { Math.round(datas?.perPersonAdultPrice?.toFixed(2))}{" "}
                            {datas?.quotationCurrency}
                        </div>
                    )}
                    {datas?.noOfChildren ? (
                        <div className="mt-1 cust-border cust-font text-[12px]">
                            Per person Child price:{" "}
                            {Math.round(datas?.perPersonChildPrice?.toFixed(2))}{" "}
                            {datas?.quotationCurrency}
                        </div>
                    ): ""}
                </div>
            )}
      </div>
        <br />


<div className='cust-border cust-font'>
  <div className='cust-border'>
    {datas?.excursionQuotation?.excursions?.length ? (
      <div className='cust-border'>
        <h3 className="text-[13px] font-bold pt-5 cust-border cust-font">Inclusions</h3>
      </div>
    ) : null}
    <div className='cust-border'>
      {datas?.excursionQuotation?.excursions?.map((exc, index) => {
        return (
          <div key={index} className='cust-border'>
            <ul className="list-disc ml-6 text-[12px] cust-border">
              {exc?.transferType === "shared" ? (
                <li className='text-[12px] cust-border cust-font'> {exc?.excursionName} - Tickets With SIC Transfer </li>
              ) : exc?.transferType === "without" ? (
                <li className='text-[12px] cust-border cust-font'>{exc.excursionName} - Only Ticket</li>
              ) : exc?.transferType === "private" ? (
                <li className='text-[12px] cust-border cust-font'>{exc?.excursionName} - Tickets With PVT Transfer</li>
              ) : null}
            </ul>
          </div>
        );
      })}
    </div>
    <div className='cust-border'>
      {datas?.transferQuotation?.stayTransfers.length ? (
        <>
          {datas?.transferQuotation?.stayTransfers?.map((tr, idx) => {
            return (
              <div key={idx} className='cust-border'>
                {tr?.transfers?.map((dt, ind) => {
                  return (
                    <div key={ind} className='cust-border'>
                      <ul className="list-disc ml-6 text-[12px] cust-border">
                        <li className='cust-border'>
                          {dt?.transferFromHubName} <span className='text-[12px] cust-border font-semibold cust-font'>To</span>  {dt?.transferToHubName} - Private Transfer
                        </li>
                      </ul>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </>
      ) : null}
    </div>
  </div>
</div>

            <div className='cust-border cust-font'>
             <div className='cust-border'>
          {
            datas?.excSupplementQuotation?.excursions?.length ? (
              <div className='cust-border'>

                <h3 className=" text-[13px] font-bold pt-5 cust-border cust-font">Suppliments</h3>
              </div>
            ) : ""
          }
          <div className='cust-border'>
          {
           datas?.excSupplementQuotation?.excursions?.map((exc)=>{
              return (
                <div className='cust-border'>
             <ul className="list-disc ml-6 text-[12px] cust-border">
            {
              exc?.transferType === "shared" ? (
                <>
                <li className='text-[12px] cust-border cust-font'> {exc?.excursionName} - Tickets With SIC Transfer - Adult Price : {exc?.adultPrice}, Children Price : {exc?.childPrice}</li>
                </>
              ) : exc?.transferType === "without" ? (
                <>
                <li  className='text-[12px] cust-border cust-font'>{exc.excursionName} - Only Ticket - Adult Price : {exc?.adultPrice}, Children Price : {exc?.childPrice}</li>
                </>
              ) : exc?.transferType === "private" ? (
                <>
                <li  className='text-[12px] cust-border cust-font'>{exc?.excursionName} - Tickets With PVT Transfer - Adult Price : {exc?.adultPrice}, Children Price : {exc?.childPrice}</li>
                </>
              ) : ""
            }
          </ul> 
            </div>
                  )
                })
              }
          </div>  
          </div> 
        </div>
      <div className='cust-border cust-font'>
      {datas?.visa ? (
                <div className='cust-border'>
                <div className='pt-10 cust-border'>
                
                  <div  className="relative overflow-x-auto cust-border">
                  <div className='cust-border'>
                          <h1 className='cust-border text-[13px] font-bold cust-font'>Visa </h1> 
                        </div>
                        <div className="mb-5 text-[12px] cust-border" style={{marginLeft: "12px"}}>
                    < table>
                      <tbody>
                        <tr>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingTop: "2px",
                              paddingBottom: "2px",
                            }}
                            className="cust-border cust-font text-[12px]"
                          >
                            Visa Name
                          </td>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingLeft: "10px",
                            }}
                            className="cust-border cust-font text-[12px]"
                          >
                            :
                          </td>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingLeft: "10px",
                            }}
                            className="cust-border cust-font text-[12px]"
                          >
                          {datas?.visa?.visaId?.visaName}
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingTop: "2px",
                              paddingBottom: "2px",
                            }}
                            className="cust-border cust-font text-[12px]"
                          >
                            Validity
                          </td>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingLeft: "10px",
                            }}
                            className="cust-border cust-font text-[12px]"
                          >
                            :
                          </td>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingLeft: "10px",
                            }}
                            className="cust-border cust-font text-[12px]"
                          >
                                {datas?.visa?.visaId?.validity} {datas?.visa?.visaId?.validityTimeFormat}
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingTop: "2px",
                              paddingBottom: "2px",
                            }}
                            className="cust-border cust-font text-[12px]"
                          >
                            Processing Time
                          </td>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingLeft: "10px",
                            }}
                            className="cust-border cust-font text-[12px]"
                          >
                            :
                          </td>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingLeft: "10px",
                            }}
                            className="cust-border cust-font text-[12px]"
                          >
                        {datas?.visa?.visaId?.processingTime} {datas?.visa?.visaId?.processingTimeFormat}
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingTop: "2px",
                              paddingBottom: "2px",
                            }}
                            className="cust-border cust-font text-[12px]"
                          >
                          Stay Period
                          </td>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingLeft: "10px",
                            }}
                            className="cust-border cust-font text-[12px]"
                          >
                            :
                          </td>
                          <td
                            style={{
                              paddingRight: "10px",
                              paddingLeft: "10px",
                            }}
                            className="cust-border cust-font text-[12px]"
                          >
                          {datas?.visa?.visaId?.stayPeriod} {datas?.visa?.visaId?.stayPeriodFormat} 
                          </td>
                        </tr>
                    
                      </tbody>
                    </table>
                    </div>
                </div>
        
            </div>
       
           </div>
       ): ""} 
    </div>
    
        <br />
      <div className='cust-border cust-font'>
        <h3 className=" mb-2 text-[13px] font-bold cust-border cust-font">Terms and Conditions</h3>
        <ul className="list-disc ml-6 text-[12px] cust-border cust-font">
          <li className='cust-border cust-font'>All the above package cost is quoted in {datas?.quotationCurrency} per person and is valid till Mon May 01 2023</li>
          <li  className='cust-border cust-font'>The above rates are subject to change as per hotel's inputs. This could be due to withdrawal of promotional by the Hotel or currency fluctuation or any additional taxes or toll implemented by the Government.</li>
          <li  className='cust-border cust-font'>Accommodation for Child as stated is as per the child policy of the respective Hotel. Child below 02 Years Is considered as an infant and from 02 years to 12 years as a child.</li>
          <li  className='cust-border cust-font'>Above package rate is subject to availability of rooms and offered inclusions and is subject to change as per availability at the time of booking. Kindly reconfirm with our team before confirming to the client.</li>
          <li  className='cust-border cust-font'>Cancellation charges are applicable as per the Hotel policy. NRF rates are subject to 100% cancellation charges.</li>
          <li  className='cust-border cust-font'>All the services included in the package are compulsory and no refund will be given if any of the services are not taken.</li>
          <li  className='cust-border cust-font'>Tourism Dirham which has been levied by the hotels in Dubai, same has to be paid directly by the guest at the hotel upon check-in.</li>
          <li  className='cust-border cust-font'>Guest need to carry QR code vaccine certificate & required to provide a negative PCR test result acquired within 48 hours in Dubai only, to enter Grand Mosque/Ferrari world Or any Mall visit at Abu Dhabi.</li>
          <li  className='cust-border cust-font'>PCR cost Not included in above rates</li>
          <li  className='cust-border cust-font'>Please Note the Check-In time is 3:00 PM And check out time Is 12:00 PM. Early Check-In or Late Check-Out Is depending upon Hotel room availability and may be subject to an extra charge.</li>
          <li  className='cust-border cust-font'>Rooms And Rates Are Subject To Availability At The Time Of Booking Confirmation kindly reconfirm before the booking.</li>
        </ul>
      </div>

      <br />
       <div className="cust-border text-xs cust-font">
          <span
            style={{
              fontWeight: 500,
              fontSize: "13px",
              lineHeight: "26px",
            }}
            className="cust-border cust-font"
          >
            {quotationList?.reseller?.name} 
          </span>
          <br />
          <span
            style={{ fontSize: "13px", lineHeight: "26px" }}
            className="cust-border cust-font"
          >
            Email:{" "}
            <span
              style={{
                color: "blue",
                textDecoration: "underline",
              }}
              className="cust-border cust-font"
            >
              {quotationList?.reseller?.email}
            </span>
          </span>
          <br />
          <span
            style={{ marginTop: "20px", lineHeight: "26px" }}
            className="cust-border cust-font"
          >
            Mobile/Whatsapp: {quotationList?.reseller?.phoneNumber || ""} | Tel:{" "}
             Ext.{" "}
          
          </span>
          <br />
          <span className="cust-border cust-font" style={{ lineHeight: "26px" }}>
            Dubai | Ahmedabad | Kenya | Delhi
          </span>
          <br />
          <span className="cust-border cust-font" style={{ lineHeight: "26px" }}>
            Website: www.travellerschoice.ae B2B Agent Login:
            https://app.mytcb2b.com/
          </span>
          <br />
        </div>
      <img width="150" src={companyLogo} alt="" style={{ marginTop: "15px" }} />
    </div>
    </div>
    </div>
  )
}

export default QuotationEmail
