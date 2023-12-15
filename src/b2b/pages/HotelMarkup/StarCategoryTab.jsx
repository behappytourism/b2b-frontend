import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../axios";
import { PageLoader } from "../../components";
import StarCategorySingleList from "./StarCategorySingleList";

function StarCategoryTab() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [starCategory, setStarCategory] = useState([]);

  const { token } = useSelector((state) => state.agents);
  const fetchMarkups = async (e) => {
    try {
      setIsLoading(true);
      setError("");
      const response = await axios.get(`/b2b/hotels/markup/list-categroy`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setStarCategory(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(
        error?.response?.data?.error || "Something went wrong, Try again"
      );
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchMarkups();
  }, []);

  return (
    <table className="w-full">
      <thead>
        <tr className=" text-darktext  text-[15px] text-left border-b">
          <th className="font-[700] px-3 py-5 whitespace-nowrap text-left ">
            Star Category
          </th>
          <th className="font-[700] px-3 py-5 whitespace-nowrap text-left ">
            Client Markup
          </th>
        </tr>
      </thead>
      <tbody className="text-sm text-textColor divide-y">
        {isLoading ? (
          <tr className="">
            <td colSpan={3}>
              <PageLoader />
            </td>
          </tr>
        ) : (
          <>
            {error ? (
              <tr className="">
                <td
                  colSpan={3}
                  className="text-center w-full text-gray-300 font-medium text-sm py-10"
                >
                  {error}
                </td>
              </tr>
            ) : (
              ""
            )}
            {starCategory?.map((item) => (
              <StarCategorySingleList item={item} key={item?.name} />
            ))}
          </>
        )}
      </tbody>
    </table>
  );
}

export default StarCategoryTab;
