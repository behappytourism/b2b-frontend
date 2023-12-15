import React, { useEffect, useState } from "react";
import Toggle from "../Toggle";
import axios from "../../../axios";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../PageLoader";
import { setAlertError } from "../../../redux/slices/homeSlice";

function Configuration() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [configuration, setConfiguration] = useState({});

  const { token, agent } = useSelector((state) => state.agents);

  const { reseller } = useSelector((state) => state.resellers);

  const fetchConfiguration = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await axios.get(
        `/b2b/configurations/sub-agent/${reseller?._id}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setConfiguration({
        showAttraction: response?.data?.configuration?.showAttraction,
        showHotel: response?.data?.configuration?.showHotel,
        showFlight: response?.data?.configuration?.showFlight,
        showVisa: response?.data?.configuration?.showVisa,
        showA2a: response?.data?.configuration?.showA2a,
        showQuotaion: response?.data?.configuration?.showQuotaion,
      });
      setIsLoading(false);
    } catch (err) {
      setError(err?.response?.data?.error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConfiguration();
  }, []);

  function handleToggleChange(name, status) {
    setConfiguration((prev) => {
      return { ...prev, [name]: status };
    });
    submitHandleToggle(name, status);
  }

  const submitHandleToggle = async (name, status) => {
    try {
      const data = {
        ...configuration,
        subAgentId: reseller?._id,
        [name]: status,
      };
      await axios.post(`/b2b/configurations/sub-agent/update`, data, {
        headers: { authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.log(err?.response?.data?.error);
      dispatch(
        setAlertError({
          status: true,
          title: "Sorry! Something went wrong.",
          text: "Please try again.",
        })
      );
    }
  };

  return (
    <div className="px-4 py-10 bg-white ">
      {!isLoading ? (
        <>
          <div className="grid grid-cols-5 gap-5">
            {!configuration?.showAttraction &&
            !agent?.configuration?.showAttraction ? (
              ""
            ) : (
              <div>
                <label
                  className="pr-4 text-gray-400 font-demo font-medium"
                  htmlFor=""
                >
                  Show Attraction
                </label>
                <Toggle
                  onChange={(e) =>
                    handleToggleChange("showAttraction", e.target.checked)
                  }
                  value={configuration.showAttraction || false}
                />
              </div>
            )}
            {!configuration?.showHotel && !agent?.configuration?.showHotel ? (
              ""
            ) : (
              <div>
                <label
                  className="pr-4 text-gray-400 font-demo font-medium"
                  htmlFor=""
                >
                  Show Hotel
                </label>
                <Toggle
                  onChange={(e) =>
                    handleToggleChange("showHotel", e.target.checked)
                  }
                  value={configuration.showHotel || false}
                />
              </div>
            )}
            {!configuration?.showFlight && !agent?.configuration?.showFlight ? (
              ""
            ) : (
              <div>
                <label
                  className="pr-4 text-gray-400 font-demo font-medium"
                  htmlFor=""
                >
                  Show Flight
                </label>
                <Toggle
                  onChange={(e) =>
                    handleToggleChange("showFlight", e.target.checked)
                  }
                  value={configuration.showFlight || false}
                />
              </div>
            )}
            {!configuration?.showVisa && !agent?.configuration?.showVisa ? (
              ""
            ) : (
              <div>
                <label
                  className="pr-4 text-gray-400 font-demo font-medium"
                  htmlFor=""
                >
                  Show Visa
                </label>
                <Toggle
                  onChange={(e) =>
                    handleToggleChange("showVisa", e.target.checked)
                  }
                  value={configuration.showVisa || false}
                />
              </div>
            )}
            {!configuration?.showA2a && !agent?.configuration?.showA2a ? (
              ""
            ) : (
              <div>
                <label
                  className="pr-4 text-gray-400 font-demo font-medium"
                  htmlFor=""
                >
                  Show A2A
                </label>
                <Toggle
                  onChange={(e) =>
                    handleToggleChange("showA2a", e.target.checked)
                  }
                  value={configuration.showA2a || false}
                />
              </div>
            )}
            {!configuration?.showQuotaion &&
            !agent?.configuration?.showQuotaion ? (
              ""
            ) : (
              <div>
                <label
                  className="pr-4 text-gray-400 font-demo font-medium"
                  htmlFor=""
                >
                  Show Quotaion
                </label>
                <Toggle
                  onChange={(e) =>
                    handleToggleChange("showQuotaion", e.target.checked)
                  }
                  value={configuration.showQuotaion || false}
                />
              </div>
            )}
          </div>
          {error ? (
            <div className="text-gray-400 py-10 text-center font-sm tracking-wide font-demo">
              {error}
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        <div className="w-full ">
          <PageLoader />
        </div>
      )}
    </div>
  );
}

export default Configuration;
