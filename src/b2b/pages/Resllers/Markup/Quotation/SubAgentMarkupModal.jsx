import React, { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../../../axios";
import { useHandleClickOutside } from "../../../../../hooks";
import { BtnLoader } from "../../../../components";
import {
  setAlertError,
  setAlertSuccess,
} from "../../../../../redux/slices/homeSlice";

function SubAgentMarkupModal({
  setIsMarkupModalopen,
  quotationList,
  setQuotationList,
  modalType,
}) {
  const dispatch = useDispatch();
  const wrapperRef = useRef();
  useHandleClickOutside(wrapperRef, () =>
    setIsMarkupModalopen({ clientMarkup: false, subAgentMarkup: false })
  );

  const { token } = useSelector((state) => state.agents);

  const [markupType, setMarkupType] = useState("");
  const [markupAmount, setMarkupAmount] = useState(0);

  useEffect(() => {
    if (modalType === "land") {
      setMarkupType(quotationList?.subAgentMarkup?.landmarkMarkupType);
      setMarkupAmount(quotationList?.subAgentMarkup?.landmarkMarkup);
    } else if (modalType === "hotel") {
      setMarkupType(quotationList?.subAgentMarkup?.hotelMarkupType);
      setMarkupAmount(quotationList?.subAgentMarkup?.hotelMarkup);
    } else if (modalType === "visa") {
      setMarkupType(quotationList?.subAgentMarkup?.visaMarkupType);
      setMarkupAmount(quotationList?.subAgentMarkup?.visaMarkup);
    }
  }, [modalType, quotationList]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setError("");
      setIsLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let data = {};

      if (modalType === "land") {
        data = {
          ...quotationList?.subAgentMarkup,
          landmarkMarkup: markupAmount,
          landmarkMarkupType: markupType,
        };
      } else if (modalType === "hotel") {
        data = {
          ...quotationList?.subAgentMarkup,
          hotelMarkup: markupAmount,
          hotelMarkupType: markupType,
        };
      } else if (modalType === "visa") {
        data = {
          ...quotationList?.subAgentMarkup,
          visaMarkup: markupAmount,
          visaMarkupType: markupType,
        };
      }
      const response = await axios.patch(
        `/b2b/quotation/markup/sub-agent/upsert`,
        data,
        config
      );
      console.log(response?.data);

      setIsLoading(false);
      dispatch(
        setAlertSuccess({
          status: true,
          title: "Markup Added!",
          text: `Markup is added to ${modalType} successfully!!`,
        })
      );
      setQuotationList((prev) => {
        return { ...prev, subAgentMarkup: data };
      });
      setIsMarkupModalopen({ clientMarkup: false, subAgentMarkup: false });
      return response.data;
    } catch (err) {
      dispatch(
        setAlertError({
          status: true,
          title: "Something went wrong!",
          text: `Markup is not added. please try again!!`,
        })
      );
      setError(err?.response?.data?.error || "Something went wrong, Try again");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 w-full h-full temp_lightglass flex items-center justify-center z-20 ">
        <div
          ref={wrapperRef}
          className="bg-[#fff] w-full max-h-[90vh] max-w-[500px] rounded shadow-[0_1rem_3rem_rgb(0_0_0_/_18%)] overflow-y-auto"
        >
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="font-medium mb-2">Agent Markup</h2>
            <button
              className="h-auto bg-transparent text-textColor text-xl"
              onClick={() =>
                setIsMarkupModalopen({
                  clientMarkup: false,
                  subAgentMarkup: false,
                })
              }
            >
              <MdClose />
            </button>
          </div>
          <div className="p-6">
            <form onSubmit={submitHandler} className="space-y-3">
              <h2 className="font-medium capitalize">{modalType}</h2>
              <div>
                <label htmlFor="" className="label">
                  Markup Type*
                </label>
                <select
                  className="w-full border rounded h-10 px-2 outline-none focus:border-green-500"
                  type="text"
                  placeholder="Enter Flat Amount"
                  value={markupType}
                  onChange={(e) => setMarkupType(e.target.value)}
                >
                  <option className="text-text" hidden>
                    Choose Markup Type
                  </option>
                  <option value={"flat"}>Flat</option>
                  <option value={"percentage"}>Percentage</option>
                </select>
              </div>
              <div>
                <label htmlFor="" className="label">
                  Mark up*
                </label>
                <input
                  className="w-full border rounded h-10 px-2 outline-none focus:border-green-500"
                  type="number"
                  placeholder="Enter Percentage"
                  value={markupAmount < 0 ? 0 : markupAmount}
                  onChange={(e) => setMarkupAmount(e.target.value)}
                />
              </div>
              <div className="mt-4 flex items-center justify-end gap-[12px]">
                {error && <p className="text-main text-xs"> {error}</p>}
                <span
                  className="w-[100px] h-[40px] text-[14px] bg-orange-600 text-white rounded-[0.25rem] flex justify-center items-center font-[600] cursor-pointer"
                  onClick={() => {
                    setIsMarkupModalopen({
                      clientMarkup: false,
                      subAgentMarkup: false,
                    });
                  }}
                >
                  Back
                </span>
                <button className="w-[100px] button" type="submit">
                  {isLoading ? <BtnLoader /> : "Mark"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubAgentMarkupModal;
