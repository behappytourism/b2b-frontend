import React, { useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import {  useSelector } from "react-redux";
import axios from "../../../axios";
import { useHandleClickOutside } from "../../../hooks";
import { BtnLoader } from "../../components";

function ClientMarkupModal({
  setIsMarkup,
  setMarkupData,
  markupData,
  roomTypeId,
  roomName,
}) {

  console.log('hihiih');

  const wrapperRef = useRef();
  useHandleClickOutside(wrapperRef, () =>
    setIsMarkup(false)
  );

  const { token } = useSelector((state) => state.agents);
console.log(markupData);
  const [markupType, setMarkupType] = useState(
    markupData?.client?.markupType || ""
  );
  const [markupAmount, setMarkupAmount] = useState(
    markupData?.client?.markup || 0
  );
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
      const response = await axios.patch(
        "/b2b/hotels/markup/client/room-type/upsert",
        {
          markup: markupAmount,
          markupType: markupType,
          roomTypeId: roomTypeId,
        },
        config
      );

      setIsLoading(false);
      setIsMarkup(false);
      setMarkupData((prev) => {
        return { ...prev, client: response.data };
      });
      return response.data;
    } catch (err) {
      setError(err?.response?.data?.error || "Something went wrong, Try again");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full temp_lightglass flex items-center justify-center z-20 ">
        <div
          ref={wrapperRef}
          className="bg-[#fff] w-full max-h-[90vh] max-w-[500px] rounded shadow-[0_1rem_3rem_rgb(0_0_0_/_18%)] overflow-y-auto"
        >
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="font-medium mb-2">Client Markup</h2>
            <button
              className="h-auto bg-transparent text-textColor text-xl"
              onClick={() => setIsMarkup(false)}
            >
              <MdClose />
            </button>
          </div>
          <div className="p-6">
            <form onSubmit={submitHandler} className="space-y-3">
              <h2 className="font-medium capitalize">{roomName}</h2>
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
                  className="cursor-pointer w-[100px] h-[40px] text-[14px] bg-orange-600 text-white rounded-[0.25rem] flex justify-center items-center font-[600]"
                  onClick={() => {
                    setIsMarkup(false);
                  }}
                >
                  Close
                </span>
                <button className="w-[100px] button" type="submit">
                  {isLoading ? <BtnLoader /> : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientMarkupModal;
