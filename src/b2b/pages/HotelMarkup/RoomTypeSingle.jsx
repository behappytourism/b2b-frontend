import React, { useEffect, useState } from "react";
import priceConversion from "../../../utils/PriceConversion";
import { useSelector } from "react-redux";
import { AiFillEdit } from "react-icons/ai";
import ClientMarkupModal from "./ClientMarkupModal";
import AgentMarkupModal from "./AgentMarkupModal";

function RoomTypeSingle({ roomtype }) {
  const [isMarkup, setIsMarkup] = useState(false);

  const [markupData, setMarkupData] = useState({
    subAgent: roomtype?.subAgentMarkup,
    client: roomtype?.clientMarkup,
  });

  useEffect(() => {
    setMarkupData({
      subAgent: roomtype?.subAgentMarkup,
      client: roomtype?.clientMarkup,
    });
  }, [roomtype]);

  const { selectedCurrency } = useSelector((state) => state.home);
  return (
    <tr
      key={roomtype?.roomTypeId}
      className=" bg-gray-50 shadow-inner hover:bg-gray-50/50 "
    >
      <td className="p-3 capitalize">{roomtype?.roomName}</td>
      <td className="p-3">
        <p className="flex gap-2">
          {markupData.client?.markup === 0 ? (
            "N/A"
          ) : (
            <span className="">
              {markupData.client?.markupType === "flat"
                ? priceConversion(
                    markupData.client?.markup,
                    selectedCurrency,
                    true
                  )
                : markupData.client?.markup}
              {markupData.client?.markupType === "flat" ? "" : " %"}
            </span>
          )}
          <span
            className="underline text-lightblue  text-lg cursor-pointer"
            onClick={() => {
              setIsMarkup(true);
            }}
          >
            <AiFillEdit />
          </span>
        </p>
        {isMarkup && (
          <ClientMarkupModal
            setIsMarkup={setIsMarkup}
            setMarkupData={setMarkupData}
            markupData={markupData}
            roomTypeId={roomtype?.roomTypeId}
            roomName={roomtype?.roomName}
          />
        )}
      </td>
      {/* <td className="p-3">
        <p className="flex gap-2">
          {markupData.subAgent?.markup === 0 ? (
            "N/A"
          ) : (
            <span className="">
              {markupData.subAgent?.markupType === "flat"
                ? priceConversion(
                    markupData.subAgent?.markup,
                    selectedCurrency,
                    true
                  )
                : markupData.subAgent?.markup}
              {markupData.subAgent?.markupType === "flat" ? "" : " %"}
            </span>
          )}
          <p
            className="underline text-lightblue  text-lg cursor-pointer"
            onClick={() => {
              setIsMarkup({
                client: false,
                agent: true,
              });
            }}
          >
            <AiFillEdit />
          </p>
        </p>

        {isMarkup.agent && (
          <AgentMarkupModal
            setIsMarkup={setIsMarkup}
            setMarkupData={setMarkupData}
            markupData={markupData}
            roomTypeId={roomtype?.roomTypeId}
            roomName={roomtype?.roomName}
          />
        )}
      </td> */}
    </tr>
  );
}

export default RoomTypeSingle;
