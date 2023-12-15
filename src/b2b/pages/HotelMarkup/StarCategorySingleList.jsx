import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import priceConversion from "../../../utils/PriceConversion";
import { useSelector } from "react-redux";
import StarCategoryClientMarkupModal from "./StarCategoryClientMarkupModal";
import StarCategorySubAgentMarkupModal from "./StarCategorySubAgentMarkupModal";

function StarCategorySingleList({ item }) {
  const { selectedCurrency } = useSelector((state) => state.home);

  const [isModalOpen, setIsModalOpen] = useState({
    client: false,
    subAgent: false,
  });

  const [starMarkupData, setStarMarkupData] = useState({
    clientMarkup: item?.clientMarkup,
    subAgentMarkup: item?.subAgentMarkup,
  });

  return (
    <tr className="bg-white hover:bg-gray-100/50 ">
      <td className="font-[500] p-4 whitespace-nowrap  ">
        {item?.name === "5"
          ? "5 Star Hotel"
          : item?.name === "4"
          ? "4 Star Hotel"
          : item?.name === "3"
          ? "3 Star Hotel"
          : item?.name === "2"
          ? "2 Star Hotel"
          : item?.name === "1"
          ? "1 Star Hotel"
          : item?.name === "appartment"
          ? "Apartments"
          : item?.name}
      </td>
      <td className="font-[500] p-4 whitespace-nowrap ">
        <div className="flex gap-2 items-center">
          {starMarkupData?.clientMarkup?.markup === 0 ? (
            <span>"N/A"</span>
          ) : (
            <span>
              {starMarkupData?.clientMarkup?.markupType === "flat"
                ? priceConversion(
                    starMarkupData?.clientMarkup?.markup,
                    selectedCurrency,
                    true
                  )
                : starMarkupData?.clientMarkup?.markup}{" "}
              {starMarkupData?.clientMarkup?.markupType === "flat" ? "" : "%"}
            </span>
          )}
          <span
            onClick={() =>
              setIsModalOpen({
                client: true,
                subAgent: false,
              })
            }
            className="text-lightblue text-xl cursor-pointer"
          >
            <AiFillEdit />
          </span>
        </div>
        {isModalOpen.client && (
          <StarCategoryClientMarkupModal
            setIsModalOpen={setIsModalOpen}
            starMarkupData={starMarkupData}
            setStarMarkupData={setStarMarkupData}
            name={item?.name}
          />
        )}
      </td>
      {/* <td className="font-[500] p-4 whitespace-nowrap ">
        <div className="flex gap-2 items-center">
          {starMarkupData?.subAgentMarkup?.markup === 0 ? (
            <span>"N/A"</span>
          ) : (
            <span>
              {starMarkupData?.subAgentMarkup?.markupType === "flat"
                ? priceConversion(
                    starMarkupData?.subAgentMarkup?.markup,
                    selectedCurrency,
                    true
                  )
                : starMarkupData?.subAgentMarkup?.markup}{" "}
              {starMarkupData?.subAgentMarkup?.markupType === "flat"
                ? ""
                : "%"}
            </span>
          )}
          <span
            onClick={() =>
              setIsModalOpen({
                client: false,
                subAgent: true,
              })
            }
            className="text-lightblue text-xl cursor-pointer"
          >
            <AiFillEdit />
          </span>
        </div>
        {isModalOpen.subAgent && (
          <StarCategorySubAgentMarkupModal
            setIsModalOpen={setIsModalOpen}
            starMarkupData={starMarkupData}
            setStarMarkupData={setStarMarkupData}
            name={item?.name}
          />
        )}
      </td> */}
    </tr>
  );
}

export default StarCategorySingleList;
