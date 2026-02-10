"use client";

import useSpeachStore from "@/lib/store";
import React, { useEffect, useRef } from "react";
import Markdown from "markdown-to-jsx";

// import ReactMarkdown from "react-markdown";

const ChatBox: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollableDivRef = useRef<HTMLDivElement | null>(null);
  const { client, language } = useSpeachStore();

  const scrollToBottom = () => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop =
        scrollableDivRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [client]);

  const formatToMarkdown = (text: string) => {
    return text
      .replace("ما يلي:", "ما يلي:\n")
      .replace(/- (.*?): (.*?)\./g, "- **$1:** $2")
      .replace(/\[doc\d+\]/g, "");
  };

  const welcomeMessage =
    language === "ar"
      ? "اهلا بيك يا فندم ازاي اقدر اساعدك"
      : "Welcome, how can I assist you today?";

  return (
    <div
      dir={language === "ar" ? "rtl" : "ltr"}
      className=" w-full h-full rounded-xl p-3 py-4 pb-1 mx-auto"
    >
      <div
        className={`flex flex-col font-bold ${language === "ar" ? "items-end" : "items-start"} my-1`}
      >
        <div
          ref={scrollableDivRef}
          className="no-scrollbar flex flex-col h-64 md:max-h-full overflow-auto px-4 py w-full"
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          <p className="relative text-white gap-1 w-fit shadow-[0_0_10px_#1B3e90] ms-auto px-4 max-w-[300px] bg-[#1B3e90] rounded-2xl py-3 my-2">
            <span>{welcomeMessage}</span>
            <div
              className="absolute right-3 bottom-0 translate-y-full"
              style={{
                width: 0,
                height: 0,
                borderLeft: "25px solid transparent",
                borderRight: "1px solid transparent",
                borderTop: "10px solid #1B3e90",
              }}
            ></div>
          </p>
          {client.map((mess, idx) => {
            return (
              <div className="" key={idx}>
                {mess.isclient ? (
                  <div
                    className={`${language === "ar" ? "ms-auto" : "me-auto"} w-fit relative text-white px-4 rounded-2xl my-3 shadow-[0_0_10px_#3f88E5] py-2 bg-[#3f88E5]`}
                  >
                    <span>{mess.message}</span>
                    <div
                      className="absolute left-3 bottom-0 translate-y-full"
                      style={{
                        width: 0,
                        height: 0,
                        borderLeft: "1px solid transparent",
                        borderRight: "25px solid transparent",
                        borderTop: "10px solid #3f88E5",
                      }}
                    ></div>
                  </div>
                ) : (
                  <div
                    className={`text-white gap-1 shadow-[0_0_10px_#1B3e90] relative w-fit px-4 rounded-2xl my-2 py-2 bg-[#1B3e90] ${language === "ar" ? "" : ""}`}
                  >
                    <span>
                      <Markdown>{formatToMarkdown(mess.message)}</Markdown>
                    </span>
                    <div
                      className="absolute right-3 bottom-0 translate-y-full"
                      style={{
                        width: 0,
                        height: 0,
                        borderLeft: "25px solid transparent",
                        borderRight: "1px solid transparent",
                        borderTop: "10px solid #1B3e90",
                      }}
                    ></div>
                  </div>
                )}
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
