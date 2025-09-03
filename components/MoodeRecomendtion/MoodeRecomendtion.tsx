"use client";
import React, { useEffect, useRef } from "react";

import { FaFaceMeh } from "react-icons/fa6";
import { IoMdHappy } from "react-icons/io";
import { FaRegAngry } from "react-icons/fa";

import useSpeachStore from "../../lib/store";
import { Card } from "@radix-ui/themes";
import { sendInitData } from "../../app/test/page";
import { RandomId } from "../../constant";
const MoodeRecomendtion: React.FC = () => {
  const updatData = useSpeachStore((state) => state.updateData);
  const sentimentSocket = useRef<WebSocket | null>(null);
  const client = useSpeachStore((state) => state.client);
  //   const sent = client[client.length - 1];
  const { SpeachData } = useSpeachStore((state) => state);
  const SENTIMENT_WS_URL = "https://cexa-v2.eastus.cloudapp.azure.com:5004";

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

  return (
    <div dir="rtl" className=" h-full ">
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

          <p className=" h-[30%] min-h-10    ">
            {SpeachData.moodRecomendtion ||
              "لا توجد توصيات متاحة في الوقت الحالي."}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default MoodeRecomendtion;
