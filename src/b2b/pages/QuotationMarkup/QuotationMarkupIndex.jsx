import React, { useEffect, useState } from "react";
import MarkupsNavigation from "../MarkupsNavigation";
import axios from "../../../axios";
import { useSelector } from "react-redux";
import priceConversion from "../../../utils/PriceConversion";
import PageLoader from "../../components/PageLoader";
import { CiEdit } from "react-icons/ci";
import SubAgentMarkupModal from "./SubAgentMarkupModal";
import ClientMarkupModal from "./ClientMarkupModal";

function QuotationMarkupIndex() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [quotationList, setQuotationList] = useState({});
  const [isMarkupModalopen, setIsMarkupModalOpen] = useState({
    clientMarkup: false,
    subAgentMarkup: false,
  });
  const [modalType, setModalType] = useState({
    land: false,
    hotel: false,
    visa: false,
  });

  const { selectedCurrency } = useSelector((state) => state.home);
  const { token } = useSelector((state) => state.agents);

  const fetchQuotationMarkupList = async (search) => {
    try {
      setIsLoading(true);
      setError("");
      const response = await axios.get(`/b2b/quotation/markup/list`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setQuotationList(response?.data);
      setIsLoading(false);
    } catch (err) {
      setError(err?.response?.data?.error);
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotationMarkupList();
  }, []);

  return (
    <div>
      <MarkupsNavigation />
      <div className="max-w-screen-xl mx-auto">
        <div className="px-5 py-10">
          <div className="overflow-x-auto hidden lg:block shadow-[0_0_7px_2px_rgb(56_65_74_/_5%)]">
            <table className="w-full">
              <thead className=" text-gray-400 border-b  text-[14px] text-left">
                <tr>
                  <th className="font-[700] py-4 px-3 whitespace-nowrap">
                    Index
                  </th>
                  <th className="font-[700] py-4 px-3 whitespace-nowrap">
                    Quotation
                  </th>
                  <th className="font-[700] py-4 px-3 whitespace-nowrap">
                    Client Markup
                  </th>
                  {/* <th className="font-[700] py-4 px-3 whitespace-nowrap">
                    Sub-agent Markup
                  </th> */}
                </tr>
              </thead>
              {!isLoading ? (
                <>
                  {error ? (
                    <tbody className="text-sm text-gray-300">
                      <tr>
                        <td
                          colSpan={4}
                          className="py-10 text-center w-full font-demo"
                        >
                          {error}
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody className="text-sm text-textColor">
                      <tr>
                        <td className="p-3">1</td>
                        <td className="p-3">Land</td>
                        <td className="p-3">
                          <div className="flex gap-2 items-center">
                            {quotationList?.clientMarkup?.landmarkMarkup ===
                            0 ? (
                              <p className="">N/A</p>
                            ) : (
                              <p className="flex gap-1">
                                {quotationList?.clientMarkup
                                  ?.landmarkMarkupType === "flat" ? (
                                  <span className="">
                                    {`${priceConversion(
                                      quotationList?.clientMarkup
                                        ?.landmarkMarkup,
                                      selectedCurrency,
                                      true
                                    )} OFF`}
                                  </span>
                                ) : (
                                  <span className="">
                                    {quotationList?.clientMarkup
                                      ?.landmarkMarkup + " %"}
                                  </span>
                                )}
                              </p>
                            )}
                            <p
                              onClick={() => {
                                setIsMarkupModalOpen({
                                  clientMarkup: true,
                                  subAgentMarkup: false,
                                });
                                setModalType({
                                  land: true,
                                  hotel: false,
                                  visa: false,
                                });
                              }}
                              className="text-2xl text-blue-500"
                            >
                              <CiEdit />
                            </p>
                          </div>
                          {isMarkupModalopen.clientMarkup && modalType.land ? (
                            <ClientMarkupModal
                              setIsMarkupModalopen={setIsMarkupModalOpen}
                              quotationList={quotationList}
                              setQuotationList={setQuotationList}
                              modalType={"land"}
                            />
                          ) : (
                            ""
                          )}
                        </td>
                        {/* <td className="p-3">
                          <div className="flex gap-2 items-center">
                            {quotationList?.subAgentMarkup?.landmarkMarkup ===
                            0 ? (
                              <p className="">N/A</p>
                            ) : (
                              <p className="flex gap-1">
                                {quotationList?.subAgentMarkup
                                  ?.landmarkMarkupType === "flat" ? (
                                  <span className="">
                                    {`${priceConversion(
                                      quotationList?.subAgentMarkup
                                        ?.landmarkMarkup,
                                      selectedCurrency,
                                      true
                                    )} OFF`}
                                  </span>
                                ) : (
                                  <span className="">
                                    {quotationList?.subAgentMarkup
                                      ?.landmarkMarkup + " %"}
                                  </span>
                                )}
                              </p>
                            )}
                            <p
                              onClick={() => {
                                setIsMarkupModalOpen({
                                  clientMarkup: false,
                                  subAgentMarkup: true,
                                });
                                setModalType({
                                  land: true,
                                  hotel: false,
                                  visa: false,
                                });
                              }}
                              className="text-2xl text-blue-500"
                            >
                              <CiEdit />
                            </p>
                          </div>
                          {isMarkupModalopen.subAgentMarkup &&
                          modalType.land ? (
                            <SubAgentMarkupModal
                              setIsMarkupModalopen={setIsMarkupModalOpen}
                              quotationList={quotationList}
                              setQuotationList={setQuotationList}
                              modalType={"land"}
                            />
                          ) : (
                            ""
                          )}
                        </td> */}
                      </tr>
                      <tr>
                        <td className="p-3">2</td>
                        <td className="p-3">Hotel</td>
                        <td className="p-3">
                          <div className="flex gap-2 items-center">
                            {quotationList?.clientMarkup?.hotelMarkup === 0 ? (
                              <p className="">N/A</p>
                            ) : (
                              <p className="flex gap-1">
                                {quotationList?.clientMarkup
                                  ?.hotelMarkupType === "flat" ? (
                                  <span className="">
                                    {`${priceConversion(
                                      quotationList?.clientMarkup?.hotelMarkup,
                                      selectedCurrency,
                                      true
                                    )} OFF`}
                                  </span>
                                ) : (
                                  <span className="">
                                    {quotationList?.clientMarkup
                                      ?.hotelMarkupType + " %"}
                                  </span>
                                )}
                              </p>
                            )}
                            <p
                              onClick={() => {
                                setIsMarkupModalOpen({
                                  clientMarkup: true,
                                  subAgentMarkup: false,
                                });
                                setModalType({
                                  land: false,
                                  hotel: true,
                                  visa: false,
                                });
                              }}
                              className="text-2xl text-blue-500"
                            >
                              <CiEdit />
                            </p>
                          </div>
                          {isMarkupModalopen.clientMarkup && modalType.hotel ? (
                            <ClientMarkupModal
                              setIsMarkupModalopen={setIsMarkupModalOpen}
                              quotationList={quotationList}
                              setQuotationList={setQuotationList}
                              modalType={"hotel"}
                            />
                          ) : (
                            ""
                          )}
                        </td>
                        {/* <td className="p-3">
                          <div className="flex gap-2 items-center">
                            {quotationList?.subAgentMarkup?.hotelMarkup ===
                            0 ? (
                              <p className="">N/A</p>
                            ) : (
                              <p className="flex gap-1">
                                {quotationList?.subAgentMarkup
                                  ?.hotelMarkupType === "flat" ? (
                                  <span className="">
                                    {`${priceConversion(
                                      quotationList?.subAgentMarkup
                                        ?.hotelMarkup,
                                      selectedCurrency,
                                      true
                                    )} OFF`}
                                  </span>
                                ) : (
                                  <span className="">
                                    {quotationList?.subAgentMarkup
                                      ?.hotelMarkup + " %"}
                                  </span>
                                )}
                              </p>
                            )}
                            <p
                              onClick={() => {
                                setIsMarkupModalOpen({
                                  clientMarkup: false,
                                  subAgentMarkup: true,
                                });
                                setModalType({
                                  land: false,
                                  hotel: true,
                                  visa: false,
                                });
                              }}
                              className="text-2xl text-blue-500"
                            >
                              <CiEdit />
                            </p>
                          </div>
                          {isMarkupModalopen.subAgentMarkup &&
                          modalType.hotel ? (
                            <SubAgentMarkupModal
                              setIsMarkupModalopen={setIsMarkupModalOpen}
                              quotationList={quotationList}
                              setQuotationList={setQuotationList}
                              modalType={"hotel"}
                            />
                          ) : (
                            ""
                          )}
                        </td> */}
                      </tr>
                      <tr>
                        <td className="p-3">3</td>
                        <td className="p-3">Visa</td>
                        <td className="p-3">
                          <div className="flex gap-2 items-center">
                            {quotationList?.clientMarkup?.visaMarkup === 0 ? (
                              <p className="">N/A</p>
                            ) : (
                              <p className="flex gap-1">
                                {quotationList?.clientMarkup?.visaMarkupType ===
                                "flat" ? (
                                  <span className="">
                                    {`${priceConversion(
                                      quotationList?.clientMarkup?.visaMarkup,
                                      selectedCurrency,
                                      true
                                    )} OFF`}
                                  </span>
                                ) : (
                                  <span className="">
                                    {quotationList?.clientMarkup
                                      ?.visaMarkupType + " %"}
                                  </span>
                                )}
                              </p>
                            )}
                            <p
                              onClick={() => {
                                setIsMarkupModalOpen({
                                  clientMarkup: true,
                                  subAgentMarkup: false,
                                });
                                setModalType({
                                  land: false,
                                  hotel: false,
                                  visa: true,
                                });
                              }}
                              className="text-2xl text-blue-500"
                            >
                              <CiEdit />
                            </p>
                          </div>
                          {isMarkupModalopen.clientMarkup && modalType.visa ? (
                            <ClientMarkupModal
                              setIsMarkupModalopen={setIsMarkupModalOpen}
                              quotationList={quotationList}
                              setQuotationList={setQuotationList}
                              modalType={"visa"}
                            />
                          ) : (
                            ""
                          )}
                        </td>
                        {/* <td className="p-3">
                          <div className="flex gap-2 items-center">
                            {quotationList?.subAgentMarkup?.visaMarkup === 0 ? (
                              <p className="">N/A</p>
                            ) : (
                              <p className="flex gap-1">
                                {quotationList?.subAgentMarkup
                                  ?.visaMarkupType === "flat" ? (
                                  <span className="">
                                    {`${priceConversion(
                                      quotationList?.subAgentMarkup?.visaMarkup,
                                      selectedCurrency,
                                      true
                                    )} OFF`}
                                  </span>
                                ) : (
                                  <span className="">
                                    {quotationList?.subAgentMarkup
                                      ?.visaMarkupType + " %"}
                                  </span>
                                )}
                              </p>
                            )}
                            <p
                              onClick={() => {
                                setIsMarkupModalOpen({
                                  clientMarkup: false,
                                  subAgentMarkup: true,
                                });
                                setModalType({
                                  land: false,
                                  hotel: false,
                                  visa: true,
                                });
                              }}
                              className="text-2xl text-blue-500"
                            >
                              <CiEdit />
                            </p>
                          </div>
                          {isMarkupModalopen.subAgentMarkup &&
                          modalType.visa ? (
                            <SubAgentMarkupModal
                              setIsMarkupModalopen={setIsMarkupModalOpen}
                              quotationList={quotationList}
                              setQuotationList={setQuotationList}
                              modalType={"visa"}
                            />
                          ) : (
                            ""
                          )}
                        </td> */}
                      </tr>
                    </tbody>
                  )}
                </>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={4} className="w-full py-5">
                      <PageLoader />
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuotationMarkupIndex;
