import React, { useEffect, useState } from "react";
import { GiFactory } from "react-icons/gi";
import { GoPerson } from "react-icons/go";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../axios";

function DetailsEditForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { reseller } = useSelector((state) => state.resellers);
  const { agent } = useSelector((state) => state.agents);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    email: reseller?.email || "",
    companyName: reseller?.companyName || "",
    address: reseller?.address || "",
    telephoneNumber: reseller?.telephoneNumber || "",
    companyRegistration: reseller?.companyRegistration || "",
    trnNumber: reseller?.trnNumber || "",
    website: reseller?.website || "",
    country: agent?.country?._id || "",
    city: reseller?.city || "",
    zipCode: reseller?.zipCode || "",
    designation: reseller?.designation || "",
    name: reseller?.name || "",
    phoneNumber: reseller?.phoneNumber || "",
    skypeId: reseller?.skypeId || "",
    whatsappNumber: reseller?.whatsappNumber || "",
  });

  const { currencies, countries, UAE } = useSelector((state) => state.home);
  const { token } = useSelector((state) => state.agents);

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        email: reseller?.email,
        companyName: reseller?.companyName,
        address: reseller?.address,
        telephoneNumber: reseller?.telephoneNumber,
        companyRegistration: reseller?.companyRegistration,
        trnNumber: reseller?.trnNumber,
        website: reseller?.website,
        country: agent?.country?._id,
        city: reseller?.city,
        zipCode: reseller?.zipCode,
        designation: reseller?.designation,
        name: reseller?.name,
        phoneNumber: reseller?.phoneNumber,
        skypeId: reseller?.skypeId,
        whatsappNumber: reseller?.whatsappNumber,
      };
    });
  }, [reseller]);

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
        `/b2b/resellers/update/${id}`,
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
  const currencyArray = currencies?.filter(
    (item) => item?.country?._id === data.country
  );
  return (
    <div className="max-w-screen-xl mx-auto">
      <form onSubmit={submitHandler}>
        <div className="p-3 lg:p-6 space-y-4">
          <div className="flex items-center justify-between border-b  p-4">
            <h2 className="text-lg text-gray-400 font-bold tracking-wide space-x-2 flex">
              <span className="">
                <GiFactory />{" "}
              </span>
              <span className="">Company Details</span>
            </h2>
          </div>
          <div className="space-y-5 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-[20px] mt-4 shadow-round rounded p-5">
            <div className="space-y-3">
              <div className="text-xs text-grayColor">Travel Agency Name</div>
              <input
                className="border-b outline-none focus:border-green-400 hover:border-blue-400 text-sm px-2 w-full"
                type="text"
                name="companyName"
                value={data.companyName}
                onChange={onChangeHandler}
                required
                // readOnly
              />
            </div>

            <div className="space-y-3">
              <div className="text-xs text-grayColor">Address</div>
              <input
                className="border-b outline-none focus:border-green-400 hover:border-blue-400 text-sm px-2 w-full"
                type="text"
                name="address"
                value={data.address}
                onChange={onChangeHandler}
                required
                // readOnly
              />
            </div>

            <div className="space-y-3">
              <div className="text-xs text-grayColor">Nationality</div>
              <select
                className="border-b outline-none bg-transparent focus:border-green-400 hover:border-blue-400 text-sm px-2 w-full"
                name="country"
                value={data.country}
                required
                onChange={onChangeHandler}
                // readOnly
              >
                <option className="text-text" hidden></option>
                {countries?.map((item, index) => (
                  <option className="capitalize" value={item?._id} key={index}>
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
                    className="border-b outline-none focus:border-green-400 hover:border-blue-400 text-sm px-2 w-full no-spinner"
                    type="number"
                    name="trnNumber"
                    value={data.trnNumber}
                    onChange={onChangeHandler}
                    // readOnly
                  />
                </div>

                <div className="space-y-3">
                  <div className="text-xs text-grayColor">
                    Company Registration Number
                  </div>
                  <input
                    className="border-b outline-none focus:border-green-400 hover:border-blue-400 text-sm px-2 w-full no-spinner"
                    type="number"
                    name="companyRegistration"
                    value={data.companyRegistration}
                    onChange={onChangeHandler}
                    // readOnly
                  />
                </div>
              </>
            )}

            <div className="space-y-3">
              <div className="text-xs text-grayColor">Website</div>
              <input
                className="border-b outline-none focus:border-green-400 hover:border-blue-400 text-sm px-2 w-full"
                type="text"
                name="website"
                value={data.website}
                onChange={onChangeHandler}
                // readOnly
              />
            </div>

            <div className="space-y-3">
              <div className="text-xs text-grayColor">City</div>
              <input
                className="border-b outline-none focus:border-green-400 hover:border-blue-400 text-sm px-2 w-full"
                type="text"
                name="city"
                value={data.city}
                onChange={onChangeHandler}
                required
                // readOnly
              />
            </div>
            {data.country && data.country !== UAE?._id && (
              <div className="space-y-3">
                <div className="text-xs text-grayColor">Zip Code</div>
                <input
                  className="border-b outline-none focus:border-green-400 hover:border-blue-400 text-sm px-2 w-full no-spinner"
                  type="number"
                  name="zipCode"
                  value={data.zipCode}
                  onChange={onChangeHandler}
                  required
                  // readOnly
                />
              </div>
            )}
          </div>
          <div className="flex items-center justify-between border-b  p-4">
            <h2 className="text-lg text-gray-400 font-bold tracking-wide space-x-2 flex">
              <span className="">
                <GoPerson />{" "}
              </span>
              <span className="">Profile Details</span>
            </h2>
          </div>

          <div className="space-y-5 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-[20px] mt-4 shadow-round rounded p-5">
            <div className="space-y-3">
              <div className="text-xs text-grayColor">Agent Name</div>
              <input
                className="border-b outline-none focus:border-green-400 hover:border-blue-400 text-sm px-2 w-full"
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
                  className="border-b outline-none focus:border-green-400 hover:border-blue-400 text-sm px-2 w-full"
                  value={countryArray?.map((item) => item?.phonecode) || ""}
                  readOnly
                />
              </div>

              <div className="space-y-3 w-10/12 ">
                <div className="text-xs text-grayColor">Number</div>
                <input
                  className="border-b outline-none focus:border-green-400 hover:border-blue-400 text-sm px-2 w-full no-spinner"
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
                  className="border-b outline-none focus:border-green-400 hover:border-blue-400 text-sm px-2 w-full"
                  value={countryArray?.map((item) => item?.phonecode) || ""}
                  readOnly
                />
              </div>

              <div className="space-y-3 w-10/12 ">
                <div className="text-xs text-grayColor">Telephone Number</div>
                <input
                  className="border-b outline-none focus:border-green-400 hover:border-blue-400 text-sm px-2 w-full no-spinner"
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
                className="border-b outline-none focus:border-green-400 hover:border-blue-400 text-sm px-2 w-full"
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
                className="border-b outline-none focus:border-green-400 hover:border-blue-400 text-sm px-2 w-full"
                type="text"
                value={currencyArray?.map((item) => item?.currencySymbol) || ""}
                readOnly
              />
            </div>

            <div className="space-y-3">
              <div className="text-xs text-grayColor">Designation</div>
              <input
                className="border-b outline-none focus:border-green-400 hover:border-blue-400 text-sm px-2 w-full"
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
                className="border-b outline-none focus:border-green-400 hover:border-blue-400 text-sm px-2 w-full"
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
                  className="border-b outline-none focus:border-green-400 hover:border-blue-400 text-sm px-2 w-full"
                  value={countryArray?.map((item) => item?.phonecode) || ""}
                  readOnly
                />
              </div>
              <div className="space-y-3 w-10/12">
                <div className="text-xs text-grayColor">Whatsapp</div>
                <input
                  className="border-b outline-none focus:border-green-400 hover:border-blue-400 text-sm px-2 w-full no-spinner"
                  type="number"
                  name="whatsappNumber"
                  value={data.whatsappNumber}
                  onChange={onChangeHandler}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <span
              className=" flex justify-center items-center bg-gray-200 text-[14px] font-[550] text-darktext rounded-[.25rem] shadow-sm w-[100px]"
              onClick={() => navigate(-1)}
            >
              Back
            </span>
            <button type="submit" className="button w-[100px]">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DetailsEditForm;
