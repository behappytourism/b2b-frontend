import React  from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCountVehicleEditSide } from "../../../../redux/slices/quotationSlice";

import { setAlertSuccess } from "../../../../redux/slices/homeSlice";

function EditVehicleDropdown({ vehicle, stayIndex, hotelIndex }) {
  const dispatch = useDispatch();
  const { transfer } = useSelector((state) => state.quotation);

  return (
    <div>
      <div className="grid md:grid-cols-2 ">
            <div className=" max-w-[130px]">
            <label htmlFor="" className="mb-0 text-gray-400 text-sm">
              {vehicle?.name}
            </label>
          </div>
        <div>
        <div className="mr-20">
          <select
            type="number"
            className="w-[100px]  border outline-none px-2 text-gray-400 text-sm h-8 rounded-sm"
            name="sevenSeaterCount"
            onChange={(e) => {
              dispatch(
                addCountVehicleEditSide({
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
            value={vehicle?.count || 0}
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
    </div>
  );
}

export default EditVehicleDropdown;
