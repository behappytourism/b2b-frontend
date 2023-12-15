import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewTravellerDetails,
  handleTravellerDetailOnchange,
} from "../../../redux/slices/hotelSlice";

function DetailsCollectingSection({
  specialRequest,
  setSpecialRequest,
  contactDetails,
  setContactDetails,
  travellerDtls,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      addNewTravellerDetails({
        len: travellerDtls?.length,
        value: travellerDtls,
      })
    );
  }, [travellerDtls]);

  const handleChange = ({ index, name, value }) => {
    dispatch(
      handleTravellerDetailOnchange({
        index: index,
        name: name,
        value: value,
      })
    );
  };

  const handleContactChange = (e) => {
    return setContactDetails({
      ...contactDetails,
      [e.target.name]: e.target.value,
    });
  };

  const { travellerDetails } = useSelector((state) => state.hotel);
  const { countries } = useSelector((state) => state.home);

  return (
    <div className="mt-5  rounded shadow-round p-5 space-y-2">
      <h3 className="font-[650] text-[20px] text-gray-400">Guest Details</h3>

      <div className="">
        {travellerDetails?.map((item, index) => (
          <div key={index}>
            <p className="text-xs text-stone-500 font-[800] uppercase py-1">
              {item?.type}
            </p>
            <div className="grid grid-cols-2 gap-7 py-3">
              <div className="flex gap-2">
                <div className="relative w-[25%] h-12 py-4 px-3  border border-gray-300 hover:border-blue-400 focus-within:border-green-500 rounded-lg">
                  <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-100 rounded px-1 bg-blue-600">
                    Title
                  </span>
                  <select
                    className="block w-full outline-none bg-transparent text-sm text-gray-400 font-medium"
                    value={item?.title}
                    onChange={(e) =>
                      handleChange({
                        index: index,
                        name: "title",
                        value: e.target.value,
                      })
                    }
                    required
                  >
                    <option hidden></option>
                    <option value={"Mr"}>Mr</option>
                    <option value={"Mrs"}>Mrs</option>
                    <option value={"Ms"}>Ms</option>
                  </select>
                </div>
                <div className="relative w-[75%] h-12 py-4 px-3  border border-gray-300 hover:border-blue-400 focus-within:border-green-500 rounded-lg">
                  <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-100 rounded px-1 bg-blue-600">
                    First Name
                  </span>
                  <input
                    className="block w-full outline-none bg-transparent text-sm text-gray-400 font-medium"
                    type="text"
                    value={item?.firstName}
                    onChange={(e) =>
                      handleChange({
                        index: index,
                        name: "firstName",
                        value: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div>
                <div className="relative w-full h-12 py-4 px-3  border border-gray-300 hover:border-blue-400 focus-within:border-green-500 rounded-lg">
                  <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-100 rounded px-1 bg-blue-600">
                    Last Name
                  </span>
                  <input
                    className="block w-full outline-none bg-transparent text-sm text-gray-400 font-medium"
                    type="text"
                    value={item?.lastName}
                    onChange={(e) =>
                      handleChange({
                        index: index,
                        name: "lastName",
                        value: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-2">
        <div className="relative w-full py-4 px-3  border border-gray-300 hover:border-blue-400 focus-within:border-green-500 rounded-lg">
          <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-100 rounded px-1 bg-blue-600">
            Special Request
          </span>
          <textarea
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
            className="block w-full outline-none bg-transparent text-sm text-gray-400 font-medium"
          />
        </div>
      </div>

      <div className="py-4 ">
        <h4 className="font-[650] text-gray-400 text-[20px]">
          Contact Details
        </h4>
        <div className="grid grid-cols-2 gap-7 py-3">
          <div className="">
            <div className="relative w-full h-12 py-4 px-3  border border-gray-300 hover:border-blue-400 focus-within:border-green-500 rounded-lg">
              <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-100 rounded px-1 bg-blue-600">
                Email Address
              </span>
              <input
                className="block w-full outline-none bg-transparent text-sm text-gray-400 font-medium"
                type="email"
                name="email"
                value={contactDetails.email}
                onChange={handleContactChange}
                required
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="relative w-[25%] h-12 py-4 px-3  border border-gray-300 hover:border-blue-400 focus-within:border-green-500 rounded-lg">
              <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-100 rounded px-1 bg-blue-600">
                Code
              </span>
              <select
                className="block w-full outline-none bg-transparent text-sm text-gray-400 font-medium"
                name="country"
                value={contactDetails.country}
                onChange={handleContactChange}
                required
              >
                <option hidden></option>
                {countries?.map((item) => (
                  <option
                    className="capitalize"
                    key={item?._id}
                    value={item?._id}
                  >{`${item?.countryName} (${item?.phonecode})`}</option>
                ))}
              </select>
            </div>
            <div className="relative w-[75%] h-12 py-4 px-3  border border-gray-300 hover:border-blue-400 focus-within:border-green-500 rounded-lg">
              <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-100 rounded px-1 bg-blue-600">
                Phone Number
              </span>
              <input
                className="block no-spinner w-full outline-none bg-transparent text-sm text-gray-400 font-medium"
                type="number"
                name="phoneNumber"
                value={contactDetails.phoneNumber}
                onChange={handleContactChange}
                required
              />
            </div>
          </div>
        </div>
        <p className="text-stone-500 text-sm">
          Your Booking details will be sent to this email address and phone
          number
        </p>
      </div>
    </div>
  );
}

export default DetailsCollectingSection;
