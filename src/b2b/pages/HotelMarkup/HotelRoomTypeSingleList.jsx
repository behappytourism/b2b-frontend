import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../axios";
import RoomTypeSingle from "./RoomTypeSingle";
import { PageLoader } from "../../components";

function HotelRoomTypeSingleList({ hotelId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [roomTypes, setRoomtTypes] = useState([]);

  const { token } = useSelector((state) => state.agents);
  const fetchRoomTypes = async (e) => {
    try {
      setIsLoading(true);
      setError("");
      const response = await axios.get(
        `/b2b/hotels/markup/list-room-type/${hotelId}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setRoomtTypes(response?.data);
      setIsLoading(false);
    } catch (error) {
      setError(
        error?.response?.data?.error || "Something went wrong, Try again"
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  return (
    <>
      {!isLoading ? (
        <>
          {roomTypes?.length > 0 &&
            roomTypes?.map((roomtype) => (
              <RoomTypeSingle key={roomtype?.roomTypeId} roomtype={roomtype} />
            ))}
          {error ? (
            <tr>
              <td
                className="text-center w-full font-medium text-red-500 py-10"
                colSpan={3}
              >
                {error}
              </td>
            </tr>
          ) : (
            ""
          )}
        </>
      ) : (
        <tr>
          <td colSpan={3}>
            <PageLoader />
          </td>
        </tr>
      )}
    </>
  );
}

export default HotelRoomTypeSingleList;
