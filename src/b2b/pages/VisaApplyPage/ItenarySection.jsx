import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOnChangeVisaEnquiry } from "../../../redux/slices/visaSlice";

function ItenarySection({ navigation, setNavigation, setData, data }) {
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
 
    dispatch(
      setOnChangeVisaEnquiry({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  const { visa, visaEnquiry } = useSelector((state) => state.visa);

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("visaEnquiry", JSON.stringify(data));
    setNavigation({
      itenary: false,
      details: true,
      payment: false,
      upload: false,
    });
  };

  return (
    <div className=" text-darktext">
      {navigation.itenary && (
        <form
          onSubmit={submitHandler}
          className="rounded-[.25rem] shadow-[0_0_7px_2px_rgb(56_65_74_/_7%)] "
        >
          <div
            className={`my-2  px-3 py-4 border-b border-dashed `}
            onClick={() => {
              navigation.details &&
                setNavigation({
                  itenary: true,
                  details: false,
                  payment: false,
                  upload: false,
                });
            }}
          >
            <p className="font-[700] text-xl text-gray-400">Itenary</p>
          </div>
          <div className="px-3 py-2">
            <div className="md:grid grid-cols-12 gap-3 ">
              <div className="col-span-4 flex flex-col">
                <label htmlFor="" className="label">
                  Visa Type
                </label>
                <select
                  className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none bg-transparent"
                  name="visaType"
                  value={visaEnquiry.visaType}
                  onChange={onChangeHandler}
                  required
                >
                  <option hidden>Choose Visa Type</option>
                  {visa?.visaTypes?.map((item, index) => (
                    <option key={index} value={item?._id}>
                      {item?.visaName}{" "}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2 flex flex-col">
                <label htmlFor="" className="label">
                  Adult
                </label>
                <select
                  className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none bg-transparent"
                  name="noOfAdult"
                  value={visaEnquiry.noOfAdult}
                  onChange={onChangeHandler}
                  required
                >
                  <option hidden>Choose</option>
                  {Array.from(Array(50).keys(), (n) => n + 1).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2 flex flex-col">
                <label htmlFor="" className="label">
                  Child
                </label>
                <select
                  className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none bg-transparent"
                  name="noOfChild"
                  value={visaEnquiry.noOfChild}
                  onChange={onChangeHandler}
                  required
                >
                  <option hidden>Choose</option>
                  {Array.from(Array(50).keys(), (n) => n).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                className="bg-lightblue text-xs text-white px-3 py-2 rounded-sm shadow-mn"
              >
                Move to Details
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default ItenarySection;
