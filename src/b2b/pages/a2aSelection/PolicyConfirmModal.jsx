import React from "react";
import { useNavigate } from "react-router-dom";

export default function PolicyConfirmModal({
  setIsPolicyModalOpen,
  isPolicyModalOpen,
  note,
}) {
  const navigate = useNavigate();

  return (
    <div
      className={
        "fixed inset-0 w-full h-full  flex items-center justify-center z-20  lightglass " +
        (isPolicyModalOpen ? "block" : "hidden")
      }
    >
      <div className="bg-[#fff] w-full max-h-[90vh] rounded-2xl max-w-[600px]  shadow-[0_1rem_3rem_rgb(0_0_0_/_18%)] overflow-y-auto">
        <div className="flex items-center bg-primaryColor justify-between border-b p-4">
          <h2 className="font-medium text-xl mb-2 text-white">Policy</h2>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: note,
          }}
          className="p-4 space-y-2"
        ></div>
        <div className="flex justify-between pb-5 px-5 gap-5">
          <button
            className="w-full rounded text-white bg-gray-400 py-2"
            onClick={() => navigate(`/`)}
          >
            Cancel
          </button>
          <button
            className="w-full rounded text-white bg-primaryColor py-2"
            onClick={() => setIsPolicyModalOpen(false)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
