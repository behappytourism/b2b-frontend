import React, { useEffect, useState } from "react";
import Rating from "../../components/Rating/Rating";

import { previewImage } from "../../../static/imagesB2B";
import map from "../../../static/images/map.jpg";
import AvailabilitySection from "./AvailabilitySection";
import DetailsSection from "./DetailsSection";
import FacilitySection from "./FacilitySection";
import FaqSection from "./FaqSection";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../../../axios";
import ImageModal from "./ImageModal";
import GoogleMapReact from "google-map-react";

import { ImLocation2 } from "react-icons/im";
import { BiCurrentLocation } from "react-icons/bi";
import HotelExpiryModal from "../../components/Hotel/HotelExpiryModal";
import { config } from "../../../constants";
import HotelCard from "../../components/Cards/HotelCard";

const Mark = () => (
  <div className="text-2xl text-red-500">
    <ImLocation2 />
  </div>
);

function HotelDetailIndex() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [hotel, setHotel] = useState({});
  const [rooms, setRooms] = useState([]);
  const [nights, setNights] = useState(0);
  const [numAdult, setNumAdult] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [roomPaxes, setRoomPaxes] = useState([]);
  const [expireTime, setExpireTime] = useState("");
  const [loadError, setLoadError] = useState(false);
  const [enquiryData, setEnquiryData] = useState({
    fromDate: "",
    toDate: "",
  });
  const [timer, setTimer] = useState({
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  });

  const [isExpiryModal, setIsExpiryModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { token } = useSelector((state) => state.agents);

  const fetchHotelDetails = async (id) => {
    try {
      setIsLoading(true);
      setLoadError(false);

      const response = await axios.get(
        `/b2b/hotels/availabilities/single/${id}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      setHotel(response?.data);

      const t = new Date();
      t.setSeconds(response?.data?.expiresIn || 1000);
      setExpireTime(t);
      setIsLoading(false);
    } catch (err) {
      console.log(err?.response?.data);
      setIsLoading(false);
      setLoadError(true);
      setRooms([]);
    }
  };

  const [isAvailabilityLoading, setIsAvailabilityLoading] = useState();
  const [availabilityError, setAvailabilityError] = useState("");

  const fetchHotelAvailability = async (id) => {
    try {
      setAvailabilityError("");
      setIsAvailabilityLoading(true);

      const response = await axios.post(
        `/b2b/hotels/availabilities/single/search`,
        {
          fromDate:
            searchParams.get("fromDate") &&
            searchParams.get("fromDate")?.slice(0, 10),
          toDate:
            searchParams.get("toDate") &&
            searchParams.get("toDate")?.slice(0, 10),
          rooms: searchParams.get("rooms")
            ? JSON.parse(searchParams.get("rooms"))
            : [{ noOfAdults: 1, noOfChildren: 0, childrenAges: [] }],
          nationality: searchParams.get("nationality")
            ? searchParams.get("nationality")
            : "",
          hotelId: id,
          priceType: searchParams.get("priceType")
            ? searchParams.get("priceType")
            : "all",
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      setRoomPaxes(response?.data?.roomPaxes);
      setEnquiryData({
        fromDate: response?.data?.fromDate?.slice(0, 10),
        toDate: response?.data?.toDate?.slice(0, 10),
      });
      setRooms(response?.data?.rooms);
      setNights(response?.data?.noOfNights);
      setSearchId(response?.data?.searchId);

      setIsAvailabilityLoading(false);
    } catch (err) {
      setAvailabilityError(err?.response?.data?.error);
      setRooms([]);
      setIsAvailabilityLoading(false);
    }
  };

  useEffect(() => {
    fetchHotelDetails(id);
  }, [id]);

  useEffect(() => {
    fetchHotelAvailability(id);
  }, [id, searchParams]);

  useEffect(() => {
    if (roomPaxes?.length > 0) {
      const val = roomPaxes?.reduce((acc, item) => {
        return acc + item?.noOfAdults;
      }, 0);
      setNumAdult(val);
    }
  }, [roomPaxes]);

  let anchorSelector = 'a[href^="#"]';
  let anchorList = document.querySelectorAll(anchorSelector);
  anchorList.forEach((link) => {
    link.onclick = function (e) {
      e.preventDefault();

      let destination = document.querySelector(this.hash);

      destination.scrollIntoView({
        behavior: "smooth",
      });
    };
  });

  const getTime = (t) => {
    const time = Date.parse(t) - Date.now();
    setTimer({
      day: Math.floor(time / (1000 * 60 * 60 * 24)),
      hour: Math.floor((time / (1000 * 60 * 60)) % 24),
      minute: Math.floor((time / 1000 / 60) % 60),
      second: Math.floor((time / 1000) % 60),
    });
  };

  useEffect(() => {
    let interval;

    if (!isLoading && expireTime) {
      if (Date.parse(expireTime) > Date.now()) {
        setIsExpiryModal(false);
        interval = setInterval(() => getTime(expireTime), 1000);
      } else {
        setIsExpiryModal(true);
      }
    }

    return () => clearInterval(interval);
  });

  return (
    <div className="p-2 max-w-screen-xl mx-auto py-5">
      {!loadError ? (
        <>
          <div className=" rounded py-5 mx-2 my-2 lg:my-0 lg:mx-0 text-darktext ">
            <div className="md:flex justify-between items-end">
              {!isLoading ? (
                <div className="space-y-1">
                  <div className="text-2xl text-blue-600 font-bold ">
                    {hotel?.hotelName}
                  </div>
                  <div className="flex space-x-2">
                    <span className=" flex items-start text-xs space-x-1 ">
                      {hotel?.starCategory === "apartment" ? (
                        <p className="pr-2 font-[700] text-[#FF8400]">
                          Apartment
                        </p>
                      ) : (
                        <Rating value={hotel?.starCategory} color={"#FF8400"} />
                      )}
                    </span>
                    <div className="">
                      <p className="flex gap-1 items-center text-stone-500">
                        <span className="text-sm">
                          <ImLocation2 />
                        </span>
                        <span className="text-xs">
                          {hotel?.city?.cityName +
                            ", " +
                            hotel?.state?.stateName +
                            ", " +
                            hotel?.country?.countryName}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-xs">
                    {!hotel?.hasOwnProperty("landMark") ||
                    hotel?.landMark === "" ? (
                      ""
                    ) : (
                      <span className="flex gap-1 items-center text-darktext underline  capitalize">
                        <BiCurrentLocation /> {hotel?.landMark}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-1 animate-pulse">
                  <div className="bg-gray-300 h-7 w-56 rounded-lg"></div>
                  <div className="bg-gray-200 h-4 w-72 rounded-lg"></div>
                  <div className="bg-gray-100 h-3 w-36 rounded-lg"></div>
                </div>
              )}
              <div className="flex gap-2 items-end">
                <div>
                  <p className="text-[10px] text-gray-300 p-[2px]">
                    Expires in
                  </p>
                  <div className="flex">
                    <div className="h-7 w-14 rounded  shadow flex justify-center items-center  font-[500]">
                      {timer.minute}
                      <span className="text-[10px]">min</span>
                    </div>
                    <div className="h-7 w-14 rounded  shadow flex justify-center items-center  font-[500]">
                      {timer.second}
                      <span className="text-[10px]">sec</span>
                    </div>
                  </div>
                </div>
                <div>
                  <a href="#availability">
                    <button className="text-xs text-white bg-gradient-to-r from-red-600 to-blue-600 rounded shadow-mn h-8 px-2">
                      Reserve Rooms
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          {galleryOpen && !isLoading && hotel?.images?.length > 0 && (
            <ImageModal
              setGalleryOpen={setGalleryOpen}
              images={hotel?.images}
              isLoading={isLoading}
            />
          )}
          <div className="image__section grid grid-cols-12 gap-2 ">
            <div
              onClick={() => setGalleryOpen(true)}
              className="col-span-12 md:col-span-9 grid grid-cols-3 gap-2 "
            >
              <div className=" overflow-hidden w-full row-span-2 h-[41vh]">
                <img
                  src={
                    hotel?.images?.length > 0
                      ? hotel?.images[0]?.isRelative
                        ? config.SERVER_URL + hotel?.images[0]?.path
                        : hotel?.images[0]?.path?.replace(
                            "/original/",
                            "/bigger/"
                          )
                      : previewImage
                  }
                  className="w-full h-full object-cover"
                  alt="bann"
                />
              </div>
              <div className=" overflow-hidden col-span-2 w-full h-[20vh]">
                <img
                  src={
                    hotel?.images?.length > 1
                      ? hotel?.images[1]?.isRelative
                        ? config.SERVER_URL + hotel?.images[1]?.path
                        : hotel?.images[1]?.path?.replace(
                            "/original/",
                            "/bigger/"
                          )
                      : previewImage
                  }
                  className="w-full h-full object-cover"
                  alt="bann"
                />
              </div>
              <div className=" overflow-hidden w-full h-[20vh]">
                <img
                  src={
                    hotel?.images?.length > 1
                      ? hotel?.images[2]?.isRelative
                        ? config.SERVER_URL + hotel?.images[2]?.path
                        : hotel?.images[2]?.path?.replace(
                            "/original/",
                            "/bigger/"
                          )
                      : previewImage
                  }
                  className="w-full h-full object-cover"
                  alt="bann"
                />
              </div>
              <div className=" overflow-hidden w-full h-[20vh]">
                <img
                  src={
                    hotel?.images?.length > 2
                      ? hotel?.images[3]?.isRelative
                        ? config.SERVER_URL + hotel?.images[3]?.path
                        : hotel?.images[3]?.path?.replace(
                            "/original/",
                            "/bigger/"
                          )
                      : previewImage
                  }
                  className="w-full h-full object-cover"
                  alt="bann"
                />
              </div>
            </div>
            <div className="hidden md:block md:col-span-3 w-full ">
              <div className=" overflow-hidden w-full h-[41vh] ">
                {hotel?.geoCode?.latitude &&
                hotel?.geoCode?.longitude &&
                !isNaN(hotel?.geoCode?.longitude) &&
                !isNaN(hotel?.geoCode?.latitude) ? (
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "AIzaSyA6qMfsMovR4sRbC8bu6zMNMH3brgzxwW4",
                    }}
                    defaultCenter={{
                      lat:
                        hotel?.geoCode?.latitude &&
                        Number(hotel?.geoCode?.latitude),
                      lng:
                        hotel?.geoCode?.longitude &&
                        Number(hotel?.geoCode?.longitude),
                    }}
                    defaultZoom={14}
                  >
                    <Mark
                      lat={
                        hotel?.geoCode?.latitude &&
                        Number(hotel?.geoCode?.latitude)
                      }
                      lng={
                        hotel?.geoCode?.longitude &&
                        Number(hotel?.geoCode?.longitude)
                      }
                    />
                  </GoogleMapReact>
                ) : (
                  <img
                    src={map}
                    className="w-full h-full object-cover"
                    alt="bann"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="Details__section mt-5">
            <DetailsSection
              hotel={hotel}
              isLoading={isLoading}
              enquiryData={enquiryData}
            />
          </div>
          <hr />
          <div id="availability" className="Availability__section">
            <AvailabilitySection
              roomPaxes={roomPaxes}
              hotel={hotel}
              rooms={rooms}
              isLoading={isAvailabilityLoading}
              nights={nights}
              numAdult={numAdult}
              searchId={searchId}
              enquiryData={enquiryData}
            />
          </div>

          <div className="facility__section mt-5">
            <FacilitySection hotel={hotel} />
          </div>

          <div className="faq__section mt-5">
            <FaqSection hotel={hotel} />
          </div>
        </>
      ) : loadError ? (
        <div className="p-2 lg:py-6">
          <div className="bg-white shadow-sm p-6 rounded-xl">
            <p className="text-lg text-center font-[600]">
              Sorry there is no data on this query.
            </p>
            <p className=" text-center">Please check the availability again</p>
            <div className="flex justify-center py-5">
              <HotelCard />
            </div>
            <div className="pt-10 text-center space-y-3">
              <p className="text-center text-sm text-gray-400">
                You can return to availablity checking page and retry with the
                enquiry
              </p>
              <button
                onClick={() => navigate("/")}
                className="text-white px-10 py-2 bg-blue-400 rounded "
              >
                Return Back
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {isExpiryModal ? (
        <HotelExpiryModal
          hotel={hotel}
          enquiryData={enquiryData}
          roomPaxes={roomPaxes}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default HotelDetailIndex;
