"use client";
import React, { useEffect, useRef } from "react";

import { FaFaceMeh, FaRegFaceAngry } from "react-icons/fa6";
import { IoMdHappy } from "react-icons/io";

import useSpeachStore from "../../lib/store";
import { sendInitData } from "../../app/test/page";
import { RandomId } from "../../constant";

const MoodeRecomendtion: React.FC = () => {
  const updatData = useSpeachStore((state) => state.updateData);
  const sentimentSocket = useRef<WebSocket | null>(null);
  const { SpeachData, language } = useSpeachStore((state) => state);
  const SENTIMENT_WS_URL = "https://cexa-v2.westus.cloudapp.azure.com:5004";

  useEffect(() => {
    const sentiment = new WebSocket(SENTIMENT_WS_URL);

    sentiment.onmessage = (event) => {
      const sentimentText = event.data;
      const jsonStr = sentimentText.replace(/'/g, '"');
      const obj = JSON.parse(jsonStr);

      console.log(obj.Sentiment, obj.Sentiment, obj.Sentiment);
      updatData({
        sentiment: obj.Sentiment,
        confidenceScores: obj.Confidence,
        moodRecomendtion: obj.Recommendation,
      });
    };

    sentimentSocket.current = sentiment;
    (async () => {
      sendInitData(sentiment, RandomId);
    })();

    return () => {
      sentiment.close();
    };
  }, []);

  console.log({ SpeachData });

  return (
    <div dir={language === "ar" ? "rtl" : "ltr"} className=" h-full ">
      <div className="!py-2 mb- h-full  bg-transparent text-xs">
        <div className="text-gray-600 mb-1 h-full   px-[8px] py-[10px]   rounded-lg ">
          <p className="text-[20px] text-white mb-3">
            {language === "ar"
              ? "توصيات بناء على حالة العميل"
              : "Sentiment-based Recommendations"}
          </p>

          <div className="flex ">
            <div className="bg-[#1B3E90] shadow-[0_0_10px_#1B3E90] relative text-white grow rounded-3xl px-4 py-2 text-[16px] ">
              <p>
                {SpeachData.moodRecomendtion ||
                  (language === "ar"
                    ? "لا توجد توصيات متاحة في الوقت الحالي."
                    : "No recommendations available at the moment.")}
              </p>
              <div
                className="absolute right-6 bottom-0 translate-y-full"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "10px solid transparent",
                  borderRight: "1px solid transparent",
                  borderTop: "10px solid #1B3e90",
                }}
              ></div>
            </div>
            <div className="flex flex-col">
              <div
                className={`text-white flex items-center flex-col gap-6  p-2`}
              >
                <span className="">
                  {SpeachData.sentiment === "Positive" && (
                    <IoMdHappy size={20} className="text-current" />
                  )}
                  {SpeachData.sentiment === "Neutral" && (
                    <FaFaceMeh size={20} className="text-current" />
                  )}
                  {SpeachData.sentiment === "Negative" && (
                    <FaRegFaceAngry size={20} className="text-current" />
                  )}
                </span>
                {SpeachData.sentiment === "Positive" &&
                  (language === "ar" ? "ايجابي" : "Positive")}
                {SpeachData.sentiment === "Neutral" &&
                  (language === "ar" ? "متوسط" : "Neutral")}
                {SpeachData.sentiment === "Negative" &&
                  (language === "ar" ? "سلبي" : "Negative")}
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodeRecomendtion;
