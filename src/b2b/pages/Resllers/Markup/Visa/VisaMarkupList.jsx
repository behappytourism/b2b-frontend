import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "../../../../../axios";
import { PageLoader } from "../../../../components";
import VisaMarkupListSingleRow from "./VisaMarkupListSingleRow";
import { BsSearch } from "react-icons/bs";
import { useParams } from "react-router-dom";

function VisaMarkupList() {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false);
  const [allVisa, setAllVisa] = useState([]);
  const [search, setSearch] = useState("");

  const { token } = useSelector((state) => state.agents);

  const fetchAllVisa = async (search) => {
    try {
      setIsLoading(true);
      if (token) {
        const response = await axios.get(`/b2b/subagent/visa/markup/list/${id}?search=${search}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setIsLoading(false);
        setAllVisa(response.data || []);
      }
    } catch (err) {
      console.log(err);
      throw Error("Cant find markups");
    }
  };

  useEffect(() => {
    fetchAllVisa(search);
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
                  placeholder="search!!!!!"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            {isLoading ? (
              <PageLoader />
            ) : (
              <>
                <div className="overflow-x-auto hidden lg:block shadow-[0_0_7px_2px_rgb(56_65_74_/_5%)]">
                  <table className="w-full">
                    <thead className=" text-gray-400 border-b  text-[14px] text-left">
                      <tr>
                        <th className="font-[700] py-4 px-3 whitespace-nowrap">
                          Visa Type Name
                        </th>
                        {/* <th className="font-[700] py-4 px-3 whitespace-nowrap">
                          Country
                        </th>
                        <th className="font-[700] py-4 px-3 whitespace-nowrap">
                          Default Price
                        </th> */}
                        <th className="font-[700] py-4 px-3 whitespace-nowrap">
                          Sub-agent MarkUp
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm text-textColor">
                      {allVisa?.map((item, index) => (
                        <VisaMarkupListSingleRow key={item?._id} item={item} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default VisaMarkupList;
