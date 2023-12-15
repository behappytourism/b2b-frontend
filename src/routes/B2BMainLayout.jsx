import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../b2b/components";
import ErrorAlert from "../b2b/components/Alerts/ErrorAlert";
import SuccessAlert from "../b2b/components/Alerts/SuccessAlert";
import BottomNav from "../b2b/components/BottomNavigattion/BottomNav";
import CookieInstallApp from "../b2b/components/CookieInstallApp";
import Footer from "../b2b/components/Footers/Footer";

export default function B2BMainLayout() {
  const [sidebarView, setSidebarView] = useState(false);
  const [isFirst, setIsFirst] = useState(
    localStorage.getItem("isFirst")
      ? JSON.parse(localStorage.getItem("isFirst"))
      : true
  );
  return (
    <>
      {isFirst ? <CookieInstallApp setIsFirst={setIsFirst} /> : ""}
      <div className="relative ">
        <Header sidebarView={sidebarView} setSidebarView={setSidebarView} />
        <main>
          <div className="">
            <Outlet />
          </div>
          <SuccessAlert />
          <ErrorAlert />

          {/* <Footer /> */}
          <BottomNav setSidebarView={setSidebarView} />
        </main>
      </div>
    </>
  );
}
