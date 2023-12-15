import React, { useEffect, useState } from "react";
import { companyLogo, logoPng } from "../../static/imagesB2B";
import axios from "../../axios";
import { setAgent } from "../../redux/slices/agentSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BtnLoader } from "../components";
import { BiHide, BiShow } from "react-icons/bi";
import ForgotPasswordModal from "../components/features/ForgotPasswordModal";
import { config } from "../../constants";

function B2BLoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    agentCode: "",
    password: "",
  });
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");

  const handleChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setError("");
      setIsLoading(true);
      const response = await axios.post("/b2b/resellers/auth/login", data);

      dispatch(setAgent(response.data));
      setIsLoading(false);
      navigate("/");
    } catch (err) {
      if (err?.response?.data?.error === "Invalid credentials") {
        setError("You have given incorrect email or password");
      } else {
        err?.response?.data?.status === 500
          ? setError("Something went wrong!!!")
          : setError(err?.response?.data?.error);
      }
      setIsLoading(false);
    }
  };

  const { isLoggedIn } = useSelector((state) => state.agents);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const submitForgotPasswordHandler = async (e) => {
    try {
      e.preventDefault();
      setError("");
      setIsLoading(true);
      const response = await axios.patch("/b2b/resellers/forget/password", {
        email: forgotEmail,
      });
      setIsLoading(false);
      setForgotPasswordModal(true);
    } catch (err) {
      setError(err?.response?.data?.error);
      setIsLoading(false);
    }
  };

  return (
    <section className="relative pt-24  min-h-screen">
      <div className="hidden lg:block absolute top-0 right-0 h-full w-1/2">
        <img
          className="absolute top-0 left-0 h-full w-full object-cover"
          src={config.LOGIN_BANNER}
          alt=""
        />
        <div className="relative p-20">
          <Link className="inline-block mb-56" to="#"></Link>
          <div className="max-w-xl">
            <p className="text-3xl font-semibold text-white leading-10 mb-8">
              Our B2B travel provider connects businesses in the travel industry
              with a diverse range of travel products and services. With our
              tailored solutions, our partners can offer their clients a
              seamless and personalized travel experience.
            </p>
            <div className="flex items-center mb-12">
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <div className="container px-4 mx-auto">
        <div className="lg:w-1/2">
          {isForgotPassword ? (
            <div className="relative max-w-xs lg:max-w-md mx-auto text-center">
              <Link className="inline-block mx-auto mb-5" to="/">
                <img className="block" src={companyLogo} alt="logo" />
              </Link>
              <h2 className="text-2xl text-gray-300 font-semibold mb-2">
                Forgot Password
              </h2>
              <form onSubmit={submitForgotPasswordHandler}>
                <div className="relative w-full h-14 py-2 px-3 mt-12 border border-gray-400 hover:border-blue-400 focus-within:border-green-500 rounded-lg">
                  <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-100 rounded px-1 bg-blue-500">
                    Please enter your Email.
                  </span>
                  <input
                    className="block w-full h-full outline-none bg-transparent text-sm text-gray-400 font-medium"
                    type="text"
                    name="forgotEmail"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between mb-6">
                  <div className="flex items-center mb-4 sm:mb-0"></div>
                  <div className="w-full sm:w-auto">
                    <div
                      className="inline-block text-xs font-semibold text-blue-500 hover:text-blue-600 cursor-pointer"
                      onClick={() => setIsForgotPassword(false)}
                    >
                      Back to login
                    </div>
                  </div>
                </div>
                {error && (
                  <p className="text-sm capitalize text-main mb-1">{error} </p>
                )}
                <button className="block w-full py-4 mb-4 leading-6 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-200">
                  {isLoading ? <BtnLoader /> : "Send OTP"}
                </button>
                <p className="font-medium">
                  <span className="text-gray-300">Don’t have an account?</span>
                  <Link
                    className="inline-block text-blue-500 hover:underline"
                    to="/register"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
              {forgotPasswordModal && (
                <ForgotPasswordModal
                  forgotEmail={forgotEmail}
                  setForgotPasswordModal={setForgotPasswordModal}
                  setIsForgotPassword={setIsForgotPassword}
                />
              )}
            </div>
          ) : (
            <div className="relative max-w-xs lg:max-w-md mx-auto text-center">
              <Link className="inline-block mx-auto mb-5" to="/">
                <img className="block h-20" src={companyLogo} alt="logo" />
              </Link>
              <h2 className="text-2xl text-gray-300 font-semibold mb-2">
                Log in to your account
              </h2>
              <p className="text-gray-300 font-medium mb-10">
                Welcome back! Please enter your details.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="relative w-full h-14 py-2 px-3 mb-8 border border-gray-400 hover:border-blue-400 focus-within:border-green-500 rounded-lg">
                  <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-100 rounded px-1 bg-blue-500">
                    Agent Code
                  </span>
                  <input
                    className="block w-full h-full outline-none bg-transparent text-sm text-gray-400 font-medium"
                    id="signInInput4-1"
                    type="text"
                    name="agentCode"
                    value={data.agentCode}
                    onChange={handleChange}
                    required
                  />
                </div>{" "}
                <div className="relative w-full h-14 py-2 px-3 mb-8 border border-gray-400 hover:border-blue-400 focus-within:border-green-500 rounded-lg">
                  <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-100 rounded px-1 bg-blue-500">
                    Email
                  </span>
                  <input
                    className="block w-full h-full outline-none bg-transparent text-sm text-gray-400 font-medium"
                    type="text"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="relative w-full h-14 py-2 px-3 mb-6 border border-gray-400 hover:border-blue-400 focus-within:border-green-500 rounded-lg">
                  <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-100 rounded px-1 bg-blue-500">
                    Password
                  </span>
                  <p
                    className="text-2xl absolute top-1/2 transform -translate-y-1/2 right-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <BiShow /> : <BiHide />}
                  </p>
                  <input
                    className="block w-full h-full outline-none bg-transparent text-sm text-gray-400 font-medium"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between mb-6">
                  <div className="flex items-center mb-4 sm:mb-0"></div>
                  <div className="w-full sm:w-auto">
                    <div
                      className="inline-block text-xs font-semibold text-blue-500 hover:text-blue-600 cursor-pointer"
                      onClick={() => setIsForgotPassword(true)}
                    >
                      Forgot password?
                    </div>
                  </div>
                </div>
                {error && (
                  <p className="text-sm capitalize text-main mb-1">{error} </p>
                )}
                <button className="block w-full py-4 mb-4 leading-6 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-200">
                  {isLoading ? <BtnLoader /> : "Login"}
                </button>
                <p className="font-medium">
                  <span className="text-gray-300">Don’t have an account?</span>
                  <Link
                    className="inline-block text-blue-500 hover:underline"
                    to="/register"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default B2BLoginPage;
