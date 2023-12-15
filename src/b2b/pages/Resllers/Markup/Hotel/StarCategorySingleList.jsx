import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import priceConversion from "../../../../../utils/PriceConversion";
import { useSelector } from "react-redux";
import StarCategorySubAgentMarkupModal from "./StarCategorySubAgentMarkupModal";

function StarCategorySingleList({ item }) {
  const { selectedCurrency } = useSelector((state) => state.home);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [starMarkupData, setStarMarkupData] = useState(item?.subAgentMarkup);

  console.log(starMarkupData);

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
          {starMarkupData?.markup === 0 ? (
            <span>"N/A"</span>
          ) : (
            <span>
              {starMarkupData?.markupType === "flat"
                ? priceConversion(
                    starMarkupData?.markup,
                    selectedCurrency,
                    true
                  )
                : starMarkupData?.markup}{" "}
              {starMarkupData?.markupType === "flat" ? "" : "%"}
            </span>
          )}
          <span
            onClick={() => setIsModalOpen(true)}
            className="text-lightblue text-xl cursor-pointer"
          >
            <AiFillEdit />
          </span>
        </div>
        {isModalOpen && (
          <StarCategorySubAgentMarkupModal
            setIsModalOpen={setIsModalOpen}
            starMarkupData={starMarkupData}
            setStarMarkupData={setStarMarkupData}
            name={item?.name}
          />
        )}
      </td>
    </tr>
  );
}

export default StarCategorySingleList;
