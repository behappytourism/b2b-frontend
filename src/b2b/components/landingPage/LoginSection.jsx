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
import BtnLoader from "../BtnLoader";
import './loginSection.css'
import alertimg from '../../../../public/alert.png'

const LoginSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.agents);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [frogotPasswordResponse, setFrogotPasswordResponse] = useState(
    {
      response:false,
      message:''
    }
  );
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [forgotEmail, setForgotEmail] = useState("");


  const handleChange = (e) => {
    setError("")
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

      if (response?.data?.status === "pending") {
        navigate(`/verification/${response?.data?.agentCode}`);
      } else if (response?.data?.status === "ok") {
        dispatch(setAgent(response.data));
        navigate("/");
      }

      setIsLoading(false);
    } catch (err) {
      if (err?.response?.data?.error === "Invalid credentials") {
        setError("You have given incorrect email or password");
        // dispatch(
        //   setAlertError({
        //     status: true,
        //     title: "Invalid credentials!",
        //     text: "You have given incorrect email or password",
        //   })
        // );
        setIsLoading(false);
        return;
      } else {
        err?.response?.data?.status === 500
          ? setError("Something went wrong!!!")
          : setError(err?.response?.data?.error);
        // dispatch(
        //   setAlertError({
        //     status: true,
        //     title: "Something went wrong!",
        //     text:
        //       err?.response?.data?.error ||
        //       "Sorry! Login unsuccessfull. Please try again.",
        //   })
        // );
        setIsLoading(false);
        return;
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);



  function forgotpasswordMessageHandler(message) {
    setFrogotPasswordResponse({
      response:true,
      message:message
    });
  
    const forgotmessagetimer = setTimeout(() => {
      setFrogotPasswordResponse(
        {
          response:false,
          message:message
        }
      );
    }, 3000);
  
    return () => clearTimeout(forgotmessagetimer);
  }

  const submitForgotPasswordHandler = async (e) => {
    try {
      e.preventDefault();
      setError("");
      setIsLoading(true);
      const response = await axios.patch("/b2b/resellers/forget/password", {
        email: forgotEmail,
      });
      console.log("response",response);
      if(response.data.message){forgotpasswordMessageHandler(response.data.message)}
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
        <div className=" bg-white rounded-3xl w-96 h-[350px]  shadow-xl relative overflow-hidden">
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
          {/* {frogotPasswordResponse.response && <p className="forget-mail-message mt-2 text-center text-sm text-red-500">!</p>} */}
          {<p className={`${frogotPasswordResponse.response?'message-in':'message-out'} forget-mail   mt-2 text-center text-sm text-stone-600 rounded-lg flex gap-1 font-medium items-center`}><span className={`${frogotPasswordResponse.response?'':'hidden'}`}><img className="w-[20px]" src={alertimg} alt="" /></span> {frogotPasswordResponse.message}</p>}

        </div>
      </form>
    );
  };

  const renderLoginSection = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className=" bg-white rounded-3xl w-96 h-[350px] shadow-xl">
          <div className="pt-8 pl-8">
            <h1 className="text-lg font-semibold">Login Now</h1>
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
                    value={data?.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <h1 className="text-red-500">{error}</h1>
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
               {isLoading ? <BtnLoader /> : "Login"}
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  };

  return (
    <div>
         <div className=" w-full md:h-96 h-auto relative">

          <div className="w-full h-full hidden lg:block">
            <div className="flex justify-center">
              <img
              className="w-96 flex justify-center h-full object-cover "
                src="https://cdni.iconscout.com/illustration/premium/thumb/international-travel-3217263-2745445.png"
                alt=""
              />
            </div>
          </div>
        <div className="flex md:flex-row flex-col justify-center p-2 md:absolute md:left-0 md:right-0  md:top-0">
        <div className="order-last md:order-first md:flex gap-1 w-1/2">
          <div className="ml-10 xs:ml-12 sm:ml-28 md:ml-0">
            <div className="pt-12">
              <h1 className="md:text-5xl max-w-md text-4xl font-extrabold ">
                Your Gateway to Unforgettable{" "}
                <div className="pt-1">
                  <span className="text-green-400">UAE Experiences</span>
                </div>
              </h1>
            </div>
            <div className="pt-5">
              <h1 className="text-xsbase max-w-xs text-lg">
                We understand happiness at every guest Touchpoint, all we got
                covered to create unforgettable memory
              </h1>
            </div>
          </div>
       
        </div>
        <div className="order-first md:order-last pt-1 flex justify-center">
          {isForgotPassword
            ? renderForgotPasswordSection()
            : renderLoginSection()}
        </div>

        {/* <div className="order-last md:order-first md:flex gap-1 w-1/2">
          <div className="ml-28 md:ml-0">
            <div className="pt-20">
              <h1 className="md:text-5xl text-3xl font-extrabold ">
                Your Gateway to Unforgettable{" "}
                <div className="pt-1">
                  <span className="text-green-400">UAE Experiences</span>
                </div>
              </h1>
            </div>
            <div className="pt-5">
              <h1 className="text-xsbase max-w-xs text-lg">
                We understand happiness at every guest Touchpoint, all we got
                covered to create unforgettable memory
              </h1>
            </div>
          </div>
          <div className="hidden lg:block w-full h-96">
            <img
            className="w-full h-full"
              src="https://cdni.iconscout.com/illustration/premium/thumb/international-travel-3217263-2745445.png"
              alt=""
            />
          </div>
        </div> */}

      
      </div>
          </div>
      
    </div>
  );
};

export default LoginSection;
