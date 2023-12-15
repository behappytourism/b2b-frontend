import React from "react";
import { Link } from "react-router-dom";

export default function WalletCard({
  title,
  value,
  link,
  linkText,
  icon,
  isAmount = false,
}) {
  return (
    <div className={`bg-white rounded shadow-sm p-4`}>
      <span className="block text-[13px] text-grayColor uppercase font-medium">
        {title}
      </span>
      <div className="flex items-end justify-between">
        <div className="mt-2">
          <div className="flex items-end space-x-1">
            <span className="block font-[600] text-xl">{value}{isAmount && " AED"}</span>
            <p className="text-[10px] text-text font-light">amount left*</p>
          </div>
          <Link
            to={link}
            className="text-[13px] text-textColor underline block mt-3 capitalize"
          >
            {linkText}
          </Link>
        </div>
        <div className="w-[40px] h-[40px]">
          <img src={icon} alt="" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
