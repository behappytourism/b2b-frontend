import React, { useEffect, useState } from "react";
import priceConversion from "../../../../../utils/PriceConversion";
import { useSelector } from "react-redux";
import { AiFillEdit } from "react-icons/ai";
import AgentMarkupModal from "./AgentMarkupModal";

function RoomTypeSingle({ roomtype }) {
  const [isMarkup, setIsMarkup] = useState(false);

  const [markupData, setMarkupData] = useState(roomtype?.subAgentMarkup);

  useEffect(() => {
    setMarkupData(roomtype?.subAgentMarkup);
  }, [roomtype]);

  const { selectedCurrency } = useSelector((state) => state.home);
  return (
    <tr
      key={roomtype?.name}
      className=" bg-gray-50 shadow-inner hover:bg-gray-50/50 "
    >
      <td className="p-3 capitalize">{roomtype?.name}</td>
      
      <td className="p-3">
        <p className="flex gap-2">
          {markupData.markup === 0 ? (
            "N/A"
          ) : (
            <span className="">
              {markupData.markupType === "flat"
                ? priceConversion(
                    markupData.markup,
                    selectedCurrency,
                    true
                  )
                : markupData.markup}
              {markupData.markupType === "flat" ? "" : " %"}
            </span>
          )}
          <p
            className="underline text-lightblue  text-lg cursor-pointer"
            onClick={() => {
              setIsMarkup(true);
            }}
          >
            <AiFillEdit />
          </p>
        </p>

        {isMarkup && (
          <AgentMarkupModal
            setIsMarkup={setIsMarkup}
            setMarkupData={setMarkupData}
            markupData={markupData}
            roomTypeId={roomtype?.roomTypeId}
            roomName={roomtype?.name}
          />
        )}
      </td>
    </tr>
  );
}

export default RoomTypeSingle;
