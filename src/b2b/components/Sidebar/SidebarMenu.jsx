import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SidebarMenu({
  icon,
  name,
  dropdown,
  link,
  setSidebarView,
  sidebarView,
}) {
  const navigate = useNavigate();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const location = useLocation();

  return (
    <li className="group relative mb-4">
      <div
        className={
          `relative p-4 flex items-center text-[14.8px] justify-between  transition-all cursor-default rounded-xl  ` +
          (location.pathname === link
            ? "  text-white bg-blue-500 "
            : "text-gray-300  hover:bg-gray-800  ")
        }
        onClick={() => {
          if (
            link !== "#" &&
            name === "Home" &&
            location.pathname.startsWith("/attraction")
          ) {
            navigate("/");
            setSidebarView(false);
          } else if (
            link !== "#" &&
            name === "Home" &&
            location.pathname.startsWith("/visa")
          ) {
            navigate("/visa");
            setSidebarView(false);
          } else if (
            link !== "#" &&
            name === "Home" &&
            location.pathname.startsWith("/flight")
          ) {
            navigate("/flight");
            setSidebarView(false);
          } else if (
            link !== "#" &&
            name === "Home" &&
            location.pathname.startsWith("/hotel")
          ) {
            navigate("/hotel");
            setSidebarView(false);
          } else if (
            link !== "#" &&
            name === "Home" &&
            location.pathname.startsWith("/a2a")
          ) {
            navigate("/a2a");
            setSidebarView(false);
          } else {
            navigate(link);
            setSidebarView(false);
          }
          setIsDropDownOpen(!isDropDownOpen);
        }}
      >
        <span className="flex items-center gap-[15px] font-[600] transition-all">
          <i className="transition-all text-lg">{icon}</i>
          {name}
        </span>
      </div>
    </li>
  );
}
