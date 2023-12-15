import React from "react";
import { useNavigate } from "react-router-dom";

function HotelErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="max-w-screen-lg mx-auto  min-h-screen">
      <div className="flex flex-col justify-center items-center gap-3  min-h-screen">
        <h2 className="text-gray-300 font-[900] text-5xl font-demo">
          Payment Failed!
        </h2>
        <p className="text-sm text-gray-400 font-mono">
          Sorry payment failed. please try again
        </p>
        <button
          onClick={() => navigate("/")}
          className="font-mono text-uppercase underline text-blue-600"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

export default HotelErrorPage;
