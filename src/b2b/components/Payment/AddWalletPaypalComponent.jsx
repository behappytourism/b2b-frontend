// import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import React, { useEffect, useRef } from "react";
import axios from "../../../axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addWalletManipulation } from "../../../redux/slices/walletSlice";
import  { setAlertError, setAlertSuccess } from "../../../redux/slices/homeSlice"

function AddWalletPaypalComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.agents);


  const inputRef = useRef();

  const paypal = useRef();
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: async (data, actions, err) => {
          try {
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
            const response = await axios.post(
              "/b2b/resellers/wallet/deposit",
              {
                paymentProcessor: "paypal",
                amount: inputRef.current.value,
              },
              config
            );

            console.log(response.data.id);
            return response.data.id;
          } catch {
            dispatch(
              setAlertError({
                status: true,
                title: "Something went wrong!",
                text: "Error Creating Paypal Order",
              })
            );
            return "";
          }
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          let messageFromServer = "";
          try {
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
            const resFromServer = await axios.post(
              "/b2b/resellers/wallet/paypal/capture",
              {
                orderId: order.id,
                paymentId: order.purchase_units[0]?.payments["captures"][0]?.id,
              },
              config
            );
            messageFromServer = resFromServer.message;
            // Make Calls to backend to changes in react state corresponding to successful payment here
            console.log("Success");
            dispatch(
              setAlertSuccess({
                status: true,
                title: "Success!",
                text: "Payment Successful",
              })
            );
            dispatch(addWalletManipulation(inputRef.current.value));
            navigate("/");
          } catch {
            console.log("Error in payment");
          }
          console.log(data);
          console.log(order);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);
  return (
    <div>
      <div className="flex justify-center my-3">
        <div className="relative w-full h-14 py-4 px-3 mb-8 border border-gray-400 hover:border-gray-400 focus-within:border-green-500 rounded-lg">
          <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-100 rounded px-1 bg-gray-500">
            Enter Amount to be added to wa llet
          </span>
          <input
            className="block w-full h-full outline-none bg-transparent text-sm text-gray-400 font-medium no-spinner"
            id="signInInput4-1"
            ref={inputRef}
            type="number"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, '');
            }}
          />
        </div>{" "}
      </div>
      <div className="" ref={paypal}></div>
    </div>
  );
}

export default AddWalletPaypalComponent;
