import React from "react";
import useSpeachStore from "../../lib/store";
import { PiWaveform } from "react-icons/pi";
import { FaFaceLaugh, FaFaceMeh } from "react-icons/fa6";
const ModeState = () => {
  const {
    maxValue,
    // positivePercent,
    // neutralPercent,
    // negativePercent,
    // markerPosition,
    moodLabel,
    background,
  } = useSpeachStore((state) => state);
  return (
    <div className="bg-[#C4C4C459]">
          
    <div className="flex justify-center items-center gap-3  py-5 pb-2 rounded-t-xl">
          <PiWaveform size={60}  style={{ color: background }} />
              <div className="text-center flex flex-col gap-2">
                  
                  {
                      moodLabel=="سعيد"?<FaFaceLaugh style={{ color: background }} size={45} />:
                      <FaFaceMeh  style={{ color: background }} size={45} />
                  }
                  <span>
                      
                  {maxValue}%
                  </span>
          </div>
      <PiWaveform className="rotate-180" size={60} style={{ color: background }} />
          </div>
          <p className="text-center flex justify-center pb-3 font-semibold"> <span>   أحمد ناصر</span></p>
    </div>
  );
};

export default ModeState;
