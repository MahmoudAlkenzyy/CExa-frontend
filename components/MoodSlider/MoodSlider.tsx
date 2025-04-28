import React from "react";
import { cn } from "@/lib/utils";
import { MoodSliderProps } from "../../types";

const MoodSlider = ({ moodData, className }: MoodSliderProps) => {
  // Convert decimals to percentages
  const positivePercent = Math.round(moodData.positive * 100);
  const neutralPercent = Math.round(moodData.neutral * 100);
  const negativePercent = Math.round(moodData.negative * 100);

  // Find the highest percentage and its corresponding mood
  const maxValue = Math.max(positivePercent, neutralPercent, negativePercent);
  let markerPosition = 50; // Default to center
  let moodLabel = "";
  let background = "";
  if (maxValue === positivePercent) {
    markerPosition = 40 - (positivePercent / 100) * 40; // Center of first third
    moodLabel = "سعيد";
    background = "#4ADE80";
  } else if (maxValue === neutralPercent) {
    markerPosition = (neutralPercent / 100) * 20 + 40; // Center of middle third
    moodLabel = "عادي";
    background = "#FACC15";
  } else if (maxValue === negativePercent) {
    markerPosition = (negativePercent / 100) * 40 + 60; // Center of last third
    moodLabel = "حزين";
    background = "#EA384C";
  }

  return (
    <div className={cn("w-full  mx-auto px-4", className)}>
      <div className="relative pt-1">
        {/* Labels */}
        {/* <div className="flex justify-between mb-2 text-sm font-medium">
          <span className="text-[#ea384c]">حزين {negativePercent}%</span>
          <span className="text-[#8E9196]">عادي {neutralPercent}%</span>
          <span className="text-[#8B5CF6]">سعيد {positivePercent}%</span>
        </div> */}

        {/* Slider Container */}
        <div dir="ltr" className="relative">
          {/* Three Equal Width Bars */}
          <div className="h-3 rounded-full overflow-hidden flex">
            <div className="w-[40%] bg-[#ea384c]"></div>
            <div className="w-[20%] bg-yellow-400"></div>
            <div className="w-[40%] bg-green-400"></div>
          </div>

          {/* Marker */}
          <div
            className="absolute top-1/2 w-4 h-4 bg-white rounded-full shadow-xl transform -translate-y-1/2 transition-transform"
            style={{ left: `${markerPosition}%` }}
          >
            {/* Value Indicator */}
            <div className="absolute flex flex-col items-center -top-14 left-1/2 transform -translate-x-1/2">
              <p
                dir="rtl"
                className=" flex gap-1 justify-center px-1 w-20 py-1 rounded shadow text-sm text-white font-semibold"
                style={{ background }}
              >
                <span className={`${moodLabel == "عادي" && "npn"}`}>
                  {moodLabel != "عادي" && `${maxValue}%`}
                </span>
                <span className="text-sm">{moodLabel}</span>
              </p>
              <div className="h-4 w-0.5 bg-gray-300 mt-1" />
            </div>
          </div>
        </div>

        {/* Percentage Indicators */}
        <div className="flex justify-between mt-4 text-xs text-gray-500">
          <div className="w-1/3 text-center">
            <div className="h-1 w-4 bg-green-400 mx-auto mb-1 rounded" />
            {positivePercent}%
          </div>
          <div className="w-1/3 text-center">
            <div className="h-1 w-4 bg-yellow-400 mx-auto mb-1 rounded" />
            {neutralPercent}%
          </div>
          <div className="w-1/3 text-center">
            <div className="h-1 w-4 bg-[#ea384c] mx-auto mb-1 rounded" />
            {negativePercent}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodSlider;
