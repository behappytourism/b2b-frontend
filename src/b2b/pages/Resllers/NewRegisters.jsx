import React, { useEffect, useState } from "react";
import { GiFactory } from "react-icons/gi";
import { GoPerson } from "react-icons/go";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios";
import { BtnLoader } from "../../components";

function NewRegisters() {
  const navigate = useNavigate();

  const { agent, token } = useSelector((state) => state.agents);

  const [data, setData] = useState({
    companyName: "",
    address: "",
    country: "",
    trnNumber: "",
    companyRegistration: "",
    website: "",
    city: "",
    zipCode: "",
    name: "",
    phoneNumber: "",
    telephoneNumber: "",
    email: "",
    designation: "",
    skypeId: "",
    whatsappNumber: "",
  });

  const onChangeHandler = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { countries, UAE } = useSelector((state) => state.home);

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
        "/b2b/resellers/register",
        data,
        config
      );
      setIsLoading(false);
      navigate("/resellers");
      return response.data;
    } catch (err) {
      setError(err?.response?.data?.error || "Something went wrong, Try again");
      setIsLoading(false);
    }
  };

  const countryArray = countries?.filter((item) => item._id === data.country);

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="p-2">
        <form onSubmit={submitHandler}>
          <div className=" lg:mt-3 p-3 ">
            <div className="flex items-center justify-between border-b  p-4">
              <h2 className="text-lg text-gray-400 font-bold tracking-wide space-x-2 flex">
                <span className="">
                  <GiFactory />{" "}
                </span>
                <span className="">Company Details</span>
              </h2>
            </div>
            <div className="space-y-5 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-[25px] mt-7 shadow-round p-5 rounded">
              <div className="space-y-3">
                <div className="text-xs text-grayColor">Travel Agency Name</div>
                <input
                  className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
                  type="text"
                  name="companyName"
                  value={data.companyName}
                  onChange={onChangeHandler}
                  required
                  // readonly
                />
              </div>

              <div className="space-y-3">
                <div className="text-xs text-grayColor">Address</div>
                <input
                  className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
                  type="text"
                  name="address"
                  value={data.address}
                  onChange={onChangeHandler}
                  required
                  // readonly
                />
              </div>

              <div className="space-y-3">
                <div className="text-xs text-grayColor">Nationality</div>
                <select
                  className="border-b outline-none bg-transparent focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full capitalize"
                  name="country"
                  value={data.country}
                  onChange={onChangeHandler}
                  required
                  // readonly
                >
                  <option className="text-text" hidden></option>
                  {countries?.map((item, index) => (
                    <option
                      className="capitalize"
                      value={item?._id}
                      key={index}
                    >
                      {item?.countryName}{" "}
                    </option>
                  ))}
                </select>
              </div>
              {data.country && data.country === UAE?._id && (
                <>
                  <div className="space-y-3">
                    <div className="text-xs text-grayColor">TRN Number</div>
                    <input
                      className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
                      type="number"
                      name="trnNumber"
                      value={data.trnNumber}
                      onChange={onChangeHandler}
                      // readonly
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs text-grayColor">
                      Company Registration Number
                    </div>
                    <input
                      className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
                      type="number"
                      name="companyRegistration"
                      value={data.companyRegistration}
                      onChange={onChangeHandler}
                      // readonly
                    />
                  </div>
                </>
              )}

              <div className="space-y-3">
                <div className="text-xs text-grayColor">Website</div>
                <input
                  className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
                  type="text"
                  name="website"
                  value={data.website}
                  onChange={onChangeHandler}
                />
              </div>

              <div className="space-y-3">
                <div className="text-xs text-grayColor">City</div>
                <input
                  className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
                  type="text"
                  name="city"
                  value={data.city}
                  onChange={onChangeHandler}
                  required
                />
              </div>
              {data.country && data.country !== UAE?._id && (
                <div className="space-y-3">
                  <div className="text-xs text-grayColor">Zip Code</div>
                  <input
                    className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
                    type="number"
                    name="zipCode"
                    value={data.zipCode}
                    onChange={onChangeHandler}
                    required
                  />
                </div>
              )}
            </div>
            <div className="pt-5 lg:pt-10 flex items-center justify-between border-b p-4 ">
              <h2 className="text-lg text-gray-400 font-bold tracking-wide space-x-2 flex items-center">
                <span className="">
                  <GoPerson />{" "}
                </span>
                <span className="">Profile Details</span>
              </h2>
            </div>

            <div className="md:space-y-0 space-y-5 md:grid md:grid-cols-2 lg:grid-cols-3 gap-[25px] mt-7 shadow-round p-5 rounded">
              <div className="space-y-3">
                <div className="text-xs text-grayColor">Agent Name</div>
                <input
                  className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={onChangeHandler}
                  required
                />
              </div>

              <div className=" flex gap-2">
                <div className="space-y-3 w-2/12 ">
                  <div className="text-xs text-grayColor">Code</div>
                  <input
                    className="border-b outline-none  focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
                    value={countryArray?.map((item) => item?.phonecode) || ""}
                    readOnly
                  />
                </div>

                <div className="space-y-3 w-10/12 ">
                  <div className="text-xs text-grayColor">Number</div>
                  <input
                    className=" no-spinner border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
                    type="number"
                    name="phoneNumber"
                    value={data.phoneNumber}
                    onChange={onChangeHandler}
                    required
                  />
                </div>
              </div>

              <div className=" flex gap-2">
                <div className="space-y-3 w-2/12 ">
                  <div className="text-xs text-grayColor">Code</div>
                  <input
                    className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
                    value={countryArray?.map((item) => item?.phonecode) || ""}
                    readOnly
                  />
                </div>

                <div className="space-y-3 w-10/12 ">
                  <div className="text-xs text-grayColor">Telephone Number</div>
                  <input
                    className="no-spinner border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
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
                  required
                />
              </div>

              <div className="space-y-3">
                <div className="text-xs text-grayColor">Preffered Currency</div>
                <input
                  className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
                  type="text"
                  value={
                    countryArray?.map((item) => item?.currencySymbol) || ""
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
                  required
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

              <div className=" flex gap-2">
                <div className="space-y-3 w-2/12 ">
                  <div className="text-xs text-grayColor">Code</div>
                  <input
                    className="border-b outline-none  focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
                    value={countryArray?.map((item) => item?.phonecode) || ""}
                    readOnly
                  />
                </div>
                <div className="space-y-3 w-10/12">
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
            </div>

            <div className="flex justify-end mt-6 gap-[20px] items-center">
              {error && (
                <div className="flex justify-end">
                  <p className="text-main text-xs capitalize">{error} </p>
                </div>
              )}
              <button
                className=" h-10 rounded-[.25rem] font-[600] shadow-mn text-gray-400 bg-gray-200 w-[100px]"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
              <button type="submit" className=" bg-orange-500 h-10 rounded text-white w-[100px] shadow-mn">
                {isLoading ? <BtnLoader /> : "Create"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewRegisters;
