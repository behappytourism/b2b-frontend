import React from "react";
import { useDispatch } from "react-redux";
import {
  childhandleDOBChange,
  childhandleExpiryChange,
  childhandleRowItemChange,
} from "../../../redux/slices/visaSlice";
import { monthNames } from "../../data";

function TravellerDetailFormChild({ childRows, index }) {
  const dispatch = useDispatch();

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

  const onRowChange = (e, index) => {
    dispatch(
      childhandleRowItemChange({
        value: e.target.value,
        name: e.target.name,
        index,
      })
    );
  };

  const handleChange = ({ value, name, index }) => {
    dispatch(
      childhandleDOBChange({
        value,
        name,
        index,
      })
    );
  };
  const handleExpChange = ({ value, name, index }) => {
    dispatch(
      childhandleExpiryChange({
        value,
        name,
        index,
      })
    );
  };
  return (
    <div className="">
      <div className="lg:grid grid-cols-12 gap-5 text-darktext space-y-3 lg:space-y-0 lg:py-2">
        <div className="col-span-2">
          <div className="">
            <label className="label">Mr/Mrs</label>
          </div>
          <div className="">
            <select
              name="title"
              value={childRows?.title}
              onChange={(e) => onRowChange(e, index)}
              className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none bg-transparent"
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
              value={childRows?.firstName}
              onChange={(e) => onRowChange(e, index)}
              className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none"
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
              className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none"
              name="lastName"
              value={childRows?.lastName}
              onChange={(e) => onRowChange(e, index)}
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
              className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none"
              name="email"
              value={childRows?.email}
              onChange={(e) => onRowChange(e, index)}
            />
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
                className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none no-spinner"
                name="contactNo"
                value={childRows?.contactNo}
                onChange={(e) => onRowChange(e, index)}
              />
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <div className="w-full">
            <label className="label">passport Expiry</label>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="">
              <select
                className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none bg-transparent"
                name="day"
                value={childRows?.expiryDate?.day}
                onChange={(e) => {
                  handleExpChange({
                    value: e.target.value,
                    name: e.target.name,
                    index,
                  });
                }}
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
                className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none bg-transparent"
                name="month"
                value={childRows?.expiryDate?.month}
                onChange={(e) => {
                  handleExpChange({
                    value: e.target.value,
                    name: e.target.name,
                    index,
                  });
                }}
              >
                <option hidden>Month</option>
                {monthNames.map((item, index) => (
                  <option key={index} value={item.value} className="capitalize">
                    {item.name}{" "}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <select
                className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none bg-transparent"
                name="year"
                value={childRows?.expiryDate?.year}
                onChange={(e) => {
                  handleExpChange({
                    value: e.target.value,
                    name: e.target.name,
                    index,
                  });
                }}
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
      </div>
      <div className="lg:grid grid-cols-12 gap-5 text-darktext space-y-3 lg:space-y-0 lg:py-2">
        <div className="col-span-6">
          <div className="">
            <label className="label">Passport Number</label>
          </div>
          <div className="">
            <input
              type="text"
              className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none no-spinner"
              name="passportNo"
              value={childRows?.passportNo}
              onChange={(e) => onRowChange(e, index)}
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
                className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none bg-transparent"
                name="day"
                value={childRows?.dateOfBirth?.day}
                onChange={(e) => {
                  handleChange({
                    value: e.target.value,
                    name: e.target.name,
                    index,
                  });
                }}
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
                className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none bg-transparent"
                name="month"
                value={childRows?.dateOfBirth?.month}
                onChange={(e) => {
                  handleChange({
                    value: e.target.value,
                    name: e.target.name,
                    index,
                  });
                }}
              >
                <option hidden>Month</option>
                {monthNames.map((item, index) => (
                  <option key={index} value={item.value} className="capitalize">
                    {item.name}{" "}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <select
                className="w-full py-2 p-1 text-primaryColor border-b border-darktext outline-none bg-transparent"
                name="year"
                value={childRows?.dateOfBirth?.year}
                onChange={(e) => {
                  handleChange({
                    value: e.target.value,
                    name: e.target.name,
                    index,
                  });
                }}
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
    </div>
  );
}

export default TravellerDetailFormChild;
