import React from "react";
import { playStoreJpeg } from "../../../static/images";
import { config } from "../../../constants";
import DotPattern from "../Patterns/DotPattern";

function MobileAppCard() {
  return (
    <div className="max-w-screen-xl mx-auto p-2">
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(111,60,227,1) 0%, rgba(116,60,227,1) 31%, rgba(166,60,227,1) 100%)",
        }}
        className="relative  shadow-round rounded-xl w-full md:h-[15em] overflow-hidden"
      >
        <div className="md:flex justify-around">
          <div className="">
            <div className="p-5 md:p-10 space-y-3">
              <h2 className="text-white font-[800] tracking-wide text-4xl ">
                Grab our mobile app.
              </h2>
              <div className="flex justify-center">
                <a href={config.PLAYSTORE_URL} target="_blank" rel="noopener">
                  <div className="w-44 rounded-xl overflow-hidden">
                    <img
                      src={playStoreJpeg}
                      alt="play-store"
                      className="object-contain w-full h-full"
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="flex justify-center p-5">
            <div className="w-72 rounded-2xl   overflow-hidden">
              <img
                src={config.MOBILE_APP_iMAGE}
                alt="Home"
                className="w-full object-contain z-10"
              />
            </div>
          </div>
        </div>
        <div className="absolute w-52 h-52   shadow-round -right-14 top-0 z-0">
          <DotPattern />
        </div>
        <div className="hidden md:block absolute w-52 h-52 rotate-45  shadow-round -left-20 -bottom-20 z-0">
          <DotPattern />
        </div>
      </div>
    </div>
  );
}

export default MobileAppCard;
