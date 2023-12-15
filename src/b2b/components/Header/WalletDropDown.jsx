import React from "react";
import { FaWallet } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { Link } from "react-router-dom";


export default function walletDropDown() {

  return (
    <div
      className="absolute left-16 top-7 md:top-14 bg-white shadow-[0_5px_10px_rgb(30_32_37_/_12%)] rounded min-w-[180px] py-2"
    >
      <span className="block px-4 py-2 text-[13px] font-medium text-grayColor">
        Choose Method of Payment
      </span>
      <Link to='/payment/approval'>
        <span className="flex items-center gap-[10px] text-sm py-[6px] px-4 cursor-pointer hover:bg-[#f3f6f9]">
          <FaWallet />
          Add to Wallet
        </span>
      </Link>
      <Link to='#'>
        <span
          className="flex items-center gap-[10px] text-sm py-[6px] px-4 cursor-pointer hover:bg-[#f3f6f9]"
          onClick={() => ''}
        >
          <GiMoneyStack />
          Withdraw
        </span>
      </Link>
    </div>
  );
}
