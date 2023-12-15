import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../../../constants";

function VisaOrderDetailSingleRow({ index, item, visaOrderDetail }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <tr onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <td className="capitalize p-3 text-[14px] text-textColor">
          {index + 1}{" "}
        </td>
        <td className="capitalize p-3 text-[14px] text-textColor">
          {item?.title}{" "}
        </td>
        <td className="capitalize p-3 text-[14px] text-textColor">
          {item?.firstName}{" "}
        </td>
        <td className="capitalize p-3 text-[14px] text-textColor">
          {item?.lastName}{" "}
        </td>
        <td className="capitalize p-3 text-[14px] text-textColor">
          {item?.passportNo}{" "}
        </td>
        <td className="capitalize p-3 text-[14px] text-textColor">
          {item?.country?.countryName}{" "}
        </td>
        <td className="capitalize p-3 text-[14px] text-textColor">
          {item?.contactNo}{" "}
        </td>

        <td className="capitalize p-3 text-[14px]">
          {visaOrderDetail?.status === "payed" &&
            item?.isStatus === "initiated" && (
              <div
                className=" flex items-center"
                onClick={() =>
                  navigate(`/visa/order/${id}/details/${item?._id}`)
                }
              >
                <span className="flex items-center gap-1 p-1">
                  <span className="text-blue-500 cursor-pointer  ">
                    <AiFillEdit />
                  </span>
                  <span className="text-blue-500 cursor-pointer underline text-sm ">
                    Edit
                  </span>
                </span>
              </div>
            )}
          {item?.isStatus === "submitted" &&
            visaOrderDetail?.status === "payed" && (
              <span className="bg-orange-100 text-orange-500 cursor-pointer text-[12px] p-1 rounded">
                Submitted
              </span>
            )}
          {item?.isStatus === "approved" &&
            visaOrderDetail?.status === "payed" && (
              <div className=" flex items-center">
                <a
                  className="flex gap-1 bg-green-200/70 rounded p-1"
                  download
                  href={config.SERVER_URL + item?.visaUpload}
                >
                  <span className="text-green-600 cursor-pointer  ">
                    <FiDownload />
                  </span>
                  <span className="text-green-600 cursor-pointer text-[11px] ">
                    Download
                  </span>
                </a>
              </div>
            )}
          {item?.isStatus === "rejected" &&
            visaOrderDetail?.status === "payed" && (
              <span className="bg-red-300/60 text-red-500 cursor-pointer text-[12px] p-1 rounded">
                Rejected
              </span>
            )}
        </td>
      </tr>
      <>
        {item?.isStatus === "rejected" && (
          <tr className="border-b border-tableBorderColor">
            <td colSpan="8" className="p-3 py-5">
              <p className="text-gray-600 text-[10px] underline">
                Reason for Rejection
              </p>
              <p className="text-[13px] text-gray-600">{item?.reason}</p>
            </td>
          </tr>
        )}

        {isDropdownOpen && (
          <tr className="border-b border-tableBorderColor">
            <td colSpan="8" className="p-3">
              <div className="flex flex-wrap items-start gap-[3em]">
                <div className="flex items-start gap-[1em]">
                  <div>
                    <h2 className="font-medium text-grayColor">
                      Traveller Details
                    </h2>
                    <div className="">
                      <span className="block text-[12px] text-grayColor">
                        Title
                      </span>
                      <span className="block text-[15px] capitalize">
                        {item?.title}
                      </span>
                    </div>
                    <div className="">
                      <span className="block text-[12px] text-grayColor">
                        First Name
                      </span>
                      <span className="block text-[14px]">
                        {item?.firstName}
                      </span>
                    </div>
                    <div className="">
                      <span className="block text-[12px] text-grayColor">
                        Last Name
                      </span>
                      <span className="block text-[15px]">
                        {item?.lastName}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="">
                      <span className="block text-[12px] text-grayColor">
                        Date Of Birth
                      </span>
                      <span className="block text-[15px]">
                        {item?.dateOfBirth?.day +
                          " / " +
                          item?.dateOfBirth?.month +
                          " / " +
                          item?.dateOfBirth?.year}
                      </span>
                    </div>
                    <div className="">
                      <span className="block text-[12px] text-grayColor">
                        Contact Number
                      </span>
                      <span className="block text-[15px] capitalize">
                        {item?.contactNo}
                      </span>
                    </div>
                    <div className="">
                      <span className="block text-[12px] text-grayColor">
                        Passport Number
                      </span>
                      <span className="block text-[14px]">
                        {item?.passportNo}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="">
                      <span className="block text-[12px] text-grayColor">
                        Passport Expiry
                      </span>
                      <span className="block text-[15px]">
                        {item?.expiryDate?.month +
                          " / " +
                          item?.expiryDate?.year}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <a
                      href={
                        config.SERVER_URL +
                        item?.documents?.passportFistPagePhoto
                      }
                      download
                    >
                      <div className="w-[130px] h-[130px] overflow-hidden rounded-md relative">
                        <img
                          src={
                            config.SERVER_URL +
                            item?.documents?.passportFistPagePhoto
                          }
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </a>
                  </div>
                  <div className="mt-4">
                    <a
                      href={
                        config.SERVER_URL +
                        item?.documents?.passportLastPagePhoto
                      }
                      download
                    >
                      <div className="w-[130px] h-[130px] overflow-hidden rounded-md relative">
                        <img
                          src={
                            config.SERVER_URL +
                            item?.documents?.passportLastPagePhoto
                          }
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </a>
                  </div>
                  <div className="mt-4">
                    <a
                      href={
                        config.SERVER_URL + item?.documents?.passportSizePhoto
                      }
                      download
                    >
                      <div className="w-[130px] h-[130px] overflow-hidden rounded-md relative">
                        <img
                          src={
                            config.SERVER_URL +
                            item?.documents?.passportSizePhoto
                          }
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </a>
                  </div>
                  <div className="mt-4">
                    <a
                      href={config.SERVER_URL + item?.documents?.supportiveDoc1}
                      download
                    >
                      <div className="w-[130px] h-[130px] overflow-hidden rounded-md relative">
                        <img
                          src={
                            config.SERVER_URL + item?.documents?.supportiveDoc1
                          }
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </a>
                  </div>
                  <div className="mt-4">
                    <a
                      href={config.SERVER_URL + item?.documents?.supportiveDoc2}
                      download
                    >
                      <div className="w-[130px] h-[130px] overflow-hidden rounded-md relative">
                        <img
                          src={
                            config.SERVER_URL + item?.documents?.supportiveDoc2
                          }
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        )}
      </>
    </>
  );
}

export default VisaOrderDetailSingleRow;
