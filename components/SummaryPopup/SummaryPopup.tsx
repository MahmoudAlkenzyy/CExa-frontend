"use client";

import { useEffect, useState } from "react";

export const SummaryPopup = ({
  showSummary,
  setShowSummary,
  language,
  summaryData,
  sessionId,
}: {
  showSummary: boolean;
  setShowSummary: React.Dispatch<React.SetStateAction<boolean>>;
  language: string;
  summaryData: any;
  sessionId: string;
}) => {
  const [Data, setData] = useState<{
    Agent_Evaluation_Rate: string;
    Agent_Handling: string;
    Customer_Issue: string;
    Customer_Reaction: string;
    Customer_Satisfaction_Rate: string;
    Is_Issue_Resolved: string;
    Service_Evaluation_Rate: string;
  }>({
    Agent_Evaluation_Rate: "",
    Agent_Handling: "",
    Customer_Issue: "",
    Customer_Reaction: "",
    Customer_Satisfaction_Rate: "",
    Is_Issue_Resolved: "",
    Service_Evaluation_Rate: "",
  });
  const [loading, setLoading] = useState(true);
  const fetchSummary = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://cexa-v2.westus.cloudapp.azure.com:5003/conversation-summary",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client_id: sessionId,
          }),
        },
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching summary:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showSummary) {
      setLoading(true);
      setTimeout(() => fetchSummary(), 4000);
    }
  }, [showSummary]);
  return (
    <div className="">
      {showSummary && (
        <div className="fixed inset-0  z-[100] flex items-center justify-center bg-[black/70] backdrop-blur-sm ">
          <div className="bg-[#050711] relative border border-[#1B3E90] p-8 rounded-3xl  overflow-hidden translate-y-5 max-w-4xl w-full mx-4 text-white text-center">
            <h3 className="text-2xl relative z-10  mb-4 border-[#1B3E90] border rounded-xl  p-2">
              {language === "ar" ? "تقييم المكالمة" : "Call Evaluation"}
            </h3>

            {loading ? (
              <div className="relative z-10 py-20 flex flex-col items-center justify-center gap-6">
                <div className="w-16 h-16 border-4 border-[#1B3E90] border-t-[#3788E5] rounded-full animate-spin shadow-[0_0_15px_#3788E5]"></div>
                <p className="text-xl text-[#3788E5] animate-pulse">
                  {language === "ar"
                    ? "جاري معالجة البيانات..."
                    : "Processing call data..."}
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-4 flex relative z-10  items-end gap-3 mb-6 text-sm text-gray-300">
                  {/* <p>
                {summaryData?.message ||
                  (language === "ar"
                    ? "جاري معالجة البيانات..."
                    : "Processing data...")}
              </p> */}
                  {/* Add more fields from summaryData if needed */}
                  <div className="flex items-center flex-col px-10 justify-center p-7 py-3 w-full text-white   rounded-2xl border border-[#1B3E9080]">
                    <div
                      dir={language === "ar" ? "rtl" : "ltr"}
                      className="w-full"
                    >
                      <p className=" text-[18px] text-start p-2  mb-3">
                        {language === "ar"
                          ? "تقييم الخدمة"
                          : "Service Evaluation"}
                      </p>
                      <div className="flex items-center gap-1 my- text-[16px]">
                        <span className="block w-4 h-4 blur-[1px] bg-[#3788E5] rounded-full" />{" "}
                        <p className="flex items-center justify-between gap-1 my-2 w-full">
                          <span>
                            {language === "ar"
                              ? "اداء جيد"
                              : "Good Performance"}
                          </span>
                          <span>100</span>
                        </p>
                      </div>
                      <div className="flex items-center  gap-1 my-2 ">
                        <span className="block w-4 h-4 blur-[1px] bg-[#75C64B] rounded-full" />{" "}
                        <p className="flex items-center justify-between gap-1 my-2 w-full">
                          <span>
                            {language === "ar" ? "اداء سيء" : "Bad Performance"}
                          </span>
                          <span className="text-[#75C64B]">40</span>
                        </p>
                      </div>
                    </div>{" "}
                    <div className="relative flex justify-center">
                      <div className="relative w-[130px] h-[130px]">
                        <svg
                          viewBox="0 0 162 162"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-full h-full rounded-full"
                        >
                          <g filter="url(#filter0_d_2010_123)">
                            <mask id="path-1-inside-1_2010_123" fill="white">
                              <path d="M77.4386 9.06788C90.5276 8.49733 103.522 11.5313 115.005 17.8391C126.488 24.1468 136.019 33.4861 142.558 44.8388C149.098 56.1914 152.395 69.1216 152.09 82.2194C151.785 95.3173 147.89 108.08 140.83 119.116L130.93 112.783C136.831 103.559 140.086 92.8927 140.341 81.946C140.596 70.9993 137.84 60.1928 132.375 50.7047C126.909 41.2166 118.944 33.4112 109.347 28.1394C99.7498 22.8677 88.8896 20.332 77.9504 20.8088L77.4386 9.06788Z" />
                            </mask>
                            <path
                              d="M77.4386 9.06788C90.5276 8.49733 103.522 11.5313 115.005 17.8391C126.488 24.1468 136.019 33.4861 142.558 44.8388C149.098 56.1914 152.395 69.1216 152.09 82.2194C151.785 95.3173 147.89 108.08 140.83 119.116L130.93 112.783C136.831 103.559 140.086 92.8927 140.341 81.946C140.596 70.9993 137.84 60.1928 132.375 50.7047C126.909 41.2166 118.944 33.4112 109.347 28.1394C99.7498 22.8677 88.8896 20.332 77.9504 20.8088L77.4386 9.06788Z"
                              stroke="#75C64B"
                              stroke-width="30"
                              shape-rendering="crispEdges"
                              mask="url(#path-1-inside-1_2010_123)"
                            />
                          </g>
                          <g filter="url(#filter1_d_2010_123)">
                            <mask id="path-2-inside-2_2010_123" fill="white">
                              <path d="M141.914 117.366C135.559 127.959 126.57 136.726 115.822 142.815C105.073 148.903 92.9317 152.105 80.5786 152.109C68.2255 152.113 56.0817 148.919 45.3292 142.838C34.5766 136.757 25.5816 127.995 19.2195 117.407C12.8574 106.818 9.34502 94.7623 9.02414 82.4133C8.70327 70.0644 11.5849 57.8427 17.3884 46.9378C23.192 36.0328 31.7199 26.8161 42.1421 20.1846C52.5644 13.5531 64.5259 9.73273 76.8625 9.09532L77.4689 20.8318C67.1584 21.3645 57.1615 24.5574 48.451 30.0997C39.7405 35.6421 32.6132 43.3451 27.7628 52.459C22.9124 61.5729 20.5041 71.7873 20.7723 82.1081C21.0405 92.4288 23.976 102.504 29.2932 111.354C34.6103 120.204 42.128 127.526 51.1146 132.609C60.1011 137.691 70.2504 140.361 80.5747 140.357C90.8989 140.354 101.046 137.678 110.03 132.589C119.013 127.501 126.526 120.173 131.837 111.32L141.914 117.366Z" />
                            </mask>
                            <path
                              d="M141.914 117.366C135.559 127.959 126.57 136.726 115.822 142.815C105.073 148.903 92.9317 152.105 80.5786 152.109C68.2255 152.113 56.0817 148.919 45.3292 142.838C34.5766 136.757 25.5816 127.995 19.2195 117.407C12.8574 106.818 9.34502 94.7623 9.02414 82.4133C8.70327 70.0644 11.5849 57.8427 17.3884 46.9378C23.192 36.0328 31.7199 26.8161 42.1421 20.1846C52.5644 13.5531 64.5259 9.73273 76.8625 9.09532L77.4689 20.8318C67.1584 21.3645 57.1615 24.5574 48.451 30.0997C39.7405 35.6421 32.6132 43.3451 27.7628 52.459C22.9124 61.5729 20.5041 71.7873 20.7723 82.1081C21.0405 92.4288 23.976 102.504 29.2932 111.354C34.6103 120.204 42.128 127.526 51.1146 132.609C60.1011 137.691 70.2504 140.361 80.5747 140.357C90.8989 140.354 101.046 137.678 110.03 132.589C119.013 127.501 126.526 120.173 131.837 111.32L141.914 117.366Z"
                              stroke="#3788E5"
                              stroke-width="30"
                              shape-rendering="crispEdges"
                              mask="url(#path-2-inside-2_2010_123)"
                            />
                          </g>
                          <defs>
                            <filter
                              id="filter0_d_2010_123"
                              x="68.4385"
                              y="0"
                              width="92.6709"
                              height="128.116"
                              filterUnits="userSpaceOnUse"
                              color-interpolation-filters="sRGB"
                            >
                              <feFlood
                                flood-opacity="0"
                                result="BackgroundImageFix"
                              />
                              <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                              />
                              <feOffset />
                              <feGaussianBlur stdDeviation="4.5" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.54902 0 0 0 0 0.803922 0 0 0 0 0.278431 0 0 0 1 0"
                              />
                              <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_2010_123"
                              />
                              <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_2010_123"
                                result="shape"
                              />
                            </filter>
                            <filter
                              id="filter1_d_2010_123"
                              x="0"
                              y="0.0952148"
                              width="150.915"
                              height="161.014"
                              filterUnits="userSpaceOnUse"
                              color-interpolation-filters="sRGB"
                            >
                              <feFlood
                                flood-opacity="0"
                                result="BackgroundImageFix"
                              />
                              <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                              />
                              <feOffset />
                              <feGaussianBlur stdDeviation="4.5" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.386719 0 0 0 0 0.476696 0 0 0 0 0.6875 0 0 0 1 0"
                              />
                              <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_2010_123"
                              />
                              <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_2010_123"
                                result="shape"
                              />
                            </filter>
                          </defs>
                        </svg>

                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                          <span className="bg-gradient-to-b from-[#1C6CB7] font-bold text-2xl to-[#0C3051] inline-block text-transparent bg-clip-text text-center ">
                            40%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="flex items-center  flex-col px-10 justify-center p-7 py-3 w-full text-white   rounded-2xl border border-[#1B3E9080]">
                    <div
                      dir={language === "ar" ? "rtl" : "ltr"}
                      className="w-full"
                    >
                      <p className=" text-[18px] mb-3 p-2 text-start">
                        {language === "ar" ? "تقييم الوكيل" : "Agent Rating"}
                      </p>
                      <div className="flex items-center gap-1 my- text-[16px]">
                        <span className="block w-4 h-4 blur-[1px] bg-[#3788E5] rounded-full" />{" "}
                        <p className="flex items-center justify-between gap-1 my-2 w-full">
                          <span>
                            {language === "ar"
                              ? "اداء جيد"
                              : "Good Performance"}
                          </span>
                          <span>100</span>
                        </p>
                      </div>
                      <div className="flex items-center  gap-1 my-2 ">
                        <span className="block w-4 h-4 blur-[1px] bg-[#75C64B] rounded-full" />{" "}
                        <p className="flex items-center justify-between gap-1 my-2 w-full">
                          <span>
                            {language === "ar" ? "اداء سيء" : "Bad Performance"}
                          </span>
                          <span className="text-[#75C64B]">40</span>
                        </p>
                      </div>
                    </div>{" "}
                    <div className="relative flex justify-center">
                      <div className="relative w-[130px] h-[130px]">
                        <svg
                          viewBox="0 0 162 162"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-full h-full rounded-full"
                        >
                          <g filter="url(#filter0_d_2010_123)">
                            <mask id="path-1-inside-1_2010_123" fill="white">
                              <path d="M77.4386 9.06788C90.5276 8.49733 103.522 11.5313 115.005 17.8391C126.488 24.1468 136.019 33.4861 142.558 44.8388C149.098 56.1914 152.395 69.1216 152.09 82.2194C151.785 95.3173 147.89 108.08 140.83 119.116L130.93 112.783C136.831 103.559 140.086 92.8927 140.341 81.946C140.596 70.9993 137.84 60.1928 132.375 50.7047C126.909 41.2166 118.944 33.4112 109.347 28.1394C99.7498 22.8677 88.8896 20.332 77.9504 20.8088L77.4386 9.06788Z" />
                            </mask>
                            <path
                              d="M77.4386 9.06788C90.5276 8.49733 103.522 11.5313 115.005 17.8391C126.488 24.1468 136.019 33.4861 142.558 44.8388C149.098 56.1914 152.395 69.1216 152.09 82.2194C151.785 95.3173 147.89 108.08 140.83 119.116L130.93 112.783C136.831 103.559 140.086 92.8927 140.341 81.946C140.596 70.9993 137.84 60.1928 132.375 50.7047C126.909 41.2166 118.944 33.4112 109.347 28.1394C99.7498 22.8677 88.8896 20.332 77.9504 20.8088L77.4386 9.06788Z"
                              stroke="#75C64B"
                              stroke-width="30"
                              shape-rendering="crispEdges"
                              mask="url(#path-1-inside-1_2010_123)"
                            />
                          </g>
                          <g filter="url(#filter1_d_2010_123)">
                            <mask id="path-2-inside-2_2010_123" fill="white">
                              <path d="M141.914 117.366C135.559 127.959 126.57 136.726 115.822 142.815C105.073 148.903 92.9317 152.105 80.5786 152.109C68.2255 152.113 56.0817 148.919 45.3292 142.838C34.5766 136.757 25.5816 127.995 19.2195 117.407C12.8574 106.818 9.34502 94.7623 9.02414 82.4133C8.70327 70.0644 11.5849 57.8427 17.3884 46.9378C23.192 36.0328 31.7199 26.8161 42.1421 20.1846C52.5644 13.5531 64.5259 9.73273 76.8625 9.09532L77.4689 20.8318C67.1584 21.3645 57.1615 24.5574 48.451 30.0997C39.7405 35.6421 32.6132 43.3451 27.7628 52.459C22.9124 61.5729 20.5041 71.7873 20.7723 82.1081C21.0405 92.4288 23.976 102.504 29.2932 111.354C34.6103 120.204 42.128 127.526 51.1146 132.609C60.1011 137.691 70.2504 140.361 80.5747 140.357C90.8989 140.354 101.046 137.678 110.03 132.589C119.013 127.501 126.526 120.173 131.837 111.32L141.914 117.366Z" />
                            </mask>
                            <path
                              d="M141.914 117.366C135.559 127.959 126.57 136.726 115.822 142.815C105.073 148.903 92.9317 152.105 80.5786 152.109C68.2255 152.113 56.0817 148.919 45.3292 142.838C34.5766 136.757 25.5816 127.995 19.2195 117.407C12.8574 106.818 9.34502 94.7623 9.02414 82.4133C8.70327 70.0644 11.5849 57.8427 17.3884 46.9378C23.192 36.0328 31.7199 26.8161 42.1421 20.1846C52.5644 13.5531 64.5259 9.73273 76.8625 9.09532L77.4689 20.8318C67.1584 21.3645 57.1615 24.5574 48.451 30.0997C39.7405 35.6421 32.6132 43.3451 27.7628 52.459C22.9124 61.5729 20.5041 71.7873 20.7723 82.1081C21.0405 92.4288 23.976 102.504 29.2932 111.354C34.6103 120.204 42.128 127.526 51.1146 132.609C60.1011 137.691 70.2504 140.361 80.5747 140.357C90.8989 140.354 101.046 137.678 110.03 132.589C119.013 127.501 126.526 120.173 131.837 111.32L141.914 117.366Z"
                              stroke="#3788E5"
                              stroke-width="30"
                              shape-rendering="crispEdges"
                              mask="url(#path-2-inside-2_2010_123)"
                            />
                          </g>
                          <defs>
                            <filter
                              id="filter0_d_2010_123"
                              x="68.4385"
                              y="0"
                              width="92.6709"
                              height="128.116"
                              filterUnits="userSpaceOnUse"
                              color-interpolation-filters="sRGB"
                            >
                              <feFlood
                                flood-opacity="0"
                                result="BackgroundImageFix"
                              />
                              <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                              />
                              <feOffset />
                              <feGaussianBlur stdDeviation="4.5" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.54902 0 0 0 0 0.803922 0 0 0 0 0.278431 0 0 0 1 0"
                              />
                              <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_2010_123"
                              />
                              <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_2010_123"
                                result="shape"
                              />
                            </filter>
                            <filter
                              id="filter1_d_2010_123"
                              x="0"
                              y="0.0952148"
                              width="150.915"
                              height="161.014"
                              filterUnits="userSpaceOnUse"
                              color-interpolation-filters="sRGB"
                            >
                              <feFlood
                                flood-opacity="0"
                                result="BackgroundImageFix"
                              />
                              <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                              />
                              <feOffset />
                              <feGaussianBlur stdDeviation="4.5" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.386719 0 0 0 0 0.476696 0 0 0 0 0.6875 0 0 0 1 0"
                              />
                              <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_2010_123"
                              />
                              <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_2010_123"
                                result="shape"
                              />
                            </filter>
                          </defs>
                        </svg>

                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                          <span className="bg-gradient-to-b from-[#1C6CB7] font-bold text-2xl to-[#0C3051] inline-block text-transparent bg-clip-text text-center ">
                            {Data.Agent_Evaluation_Rate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid gap-2 grid-cols-2  relative z-10 mb-5 text-end">
                  <div className="col-span-1 border border-[#1B3E90] rounded-2xl p-3 m">
                    <p className="text-end">:هل تم حل المشكلة </p>{" "}
                    <p className="text-[#3788E5] min-h-5 p-1">
                      {Data.Is_Issue_Resolved}
                    </p>
                  </div>
                  <div className="col-span-1 border border-[#1B3E90] rounded-2xl p-3 m">
                    <p className="text-end">:مشكلة العميل </p>{" "}
                    <p className="text-[#3788E5] min-h-5">
                      {Data.Customer_Issue}
                    </p>
                  </div>
                  <div className="col-span-1 border border-[#1B3E90] rounded-2xl p-3 m">
                    <p className="text-end">:ما هى رد فعل العميل </p>{" "}
                    <p className="text-[#3788E5] min-h-5">
                      {Data.Customer_Reaction}
                    </p>
                  </div>
                  <div className="col-span-1 border border-[#1B3E90] rounded-2xl p-3 m">
                    <p className="text-end">
                      :ما هو حل الوكيل وكيف تعامل مع العميل{" "}
                    </p>{" "}
                    <p className="text-[#3788E5] min-h-5">
                      {Data.Agent_Handling}
                    </p>
                  </div>
                </div>
                <div className="border relative z-10 border-[#1B3E90] rounded-2xl p-3 ">
                  <div className=" text-start flex justify-end items-center mb-2 px-2">
                    <p className="text-lg ">
                      {language === "ar"
                        ? "نسبة رضا العميل"
                        : "Customer Satisfaction Rate"}
                    </p>
                  </div>
                  <div className="w-fit mx-auto flex items-center gap-2 ">
                    <p className="text-[#3788E5] font-bold">
                      {Data.Customer_Satisfaction_Rate}
                    </p>
                    <svg
                      width="721"
                      height="26"
                      viewBox="0 0 721 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_d_22_168)">
                        <rect
                          width="705"
                          height="10"
                          rx="5"
                          transform="matrix(-1 0 0 1 713 8)"
                          fill="#3788E5"
                        />
                        <rect
                          width={
                            (parseFloat(
                              Data.Customer_Satisfaction_Rate.replace("%", ""),
                            ) /
                              100) *
                              705 || 0
                          }
                          height="10"
                          rx="5"
                          transform="matrix(-1 0 0 1 713 8)"
                          fill="#4F45B6"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_22_168"
                          x="0"
                          y="0"
                          width="721"
                          height="26"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset />
                          <feGaussianBlur stdDeviation="4" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.228828 0 0 0 0 0.397678 0 0 0 0 0.793269 0 0 0 1 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_22_168"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_22_168"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                </div>
                <button
                  onClick={() => setShowSummary(false)}
                  className="bg-[#1B3E90] relative z-10 hover:bg-[#1B3E90]/80 px-8 mt-4 py-2 rounded-full transition-colors"
                >
                  {language === "ar" ? "إغلاق" : "Close"}
                </button>
              </>
            )}
            <div className="absolute  right-0 bottom-0 bg-[#1B3E90]  rounded-full z-[0] w-[900px] h-[650px]  top-1/2 left-1/2 blur-[300px] -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>
      )}
    </div>
  );
};
