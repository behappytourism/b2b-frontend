import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoBedOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import priceConversion from "../../../utils/PriceConversion";
import { RxRulerSquare } from "react-icons/rx";
import { previewImage } from "../../../static/imagesB2B";
import { useState } from "react";
import MoreAmenityModal from "./MoreAmenityModal";
import EnquirySection from "./EnquirySection";
import { RxDotFilled } from "react-icons/rx";
import { BtnLoader, DialogBox } from "../../components";
import { Carousel } from "react-responsive-carousel";
import AvailbilityImageModal from "./AvailabilityImageModal";
import { config } from "../../../constants";
import {
  setAlertError,
  setAlertSuccess,
} from "../../../redux/slices/homeSlice";
import axios from "../../../axios";

function AvailabilitySection({
  hotel,
  rooms,
  isLoading,
  nights,
  numAdult,
  searchId,
  roomPaxes,
  enquiryData,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { selectedCurrency } = useSelector((state) => state.home);
  const [moreAmenityOpen, setMoreAmenityOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageArray, setImageArray] = useState([]);

  const [isEnquiryLoading, setIsEnquiryLoading] = useState(false);
  const [error, setError] = useState("");
  const { token } = useSelector((state) => state.agents);

  const submitEnquiry = async (rateKey) => {
    try {
      setError("");
      setIsEnquiryLoading(true);
      await axios.post(
        "/b2b/hotels/requests/new",
        {
          searchId: searchId,
          hotelId: hotel?._id,
          rateKey: rateKey,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      dispatch(
        setAlertSuccess({
          status: true,
          title: "You successfully submitted your enquiry.",
          text: "We have received your request and our team will be contacting you shortly.",
        })
      );
      setIsEnquiryLoading(false);
    } catch (err) {
      setIsEnquiryLoading(false);
      console.log(err);
      setError(err?.response?.data?.error);
      dispatch(
        setAlertError({
          status: true,
          title: "Something Went Worng",
          text: "Some thing went worng. Please resubmit your enquiry",
        })
      );
    }
  };


  return (
    <div className="text-darktext pb-5 ">
      <h2 className="text-[20px] text-blue-600 capitalize font-[700] tracking-wider py-2">
        Availablity
      </h2>
      <div className="Enquiry__section">
        <EnquirySection roomPaxes={roomPaxes} enquiryData={enquiryData} />
      </div>
      {!isLoading ? (
        <div className="">
          <div className="bg-white shadow-round rounded p-5 w-full space-y-4">
            {rooms?.length > 0 ? (
              rooms?.map((item) => {
                return (
                  <section key={item?.roomTypeId} className="md:flex  gap-3">
                    <div className="left__section md:w-[350px] overflow-hidden  p-2 rounded border border-gray-200 border-opacity-20">
                      <div
                        onClick={() => {
                          setIsImageModalOpen(true);
                          setImageArray(item?.roomType?.images || []);
                        }}
                        className="rounded overflow-hidden w-full mb-2"
                      >
                        {item?.roomType?.images &&
                        item?.roomType?.images?.length > 0 ? (
                          <Carousel
                            infiniteLoop
                            autoPlay
                            showThumbs={false}
                            interval={5000}
                            showArrows={false}
                            stopOnHover
                            swipeable={false}
                            showIndicators={false}
                            showStatus={false}
                          >
                            {item?.roomType?.images?.map((image, index) => (
                              <img
                                key={index}
                                src={
                                  image?.isRelative
                                    ? config.SERVER_URL + image?.path
                                    : image?.path?.replace(
                                        "/original/",
                                        "/bigger/"
                                      )
                                }
                                className="w-full aspect-video object-cover"
                                alt="bann"
                              />
                            ))}
                          </Carousel>
                        ) : (
                          <img
                            src={previewImage}
                            className="w-full aspect-video object-cover"
                            alt="bann"
                          />
                        )}
                      </div>
                      <p className="py-1 text-stone-600 font-[600] text-sm mt-4 capitalize">
                        {item?.roomType?.roomName}
                      </p>
                      {item?.roomType?.areaInM2 ? (
                        <div className="shadow-sm rounded-sm  bg-slate-50  py-2 flex justify-center items-center gap-2 mt-2">
                          <span className="p-2 bg-white-100/50 text-sky-400 rounded text-2xl">
                            <RxRulerSquare />
                          </span>
                          <span className="block">
                            <p className="text-gray-300 text-[12px] font-[600]">
                              Size
                            </p>
                            <p className="text-sm">
                              {item?.roomType?.areaInM2} MtrSq{" "}
                            </p>
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="mt-4 space-y-1 px-2">
                        {item?.roomType?.amenities?.slice(0, 5)?.map((data) => (
                          <p className="text-stone-500 text-xs font-[300] capitalize flex items-center gap-1">
                            <span className="text-[15px]">
                              <RxDotFilled />
                            </span>
                            <span className="">{data?.name}</span>
                          </p>
                        ))}
                        {item?.roomType?.amenities?.length > 5 && (
                          <p
                            onClick={() => setMoreAmenityOpen(true)}
                            className="text-[11px] px-2 text-blue-500 flex gap-1 items-center cursor-pointer  "
                          >
                            <span className="underline">View More</span>
                          </p>
                        )}
                        {moreAmenityOpen && (
                          <MoreAmenityModal
                            amenities={item?.roomType?.amenities}
                            setMoreAmenityOpen={setMoreAmenityOpen}
                          />
                        )}
                      </div>
                    </div>

                    <div className="right__section   w-full">
                      <h2 className="text-[17px] text-blue-600 font-[700] mb-1 capitalize">
                        {item?.roomType?.roomName}
                      </h2>
                      {item?.rates?.map((sub, ind) => (
                        <div key={ind} className="w-full pt-1  border-t">
                        <h4 className="text-[14px] flex items-center gap-1 font-[500] text-stone-500 capitalize">
                          {sub?.rateName}
                          {sub?.isApiConnected ? (
                            <span className="text-primaryColor uppercase bg-gray-100 p-[1px] text-[10px] rounded-sm">
                              {" "}
                              Dynamic
                            </span>
                          ) : (
                            <span className="text-green-700 uppercase bg-gray-100 p-[1px] text-[10px] rounded-sm">
                              {" "}
                              Static
                            </span>
                          )}
                        </h4>
                        <div className="sm:grid grid-cols-12 gap-2 justify-between w-full pt-1  ">
                          <div className="space-y-2 py-2  col-span-5">
                            {sub?.selectedRoomOccupancies &&
                              sub?.selectedRoomOccupancies?.map((data) => (
                                <div className="flex justify-start items-center gap-2">
                                  <span className="p-2 bg-blue-100/50 text-sky-400 rounded text-2xl">
                                    <IoBedOutline />
                                  </span>
                                  <span className="block">
                                    <p className="text-gray-300 text-[12px] font-[600]">
                                      Occupancy
                                    </p>
                                    <p className="text-[14px]">{`${data?.count} ${data?.occupancyName}`}</p>
                                  </span>
                                </div>
                              ))}
                            {sub?.rateComments?.length > 0 && (
                              <div className="">
                                <ul className="list-disc ml-5 text-[13px]">
                                  {sub?.rateComments?.map((rc, i) => (
                                    <li key={i} className="text-stone-600">
                                      {rc}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {sub?.addOnsTxt?.length > 0 && (
                              <div className="">
                                <p className="text-[12px] uppercase font-[600] ">Add Ons</p>
                                <ul className="list-disc ml-5 text-[13px]">
                                  {sub?.addOnsTxt?.map((addOntxt, i) => (
                                    <li key={i} className="text-stone-600">
                                      {addOntxt}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {sub?.promotions?.length > 0 && (
                              <div className="">
                                <p className="text-[12px] uppercase font-[600] ">Promotions</p>
                                <ul className="list-disc ml-5 text-[13px]">
                                  {sub?.promotions?.map((app, i) => (
                                    <li key={i} className="text-stone-600">
                                      {app}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                          <div className="third__section col-span-2">
                            {sub?.cancellationType?.length > 0 ? (
                              <DialogBox array={sub?.cancellationPolicies}>
                                <p className="text-[12px]">{sub?.cancellationType}</p>
                              </DialogBox>
                            ) : (
                              <DialogBox array={sub?.cancellationPolicies}>
                                <p className="flex gap-1 items-center">
                                  <span className="text-[12px] ">Cancellation Policy</span>
                                  <span className="">
                                    <AiOutlineInfoCircle />
                                  </span>
                                </p>
                              </DialogBox>
                            )}
                          </div>
                          <div className="fourth__section col-span-3">
                            <div className="flex justify-center items-end ">
                              <div>
                                <p className="text-xs font-[500]">
                                  {`${numAdult} Traveller & ${roomPaxes?.length} Rooms`}
                                </p>
                                <p className="text-[10px] text-center mt-3 bg-darktext text-gray-100 py-1 px-2 rounded-sm ">
                                  Price for {nights} nights
                                </p>
                                {sub.grossPrice === sub?.netPrice ? (
                                  <p className="font-[800] text-gray-400 tracking-wide text-[20px]">
                                    {priceConversion(sub?.netPrice, selectedCurrency, true)}
                                  </p>
                                ) : (
                                  <>
                                    {Number(sub?.grossPrice) > 0 && (
                                      <p className="text-[12px] text-red-500">
                                        <s>
                                          {priceConversion(
                                            sub?.grossPrice,
                                            selectedCurrency,
                                            true
                                          )}
                                        </s>
                                      </p>
                                    )}
                
                                    <p className="font-[800] text-gray-400 tracking-wide text-[20px]">
                                      {priceConversion(sub?.netPrice, selectedCurrency, true)}
                                    </p>
                                  </>
                                )}
                                {/* {sub?.isApiConnected ? (
                              <p className="text-[10px] text-gray-300 text-center">
                                Hotelbeds price
                              </p>
                            ) : (
                              ""
                            )} */}
                              </div>
                            </div>
                          </div>
                          <div className="text-right col-span-2 relative">
                            {sub.availableAllocation < 1 ? (
                              <>
                                <button
                                  disabled={isEnquiryLoading}
                                  onClick={() => {
                                    submitEnquiry(sub.rateKey);
                                  }}
                                  className="py-2 px-3 text-sm font-[600]  rounded text-white bg-blue-600 cursor-pointer disabled:cursor-not-allowed"
                                >
                                  Submit Enquiry
                                </button>
                                <p className="text-[10px] mt-2 text-gray-400">
                                  This room type doesn't have availability. Kindly submit
                                  enquiry.
                                </p>
                              </>
                            ) : (
                              <button
                                onClick={() => {
                                  navigate({
                                    pathname: `/hotel/${params.id}/apply/${item?.roomTypeId}`,
                                    search: `?hotelId=${hotel?._id}&rateKey=${sub?.rateKey}&searchId=${searchId}`,
                                  });
                                }}
                                className="h-8 px-3 text-xs font-[600] uppercase rounded-sm shadow-mn text-white bg-gradient-to-r from-red-600 to-blue-600  cursor-pointer "
                              >
                                Book Now
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      ))}
                    </div>
                  </section>
                );
              })
            ) : (
              <section className="p-5  ">
                <div className="text-center ">
                  <p className="font-demo font-semibold text-lg text-gray-400">
                    Oops..! No Availible rooms right now.
                  </p>
                  <p className="text-xs">Try again with another query</p>
                </div>
              </section>
            )}
          </div>
          {isImageModalOpen && !isLoading && imageArray?.length > 0 && (
            <AvailbilityImageModal
              setIsImageModalOpen={setIsImageModalOpen}
              images={imageArray}
              isLoading={isLoading}
            />
          )}
        </div>
      ) : (
        <div className="animate-pulse rounded-2xl p-5 bg-gray-100 shadow-sm">
          <div className="flex gap-2">
            <div className="max-w-[18%] p-2">
              <div className="">
                <svg
                  className="w-full h-full text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 640 512"
                >
                  <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                </svg>
              </div>
            </div>
            <div className="w-full  ">
              <div className="border-b my-2 py-2">
                <p className="w-36 h-4 bg-gray-400 rounded-full "></p>
              </div>
              <div className="w-full flex gap-10 justify-between">
                <div className="w-full">
                  <ol className="w-full space-y-3">
                    <li className="h-3 w-full rounded bg-gray-300"></li>
                    <li className="h-3 w-full rounded bg-gray-300"></li>
                    <li className="h-3 w-full rounded bg-gray-300"></li>
                    <li className="h-3 w-full rounded bg-gray-300"></li>
                  </ol>
                </div>
                <div className="w-full">
                  <ol className="w-full space-y-3">
                    <li className="h-3 w-full rounded bg-gray-300"></li>
                    <li className="h-3 w-full rounded bg-gray-300"></li>
                    <li className="h-3 w-full rounded bg-gray-300"></li>
                    <li className="h-3 w-full rounded bg-gray-300"></li>
                  </ol>
                </div>
                <div className="w-full">
                  <ol className="w-full space-y-3">
                    <li className="h-3 w-full rounded bg-gray-300"></li>
                    <li className="h-3 w-full rounded bg-gray-300"></li>
                    <li className="h-3 w-full rounded bg-gray-300"></li>
                    <li className="h-3 w-full rounded bg-gray-300"></li>
                  </ol>
                </div>
                <div className="w-full">
                  <ol className="w-full space-y-3">
                    <li className="h-3 w-full rounded bg-gray-300"></li>
                    <li className="h-8 w-20 rounded bg-gray-300"></li>
                    <li className="h-3 w-full rounded bg-gray-300"></li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AvailabilitySection;
