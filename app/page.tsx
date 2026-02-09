"use client";
import "@radix-ui/themes/styles.css";
import {
  ChatBox,
  MoodeRecomendtion,
  //MainLeftSidebar,
  ProductRecommendations,
  AudioRecorderPage,
  ModeState,
  CustomerInfo,
  CallRating,
} from "../components";
import TextToSpeach from "../components/TextToSpeach/TextToSpeach";
import VoiceWaves from "../components/VoiceWaves/VoiceWaves";
import { SuccessfulyRate } from "../components/SuccessfulyRate/SuccessfulyRate";
import useSpeachStore from "../lib/store";

export default function Home() {
  const { language } = useSpeachStore();

  return (
    <div
      dir={language === "ar" ? "ltr" : "rtl"}
      className="flex flex-col containerr overflow-hidden relative z-10 gap-1 h-[calc(100dvh-72px)]"
    >
      <div
        className={`w-full flex grow ${language === "ar" ? "flex-row" : "flex-row"}`}
      >
        <div className=" w-1/5  items-center justify-between bg flex flex-col m-2 rounded-3xl gap-2 p-4 border-[#1B3E90] border-2 bg-[#0] ">
          <CallRating />
          <CustomerInfo />
        </div>
        <div className=" w-2/5 border-[#1B3E90] border-2 flex flex-col gap-3 rounded-3xl p-4 m-2 ">
          <div className="border-[#1B3E9099]  border-[1px] rounded-3xl p-2 grow">
            <VoiceWaves />
            <ChatBox />
          </div>
          <div className="border-[#1B3E9099]  border-[1px] rounded-3xl p-2">
            <MoodeRecomendtion />
          </div>
        </div>
        <div className=" w-2/5  border-[#1B3E90] border-2 flex flex-col gap-3 rounded-3xl p-4 m-2 ">
          <SuccessfulyRate />
          <ProductRecommendations />
        </div>
      </div>
      <div className=" bg-gradient-to-tr mx-2 from-[#0d1d41] via-[#1B3E90] to-[#0d1d41] p-[1px] rounded-3xl mb-2">
        <div className="m-[1px] rounded-3xl bg-[#090b1ac7]">
          <AudioRecorderPage />
        </div>
      </div>
      <TextToSpeach />

      {/**
 * 
 * 
 * 
 * 








 
 */}
      {/* <div className="flex  flex-col containerr min-h-[99dvh]     md:w-full  mx-auto pt-[15px]   gap-2 px-4">
        <div className="w-full gap-5 h-[40%] flex flex-wrap  ">
          <div className="w-full md:w-[48%] bg-white rounded-xl flex items-center justify-center">
            <CallRating />
          </div>

          <div className=" w-full h-full md:w-[48%] ">
            <MoodeRecomendtion />
          </div>
        </div>

        <div className="flex-grow w-full gap-5 flex flex-col md:flex-row   ">
          <div className="md:w-[48%] flex flex-col md:flex-row rounded-xl gap-2   ">
            <div className="w-full md:w-[35%] h-full">
              <CustomerInfo />
            </div>
            <div className="w-full md:w-[65%] flex flex-col justify-between h-full">
              <div className="flex-1 h-full ">
                <ChatBox />
              </div>
              <div className="flex flex-col mt-2">
                <ModeState />
                <AudioRecorderPage />
              </div>
            </div>
          </div>

          <div className="md:w-[48%] ">
            <ProductRecommendations />
          </div>
        </div>
      </div> */}
    </div>
  );
}
