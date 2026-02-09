// import React, { useCallback, useEffect, useState } from "react";

// import { FaFaceMeh } from "react-icons/fa6";
// import {
//   TextAnalyticsClient,
//   AzureKeyCredential,
// } from "@azure/ai-text-analytics";
// import { IoMdHappy } from "react-icons/io";
// import { FaRegAngry } from "react-icons/fa";

// import { StateSlider } from "../index";
// import useSpeachStore from "../../lib/store";
// import { SpeachData } from "../../types";
// import { Card } from "@radix-ui/themes";
// const MainContent: React.FC<{ sent: string }> = ({ sent }) => {
//   // const [inputText, setInputText] = useState<string>("");
//   const [sentiment, setSentiment] = useState<string>("neutral");
//   const [moodValue, setMoodValue] = useState(70);

//   const updatData = useSpeachStore((state) => state.updateData);
//   const { positivePercent, SpeachData } = useSpeachStore((state) => state);
// SpeachDataز
//   const analyzeSentiment = useCallback(async () => {
//     const endpoint =
//       "https://realtimesentimentanalysis55.cognitiveservices.azure.com";
//     const apiKey = process.env.NEXT_PUBLIC_AZURE_SUBSCRIPTION_SENTMINT_TEXT!;
//     const client = new TextAnalyticsClient(
//       endpoint,
//       new AzureKeyCredential(apiKey)
//     );

//     const documents = [sent];
//     const results = (await client.analyzeSentiment(documents)) as SpeachData[];
//     console.log({ sentiment: results[0] });
//     // console.log(results, "ssssss");
//     setSentiment(results[0].sentiment);
//     updatData(results[0]);
//     // console.log({ SpeachData: results[0] });

//     // results.forEach((document) => {
//     //   setSentiment(
//     //     `Sentiment: ${
//     //       document.sentiment
//     //     }, Confidence Scores: Positive=${document.confidenceScores.positive.toFixed(
//     //       2
//     //     )}, Neutral=${document.confidenceScores.neutral.toFixed(
//     //       2
//     //     )}, Negative=${document.confidenceScores.negative.toFixed(2)}`
//     //   );
//     // });
//   }, [sent, updatData]);
//   useEffect(() => {
//     if (sent) analyzeSentiment();
//   }, [sent, analyzeSentiment]);
//   // console.log({ sent });
//   let message = "";

//   if (sentiment == "positive") {
//     // الشعور الإيجابي أعلى بكثير
//     if (positivePercent <= 25) {
//       message =
//         "نأسف جدًا لأن تجربتك لم تكن بالمستوى المطلوب. نود أن نفهم أكثر ما حدث لنتمكن من تحسين خدمتنا وتقديم الحل المناسب لك.";
//     } else if (positivePercent <= 50) {
//       message =
//         "نقدّر ملاحظاتك ونأسف لأي إزعاج. نعمل دائمًا على تحسين خدماتنا، وسنسعى لمعالجة أي مشكلات تواجهها لضمان رضاك.";
//     } else {
//       message =
//         "نأسف جدًا لأن تجربتك لم تكن بالمستوى المطلوب. نود أن نفهم أكثر ما حدث لنتمكن من تحسين خدمتنا وتقديم الحل المناسب لك.";
//     }
//   } else if (sentiment == "negative") {
//     // الشعور السلبي أعلى بكثير
//     if (negativePercent <= 25) {
//       message =
//         "شكرًا على ملاحظتك، ونأسف لأي إزعاج شعرت به. نحن هنا لدعمك وسنحرص على تحسين تجربتك مستقبلاً.";
//     } else if (negativePercent <= 50) {
//       message =
//         "نتفهم تمامًا سبب انزعاجك، ونأسف لأي إزعاج سبّبناه لك. نحن هنا لحل المشكلة وسنبذل قصارى جهدنا لجعل الأمور أفضل.";
//     } else {
//       message =
//         "نقدّر ملاحظاتك جدًا، وهدفنا دائمًا تحسين تجربتك. سنعمل على معالجة أي مشكلة واجهتها لضمان رضاك التام.";
//     }
//   } else {
//     // المشاعر متقاربة (متوازنة بين الإيجابي والسلبي)
//     message = " اقدر اساعدك ازاي ";
//   }
//   console.log({ message });

//   return (
//     <div dir="rtl" className="h-1/2">
//       <StateSlider moodValue={moodValue} setMoodValue={setMoodValue} />
//       {/* <MyStateSlider /> */}
//       <Card className="!py-1 mb- mt-2 h-1/2 bg-white">
//         <div className="text-gray-600 mb-1  mt-2 border-[#E5212121] px-[8px] py-[10px] min-h-[190] border rounded-lg border-solid">
//           <h2 className="font- mb-2 px-4 text-[#1B3E90] rounded-xl py-2 bg-[#4F45B617]">
//             توصيات بناء على حالة العميل
//           </h2>
//           <div
//             className={` ${sentiment == "negative" && "bg-red-50"}
//                ${sentiment == "positive" && "bg-green-50"}
//                ${
//                  sentiment == "neutral" && "bg-yellow-50"
//                }  p-2 rounded-lg mb-2`}
//           >
//             <p
//               className={`

//                ${sentiment == "negative" && "text-red-600"}
//                ${sentiment == "positive" && "text-green-600"}
//                ${sentiment == "neutral" && "text-yellow-600"}
//               flex items-center gap-1 `}
//             >
//               {sentiment == "positive" && <IoMdHappy size={20} />}
//               {sentiment == "neutral" && <FaFaceMeh size={20} />}
//               {sentiment == "negative" && <FaRegAngry size={20} />}
//               {sentiment}
//             </p>
//           </div>
//           <p className=" h-20">
//             {/* {sentiment == "positive" &&
//               positivePercent <= 25 &&
//               "نأسف جدًا لأن تجربتك لم تكن بالمستوى المطلوب. نود أن نفهم أكثر ما حدث لنتمكن من تحسين خدمتنا وتقديم الحل المناسب لك."}
//             {sentiment == "positive" &&
//               positivePercent > 25 &&
//               positivePercent <= 50 &&
//               "نقدّر ملاحظاتك ونأسف لأي إزعاج. نعمل دائمًا على تحسين خدماتنا، وسنسعى لمعالجة أي مشكلات تواجهها لضمان رضاك."}
//             {sentiment == "positive" &&
//               positivePercent > 50 &&
//               positivePercent <= 75 &&
//               "نأسف جدًا لأن تجربتك لم تكن بالمستوى المطلوب. نود أن نفهم أكثر ما حدث لنتمكن من تحسين خدمتنا وتقديم الحل المناسب لك."}
//             {sentiment == "positive" &&
//               positivePercent < 75 &&
//               "نأسف جدًا لأن تجربتك لم تكن بالمستوى المطلوب. نود أن نفهم أكثر ما حدث لنتمكن من تحسين خدمتنا وتقديم الحل المناسب لك."}
//             {sentiment == "neutral" && " اقدر اساعدك ازاي "}
//             {sentiment == "negative" &&
//               "نا متفهم تمامًا استياء حضرتك وبنعتذر عن أي مشكلة حصلت، وأوعدك إننا هنتعامل مع الموضوع فورًا لضمان رضاك الكامل إحنا هنا عشان نتأكد إن المشكلة تتحل بشكل يرضيك تمامًا"}
//           */}

//             {}
//           </p>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default MainContent;
