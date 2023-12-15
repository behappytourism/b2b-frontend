import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  setA2aEnquiry,
  setTravellerCount,
} from "../../../redux/slices/a2aSlice";
import formatDate from "../../../utils/formatDate";
import priceConversion from "../../../utils/PriceConversion";
import { IoAirplaneOutline } from "react-icons/io5";
import { config } from "../../../constants";

function BookTicketComponent({ item, index }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedCurrency } = useSelector((state) => state.home);

  const [searchParams, setSearchParams] = useSearchParams();
  const date = searchParams.get("date");

  return (
    <div className="bg-white rounded-xl text-darktext shadow-round mt-4 p-5 space-y-2">
      <div className="  flex flex-wrap justify-between items-center ">
        <div className="h-10 w-10 rounded-sm overflow-hidden">
          <img
            src={config.SERVER_URL + item?.airlineOnwardLogo}
            alt="log"
            className="object-contain w-full h-full"
          />
        </div>
        <p className="font-[800] text-sm text-gray-400">{item?.airlineOnwardNo}</p>
        <p className="text-sm ">{formatDate(item?.onwardDate)}</p>
        <p className=" text-gray-400 flex gap-2 items-center">{item?.airportFromIata} <IoAirplaneOutline />  {item?.airportToIata}</p>
        <p className=" text-sm text-grayColor">{`${item?.takeOffTimeOnward} --- ${item?.landingTimeOnward}`}</p>
      </div>
      <hr />
      <div className="  flex flex-wrap justify-between items-center ">
        <div className="h-10 w-10 rounded-sm overflow-hidden">
          <img
            src={config.SERVER_URL + item?.airlineReturnLogo}
            alt="log"
            className="object-contain w-full h-full"
          />
        </div>
        <p className="font-[800] text-sm text-gray-400">{item?.airlineReturnNo}</p>
        <p className="text-sm">{formatDate(item?.returnDate)}</p>
        <p className=" text-gray-400 flex gap-2 items-center">{item?.airportToIata} <IoAirplaneOutline /> {item?.airportFromIata}</p>
        <p className="  text-sm text-grayColor">{`${item?.takeOffTimeReturn} --- ${item?.landingTimeReturn}`}</p>
      </div>
      <hr />
      <div className="  flex flex-wrap justify-between items-center">
        {Number(item?.availableSeats) > 0 ? (
          <p className="text-xs text-gray-300 ">
            {`${item?.availableSeats} Seats available`}
          </p>
        ) : (
          <p className="text-xs text-red-500 font-[600] ">Sold Out</p>
        )}
        <div className="text-center">
          <p className="text-[12px] ">Travellers</p>
          <div className="flex justify-center items-center">
            <p
              className="w-5 h-5 rounded-full bg-blue-500 text-white flex justify-center items-center cursor-pointer"
              onClick={() => {
                item?.traveller <= 1
                  ? dispatch(
                      setTravellerCount({
                        index: index,
                        name: "traveller",
                        value: 1,
                      })
                    )
                  : dispatch(
                      setTravellerCount({
                        index: index,
                        name: "traveller",
                        value: Number(item?.traveller) - 1,
                      })
                    );
              }}
            >
              -
            </p>
            <p className="">
              <input
                type="number"
                className="outline-none text-sm text-center w-14 no-spinner"
                // min={1}
                name="traveller"
                value={item?.traveller}
                onChange={(e) => {
                  e.target.value < 0
                    ? dispatch(
                        setTravellerCount({
                          index: index,
                          name: "traveller",
                          value: 1,
                        })
                      )
                    : e.target.value >= item?.availableSeats
                    ? dispatch(
                        setTravellerCount({
                          index: index,
                          name: "traveller",
                          value: Number(item?.availableSeats),
                        })
                      )
                    : dispatch(
                        setTravellerCount({
                          index: index,
                          name: "traveller",
                          value: e.target.value,
                        })
                      );
                }}
              />
            </p>
            <p
              className="w-5 h-5 rounded-full bg-blue-500 text-white flex justify-center items-center cursor-pointer"
              onClick={() => {
                Number(item?.traveller) >= Number(item?.availableSeats)
                  ? dispatch(
                      setTravellerCount({
                        index: index,
                        name: "traveller",
                        value: Number(item?.availableSeats),
                      })
                    )
                  : dispatch(
                      setTravellerCount({
                        index: index,
                        name: "traveller",
                        value: Number(item?.traveller) + 1,
                      })
                    );
              }}
            >
              +
            </p>
          </div>
        </div>
        <div className="">
          <p className="text-[16px]  text-green-600  font-[800]">
            {priceConversion(item?.price, selectedCurrency, true)}
          </p>
        </div>
        <button
          className={`text-[12px] font-[600] px-5 h-8 rounded-sm text-white bg-blue-600 ${
            (item?.traveller < 1 || item?.availableSeats < 1) &&
            " cursor-not-allowed "
          }`}
          onClick={() => {
            item?.traveller > 0 &&
              Number(item?.availableSeats) > 0 &&
              navigate(`/a2a/booking/${item?._id}?date=${date}`);
            dispatch(setA2aEnquiry(item));
            localStorage.setItem("a2aEnquiry", JSON.stringify(item));
          }}
        >
          Book now
        </button>
      </div>
    </div>
  );
}

export default BookTicketComponent;
