import React, { useState, useRef } from 'react'
import { MdClose } from "react-icons/md";
import axios from '../../../../../axios'
import { BtnLoader } from '../../../../components';
import { useHandleClickOutside } from '../../../../../hooks';
import { useSelector } from 'react-redux';


function TransferMarkupModal({setMarkup, setMarkupData, markupData, vehicle, transferId, setShowVehicles, subAgentId}) {


    const wrapperRef = useRef();
    useHandleClickOutside(wrapperRef, () => setMarkup(false));

    const [markupType, setMarkupType] = useState(markupData?.markupType || "");
    const [markupAmount, setMarkupAmount] = useState(markupData?.markup || 0);
    const [isLoading, setIsLoading] = useState(false);
     const [error, setError] = useState("");

    const { token } = useSelector((state) => state.agents);

    const submitHandler = async (e)=>{
      console.log('hihih');
      try {
          e.preventDefault()
          setIsLoading(true)
          const res = await axios.post(`/b2b/transfer/sub-agent/markup/update-single-transfer-profile`, {
              transferId: transferId,
              vehicleId: vehicle?.vehicleId,
              markup: markupAmount,
              markupType: markupType,
              resellerId: subAgentId
          }, {
              headers: { Authorization: `Bearer ${token}`}
          })
          setIsLoading(false)
          setMarkup(false)
          setShowVehicles(false)
      } catch (err) {
        console.log(err);
            setError(err?.response?.data?.error || "Something went wrong, Try again");
              setIsLoading(false)
      }
  }

  return (
    <div>
    <div className="fixed inset-0 w-full h-full lightglass flex items-center justify-center z-20 ">
      <div
        ref={wrapperRef}
        className="bg-[#fff] w-full max-h-[90vh] max-w-[500px] rounded shadow-[0_1rem_3rem_rgb(0_0_0_/_18%)] overflow-y-auto"
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="font-medium mb-2">Client Markup</h2>
          <button
            className="h-auto bg-transparent text-textColor text-xl"
            onClick={() => setMarkup(false)}
          >
            <MdClose />
          </button>
        </div>
        <div className="p-6">
          <form onSubmit={submitHandler} className="space-y-3">
            <h2 className="font-medium">{vehicle?.vehicleName}</h2>
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
                  setMarkup(false);
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
  )
}

export default TransferMarkupModal
