import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  addSeateForTravellers,
  removeSeatForTravellers,
  removeSeate,
} from "../../../redux/slices/flightSlice";
import { FaTimes } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

function SeateBoxes({
  status,
  row,
  col,
  price,
  seatCode,
  seatNumber,
  passengerKey,
  segmentKey,
  group,
  onClick,
  deselectedAll,
  setDeselectedAll,
  tbId,
}) {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(false);

  const [totalSeatNumber, setTotalSeatNumber] = useState([]);
  const [totalSeatPrice, setTotalSeatPrice] = useState([]);
  // const [lastSegmentKey, setLastSegmentKey] = useState("");
  // const [lastSeatNumber, setLastSeatNumber] = useState("");
  // const [lastSeatCode, setLastSeatCode] = useState("");
  // const [lastSeatPrice, setLastSeatPrice] = useState(0);
  // const [lastSeatKey, setLastSeatKey] = useState([""])
  const [selection, setSelection] = useState("");

  const { travellers, selectedAddOns } = useSelector((state) => state.flight);

  // console.log(segmentKey, "segmentekyss")

  // useEffect to handle deselection when deselectedAll changes
  useEffect(() => {
    if (deselectedAll) {
      setSelected(false); // Deselect the seat
      setDeselectedAll(false); // Reset the flag
    }
  }, [deselectedAll, setDeselectedAll]);

  // const handleSeatSelected = () => {
  //   if (status === "R"){
  //     return;
  //   } else {
  //         setSelected(!selected);
  //         onClick(selected ? -price : price);
  //         dispatch(addSeateForTravellers({segmentKey: segmentKey, seatCode: [seatCode], seatNumber: [seatNumber], seatKeys : [ passengerKey], }))
  //         console.log(passengerKey, "passenger key here it is");
  //         console.log(segmentKey, "segment key here it is");
  //         console.log(seatCode, seatNumber, "here they are both");

  //     }

  //     if(selected){
  //       dispatch(removeSeate({status: selected,  passengerKey}))
  //     }
  // };

  //    const handleSeatSelected = async () => {
  //     if (status === "R") {
  //         return;
  //     } else {
  //         setSelected(!selected);
  //         onClick(selected ? -price : price);

  //         // Convert seatNumber to a string if it's a number
  //         // const seatNumberString = typeof seatNumber === 'number' ? seatNumber.toString() : seatNumber;

  //         // Update the array of selected seat numbers
  //         setTotalSeatNumber(prevTotalSeatNumber => [...prevTotalSeatNumber, seatNumber]);

  //         try {
  //             await dispatch(addSeateForTravellers({
  //                 segmentKey: segmentKey,
  //                 seatCode: seatCode,
  //                 seatNumber: seatNumber, // Pass the updated array
  //                 seatKeys: [passengerKey],
  //             }));

  //             // Dispatch was successful, reset the array of selected seat numbers
  //             setTotalSeatNumber([]);

  //             console.log("Dispatch successful!");
  //         } catch (error) {
  //             console.error("Error:", error);
  //         }

  //         console.log(passengerKey, "passenger key here it is");
  //         console.log(segmentKey, "segment key here it is");
  //         console.log(seatCode, seatNumber, "here they are both");
  //     }

  //     if (selected) {
  //         dispatch(removeSeate({ status: selected, passengerKey }));
  //     }
  // };
  const { flightFullData } = useSelector((state) => state.flight);

  const noOfAdults = flightFullData.priceQuoteResponse.noOfAdults;
  const noOfChildren = flightFullData.priceQuoteResponse.noOfChildren;
  const selectedSeatsCount = selectedAddOns.seats.length;
  const maxSeatsAllowed = noOfAdults + noOfChildren;

  const handleSeatSelected = async () => {
    const selectedSeatsCount = selectedAddOns.seats.filter(
      (seat) => seat.segmentKey === segmentKey
    ).length;
    const maxSeatsAllowed = noOfAdults + noOfChildren;
    if (status === "R") {
      return;
    } else {
      if (!selected && selectedSeatsCount < maxSeatsAllowed) {
        setSelected(!selected);
        onClick(selected ? -price : price);
        setTotalSeatNumber((prevTotalSeatNumber) => [
          ...prevTotalSeatNumber,
          seatNumber,
        ]);
        setTotalSeatPrice((prevTotalSeatPrice) => [
          ...prevTotalSeatPrice,
          price,
        ]);

        try {
          await dispatch(
            addSeateForTravellers({
              segmentKey: segmentKey,
              seatCode: seatCode,
              seatNumber: seatNumber,
              seatKeys: [passengerKey],
              seatPrice: price,
            })
          );

          // setLastSeatCode(seatCode);
          // setLastSeatKey([passengerKey]);
          // setLastSeatNumber(seatNumber);
          // setLastSegmentKey(segmentKey);
          // setLastSeatPrice(price);

          // localStorage.setItem("lastSeatCode", seatCode);
          // localStorage.setItem("lastSeatKey", JSON.stringify([passengerKey])); // Since it's an array, stringify it
          // localStorage.setItem("lastSeatNumber", seatNumber);
          // localStorage.setItem("lastSegmentKey", segmentKey);
          // localStorage.setItem("lastSeatPrice", price);

          localStorage.setItem(`lastSeatCode_${segmentKey}`, seatCode);
          localStorage.setItem(
            `lastSeatKey_${segmentKey}`,
            JSON.stringify([passengerKey])
          );
          localStorage.setItem(`lastSeatNumber_${segmentKey}`, seatNumber);
          localStorage.setItem(`lastSegmentKey_${segmentKey}`, segmentKey);
          localStorage.setItem(`lastSeatPrice_${segmentKey}`, price);

          // console.log(segmentKey, seatCode, seatNumber, [passengerKey], price);

          // if (status !== "R" && selected && selectedSeatsCount >= maxSeatsAllowed) {
          //   console.log("Maximum number of adult seats selected.");
          //   handlePreviousSeatDeselected(lastSeatCode, lastSeatKey, lastSeatNumber, lastSeatPrice, lastSegmentKey);
          //   console.log(lastSegmentKey, lastSeatKey, lastSeatCode, lastSeatNumber, lastSeatPrice, "inside seat selection");
          // }

          setTotalSeatNumber([]);
          setTotalSeatPrice([]);
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        // console.log("Maximum number of adult seats selected.");
        // const lastSeatCode = localStorage.getItem("lastSeatCode");
        // const lastSeatKey = JSON.parse(localStorage.getItem("lastSeatKey")); // Parse the JSON string back to an array
        // const lastSeatNumber = localStorage.getItem("lastSeatNumber");
        // const lastSegmentKey = localStorage.getItem("lastSegmentKey");
        // const lastSeatPrice = parseFloat(localStorage.getItem("lastSeatPrice"));

        const segmentKeyToRetrieve = segmentKey; // Replace with the desired segmentKey

        const lastSeatCode = localStorage.getItem(
          `lastSeatCode_${segmentKeyToRetrieve}`
        );
        const lastSeatKey = JSON.parse(
          localStorage.getItem(`lastSeatKey_${segmentKeyToRetrieve}`)
        );
        const lastSeatNumber = localStorage.getItem(
          `lastSeatNumber_${segmentKeyToRetrieve}`
        );
        const lastSegmentKey = localStorage.getItem(
          `lastSegmentKey_${segmentKeyToRetrieve}`
        );
        const lastSeatPrice = parseFloat(
          localStorage.getItem(`lastSeatPrice_${segmentKeyToRetrieve}`)
        );

        onClick(-lastSeatPrice);
        // try {
        //   await dispatch(
        //     removeSeatForTravellers({
        //       segmentKey: "G9$COK/SHJ$2799485$20230911034500$20230911062500",
        //       seatCode: "1A",
        //       seatNumber: "1A",
        //       seatKeys: ['1A'],
        //       seatPrice: 100,
        //     })
        //   );
        // }
        try {
          await dispatch(
            removeSeatForTravellers({
              segmentKey: lastSegmentKey,
              seatCode: lastSeatCode,
              seatNumber: lastSeatNumber,
              seatKeys: lastSeatKey,
              seatPrice: lastSeatPrice,
            })
          );
          setSelection(lastSegmentKey);
        } catch (error) {
          console.error("Error:", error);
        }

        //  if (!selected && selectedSeatsCount < maxSeatsAllowed) {
        setSelected(!selected);
        onClick(selected ? -price : price);
        setTotalSeatNumber((prevTotalSeatNumber) => [
          ...prevTotalSeatNumber,
          seatNumber,
        ]);
        setTotalSeatPrice((prevTotalSeatPrice) => [
          ...prevTotalSeatPrice,
          price,
        ]);

        try {
          await dispatch(
            addSeateForTravellers({
              segmentKey: segmentKey,
              seatCode: seatCode,
              seatNumber: seatNumber,
              seatKeys: [passengerKey],
              seatPrice: price,
            })
          );

          // setLastSeatCode(seatCode);
          // setLastSeatKey([passengerKey]);
          // setLastSeatNumber(seatNumber);
          // setLastSegmentKey(segmentKey);
          // setLastSeatPrice(price);

          // localStorage.setItem("lastSeatCode", seatCode);
          // localStorage.setItem("lastSeatKey", JSON.stringify([passengerKey])); // Since it's an array, stringify it
          // localStorage.setItem("lastSeatNumber", seatNumber);
          // localStorage.setItem("lastSegmentKey", segmentKey);
          // localStorage.setItem("lastSeatPrice", price);
          localStorage.setItem(`lastSeatCode_${segmentKey}`, seatCode);
          localStorage.setItem(
            `lastSeatKey_${segmentKey}`,
            JSON.stringify([passengerKey])
          );
          localStorage.setItem(`lastSeatNumber_${segmentKey}`, seatNumber);
          localStorage.setItem(`lastSegmentKey_${segmentKey}`, segmentKey);
          localStorage.setItem(`lastSeatPrice_${segmentKey}`, price);

          //console.log(segmentKey, seatCode, seatNumber, [passengerKey], price);

          // if (status !== "R" && selected && selectedSeatsCount >= maxSeatsAllowed) {
          //   console.log("Maximum number of adult seats selected.");
          //   handlePreviousSeatDeselected(lastSeatCode, lastSeatKey, lastSeatNumber, lastSeatPrice, lastSegmentKey);
          //   console.log(lastSegmentKey, lastSeatKey, lastSeatCode, lastSeatNumber, lastSeatPrice, "inside seat selection");
          // }

          setTotalSeatNumber([]);
          setTotalSeatPrice([]);
        } catch (error) {
          console.error("Error:", error);
        }
      }

      // handlePreviousSeatDeselected();
      // console.log(lastSegmentKey, lastSeatKey, lastSeatCode, lastSeatNumber, lastSeatPrice, "inside seat selection")
    }
    //}

    if (selected) {
      dispatch(removeSeate({ status: selected, passengerKey }));
    }
  };

  //console.log(selectedAddOns.seats, "selectedaddons" )
  // useEffect(() => {
  //   handleValueChecker(lastSeatCode, lastSeatKey, lastSeatNumber, lastSeatPrice, lastSegmentKey)
  // }, [lastSeatCode])

  // const handleValueChecker = async () => {
  //   console.log(lastSeatCode, lastSeatKey, lastSeatNumber, lastSeatPrice, lastSegmentKey, "ufff ufff uff")
  // }

  const handleSeatDeselected = async () => {
    if (status === "R") {
      return;
    } else {
      if (selected) {
        setSelected(!selected);
        onClick(selected ? -price : price);
        setTotalSeatNumber((prevTotalSeatNumber) =>
          prevTotalSeatNumber.filter((seat) => seat !== seatNumber)
        );
        setTotalSeatPrice((prevTotalSeatPrice) =>
          prevTotalSeatPrice.filter((seatPrice) => seatPrice !== price)
        );

        try {
          await dispatch(
            removeSeatForTravellers({
              segmentKey: segmentKey,
              seatCode: seatCode,
              seatNumber: seatNumber,
              seatKeys: [passengerKey],
              seatPrice: price,
            })
          );

          setTotalSeatNumber([]);
          setTotalSeatPrice([]);
          console.log(selectedAddOns);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    }
  };

  // const handlePreviousSeatDeselected = async (lastSeatCode) => {
  //   const selectedSeatsCount = selectedAddOns.seats.filter(
  //     (seat) => seat.segmentKey === segmentKey
  //   ).length;

  //   onClick(-100 );

  //   setTotalSeatNumber((prevTotalSeatNumber) =>
  //     prevTotalSeatNumber.filter((seat) => seat !== "1F")
  //   );
  //   setTotalSeatPrice((prevTotalSeatPrice) =>
  //     prevTotalSeatPrice.filter((seatPrice) => seatPrice !== 100)
  //   );

  //   try {
  //      dispatch(
  //       removeSeatForTravellers({
  //         segmentKey: "G9$COK/SHJ$2794821$20230916192000$20230916213500",
  //         seatCode: "1A",
  //         seatNumber: "1A",
  //         seatKeys: ["1A"],
  //         seatPrice: 100,
  //       })
  //     );
  //     console.log(lastSeatCode, lastSeatKey, lastSeatNumber, lastSegmentKey, lastSeatPrice, "inside handlePreviousSeatDeselected")

  //     setTotalSeatNumber([]);
  //     setTotalSeatPrice([]);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   };

  //   try {
  //     await dispatch(
  //       addSeateForTravellers({
  //         segmentKey: segmentKey,
  //         seatCode: seatCode,
  //         seatNumber: seatNumber,
  //         seatKeys: [passengerKey],
  //         seatPrice: price,
  //       }),
  //     );

  //     setSelected(!selected);
  //     onClick(selected ? -price : price);
  //     setTotalSeatNumber((prevTotalSeatNumber) => [
  //       ...prevTotalSeatNumber,
  //       seatNumber,
  //     ]);
  //     setTotalSeatPrice((prevTotalSeatPrice) => [
  //       ...prevTotalSeatPrice,
  //       price,
  //     ]);

  //     console.log(segmentKey, seatCode, seatNumber, [passengerKey], price)

  //     setTotalSeatNumber([]);
  //     setTotalSeatPrice([]);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }

  // };

  useEffect(() => {
    // Check if the current seat is already selected for the specific segment

    const isSelected = selectedAddOns.seats.some(
      (seat) =>
        seat.seatCode === seatCode &&
        seat.seatNumber === seatNumber &&
        seat.segmentKey === segmentKey
    );

    // If it is, set the selected state to true
    if (isSelected) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [selection, selectedAddOns.seats, seatCode, segmentKey]);

  return (
    <>
      <button
        type="button"
        className={`block h-[20px] w-[20px] border-[2px] relative group hover:border-blue-500 ${
          status !== "R" &&
          (selected
            ? "bg-teal-400"
            : group === 1
            ? "bg-blue-100"
            : group === 2
            ? "bg-purple-200"
            : group === 3
            ? "bg-violet-500"
            : group === 4
            ? "bg-orange-200"
            : group === 5
            ? "bg-pink-300"
            : "")
        } ${
          status === "R" && "bg-red-500"
        } cursor-pointer rounded-tl-lg rounded-bl-lg`}
        onClick={() => {
          if (selected) {
            handleSeatDeselected();
          } else {
            handleSeatSelected();
          }
        }}
        disabled={status === "R"}
      >
        {
          <div
            className={`p-2 z-50 group-hover:flex hidden absolute text-[16px] w-[100px] text-left ${
              status === "R" ? "bg-blue-100 text-red-500" : "bg-white"
            } bottom-[30px] -left-3 rounded-lg shadow-lg border-[1px] border-black flex-col justify-start`}
          >
            {status !== "R" ? (
              <>
                {`${row} - ${col}`}

                <span className="text-green-600">{`${price} AED`}</span>
                <span className="absolute -bottom-[20px] text-[30px] text-black left-2">
                  <IoMdArrowDropdown />
                </span>
              </>
            ) : (
              <>
                <span className="text-green-600">Booked</span>
                <span className="absolute -bottom-[20px] text-[30px] text-black left-2">
                  <IoMdArrowDropdown />
                </span>
              </>
            )}
          </div>
        }
        {status === "R" && (
          <div className="mb-4">
            <FaXmark size={18} color="white" />
          </div>
        )}
      </button>
    </>
  );
}

export default SeateBoxes;
