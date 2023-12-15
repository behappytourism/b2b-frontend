import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorSearchCard from "./ErrorSearchCard";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="h-[100vh] w-full">
      <div className="w-full flex flex-col justify-center items-center h-full">
        <h1 className="text-6xl font-[900] font-demo">Page not found</h1>
        {/* <img className="w-full h-full" src="https://www.hostpapa.com/blog/app/uploads/2020/09/What-are-broken-links-header.jpg" alt="" /> */}
        <p className="text-sm text-gray-400 mt-4">
          It happens! Now, let’s try to get you back on track.
        </p>
        <div className="pt-5">
          <ErrorSearchCard />
        </div>
        <div className="flex justify-center gap-4 pt-10">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="py-2 px-7 shadow-mn rounded text-gray-500 text-sm font-medium"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
