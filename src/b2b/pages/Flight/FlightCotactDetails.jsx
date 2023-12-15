import React, { useState } from "react";
import { handleEmailPhone } from "../../../redux/slices/flightSlice";
import { useDispatch, useSelector } from "react-redux";
import { BiEnvelopeOpen } from "react-icons/bi";
import { AiFillCheckCircle } from "react-icons/ai";

function FlightCotactDetails({ navigation, setNavigation }) {
  const { commonDetails } = useSelector((state) => state.flight);
  const [selectedCode, setSelectedCode] = useState("");

  const countryCodes = [
    { name: "United Arab Emirates", code: "+971" },
    { name: "India", code: "+91" },
    { name: "United States", code: "+1" },
    { name: "United Kingdom", code: "+44" },
    // add more country codes here
  ];
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setNavigation({
      itenary: false,
      contact: false,
      details: true,
      payment: false,
      addOns: false,
    });
  };

  const navigationContct = () => {
    setNavigation({
      itenary: false,
      contact: true,
      details: false,
      payment: false,
      addOns: false,
    });
  };

  const onEmailPhone = (e) => {
    const { name, value } = e.target;
    dispatch(handleEmailPhone({ value, name }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {(navigation.contact === false &&
          navigation.addOns === false &&
          navigation.itenary === false) ||
        (!navigation.payment &&
          navigation.itenary === false &&
          navigation.contact === false &&
          navigation.addOns === false &&
          navigation.details === false) ? (
          <div
            className={` md:px-5 px-4 md:w-[99.6%] w-full  ${
              navigation.contact ? "text-gray-400 " : "text-slate-400"
            }  flex items-center justify-between gap-2`}
            onClick={() => {
              navigation.contact &&
                setNavigation({
                  itenary: false,
                  addOns: false,
                  contact: false,
                  details: true,
                  payment: false,
                });
            }}
          >
            <div className="w-full ml-[4px] py-4 pl-1 pr-2 md:pr-0 md:pl-0 rounded-[.25rem] md:border-b md:flex md:justify-between">
              <div className="flex gap-4">
                <div className="text-3xl text-green-500">
                  <AiFillCheckCircle />
                </div>
                <p className="font-[600] text-[20px]">Add Contact Details</p>
              </div>
              <p
                className="border rounded p-1 md:mt-0 mt-2 text-center md:mr-0 text-sm md:w-fit bg-orange-600 text-white cursor-pointer "
                onClick={navigationContct}
              >
                View Details
              </p>
            </div>
          </div>
        ) : (
          <div
            className={`my-1 md:ml-6 w-[95.5%] py-4 ${
              navigation.contact ? "text-gray-400 " : "text-slate-400 md:border-b"
            } rounded-[.25rem] w-[96.5%] flex items-center gap-2`}
            onClick={() => {
              navigation.contact &&
                setNavigation({
                  itenary: false,
                  addOns: false,
                  contact: false,
                  details: true,
                  payment: false,
                });
            }}
          >
            <div className="w-full flex justify-between md:pl-4 pl-8">
              <div className="flex gap-4">
                <div className="h-8 w-8 ml-[-10px] rounded-full flex items-center justify-center border border-gray-200 font-[600] ">
                  3
                </div>
                <p className="font-[600] text-[20px]">Add Contact Details</p>
              </div>
            </div>
          </div>
        )}

        {navigation.contact && (
          <div>
            <div className="grid md:grid-cols-1 gap-5 ml-10 pt-2">
              <div className="flex gap-2">
                <BiEnvelopeOpen size={15} />

                <h1 className="text-xs">
                  Your ticket and flights information will be sent here..
                </h1>
              </div>

              <div className="md:flex items-center gap-4">
                <div className="items-center">
                  <label htmlFor="country-code" className="mr-2">
                    Country Code:
                  </label>
                  <br />
                  <select
                    id="country-code"
                    value={commonDetails.phoneCode}
                    name="phoneCode"
                    onChange={(e) => onEmailPhone(e)}
                    className="border rounded p-1"
                  >
                    <option value="">Select a country code</option>
                    {countryCodes.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name} ({country.code})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full">
                  <div className="">
                    <label className="label">Mobile Number</label>
                  </div>
                  <div className="">
                    <input
                      required
                      placeholder="Mobile number"
                      value={commonDetails.contactNo}
                      type="tel"
                      pattern="^[0-9]{3,45}$" 
                      className=" text-primaryColor border outline-none no-spinner rounded h-8 w-80 placeholder:text-sm placeholder:text-gray-300 placeholder:p-2 pl-2"
                      name="contactNo"
                      onChange={(e) => onEmailPhone(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="">
                  <label className="label">Email Address</label>
                </div>
                <div className="">
                  <input
                    required
                    value={commonDetails.email}
                    placeholder="Email address"
                    type="email"
                    className=" text-primaryColor border  outline-none rounded h-8 w-80 placeholder:text-sm placeholder:text-gray-300 placeholder:p-2 pl-2"
                    name="email"
                    onChange={(e) => onEmailPhone(e)}
                  />
                </div>
              </div>
            </div>

            <div className="pt-14 ml-10 ">
              <button
                type="submit"
                className="bg-orange-500  rounded text-[14px] font-[600] text-white shadow-sm w-[170px] py-2 mr-10 p-1"
              >
                {" "}
                Continue
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default FlightCotactDetails;
