import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "../../../axios";
import { useSelector } from "react-redux";

function FlightInsurancePlans({ setInsurancePlans, insurancePlans }) {
  const [insuranceData, setInsuranceData] = useState([]);
  const { token } = useSelector((state) => state.agents);

  const fetchInsuranceData = async () => {
    // setLoading(true);
    try {
      const res = await axios.get(`/b2b/insurance/all`, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setInsuranceData(res?.data);
        // setFlightAnchillary(res?.data)
        // dispatch(handleFullData(res.data || []));
        // handleDataFetchSuccess();
        // setLoading(false);
      }
    } catch (err) {
      if (err.response) {
        console.error("Error response from the server:", err.response);
      } else {
        console.error("An error occurred:", err.message);
      }
    }
  };

  useEffect(() => {
    fetchInsuranceData();
  }, []);

  console.log(insuranceData, "insured planss????!!!! ");

  return (
    <div>
      <div
        id="defaultModal"
        tabindex="-1"
        aria-hidden="true"
        className=" fixed md:flex md:justify-center items-center backdrop-blur-sm top-0 left-0 right-0 z-50 w-full p-4 overflow-x-auto overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative shadow-lg max-w-1xl max-h-[400px] bottom-10 w-[600px]">
          <div
            className={`absolute cursor-pointer md:right-4 right-4  md:top-1 top-4 flex justify-center items-center bg-trans text-darktext h-16 w-16 rounded-full text-4xl`}
            onClick={() => setInsurancePlans(!insurancePlans)}
          >
            <AiOutlineClose />
          </div>
          <div className="bg-white rounded-lg shadow-lg dark:bg-white p-5 h-[600px]">
            <div className="text-center">
              <h1 className="text-xl font-bold">Insurance Plans</h1>
            </div>
            {insuranceData?.map((plan, index) => (
              <div className="px-4 pt-4 flex items-center justify-between text-center">
                <h1 className="mb-8 font-semibold">{plan?.name}</h1>
                <div>
                  <div className="flex gap-2 justify-center items-center p-2 mb-8">
                    <button
                      type="button"
                      className="flex items-center justify-center bg-slate-200 rounded-full p-1 text-md w-4 h-4"
                    >
                      +
                    </button>
                    <span className="text-sm p-2">0</span>
                    <button
                      type="button"
                      className="flex items-center justify-center bg-slate-200 rounded-full p-1 text-md w-4 h-4"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex gap-[26%] pr-20 pt-10 pb-10 items-center ">
                                <p
                                  className="w-[34%] absolute left-5 -bottom-[42%] bg-white cursor-pointer  hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow "
                                  
                                >
                                  Remove all plans
                                </p>
                                <div className="flex gap-6 text-center items-center">
                                  <p className="absolute right-[24%] -bottom-[41%]">
                                    0 AED
                                  </p>
                                  <button
                                    className="absolute -bottom-[42%] right-[4%] bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
                                    onClick={() => setInsurancePlans(!insurancePlans)}
                                  >
                                    Done
                                  </button>
                                </div>
                              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightInsurancePlans;
