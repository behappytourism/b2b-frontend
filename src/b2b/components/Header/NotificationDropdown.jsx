import React from "react";
import { BiLogOut } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";

function NotificationDropdown() {
  return (
    <div
      className=" md:top-12  bg-white shadow-[0_5px_10px_rgb(30_32_37_/_12%)] rounded min-w-[250px] py-2"
    >
      <span className="block px-4 py-2 text-[13px] font-medium text-grayColor">
        Notification
      </span>
      <span className="flex items-center gap-[10px] text-sm py-[6px] px-4 cursor-pointer hover:bg-[#f3f6f9] border-b border-dashed">
        Notification one
      </span>
      <span
        className="flex items-center gap-[10px] text-sm py-[6px] px-4 cursor-pointer hover:bg-[#f3f6f9] border-b border-dashed"
      >
        Notification two
      </span>
    </div>
  )
}

export default NotificationDropdown