import React, { useEffect, useRef, useState } from "react";
import { useHandleClickOutside } from "../../../hooks";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../axios";
import { BtnLoader } from "../../components";
import { useParams } from "react-router-dom";
import { setAlertSuccess } from "../../../redux/slices/homeSlice";

export default function A2aEditPersonalInfoModal({
  setIsEditModalOpen,
  isEditModalOpen,
  item,
  index,
  passengerDetail,
  setPassengerDetail,
}) {
  const wrapperRef = useRef();
  const dispatch = useDispatch();

  console.log(item?.lastName);
  const [data, setData] = useState({
    title: item?.title || "",
    firstName: item?.firstName || "",
    lastName: item?.lastName || "",
    nationality: item?.nationality || "",
    phoneNumber: item?.phoneNumber || "",
    code: item?.code || "",
    passportNo: item?.passportNo || "",
    reference: item?.reference || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [code, setCode] = useState({});

  useHandleClickOutside(wrapperRef, () => setIsEditModalOpen(false));

  const params = useParams();

  const { token } = useSelector((state) => state.agents);

  const { countries } = useSelector((state) => state.home);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const response = await axios.patch(
        `/b2b/a2a/orders/${params.id}/update/${item?._id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(
        setAlertSuccess({
          status: true,
          title: "Updated Success!",
          text: "Details Updated Successfully",
        })
      );
      let temp = passengerDetail;
      temp[index] = response?.data;
      setPassengerDetail(temp);
      setIsLoading(false);
      setIsEditModalOpen(false);
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let result = countries?.find((item) => {
      if (item?._id === data.nationality) {
        let res = item;
        return res;
      }
    });
    setCode(result);
  }, [data.nationality]);

  return (
    <div
      className={
        "fixed inset-0 w-full h-full lightglass flex items-center justify-center z-20 " +
        (isEditModalOpen ? "block" : "hidden")
      }
    >
      <div
        ref={wrapperRef}
        className="bg-[#fff] w-full max-h-[90vh] max-w-[400px]  rounded-xl shadow-[0_1rem_3rem_rgb(0_0_0_/_18%)] overflow-y-auto"
      >
        <div className="bg-primaryColor text-white flex items-center justify-between border-b p-4">
          <h2 className="font-medium mb-2">Edit Passenger Details</h2>
          <button
            className="h-auto bg-transparent text-white text-xl"
            onClick={() => setIsEditModalOpen(false)}
          >
            <MdClose />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 text-darktext space-y-2">
          <div className="block space-y-1">
            <p className="text-xs">Title </p>
            <select
              name="title"
              value={data?.title}
              onChange={handleChange}
              className="outline-none focus:border-green-500 border border-grayColor rounded w-full text-sm px-2 py-1"
            >
              <option value="mr">Mr</option>
              <option value="ms">Ms</option>
              <option value="mrs">Mrs</option>
              <option value="mstr">Mstr</option>
            </select>
          </div>
          <div className="block space-y-1">
            <p className="text-xs">First Name</p>
            <input
              className="outline-none focus:border-green-500 border border-grayColor rounded w-full text-sm px-2 py-1"
              type="text"
              name="firstName"
              value={data?.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="block space-y-1">
            <p className="text-xs">Last Name</p>
            <input
              className="outline-none focus:border-green-500 border border-grayColor rounded w-full text-sm px-2 py-1"
              type="text"
              name="lastName"
              value={data?.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="block space-y-1">
            <p className="text-xs">Nationality</p>
            <select
              name="nationality"
              value={data?.nationality}
              onChange={handleChange}
              className="outline-none focus:border-green-500 border border-grayColor rounded w-full text-sm px-2 py-1"
            >
              <option hidden></option>
              {countries?.map((item) => (
                <option key={item?._id} value={item?._id}>
                  {item?.countryName}
                </option>
              ))}
            </select>
          </div>
          <div className="block space-y-1">
            <p className="text-xs">Phone Number</p>
            <div className="flex gap-1">
              <input
                className="outline-none focus:border-green-500 border border-grayColor rounded w-[20%] text-sm px-2 py-1 no-spinner"
                type="text"
                value={code?.phonecode}
                onChange={handleChange}
              />
              <input
                className="outline-none focus:border-green-500 border border-grayColor rounded w-[80%] text-sm px-2 py-1"
                type="number"
                name="phoneNumber"
                value={data?.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="block space-y-1">
            <p className="text-xs">Passport Number</p>
            <input
              className="outline-none focus:border-green-500 border border-grayColor rounded w-full text-sm px-2 py-1"
              type="text"
              name="passportNo"
              value={data?.passportNo}
              onChange={handleChange}
            />
          </div>
          <div className="block space-y-1">
            <p className="text-xs">Reference</p>
            <input
              className="outline-none focus:border-green-500 border border-grayColor rounded w-full text-sm px-2 py-1"
              type="text"
              name="reference"
              value={data?.reference}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-white font-[600] text-[12px] bg-primaryColor rounded px-5 py-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
