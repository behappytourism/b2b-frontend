import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFlightDeatilsChange } from "../../../redux/slices/flightSlice";

const AirportsCard = ({ name, index, hide }) => {
  const { airports } = useSelector((state) => state.general);
  const inputRef = useRef();
  const dispatch = useDispatch();

  const [value, setValue] = useState("");
  const [filteredAirports, setFilteredAirports] = useState([]);

  useEffect(() => {
    const filterTimer = setTimeout(() => {
      if (airports.length > 0 && value.length > 0) {
        let airportByIata = false;
        const filtered = airports.filter((ele) => {
          const x = value.toLocaleLowerCase();
          const city = ele?.city?.toLocaleLowerCase();
          const iata = ele?.iata?.toLocaleLowerCase();
          if (iata === x) airportByIata = ele;
          if (airportByIata) return false;
          if (city?.startsWith(x) || iata?.startsWith(x)) return ele;
          else return null;
        });
        if (airportByIata) {
          setFilteredAirports([airportByIata]);
          return;
        }
        setFilteredAirports([...filtered]);
      } else if (value.length === 0) {
        setFilteredAirports(null);
      }
    }, 200);
    return () => clearTimeout(filterTimer);
  }, [value]);

  useEffect(() => {
    window.addEventListener("mousedown", (e) => {
      if (!document.getElementById("airportdd")) {
        hide(false);
      }
    });

    inputRef.current.focus();

    let rescentSearches = localStorage.getItem("flightSearches");

    if (rescentSearches) {
      rescentSearches = JSON.parse(rescentSearches);
      rescentSearches = rescentSearches.reverse();
    }

    const data = rescentSearches?.map((ele) => {
      if (name === "cityFrom") return ele?.flightsData[0]?.cityFrom;
      if (name === "cityTo") return ele?.flightsData[0]?.cityTo;
      return null;
    });

    console.log(data);
  }, []);

  const handleClick = (item, name) => {
    dispatch(
      handleFlightDeatilsChange({
        name,
        value: { iata: item?.iata, name: item?.city },
        index,
      })
    );
  };

  return (
    <>
      <div
        className="absolute  w-72 border bg-light rounded-sm overflow-y-auto pt-2 z-[9999]"
        id="airportdd"
      >
        <div className=" mx-2 px-2 py-1 ">
          <input
            ref={inputRef}
            type="text"
            list="Country"
            placeholder={name === "cityFrom" ? "Select City" : "City To"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
            className="block w-full capitalize outline-none bg-transparent text-sm text-gray-300 font-medium "
          />
        </div>
        <div className="w-full p-2 overflow-y-auto">
          {filteredAirports?.map((item) => (
            <div
              key={item.name}
              className="bg-soft py-2 px-2 cursor-pointer capitalize  z-30 flex flex-col"
              onClick={() => {
                setValue(item?.city);
                handleClick(item, name);
                hide(false);
              }}
            >
              <span className="text-[14px]">
                {item?.city} {item?.iata && `(${item?.iata})`}
              </span>
              <span className="text-[10px]">{`${item?.name}, ${item?.country}`}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AirportsCard;
