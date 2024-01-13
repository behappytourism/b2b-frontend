import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import { BiHide, BiShow } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAlertError } from "../../../redux/slices/homeSlice";
import { setAgent } from "../../../redux/slices/agentSlice";
import { IoIosLock } from "react-icons/io";
import { BsPersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

const LoginSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.agents);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    agentCode: "",
    password: "",
  });
  const [forgotEmail, setForgotEmail] = useState("");

  const handleChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setIsLoading(true);
      const response = await axios.post("/b2b/resellers/auth/login", data);

      dispatch(setAgent(response.data));
      setIsLoading(false);
      navigate("/");
    } catch (err) {
      if (err?.response?.data?.error === "Invalid credentials") {
        setError("You have given incorrect email or password");
        dispatch(
          setAlertError({
            status: true,
            title: "Invalid credentials!",
            text: "You have given incorrect email or password",
          })
        );
        setIsLoading(false);
        return;
      } else {
        err?.response?.data?.status === 500
          ? setError("Something went wrong!!!")
          : setError(err?.response?.data?.error);
        dispatch(
          setAlertError({
            status: true,
            title: "Something went wrong!",
            text:
              err?.response?.data?.error ||
              "Sorry! Login unsuccessfull. Please try again.",
          })
        );
        setIsLoading(false);
        return;
      }
    }
  };

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

  const renderForgotPasswordSection = () => {
    return (
      <form onSubmit={submitForgotPasswordHandler}>
        <div className=" bg-white rounded-3xl w-96 h-96 shadow-xl">
          <div className="pt-8 pl-8">
            <h1 className="text-lg font-semibold">Forgot Password</h1>
          </div>
          <div className="grid p-5 pl-8 gap-5">
            <div>
              <div className="flex">
                <div className="h-12 w-10 bg-slate-200 rounded-l-full">
                  <h1 className="p-[14px] text-xl text-gray-400">
                    <MdEmail />
                  </h1>
                </div>
                <div>
                  <input
                    type="email"
                    className="bg-slate-200 h-12 w-72 rounded-r-full outline-none placeholder:text-sm placeholder:"
                    placeholder="Email"
                    name="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mr-8 ">
            <h1
              onClick={() => setIsForgotPassword(false)}
              className="text-sm cursor-pointer"
            >
              Back to login
            </h1>
          </div>
          <div className="flex justify-center">
            <div className="pt-5">
              <button
                type="submit"
                className="border rounded-full w-32 h-9 hover:bg-sky-400 bg-black hover:text-white text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  };

  const renderLoginSection = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className=" bg-white rounded-3xl w-96 h-96 shadow-xl">
          <div className="pt-8 pl-8">
            <h1 className="text-lg font-semibold">Login Now</h1>
          </div>
          <div className="grid p-5 pl-8 gap-5">
            <div className="">
              <div className="flex">
                <div className="h-12 w-10 bg-slate-200 rounded-l-full">
                  <h1 className="p-[14px] text-xl text-gray-400">
                    <BsPersonFill />
                  </h1>
                </div>
                <div>
                  <input
                    type="text"
                    className="bg-slate-200 h-12 w-72 rounded-r-full outline-none placeholder:text-sm placeholder:"
                    placeholder="Agent Code"
                    name="agentCode"
                    value={data.agentCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="flex">
                <div className="h-12 w-10 bg-slate-200 rounded-l-full">
                  <h1 className="p-[14px] text-xl text-gray-400">
                    <MdEmail />
                  </h1>
                </div>
                <div>
                  <input
                    type="email"
                    className="bg-slate-200 h-12 w-72 rounded-r-full outline-none placeholder:text-sm placeholder:"
                    placeholder="Email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="flex">
                <div className="h-12 w-10 bg-slate-200 rounded-l-full">
                  <h1 className="p-[14px] text-xl text-gray-400">
                    <IoIosLock />
                  </h1>
                </div>
                <div className="relative">
                  <p
                    className="text-2xl absolute top-1/2 transform -translate-y-1/2 right-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <BiShow /> : <BiHide />}
                  </p>
                  <input
                    className="bg-slate-200 h-12 w-72 rounded-r-full outline-none placeholder:text-sm placeholder:"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mr-8 ">
            <h1
              onClick={() => setIsForgotPassword(true)}
              className="text-sm cursor-pointer"
            >
              Forgot password?
            </h1>
          </div>
          <div className="flex justify-center">
            <div className="pt-5">
              <button
                type="submit"
                className="border rounded-full w-32 h-9 hover:bg-sky-400 bg-black hover:text-white text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  };

  return (
    <div>
      <div className="flex md:flex-row flex-col gap-5 md:gap-20 justify-center p-5 ">
        <div className="order-last md:order-first md:flex gap-1">
          <div className="">
            <div className="pt-20">
              <h1 className="text-5xl font-extrabold">Start Your</h1>
              <h1 className="text-5xl font-extrabold">
                Journey <span className="text-green-400">Enjoy</span>
              </h1>
            </div>
            <div className="pt-5">
              <h1 className="text-xs max-w-xs">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Placeat, optio in.
              </h1>
            </div>
            <div className="pt-10 ">
              <button className="h-14 text-white w-44 bg-sky-400 rounded-full">
                Explore More
              </button>
            </div>
          </div>
          <div className="hidden lg:block">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/international-travel-3217263-2745445.png"
              alt=""
            />
          </div>
        </div>
        <div className="order-first md:order-last pt-10 flex justify-center">
          {isForgotPassword
            ? renderForgotPasswordSection()
            : renderLoginSection()}
        </div>
      </div>
    </div>
  );
};

export default LoginSection;
