import React, { useState } from "react";
import HotelsTab from "./HotelsTab";
import StarCategoryTab from "./StarCategoryTab";

function HotelMarkupList() {
  const [tab, setTab] = useState("starCategory");

  const renderTab = (tab) => {
    switch (tab) {
      case "starCategory":
        return <StarCategoryTab />;
      case "hotels":
        return <HotelsTab />;
      default:
        return "";
    }
  };

  const renderTabTitle = () => {
    return (
      <div className="m-5 text-gray-400 font-demo flex gap-7 px-3 border-b">
        <p
          onClick={() => setTab("starCategory")}
          className={`${
            tab == "starCategory"
              ? " font-medium text-lightblue border-b-2 border-lightblue "
              : " "
          } px-2 cursor-pointer`}
        >
          Star Category
        </p>
        <p
          onClick={() => setTab("hotels")}
          className={`${
            tab == "hotels"
              ? " font-medium text-lightblue border-b-2 border-lightblue "
              : " "
          } px-2 cursor-pointer`}
        >
          Hotels
        </p>
      </div>
    );
  };

  return (
    <>
      <div className=" ">
        <div className="max-w-screen-xl mx-auto">
          <div className=" py-10">
            <div className="overflow-x-auto shadow-[0_0_7px_2px_rgb(56_65_74_/_5%)]">
              {renderTabTitle()}
              {renderTab(tab)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HotelMarkupList;
