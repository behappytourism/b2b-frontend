import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRows } from "../../../redux/slices/visaSlice";
import TravellerDetailFormAdult from "./TravellerDetailFormAdult";
import TravellerDetailFormChild from "./TravellerDetailFormChild";

function TravellerDetails({ navigation, setNavigation }) {
  const dispatch = useDispatch();
  const { rows, childRows, visaEnquiry } = useSelector((state) => state.visa);
  useEffect(() => {
    dispatch(addRows());
  }, [visaEnquiry, dispatch]);

  return (
    <div className=" text-darktext rounded-[.25rem] shadow-[0_0_7px_2px_rgb(56_65_74_/_7%)] ">
      {navigation.details && (
        <div>
          <div className={`my-2  px-3 py-4 border-b border-dashed `}>
            <p className="font-[700] text-xl text-gray-400 ">
              Traveller Details
            </p>
          </div>
          <div className="divide-y ">
            {rows.map((row, index) => (
              <div key={index} className="px-3 py-2 md:flex gap-2 ">
                <div className="py-2 text-gray-400  md:w-[15%]  mb-2 px-1">
                  <p className="text-xs">
                    {index === 0 ? "Lead passenger" : `${index + 1} passenger`}{" "}
                  </p>
                </div>
                <TravellerDetailFormAdult row={row} index={index} />
              </div>
            ))}
          </div>
          {childRows?.length > 0 ? (
            <div className="divide-y border-t">
              {childRows?.length > 0 &&
                childRows.map((childRows, index) => (
                  <div key={index} className="px-3 py-2 md:flex gap-2 ">
                    <div className="py-2 text-gray-400 md:w-[15%]   mb-2 px-1">
                      <p className="text-xs">{`Child ${index + 1}`} </p>
                    </div>
                    <TravellerDetailFormChild
                      childRows={childRows}
                      index={index}
                    />
                  </div>
                ))}
            </div>
          ) : (
            ""
          )}
          <div className="flex justify-end pr-2 pb-4">
            <button
              type="submit"
              className="bg-lightblue text-xs text-white px-3 py-2 rounded-sm shadow-mn"
              onClick={() =>
                setNavigation({
                  itenary: false,
                  details: false,
                  payment: true,
                  upload: false,
                })
              }
            >
              Move to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TravellerDetails;
