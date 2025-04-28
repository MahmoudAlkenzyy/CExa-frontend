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
    <div className="flex flex-col bg-[#E7EEFF]">
      {/* Header */}
      {/* Main Content */}
      <div className="flex  flex-col containerr min-h-[100dvh]     md:w-full  mx-auto  mt-2  gap-2 px-4">
        {/* First part - Products */}
        <div className="w-full gap-5 h-[40%] flex flex-wrap  ">
          <div className="w-full md:w-[48%] bg-white rounded-xl flex items-center justify-center">
            <CallRating />
          </div>

          <div className=" w-full h-full md:w-[48%] ">
            <MoodeRecomendtion />
          </div>
        </div>

        {/* secound part - Products */}

        <div className="flex-grow w-full gap-5 flex flex-col md:flex-row">
          <div className="md:w-[48%] flex flex-col md:flex-row rounded-xl flex-grow">
            <div className="w-full md:w-[35%] h-full">
              <CustomerInfo />
            </div>
            <div className="w-full md:w-[65%] flex flex-col justify-between h-full">
              <div className="flex-1 h-full">
                <ChatBox />
              </div>
              <div className="flex flex-col mt-2">
                <ModeState />
                <AudioRecorderPage />
              </div>
            </div>
          </div>

          <div className="md:w-[48%]">
            <ProductRecommendations />
          </div>
        </div>

        {/* <div className=" md:h-full col-span-12 md:col-span-7 items">
          <div className="pb-3 sticky z-10 max-h- top-14">
            <VoiceRecognition client={client} setClient={setClient} />
          </div>
          <MainContent sent={client[client.length - 1]} />
          <div className="h-[32%]   ">
            <ChatBox client={client} />
            <AudioRecorderPage />
          </div>
        </div>
        <div className=" col-span-12 h-full  md:col-span-5   flex flex-col">
          <MainLeftSidebar rec={client[client.length - 1]} />
          <MainRightSidebar />
        </div> */}
        {/* Main Content Area */}
      </div>
    </div>
  );
}
