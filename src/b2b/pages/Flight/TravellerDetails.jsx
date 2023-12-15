import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MonthNames from "../../data/monthNames";
import axios from "../../../axios";
import {
  handleTravellerRowChange,
  handleTravellerRowDobChange,
  handleTravellerRowExpiryChange,
  handleinitialDetails,
  handleEmailPhone,
  orderFlightDetails,
  handleFullData,
  handleTravellerPaxIdAdd,
  handleTravellerPaxType
} from "../../../redux/slices/flightSlice";
import { AiFillCheckCircle } from "react-icons/ai";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import OtpModalFlight from "./OtpModalFlight";
const TravellerDetails = ({ navigation, setNavigation, sharedState }) => {
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.home);
  const {
    travellers,
    travellerDetails,
    commonDetails,
    selectedFlight,
    tripType,
  } = useSelector((state) => state.flight);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.agents);
  const location = useLocation(); // Get the current location
  const { tbId } = useParams(); // Extract the "tbId" from the URL path
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [genderSelected, setGenderSelected] = useState(false);
  const navigate = useNavigate();

  const { flightFullData } = useSelector((state) => state.flight);
  const [flightOrderId, setFlightOrderId] = useState(null);

  const initialTravellers = {
    adult: flightFullData?.priceQuoteResponse?.noOfAdults,
    children: flightFullData?.priceQuoteResponse?.noOfChildren,
    infant: flightFullData?.priceQuoteResponse?.noOfInfants,
  };

  useEffect(() => {
    if (!travellerDetails.length) {
      dispatch(handleinitialDetails(initialTravellers));
    }
  }, [initialTravellers]);

  //console.log(initialTravellers, "initial travellers")
  useEffect(() => {
    if (sharedState) {
      // When sharedState changes, and if it's truthy, run sendTravellersDetails
      sendTravellersDetails();
    }
  }, [sharedState]);

  let limit = new Date().getFullYear();
  let year = [];
  for (let i = limit; i > limit - 100; i--) {
    year.push(i);
  }

  let explimit = new Date().getFullYear();
  let expYear = [];
  for (let i = explimit; i < explimit + 100; i++) {
    expYear.push(i);
  }

  let day = [];
  for (let i = 1; i <= 31; i++) {
    day.push(i);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setNavigation({
      itenary: false,
      details: false,
      payment: false,
      addOns: false,
      contact: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNavigation({
      itenary: false,
      contact: false,
      details: false,
      payment: false,
      addOns: false,
    });
  };

  const onRowChange = (e, index) => {
    const {
      target: { value, name },
    } = e;
    dispatch(handleTravellerRowChange({ value, name, index }));
    // Check if the updated field is the 'gender' field and has a valid value
    if (name === "gender" && (value === "male" || value === "female")) {
      setGenderSelected(true); // Set gender as selected
    }
  };

  const onDobChange = (e, index) => {
    const { name, value } = e.target;
    dispatch(handleTravellerRowDobChange({ value, name, index }));
  };

  const onExpiryChange = (e, index) => {
    const { name, value } = e.target;
    dispatch(handleTravellerRowExpiryChange({ value, name, index }));
  };

  // Create an array to store paxIds
  const paxIds = [];
  const types = [];


  flightFullData?.priceQuoteResponse?.passengers.map((ele, index) => {
    //console.log(flightFullData, "paxid")
    dispatch(handleTravellerPaxType({ index, passengerType: ele.type }));
    types.push(ele.type);
    // ... rest of your code ...
  });

  flightFullData?.priceQuoteResponse?.passengers.map((ele, index) => {
  // console.log(flightFullData, "paxid")
    dispatch(handleTravellerPaxIdAdd({ index, paxId: ele.paxId }));
    paxIds.push(ele.paxId);
    // ... rest of your code ...
  });

  // const onPaxIdChange = (paxId, index) => {
  //   dispatch(handleTravellerPaxIdAdd({ paxId, index }));
  // };

  // const body = {
  //   tbId: tbId,
  //   // identifierToken: selectedFlight?.identifierToken,
  //   // noOfAdults: travellers?.adult,
  //   // noOfChildren: travellers?.children,
  //   // noOfInfants: travellers?.infant,
  //   // type: tripType,
  //   contactDetails: {
  //     email: commonDetails.email,
  //     phoneCode: commonDetails.phoneCode,
  //     phoneNumber: commonDetails.contactNo,
  //   },
  //   passengerDetails: travellerDetails,
  // };
  // const sendTravellersDetails = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.post("/b2b/flight/bookings/initiate", body, {
  //       headers: { authorization: `Bearer ${token}` },
  //     });
  //     if (res.status === 200) {
  //       setFlightOrderId(res.data.flightOrderId); // Store the flightOrderId in state
  //       const bookingId = res?.data?.flightOrderId;
  //       setShowOtpModal(true); // Show the OTP modal

  //       // ...
  //     }
  //     const identifierToken = selectedFlight?.identifierToken;
  //     // const {identifierToken,orderId} = res.data

  //     dispatch(orderFlightDetails({ identifierToken }));
  //   } catch (err) {
  //     console.log(err);
  //     setLoading(false);
  //   }
  // };

  const navigationDetail = () => {
    setNavigation({
      itenary: false,
      contact: false,
      details: true,
      payment: false,
      addOns: false,
    });
  };

  const renderYear = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    return year;
  };

  const renderMonth = (dateString) => {
    const date = new Date(dateString);
    const monthNumber = date.getMonth() + 1; // Adding 1 since getMonth() returns 0-11
    return monthNumber;
  };

  const renderDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    return day;
  };

   //console.log(travellerDetails)

  return (
    <div className="p-6 text-darktext overflow-x-auto">
      {!loading && (
        <>
          <form onSubmit={submitHandler}>
            {!navigation.details &&
            navigation.itenary === false &&
            navigation.addOns === false &&
            navigation.contact == false ? (
              <div
                className={`md:px-0 py-4 ${
                  navigation.details
                    ? "text-gray-400 "
                    : "text-slate-400 md:border-b"
                } rounded-[.25rem] flex items-center gap-2`}
                onClick={() => {
                  navigation.contact &&
                    setNavigation({
                      itenary: false,
                      addOns: false,
                      contact: false,
                      details: false,
                      payment: true,
                    });
                }}
              >
                <div className="md:flex w-full md:w-full md:justify-between">
                  <div className="flex gap-4">
                    <div className="text-3xl text-green-500">
                      <AiFillCheckCircle />
                    </div>
                    <p className="font-[600] text-[20px]">
                      Add Traveller Details
                    </p>
                  </div>
                  <p
                    className="border rounded p-1 text-center md:mr-0 text-sm md:w-fit w-[100%] md:mt-0 mt-2 bg-orange-600 text-white cursor-pointer "
                    onClick={navigationDetail}
                  >
                    View Details
                  </p>
                </div>
              </div>
            ) : (
              <div
                className={`my-1 -ml-1 md:ml-0   py-4 ${
                  navigation.details
                    ? "text-gray-400 "
                    : "text-slate-400 md:border-b"
                } rounded-[.25rem] flex items-center gap-2`}
                onClick={() => {
                  navigation.contact &&
                    setNavigation({
                      itenary: false,
                      addOns: false,
                      contact: false,
                      details: false,
                      payment: true,
                    });
                }}
              >
                <div className="flex w-full justify-between">
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center border border-gray-200 font-[600] ml-1">
                      4
                    </div>
                    <p className="font-[600] text-[20px]">
                      Add Traveller Details
                    </p>
                  </div>
                </div>
              </div>
            )}

            {navigation.details && (
              <div className="rounded-b-lg shadow bg-white p-6">
                <div className="w-[100%]">
                  {travellerDetails?.map((ads, i) => {
                    return (
                      <>
                        <div key={i} className="pb-10 border-b pt-5">
                          <div className="py-2 text-gray-500 font-[550]  border-dashed px-1 ">
                            <span className="">
                              {ads.passengerType === "ADT"
                                ? `Adult`
                                : ads.passengerType === "CHD"
                                ? ` Children`
                                : `Infant`}{" "}
                            </span>
                          </div>
                          <div className="">
                            {/* <div className="col-span-2 pt-5">
                          <div className="">
                            <label className="label">Mr/Mrs</label>
                          </div>
                          <div className="">
                            <select
                              name="title"
                              onChange={(e) => onRowChange(e, i)}
                              className="border outline-none no-spinner rounded h-9 w-24 text-md text-gray-400"
                            >
                              <option hidden>Title</option>
                              <option value={"MR"}>Mr.</option>
                              <option value={"MS"}>Ms.</option>
                              <option value={"MRS"}>Mrs.</option>
                              <option value={"MSTR"}>Mstr.</option>
                            </select>
                          </div>
                        </div> */}

                            <div className="pt-5">
                              <label className="label">Traveller Name</label>
                            </div>
                            <div className="flex gap-5">
                              <div className="">
                                <input
                                  placeholder="First name"
                                  type="text"
                                  name="firstName"
                                  required
                                  value={
                                    ads.firstName.charAt(0).toUpperCase() +
                                    ads.firstName.slice(1)
                                  }
                                  onChange={(e) => onRowChange(e, i)}
                                  className=" text-primaryColor border outline-none no-spinner rounded h-9 w-72 placeholder:text-sm placeholder:text-gray-300 placeholder:p-2 pl-2"
                                />
                              </div>

                              <div className="">
                                <input
                                  placeholder="Last name"
                                  required
                                  type="text"
                                  className="text-primaryColor border outline-none no-spinner rounded h-9 w-72 placeholder:text-sm placeholder:text-gray-300 placeholder:p-2 pl-2"
                                  name="lastName"
                                  value={
                                    ads.lastName.charAt(0).toUpperCase() +
                                    ads.lastName.slice(1)
                                  }
                                  onChange={(e) => onRowChange(e, i)}
                                />
                              </div>
                              <div className="col-span-2 mt-[-25px]">
                                <div className="">
                                  <label className="label">Gender</label>
                                </div>
                                <div className="">
                                  <select
                                    name="gender"
                                    onChange={(e) => onRowChange(e, i)}
                                    value={ads?.gender}
                                    required
                                    className="border outline-none no-spinner rounded h-9 w-20 text-sm text-gray-400"
                                  >
                                    <option hidden>Gender</option>
                                    <option value={"male"}>Male</option>
                                    <option value={"female"}>Female</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="pt-5 flex">
                              <div className="">
                                <div className="">
                                  <label className="label">Nationality</label>
                                </div>
                                <div className="">
                                  <select
                                    className="border outline-none no-spinner rounded h-9 w-72  text-md text-gray-300"
                                    name="nationality"
                                    value={ads?.nationality}
                                    onChange={(e) => {
                                      onRowChange(e, i);
                                    }}
                                  >
                                    <option
                                      hidden
                                      className="text-gray-200 text-sm placeholder:text-sm "
                                    >
                                      Nationality (e.g. Dubai)
                                    </option>
                                    {countries?.map((item, index) => (
                                      <option
                                        key={index}
                                        value={item?.isocode}
                                        className="capitalize text-black"
                                      >
                                        {item?.countryName.toUpperCase()}{" "}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>

                              <div className="">
                                <div className="ml-4">
                                  <label className="label">Date of birth</label>
                                </div>
                                <div className="ml-4 flex gap-2">
                                  <select
                                    className="border outline-none no-spinner rounded h-9 w-24 text-md text-gray-400"
                                    name="year"
                                    value={ads?.birthDate?.year}
                                    onChange={(e) => onDobChange(e, i)}
                                  >
                                    <option hidden>YYYY</option>
                                    {year.map((item, index) => (
                                      <option key={index} value={item}>
                                        {item}
                                      </option>
                                    ))}
                                  </select>
                                  <select
                                    className="border outline-none no-spinner rounded h-9 w-24 text-md text-gray-400"
                                    name="month"
                                    value={ads?.birthDate?.month}
                                    onChange={(e) => onDobChange(e, i)}
                                  >
                                    <option hidden>MM</option>
                                    {MonthNames.map((item, index) => (
                                      <option key={index} value={item?.value}>
                                        {item?.name}
                                      </option>
                                    ))}
                                  </select>
                                  <select
                                    className="border outline-none no-spinner rounded h-9 w-24 text-md text-gray-400"
                                    name="day"
                                    value={ads?.birthDate?.day}
                                    onChange={(e) => onDobChange(e, i)}
                                  >
                                    <option hidden>DD</option>
                                    {day.map((item, index) => (
                                      <option key={index} value={item}>
                                        {item}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                {/* <div className="ml-4">
                              <label className="label">Date of birth</label>
                            </div>
                            <div className="grid grid-cols-3 gap-3 ml-4">
                              <div className="">
                                <select
                                  placeholder="DD"
                                  className="border outline-none no-spinner rounded h-9 w-24 text-md text-gray-400 "
                                  name="day"
                                  value={ads?.dateOfBirth?.day}
                                  onChange={(e) => onDobChange(e, i)}
                                >
                                  <option hidden> DD</option>
                                  {day.map((item, index) => (
                                    <option key={index} value={item}>
                                      {item}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="">
                                <select
                                  placeholder="MM"
                                  className="border outline-none no-spinner rounded h-9 w-24 text-md text-gray-400"
                                  name="month"
                                  value={ads?.dateOfBirth?.month}
                                  onChange={(e) => onDobChange(e, i)}
                                >
                                  <option hidden>MM</option>
                                  {MonthNames.map((item, index) => (
                                    <option
                                      key={index}
                                      value={item?.value}
                                      className="capitalize"
                                    >
                                      {item?.name}{" "}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="">
                                <select
                                  className="border outline-none no-spinner rounded h-9 w-24 text-md text-gray-400"
                                  name="year"
                                  value={ads?.dateOfBirth?.year}
                                  onChange={(e) => onDobChange(e, i)}
                                >
                                  <option hidden>YYYY</option>
                                  {year.map((item, index) => (
                                    <option key={index} value={item}>
                                      {item}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div> */}
                              </div>
                            </div>
                            <div className="flex pt-5">
                              <div className="">
                                <div className="">
                                  <label className="label">
                                    Passport Number (optional)
                                  </label>
                                </div>
                                <div className="">
                                  <input
                                    placeholder="Passport number"
                                    type="text"
                                    className="text-primaryColor border outline-none no-spinner rounded h-9 w-72 placeholder:text-sm placeholder:text-gray-300 placeholder:p-2 pl-2"
                                    name="passportNumber"
                                    value={ads?.passportNumber}
                                    onChange={(e) => onRowChange(e, i)}
                                  />
                                </div>
                              </div>

                              {/* <div className="ml-4">
                                <div className="">
                                  <label className="label">
                                    Passport Expiry
                                  </label>
                                </div>
                                <div className="md:grid flex md:grid-cols-3 gap-2">
                                  <div className="">
                                    <select
                                      className="border outline-none no-spinner rounded h-9 w-24 text-md text-gray-400"
                                      name="year"
                                      value={ads?.passportExpiry?.year}
                                      onChange={(e) => onExpiryChange(e, i)}
                                    >
                                      <option hidden>YYYY</option>
                                      {expYear.map((items, index) => (
                                        <option key={index} value={items}>
                                          {items}
                                        </option>
                                      ))}
                                    </select>
                                  </div>

                                  <div className="">
                                    <select
                                      className="border outline-none no-spinner rounded h-9 w-24 text-md text-gray-400"
                                      name="month"
                                      value={ads?.passportExpiry?.month}
                                      onChange={(e) => onExpiryChange(e, i)}
                                    >
                                      <option hidden>MM</option>
                                      {MonthNames.map((item, index) => (
                                        <option
                                          key={index}
                                          value={item.value}
                                          className="capitalize"
                                        >
                                          {item.name}{" "}
                                        </option>
                                      ))}
                                    </select>
                                  </div>

                                  <div className="">
                                    <select
                                      className="border outline-none no-spinner rounded h-9 w-24 text-md text-gray-400"
                                      name="day"
                                      value={ads?.passportExpiry?.day}
                                      onChange={(e) => onExpiryChange(e, i)}
                                    >
                                      <option hidden>DD</option>
                                      {day.map((item, index) => (
                                        <option key={index} value={item}>
                                          {item}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="pt-14 ml-10 ">
                  <button
                    type="submit"
                    // disabled={travellerDetails.some((detail) => {
                    //   for (const key in detail) {
                    //     if (!detail[key]) {
                    //       return true; // Disable the button if any field is empty
                    //     }
                    //   }
                    //   return false;
                    // })}
                    className="bg-orange-500  rounded text-[14px] font-[600] text-white shadow-sm w-[170px] py-2 mr-10 p-1"
                  >
                    {" "}
                    Continue
                  </button>
                </div>
                {/* <div className="mt-2 flex justify-end">
              <button
                type="submit"
                className="bg-lightblue text-[14px] text-white px-3 py-2 rounded"
              >
                Continue to verify
              </button>
            </div> */}
              </div>
            )}
          </form>
        </>
      )}

      {loading && (
        <>
          <div className="animate-pulse w-full">
            <div className="border rounded-md w- p-3 mt-6">
              <p className="text-sm text-transparent h-8 bg-gray-100 rounded">
                {" "}
                Hand Baggage: One personal item like a small laptop bag,{" "}
              </p>

              <p className="text-gray-400 font-[400] text-sm text-transparent bg-gray-100 rounded w-[90%] mt-2">
                +dsjdskljdksaahjdksj{" "}
              </p>

              <p className="text-gray-400 font-[400] text-sm text-transparent bg-gray-100 rounded w-[70%] mt-2">
                +dsjdskljdksaahjdksj{" "}
              </p>

              <p className="text-gray-400 font-[400] text-sm text-transparent bg-gray-100 rounded w-[95%] h-20 mt-2">
                +dsjdskljdksaahjdksj{" "}
              </p>
            </div>
          </div>
        </>
      )}
      {showOtpModal && (
        <OtpModalFlight
          orderId={flightOrderId}
          // pass any necessary props to the OtpModal component
        />
      )}
    </div>
  );
};

export default TravellerDetails;
