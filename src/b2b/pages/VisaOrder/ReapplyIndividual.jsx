import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../../axios";
import MonthNames from "../../data/monthNames";
import { BtnLoader } from '../../components'

function ReapplyIndividual() {
  const { id, passenger } = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [data, setData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    contactNo: "",
    expDay: "",
    expMonth: "",
    expYear: "",
    passportNo: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
  });

  const [document, setDocument] = useState({
    passportFistPagePhoto: [],
    passportLastPagePhoto: [],
    passportSizePhoto: [],
    supportiveDoc1: [],
    supportiveDoc2: [],
  });

  const { countries } = useSelector((state) => state.home);
  const { token } = useSelector((state) => state.agents);

  let limit = new Date().getFullYear();
  let year = [];
  for (let i = limit; i > limit - 100; i--) {
    year.push(i);
  }

  let explimit = new Date().getFullYear();
  let expYear = [];
  for (let i = explimit; i < explimit + 100; i++) {
    expYear.push(i);
  }

  let day = [];
  for (let i = 1; i <= 31; i++) {
    day.push(i);
  }

  const handleChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }; 
  

  const onChangeImageHandler = (e) => {
    setDocument((prev) => {
      return { ...prev, [e.target.name]: e.target.files[0] };
    });
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      if (token) {
        const response = await axios.get(
          `/b2b/visa/application/list/${id}/traveller/${passenger}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setIsLoading(false);
        setData({
          title: response.data?.title || "",
          firstName: response.data?.firstName || "",
          lastName: response.data?.lastName || "",
          email: response.data?.email || "",
          country: response.data?.country || "",
          contactNo: response.data?.contactNo || "",
          expDay: response.data?.expiryDate?.day || "",
          expMonth: response.data?.expiryDate?.month || "",
          expYear: response.data?.expiryDate?.year || "",
          passportNo: response.data?.passportNo || "",
          dobDay: response.data?.dateOfBirth?.day || "",
          dobMonth: response.data?.dateOfBirth?.month || "",
          dobYear: response.data?.dateOfBirth?.year || "",
        });
      }
    } catch (error) {
      setError(error?.response?.data?.error);
      setIsLoading(false);
    }
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setSubmitLoading(true);

      const formData = new FormData();
      formData.append("title", data?.title);
      formData.append("firstName", data?.firstName);
      formData.append("lastName", data?.lastName);
      formData.append(
        "dateOfBirth",
        JSON.stringify({
          day: data?.dobDay,
          month: data?.dobMonth,
          year: data?.dobYear,
        })
      );
      formData.append(
        "expiryDate",
        JSON.stringify({
          day: data?.expDay,
          month: data?.expMonth,
          year: data?.expYear,
        })
      );
      formData.append("country", data?.country);
      formData.append("passportNo", data?.passportNo);
      formData.append("contactNo", data?.contactNo);
      formData.append("email", data?.email);
      formData.append("passportFistPagePhoto", document?.passportFistPagePhoto);
      formData.append("passportLastPagePhoto", document?.passportLastPagePhoto);
      formData.append("passportSizePhoto", document?.passportSizePhoto);
      formData.append("supportiveDoc1", document?.supportiveDoc1);
      formData.append("supportiveDoc2", document?.supportiveDoc2);
      if (token) {
        const response = await axios.post(
          `/b2b/visa/application/${id}/reapply/${passenger}`,
          formData,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setSubmitLoading(false);
      }
    } catch (error) {
      setError(error?.response?.data?.error);
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className=" ">
        <div className="p-2 ">
          <div className=" mt-2 ">
            <div>
              <form onSubmit={submitHandler}>
                <div className="p-6">
                  <div className="lg:grid grid-cols-12 gap-5 text-darktext space-y-3 lg:space-y-0 lg:py-2">
                    <div className="col-span-2">
                      <div className="">
                        <label className="label">Mr/Mrs</label>
                      </div>
                      <div className="">
                        <select
                          name="title"
                          value={data.title}
                          onChange={handleChange}
                          className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none bg-soft"
                        >
                          <option hidden>choose title</option>
                          <option value={"mr"}>Mr.</option>
                          <option value={"ms"}>Ms.</option>
                          <option value={"mrs"}>Mrs.</option>
                          <option value={"mstr"}>Mstr.</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-span-5">
                      <div className="">
                        <label className="label">First Name</label>
                      </div>
                      <div className="">
                        <input
                          type="text"
                          name="firstName"
                          value={data.firstName}
                          onChange={handleChange}
                          className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none bg-soft"
                        />
                      </div>
                    </div>
                    <div className="col-span-5">
                      <div className="">
                        <label className="label">Last Name</label>
                      </div>
                      <div className="">
                        <input
                          type="text"
                          className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none bg-soft"
                          name="lastName"
                          value={data.lastName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="lg:grid grid-cols-12 gap-5 text-darktext space-y-3 lg:space-y-0 lg:py-2">
                    <div className="col-span-4">
                      <div className="">
                        <label className="label">Email</label>
                      </div>
                      <div className="">
                        <input
                          type="email"
                          className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none bg-soft"
                          name="email"
                          value={data.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-span-4">
                      <div className="">
                        <label className="label">Nationality</label>
                      </div>
                      <div className="">
                        <select
                          className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none bg-soft"
                          name="country"
                          value={data.country}
                          onChange={handleChange}
                        >
                          <option hidden>Choose Country</option>
                          {countries?.map((item, index) => (
                            <option
                              key={index}
                              value={item?._id}
                              className="capitalize"
                            >
                              {item?.countryName}{" "}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-span-4 flex gap-2">
                      <div className="w-full">
                        <div className="">
                          <label className="label">Contact Number</label>
                        </div>
                        <div className="">
                          <input
                            type="number"
                            className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none bg-soft no-spinner"
                            name="contactNo"
                            value={data.contactNo}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:grid grid-cols-12 gap-5 text-darktext space-y-3 lg:space-y-0 lg:py-2">
                    <div className="col-span-3">
                      <div className="w-full">
                        <label className="label">passport Expiry</label>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="">
                          <select
                            className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none bg-soft"
                            name="expDay"
                            value={data?.expDay}
                            onChange={handleChange}
                          >
                            <option hidden>Day</option>
                            {day.map((item, index) => (
                              <option key={index} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="">
                          <select
                            className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none bg-soft"
                            name="expMonth"
                            value={data?.expMonth}
                            onChange={handleChange}
                          >
                            <option hidden>Month</option>
                            {MonthNames.map((item, index) => (
                              <option
                                key={index}
                                value={item.value}
                                className="capitalize"
                              >
                                {item.name}{" "}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="">
                          <select
                            className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none bg-soft"
                            name="expYear"
                            value={data?.expYear}
                            onChange={handleChange}
                          >
                            <option hidden>Year</option>
                            {expYear.map((item, index) => (
                              <option key={index} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6">
                      <div className="">
                        <label className="label">Passport Number</label>
                      </div>
                      <div className="">
                        <input
                          type="text"
                          className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none bg-soft "
                          name="passportNo"
                          value={data.passportNo}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-span-3">
                      <div className="w-full">
                        <label className="label">Date of Birth</label>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="">
                          <select
                            placeholder="Day"
                            className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none bg-soft"
                            name="dobDay"
                            value={data?.dobDay}
                            onChange={handleChange}
                          >
                            <option hidden> Day</option>
                            {day.map((item, index) => (
                              <option key={index} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="w-full">
                          <select
                            placeholder="Month"
                            className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none bg-soft"
                            name="dobMonth"
                            value={data?.dobMonth}
                            onChange={handleChange}
                          >
                            <option hidden>Month</option>
                            {MonthNames.map((item, index) => (
                              <option
                                key={index}
                                value={item.value}
                                className="capitalize"
                              >
                                {item.name}{" "}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="w-full">
                          <select
                            className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none bg-soft"
                            name="dobYear"
                            value={data?.dobYear}
                            onChange={handleChange}
                          >
                            <option hidden>Year</option>
                            {year.map((item, index) => (
                              <option key={index} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 gap-3 mt-4 text-darktext">
                    <div className=" flex flex-col">
                      <label htmlFor="" className="label">
                        Passport First Page
                      </label>
                      <input
                        className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none bg-soft "
                        name="passportFistPagePhoto"
                        type={"file"}
                        onChange={onChangeImageHandler}
                      />
                    </div>
                    <div className="">
                      <label htmlFor="" className="label">
                        Passport Second Page
                      </label>
                      <input
                        className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none bg-soft "
                        name="passportLastPagePhoto"
                        type={"file"}
                        onChange={onChangeImageHandler}
                      />
                    </div>
                    <div className="">
                      <label htmlFor="" className="label">
                        Passport Size Photo
                      </label>
                      <input
                        className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none bg-soft "
                        name="passportSizePhoto"
                        type={"file"}
                        onChange={onChangeImageHandler}
                      />
                    </div>
                    <div className="">
                      <label htmlFor="" className="label">
                        Supportive Document 1
                      </label>
                      <input
                        className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none bg-soft "
                        name="supportiveDoc1"
                        type={"file"}
                        onChange={onChangeImageHandler}
                      />
                    </div>
                    <div className="">
                      <label htmlFor="" className="label">
                        Supportive Document 2
                      </label>
                      <input
                        className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none bg-soft "
                        name="supportiveDoc2"
                        type={"file"}
                        onChange={onChangeImageHandler}
                      />
                    </div>
                  </div>
                  {error && (
                  <div className="mt-4 flex justify-end">
                    <p className="text-red-500 text-xs">{error}</p>
                  </div>
                  )}
                  <div className="flex justify-end mt-4">
                    <button type="submit" className="button w-[200px]">
                      {submitLoading ? <BtnLoader /> : "Submit"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReapplyIndividual;
