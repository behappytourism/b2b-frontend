import React, { useEffect, useState } from "react";
import TermsConditionSection from "./TermsConditionSection";
import VisaApplyCard from "./VisaApplyCard";
import VisaComponentPage from "./VisaComponentPage";
import VisaDocumentSection from "./VisaDocumentSection";
import VisaFAQsSection from "./VisaFAQsSection";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { VscTasklist } from "react-icons/vsc";
import { FaQuoteRight, FaWpforms } from "react-icons/fa";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import SearchCards from "../../components/Cards/SearchCards";
import { useDispatch, useSelector } from "react-redux";
import VisaIncludes from "./VisaIncludes";
import { setVisas } from "../../../redux/slices/visaSlice";
import axios from "../../../axios";

function VisaHomeScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [viewCard, setViewCard] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useSelector((state) => state.agents);

  const fetchVisas = async (id) => {
    try {
      setError("");
      setIsLoading(true);
      const response = await axios.get(
        `/b2b/visa/type/${id}/all/${searchParams.get("nationality")}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setVisas(response.data));
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err?.response?.data?.error);
      // navigate("/error");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVisas(id);
  }, [id, searchParams.get("nationality")]);

  return (
    <div className="">
      <div className="">
        <SearchCards />
        <div className="max-w-screen-xl mx-auto pb-20">
          {/* <div className=" rounded  shadow-[0_0_7px_2px_rgb(56_65_74_/_5%)] sticky top-0 z-10">
            <div className="md:max-w-screen-xl md:mx-auto text-gray-400 ">
              <div className=" overflow-x-auto scrollbar-hide">
                <div className=" flex md:grid md:grid-cols-4 space-x-1 px-1 md:px-10 py-3 md:py-1 items-center ">
                  <button
                    className={`flex justify-center text-sm md:text-base items-center px-5 md:px-3 py-3 border-blue-500 hover:text-lightblue  hover:border-b-4 duration-300 space-x-1 `}
                  >
                    <a
                      className="w-full flex justify-center items-center gap-1"
                      href={"#visas"}
                    >
                      <span className="">
                        <FaWpforms />
                      </span>
                      <span className="">Visas</span>
                    </a>
                  </button>
                  <button
                    className={`flex justify-center text-sm md:text-base items-center px-5 md:px-3 py-3 border-blue-500 hover:text-lightblue  hover:border-b-4 duration-300 space-x-1  `}
                  >
                    <a
                      className="w-full flex justify-center items-center gap-1"
                      href={"#documents"}
                    >
                      <span className="">
                        <HiOutlineDocumentDuplicate />{" "}
                      </span>
                      <span className="">Documents</span>
                    </a>
                  </button>
                  <button
                    className={`flex justify-center text-sm md:text-base items-center px-6 md:px-3 py-3 border-blue-500 hover:text-lightblue  hover:border-b-4 duration-300 space-x-1  `}
                  >
                    <a
                      className="w-full flex justify-center items-center gap-1"
                      href={"#faqs"}
                    >
                      <span className="">
                        <FaQuoteRight />
                      </span>
                      <span className="">FAQs</span>
                    </a>
                  </button>
                  <button
                    className={`flex justify-center text-sm md:text-base items-center px-6 md:px-3 py-3 border-blue-500 hover:text-lightblue  hover:border-b-4 duration-300 space-x-1 `}
                  >
                    <a
                      className="w-full flex justify-center items-center gap-1"
                      href={"#terms"}
                    >
                      <span className="">
                        <VscTasklist />
                      </span>
                      <span className="">Terms & conditions</span>
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div> */}
          <div className="">
            <div className="lg:grid grid-cols-12 gap-10">
              <div className="col-span-8">
                {isLoading ? (
                  <div className="-full p-4 border border-gray-200 rounded shadow animate-pulse md:p-6">
                    <div className="h-5 bg-gray-200 rounded-full  w-48 my-4"></div>
                    <div className="lg:grid grid-cols-2 gap-5">
                      {[1, 2, 3, 4]?.map((item, index) => (
                        <div
                          className="rounded-2xl w-full bg-gray-200"
                          key={index}
                        >
                          <div className="flex justify-center items-center my-5">
                            <div className="h-16  w-11/12 bg-gray-300 rounded-2xl flex items-center ">
                              <div className="ml-3 h-7">
                                <div className="h-4 w-48 p-3 bg-gray-400 rounded-2xl"></div>
                              </div>
                            </div>
                          </div>
                          <div className="h-52 w-11/12  mx-2">
                            <div className="h-4 bg-gray-300 rounded-full  w-48 mb-4"></div>
                            <div className="h-3 bg-gray-300 rounded-full  mb-2.5"></div>
                            <div className="h-3 bg-gray-300 rounded-full  mb-2.5"></div>
                            <div className="h-3 bg-gray-300 rounded-full  mb-2.5"></div>
                            <div className="h-3 bg-gray-300 rounded-full "></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center w-5/12 rounded-2xl my-5 justify-center h-6  bg-gray-300"></div>
                    <div className="flex items-center w-10/12 rounded-2xl my-5 justify-center h-4  bg-gray-300"></div>
                    <div className="flex items-center w-10/12 rounded-2xl my-5 justify-center h-4  bg-gray-300"></div>
                    <div className="flex items-center w-5/12 rounded-2xl my-5 py-3 justify-center h-6  bg-gray-300"></div>
                    <div className="flex items-center w-10/12 rounded-2xl my-5 justify-center h-4  bg-gray-300"></div>
                    <div className="flex items-center w-10/12 rounded-2xl my-5 justify-center h-4  bg-gray-300"></div>
                    <div className="flex items-center w-full rounded-2xl my-7 justify-center h-36  bg-gray-300"></div>
                  </div>
                ) : (
                  <>
                    {error?.length <= 0 ? (
                      <>
                        <div id="visas">
                          <VisaComponentPage
                            nationality={searchParams.get("nationality")}
                          />
                        </div>
                        <div id="">
                          <VisaIncludes />
                        </div>
                        <div id="documents">
                          <VisaDocumentSection />
                        </div>
                        <div id="faqs">
                          <VisaFAQsSection />
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </div>
              <div className="col-span-4 relative">
                <div
                  className={`lightglass  top-0 bottom-0 left-0 right-0 z-10 ${
                    viewCard ? "fixed" : "hidden"
                  }`}
                  onClick={() => setViewCard(!viewCard)}
                ></div>
                <div
                  className={`${
                    viewCard
                      ? "fixed bottom-0 left-0 right-0 z-10 bg-white"
                      : "-bottom-full invisible h-0 overflow-hidden"
                  } transition-all duration-500  rounded-t-3xl lg:rounded-none lg:block   lg:visible lg:h-auto  lg:sticky lg:top-20`}
                >
                  <div
                    className="flex lg:hidden justify-end pt-5 px-7 text-4xl"
                    onClick={() => setViewCard(!viewCard)}
                  >
                    <AiOutlineClose />
                  </div>
                  <VisaApplyCard />
                </div>
              </div>
            </div>
          </div>
          <div className="">
            {error?.length <= 0 ? (
              <div id="terms" className="">
                <TermsConditionSection />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisaHomeScreen;
