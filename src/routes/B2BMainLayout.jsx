import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../b2b/components";
import ErrorAlert from "../b2b/components/Alerts/ErrorAlert";
import SuccessAlert from "../b2b/components/Alerts/SuccessAlert";
import BottomNav from "../b2b/components/BottomNavigattion/BottomNav";
import CookieInstallApp from "../b2b/components/CookieInstallApp";
import Footer from "../b2b/components/Footers/Footer";
import { BsWhatsapp } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function B2BMainLayout() {
  const { socialMedias } = useSelector((state) => state.home);

  const [sidebarView, setSidebarView] = useState(false);
  const [isFirst, setIsFirst] = useState(
    localStorage.getItem("isFirst")
      ? JSON.parse(localStorage.getItem("isFirst"))
      : true
  );
  return (
    <>
      {/* {isFirst ? <CookieInstallApp setIsFirst={setIsFirst} /> : ""} */}
      <div className="relative ">
        <Header sidebarView={sidebarView} setSidebarView={setSidebarView} />
        <main>
          <div className="">
            <Outlet />
          </div>
          <a href={`https://wa.me/${socialMedias?.phoneNumber2}`}>
            <div className="fixed p-2 animate-bounce bg-white shadow-lg rounded-xl  hover:bg-slate-200 right-2 top-[570px]">
              <h1 className="text-green-500 text-3xl"><BsWhatsapp /></h1>
            </div>

          </a>
          <SuccessAlert />
          <ErrorAlert />

          {/* <Footer /> */}
          <BottomNav setSidebarView={setSidebarView} />
        </main>
      </div>
    </>
  );
}
