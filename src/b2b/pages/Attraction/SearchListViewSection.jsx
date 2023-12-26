import React from "react";
import {
  AiFillHeart,
  AiOutlineClockCircle,
  AiOutlineHeart,
} from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Rating from "../../components/Rating/Rating";
import { setFavourites } from "../../../redux/slices/agentExcursionSlice";
import priceConversion from "../../../utils/PriceConversion";
import { config } from "../../../constants";

function SearchListViewSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { agentExcursions } = useSelector((state) => state.agentExcursions);
  const { favourites } = useSelector((state) => state.agentExcursions);
  const { selectedCurrency } = useSelector((state) => state.home);

  const saveDatatoLocalStorage = (data) => {
    var array = [];
    array = JSON.parse(localStorage.getItem("recent")) || [];
    const result = array.filter((item) => item?._id !== data?._id);
    console.log(result);
    array = [data, ...result];
    localStorage.setItem("recent", JSON.stringify(array));
  };

  return (
    <div>
      {agentExcursions?.attractions?.data?.length > 0 && (
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-3 ">
          {agentExcursions?.attractions?.data?.length > 0 &&
            agentExcursions?.attractions?.data?.map((item, index) => (
              <div
                key={index}
                className="bg-slate-100 shadow-md  border w-full h-[400px] cursor-pointer mt-2"
                onClick={() => {
                  saveDatatoLocalStorage({
                    _id: item?._id,
                    title: item?.title,
                    image: item?.images[0],
                  });
                  navigate(`/attractions/details/${item?._id}`);
                }}
              >
                <div className="  ">
                  <div className="relative w-full h-52 overflow-hidden ">
                    <img
                      className="w-full h-full object-cover hover:scale-110 transition-all duration-500"
                      src={config.SERVER_URL + item?.images[0]}
                      alt={item?.title}
                    />
                      <div className="absolute top-0  right-0 text-xs text-text  flex gap- items-center">
                    <div className="">
                      <button className="bg-orange-500   px-2 py-1 text-light  capitalize">
                        {item.bookingType}
                      </button>
                    </div>
                    <div className="flex space-x-3 items-center">
                      {item?.cancellationType === "freeCancellation" && (
                        <div className="flex space-x-1 items-center">
                          <span className="text-lightblue">
                            <TiTick />
                          </span>
                          <span className="text-green-600 text-sm">
                            Free Cancellation{" "}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-1 items-center">
                      <span className="text-light bg-red-500 px-2 py-1 whitespace-nowrap text-center capitalize ">
                        {item?.category && item?.category?.categoryName}{" "}
                      </span>
                      {item?.isOffer === true &&
                        item?.offerAmountType === "flat" && (
                          <span className="text-light bg-green-600  py-1 whitespace-nowrap text-center rounded-md capitalize ">
                            {item?.offerAmountType === "flat"
                              ? `$ ${item?.offerAmount} OFF`
                              : ""}{" "}
                          </span>
                        )}
                      {item?.isOffer === true &&
                        item?.offerAmountType === "percentage" && (
                          <span className="text-light bg-green-600  py-1 whitespace-nowrap text-center rounded-md capitalize text-xs">
                            {item?.offerAmountType === "percentage"
                              ? `${item?.offerAmount} % OFF`
                              : ""}{" "}
                          </span>
                        )}
                    </div>
                  </div>
                  </div>
                  <div className="px-3 pt-5 flex justify-between ">
                  <div className=' flex justify-center h-14'>
                      <h1 className='text-lg font-extralight text-center max-w-2xl'>{item?.title}</h1>
                 </div>
                    {/* <div className="flex items-center space-x-1 text-text ">
                      <span
                        className="text-3xl text-main"
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(
                            setFavourites({
                              _id: item._id,
                              name: item?.title,
                              image: item?.images[0],
                              price: item?.activity?.adultPrice,
                            })
                          );
                        }}
                      >
                        {!favourites?.find((fav) => fav?._id === item?._id) ? (
                          <AiOutlineHeart />
                        ) : (
                          <AiFillHeart />
                        )}
                      </span>
                    </div> */}
                  </div>
                
                  <div className="px-3 space-y-2  text-darktext">
                    <div className="flex justify-between items-center">
                      <span className="space-y-1">
                        <div className="text-xs text-text font-light">
                          Starting from
                        </div>
                        {item?.isOffer === true && (
                          <div className="text-xs text-main font-light">
                            <s>
                              {priceConversion(
                                item?.activity?.adultPrice,
                                selectedCurrency,
                                true
                              )}
                            </s>
                          </div>
                        )}
                        <div className="text-xl font-bold text-darktext">
                          {priceConversion(
                            item?.isOffer === true
                              ? item?.isOffer === true &&
                                item?.offerAmountType === "flat"
                                ? Number(item?.activity?.lowPrice) -
                                  Number(item?.offerAmount)
                                : Number(item?.activity?.lowPrice) -
                                  (Number(item?.activity?.lowPrice) *
                                    Number(item?.offerAmount)) /
                                    100
                              : item?.activity?.lowPrice,
                            selectedCurrency,
                            true
                          )}
                        </div>
                        <div className="text-xs text-text font-light">
                          *price varies
                        </div>
                      </span>
                      <span className="space-y-1">
                        {/* <div className="flex justify-end">
                          <Rating
                            value={item?.totalRating}
                            color={"#FED049"}
                          />
                        </div> */}
                        {/* <div className="text-xs text-text flex justify-end">
                          {item?.totalRating?.toFixed(2) + " Rating" + " "} (
                          {item?.totalReviews} reviews)
                        </div> */}
                        <div className="flex space-x-1  items-center">
                          <span className="text-lightblue">
                            {" "}
                            <AiOutlineClockCircle />
                          </span>
                          <span className="text-gray-500 text-sm">
                            Duration{" "}
                            {" " + item?.duration + " " + item?.durationType}
                          </span>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
      <>
        {agentExcursions?.attractions?.data?.length < 1 && (
          <div className="flex justify-center mt-20">
            <div className="bg-semisoft rounded-md p-10 text-xl">
              <h1 className="text-darktext">
                The data you looking for is not available right now!!
              </h1>
              <p className="text-text text-sm underline">
                notify me when it is available*
              </p>
              <input
                className="w-8/12 py-2 rounded-lg mt-2 placeholder:text-bluetrans  text-sm  px-2 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-text"
                type="email"
              />
              <div className="pt-2">
                <button className="text-sm text-light bg-lightblue px-3 py-1 rounded-sm">
                  Notify
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
}

export default SearchListViewSection;
