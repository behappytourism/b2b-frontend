import React, { useEffect, useState } from "react";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { MdPassword } from "react-icons/md";
import { RxEyeClosed } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../axios";
import {
  setAlertError,
  setAlertSuccess,
} from "../../../redux/slices/homeSlice";
import BtnLoader from "../../components/BtnLoader";
import Toggle from "../../components/Toggle";
import { reduceWalletManipulation } from "../../../redux/slices/walletSlice";
import BankDetails from "./BankDetails";

function WithdrawModal({ setViewWithdrawModal }) {
  const dispatch = useDispatch();
  const [isOtpModal, setIsOtpModal] = useState(false);
  const [data, setData] = useState({
    isoCode: "",
    bankName: "",
    branchName: "",
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    ibanCode: "",
    amount: 0,
  });
  const [selectedBankAccount, setSelectedBankAccount] = useState({
    index: 0,
    data: {},
  });
  const [isNewBankAccount, setIsNewBankAccount] = useState(true);
  const [bankAccounts, setBankAccounts] = useState([]);

  const [otp, setOtp] = useState({
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
  });
  const [withdrawRequestId, setWithdrawRequestId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onChangeHandler = (e) => {
    if (!otp[e.target.name] || !e.target.value) {
      setOtp((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }

    if (e.target.value) {
      const next = e.target.tabIndex;
      if (next < 5) {
        e.target.parentNode.childNodes[next].focus();
      }
    } else {
      const next = e.target.tabIndex - 2;
      if (next > -1) {
        e.target.parentNode.childNodes[next].focus();
      }
    }
  };

  const { token } = useSelector((state) => state.agents);
  const { countries } = useSelector((state) => state.home);

  const fetchBanks = async () => {
    try {
      const response = await axios.get("/b2b/banks/all", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setBankAccounts(response?.data);
      if (response?.data?.length) {
        setIsNewBankAccount(false);
        setSelectedBankAccount({
          index: 0,
          data: response?.data[0],
        });
      }
    } catch (err) {
      dispatch(
        setAlertError({
          status: true,
          title: "Something went wrong!",
          text: err?.response?.data?.error,
        })
      );
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setError("");
      setIsLoading(true);

      let body = {};
      if (isNewBankAccount) {
        body = { isNewBankAccount: isNewBankAccount, ...data };
      } else {
        body = {
          isNewBankAccount: isNewBankAccount,
          amount: data?.amount,
          bankDeatilId: selectedBankAccount?.data?._id,
        };
      }
      const response = await axios.post(
        "/b2b/wallets/withdraw-requests/initiate",
        body,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(false);
      setWithdrawRequestId(response?.data?.withdrawRequestId);
      dispatch(
        setAlertSuccess({
          status: true,
          title: "Success",
          text: "Withdraw initiaion success",
        })
      );
      setIsOtpModal(true);
    } catch (err) {
      setError(err?.response?.data?.error);
      dispatch(
        setAlertError({
          status: true,
          title: "Something went wrong!",
          text: err?.response?.data?.error,
        })
      );
      setIsLoading(false);
    }
  };

  const submitOtpHandler = async (e) => {
    try {
      e.preventDefault();
      setError("");
      setIsLoading(true);
      const response = await axios.post(
        `/b2b/wallets/withdraw-requests/complete/${withdrawRequestId}`,
        {
          otp: otp?.one + otp?.two + otp?.three + otp?.four + otp?.five,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setViewWithdrawModal(false);
      dispatch(reduceWalletManipulation(data?.amount));
      dispatch(
        setAlertSuccess({
          status: true,
          title: "Success",
          text: response?.data?.success,
        })
      );
      setIsLoading(false);
    } catch (err) {
      setError(err?.response?.data?.error);
      dispatch(
        setAlertError({
          status: true,
          title: "Something went wrong!",
          text: err?.response?.data?.error,
        })
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  const renderOtpModal = () => {
    return (
      <div className="z-50 fixed top-0 left-0 right-0 bottom-0 flex items-center w-full h-full p-4 lightglass overflow-y-auto">
        <div className="max-w-xl w-full mx-auto bg-white rounded-xl overflow-hidden">
          <form onSubmit={submitOtpHandler}>
            <div className="text-gray-400 flex justify-center py-5">
              <div className="mt-2">
                <div className="flex justify-center w-full">
                  <div class="flex items-center justify-center w-12 h-12 mb-5 bg-blue-400 text-white rounded-full text-2xl">
                    <MdPassword />
                  </div>
                </div>
                <h1 className="text-2xl text-center font-bold">
                  OTP Verification
                </h1>
                <span>Enter the OTP you received at</span>
                <span className="font-bold">+91 ******876</span>
                <div className="font-bold text-center">
                  <span className="font-normal">or</span> example@gmail.com
                </div>
              </div>
            </div>
            <div
              id="otp"
              className="flex flex-row justify-center text-center  my-5"
            >
              <input
                className="m-2 no-spinner border h-10 w-10 text-center form-control rounded  border-gray-200 outline-none text-gray-500"
                type="text"
                id="first"
                maxLength={1}
                tabIndex={1}
                name="one"
                value={otp.one}
                onChange={onChangeHandler}
              />
              <input
                className="m-2 no-spinner border h-10 w-10 text-center form-control rounded  border-gray-200 outline-none text-gray-500"
                type="text"
                id="second"
                maxLength={1}
                tabIndex={2}
                name="two"
                value={otp.two}
                onChange={onChangeHandler}
              />
              <input
                className="m-2 no-spinner border h-10 w-10 text-center form-control rounded  border-gray-200 outline-none text-gray-500"
                type="text"
                id="third"
                maxLength={1}
                tabIndex={3}
                name="three"
                value={otp.three}
                onChange={onChangeHandler}
              />
              <input
                className="m-2 no-spinner border h-10 w-10 text-center form-control rounded  border-gray-200 outline-none text-gray-500"
                type="text"
                id="fourth"
                maxLength={1}
                tabIndex={4}
                name="four"
                value={otp.four}
                onChange={onChangeHandler}
              />
              <input
                className="m-2 no-spinner border h-10 w-10 text-center form-control rounded  border-gray-200 outline-none text-gray-500"
                type="text"
                id="fifth"
                maxLength={1}
                tabIndex={5}
                name="five"
                value={otp.five}
                onChange={onChangeHandler}
              />
            </div>
            <div className="pt-5 pb-6 px-6 text-right bg-orange-500 -mb-2">
              <button
                type="submit"
                className="inline-block w-full sm:w-auto py-3 px-5 mb-2 text-center font-semibold leading-6 text-blue-50 bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-200"
              >
                {isLoading ? <BtnLoader /> : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderNewBankAccountDetails = () => {
    return (
      <>
      <section className="w-full flex flex-col gap-[5%] sm:flex-row">
          <div className="w-full sm:w-1/2 ">
          <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full  px-3 ">
            <div className="relative w-full h-[40px] sm:h-14 py-2 px-3 border border-BEColor focus-within:border-green-500 rounded-lg">
              <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-50 px-1 bg-BEColor">
                Country
              </span>
              <select
                className="block h-full bg-blue-300 w-full outline-none bg-transparent capitalize text-sm text-gray-600 font-medium"
                name="isoCode"
                value={data.isoCode}
                onChange={handleChange}
                required
              >
                <option className="h-[2 00px]" hidden></option>{" "}
                {countries?.map((item) => (
                  <option className="capitalize bg-white max-h-[200px]" value={item?.isocode}>
                    {item?.countryName}{" "}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="relative w-full h-[40px] sm:h-14 py-2 px-3 mb-6 border border-BEColor focus-within:border-green-500 rounded-lg">
          <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-50 px-1 bg-BEColor">
            Account number
          </span>
          <input
            className="block w-full h-full outline-none bg-transparent text-sm text-gray-600 font-medium"
            id="modalInput9-4"
            type="text"
            name="accountNumber"
            value={data.accountNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="relative w-full h-[40px] sm:h-14 py-2 px-3 mb-6 border border-BEColor focus-within:border-green-500 rounded-lg">
          <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-50 px-1 bg-BEColor">
            Bank name
          </span>
          <input
            className="block w-full h-full outline-none bg-transparent text-sm text-gray-600 font-medium"
            id="modalInput9-4"
            type="text"
            name="bankName"
            value={data.bankName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="relative w-full h-[40px] sm:h-14 py-2 px-3 mb-6 border border-BEColor focus-within:border-green-500 rounded-lg">
          <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-50 px-1 bg-BEColor">
            Branch name
          </span>
          <input
            className="block w-full h-full outline-none bg-transparent text-sm text-gray-600 font-medium"
            id="modalInput9-4"
            type="text"
            name="branchName"
            value={data.branchName}
            onChange={handleChange}
            required
          />
        </div>
          </div>

          {/* second part */}
          <div className="w-full sm:w-1/2 ">
          {data?.isoCode === "IN" ? (
          <div className="relative w-full h-[40px] sm:h-14 py-2 px-3 mb-6 border border-BEColor focus-within:border-green-500 rounded-lg">
            <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-50 px-1 bg-BEColor">
              IFSC Code
            </span>
            <input
              className="block w-full h-full outline-none bg-transparent text-sm text-gray-600 font-medium"
              id="modalInput9-4"
              type="text"
              name="ifscCode"
              value={data.ifscCode}
              onChange={handleChange}
            />
          </div>
        ) : (
          <div className="relative w-full h-[40px] sm:h-14 py-2 px-3 mb-6 border border-BEColor focus-within:border-green-500 rounded-lg">
            <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-50 px-1 bg-BEColor">
              IBAN Code
            </span>
            <input
              className="block w-full h-full outline-none bg-transparent text-sm text-gray-600 font-medium"
              id="modalInput9-4"
              type="text"
              name="ibanCode"
              value={data.ibanCode}
              onChange={handleChange}
            />
          </div>
        )}
        <div className="relative w-full h-[40px] sm:h-14 py-2 px-3 mb-6 border border-BEColor focus-within:border-green-500 rounded-lg">
          <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-50 px-1 bg-BEColor">
            Account Holder name
          </span>
          <input
            className="block w-full h-full outline-none bg-transparent text-sm text-gray-600 font-medium"
            id="modalInput9-4"
            type="text"
            name="accountHolderName"
            value={data.accountHolderName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="relative w-full h-[40px] sm:h-14 py-2 px-3 mb-6 border border-BEColor focus-within:border-green-500 rounded-lg">
                <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-50 px-1 bg-BEColor">
                  Amount
                </span>
                <input
                  className="block w-full h-full outline-none bg-transparent text-sm text-gray-600 font-medium no-spinner"
                  id="modalInput9-4"
                  type="number"
                  name="amount"
                  value={data.amount}
                  onChange={handleChange}
                  required
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  }}
                />
              </div>
          </div>
      </section>
        
       
      </>
    );
  };

  const renderExistingBankDetails = () => {
    return (
      <div className="flex flex-col gap-4 mb-6">
        {bankAccounts?.length ? (
          bankAccounts?.map((bank, index) => {
            let selection = selectedBankAccount.index;
            return (
              <div
                onClick={() =>
                  setSelectedBankAccount({
                    index: index,
                    data: bank,
                  })
                }
                key={bank?._id}
                className={` rounded-xl ${
                  selection == index
                    ? " border-green-600  bg-green-100 shadow-mn "
                    : " border shadow-sm "
                }`}
              >
                <div className="p-4 flex flex-col gap-2">
                  <div className="flex flex-wrap justify-between">
                    <p className="font-semibold text-lg text-gray-400">
                      {bank.bankName}
                    </p>
                    <p className="text-gray-300 text-sm">{bank.branchName}</p>
                  </div>
                  <p className="text-sm font-light tracking-widest">
                    {"**********" + bank.accountNumber?.slice(-4)}
                  </p>
                  <p className="font-demo tracking-wide text-gray-400">
                    {bank.accountHolderName}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-5 text-sm font-demo text-center">
            Sorry you don't have any existing bank account.{" "}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {isOtpModal ? (
        renderOtpModal()
      ) : (
        <div className="fixed top-0  left-0 right-0 bottom-0 flex items-center w-full h-full py-[100px] px-4 lg:p-4 lightglass overflow-y-auto">
          <div className={`${isNewBankAccount?"max-w-5xl ":"max-w-xl"} w-full h-[500px] overflow-y-auto sm:h-fit mx-auto pt-6 px-6 pb-8 bg-white rounded-xl shadow-sm`}>
            <div className="flex justify-between ">
              <div className="flex flex-wrap items-center mb-6">
                <div className="flex items-center justify-center  h-14 w-14 mb-4 sm:mb-0 bg-gray-100 shadow-sm rounded-xl mr-4  text-orange-500 text-xl">
                  <BsFillCreditCard2FrontFill />
                </div>
                <div className="w-full sm:w-auto">
                  <h4 className="text-xl text-gray-500 leading-6 font-semibold">
                    Withdraw
                  </h4>
                  <span className="text-xs text-gray-300 font-semibold">
                    Withdraw money to bank from here
                  </span>
                </div>
              </div>
              <div
                className="flex items-center justify-center   h-14 w-14 sm:w-14   bg-gray-100 shadow-sm rounded-xl  text-orange-500 text-xl"
                onClick={() => setViewWithdrawModal(false)}
              >
                <RxEyeClosed />{" "}
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="pb-8 pt-2 flex items-center">
                <Toggle
                  value={isNewBankAccount}
                  onChange={(e) => setIsNewBankAccount(e.target.checked)}
                />
                <p className="text-xs font-semibold text-gray-300 pl-3 ">
                  Check this if it is new account
                </p>
              </div>
              {isNewBankAccount
                ? renderNewBankAccountDetails()
                : renderExistingBankDetails() }

              {!isNewBankAccount&&<div className="relative w-full h-14 py-2 px-3 mb-6 border border-BEColor focus-within:border-green-500 rounded-lg">
                <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-50 px-1 bg-BEColor">
                  Amount
                </span>
                <input
                  className="block w-full h-full outline-none bg-transparent text-sm text-gray-600 font-medium no-spinner"
                  id="modalInput9-4"
                  type="number"
                  name="amount"
                  value={data.amount}
                  onChange={handleChange}
                  required
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  }}
                />
              </div>}
              {error && (
                <p className="text-red-500 text-[11px] pb-1">{error}</p>
              )}
              <button
                disabled={!isNewBankAccount && bankAccounts.length == 0}
                className="block w-full h-full py-3 px-6 text-center text-blue-50 font-semibold leading-6 bg-orange-500 hover:bg-orange-600 rounded-xl transition duration-200"
              >
                {isLoading ? <BtnLoader /> : "Withdraw"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default WithdrawModal;
