import React, { useEffect, useState } from "react";
import ItenarySection from "./ItenarySection";
import TravellerDetails from "./TravellerDetails";
import { BsArrowRightCircle, BsCheck2Circle } from "react-icons/bs";
import MakePaymentSection from "./MakePaymentSection";
import UploadDetailSection from "./UploadDetailSection";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setVisaEnquiry, setVisas } from "../../../redux/slices/visaSlice";
import axios from "../../../axios";
import priceConversion from "../../../utils/PriceConversion";
import { useSearchParams } from "react-router-dom";

function VisaNavigator() {
  const dispatch = useDispatch();
  const [navigation, setNavigation] = useState({
    itenary: true,
    details: false,
    payment: false,
    upload: false,
  });

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(
      setVisaEnquiry({
        visaType: searchParams.get("visaType")
          ? searchParams.get("visaType")
          : "",
        nationality: searchParams.get("nationality")
          ? searchParams.get("nationality")
          : "",
        noOfAdult: 1,
        noOfChild: "",
      })
    );
  }, [dispatch]);

  const { id } = useParams();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVisa, setSelectedVisa] = useState({});

  const { token } = useSelector((state) => state.agents);
  const { visa, visaEnquiry } = useSelector((state) => state.visa);
  const { selectedCurrency } = useSelector((state) => state.home);

  const fetchVisas = async (id) => {
    try {
      setError("");
      setIsLoading(true);
      const response = await axios.get(
        `/b2b/visa/type/${id}/all/${searchParams.get("nationality")}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setVisas(response.data));
      setIsLoading(false);
    } catch (err) {
      setError(err?.response?.data?.error);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVisas(id);
  }, [id]);

  useEffect(() => {
    if (visa?.visaTypes?.length > 0) {
      for (let item of visa?.visaTypes) {
        if (item._id === visaEnquiry?.visaType) {
          setSelectedVisa(item);
        }
      }
    }
  }, [visaEnquiry]);

  const totalPrice =
    +selectedVisa?.adultPrice * visaEnquiry?.noOfAdult +
    +selectedVisa?.childPrice * visaEnquiry?.noOfChild +
    selectedVisa?.insurance +
    selectedVisa?.tax;

  return (
    <>
      <div className=" rounded-lg sticky top-0 z-10">
        <div className=" text-darktext max-w-screen-xl mx-auto ">
          <div className=" overflow-x-auto scrollbar-hide">
            <div className=" w-full flex justify-between items-center ">
              <button
                className={`col-span-2 flex w-full justify-center text-[10px] lg:text-sm md:text-base items-center px-2 md:px-3 py-3  hover:text-lightblue  ${
                  navigation.details ||
                  navigation.itenary ||
                  navigation.upload ||
                  navigation.payment
                    ? "border-b-4  text-lightblue"
                    : ""
                } border-blue-500  hover:border-b-4 duration-300 space-x-1 `}
                onClick={() => {
                  navigation.details &&
                    setNavigation({
                      itenary: true,
                      details: false,
                      payment: false,
                      upload: false,
                    });
                }}
              >
                {/* <span className=''><FaWpforms /></span> */}
                <span className="">Itenary</span>
              </button>

              <button
                className={`col-span-1 hidden w-full lg:flex justify-center text-sm md:text-base items-center px-5 md:px-3 py-3   duration-300 space-x-1 ${
                  navigation.details || navigation.upload || navigation.payment
                    ? "border-b-4 text-lightblue"
                    : ""
                } border-blue-500  `}
              >
                {navigation.details ||
                navigation.upload ||
                navigation.payment ? (
                  <span className="text-xl text-lightblue">
                    <BsCheck2Circle />
                  </span>
                ) : (
                  <span className="text-xl">
                    <BsArrowRightCircle />{" "}
                  </span>
                )}
              </button>
              <button
                className={`col-span-2 w-full flex  justify-center text-[10px] lg:text-sm md:text-base items-center px-5 md:px-3 py-3  hover:text-lightblue  ${
                  navigation.details || navigation.upload || navigation.payment
                    ? "border-b-4 text-lightblue"
                    : ""
                } border-blue-500 hover:border-b-4 duration-300 space-x-1  whitespace-nowrap`}
              >
                <span className="">Traveller Details</span>
              </button>
              <button
                className={`col-span-1 hidden lg:flex w-full justify-center text-sm md:text-base items-center px-5 md:px-3 py-3   duration-300 space-x-1 ${
                  navigation.upload || navigation.payment
                    ? "border-b-4 text-lightblue"
                    : ""
                } border-blue-500 `}
              >
                {navigation.upload || navigation.payment ? (
                  <span className="text-xl text-lightblue">
                    <BsCheck2Circle />
                  </span>
                ) : (
                  <span className="text-xl">
                    <BsArrowRightCircle />{" "}
                  </span>
                )}
              </button>
              <button
                className={`col-span-2 flex w-full justify-center text-[10px] lg:text-sm md:text-base items-center px-5 md:px-3 py-3  hover:text-lightblue  ${
                  navigation.upload || navigation.payment
                    ? "border-b-4 text-lightblue"
                    : ""
                } border-blue-500 hover:border-b-4 duration-300 space-x-1  whitespace-nowrap`}
              >
                <span className="">Make Payment</span>
              </button>
              <button
                className={`col-span-1 hidden lg:flex w-full justify-center text-sm md:text-base items-center px-5 md:px-3 py-3  duration-300 space-x-1 ${
                  navigation.upload ? "border-b-4  text-lightblue" : ""
                } border-blue-500 `}
              >
                {navigation.upload ? (
                  <span className="text-xl text-lightblue">
                    <BsCheck2Circle />
                  </span>
                ) : (
                  <span className="text-xl">
                    <BsArrowRightCircle />{" "}
                  </span>
                )}
              </button>
              <button
                className={`col-span-2 flex w-full justify-center text-[10px] lg:text-sm md:text-base items-center px-6 md:px-3 py-3  hover:text-lightblue ${
                  navigation.upload ? "border-b-4  text-lightblue" : ""
                } border-blue-500 hover:border-b-4 duration-300 space-x-1  whitespace-nowrap`}
              >
                {/* <span className=''><FaQuoteRight /></span> */}
                <span className="">Upload Details</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="main max-w-screen-xl mx-auto">
        <div className=" flex gap-2 px-5 py-5">
          <div className="w-full md:w-[80%]">
            <div className="">
              <ItenarySection
                navigation={navigation}
                setNavigation={setNavigation}
              />
            </div>

            <div className="">
              <TravellerDetails
                navigation={navigation}
                setNavigation={setNavigation}
              />
            </div>
            <div className="">
              <MakePaymentSection
                totalPrice={totalPrice}
                navigation={navigation}
                setNavigation={setNavigation}
              />
            </div>
            <div className="">
              <UploadDetailSection
                navigation={navigation}
                setNavigation={setNavigation}
              />
            </div>
          </div>
          <div className="md:w-[20%] hidden md:block py-2 lg:pr-6">
            <div className="bg-gray-100 shadow-sm rounded p-2 text-darktext">
              <p className="text-[16px]">Fare Details</p>
              <div className="border-b border-darktext py-2">
                <div className="flex justify-between">
                  <p className="text-[14px]">Adult Price</p>
                  <p className="text-[14px]">
                    {priceConversion(
                      selectedVisa?.adultPrice,
                      selectedCurrency,
                      true
                    )}{" "}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[14px]">Child Price</p>
                  <p className="text-[14px]">
                    {priceConversion(
                      selectedVisa?.childPrice,
                      selectedCurrency,
                      true
                    )}{" "}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[14px]">Tax</p>
                  <p className="text-[14px]">
                    {priceConversion(selectedVisa?.tax, selectedCurrency, true)}{" "}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[14px]">Insurance</p>
                  <p className="text-[14px]">
                    {priceConversion(
                      selectedVisa?.insurance,
                      selectedCurrency,
                      true
                    )}{" "}
                  </p>
                </div>
              </div>
              <div className="border-b border-darktext py-2">
                <div className="flex justify-between">
                  <p className="text-[14px]">Traveller</p>
                  <p className="text-[14px]">
                    {Number(visaEnquiry?.noOfAdult) +
                      Number(visaEnquiry?.noOfChild)}{" "}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[14px]">Total Fare</p>
                  <p className="text-[14px]">
                    {priceConversion(totalPrice, selectedCurrency, true)}{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VisaNavigator;
