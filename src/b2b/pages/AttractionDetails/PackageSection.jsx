import React from "react";
import { useSelector } from "react-redux";
import ActivityComponent from "./ActivityComponent";

function PackageSection() {
  const { agentRecievedActivities } = useSelector(
    (state) => state.agentExcursions
  );


  return (
    <>
      <div className=" my-2 text-xl text-darktext font-bold tracking-wider">
        Select Tour Options
      </div>
      <div className="rounded-sm overflow-x-auto">
        <div className=" ">
          {agentRecievedActivities &&
            agentRecievedActivities?.map((item, index) => (
              <ActivityComponent item={item} index={index} key={index} />
            ))}
        </div>
      </div>
    </>
  );
}

export default PackageSection;
