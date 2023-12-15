import React, { useState, useEffect, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMapLocationDot } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useHandleClickOutside } from "../../../hooks";
import axios from "../../../axios";

function VisaCard({ setView }) {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [datalist, setDatalist] = useState(false);
  const [country, setCountry] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [nationality, setNationality] = useState({});

  const [isNationalityLoading, setIsNationalityLoading] = useState(false);
  const [nationalityArray, setNationalityArray] = useState([]);
  const [nationalityError, setNationalityError] = useState("");
  const [filteredNationality, setFilteredNationality] = useState([]);
  const [nationalityDatalist, setNationalityDatalist] = useState(false);

  const fetchNationality = async () => {
    try {
      setIsNationalityLoading(true);
      setNationalityError("");
      const response = await axios.get("/b2b/visa/all/nationality");
      setNationalityArray(response?.data);
      setIsNationalityLoading(false);
    } catch (err) {
      setNationalityError(err?.response?.data?.error);
      console.log(err);
      setIsNationalityLoading(false);
    }
  };

  const dropdownWrapperRef = useRef();

  useHandleClickOutside(dropdownWrapperRef, () => setDatalist(false));

  const handleFocus = (e) => {
    setDatalist(true);
  };

  const dropdownNatioinalityWrapperRef = useRef();

  useHandleClickOutside(dropdownNatioinalityWrapperRef, () =>
    setNationalityDatalist(false)
  );

  const handleNationalityFocus = (e) => {
    setNationalityDatalist(true);
  };

  useEffect(() => {
    const getVisaLIst = async () => {
      const res = await axios.get("/visa/all");
      console.log(res.status);
      if (res.status === 200) {
        setDestinations([...res.data]);
      }
    };
    getVisaLIst();
    fetchNationality();
  }, []);

  useEffect(() => {
    const list = destinations?.filter((data) => {
      return data.country?.countryName?.toLowerCase().startsWith(country);
    });

    setFilteredData(list);
  }, [country, destinations]);

  useEffect(() => {
    if (nationality.length > 0) {
      const list = nationalityArray?.filter((data) => {
        return data?.nationality?.toLowerCase().startsWith(nationality);
      });
      setFilteredNationality(list);
    } else {
      setFilteredNationality(nationalityArray);
    }
  }, [nationality, nationalityArray]);

  return (
    <>
      {/* <form className="max-w-screen-xl mx-auto ">
        <div className="md:flex gap-2 py-5 space-y-4 md:space-y-0  ">
          <div className="w-full flex justify-center items-center ">
            <div className="space-y-2 w-full ">
              <div className="relative ">
                <div className="space-y-2">
                  <label
                    htmlFor=""
                    className="text-sm text-gray-500  tracking-wide"
                  >
                    Where do you want to go?
                  </label>
                  <input
                    type="text"
                    list="Country"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={handleFocus}
                    required
                    className="block lg:w-[30%] sm:w-[60%] w-full capitalize outline-none border rounded px-2 h-10 border-b-blue-400 bg-transparent text-sm text-gray-300 font-medium"
                  />
                </div>
                {datalist && (
                  <div className="absolute max-h-[17em] w-[21em] mt-1  bg-light rounded-lg overflow-y-auto z-20">
                    <div className="w-full p-2 overflow-y-auto">
                      {filteredData?.map((item) => (
                        <div
                          key={item.name}
                          className="bg-soft py-2 px-2 cursor-pointer capitalize  z-30"
                          onClick={() => {
                            setValue(item?.country?.countryName);
                            setDatalist(!datalist);
                            navigate(`/visa/${item?._id}`);
                          }}
                        >
                          {item?.country?.countryName}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form> */}
      <div className="py-10 px-4 md:px-0 max-w-screen-xl mx-auto">
        <div className="md:w-1/2 w-full md:flex space-y-3 md:space-y-0  justify-center items-center  ">
          <div className=" text-text text-2xl px-2">
            <FaMapLocationDot />
          </div>
          <div className=" w-full  ">
            <div className="" ref={dropdownWrapperRef}>
              <div className="relative">
                <p className="absolute top-0 left-3 font-mono text-[12px] font-light text-gray-300">
                  Destination
                </p>
                <input
                  type="text"
                  list="Country"
                  value={"United Arab Emirates"}
                  // placeholder="Where do you want to go?"
                  // onChange={(e) => setCountry(e.target.value)}
                  // onFocus={handleFocus}
                  // required
                  className="capitalize bg-gray-50/50 px-3 w-full border-none outline-none ring-0 placeholder:text-text py-3   rounded-full md:rounded text-darktext"
                />
              </div>
              {/* {datalist && (
              <div className="absolute max-h-[17em] w-[21em] mt-1  bg-light rounded-lg overflow-y-auto z-20">
                <div className="w-full p-2 overflow-y-auto">
                  {filteredData?.map((item) => (
                    <Link to={`/visa/${item?._id}`}>
                      <div
                        key={item?._id}
                        className="bg-soft py-2 px-2 cursor-pointer capitalize"
                        onClick={() => {
                          setCountry(item);
                          setDatalist(!datalist);
                        }}
                      >
                        {item?.country?.countryName}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )} */}
            </div>
          </div>

          {/* Nationality */}

          <div className=" text-text text-2xl px-2">
            <AiOutlineSearch />
          </div>
          <div className=" w-full  ">
            <div className="" ref={dropdownNatioinalityWrapperRef}>
              <div className="relative">
                <input
                  type="text"
                  list="Nationality"
                  value={nationality?.nationality}
                  placeholder="What is your nationality?"
                  onChange={(e) => setNationality(e.target.value)}
                  onFocus={handleNationalityFocus}
                  required
                  className="capitalize bg-gray-50/50 px-3 w-full border-none outline-none ring-0 placeholder:text-text py-3   rounded-full md:rounded text-darktext"
                />
              </div>
              {nationalityDatalist && (
                <div className="absolute max-h-[17em] w-[21em] mt-1  bg-light rounded-lg overflow-y-auto z-30">
                  <div className="w-full p-2 overflow-y-auto">
                    {!isNationalityLoading ? (
                      <>
                        {!nationalityError ? (
                          <>
                            {filteredNationality?.map((item) => (
                              <div
                                key={item?._id}
                                className="bg-soft py-2 px-2 cursor-pointer capitalize"
                                onClick={() => {
                                  setNationality(item?.nationality);
                                  setDatalist(!datalist);
                                  navigate(
                                    `/visa/${
                                      destinations.length > 0
                                        ? destinations[0]?._id
                                        : ""
                                    }?nationality=${item?._id}`
                                  );
                                }}
                              >
                                {item?.nationality}
                              </div>
                            ))}
                          </>
                        ) : (
                          <div className="py-4 text-center font-mono text-gray-500 text-sm ">
                            {error}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="py-5 space-y-2">
                        <div className="bg-gray-300 w-10/12 h-5 animate-pulse rounded-md shadow-sm "></div>
                        <div className="bg-gray-300 w-8/12 h-5 animate-pulse rounded-md shadow-sm "></div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VisaCard;
