import React, { useState } from "react";
import { BtnLoader } from "../../components";
import axios from "../../../axios";
import { useDispatch, useSelector } from "react-redux";
import { setAlertSuccess } from "../../../redux/slices/homeSlice";
import { useNavigate } from "react-router-dom";

function ProfileSettings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { agent, token } = useSelector((state) => state.agents);

  const [data, setData] = useState({
    name: agent?.name || "",
    country: agent?.country?._id || "",
    phoneNumber: agent?.phoneNumber || "",
    telephoneNumber: agent?.telephoneNumber || "",
    email: agent?.email || "",
    designation: agent?.designation || "",
    skypeId: agent?.skypeId || "",
    whatsappNumber: agent?.whatsappNumber || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { countries, currencies } = useSelector((state) => state.home);

  const onChangeHandler = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

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
        "/b2b/resellers/auth/update/profileSetings",
        data,
        config
      );
      setIsLoading(false);

      dispatch(
        setAlertSuccess({
          status: true,
          title: "Success!",
          text: "Update Successful",
        })
      );
      navigate("/");
      return response.data;
    } catch (err) {
      setError(err?.response?.data?.error || "Something went wrong, Try again");
      setIsLoading(false);
    }
  };

  const countryArray = countries?.filter((item) => item._id === data.country);
  const currencyArray = currencies?.filter(
    (item) => item?.country?._id === data.country
  );

  return (
    <div className="py-10 px-5 shadow-round rounded-sm">
      <form onSubmit={submitHandler}>
        <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
          <div className="space-y-3">
            <div className="text-xs text-grayColor">Agent Name</div>
            <input
              className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
              type="text"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
            />
          </div>

          <div className="space-y-3">
            <div className="text-xs text-grayColor">Nationality</div>
            <select
              className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
              name="country"
              value={data.country}
              onChange={onChangeHandler}
            >
              <option hidden>Ex: United Arab Emirates</option>
              {countries?.map((item, index) => (
                <option className="capitalize" value={item?._id} key={index}>
                  {item?.countryName}{" "}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-full gap-2">
            <div className="space-y-3 w-2/12">
              <div className="text-xs text-grayColor">Code</div>
              <input
                className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
                type="text"
                value={countryArray?.map((item) => item?.phonecode) || ""}
                readOnly
              />
            </div>
            <div className="space-y-3 w-10/12">
              <div className="text-xs text-grayColor">Number</div>
              <input
                className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
                type="number"
                name="phoneNumber"
                value={data.phoneNumber}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="flex gap-2 w-full">
            <div className="space-y-3 w-2/12">
              <div className="text-xs text-grayColor">Code</div>
              <input
                className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
                type="text"
                value={countryArray?.map((item) => item?.phonecode) || ""}
                readOnly
              />
            </div>
            <div className="space-y-3 w-10/12">
              <div className="text-xs text-grayColor">Telephone</div>
              <input
                className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full "
                type="number"
                name="telephoneNumber"
                value={data.telephoneNumber}
                onChange={onChangeHandler}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs text-grayColor">Email</div>
            <input
              className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
              type="email"
              name="email"
              value={data.email}
              onChange={onChangeHandler}
            />
          </div>

          <div className="space-y-3">
            <div className="text-xs text-grayColor">Preffered Currency</div>
            <input
              className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
              type="text"
              value={
                currencyArray?.length > 0
                  ? currencyArray?.map((item) => item?.currencySymbol)
                  : "د.إ"
              }
              readOnly
            />
          </div>

          <div className="space-y-3">
            <div className="text-xs text-grayColor">Designation</div>
            <input
              className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
              type="text"
              name="designation"
              value={data.designation}
              onChange={onChangeHandler}
            />
          </div>

          <div className="space-y-3">
            <div className="text-xs text-grayColor">Skype Id</div>
            <input
              className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
              type="text"
              name="skypeId"
              value={data.skypeId}
              onChange={onChangeHandler}
            />
          </div>

          <div className="space-y-3">
            <div className="text-xs text-grayColor">Whatsapp</div>
            <input
              className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
              type="number"
              name="whatsappNumber"
              value={data.whatsappNumber}
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-end gap-[12px]">
          {error && (
            <div className="flex justify-end">
              <p className="text-main text-xs capitalize">{error} </p>
            </div>
          )}
          <button
            className="bg-BEColor text-white px-5 h-8 rounded-sm text-xs shadow-mn"
            type="submit"
          >
            {isLoading ? <BtnLoader /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileSettings;
