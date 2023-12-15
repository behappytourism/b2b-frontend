import React, { useEffect, useState } from "react";
import {
  AiFillDelete,
  AiFillEdit,
  AiFillEye,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../axios";
import { setResellers } from "../../../redux/slices/resellerSlice";
import { PageLoader } from "../../components";
import ResellerChipList from "./ResellerChipList";
import { BsSearch } from "react-icons/bs";

function Resellers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const { resellers } = useSelector((state) => state.resellers);
  const { token } = useSelector((state) => state.agents);

  const fetchResellers = async (search) => {
    try {
      setIsLoading(true);
      setError("");
      const response = await axios.get(
        `/b2b/resellers/listAll?search=${search}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setResellers(response.data));
      setIsLoading(false);
    } catch (error) {
      setError(
        error?.response?.data?.error || "Something went wrong, Try again"
      );
      setIsLoading(false);
    }
  };
  const deleteReseller = async (id) => {
    try {
      console.log(id);
      setError("");
      if (confirm("Deleting sub agent. Are you sure?")) {
        const response = await axios.delete(`/b2b/resellers/delete/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const result = resellers?.filter((item) => item._id !== id);
        dispatch(setResellers(result));
      }
    } catch (error) {
      setError(
        error?.response?.data?.error || "Something went wrong, Try again"
      );
    }
  };

  useEffect(() => {
    fetchResellers(search);
  }, [search]);

  return (
    <div className=" text-textColor max-w-screen-xl mx-auto">
      <div className="p-2 ">
        <div className="">
          <div className=" py-5">
            <div className="flex justify-between ">
              <button
                className="h-10 flex border rounded overflow-hidden group hover:border-orange-500"
                onClick={() => navigate("/reseller/add")}
              >
                <span className="w-10 flex items-center h-full border-r justify-center bg-orange-500 group-hover:bg-orange-600 text-white ">
                  <AiOutlineUserAdd />{" "}
                </span>
                <span className="font-[350] text-[12px] h-full flex px-2 justify-center items-center  group-hover:text-orange-500">
                  Create agents
                </span>
              </button>
              <div className="relative h-10">
                <span className="absolute w-10 h-full flex justify-center items-center text-stone-500 border-r">
                  <BsSearch />
                </span>
                <input
                  type="search"
                  className=" pl-12 outline-none border px-2 text-xs text-stone-500 placeholder:text-xs placeholder:text-stone-500 rounded h-full focus:border-green-400 hover:border-blue-400 hover:bg-stone-100 lg:w-[400px] "
                  placeholder="Search by Name & Company!!!"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
          {isLoading ? (
            <PageLoader />
          ) : (
            <>
              <div className="overflow-x-auto hidden lg:block shadow-[0_0_7px_2px_rgb(56_65_74_/_5%)]">
                <table className="w-full mt-3 ">
                  <thead className="border-b-2 border-primaryColor text-grayColor text-[13px] text-left">
                    <tr>
                      <th className="font-[700]  text-slate-500 p-3 whitespace-nowrap">
                        Agent Code
                      </th>
                      <th className="font-[700]  text-slate-500 p-3 whitespace-nowrap">
                        Company
                      </th>
                      <th className="font-[700]  text-slate-500 p-3 whitespace-nowrap">
                        Representative Name
                      </th>
                      <th className="font-[700]  text-slate-500 p-3 whitespace-nowrap">
                        Phone
                      </th>
                      <th className="font-[700]  text-slate-500 p-3 whitespace-nowrap">
                        Whatsapp
                      </th>
                      <th className="font-[700]  text-slate-500 p-3 whitespace-nowrap">
                        Email
                      </th>
                      <th className="font-[700]  text-slate-500 p-3 whitespace-nowrap">
                        Designation
                      </th>
                      <th className="font-[700]  text-slate-500 p-3 whitespace-nowrap">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {resellers?.length > 0 ? (
                      resellers?.map((item, index) => (
                        <tr
                          className="border-b text-sm font-[350] text-gray-400 border-tableBorderColor cursor-default odd:bg-white hover:bg-slate-100 even:bg-slate-50"
                          key={index}
                          // onClick={() => navigate(`/reseller/${item?._id}`)}
                        >
                          <td className="px-3 py-4">{item?.agentCode}</td>
                          <td className="px-3 py-4">
                            <div className="w-[150px] md:w-auto">
                              {item?.companyName}
                            </div>
                          </td>
                          <td className="px-3 py-4">{item?.name}</td>
                          <td className="px-3 py-4 ">{item?.phoneNumber}</td>
                          <td className="px-3 py-4 ">{item?.whatsappNumber}</td>
                          <td className="px-3 py-4">{item?.email}</td>
                          <td className="px-3 py-4">{item?.designation}</td>
                          <td className="px-3 py-4 flex gap-2">
                            <span
                              className="text-xl text-green-500"
                              onClick={() => navigate(`/reseller/${item?._id}`)}
                            >
                              <AiFillEye />{" "}
                            </span>
                            <span
                              className="text-xl text-lightblue"
                              onClick={() =>
                                navigate(`/reseller/${item?._id}/edit`)
                              }
                            >
                              <AiFillEdit />{" "}
                            </span>
                            <span
                              className="text-xl text-main"
                              onClick={() => deleteReseller(item?._id)}
                            >
                              <AiFillDelete />{" "}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="border-b border-tableBorderColor">
                        <td colSpan="8" className="px-3 py-4 ">
                          <div className="flex justify-center my-10 text-[14px] text-gray-400 font-[500]">
                            OOps...! No data found
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="lg:hidden">
                {resellers?.length > 0 ? (
                  resellers?.map((item) => (
                    <ResellerChipList item={item} key={item?._id} />
                  ))
                ) : (
                  <div className="border-b border-tableBorderColor">
                    <div className="p-3 ">
                      <div className="flex justify-center my-10 text-[14px] text-gray-400 font-[500]">
                        OOps...! No data found
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Resellers;
