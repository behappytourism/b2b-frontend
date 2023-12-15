import React, { useState } from "react";
import ActivityListTable from "./ActivityListTable";

function MarkupListSingleRow({ item }) {

  const [isDropdown, setIsDropdown] = useState(false)

  return (
    <>
      <div className="border-b border-tableBorderColor">
        <p
        onClick={() => setIsDropdown(!isDropdown)}
         className="p-3 bg-white cursor-pointer ">{item?.title}</p>
      </div>
      {isDropdown ? (
      <div className="overflow-x-auto">
        <table className="w-full border rounded border-gray-100 shadow">
          <thead className="bg-stone-200 rounded">
            <tr className="w-full">
              <th className="p-3 text-left">Index</th>
              <th className="p-3 text-left">Activity Name</th>
              <th className="p-3 text-left">Sub-agent Markup</th>
            </tr>
          </thead>
          <tbody>
            {item?.activities?.map((activity, index) => (
              <ActivityListTable
                key={activity?._id}
                index={index}
                activity={activity}
              />
            ))}
          </tbody>
        </table>
      </div>
      ) : ""}
    </>
  );
}

export default MarkupListSingleRow;
