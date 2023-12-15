import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { MdPassword } from "react-icons/md";
import { useRef } from 'react';
import { BtnLoader } from '../../components';
import axios from "../../../axios"
import { useSelector } from 'react-redux';


function InsuranceConformModal({setCreateModal, orderId}) {
  const {token} = useSelector(state => state.agents)

  const oneRef = useRef(null);
  useEffect(() => {
    oneRef.current.focus();
  }, []);

  const [isLoading, setIsLoading] = useState(false)
  const [otp, setOtp] = useState("12345")

  const onChangeHandler = (e) =>{
    console.log(e.target.value);

  }

  const submitHandler = async (e) => {

    try{
      setIsLoading(true)
      const res = await axios.post(`/b2b/insurance/create-contract`,{
        orderId:orderId.orderId,
        otp:otp
      },{
        headers: {Authorization: `Bearer ${token}`}
      })
      console.log(res);
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
    }
  }

  return (
    <div className="z-50 fixed top-0 left-0 right-0 bottom-0 flex items-center w-full h-full p-4 lightglass overflow-y-auto">
      <div className="max-w-xl w-full mx-auto bg-white rounded-xl overflow-hidden">
        <form >
          <div className="text-gray-400 flex justify-center py-5">
            <div className="mt-2">
              <div className="flex justify-center w-full">
                <div class="flex items-center justify-center w-12 h-12 mb-5 bg-gray-200 text-blue-500 rounded-full text-2xl">
                  <MdPassword />
                </div>
              </div>
              <h1 className="text-2xl text-center font-bold">
                OTP Verification
              </h1>
              <span>Enter the OTP you received at</span>
              <span className="font-bold">
                {/* {order?.contactDetails?.phoneNumber} */}
              </span>
              <div className="font-bold text-center">
                <span className="font-normal">or</span>{" "}
                {/* {order?.contactDetails?.email} */}
              </div>
            </div>
          </div>
          <div
            id="otp"
            className="flex flex-row justify-center text-center  my-5"
          >
            <input
              ref={oneRef}
              className="m-2 no-spinner border h-10 w-10 text-center form-control rounded bg-white border-gray-300 outline-none text-gray-400"
              type="text"
              id="first"
              maxLength={1}
              tabIndex={1}
              name="one"
              // value={otp.one}
              onChange={onChangeHandler}
            />
            <input
              className="m-2 no-spinner border h-10 w-10 text-center form-control rounded bg-white border-gray-300 outline-none text-gray-400"
              type="text"
              id="second"
              maxLength={1}
              tabIndex={2}
              name="two"
              // value={otp.two}
              onChange={onChangeHandler}
            />
            <input
              className="m-2 no-spinner border h-10 w-10 text-center form-control rounded bg-white border-gray-300 outline-none text-gray-400"
              type="text"
              id="third"
              maxLength={1}
              tabIndex={3}
              name="three"
              // value={otp.three}
              onChange={onChangeHandler}
            />
            <input
              className="m-2 no-spinner border h-10 w-10 text-center form-control rounded bg-white border-gray-300 outline-none text-gray-400"
              type="text"
              id="fourth"
              maxLength={1}
              tabIndex={4}
              name="four"
              // value={otp.four}
              onChange={onChangeHandler}
            />
            <input
              className="m-2 no-spinner border h-10 w-10 text-center form-control rounded bg-white border-gray-300 outline-none text-gray-400"
              type="text"
              id="fifth"
              maxLength={1}
              tabIndex={5}
              name="five"
              // value={otp.five}
              onChange={onChangeHandler}
            />
          </div>
          {/* {error && (
            <p className="text-xs  text-red-500 text-right py-1">{error}</p>
          )} */}
          {/* <button className="inline-block w-full sm:w-auto py-3 px-5 mb-2 text-center font-semibold leading-6 text-blue-50 bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-200">Submit</button> */}
          <div className="pt-5 pb-6 px-6 text-right bg-primaryColor -mb-2">
            {/* <div className="inline-block w-full sm:w-auto py-3 px-5 mb-2 mr-4 text-center font-semibold leading-6 text-gray-200 bg-gray-500 hover:bg-gray-400 rounded-lg transition duration-200">
      Resend OTP
    </div> */}
            <button
              type="button"
              onClick={submitHandler}
              className="inline-block w-full sm:w-auto py-3 px-5 mb-2 text-center font-semibold leading-6 text-blue-50 bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-200"
            >
              {isLoading ? <BtnLoader /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default InsuranceConformModal
