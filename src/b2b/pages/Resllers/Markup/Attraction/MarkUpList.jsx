import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../../../axios";
import { PageLoader } from "../../../../components";
import MarkupListSingleRow from "./MarkupListSingleRow";
import { BsSearch } from "react-icons/bs";
import { useParams } from "react-router-dom";

function MarkUpList() {
  const { id } = useParams()
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [markups, setMarkups] = useState([]);
  const { token } = useSelector((state) => state.agents);

  const fetchMarkups = async (e) => {
    try {
      setIsLoading(true);
      setError("");
      const response = await axios.get(
        `/b2b/resellers/subagent/markup/listall/${id}?search=${search || ""}`,
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

  return (
    <>
      <div className=" ">
        <div className="max-w-screen-xl mx-auto">
          <div className="px-5 py-10">
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
            {isLoading ? (
              <PageLoader />
            ) : (
              <>
                <div className="overflow-x-auto shadow-[0_0_7px_2px_rgb(56_65_74_/_5%)] ">
                  <div className="w-full">
                    <div className="bg-white text-gray-400 text-[14px] text-left border-b">
                      <div className="font-[500] p-3 whitespace-nowrap text-center">
                        Attraction Name
                      </div>
                    </div>
                    <div className="text-sm text-textColor">
                      {markups?.map((item) => (
                        <MarkupListSingleRow item={item} key={item?._id} />
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MarkUpList;
