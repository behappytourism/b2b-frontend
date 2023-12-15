import React, { useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../axios";
import { useHandleClickOutside } from "../../../hooks";
import { BtnLoader } from "../../components";
import moment from "moment";
import {
  setAlertError,
  setAlertSuccess,
} from "../../../redux/slices/homeSlice";
import { useNavigate } from "react-router-dom";

function PayLaterModal({
  setIsPayLaterModalOpen,
  appliedHotelRate,
  createData,
  contactDetails,
  specialRequest,
}) {
  const dispatch = useDispatch();
  const wrapperRef = useRef();
  const navigate = useNavigate();
  useHandleClickOutside(wrapperRef, () => setIsPayLaterModalOpen(false));
  const { token } = useSelector((state) => state.agents);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { travellerDetails } = useSelector((state) => state.hotel);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setError("");
      setIsLoading(true);

      const filteredTravellerDetails = await travellerDetails?.map((item) => {
        return {
          roomId: item?.roomId,
          title: item?.title,
          firstName: item?.firstName,
          lastName: item?.lastName,
        };
      });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `/b2b/hotels/orders/complete/pay-later`,
        {
          rateKey: appliedHotelRate.rateKey,
          hotelId: createData?.hotelId,
          searchId: createData?.searchId,
          travellerDetails: filteredTravellerDetails,
          contactDetails: contactDetails,
          specialRequest: specialRequest,
        },
        config
      );
      dispatch(
        setAlertSuccess({
          status: true,
          title: "Order Success!",
          text: "Order Completed Successfully",
        })
      );
      navigate(`/hotel/invoice/${response.data?._id}`);
      setIsLoading(false);
      setIsPayLaterModalOpen(false);
    } catch (err) {
      dispatch(
        setAlertError({
          status: true,
          title: "Something went wrong!",
          text: err?.response?.data?.error,
        })
      );
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
          <div className="text-gray-400 flex justify-center py-5">
            <div className="mt-2">
              <div className="flex justify-center w-full">
                <div class="flex items-center justify-center w-12 h-12 p-2 mb-5 bg-gray-200 text-blue-500 rounded-full text-2xl">
                  <svg
                    viewBox="0 0 1024 1024"
                    fill="#0000ff"
                    class="icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M799.94 803.376a7.992 7.992 0 0 1-7.996-7.998V512c0-17.636-14.358-31.994-31.994-31.994s-31.994 14.358-31.994 31.994v39.992c0 4.42-3.578 7.998-7.998 7.998s-7.998-3.578-7.998-7.998V512c0-26.462 21.528-47.99 47.99-47.99S807.94 485.538 807.94 512v283.378a7.994 7.994 0 0 1-8 7.998zM384.028 906.292a7.99 7.99 0 0 1-6.796-3.782L233.574 671.06c-6.672-11.56-8.422-24.776-5.032-37.414 3.39-12.654 11.498-23.212 22.84-29.76 23.416-13.512 53.458-5.466 66.956 17.934l72.578 106.634a7.99 7.99 0 0 1-2.11 11.108 7.96 7.96 0 0 1-11.108-2.11l-72.89-107.134c-9.42-16.278-29.666-21.712-45.428-12.574a32.744 32.744 0 0 0-15.388 20.042 32.848 32.848 0 0 0 3.296 25.058l143.534 231.232a8.004 8.004 0 0 1-6.794 12.216zM687.962 559.99a7.994 7.994 0 0 1-7.998-7.998V512c0-17.636-14.356-31.994-31.992-31.994-17.638 0-31.994 14.358-31.994 31.994v39.992c0 4.42-3.578 7.998-7.998 7.998s-7.998-3.578-7.998-7.998V512c0-26.462 21.528-47.99 47.99-47.99s47.99 21.528 47.99 47.99v39.992a7.994 7.994 0 0 1-8 7.998zM575.986 559.99a7.994 7.994 0 0 1-7.998-7.998V512c0-17.636-14.356-31.994-31.994-31.994-17.636 0-31.992 14.358-31.992 31.994v39.992a7.994 7.994 0 0 1-7.998 7.998 7.994 7.994 0 0 1-7.998-7.998V512c0-26.462 21.526-47.99 47.988-47.99 26.464 0 47.992 21.528 47.992 47.99v39.992a7.994 7.994 0 0 1-8 7.998zM384.028 703.96c-4.422 0-8-3.578-8-8V256.052c0-26.462 21.528-47.99 47.99-47.99 26.464 0 47.99 21.528 47.99 47.99v295.94a7.994 7.994 0 0 1-7.998 7.998 7.994 7.994 0 0 1-7.998-7.998v-295.94c0-17.636-14.358-31.994-31.994-31.994s-31.992 14.356-31.992 31.994V695.96c0 4.422-3.578 8-7.998 8z"
                        fill=""
                      ></path>
                      <path
                        d="M579.424 1023.894a7.994 7.994 0 0 1-7.998-8 7.994 7.994 0 0 1 7.998-7.998c117.18 0 212.52-95.338 212.52-212.518a7.992 7.992 0 0 1 7.996-7.998c4.422 0 8 3.576 8 7.998 0 126.004-102.512 228.516-228.516 228.516z"
                        fill=""
                      ></path>
                      <path
                        d="M579.424 1023.894c-85.044 0-162.514-46.696-202.194-121.868a8.004 8.004 0 0 1 3.344-10.808 8.034 8.034 0 0 1 10.81 3.342c36.898 69.908 108.946 113.336 188.04 113.336a7.994 7.994 0 0 1 7.998 7.998c0 4.422-3.576 8-7.998 8zM496.004 402.664a8 8 0 0 1-7.466-5.124 8.016 8.016 0 0 1 4.592-10.342c73.484-28.37 122.85-100.354 122.85-179.134 0-105.852-86.108-191.96-191.96-191.96s-191.958 86.108-191.958 191.96c0 78.766 49.348 150.75 122.802 179.12a8.02 8.02 0 0 1 4.576 10.358c-1.594 4.108-6.216 6.14-10.358 4.578-79.56-30.758-133.02-108.728-133.02-194.054C216.062 93.402 309.356 0.108 424.02 0.108S631.978 93.4 631.978 208.066c0 85.342-53.488 163.326-133.098 194.07a8.138 8.138 0 0 1-2.876 0.528z"
                        fill=""
                      ></path>
                      <path
                        d="M351.97 450.638c-0.954 0-1.938-0.172-2.89-0.532-79.56-30.758-133.02-108.728-133.02-194.054a7.994 7.994 0 0 1 8-7.998 7.994 7.994 0 0 1 7.998 7.998c0 78.766 49.348 150.75 122.802 179.12a8.02 8.02 0 0 1 4.576 10.358 8.012 8.012 0 0 1-7.466 5.108zM496.004 450.654a8.004 8.004 0 0 1-7.466-5.124 8.016 8.016 0 0 1 4.592-10.342c73.484-28.37 122.85-100.354 122.85-179.134a7.994 7.994 0 0 1 7.998-7.998 7.994 7.994 0 0 1 7.998 7.998c0 85.342-53.488 163.326-133.098 194.07-0.936 0.358-1.92 0.53-2.874 0.53z"
                        fill=""
                      ></path>
                      <path
                        d="M623.976 264.05a7.994 7.994 0 0 1-7.998-7.998v-47.99a7.994 7.994 0 0 1 7.998-7.998 7.994 7.994 0 0 1 7.998 7.998v47.99a7.992 7.992 0 0 1-7.998 7.998zM224.06 264.05c-4.422 0-8-3.578-8-7.998v-47.99a7.994 7.994 0 0 1 8-7.998 7.994 7.994 0 0 1 7.998 7.998v47.99a7.994 7.994 0 0 1-7.998 7.998zM320.04 434.86a7.994 7.994 0 0 1-7.998-7.998v-47.99a7.994 7.994 0 0 1 7.998-7.998c4.422 0 8 3.578 8 7.998v47.99c0 4.42-3.58 7.998-8 7.998z"
                        fill=""
                      ></path>
                      <path
                        d="M527.998 434.86c-4.422 0-8-3.578-8-7.998v-47.99a7.994 7.994 0 0 1 8-7.998 7.992 7.992 0 0 1 7.996 7.998v47.99a7.992 7.992 0 0 1-7.996 7.998z"
                        fill=""
                      ></path>
                      <path
                        d="M575.986 393.962a7.994 7.994 0 0 1-7.998-8v-47.974a7.994 7.994 0 0 1 7.998-7.998c4.422 0 8 3.578 8 7.998v47.974c0 4.422-3.578 8-8 8z"
                        fill=""
                      ></path>
                      <path
                        d="M272.048 393.978a7.994 7.994 0 0 1-7.998-8v-47.99a7.994 7.994 0 0 1 7.998-7.998c4.422 0 8 3.578 8 7.998v47.99c0 4.422-3.578 8-8 8z"
                        fill=""
                      ></path>
                      <path
                        d="M416.02 192.066a7.994 7.994 0 0 1-7.998-7.998v-15.998c0-4.42 3.578-8 7.998-8a7.994 7.994 0 0 1 7.998 8v15.998a7.994 7.994 0 0 1-7.998 7.998z"
                        fill=""
                      ></path>
                      <path
                        d="M448.014 192.066a7.994 7.994 0 0 1-7.998-7.998V120.082c0-4.42 3.576-8 7.998-8a7.994 7.994 0 0 1 7.998 8v63.988a7.994 7.994 0 0 1-7.998 7.996z"
                        fill=""
                      ></path>
                      <path
                        d="M384.028 160.072a8.02 8.02 0 0 1-7.156-4.42 8.008 8.008 0 0 1 3.578-10.732l63.986-31.994a7.988 7.988 0 0 1 10.732 3.578 8.006 8.006 0 0 1-3.578 10.732l-63.986 31.992a7.964 7.964 0 0 1-3.576 0.844z"
                        fill=""
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>
              <h1 className="text-2xl text-center font-bold">Pay Later</h1>
            </div>
          </div>
          <div className="px-6 pb-6">
            <div className="text-center font-medium font-demo">
              Your order will be cancelled if you fail to make the complete
              payment before (
              {moment(appliedHotelRate?.lastDateForPayment).format(
                "DD/MM/YYYY"
              )}
              )
            </div>
            {error && (
              <div className="text-red-600 text-xs text-right font-medium">
                {error}
              </div>
            )}
            <div className="flex justify-end gap-3 pt-6">
              <button
                onClick={() => setIsPayLaterModalOpen(false)}
                className="text-white text-sm rounded px-4 py-2 shadow-mn bg-gray-400"
              >
                Cancel
              </button>
              <form onSubmit={submitHandler}>
                <button
                  type="submit"
                  className="text-white text-sm rounded px-4 py-2 shadow-mn bg-blue-600"
                >
                  {isLoading ? <BtnLoader /> : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PayLaterModal;
