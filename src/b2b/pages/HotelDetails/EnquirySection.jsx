import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import DatePicker from "react-multi-date-picker";
import { useHandleClickOutside } from "../../../hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewRow,
  detailPageInitialRowAdd,
  handleOnAgeChange,
  handleOnChange,
  removeLastRow,
} from "../../../redux/slices/hotelSlice";
import moment from "moment";

function EnquirySection({ roomPaxes, enquiryData }) {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [fromDate, setFromDate] = useState(new Date(enquiryData?.fromDate));
  const [toDate, setToDate] = useState(new Date(enquiryData?.toDate));
  const [adultLength, setAdultLength] = useState(0);
  const [childLength, setChildLength] = useState(0);
  const [paxDropdown, setPaxDropdown] = useState(false);
  const [noOfNights, setNoOfNights] = useState(0);
  const [country, setCountry] = useState("");
  const [priceType, setPriceType] = useState(
    searchParams.get("priceType") ? searchParams.get("priceType") : "all"
  );
  const [research, setResearch] = useState(false);

  const { rows } = useSelector((state) => state.hotel);
  const { countries } = useSelector((state) => state.home);
  const { agent } = useSelector((state) => state.agents);

  useEffect(() => {
    let filteredData;
    if (roomPaxes && roomPaxes?.length > 0) {
      filteredData = roomPaxes?.map((item) => {
        let data = {
          childrenAges: item?.childrenAges,
          noOfAdults: item?.noOfAdults,
          noOfChildren: item?.noOfChildren,
        };
        return data;
      });
    } else {
      filteredData = [
        {
          childrenAges: [],
          noOfAdults: 1,
          noOfChildren: 0,
        },
      ];
    }
    dispatch(detailPageInitialRowAdd(filteredData));
  }, [roomPaxes]);

  useEffect(() => {
    setFromDate(new Date(enquiryData?.fromDate));
    setToDate(new Date(enquiryData?.toDate));
  }, [enquiryData]);

  useEffect(() => {
    const val = rows?.reduce((acc, item) => {
      return acc + item?.noOfAdults;
    }, 0);
    setAdultLength(val);
    const childVal = rows?.reduce((acc, item) => {
      return acc + item?.noOfChildren;
    }, 0);
    setChildLength(childVal);
  }, [rows]);

  useEffect(() => {
    if (Date.parse(fromDate) >= Date.parse(toDate)) {
      setToDate(
        new Date(new Date(fromDate).setDate(new Date(fromDate).getDate() + 3))
      );
    }
  }, [fromDate]);

  useEffect(() => {
    setPriceType(
      searchParams.get("priceType") ? searchParams.get("priceType") : "all"
    );
    setCountry(
      searchParams.get("nationality")
        ? searchParams.get("nationality")
        : agent?.country?.isocode
    );
  }, []);

  const paxDropdownWrapperRef = useRef();
  useHandleClickOutside(paxDropdownWrapperRef, () => setPaxDropdown(false));

  const handleChange = ({ value, name, index }) => {
    dispatch(
      handleOnChange({
        value,
        name,
        index,
      })
    );
  };

  const handleNoOfNights = (fromdate, todate) => {
    const diffTime = Math.abs(new Date(todate) - new Date(fromdate));

    const diffDate = Math.ceil(Number(diffTime) / (1000 * 60 * 60 * 24));

    setNoOfNights(diffDate);
  };

  useEffect(() => {
    handleNoOfNights(fromDate, toDate);
  }, [fromDate, toDate]);

  return (
    <div className=" my-5  md:flex  ">
      <div className=" h-[100%] py-2 flex flex-wrap rounded-lg border-[1px] divide-x">
        <div className="max-w-[170px] flex flex-col px-4 justify-center  ">
          <span className="text-[12px]">Checkin Date</span>
          <DatePicker
            format="DD/MM/YYYY"
            // minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
            value={fromDate}
            onChange={(date) => {
              const d = new Date(date);
              setFromDate(d);
              handleNoOfNights(new Date(d), toDate);
            }}
            inputClass="w-full rounded bg-transparent  outline-none border-none text-[12px]  tracking-[2px] font-medium  text-gray-300"
          />
        </div>
        <div className="max-w-[170px] flex flex-col px-4 justify-center  ">
          <span className="text-[12px]">Checkout Date</span>
          <DatePicker
            format="DD/MM/YYYY"
            minDate={
              new Date(new Date().setDate(new Date(fromDate).getDate() + 1))
            }
            value={toDate}
            onChange={(date) => {
              const d = new Date(date);
              setToDate(d);
              handleNoOfNights(fromDate, new Date(d));
            }}
            inputClass="w-full rounded bg-transparent  outline-none border-none text-[12px]  tracking-[2px] font-medium  text-gray-300"
          />
        </div>
        <div className="max-w-[170px] flex flex-col px-4 justify-center  ">
          <span className="text-[12px]">Nights</span>
          <select
            className="w-12 no-spinner text-sm text-center py-1 bg-transparent text-gray-300  outline-none"
            value={noOfNights}
            type="rooms"
            name="noOfAdults"
            onChange={(e) => {
              setNoOfNights(Number(e.target.value));
              setToDate(new Date(moment(fromDate).add(e.target.value, "days")));
            }}
          >
            {Array.from({ length: 90 }).map((item, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="max-w-[170px] flex flex-col px-4 justify-center  ">
          <span className="text-[12px]">Price Type</span>
          <select
            className="max-w-[150px] no-spinner text-sm text-center py-1 bg-transparent text-gray-300  outline-none"
            name="priceType"
            value={priceType}
            onChange={(e) => setPriceType(e.target.value)}
          >
            <option value={"all"} className="capitalize">
              All
            </option>
            <option value={"static"} className="capitalize">
              Static
            </option>
            <option value={"dynamic"} className="capitalize">
              Dynamic
            </option>
          </select>
        </div>
        <div className="max-w-[170px] flex flex-col px-4 justify-center  ">
          <span className="text-[12px]">Nationality</span>
          <select
            className="max-w-[150px] no-spinner capitalize text-sm text-left  py-1 bg-transparent text-gray-300  outline-none"
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            name="nationality"
          >
            <option value={""} className="text-grayColor">
              Choose country
            </option>
            {countries?.map((country) => (
              <option value={country?.isocode} className="capitalize">
                {country?.countryName}
              </option>
            ))}
          </select>
        </div>
        <div
          ref={paxDropdownWrapperRef}
          className="relative flex flex-col px-4 justify-center "
        >
          <span className="text-[12px]">Pax & Room</span>
          <span
            onClick={() => setPaxDropdown(!paxDropdown)}
            className="text-[12px]  tracking-[2px] font-medium  text-gray-300"
          >
            {adultLength} Adult. {childLength} Children . {rows?.length} Rooms
          </span>
          {paxDropdown && (
            <div className="absolute left-0 right-0 top-[50px] z-20 shadow-[1px_2px_5px_7px_rgb(56_65_74_/_10%)] bg-gray-100 p-5 rounded-md">
              {rows?.map((item, index) => (
                <div key={index} className="pb-4">
                  <p className=" font-[700]  text-gray-400 text-sm uppercase">
                    Room {index + 1}
                  </p>
                  <div className="flex flex-wrap gap-5 py-2">
                    <div className="">
                      <p className="text-center font-[600] text-gray-300 text-xs">
                        Adult
                      </p>
                      <div>
                        <button
                          disabled={Number(item?.noOfAdults) <= 1}
                          onClick={() => {
                            if (Number(item?.noOfAdults) > 1) {
                              dispatch(
                                handleOnChange({
                                  value: Number(item?.noOfAdults) - 1,
                                  name: "noOfAdults",
                                  index,
                                })
                              );
                            }
                          }}
                          className="bg-primaryColor text-white w-6 rounded disabled:cursor-not-allowed"
                        >
                          -
                        </button>
                        <input
                          className="w-10 no-spinner text-center py-1 bg-transparent "
                          value={item?.noOfAdults}
                          type="number"
                          name="noOfAdults"
                          onChange={(e) => {
                            e.target.value < 1
                              ? handleChange({
                                  value: 1,
                                  name: e.target.name,
                                  index,
                                })
                              : handleChange({
                                  value: Number(e.target.value),
                                  name: e.target.name,
                                  index,
                                });
                          }}
                        />
                        <button
                          onClick={() => {
                            dispatch(
                              handleOnChange({
                                value: Number(item?.noOfAdults) + 1,
                                name: "noOfAdults",
                                index,
                              })
                            );
                          }}
                          className="bg-primaryColor text-white w-6 rounded "
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="">
                      <p className="text-center font-[600] text-gray-300 text-xs">
                        Child
                      </p>
                      <div>
                        <button
                          disabled={Number(item?.noOfChildren) <= 0}
                          onClick={() => {
                            if (Number(item?.noOfChildren) > 0) {
                              dispatch(
                                handleOnChange({
                                  value: Number(item?.noOfChildren) - 1,
                                  name: "noOfChildren",
                                  index,
                                })
                              );
                            }
                          }}
                          className="bg-primaryColor text-white w-6 rounded disabled:cursor-not-allowed"
                        >
                          -
                        </button>
                        <input
                          className="w-10 no-spinner text-center py-1 bg-transparent "
                          value={item?.noOfChildren}
                          type="number"
                          name="noOfChildren"
                          readOnly
                        />
                        <button
                          disabled={Number(item?.noOfChildren) >= 4}
                          onClick={() => {
                            if (Number(item?.noOfChildren) < 4) {
                              dispatch(
                                handleOnChange({
                                  value: Number(item?.noOfChildren) + 1,
                                  name: "noOfChildren",
                                  index,
                                })
                              );
                              dispatch(
                                handleOnAgeChange({
                                  index: index,
                                  i: Number(item?.noOfChildren),
                                  value: 0,
                                })
                              );
                            }
                          }}
                          className="bg-primaryColor text-white w-6 rounded "
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {Number(item?.noOfChildren) > 0 ? (
                      <div className="">
                        <p className="text-left font-[600] text-gray-300 text-xs">
                          Age of children
                        </p>
                        <div className="flex flex-wrap gap-4">
                          {Array.from({
                            length: item?.noOfChildren,
                          }).map((age, i) => {
                            return (
                              <div key={i} className="pt-1">
                                <select
                                  name="childrenAges"
                                  value={item?.childrenAges[i]}
                                  onChange={(e) => {
                                    dispatch(
                                      handleOnAgeChange({
                                        index: index,
                                        i: i,
                                        value: e.target.value
                                          ? Number(e.target.value)
                                          : 0,
                                      })
                                    );
                                  }}
                                  className="text-center w-14 h-7 outline-none border focus:border-green-400 rounded bg-transparent"
                                >
                                  <option hidden></option>
                                  <option value={0}>{"<1"}</option>
                                  <option value={1}>1</option>
                                  <option value={2}>2</option>
                                  <option value={3}>3</option>
                                  <option value={4}>4</option>
                                  <option value={5}>5</option>
                                  <option value={6}>6</option>
                                  <option value={7}>7</option>
                                  <option value={8}>8</option>
                                  <option value={9}>9</option>
                                  <option value={10}>10</option>
                                  <option value={11}>11</option>
                                </select>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))}
              {/* //custom rows end */}
              <div className="flex gap-2">
                <button
                  onClick={() => dispatch(addNewRow())}
                  className="text-[12px] font-[600] text-gray-400 border py-2 px-4 rounded-md"
                >
                  Add Room
                </button>
                {rows?.length > 1 && (
                  <button
                    onClick={() => dispatch(removeLastRow())}
                    className="text-[12px] font-[600] text-red-400 border border-red-300 py-2 px-4 rounded-md"
                  >
                    Remove Room
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-end px-1 mt-2 md:mt-0">
        <button
          className=" px-4 py-5 bg-blue-500 text-sm uppercase font-[600] text-white rounded-md"
          onClick={() => {
            setResearch(!research);
            navigate({
              pathname: `/hotel/details/${params.id}`,
              search: `?fromDate=${
                enquiryData?.fromDate === fromDate
                  ? fromDate
                  : moment(fromDate).format()
              }&toDate=${
                enquiryData?.toDate === toDate
                  ? toDate
                  : moment(toDate).format()
              }&rooms=${JSON.stringify(rows)}&nationality=${
                country || ""
              }&priceType=${priceType}&research=${research}`,
            });
          }}
        >
          Change
        </button>
      </div>
    </div>
  );
}

export default EnquirySection;
