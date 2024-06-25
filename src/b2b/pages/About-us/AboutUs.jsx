import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import LandingPageFooter from "../../components/landingPage/LandingPageFooter";
import LandingPageHeader from "../../components/landingPage/LandingPageHeader";

function AboutUs() {
  const [isLoading, setIsLoading] = useState(false);
  const [aboutUs, setAboutUs] = useState({});

  const fetchAboutUsDetails = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `/b2b/home/about-us`
        // {
        //   headers: { Authorization: `Bearer ${token}` },
        // }
      );

      setIsLoading(false);
      setAboutUs(res?.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAboutUsDetails();
  }, []);


  return (
    <div className="px-20">
      {!isLoading && (
        <>
          <div>
            <LandingPageHeader />
          </div>

          <h1 className="text-3xl flex mt-5 mb-10 w-full justify-center underline">
            About us
          </h1>

          <div className="w-full flex justify-center max-w-screen-2xl mx-auto">
            <div
              className="flex flex-col gap-10"
              dangerouslySetInnerHTML={{ __html: aboutUs?.aboutUs }}
            ></div>
          </div>

          <LandingPageFooter />
        </>
      )}

      {isLoading && (
        <>
          <div className="w-full flex  justify-center my-10">
            <div role="status" className="max-w-xl animate-pulse">
              <div className="h-2.5 bg-gray-200 rounded-full  w-[500px] mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full  max-w-[660px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full  max-w-[430px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full  max-w-[700px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full  max-w-[560px]"></div>
              <span className="sr-only">Loading...</span>
            </div>
          </div>

          <div className="w-full flex  justify-center my-10">
            <div role="status" className="max-w-xl animate-pulse">
              <div className="h-2.5 bg-gray-200 rounded-full  w-[500px] mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full  max-w-[660px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full  max-w-[430px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full  max-w-[700px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full  max-w-[560px]"></div>
              <span className="sr-only">Loading...</span>
            </div>
          </div>

          <div className="w-full flex  justify-center my-10">
            <div role="status" className="max-w-xl animate-pulse">
              <div className="h-2.5 bg-gray-200 rounded-full  w-[500px] mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full  max-w-[660px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full  max-w-[430px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full  max-w-[700px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full  max-w-[560px]"></div>
              <span className="sr-only">Loading...</span>
            </div>
          </div>

          <div className="w-full flex  justify-center my-10">
            <div role="status" className="max-w-xl animate-pulse">
              <div className="h-2.5 bg-gray-200 rounded-full  w-[500px] mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full  max-w-[660px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full  max-w-[430px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full  max-w-[700px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full  max-w-[560px]"></div>
              <span className="sr-only">Loading...</span>
            </div>
          </div>

          <div className="w-full flex  justify-center my-10">
            <div role="status" className="max-w-xl animate-pulse">
              <div className="h-2.5 bg-gray-200 rounded-full  w-[500px] mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full  max-w-[660px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full  max-w-[430px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full  max-w-[700px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full  max-w-[560px]"></div>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AboutUs;
