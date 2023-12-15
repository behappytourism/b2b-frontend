import React, { useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "../../../axios";
import { useHandleClickOutside } from "../../../hooks";
import { BtnLoader } from "../../components";

function CancellationRemarkModal({ setCancelRemarkModalOpen, hotel, orderId, setStatus }) {
  const wrapperRef = useRef();
  useHandleClickOutside(wrapperRef, () => setCancelRemarkModalOpen(false));
  const { token } = useSelector((state) => state.agents);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [remark, setRemark] = useState("");

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
      const response = await axios.post(
        `/b2b/hotels/orders/cancel/${orderId}`,
        {
          cancellationRemark: remark,
        },
        config
      );
      setStatus({
        status: response?.data?.status,
        cancellationRemark: response?.data?.cancellationRemark,
        cancelledBy: response?.data?.cancelledBy,
      });
      setIsLoading(false);
      setCancelRemarkModalOpen(false);
    } catch (err) {
      console.log(err?.response);
      setError(err?.response?.data?.error || "Something went wrong, Try again");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 w-full h-full lightglass flex items-center justify-center z-20 ">
        <div
          ref={wrapperRef}
          className="bg-[#fff] w-full max-h-[90vh] max-w-[500px] rounded-xl shadow-[0_1rem_3rem_rgb(0_0_0_/_18%)] overflow-y-auto"
        >
          <div className="bg-primaryColor text-white flex items-center justify-between border-b p-4">
            <h2 className="font-medium mb-2">Cancellation Remark</h2>
            <button
              className="h-auto bg-transparent  text-xl"
              onClick={() => setCancelRemarkModalOpen(false)}
            >
              <MdClose />
            </button>
          </div>
          <div className="p-6">
            <form onSubmit={submitHandler} className="space-y-3">
              <h2 className="font-medium">{hotel?.hotelName}</h2>
              <div>
                <label htmlFor="" className="label">
                  Cancellation Remark*
                </label>
                <textarea
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  className="w-full border rounded  p-2 text-sm outline-none focus:border-green-500"
                />
              </div>

              <div className="mt-4 flex items-center justify-end gap-[12px]">
                {error && <p className="text-main text-xs"> {error}</p>}
                <span
                  className="cursor-pointer w-[100px] h-[40px] text-[14px] bg-orange-600 text-white rounded-[0.25rem] flex justify-center items-center font-[600]"
                  onClick={() => {
                    setCancelRemarkModalOpen(false);
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

export default CancellationRemarkModal;
