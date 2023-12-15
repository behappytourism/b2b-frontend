import React from 'react'
import { Outlet } from "react-router-dom";
import Footer from "../../b2b/components/Footers/Footer";

function TransferModule() {
  return (
    <div className="">
    <div className="min-h-[70vh]">
      <Outlet />
    </div>
    <Footer module="a2as" />
  </div>
  )
}

export default TransferModule
