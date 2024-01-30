import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../axios";
import { BtnLoader } from "../../components";
import { setAlertSuccess } from "../../../redux/slices/homeSlice";
import {setAgentCompanyLogo} from "../../../redux/slices/agentSlice"
import { useNavigate } from "react-router-dom";
import { config } from "../../../constants";

function CompanySettings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { agent,agenttempLogo, token } = useSelector((state) => state.agents);
  const [companyDetails, setCompanyDetails] = useState({
    companyName: agent?.companyName || "",
    address: agent?.address || "",
    website: agent?.website || "",
    trnNumber: agent?.trnNumber || "",
    companyRegistration: agent?.companyRegistration || "",
    city: agent?.city || "",
    zipCode: agent?.zipCode || "",
    companyLogo: agent?.companyLogo || "",
  });
  const [country, setCountry] = useState(agent?.country?._id || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [companyLogo, setCompanyLogo] = useState({
    companyLogo: [],
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [bankDetails, setBankDetails] = useState({
    accountNumber: "",
    bankName: "",
    ibanCode: "",
    ifscCode: "",
    accountHolder: "",
  });

  const { countries, UAE } = useSelector((state) => state.home);

  const handleChange = (e) => {
    setCompanyDetails((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleBankDetailChange = (e) => {
    setBankDetails((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };



  const handleLogoChange = (e) => {
    const file = e.target.files[0];

    setCompanyLogo({
      ...companyLogo,
      [e.target.name]: e.target.files[0],
    });

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result); 
    };
    reader.readAsDataURL(file);
    // setSelectedImage(URL.createObjectURL(file))
  };
function updateAgednCompanyLogo(){
 
  dispatch(setAgentCompanyLogo(selectedImage))

}
  const formData = new FormData();
  formData.append("companyName", companyDetails.companyName);
  formData.append("address", companyDetails.address);
  formData.append("website", companyDetails.website);
  formData.append("trnNumber", companyDetails.trnNumber);
  formData.append("companyRegistration", companyDetails.companyRegistration);
  formData.append("city", companyDetails.city);
  formData.append("zipCode", companyDetails.zipCode);
  formData.append("companyLogo", companyLogo.companyLogo);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setError("");
      setIsLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.patch(
        "/b2b/resellers/auth/update/comapnySettings",
        formData,
        config
      );
      setIsLoading(false);
      dispatch(
        setAlertSuccess({
          status: true,
          title: "Success!",
          text: "Update Successful",
        })
      );
      navigate("/");
      return response.data;
    } catch (err) {
      setError(err?.response?.data?.error || "Something went wrong, Try again");
      setIsLoading(false);
    }
  };
  return (
    <div className="px-4 py-10 rounded-sm shadow-round">
      <form onSubmit={submitHandler}>
        <div className="space-y-5 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
          <div className="space-y-3">
            <div className="text-xs text-grayColor"> Travel Agency Name</div>
            <input
              className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
              type="text"
              name="companyName"
              value={companyDetails.companyName}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-3">
            <div className="text-xs text-grayColor"> Address</div>
            <input
              className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
              type="text"
              name="address"
              value={companyDetails.address}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-3">
            <div className="text-xs text-grayColor"> Nationality</div>
            <select
              className="border-b capitalize outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option hidden>select</option>
              {countries?.map((item, index) => (
                <option className="capitalize" value={item?._id} key={index}>
                  {item?.countryName}{" "}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <div className="text-xs text-grayColor"> Website</div>
            <input
              className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
              type="text"
              name="website"
              value={companyDetails.website}
              onChange={handleChange}
            />
          </div>

          {country && country === UAE?._id && (
            <>
              <div className="space-y-3">
                <div className="text-xs text-grayColor"> TRN Number</div>
                <input
                  className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
                  type="number"
                  name="trnNumber"
                  value={companyDetails.trnNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-3">
                <div className="text-xs text-grayColor">
                  {" "}
                  Company Registration Number
                </div>
                <input
                  className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
                  type="text"
                  name="companyRegistration"
                  value={companyDetails.companyRegistration}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <div className="space-y-3">
            <div className="text-xs text-grayColor"> City</div>
            <input
              className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
              type="text"
              name="city"
              value={companyDetails.city}
              onChange={handleChange}
            />
          </div>

          {country && country !== UAE?._id && (
            <div className="space-y-3">
              <div className="text-xs text-grayColor"> Zip Code</div>
              <input
                className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
                type="text"
                name="zipCode"
                value={companyDetails.zipCode}
                onChange={handleChange}
              />
            </div>
          )}
        </div>
        <div className=" relative lg:w-1/2 mt-5 my-7">
          <div className="text-xs text-grayColor">Company Logo</div>
          <div className="md:flex gap-10">
            <input id="fileInput"
              className="order-2 md:order-1 border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full pt-10"
              type="file"
              name="companyLogo"
              // value={companyLogo.companyLogo}
              onChange={handleLogoChange}
            />
            {agent?.companyLogo || selectedImage ? (
              <img
                src={
                  selectedImage
                    ? selectedImage
                    : agenttempLogo?agenttempLogo
                    : config?.SERVER_URL + agent?.companyLogo
                }
                className="md:order-2 order-1  w-32 h-20"
                alt="Logo"
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="border-b border-dashed"/>
        <div className="my-7 font-semibold "> Bank Details</div>
        <div className="space-y-5 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
          <div className="space-y-3">
            <div className="text-xs text-grayColor"> Account Number</div>
            <input
              className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
              type="text"
              name="accountNumber"
              value={bankDetails.accountNumber}
              onChange={handleBankDetailChange}
            />
          </div>
          <div className="space-y-3">
            <div className="text-xs text-grayColor"> Bank Name</div>
            <input
              className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
              type="text"
              name="bankName"
              value={bankDetails.bankName}
              onChange={handleBankDetailChange}
            />
          </div>{" "}
          <div className="space-y-3">
            <div className="text-xs text-grayColor"> IBAN Code</div>
            <input
              className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
              type="text"
              name="ibanCode"
              value={bankDetails.ibanCode}
              onChange={handleBankDetailChange}
            />
          </div>{" "}
          <div className="space-y-3">
            <div className="text-xs text-grayColor"> IFSC Code</div>
            <input
              className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
              type="text"
              name="ifscCode"
              value={bankDetails.ifscCode}
              onChange={handleBankDetailChange}
            />
          </div>{" "}
          <div className="space-y-3">
            <div className="text-xs text-grayColor"> Account Holder Name</div>
            <input
              className="border-b outline-none focus:border-green-400 hover:border-orange-500 text-sm px-2 w-full"
              type="text"
              name="accountHolder"
              value={bankDetails.accountHolder}
              onChange={handleBankDetailChange}
            />
          </div>{" "}
        </div>
        <div className="mt-4 flex items-center justify-end gap-[12px]">
          {error && (
            <div className="flex justify-end">
              <p className="text-main text-xs capitalize">{error} </p>
            </div>
          )}
          <button
        
        onClick={updateAgednCompanyLogo}
        
            className="h-8 px-5 bg-BEColor text-white text-xs rounded-sm shadow-mn "
            type="submit"
          >
            {isLoading ? <BtnLoader /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CompanySettings;
