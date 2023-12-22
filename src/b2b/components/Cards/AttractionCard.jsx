import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useHandleClickOutside } from "../../../hooks";
import axios from "../../../axios";

function AttractionCard({ setView }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [datalist, setDatalist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchEnquiry] = useState({});

  const dropdownWrapperRef = useRef();
  useHandleClickOutside(dropdownWrapperRef, () => setDatalist(false));

  const handleFocus = (e) => {
    setDatalist(true);
  };

  const getSearchQuery = async (value) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/search/list?search=${value}`);
      setSearchEnquiry(response?.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSearchQuery(value);
  }, [dispatch, value]);

  return (
    <>
      <form>
        <div className="md:flex gap-2 pt-4 space-y-3 md:space-y-0 max-w-screen-xl mx-auto px-5">
          <div className="w-full flex justify-center items-center ">
            <div className=" w-full ">
              <div className="" ref={dropdownWrapperRef}>
                <div className="space-y-2">
                  <label
                    htmlFor=""
                    className="text-4xl font-bold text-white  tracking-wide"
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
                    placeholder="Search here..."
                    className="block placeholder:text-gray-300  lg:w-[60%] sm:w-[60%] w-full capitalize outline-none bg-white border rounded-xl p-5  h-16  bg-transparent text-sm text-gray-300 font-medium"
                  />
                </div>
                {datalist && (
                  <div className="absolute max-h-[30em] w-[35em] mt-1 shadow-xl bg-light rounded-lg overflow-y-auto z-20">
                    <div className="w-full p-2 overflow-y-auto">
                      {searchQuery?.destinations?.length > 0 ? (
                        <div className="">
                          <p className="bg-gray-200 py-[2px] px-2 text-[14px] font-[600] text-textColor">
                            Destinations
                          </p>
                          {searchQuery?.destinations.map((item) => (
                            <>
                              <div
                                key={item?.name}
                                className=" py-2 px-2 cursor-pointer capitalize text-darktext z-30 border-b text-sm"
                                onClick={() => {
                                  setValue(item?.name);
                                  setDatalist(!datalist);
                                  navigate(`/attractions/${item?.name}`);
                                }}
                              >
                                {item?.name}
                              </div>
                            </>
                          ))}
                        </div>
                      ) : (
                        ""
                      )}
                      {searchQuery?.attractions?.length > 0 ? (
                        <div className="">
                          <p className="bg-gray-200 py-[2px] px-2 text-[14px] font-[600] text-textColor">
                            Attractions
                          </p>
                          {searchQuery?.attractions.map((item) => (
                            <div
                              key={item.title}
                              className=" py-2 px-2 cursor-pointer capitalize text-darktext z-30 border-b text-sm"
                              onClick={() => {
                                setValue(item.title);
                                setDatalist(!datalist);
                                navigate(`/attractions/details/${item?._id}`);
                              }}
                            >
                              {item.title}
                            </div>
                          ))}
                        </div>
                      ) : (
                        ""
                      )}
                      {searchQuery?.destinations?.length <= 0 &&
                      searchQuery?.attractions?.length <= 0 &&
                      !isLoading ? (
                        <div className="">
                          <p className="py-2 px-2   text-darktext z-30  text-sm font-medium">
                            Sorry! No data found with this query.
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default AttractionCard;
