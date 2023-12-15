import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import SearchCards from "../../components/Cards/SearchCards";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  setHotelBannerImages,
  setHotelPromotionTwo,
  setHotelPromotionOne,
} from "../../../redux/slices/hotelSlice";
import { Carousel } from "react-responsive-carousel";
import { config } from "../../../constants";
import MobileAppCard from "../../components/Footers/MobileAppCard";

function HotelPage() {
  const navigate = useNavigate();

  const [isHomeDataLoading, setIsHomeDataLoading] = useState(false);
  const [promotionOne, setPromotionOne] = useState([]);
  const [promotionTwo, setPromotionTwo] = useState([]);
  const [hotelBackground, setHotelBackground] = useState([]);
  const [featuredOne, setFeaturedOne] = useState([]);
  // const [featuredTwo, setFeaturedTwo] = useState([]);

  const dispatch = useDispatch();
  const { token, agent } = useSelector((state) => state.agents);

  const getHomeData = async () => {
    try {
      setIsHomeDataLoading(true);
      const response = await axios.get(`/b2b/hotels/home`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setPromotionOne(response?.data?.promotions1);
      setPromotionTwo(response?.data?.promotions2);
      setHotelBackground(response?.data?.hotelBackgroundImages);

      setFeaturedOne([
        ...response?.data?.featuredHotels1,
        ...response?.data?.featuredHotels2,
      ]);
      // setFeaturedTwo(response?.data?.featuredHotels2);

      dispatch(setHotelBannerImages(response?.data?.hotelBackgroundImages));
      dispatch(setHotelPromotionOne(response?.data?.promotions1));
      dispatch(setHotelPromotionTwo(response?.data?.promotions2));
      setIsHomeDataLoading(false);
    } catch (err) {
      console.log(err?.response?.data);
      setIsHomeDataLoading(false);
    }
  };

  useEffect(() => {
    getHomeData();
  }, []);

  // FeaturedOne.............................................
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = Math.ceil(featuredOne.length / 8);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentSlide < totalSlides - 1) {
        setCurrentSlide((prevSlide) => prevSlide + 1);
      } else {
        setCurrentSlide(0);
      }
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [currentSlide, totalSlides]);

  const getVisibleItems = () => {
    const startIndex = currentSlide * 8;
    const endIndex = Math.min(startIndex + 8, featuredOne.length);
    return featuredOne.slice(startIndex, endIndex);
  };

  // Featured Two...........................................
  // const [currentSlideTwo, setCurrentSlideTwo] = useState(0);
  // const totalSlidesTwo = Math.ceil(featuredTwo?.length / 4);

  // const handleSlideChangeTwo = (index) => {
  //   setCurrentSlideTwo(index);
  //   setCurrentSlide(0); // Add this line to reset the first carousel
  // };

  // useEffect(() => {
  //   const timerTwo = setInterval(() => {
  //     if (currentSlideTwo < totalSlidesTwo - 1) {
  //       setCurrentSlideTwo((prevSlide) => prevSlide + 1);
  //     } else {
  //       setCurrentSlideTwo(0);
  //     }
  //   }, 5000);

  //   return () => {
  //     clearInterval(timerTwo);
  //   };
  // }, [currentSlideTwo, totalSlidesTwo]);

  // const getVisibleItemsTwo = () => {
  //   const startIndexTwo = currentSlideTwo * 4;
  //   const endIndexTwo = Math.min(startIndexTwo + 4, featuredTwo.length);
  //   return featuredTwo.slice(startIndexTwo, endIndexTwo);
  // };

  return (
    <div className="min-h-screen">
      <SearchCards
        hotelBackground={hotelBackground}
        promotionOne={promotionOne}
        promotionTwo={promotionTwo}
        isHomeDataLoading={isHomeDataLoading}
        setIsHomeDataLoading={setIsHomeDataLoading}
      />
      <div className="max-w-screen-xl mx-auto">
        <div className="px-2 py-20">
          <div className="flex justify-between items-end">
            <div className="">
              <h2 className="text-blue-600 font-[800] tracking-tight text-4xl pb-1">
                Featured Hotels
              </h2>
              <p className="pb-2 text-sm text-gray-300">
                Our Suggested hotels this Week
              </p>
            </div>
            <div className="flex gap-2 items-center mb-2">
            </div>
          </div>
          <hr />
          <br />
          {!isHomeDataLoading && (
            <div>
              <Carousel
                infiniteLoop
                autoPlay
                showThumbs={false}
                interval={4000}
                showArrows={false}
                stopOnHover
                swipeable={false}
                showIndicators={false}
                showStatus={false}
                selectedItem={currentSlide}
                onChange={handleSlideChange}
              >
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <div
                    key={index}
                    className="grid md:grid-cols-4 grid-cols-2 gap-4"
                  >
                    {getVisibleItems()?.map((item) => (
                      <div
                        key={item?._id}
                        className="bg-white rounded-md shadow-round overflow-hidden h-full flex flex-col justify-between"
                        onClick={() => {
                          navigate({
                            pathname: `/hotel/details/${item?.hotelId}`,
                            search: `?fromDate=${new Date(
                              new Date()?.setDate(new Date().getDate() + 1)
                            )?.toJSON()}&toDate=${new Date(
                              new Date()?.setDate(new Date().getDate() + 3)
                            )?.toJSON()}&rooms=${JSON.stringify([
                              {
                                childrenAges: [],
                                noOfAdults: 2,
                                noOfChildren: 0,
                              },
                            ])}`,
                          });
                        }}
                      >
                        <div>
                          <div className="w-full h-[130px]">
                            <img
                              src={
                                item?.thumbnail?.isRelative
                                  ? config.SERVER_URL + item?.thumbnail?.path
                                  : item?.thumbnail?.path
                              }
                              alt="img"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-2">
                            <div className="flex flex-wrap items-center gap-1 pt-2">
                              <h3 className="text-sm font-[650] text-blue-700 text-start">
                                {item?.hotelName}
                              </h3>
                            </div>
                            <div className="flex justify-between pt-2">
                              <div className="flex items-center">
                                {/* <div className="text-xs text-[#f7a827] flex gap-1">
                                  {item?.starCategory === "apartment" ? (
                                    <p>Apartment</p>
                                  ) : (
                                    <Rating
                                      value={Number(item?.starCategory)}
                                      color="#f7a827"
                                    />
                                  )}
                                </div> */}
                                <div>
                                  <h1 className="text-red-500 font-semibold text-sm">
                                    {item?.tagLine}
                                  </h1>
                                </div>
                              </div>
                            </div>
                            <div className="text-xs text-[#495057] font-[700] flex items-center gap-2 pt-2">
                              {/* <span className="">
                                <p className="text-xs">
                                  <ImLocation2 />
                                </p>
                              </span> */}
                              {/* <span className="">
                                <p className="whitespace-nowrap">
                                  {item?.state?.stateName}
                                </p>
                              </span> */}
                              {/* <span className="">
                                <p className="whitespace-nowrap">
                                  {item?.country?.countryName}
                                </p>
                              </span> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </Carousel>
            </div>
          )}
        </div>
      </div>
      {/* <MobileAppCard /> */}
    </div>
  );
}

export default HotelPage;
