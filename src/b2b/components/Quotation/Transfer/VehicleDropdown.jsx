import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addCountVehicle,
} from "../../../../redux/slices/quotationSlice";
import { setAlertSuccess } from "../../../../redux/slices/homeSlice";

function VehicleDropdown({ vehicle, stayIndex, hotelIndex }) {
  const dispatch = useDispatch();
  const [count, setCount] = useState(vehicle?.count || 0);


  return (
    <div className=" ">
      <div className="flex">
        <div className="">
        <div className=" md:max-w-[250px] w-24 md:w-40 ">
          <label htmlFor="" className="mb-0 text-gray-400 text-sm">
            {vehicle?.name} 
          </label>
        </div>
        </div>
     
        <div className="">
          <select
            type="number"
            className="w-[100px]  border outline-none px-2 text-gray-400 text-sm h-7 rounded-sm "
            name="sevenSeaterCount"
            onChange={(e) => {
              setCount(Number(e.target.value));
              dispatch(
                addCountVehicle({
                  hotelIndex: hotelIndex,
                  stayIndex: stayIndex,
                  id: vehicle?.vehicle,
                  value: Number(e.target.value),
                })
              );
              if(Number(e.target.value) > 0) {
                dispatch(
                  setAlertSuccess({
                    status: true,
                    title: "Transfer Added!",
                    text: "Transfer Added Successfully",
                  })
                );
              }
            }}
            value={count}
          >
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
          </select>
        </div>
        </div>
      </div>
    );
}

export default VehicleDropdown;
