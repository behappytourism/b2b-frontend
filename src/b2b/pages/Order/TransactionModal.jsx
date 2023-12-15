import React, { useState } from "react";
import { BiTransferAlt } from "react-icons/bi";
import { CgSandClock } from "react-icons/cg";
import { GiConfirmed } from "react-icons/gi";
import { ImCancelCircle } from "react-icons/im";
import { BsBookmarkCheck } from "react-icons/bs";

function TransactionModal({ setFilters, setTransactionType, setOrders }) {
  return (
    <div className=" absolute bg-gray-200 w-[250px] right-0 text-darktext rounded-sm py-3 cursor-pointer z-10">
      <div
        className="flex items-center space-x-2 hover:bg-gray-100 py-1 px-2 "
        onClick={() => {
          setOrders([])
          setFilters((prev) => {
            return {
              ...prev,
              skip: 0,
              status: "",
            };
          });
          setTransactionType(false);
        }}
      >
        <span className="">
          <BiTransferAlt />{" "}
        </span>
        <span className="">All Transactions</span>
      </div>
      <div
        className="flex space-x-2 items-center hover:bg-gray-100 py-1 px-2 "
        onClick={() => {
          setOrders([])
          setFilters((prev) => {
            return {
              ...prev,
              skip: 0,
              status: "pending",
            };
          });
          setTransactionType(false);
        }}
      >
        <span className="">
          <CgSandClock />{" "}
        </span>
        <span className="">Pending Transactions</span>
      </div>
      <div
        className="flex space-x-2 items-center hover:bg-gray-100 py-1 px-2 "
        onClick={() => {
          setOrders([])
          setFilters((prev) => {
            return {
              ...prev,
              skip: 0,
              status: "booked",
            };
          });
          setTransactionType(false);
        }}
      >
        <span className="">
          <BsBookmarkCheck />{" "}
        </span>
        <span className="">Booked Transactions</span>
      </div>
      <div
        className="flex space-x-2 items-center hover:bg-gray-100 py-1 px-2 "
        onClick={() => {
          setOrders([])
          setFilters((prev) => {

            return {
              ...prev,
              skip: 0,
              status: "confirmed",
            };
          });
          setTransactionType(false);
        }}
      >
        <span className="">
          <GiConfirmed />{" "}
        </span>
        <span className="">Confirmed Transactions</span>
      </div>
      <div
        className="flex items-center space-x-2 hover:bg-gray-100 py-1 px-2 "
        onClick={() => {
          setOrders([])
          setFilters((prev) => {
            return {
              ...prev,
              skip: 0,
              status: "cancelled",
            };
          });
          setTransactionType(false);
        }}
      >
        <span className="">
          <ImCancelCircle />{" "}
        </span>
        <span className="">Cancelled Transactions</span>
      </div>
    </div>
  );
}

export default TransactionModal;
