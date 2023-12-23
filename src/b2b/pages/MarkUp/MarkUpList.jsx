import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../axios";
import { PageLoader, Pagination } from "../../components";
import MarkupsNavigation from "../MarkupsNavigation";
import MarkupListSingleRow from "./MarkupListSingleRow";
import { BsSearch } from "react-icons/bs";
import { MdAttractions } from "react-icons/md";
import MarkupTransferList from "./MarkupTransferList";
import { IoCarSportSharp } from "react-icons/io5";


function MarkUpList() {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [markups, setMarkups] = useState([]);
  const { token } = useSelector((state) => state.agents);

  const [showDetails, setShowDetails] = useState({
    attraction: true,
    transfer: false
  })

  const fetchMarkups = async (e) => {
    try {
      setIsLoading(true);
      setError("");
      const response = await axios.get(
        `/b2b/resellers/client/markup/listall?search=${search || ""}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setMarkups(response.data?.attractionList);
      setIsLoading(false);
    } catch (error) {
      setError(
        error?.response?.data?.error || "Something went wrong, Try again"
      );
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchMarkups();
  }, [search]);


  const [transferSearch, setTransferSearch] = useState("")
  const [transferLoading, setTransferLoading] = useState(false)
  const [transfers, setTransfers] = useState([])

  const [filters, setFilters] = useState({
    skip:0,
    limit:10,
    totalTransfer: 0
  })

  const fetchTransferMarkup = async ()=> {
    try {
      setTransferLoading(true)
      const res = await axios.get(`/b2b/transfer/client/markup/get-all-transfer?limit=${filters?.limit}&skip=${filters.skip}&search=${transferSearch || ""}`, {
        headers: { authorization: `Bearer ${token}`}
      })
      setFilters(({
        totalTransfer: res?.data?.totalTransfer,
        skip: res.data.skip,
        limit: res.data.limit
      }))
      setTransfers(res?.data?.transfers)
      setTransferLoading(false)
    } catch (error) {
      setTransferLoading(false)
      
    }
  }

  useEffect(()=>{
    fetchTransferMarkup()
  }, [transferSearch, filters.skip])

  return (
    <>
      <div className=" ">
        {/* <MarkupsNavigation /> */}
        <div className="max-w-screen-xl mx-auto">
          <div className="">
            {
              showDetails?.attraction ? (
                <div className="flex items-center justify-end  p-4">
                  <div className="relative h-10">
                    <span className="absolute w-10 h-full flex justify-center items-center text-stone-500 border-r">
                      <BsSearch />
                    </span>
                    <input
                      type="search"
                      className=" pl-12 outline-none border px-2 text-xs text-stone-500 placeholder:text-xs placeholder:text-stone-500 rounded h-full focus:border-green-400 hover:border-blue-400 hover:bg-stone-100 lg:w-[400px] "
                      placeholder="Search!!!!!"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
              ) : showDetails?.transfer ? (
                <div className="flex items-center justify-end  p-4">
                  <div className="relative h-10">
                    <span className="absolute w-10 h-full flex justify-center items-center text-stone-500 border-r">
                      <BsSearch />
                    </span>
                    <input
                      type="search"
                      className=" pl-12 outline-none border px-2 text-xs text-stone-500 placeholder:text-xs placeholder:text-stone-500 rounded h-full focus:border-green-400 hover:border-blue-400 hover:bg-stone-100 lg:w-[400px] "
                      placeholder="Search here!!!!!"
                      value={transferSearch}
                      onChange={(e) => setTransferSearch(e.target.value)}
                    />
                  </div>
                </div>
              ) : ""
            }
            {isLoading ? (
              <PageLoader />
            ) : (
              <>
                <div className="overflow-x-auto shadow-[0_0_7px_2px_rgb(56_65_74_/_5%)] ">
                  <div className="w-full">
                    {/* <div className="bg-white text-gray-400 text-[14px] text-left border-b">
                      <div className="font-[500] p-3 whitespace-nowrap text-center">
                        Attraction Name
                      </div>
                    </div> */}
                    <div className="p-2 bg-soft">
                      <ul className="flex gap-3">
                        <li>
                          <span 
                           className={`inline-block p-2 ${
                            showDetails?.attraction
                              ? " text-blue-500  "
                              : " text-gray-400 border-transparent hover:text-blue-400  "
                          }  rounded-full  transition duration-200 cursor-pointer flex items-center gap-1 text-md`}
                          onClick={()=>{
                            setShowDetails({
                              attraction: true,
                              transfer:false
                            })
                          }}
                          >
                            <span className="text-lg">  <MdAttractions /></span>
                            Attraction</span>
                        </li>
                        <li>
                          <span
                           className={`inline-block p-2 ${
                            showDetails?.transfer
                              ? " text-blue-500  "
                              : " text-gray-400 border-transparent hover:text-blue-400  "
                          }  rounded-full  transition duration-200 cursor-pointer flex items-center gap-1 text-md`}
                          onClick={()=>{
                            setShowDetails({
                              attraction: false,
                              transfer:true
                            })
                          }}
                          >
                            <span><IoCarSportSharp/></span>
                            Transfer</span>
                        </li>
                      </ul>
                    </div>
                    {
                      showDetails?.attraction ? (
                          <div className="text-sm text-textColor">
                            {markups?.map((item) => (
                              <MarkupListSingleRow item={item} key={item?._id} />
                            ))}
                          </div>
                      ) : showDetails?.transfer ? (
                        <div className="text-sm text-textColor">
                          {
                            transfers?.map((ele)=> (
                              <MarkupTransferList ele={ele} filters={filters} setFilters={setFilters} />
                            ))
                          }
                          <div className="pt-3 p-3">
                          <Pagination
                              limit={filters?.limit}
                              skip={filters?.skip}
                              total={filters?.totalTransfer}
                              incOrDecSkip={(number) =>
                                setFilters((prev) => {
                                  return {
                                    ...prev,
                                    skip: prev.skip + number,
                                  };
                                })
                              }
                              updateSkip={(skip) =>
                                setFilters((prev) => {
                                  return { ...prev, skip };
                                })
                              }
                            />
                          </div>
                        </div>
                      ) : ""
                    }
                  </div>
                </div>
                {/* <div className="lg:hidden">
                  {markups?.attractions?.data?.map((item) => (
                    <MarkupChipList item={item} key={item?._id} />
                  ))}
                </div> */}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MarkUpList;
