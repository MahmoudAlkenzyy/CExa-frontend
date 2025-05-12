import React from "react";

const CallRating = () => {
  return (
    <div className="flex items-center px-10 justify-between flex-grow h-full">
      <div className="relative flex justify-center">
        <div className="relative w-28 h-28">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#eee"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#75C64B"
              strokeWidth="3"
              strokeLinecap="butt"
              strokeDasharray="72.92, 100"
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="text-xl font-semibold text-gray-700">72.5%</span>
          </div>
        </div>
      </div>
      <div dir="rtl" className="">
        <p className="font-bold mb-3">المكالمات</p>
        <p className="flex items-center gap-1 my-2 ">
          <span className="block w-3 h-3 bg-[#D9D9D9] rounded-full" /> مجموع
          المكالمات 100{" "}
        </p>
        <p className="flex items-center gap-1 my-2 ">
          <span className="block w-3 h-3 bg-[#75C64B] rounded-full" /> مكالمات
          ناجحة 40{" "}
        </p>
      </div>
    </div>
  );
};

export default CallRating;
