import React, { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlineHeart, AiOutlineClose, AiFillHeart } from "react-icons/ai";
import { RxShare2 } from "react-icons/rx";
import PackageSection from "./PackageSection";
import MapSection from "./MapSection";
import FaqSection from "./FaqSection";
import DetailsCard from "./DetailsCard";
import FeatureSection from "./FeatureSection";
import { useDispatch, useSelector } from "react-redux";
import {
  setFavourites,
  stateFavourites,
} from "../../../redux/slices/agentExcursionSlice";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "../../components/Rating/Rating";
import CarousalMobile from "./CarousalMobile";
import ShareModal from "./ShareModal";
import { FaChevronLeft } from "react-icons/fa";
import MetaData from "../../../utils/MetaData";
import Availablity from "./Availablity";

function HeroSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { agentExcursion, favourites } = useSelector(
    (state) => state.agentExcursions
  );

  useEffect(() => {
    dispatch(stateFavourites());
  }, [dispatch]);

  const [viewBookCard, setViewBookCard] = useState(false);
  const [shareModal, setShareModal] = useState(false);

  return (
    <>
      <MetaData
        title={agentExcursion?.title}
        link_title={agentExcursion?.title}
        description={"Get best deals on Travel and Tourism online with us"}
        thumbnail={agentExcursion?.images ? agentExcursion?.images[0] : ""}
      />
      <div className="bg-white rounded-3xl">
        <div className="p-0 lg:p-6">
          <div className="">
            <div className="relative lg:grid lg:grid-cols-12 gap-5 py-2 lg:my-0 lg:py-5">
              <div className="1st lg:col-span-8">
                <div className="bg-light rounded-2xl p-5 mx-2 my-2 lg:my-0 lg:mx-0 text-darktext">
                  <div className="flex justify-between">
                    <div className="space-y-3">
                      {/* tags */}
                      <div className="text-xs text-text   flex space-x-1 items-center">
                        <div className="">
                          <button className="bg-yellow-500  px-2 py-1 text-light rounded-md capitalize">
                            {agentExcursion?.bookingType}
                          </button>
                        </div>
                        <div className="flex space-x-3 items-center">
                          {agentExcursion?.cancellationType ===
                            "freeCancellation" && (
                            <div className="flex space-x-1 items-center">
                              {/* <span className='text-lightblue'><TiTick /></span> */}
                              <span className="text-green-600 text-sm">
                                Free Cancellation{" "}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-1 items-center">
                          <span className="text-light bg-BEColor px-3 py-1 whitespace-nowrap text-center rounded-md capitalize text-xs">
                            {agentExcursion?.category &&
                              agentExcursion?.category?.categoryName}{" "}
                          </span>
                          {agentExcursion?.isOffer === true &&
                            agentExcursion?.offerAmountType === "flat" && (
                              <span className="text-light bg-green-600 w-20 py-1 whitespace-nowrap text-center rounded-md capitalize text-xs">
                                {agentExcursion?.offerAmountType === "flat"
                                  ? `$ ${agentExcursion?.offerAmount} OFF`
                                  : ""}{" "}
                              </span>
                            )}
                          {agentExcursion?.isOffer === true &&
                            agentExcursion?.offerAmountType ===
                              "percentage" && (
                              <span className="text-light bg-green-600 w-20 py-1 whitespace-nowrap text-center rounded-md capitalize text-xs">
                                {agentExcursion?.offerAmountType ===
                                "percentage"
                                  ? `${agentExcursion?.offerAmount} % OFF`
                                  : ""}{" "}
                              </span>
                            )}
                        </div>
                      </div>
                      <div className="text-3xl font-bold ">
                        {agentExcursion?.title} 
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <span className=" text-yellow-500 flex space-x-1 ">
                          <Rating
                            value={agentExcursion?.totalRating}
                            text={agentExcursion?.totalReviews + " Reviews"}
                            color={"#FED049"}
                          />
                        </span>
                        <span className="flex items-center text-blueColor  capitalize">
                          <CiLocationOn /> {agentExcursion?.destination?.name}{" "}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {/* share button */}
                      <button
                        className="h-10 w-10 rounded-full bg-soft border border-green-600 flex justify-center items-center text-2xl text-green-600"
                        onClick={() => setShareModal(!shareModal)}
                      >
                        <RxShare2 />
                      </button>
                      {/* like button */}
                      <button
                        className="h-10 w-10 rounded-full bg-soft text-main border-main border flex justify-center items-center text-2xl"
                        onClick={() => {
                          dispatch(
                            setFavourites({
                              _id: agentExcursion?._id,
                              name: agentExcursion?.title,
                              image: agentExcursion?.images[0],
                              price: agentExcursion?.activities[0]?.adultPrice,
                            })
                          );
                        }}
                      >
                        {!favourites?.find((item) => item?._id === id) ? (
                          <AiOutlineHeart />
                        ) : (
                          <AiFillHeart />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  id="packageSection"
                  className="py-5 px-2  bg-light rounded-2xl "
                >
                  <PackageSection />
                </div>
                <div className="mx-2">
                  <FeatureSection />
                </div>


                <div className="mx-2 lg:mx-0 mt-2 ">
                  <div className="bg-light py-5 px-4 rounded-2xl md:my-4 w-full  lg:mx-0 my-2 lg:my-0 text-darktext">
                    <div className="py-3">
                      <span className="text-xl font-semibold text-blueColor  ">
                        {agentExcursion?.title}{" "}
                        {agentExcursion?.title && "Highlights"}
                      </span>
                    </div>
                    <div className="space-y-6 text-gray-500 mt-3">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: agentExcursion?.highlights,
                        }}
                        className="text-sm lg:text-base"
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="md:my-5 mx-2 lg:mx-0">
                  <>
                    <div
                      id="availability"
                      className="p-5 mb-2 lg:mb-5  bg-BeGray border-2 text-darktext rounded-2xl "
                    >
                      <Availablity />
                    </div>

                    <>
                      <CarousalMobile />
                    </>

                    <div
                      id="mapSection"
                      className="p-5 my-2 lg:my-5 map bg-light rounded-2xl"
                    >
                      <MapSection />
                    </div>

                    {agentExcursion?.sections?.map((item) => (
                      <div
                        className="bg-light py-3 px-4 rounded-2xl md:my-4 w-full my-2"
                        key={item.title}
                      >
                        <div className="py-3">
                          <span className="text-xl text-darktext font-bold tracking-wider">
                            {item?.title}
                          </span>
                        </div>
                        <div className="space-y-6 text-gray-500 mt-3 tracking-wide">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item?.body,
                            }}
                            className=" space-y-2"
                          ></div>
                        </div>
                      </div>
                    ))}

                    <div id="faqSection" className="">
                      <FaqSection />
                    </div>
                  </>
                </div>
              </div>

              <div className="2nd lg:col-span-4 border-l">
                <div
                  className={`lightglass  top-0 bottom-0  left-0 right-0 z-10 ${
                    viewBookCard ? "fixed" : "hidden"
                  }`}
                  onClick={() => setViewBookCard(!viewBookCard)}
                ></div>
                <div
                  className={`${
                    viewBookCard
                      ? "fixed bottom-0 max-h-[93vh] overflow-y-auto left-0 right-0 z-10 bg-white"
                      : "-bottom-full invisible h-0 overflow-hidden"
                  } transition-all duration-500  rounded-t-3xl lg:rounded-none lg:block   lg:visible lg:h-auto  lg:sticky lg:top-[90px]`}
                >
                  <div
                    className="flex lg:hidden justify-end pt-5 lg:pt-0 px-7 text-4xl"
                    onClick={() => setViewBookCard(!viewBookCard)}
                  >
                    <AiOutlineClose />
                  </div>

                  <DetailsCard />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`fixed  ${
            viewBookCard ? "-bottom-full" : "bottom-0"
          } flex transition-all  duration-500 left-0 right-0 lg:hidden space-x-1 px-7 py-7 bg-[rgb(255,255,255,0)] rounded-t-xl z-10`}
        >
          <button
            className="bg-orange-500 w-2/12 flex justify-center items-center rounded-lg text-lg text-light"
            onClick={() => navigate(-1)}
          >
            <FaChevronLeft />
          </button>
          <button
            className="bg-orange-500 w-10/12 py-3 rounded-lg font-semibold tracking-wider shadow-sm text-light"
            onClick={() => setViewBookCard(!viewBookCard)}
          >
            Book Now
          </button>
        </div>
      </div>
      {shareModal && (
        <ShareModal setShareModal={setShareModal} shareModal={shareModal} />
      )}
    </>
  );
}

export default HeroSection;
