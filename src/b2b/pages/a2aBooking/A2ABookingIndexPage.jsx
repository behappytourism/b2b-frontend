import axios from "../../../axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SearchCards from "../../components/Cards/SearchCards";
import { useDispatch, useSelector } from "react-redux";
import {
  addRows,
  handleRowItemChange,
  handleRowItemSubChange,
} from "../../../redux/slices/a2aSlice";
import formatDate from "../../../utils/formatDate";
import priceConversion from "../../../utils/PriceConversion";
import PolicyConfirmModal from "../a2aSelection/PolicyConfirmModal";
import TermsAndOtpModal from "./TermsAndOtpModal";

function A2ABookingIndexPage() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [markup, setMarkup] = useState(0);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [isTermsModalOpen, setTermsModalOpen] = useState(false);
  const [numberOfInfant, setNumberOfInfant] = useState(0);

  const { token } = useSelector((state) => state.agents);
  const { rows } = useSelector((state) => state.a2a);
  const { countries } = useSelector((state) => state.home);
  const { a2aEnquiry } = useSelector((state) => state.a2a);
  const { selectedCurrency } = useSelector((state) => state.home);
  const { availableBalance } = useSelector((state) => state.wallet);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(`/b2b/a2a/single/ticket/${params?.id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setData(response?.data);
      setIsLoading(false);
      setIsPolicyModalOpen(true);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(addRows());
  }, []);

  const onRowChange = (e, index) => {
    dispatch(
      handleRowItemChange({
        value: e.target.value,
        name: e.target.name,
        index,
      })
    );
  };

  useEffect(() => {
    let array = [];
    rows.filter((item) => {
      if (item?.isInfant) {
        array.push(item);
      }
      setNumberOfInfant(array?.length);
    });
  }, [rows]);

  return (
    <div className="">
      <SearchCards />
      {isPolicyModalOpen && (
        <PolicyConfirmModal
          setIsPolicyModalOpen={setIsPolicyModalOpen}
          note={data?.note}
          isPolicyModalOpen={isPolicyModalOpen}
        />
      )}
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-12 gap-5 pt-10 text-darktext">
          <div className="first__ col-span-8">
            <h4 className="font-[700] text-lg text-gray-400"> Book Your Ticket</h4>

            {rows.map((item, index) => (
              <div key={index} className="mt-3 p-5 rounded shadow-round ">
                <p className="border-b  py-1 text-sm  px-2 text-gray-400 font-[600]">
                  Passenger {index + 1}
                </p>
                <div className=" mt-4 flex gap-3 w-full">
                  <div className="w-[20%]">
                    <div className="space-y-3">
                      <div className="text-stone-500 text-xs">
                        Title *
                      </div>
                      <select
                        className="outline-none border-b focus:border-green-400 hover:border-blue-400 text-grayColor text-sm w-full"
                        type="text"
                        name="title"
                        value={item?.title}
                        onChange={(e) => onRowChange(e, index)}
                      >
                        <option hidden></option>
                        <option value="mr">Mr</option>
                        <option value="ms">Ms</option>
                        <option value="mrs">Mrs</option>
                      </select>
                    </div>
                  </div>
                  <div className="w-[45%]">
                    <div className=" space-y-3">
                      <div className="text-stone-500 text-xs">
                        First Name
                      </div>
                      <input
                        className="outline-none border-b focus:border-green-400 hover:border-blue-400 text-grayColor text-sm w-full"
                        type="text"
                        name="firstName"
                        value={item?.firstName}
                        onChange={(e) => onRowChange(e, index)}
                      />
                    </div>
                  </div>
                  <div className="w-[45%]">
                    <div className=" space-y-3">
                      <div className="text-stone-500 text-xs">
                        Last Name
                      </div>
                      <input
                        className="outline-none border-b focus:border-green-400 hover:border-blue-400 text-grayColor text-sm w-full"
                        type="text"
                        name="lastName"
                        value={item?.lastName}
                        onChange={(e) => onRowChange(e, index)}
                      />
                    </div>
                  </div>
                </div>
                <div className=" mt-4 flex gap-3 w-full">
                  <div className="w-[45%]">
                    <div className=" space-y-3">
                      <div className="text-stone-500 text-xs">
                        Nationality
                      </div>
                      <select
                        className="outline-none border-b focus:border-green-400 capitalize hover:border-blue-400 text-grayColor text-sm w-full"
                        type="email"
                        name="nationality"
                        value={item?.nationality}
                        onChange={(e) => onRowChange(e, index)}
                      >
                        <option hidden></option>
                        {countries?.map((item) => (
                          <option key={item?._id} value={item?._id}>
                            {item?.countryName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="w-[55%] flex gap-1">
                    {/* <div className=" space-y-3 w-[20%] ">
                      <div className="text-stone-500 text-xs">
                        Code
                      </div>
                      <select
                        className="outline-none border-b focus:border-green-400 hover:border-blue-400 text-grayColor text-sm w-full"
                        type="text"
                        name="code"
                        value={item?.code}
                        onChange={(e) => onRowChange(e, index)}
                      >
                        <option hidden></option>
                        {countries?.map((item) => (
                          <option key={item?._id} value={item?.phonecode}>
                            {item?.phonecode}
                          </option>
                        ))}
                      </select>
                    </div> */}
                    <div className=" space-y-3 w-[100%] ">
                      <div className="text-stone-500 text-xs">
                        Phone Number
                      </div>
                      <input
                        className="outline-none border-b focus:border-green-400 hover:border-blue-400 text-grayColor text-sm w-full no-spinner"
                        type="number"
                        name="phoneNumber"
                        value={item?.phoneNumber}
                        onChange={(e) => onRowChange(e, index)}
                      />
                    </div>
                  </div>
                </div>
                <div className=" mt-4 flex gap-3 w-full">
                  <div className="w-[65%]">
                    <div className=" space-y-3">
                      <div className="text-stone-500 text-xs">
                        Passport Number
                      </div>
                      <input
                        className="outline-none border-b focus:border-green-400 hover:border-blue-400 text-grayColor text-sm w-full"
                        type="text"
                        name="passportNo"
                        value={item?.passportNo}
                        onChange={(e) => onRowChange(e, index)}
                      />
                    </div>
                  </div>
                  <div className="w-[45%]">
                    <div className=" space-y-3">
                      <div className="text-stone-500 text-xs">
                        Reference
                      </div>
                      <input
                        className="outline-none border-b focus:border-green-400 hover:border-blue-400 text-grayColor text-sm w-full"
                        type="text"
                        name="reference"
                        value={item?.reference}
                        onChange={(e) => onRowChange(e, index)}
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-5 flex gap-3">
                  <input
                    type="checkbox"
                    className=""
                    name="isInfant"
                    value={item?.isInfant}
                    onChange={(e) =>
                      dispatch(
                        handleRowItemChange({
                          value: e.target.checked,
                          name: e.target.name,
                          index,
                        })
                      )
                    }
                  />
                  <p className="text-sm text-grayColor font-[300]">Is infant needed</p>
                </div>
                {item?.isInfant && (
                  <>
                    <div className=" mt-5 flex gap-3 w-full">
                      <div className="w-[20%]">
                        <div className=" space-y-3">
                          <div className="text-stone-500 text-xs">
                            Infant Title
                          </div>
                          <select
                            className="outline-none border-b focus:border-green-400 hover:border-blue-400 text-grayColor text-sm w-full"
                            type="text"
                            name="title"
                            value={item?.infantDetails?.title}
                            onChange={(e) =>
                              dispatch(
                                handleRowItemSubChange({
                                  index: index,
                                  name: "title",
                                  value: e.target.value,
                                })
                              )
                            }
                          >
                            <option hidden></option>
                            <option value="miss">Miss</option>
                            <option value="mstr">Mstr</option>
                          </select>
                        </div>
                      </div>
                      <div className="w-[45%]">
                        <div className=" space-y-3">
                          <div className="text-stone-500 text-xs">
                            Infant First Name
                          </div>
                          <input
                            className="outline-none border-b focus:border-green-400 hover:border-blue-400 text-grayColor text-sm w-full"
                            type="text"
                            name="firstName"
                            value={item?.infantDetails?.firstName}
                            onChange={(e) =>
                              dispatch(
                                handleRowItemSubChange({
                                  index: index,
                                  name: "firstName",
                                  value: e.target.value,
                                })
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="w-[45%]">
                        <div className=" space-y-3">
                          <div className="text-stone-500 text-xs">
                            Infant Last Name
                          </div>
                          <input
                            className="outline-none border-b focus:border-green-400 hover:border-blue-400 text-grayColor text-sm w-full"
                            type="text"
                            name="lastName"
                            value={item?.infantDetails?.lastName}
                            onChange={(e) =>
                              dispatch(
                                handleRowItemSubChange({
                                  index: index,
                                  name: "lastName",
                                  value: e.target.value,
                                })
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className=" mt-4 flex gap-3 w-full">
                      <div className="w-[45%]">
                        <div className=" space-y-3">
                          <div className="text-stone-500 text-xs">
                            Infant Passport Number
                          </div>
                          <input
                            className="outline-none border-b focus:border-green-400 hover:border-blue-400 text-grayColor text-sm w-full"
                            type="text"
                            name="passportNo"
                            value={item?.infantDetails?.passportNo}
                            onChange={(e) =>
                              dispatch(
                                handleRowItemSubChange({
                                  index: index,
                                  name: "passportNo",
                                  value: e.target.value,
                                })
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
            <div className="flex justify-between">
              <div className="my-2 h-10">
                <input
                  className="outline-none no-spinner text-sm text-grayColor border rounded-l h-full px-2"
                  type={"number"}
                  value={markup}
                  onChange={(e) => setMarkup(e.target.value)}
                />
                <button className="text-[12px] text-white  bg-blue-600 rounded-r h-full px-5">
                  Add Markup
                </button>
              </div>
              <div className="w-1/3 space-y-2 my-2 text-sm text-darktext">
                <p className="flex justify-between items-center border-b">
                  <span className="">Travellers</span>
                  <span className="">{a2aEnquiry?.traveller}</span>
                </p>
                <p className="flex justify-between items-center border-b">
                  <span className="">Infants</span>
                  <span className="">{numberOfInfant}</span>
                </p>
                <p className="flex justify-between items-center border-b">
                  <span className="">Markup</span>
                  <span className="">{markup}</span>
                </p>
                <p className="flex justify-between items-center">
                  <span className="">Total</span>
                  <span className="text font-[600]">{`${
                    a2aEnquiry?.traveller
                  } X ${
                    Number(data?.price) + Number(markup)
                  }= ${priceConversion(
                    Number(a2aEnquiry?.traveller) * Number(data?.price) +
                      Number(numberOfInfant) * Number(data?.infantPrice) +
                      Number(markup),
                    selectedCurrency,
                    true
                  )} `}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="second__ col-span-4">
            <h4 className="font-[700] text-xl">Confirm Booking</h4>
            <div className="mt-3 bg-white p-5 rounded-xl shadow-sm space-y-2">
              <p className="flex justify-between items-center">
                <span className="">Airline Onward</span>
                <span className="">{data?.airlineOnward}</span>
              </p>
              <p className="flex justify-between items-center">
                <span className="">Airline Return</span>
                <span className="">{data?.airlineReturn}</span>
              </p>
              <p className="flex justify-between items-start">
                <span className=""> Depart</span>
                <p>
                  <p className="text-sm">{data?.airportFromName}</p>
                  <p className="text-right text-sm">
                    {formatDate(data?.onwardDate)}
                  </p>
                  <p className="text-right text-sm">
                    {`${data?.takeOffTimeOnward} - ${data?.landingTimeOnward}`}
                  </p>
                </p>
              </p>
              <p className="flex justify-between items-start">
                <span className=""> Return</span>
                <p>
                  <p className="text-sm">{data?.airportToName}</p>
                  <p className="text-right text-sm">
                    {formatDate(data?.returnDate)}
                  </p>
                  <p className="text-right text-sm">
                    {`${data?.takeOffTimeReturn} - ${data?.landingTimeReturn}`}
                  </p>
                </p>
              </p>
              <p className="flex justify-between items-center">
                <span className="">A2A</span>
                <span className="uppercase">
                  {data?.airportFromIata +
                    "-" +
                    data?.airportToIata +
                    "-" +
                    data?.airportFromIata}
                </span>
              </p>

              <p className="flex justify-between items-center">
                <span className="">Seats</span>
                <span className="">{a2aEnquiry?.traveller}</span>
              </p>
              <p className="flex justify-between items-center">
                <span className="">Infants</span>
                <span className="">{numberOfInfant}</span>
              </p>
              <p className="flex justify-between items-center">
                <span className="">Adult Fare</span>
                <span className="">
                  {priceConversion(data?.price, selectedCurrency, true)}
                </span>
              </p>
              <p className="flex justify-between items-center">
                <span className="">Infant Fare</span>
                <span className="">
                  {priceConversion(data?.infantPrice, selectedCurrency, true)}
                </span>
              </p>
              <p className="flex justify-between items-center">
                <span className="">Markup</span>
                <span className="">
                  {priceConversion(markup, selectedCurrency, true)}
                </span>
              </p>
              <p className="flex justify-between items-center text-lg font-[600]">
                <span className="">Total Fare</span>
                <span className="">
                  {priceConversion(
                    Number(a2aEnquiry?.traveller) * Number(data?.price) +
                      Number(numberOfInfant) * Number(data?.infantPrice) +
                      Number(markup),
                    selectedCurrency,
                    true
                  )}
                </span>
              </p>
              {Number(a2aEnquiry?.traveller) * Number(data?.price) +
                Number(numberOfInfant) * Number(data?.infantPrice) +
                Number(markup) <
              availableBalance ? (
                <button
                  className=" text-center bg-blue-500 w-full text-white py-2 rounded-md"
                  onClick={() => {
                    setTermsModalOpen(true);
                    console.log(isTermsModalOpen);
                  }}
                >
                  Pay & Confirm
                </button>
              ) : (
                <button
                  className=" text-center bg-gray-500 w-full text-white py-2 rounded-md"
                  onClick={() => {
                    navigate("/wallet");
                  }}
                >
                  Recharge Wallet
                </button>
              )}
              <button
                onClick={() => navigate(-1)}
                className="text-center bg-gray-500 w-full text-white py-2 rounded-md"
              >
                Go Back
              </button>
              {isTermsModalOpen && (
                <TermsAndOtpModal
                  setTermsModalOpen={setTermsModalOpen}
                  isTermsModalOpen={isTermsModalOpen}
                  termsAndCond={data?.termsAndCond}
                  a2aTicket={data?._id}
                  noOfTravellers={a2aEnquiry?.traveller}
                  markup={markup}
                  totalPrice={
                    Number(a2aEnquiry?.traveller) * Number(data?.price) +
                    Number(numberOfInfant) * Number(data?.infantPrice) +
                    Number(markup)
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default A2ABookingIndexPage;
