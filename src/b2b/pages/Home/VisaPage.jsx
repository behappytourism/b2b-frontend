import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchCards from "../../components/Cards/SearchCards";
import VisaCard from "../../components/Cards/VisaCard";
import MobileAppCard from "../../components/Footers/MobileAppCard";

function VisaPage() {
  const navigate = useNavigate();
  const { visaCountries } = useSelector((state) => state.home);
  return (
    <div className="">
      <SearchCards />
      {/* <div className="flex items-center justify-start shadow-b-sm shadow-x-sm">
        <div className=" w-full mt-7 md:rounded-md relative  ">
          <VisaCard />
        </div>
      </div> */}
      <div className="max-w-screen-xl mx-auto pb-20 px-4">
        <div className="text-xl md:text-2xl font-semibold text-darktext mb-4">
          Top Visited Countries
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {visaCountries?.map((item, index) => (
            <div
              className="mt-2 relative cursor-pointer shadow-md rounded-2xl"
              key={index}
              onClick={() => navigate(`/visa/${item?._id}`)}
            >
              <div className="overflow-hidden rounded-2xl">
                <img
                  className="hover:scale-110 object-cover rounded-2xl h-[7em] md:h-[13em] w-full  transition-all duration-500 cursor-pointer"
                  src={item?.flag}
                  alt={item?.countryName}
                />
              </div>
              <div
                className={`absolute bottom-2 left-4  ${
                  item?.isocode === "US" ? "text-darktext" : "text-light"
                }`}
              >
                <div className="font-semibold capitalize ">
                  {item?.countryName}{" "}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <MobileAppCard /> */}
    </div>
  );
}

export default VisaPage;
