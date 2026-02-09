import React from "react";
import useSpeachStore from "@/lib/store";

const CallRating = () => {
  const { language } = useSpeachStore();

  return (
    <div className="flex items-center flex-col px-10 justify-center p-7 py-3 w-full text-white   rounded-2xl border border-[#1B3E90]">
      <div dir={language === "ar" ? "rtl" : "ltr"} className="w-full">
        <p className=" text-[24px] font-semibold mb-3">
          {language === "ar" ? "المكالمات" : "Calls"}
        </p>
        <div className="flex items-center gap-1 my- text-[16px]">
          <span className="block w-4 h-4 blur-[1px] bg-[#3788E5] rounded-full" />{" "}
          <p className="flex items-center justify-between gap-1 my-2 w-full">
            <span>{language === "ar" ? "مجموع المكالمات" : "Total Calls"}</span>
            <span>100</span>
          </p>
        </div>
        <div className="flex items-center  gap-1 my-2 ">
          <span className="block w-4 h-4 blur-[1px] bg-[#75C64B] rounded-full" />{" "}
          <p className="flex items-center justify-between gap-1 my-2 w-full">
            <span>
              {language === "ar" ? "مكالمات ناجحة" : "Successful Calls"}
            </span>
            <span className="text-[#75C64B]">40</span>
          </p>
        </div>
      </div>{" "}
      <div className="relative flex justify-center">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full blur-[.5px]" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#3788E5"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#8CCD47"
              strokeWidth="3"
              strokeLinecap="butt"
              strokeDasharray="40.92, 100"
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="bg-gradient-to-b from-[#1C6CB7] font-bold text-2xl to-[#0C3051] inline-block text-transparent bg-clip-text text-center ">
              40%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallRating;
