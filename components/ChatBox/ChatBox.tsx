"use client";

import useSpeachStore from "@/lib/store";
import React, { useEffect, useRef } from "react";
import Markdown from "markdown-to-jsx";

// import ReactMarkdown from "react-markdown";

const ChatBox: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollableDivRef = useRef<HTMLDivElement | null>(null);
  const { client } = useSpeachStore();

  const scrollToBottom = () => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop =
        scrollableDivRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [client]);
  // console.log(client);
  const formatToMarkdown = (text: string) => {
    return text
      .replace("ما يلي:", "ما يلي:\n") // إضافة سطر جديد بعد المقدمة
      .replace(/- (.*?): (.*?)\./g, "- **$1:** $2") // تحويل العناصر إلى Markdown list
      .replace(/\[doc\d+\]/g, ""); // إزالة أي روابط أو مراجع غير ضرورية
  };
  // console.log({client});

  return (
    <div
      dir="rtl"
      className="bg-white w-full h-full  rounded-xl p-3 py-4 pb-1  mx-auto  text-xs"
    >
      {/* عنوان المحادثة */}
      <h3 className="mb-2 px-4 text-white rounded py-2 bg-[#1B3E90]">
        المحادثة بين الوكيل والعميل
      </h3>

      {/* رسالة العميل */}
      <div className="flex flex-col  font-bold items-end my-1">
        <div
          ref={scrollableDivRef}
          className=" no-scrollbar  flex flex-col border h-36  md:max-h-full overflow-auto  border-[#AAECDD] rounded-lg px-4 py w-full ma"
        >
          <p className=" text-[#ce6547]  gap-1 w-fit 2 px-4 max-w-[300px]  rounded-lg my-2">
            <span className="text-xs ">الوكيل: </span>
            <span>اهلا بيك يا فندم ازاي اقدر اساعدك</span>
          </p>
          {client.map((mess, idx) => {
            return (
              <div className="" key={idx}>
                {mess.isclient ? (
                  <p className="    w-fit = text-[#76cfbb]  px-4  rounded-lg my-1">
                    <span className="text-xs">العميل: </span>
                    <span>{mess.message}</span>
                  </p>
                ) : (
                  <p className=" text-[#ce6547]  gap-1 w-fit 2 px-4  rounded-lg my-2">
                    <span className="text-xs ">الوكيل: </span>
                    <span>
                      {/* <ReactMarkdown> */}
                      <Markdown>{formatToMarkdown(mess.message)}</Markdown>
                      {/* </ReactMarkdown> */}
                    </span>
                  </p>
                )}
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* رسالة الوكيل */}
    </div>
  );
};

export default ChatBox;
