import React from "react";
import useSpeachStore from "../../lib/store";
import { PiWaveform } from "react-icons/pi";
import { FaFaceLaugh, FaFaceMeh } from "react-icons/fa6";
const ModeState = () => {
  const {
    SpeachData,
    // positivePercent,
    // neutralPercent,
    // negativePercent,
    // markerPosition,
    moodLabel,
    background,
  } = useSpeachStore((state) => state);
  return (
    <div className="bg-[#C4C4C459] rounded-xl shadow-sm">
      <div className="flex justify-center items-center gap-6 py-3 rounded-t-xl">
        <PiWaveform size={40} style={{ color: background }} />

        <div className="text-center flex flex-col items-center gap-1">
          {moodLabel === "سعيد" ? (
            <FaFaceLaugh style={{ color: background }} size={35} />
          ) : (
            <FaFaceMeh style={{ color: background }} size={35} />
          )}
          <span className="text-lg font-medium text-gray-800">{SpeachData.confidenceScores}%</span>
        </div>

        <PiWaveform
          className="rotate-180"
          size={40}
          style={{ color: background }}
        />
      </div>

      {/* <p className="text-center text-gray-700 font-semibold pb-2">أحمد ناصر</p> */}
    </div>
  );
};

export default ModeState;
