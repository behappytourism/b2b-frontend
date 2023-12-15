import React, { useState } from "react";
import ProfileSettings from "./ProfileSettings";
import CompanySettings from "./CompanySettings";
import AuthSettings from "./AuthSettings";
import { MdPassword } from "react-icons/md";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { BsFillPersonCheckFill } from "react-icons/bs";

function Settings() {
  const [settingSection, setSettingSection] = useState({
    profile: true,
    company: false,
    auth: false,
  });
  return (
    <div className=" ">
      <div>
        <div className=" relative ">
          <div className="  md:w-auto  rounded-t-md md:rounded-t-md overflow-x-auto  scrollbar-hide">
            <div className="bg-[#f7f5f7] flex  space-x-1 px-1 py-3 md:py-1 items-center shadow ">
              <div className="max-w-screen-xl mx-auto w-full">
                <div className="w-full ">
                  <ul className="flex">
                    <li className=" mr-8">
                      <span
                        className={`inline-block p-2 ${
                          settingSection.profile
                            ? " text-blue-500  "
                            : " text-gray-400 border-transparent hover:text-blue-400  "
                        }  rounded-full  transition duration-200 cursor-pointer flex items-center gap-1 text-sm`}
                        href="#"
                        onClick={() => {
                          setSettingSection({
                            profile: true,
                            company: false,
                            auth: false,
                          });
                        }}
                      >
                        <span className="text-lg">
                          <BsFillPersonCheckFill />
                        </span>
                        Profile Settings
                      </span>
                    </li>
                    <li className=" mr-8">
                      <span
                        className={`inline-block p-2 ${
                          settingSection.company
                            ? " text-blue-500  "
                            : " text-gray-400 border-transparent hover:text-blue-400  "
                        }  rounded-full   transition duration-200 cursor-pointer  flex items-center gap-1 text-sm`}
                        href="#"
                        onClick={() => {
                          setSettingSection({
                            profile: false,
                            company: true,
                            auth: false,
                          });
                        }}
                      >
                        <span className="text-lg">
                          <HiBuildingOffice2 />
                        </span>
                        Company Settings
                      </span>
                    </li>
                    <li className=" mr-8">
                      <span
                        className={`inline-block p-2 ${
                          settingSection.auth
                            ? " text-blue-500  "
                            : " text-gray-400 border-transparent hover:text-blue-400  "
                        }  rounded-full   transition duration-200 cursor-pointer  flex items-center gap-1 text-sm`}
                        href="#"
                        onClick={() => {
                          setSettingSection({
                            profile: false,
                            company: false,
                            auth: true,
                          });
                        }}
                      >
                        <span className="text-lg">
                          <MdPassword />
                        </span>
                        Password Settings
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto">
        <div className="px-5 py-10">
          {settingSection.profile && <ProfileSettings />}
          {settingSection.company && <CompanySettings />}
          {settingSection.auth && <AuthSettings />}
        </div>
      </div>
    </div>
  );
}

export default Settings;
