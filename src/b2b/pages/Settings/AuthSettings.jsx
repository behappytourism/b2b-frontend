import React, { useState } from "react";
import { BtnLoader } from "../../components";
import axios from "../../../axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setAlertError,
  setAlertSuccess,
} from "../../../redux/slices/homeSlice";
import { useNavigate } from "react-router-dom";

function AuthSettings() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { token } = useSelector((state) => state.agents);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      if (confirmPassword === newPassword) {
        setError("");
        setIsLoading(true);

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.patch(
          "/b2b/resellers/auth/update/password",
          { oldPassword, newPassword, confirmPassword },
          config
        );
        setIsLoading(false);
        dispatch(
          setAlertSuccess({
            status: true,
            title: "Password Changed!",
            text: "Password Update Successful",
          })
        );
        navigate("/")
        return response.data;
      }
    } catch (err) {
      setError(err?.response?.data?.error || "Something went wrong, Try again");
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
  console.log(newPassword, oldPassword, confirmPassword);

  return (
    <div className="px-5 py-10 shadow-round rounded-sm">
      <form onSubmit={submitHandler}>
        <div className="space-y-5 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-[20px]">

          <div className="space-y-3">
            <div className="text-xs text-grayColor"> Old Password</div>
            <input
              className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
              type="password"
              placeholder="*******"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-3">
            <div className="text-xs text-grayColor"> New Password</div>
            <input
              className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
              type="password"
              placeholder="*******"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-3">
            <div className="text-xs text-grayColor"> Confirm Password</div>
            <input
              className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
              type="password"
              placeholder="*******"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-end gap-[12px]">
          {error && (
            <div className="flex justify-end">
              <p className="text-main text-xs capitalize">{error} </p>
            </div>
          )}
          <button className="h-8 px-5 bg-orange-500 text-white text-xs rounded-sm shadow-mn  " type="submit">
            {isLoading ? <BtnLoader /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuthSettings;
