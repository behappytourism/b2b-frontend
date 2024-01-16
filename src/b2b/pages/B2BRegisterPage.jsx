import React, { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import { GiFactory } from "react-icons/gi";
import { GoPerson } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axios.js";
import { setRegisterAgent } from "../../redux/slices/agentSlice";
import { BtnLoader } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import { setAlertSuccess } from "../../redux/slices/homeSlice";
import { config } from "../../constants";
import LandingPageHeader from "../components/landingPage/LandingPageHeader.jsx";

function B2BRegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, setRegister] = useState({
    comapny: true,
    profile: false,
    password: false,
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [data, setData] = useState({
    companyName: "",
    address: "",
    website: "",
    country: "",
    trnNumber: "",
    companyRegistration: "",
    city: "",
    zipCode: "",
    name: "",
    phoneNumber: "",
    telephoneNumber: "",
    email: "",
    designation: "",
    skypeId: "",
    whatsappNumber: "",
    password: "",
  });
  const [showPassword, setShowPasword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [info, setInfo] = useState(false);
  const [result, setResult] = useState({});

  const { countries, UAE } = useSelector((state) => state.home);

  const onChangeHandler = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setError("");
      if (data.password !== confirmPassword) {
        setError("password you have entered is not similiar");
      }
      if (data.password === confirmPassword) {
        setIsLoading(true);

        const response = await axios.post("/b2b/resellers/auth/signup", data);
        dispatch(setRegisterAgent(response.data));
        setResult(response.data);
        setIsLoading(false);
        dispatch(
          setAlertSuccess({
            status: true,
            title: "Successfully Regsitered",
            text: "You should wait until allow approve",
          })
        );
        setInfo(true);
      }
    } catch (err) {
      setError(err?.response?.data?.error || "Something went wrong, Try again");
      setIsLoading(false);
    }
  };

  const country = countries?.filter((item) => item._id === data.country);

  const { isLoggedIn } = useSelector((state) => state.agents);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const companyInformationSection = () => {
    return (
      <div className="space-y-5">
        <h2 className="text-[15px] uppercase font-semibold tracking-wide space-x-2 flex pt-2">
          <span className="">
            <GiFactory />{" "}
          </span>
          <span className="">Company Information</span>
        </h2>

        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 md:gap-6 xl:gap-x-10 xl:gap-y-6">
          <label className="flex flex-col gap-2">
            <label className="text-left pl-1">
              Company Name <span className="text-lg text-red-600">*</span>
            </label>
            <input
              className="block w-full h-12 outline-none bg-transparent text-sm text-gray-400 font-medium border border-BEColor rounded-lg px-4 "
              type="text"
              name="companyName"
              value={data.companyName}
              onChange={onChangeHandler}
              required
            />
          </label>

          <label className="flex flex-col gap-2">
            <label className="text-left pl-1">
              Company Address <span className="text-lg text-red-600">*</span>
            </label>
            <input
              className="block w-full h-12 outline-none bg-transparent text-sm text-gray-400 font-medium border border-BEColor rounded-lg px-4 "
              type="text"
              name="address"
              value={data.address}
              onChange={onChangeHandler}
              autoComplete="off"
            />
          </label>

          <label className="flex flex-col gap-2">
            <label className="text-left pl-1">
              Website <span className="text-lg text-red-600">*</span>
            </label>
            <input
              className="block w-full h-12 outline-none bg-transparent text-sm text-gray-400 font-medium border border-BEColor rounded-lg px-4 "
              type="text"
              name="website"
              value={data.website}
              onChange={onChangeHandler}
            />
          </label>

          <label className="flex flex-col gap-2">
            <label className="text-left pl-1">
              Country <span className="text-lg text-red-600">*</span>
            </label>
            <select
              className="block w-full h-12 outline-none bg-transparent text-sm text-gray-400 font-medium border border-BEColor rounded-lg px-4 capitalize"
              name="country"
              value={data.country}
              onChange={onChangeHandler}
            >
              <option className="text-text" hidden></option>
              {countries?.map((item, index) => (
                <option className="capitalize" value={item?._id} key={index}>
                  {item?.countryName}{" "}
                </option>
              ))}
            </select>
          </label>
          {data.country === UAE?._id ? (
            <>
              <label className="flex flex-col gap-2">
                <label className="text-left pl-1">
                  TRN Number <span className="text-lg text-red-600">*</span>
                </label>
                <input
                  className="block w-full h-12 outline-none bg-transparent text-sm text-gray-400 font-medium border border-BEColor rounded-lg px-4 "
                  type="number"
                  name="trnNumber"
                  value={data.trnNumber}
                  onChange={onChangeHandler}
                />
              </label>

              <label className="flex flex-col gap-2">
                <label className="text-left pl-1">
                  Company Registration Number{" "}
                  <span className="text-lg text-red-600">*</span>
                </label>
                <input
                  className="block w-full h-12 outline-none bg-transparent text-sm text-gray-400 font-medium border border-BEColor rounded-lg px-4 "
                  type="number"
                  name="companyRegistration"
                  value={data.companyRegistration}
                  onChange={onChangeHandler}
                />
              </label>
            </>
          ) : (
            ""
          )}

          <label className="flex flex-col gap-2">
            <label className="text-left pl-1">
              City <span className="text-lg text-red-600">*</span>
            </label>
            <input
              className="block w-full h-12 outline-none bg-transparent text-sm text-gray-400 font-medium border border-BEColor rounded-lg px-4 "
              type="text"
              name="city"
              value={data.city}
              onChange={onChangeHandler}
            />
          </label>

          {data.country !== UAE?._id ? (
            <label className="flex flex-col gap-2">
              <label className="text-left pl-1">
                Zip Code <span className="text-lg text-red-600">*</span>
              </label>
              <input
                className="block w-full h-12 outline-none bg-transparent text-sm text-gray-400 font-medium border border-BEColor rounded-lg px-4 "
                type="number"
                name="zipCode"
                value={data.zipCode}
                onChange={onChangeHandler}
              />
            </label>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  };
  //
  const profileInformation = () => {
    return (
      <div className="space-y-5">
        <h2 className="text-[15px] uppercase font-semibold tracking-wide space-x-2 flex pt-2">
          <span className="">
            <GoPerson />{" "}
          </span>
          <span className="">Profile Information</span>
        </h2>

        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 md:gap-6 xl:gap-x-10 xl:gap-y-6">
          <label className="flex flex-col gap-2">
            <label className="text-left pl-1">
              Owner Name <span className="text-lg text-red-600">*</span>
            </label>
            <input
              className="block w-full h-12 outline-none bg-transparent text-sm text-gray-400 font-medium border border-BEColor rounded-lg px-4 "
              type="text"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
            />
          </label>
          <div className="grid grid-cols-12  gap-1">
            <label className="col-span-3  flex flex-col space-y-2">
              <label className="text-left pl-1">Code</label>
              <input
                className="block w-full h-12 outline-none bg-transparent text-sm text-gray-400 font-medium border border-BEColor rounded-lg px-4 "
                value={country?.map((item) => item?.phonecode) || ""}
                readOnly
              />
            </label>
            <label className=" col-span-9 flex flex-col space-y-1">
              <label className="text-left pl-1">
                Contact Number <span className="text-lg text-red-600">*</span>
              </label>
              <input
                className="block w-full h-12 outline-none bg-transparent text-sm text-gray-400 font-medium border border-BEColor rounded-lg px-4 "
                type="number"
                name="phoneNumber"
                value={data.phoneNumber}
                onChange={onChangeHandler}
              />
            </label>
          </div>
          <div className="grid grid-cols-12  gap-1">
            <label className="col-span-3  flex flex-col space-y-2">
              <label className="text-left pl-1">Code</label>
              <input
                className="block w-full h-12 outline-none bg-transparent text-sm text-gray-400 font-medium border border-BEColor rounded-lg px-4 "
                value={country?.map((item) => item?.phonecode) || ""}
                readOnly
              />
            </label>
            <label className=" col-span-9 flex flex-col space-y-1">
              <label className="text-left pl-1">
                Telephone Number <span className="text-lg text-red-600">*</span>
              </label>
              <input
                className="block w-full h-12 outline-none bg-transparent text-sm text-gray-400 font-medium border border-BEColor rounded-lg px-4 "
                type="number"
                name="telephoneNumber"
                value={data.telephoneNumber}
                onChange={onChangeHandler}
              />
            </label>
          </div>

          <label className="flex flex-col gap-2">
            <label className="text-left pl-1">
              Email <span className="text-lg text-red-600">*</span>
            </label>
            <input
              className="block w-full h-12 outline-none bg-transparent text-sm text-gray-400 font-medium border border-BEColor rounded-lg px-4 "
              type="email"
              name="email"
              value={data.email}
              onChange={onChangeHandler}
            />
          </label>


          <label className="flex flex-col gap-2">
            <label className="text-left pl-1">
              Whatsapp <span className="text-lg text-red-600">*</span>
            </label>
            <input
              className="block w-full h-12 outline-none bg-transparent text-sm text-gray-400 font-medium border border-BEColor rounded-lg px-4 "
              type="number"
              name="whatsappNumber"
              value={data.whatsappNumber}
              onChange={onChangeHandler}
            />
          </label>
        </div>
      </div>
    );
  };
  //
  const passwordSettingSection = () => {
    return (
      <div className="space-y-5">
        <h2 className="text-[15px] uppercase font-semibold tracking-wide space-x-2 flex pt-2">
          <span className="">
            <FaLock />{" "}
          </span>
          <span className="">Password Settings</span>
        </h2>

        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 md:gap-6 xl:gap-x-10 xl:gap-y-6">
          <label className="relative flex flex-col gap-2">
            <label className="text-left pl-1">
              New Password <span className="text-lg text-red-600">*</span>
            </label>
            <p
              className=" text-2xl absolute top-2/3 transform -translate-y-1/2 right-3 cursor-pointer"
              onClick={() => {
                setShowPasword(!showPassword);
              }}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </p>
            <input
              className="block w-full h-12 outline-none bg-transparent text-sm text-gray-400 font-medium border border-BEColor rounded-lg px-4 "
              type={showPassword ? "text" : "password"}
              name="password"
              value={data.password}
              onChange={onChangeHandler}
              required
              autoComplete="new-password"
            />
          </label>

          <label className="relative flex flex-col gap-2">
            <label className="text-left pl-1">
              Confirm Password <span className="text-lg text-red-600">*</span>
            </label>
            <p
              className=" text-2xl absolute top-2/3 transform -translate-y-1/2 right-3 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </p>
            <input
              className="block w-full h-12 outline-none bg-transparent text-sm text-gray-400 font-medium border border-BEColor rounded-lg px-4 "
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </label>
        </div>
      </div>
    );
  };
  //
  const signupCompleteSection = () => {
    return (
      <div className=" text-darktext space-y-2 text-sm max-w-screen-md mx-auto">
        <div className="flex justify-center mt-4">
          <h3 className="text-xl font-[700] text-green-700 uppercase">
            Thank You for registering our B2B Portal
          </h3>
        </div>
        <div className=" mx-10 space-y-2">
          <p className="">
            You will be allowed to access the business portal only after getting
            confirmation from the managemant side.
          </p>
          <p className="">
            Please wait until you get confirmation email.Then proceed to login
            our B2B portal.
          </p>
          <p className="">
            {" "}
            You will be only allowed to access this email for another
            registraion either access confirmation from management side nor
            rejection from the management side{" "}
          </p>
        </div>
        <div className="text-center py-7">
          <h4 className="uppercase text-text font-[700]">Your Agent Code is</h4>
          <p className="text-green-700 font-[700]">
            {result?.data?.agentCode}{" "}
          </p>
        </div>
        <div className="mx-10 bg-gray-200 p-6 text-gray-500 space-y-1">
          <p className="">
            Please save this for further login purposes. You can access other
            details from the corresponding email you have provided
          </p>
          <p className="">
            You can move to
            <Link to="/login">
              <span className="text-main font-[550] cursor-pointer">Login</span>
            </Link>{" "}
            from here.Click!!{" "}
          </p>
          <div className="flex justify-end">
            <p
              className="text-lightblue font-[550] cursor-pointer"
              onClick={() => {
                setInfo(false);
              }}
            >
              Back
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <LandingPageHeader />
      <section className="relative py-10 min-h-screen">
        <div className="container px-4 mx-auto">
          <div className="w-full">
            <div className="relative text-center space-y-10">
              <Link className="inline-block h-14 mx-auto mb-5" to="/">
                <img
                  className="block h-32"
                  src={config.COMPANY_LOGO}
                  alt="logo"
                />
              </Link>

              <div className="">
                <h2 className="tracking-wide text-xl">New B2B Registration</h2>
              </div>

              {!info ? (
                <form onSubmit={handleSubmit}>
                  {companyInformationSection()}
                  {profileInformation()}
                  {passwordSettingSection()}

                  <div className="pt-10 flex justify-center">
                    <button
                      disabled={isLoading}
                      className="border rounded-full max-w-sm w-full h-12 bg-sky-400 hover:bg-black hover:text-white text-white"
                    >
                      {isLoading ? <BtnLoader /> : "Signup"}
                    </button>
                  </div>
                  {error ? (
                    <div className="flex justify-center py-3">
                      <p className="text-main text-xs capitalize">{error} </p>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="pt-4">
                    <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                      Already have an account?
                      <Link
                        to="/login"
                        className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                      >
                        Login
                      </Link>
                    </p>
                  </div>
                </form>
              ) : (
                signupCompleteSection()
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default B2BRegisterPage;
