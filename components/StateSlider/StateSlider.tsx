// import React from "react";
// import { MyStateSlider } from "../index";
// import useSpeachStore from "../../lib/store";
// import { StateSliderProps } from "../../types";

// const StateSlider: React.FC<StateSliderProps> = () => {
//   const SpeachData = useSpeachStore((state) => state.SpeachData);

//   // const confidenceScores = SpeachData?.confidenceScores || { happy: 0 };
//   // const maxValue = Math.max(...Object.values(confidenceScores).map(Number));
//   // let value = { value: 0, mood: "negative" };
//   // if (SpeachData?.confidenceScores) {
//   //   if (SpeachData?.confidenceScores.negative > 0.5) {
//   //     value = { value: SpeachData?.confidenceScores.negative, mood: "غاضب" };
//   //   } else if (SpeachData?.confidenceScores.positive > 0.5) {
//   //     value = { value: SpeachData?.confidenceScores.positive, mood: "سعيد" };
//   //   } else {
//   //     value = { value: 0.5, mood: "عادي" };
//   //   }
//   // }
//   // let value = 0;

//   // const sentimentKey = SpeachData.sentiment as keyof ConfidenceScores;
//   // value = SpeachData.confidenceScores[sentimentKey];
//   // let value2 = 0;
//   // if (sentimentKey == "positive") value2 = (value * 100) / 2 + 50;
//   // if (sentimentKey == "negative") value2 = (value * 100) / 2;
//   // if (sentimentKey == "neutral") value2 = 50;
//   return (
//     <div className="pb-3 pt-1  bg-white rounded-xl shadow-lg p-6 py-2 my-0">
//       <form>
//         <div className=" flex flex-col items-center justify-center  ">
//           <div className="w-full ">
//             <div className=" ">
//               <div
//                 dir="ltr"
//                 className="flex mb-14 justify-between items-center"
//               >
//                 <h2 className="text-xl flex items-center gap-1 text-right  text-green-500">
//                   {/* <span className="text-black text-lg pt-1">{value2}%</span>
//                   <span>{sentimentKey}</span> */}
//                 </h2>
//                 <h2 className="text-base pt-1 font-bold text-right  text-blue-600">
//                   حالة العميل
//                 </h2>
//               </div>
//               {/* <MoodSlider
//                 // value={value2}
//                 moodData={SpeachData.confidenceScores}
//                 // onChange={setMoodValue}
//                 className="mb-1"
//               /> */}
//               <MyStateSlider moodData={SpeachData.confidenceScores} />
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default StateSlider;
