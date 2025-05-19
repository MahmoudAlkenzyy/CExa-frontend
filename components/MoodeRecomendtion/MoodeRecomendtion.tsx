"use client";
import React, { useCallback, useEffect } from "react";

import { FaFaceMeh } from "react-icons/fa6";
// import {
//   TextAnalyticsClient,
//   AzureKeyCredential,
// } from "@azure/ai-text-analytics";
import { IoMdHappy } from "react-icons/io";
import { FaRegAngry } from "react-icons/fa";

import useSpeachStore from "../../lib/store";
// import { SpeachData } from "../../types";
import { Card } from "@radix-ui/themes";
const MoodeRecomendtion: React.FC = () => {
  // const [inputText, setInputText] = useState<string>("");
//   const [sentiment, setSentiment] = useState<string>("neutral");

  const updatData = useSpeachStore((state) => state.updateData);
  const client = useSpeachStore((state) => state.client);
  const sent = client[client.length - 1];
  const {  SpeachData} = useSpeachStore((state) => state);

  const analyzeSentiment = useCallback(async () => {
    // const endpoint =
    //   "https://realtimesentimentanalysis55.cognitiveservices.azure.com";
    // const apiKey = process.env.NEXT_PUBLIC_AZURE_SUBSCRIPTION_SENTMINT_TEXT!;
    // const client = new TextAnalyticsClient(
    //   endpoint, 
    //   new AzureKeyCredential(apiKey)
    // );

    // const documents = [sent.message];
    // const results = (await client.analyzeSentiment(documents)) as SpeachData[];
    // console.log({results});
    
    // setSentiment(results[0].sentiment);
    // updatData(results[0]);
    // console.log({ SpeachData: results[0] });

    // results.forEach((document) => {
    //   setSentiment(
    //     `Sentiment: ${
    //       document.sentiment
    //     }, Confidence Scores: Positive=${document.confidenceScores.positive.toFixed(
    //       2
    //     )}, Neutral=${document.confidenceScores.neutral.toFixed(
    //       2
    //     )}, Negative=${document.confidenceScores.negative.toFixed(2)}`
    //   );
    // });
    
        try {
          const lastItemText = sent.message || "";
        
          const res = await fetch("https://4.227.187.182:5004/sentiment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
             user_transcription: lastItemText,
            }),
          });
    
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
    
          const json = await res.json();
    // console.log({json});
    updatData({sentiment:json.Sentiment,confidenceScores:json.Confidence});
          // More defensive update
        //   setItems((prev) => {
        //     if (prev.length === 0) return prev; // Handle case where items were cleared
    
        //     return prev.map((item, index) =>
        //       index === prev.length - 1
        //         ? { ...item, title: json.title || json.summary || json.response }
        //         : item
        //     );
        //   });
    
        //   console.log("Title updated successfully:", json);
        } catch (error) {
          console.error("Error fetching title:", error);
          // Optional: Set error state or show user notification
        }
     
    
  }, [sent,updatData]);
  useEffect(() => {

    if (sent && sent.isclient) analyzeSentiment();
  }, [sent, analyzeSentiment]);
  // console.log({ sent });
//   let message = "";

//   if (sentiment == "positive") {
//     // الشعور الإيجابي أعلى بكثير
//     if ( <= 25) {
//       message =
//         "نأسف جدًا لأن تجربتك لم تكن بالمستوى المطلوب. نود أن نفهم أكثر ما حدث لنتمكن من تحسين خدمتنا وتقديم الحل المناسب لك.";
//     } else if ( <= 50) {
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
  // console.log({ message });
console.log({SpeachData})
  return (
    <div dir="rtl" className=" h-full ">
      {/* <MyStateSlider /> */}
      <Card className="!py-2 mb- h-full  bg-white text-xs">
        <div className="text-gray-600 mb-1 h-full   border-[#E5212121] px-[8px] py-[10px]  border rounded-lg border-solid">
          <h2 className=" mb-2 px-4 text-white rounded py-2 bg-[#1B3E90] flex justify-between">
            <span>توصيات بناء على حالة العميل</span>
            <p
              className={`

               ${SpeachData.sentiment == "negative" && "text-red-600"} 
               ${SpeachData.sentiment == "positive" && "text-green-600"} 
               ${SpeachData.sentiment == "neutral" && "text-yellow-600"} 
              flex items-center gap-1 `}
            >
              {SpeachData.sentiment == "positive" && <IoMdHappy size={16} />}
              {SpeachData.sentiment == "neutral" && <FaFaceMeh size={16} />}
              {SpeachData.sentiment == "negative" && <FaRegAngry size={16} />}
              {SpeachData.sentiment}
            </p>
          </h2>
          {/* <div
            className={` ${sentiment == "negative" && "bg-red-50"} 
               ${sentiment == "positive" && "bg-green-50"} 
               ${
                 sentiment == "neutral" && "bg-yellow-50"
               }  p-2 rounded-lg mb-2`}
          >
        
          </div> */}
          <p className=" h-[30%] min-h-10    ">
            {SpeachData.sentiment == "positive" &&
              SpeachData.confidenceScores <= 25 &&
              "نأسف جدًا لأن تجربتك لم تكن بالمستوى المطلوب. نود أن نفهم أكثر ما حدث لنتمكن من تحسين خدمتنا وتقديم الحل المناسب لك."}
            {SpeachData.sentiment == "positive" &&
              SpeachData.confidenceScores > 25 &&
              SpeachData.confidenceScores <= 50 &&
              "نقدّر ملاحظاتك ونأسف لأي إزعاج. نعمل دائمًا على تحسين خدماتنا، وسنسعى لمعالجة أي مشكلات تواجهها لضمان رضاك."}
            {SpeachData.sentiment == "positive" &&
              SpeachData.confidenceScores > 50 &&
              SpeachData.confidenceScores <= 75 &&
              "نأسف جدًا لأن تجربتك لم تكن بالمستوى المطلوب. نود أن نفهم أكثر ما حدث لنتمكن من تحسين خدمتنا وتقديم الحل المناسب لك."}
            {SpeachData.sentiment == "positive" &&
              SpeachData.confidenceScores < 75 &&
              "نأسف جدًا لأن تجربتك لم تكن بالمستوى المطلوب. نود أن نفهم أكثر ما حدث لنتمكن من تحسين خدمتنا وتقديم الحل المناسب لك."}
            {SpeachData.sentiment == "neutral" && " اقدر اساعدك ازاي "}
            {SpeachData.sentiment == "negative" &&
              "نا متفهم تمامًا استياء حضرتك وبنعتذر عن أي مشكلة حصلت، وأوعدك إننا هنتعامل مع الموضوع فورًا لضمان رضاك الكامل إحنا هنا عشان نتأكد إن المشكلة تتحل بشكل يرضيك تمامًا"}

            {}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default MoodeRecomendtion;
