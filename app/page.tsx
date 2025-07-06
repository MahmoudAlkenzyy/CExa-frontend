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
// import VoiceBotton from "../components/Test";

export default function Home() {
  return (
    <div className="flex flex-col bg-[#E7EEFF] containerr overflow-hidden">
     
      <div className="flex  flex-col containerr min-h-[99dvh]     md:w-full  mx-auto pt-[15px]   gap-2 px-4">
        <div className="w-full gap-5 h-[40%] flex flex-wrap  ">
          <div className="w-full md:w-[48%] bg-white rounded-xl flex items-center justify-center">
            <CallRating />
          </div>

          <div className=" w-full h-full md:w-[48%] ">
            <MoodeRecomendtion />
          </div>
        </div>


        <div className="flex-grow w-full gap-5 flex flex-col md:flex-row ">
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
      </div>
    </div>
  );
}
