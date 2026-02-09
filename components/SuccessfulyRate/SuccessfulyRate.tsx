import useSpeachStore from "../../lib/store";

export const SuccessfulyRate = () => {
  const { SpeachData, language } = useSpeachStore((state) => state);

  return (
    <div className="flex flex-col justify-center items-center border-[#1B3E9099] border-[1px] rounded-3xl p-4 m-2 ">
      <p className="text-white text-xl font-bold text-center pb-4">
        {language === "ar" ? "نسبة نجاح المكالمة" : "Call Success Rate"}
      </p>
      <div className="border-[5px] shadow-[0_0_10px_#3788E5] border-[#3788E5]  rounded-full p-4">
        <p className="text-white flex flex-col justify-center items-center text-xl font-bold text-center   border-[3px] shadow-[0_0_10px_#3788E5] border-[#3788E5] h-[120px] w-[120px] rounded-full p-4">
          <span className="bg-gradient-to-b from-[#1B3E90] to-[#7592D7] inline-block text-transparent bg-clip-text">
            {SpeachData.confidenceScores + "%"}
          </span>
          <span className="text-[15px]">
            {language === "ar" ? "نسبة النجاح" : "Success Rate"}
          </span>
        </p>
      </div>
    </div>
  );
};
