import React from "react";
import { BiLogOut } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logoutAgent } from "../../../redux/slices/agentSlice";


export default function AdminDropdown() {
    // const { agent } = useSelector((state) => state.agents);
    const dispatch = useDispatch();

    return (
        <div
            className="absolute -left-12 top-7 md:top-10 bg-white shadow-[0_5px_10px_rgb(30_32_37_/_12%)] rounded min-w-[180px] py-2"
        >
            {/* <span className="block px-4 py-2 text-[13px] font-medium text-grayColor">
                Welcome {agent?.name}
            </span>
            <span className="flex items-center gap-[10px] text-sm py-[6px] px-4 cursor-pointer hover:bg-[#f3f6f9]">
                <FiSettings />
                Settings
            </span> */}
            <span
                className="flex items-center gap-[10px] text-sm py-[6px] px-4 cursor-pointer hover:bg-[#f3f6f9]"
                onClick={() => dispatch(logoutAgent())}
            >
                <BiLogOut />
                Logout
            </span>
        </div>
    );
}
