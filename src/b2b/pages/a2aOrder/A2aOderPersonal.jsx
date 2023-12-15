import axios from "../../../axios";
import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import { useParams } from "react-router-dom";
import formatDate from "../../../utils/formatDate";
import { useSelector } from "react-redux";
import A2aEditPersonalInfoModal from "./A2aEditPersonalInfoModal";

function A2aOderPersonal({ item, passengerDetail, index, setPassengerDetail }) {
  const params = useParams();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { token } = useSelector((state) => state.agents);

  const handleDownloadTicket = async (ele) => {
    try {
      const response = await axios.get(
        `/b2b/a2a/orders/ticket/${params?.id}/single/${ele?._id}`,
        {
          headers: { authorization: `Bearer ${token}` },
          responseType: "arraybuffer",
        }
      );
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${ele?.firstName}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <tr>
        <td className="capitalize p-3 text-[14px] text-textColor">
          {index + 1}{" "}
        </td>
        <td className="capitalize p-3 text-[14px] text-textColor">
          {item?.title + " " + item?.firstName + " " + item?.lastName}{" "}
        </td>
        <td className="capitalize p-3 text-[14px] text-textColor">
          <p className="">{item?.passportNo}</p>
        </td>
        <td className="capitalize p-3 text-[14px] text-textColor">
          {item?.phoneNumber}{" "}
        </td>

        <td className="capitalize p-3 text-[14px]">
          <div className=" flex gap-3 items-center">
            <button
              onClick={() => handleDownloadTicket(item)}
              className="flex gap-1 bg-green-200/70 rounded p-1"
            >
              <span className="text-green-600 cursor-pointer  ">
                <FiDownload />
              </span>
              <span className="text-green-600 cursor-pointer text-[11px] ">
                Download
              </span>
            </button>
            {item?.status === "booked" && item?.isCancelled === false && (
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="text-blue-500 text-lg"
              >
                <AiFillEdit />
              </button>
            )}
          </div>
          {isEditModalOpen && (
            <A2aEditPersonalInfoModal
              item={item}
              setIsEditModalOpen={setIsEditModalOpen}
              isEditModalOpen={isEditModalOpen}
              index={index}
              passengerDetail={passengerDetail}
              setPassengerDetail={setPassengerDetail}
            />
          )}
        </td>
      </tr>
    </>
  );
}

export default A2aOderPersonal;
