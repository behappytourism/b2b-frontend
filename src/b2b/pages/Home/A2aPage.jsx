import React from "react";
import { Calender } from "../../components";
import SearchCards from "../../components/Cards/SearchCards";
import MobileAppCard from "../../components/Footers/MobileAppCard";

function A2aPage() {
  return (
    <div className="">
      <SearchCards />
      <div className="flex items-center justify-start shadow-b-sm shadow-x-sm max-w-screen-xl mx-auto">
        <div className=" w-full mt-7 md:rounded-md relative pb-20 ">
          <Calender />
        </div>
      </div>
      {/* <MobileAppCard /> */}
    </div>
  );
}

export default A2aPage;
