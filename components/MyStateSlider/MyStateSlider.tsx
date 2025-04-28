import React from "react";
import { MoodSliderProps } from "../../types";
import useSpeachStore from "../../lib/store";

const MyStateSlider: React.FC<MoodSliderProps> = () => {
  const {
    maxValue,
    positivePercent,
    neutralPercent,
    negativePercent,
    markerPosition,
    moodLabel,
    background,
  } = useSpeachStore((state) => state);
  const numBars = 21;
  const filledBars = Math.ceil((maxValue / 100) * 10);
  const defaultBg = [
    "bg-[#06A45D33]",
    "bg-[#1EAC5933]",
    "bg-[#5CBE4F33]",
    "bg-[#6CC44C33]",
    "bg-[#8DCE4733]",
    "bg-[#9CD24433]",
    "bg-[#B2D94133]",
    "bg-[#BBDC3F33]",
    "bg-[#c0DC3F33]",
    "bg-[#c5DC3F33]",
    "bg-[#EaB02A33]",
    "bg-[#EBB02A33]",
    "bg-[#EE9A2533]",
    "bg-[#F0872133]",
    "bg-[#F1791D33]",
    "bg-[#F45F1733]",
    "bg-[#F64F1333]",
    "bg-[#F83B0E33]",
    "bg-[#FB1E0733]",
    "bg-[#FD120433]",
  ];
  // Reversed Tailwind red shades (lightest first, darkest last)
  const redShades = [
    "bg-[#EaB02A]",
    "bg-[#EBB02A]",
    "bg-[#EE9A25]",
    "bg-[#F08721]",
    "bg-[#F1791D]",
    "bg-[#F45F17]",
    "bg-[#F64F13]",
    "bg-[#F83B0E]",
    "bg-[#FB1E07]",
    "bg-[#FD1204]",
  ];

  // Reversed Tailwind green shades (lightest first, darkest last)
  const greenShades = [
    "bg-[#c5DC3F]",
    "bg-[#c0DC3F]",
    "bg-[#BBDC3F]",
    "bg-[#B2D941]",
    "bg-[#9CD244]",
    "bg-[#8DCE47]",
    "bg-[#6CC44C]",
    "bg-[#5CBE4F]",
    "bg-[#1EAC59]",
    "bg-[#06A45D]",
  ].reverse(); // Reverse so the darkest green is on the far left

  return (
    <div
      dir="ltr"
      className="h-16 max-w-2xl w-full  mx-auto gap-[2px] items-end my-2"
    >
      <div className=" pt-1 w-full">
        <div className="relative w-fit mx-auto ">
          <div className="flex relative mx-auto justify-center  w-fit">
            {Array.from({ length: numBars }, (_, index) => {
              let currentBarColor = "bg-gray-50"; // Default empty bars
              // let borderColor = "border-white"; // Default border

              if (index < 10) {
                // Green bars: Apply gradient effect from middle to left
                if (maxValue === positivePercent && index >= 10 - filledBars) {
                  currentBarColor =
                    greenShades[index - (10 - filledBars)] || "bg-green-600";
                } else {
                  currentBarColor = defaultBg[index];
                }
              } else if (index === 10) {
                // Yellow (Neutral bar in the center)
                if (maxValue === neutralPercent) {
                  currentBarColor = "bg-yellow-300";
                } else {
                  currentBarColor = "bg-yellow-400 bg-opacity-20";
                }
              } else {
                // Red bars: Apply reversed gradient effect (lightest to darkest)
                if (maxValue === negativePercent && index < 11 + filledBars) {
                  currentBarColor = redShades[index - 11] || "bg-red-900";
                } else {
                  currentBarColor = defaultBg[index];
                }
              }

              return (
                <div
                  key={index}
                  className={`w-[24px] md:w-[20px] lg:w-[24px] gap-[.5px] px-[.5] h-12 rounded-sm flex  ${currentBarColor} transition-all duration-500`}
                >
                  {/* <div className={`w-1/2  `}></div> */}
                  {/* <div className={`w-1/2`}></div> */}
                </div>
              );
            })}
          </div>

          {/* Marker */}
          <div
            className={
              "absolute -top-[15%] w-4 h-4  rounded-full shadow-xl transform -translate-y-1/2 transition-transform duration-500"
            }
            style={{ left: `${markerPosition}%` }}
          >
            {/* Value Indicator */}
            <div className="absolute flex flex-col items-center -top-14 left-1/2 transform -translate-x-1/2">
              <p
                dir="rtl"
                className="flex gap-1 justify-center px-1 w-20 py-1 rounded shadow text-sm text-white font-semibold"
                style={{ background }}
              >
                <span className={`${moodLabel === "عادي" && "hidden"}`}>
                  {moodLabel !== "عادي" && `${maxValue}%`}
                </span>
                <span className="text-sm">{moodLabel}</span>
              </p>
              <div className="h-4 w-0.5 bg-gray-300 mt-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyStateSlider;
