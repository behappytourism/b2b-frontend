import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useHandleClickOutside } from "../../../hooks";
import axios from "../../../axios";
import { CiSearch } from "react-icons/ci";

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
        <div className="md:flex hidden gap-2 pt-4 space-y-3 md:space-y-0 max-w-screen-xl mx-auto">
          <div className="w-full flex justify-center items-center ">
            <div className=" w-full ">
              <div className="" ref={dropdownWrapperRef}>
                <div className="space-y-1 flex ">
                  <div className="pt-1 ">
                    <div className="border-l border-y rounded-l-xl  h-14 w-10">
                      <h1 className="text-4xl text-gray-300 pt-2 ml-1"><CiSearch /></h1>
                    </div>
                  </div>
                  <input
                    type="text"
                    list="Country"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={handleFocus}
                    required
                    placeholder="Search Tours"
                    className="block placeholder:text-gray-300 lg:w-[400px] sm:w-[40%] w-full capitalize outline-none bg-white border-r border-y rounded-r-xl p-5  h-14  bg-transparent text-sm text-gray-300 font-medium"
                  />
                </div>
                {datalist && (
                  <div className="absolute max-h-[30em] w-[32em] mt-1 shadow-xl bg-light rounded-lg overflow-y-auto z-20">
                    <div className="w-full p-2 overflow-y-auto">
                      {searchQuery?.destinations?.length > 0 ? (
                        <div className="">
                          <p className="font-bold py-[2px] px-2 text-lg text-textColor">
                            Destinations
                          </p>
                          {searchQuery?.destinations.map((item) => (
                            <>
                              <div
                                key={item?.name}
                                className=" py-3 px-3 cursor-pointer capitalize text-darktext z-30 border-b text-sm"
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
                          <p className=" py-[2px] px-2 text-lg font-bold text-textColor">
                            Attractions
                          </p>
                          {searchQuery?.attractions.map((item) => (
                            <div
                              key={item.title}
                              className=" py-3 px-3 cursor-pointer capitalize text-darktext z-30 border-b text-sm"
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
       

  
        <div className="w-full md:hidden justify-center mt-3"  ref={dropdownWrapperRef} >
        <input
                    type="text"
                    list="Country"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={handleFocus}
                    required
                    placeholder="Search Tours"
                    className="block p-3 border rounded-xl placeholder:text-gray-300 w-full min-w-[300px] -ml-[140px]"
                  />

{datalist && (
                  <div className="absolute max-h-[30em] w-[32em] -ml-[140px] mt-1 shadow-xl bg-light rounded-lg overflow-y-auto z-20">
                    <div className="w-full p-2 overflow-y-auto">
                      {searchQuery?.destinations?.length > 0 ? (
                        <div className="">
                          <p className="font-bold py-[2px] px-2 text-lg text-textColor">
                            Destinations
                          </p>
                          {searchQuery?.destinations.map((item) => (
                            <>
                              <div
                                key={item?.name}
                                className=" py-3 px-3 cursor-pointer capitalize text-darktext z-30 border-b text-sm"
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
                          <p className=" py-[2px] px-2 text-lg font-bold text-textColor">
                            Attractions
                          </p>
                          {searchQuery?.attractions.map((item) => (
                            <div
                              key={item.title}
                              className=" py-3 px-3 cursor-pointer capitalize text-darktext z-30 border-b text-sm"
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

    </>
  );
}

export default AttractionCard;
