"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card, Flex, ScrollArea, Skeleton, Text } from "@radix-ui/themes";
// import AccordionDemo from "../Accordion/Accordion";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export interface NerDTO {
  text: string;
  category: string;
  offset: number;
  length: number;
  confidenceScore: number;
}

const ProductRecommendations = () => {
  const WS_URL = "ws://172.191.90.91:5002";
  const wsRef = useRef<WebSocket | null>(null);
  const [response, setResponse] = useState("");
  //   const [isDone, setIsDone] = useState(false);
  useEffect(() => {
    // 1) Open connection
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log(`🟢 Connected to ${WS_URL}`);
    };

    ws.onmessage = (event) => {
      const msg = event.data as string;

      if (msg == "This is not relevant") {
        return;
      } else if (msg == "This is not from our products") {
        return setResponse(" هذا ليس من منتجاتنا");
      } else {
        if (msg == "Start Here!!") return setResponse("");

        setResponse((prev) => prev + msg);
      }
    };

    ws.onerror = (err) => {
      console.error("⚠️ WebSocket error:", err);
    };

    ws.onclose = (ev) => {
      console.log(`🔴 WebSocket closed: code=${ev.code}, reason=${ev.reason}`);
    };

    // 3) Clean up on unmount
    return () => {
      ws.close();
    };
  }, []);

  const formatToMarkdown = (text: string) => {
    return text
      .replace("ما يلي:", "ما يلي:\n") // إضافة سطر جديد بعد المقدمة
      .replace(/- (.*?): (.*?)\./g, "- **$1:** $2") // تحويل العناصر إلى Markdown list
      .replace(/\[doc1\]/g, ""); // إزالة أي روابط أو مراجع غير ضرورية
  };

  const formattedMarkdown = formatToMarkdown(response);

  return (
    <div dir="rtl" className="w-full h-full ">
      <Card className="p-4 ps-0 bg-white h-full text-xs">
        <h2 className="font-semibold  mb-2 px-4 text-white rounded py-2 bg-[#1B3E90]">
          توصيات المنتجات والخدمات
        </h2>
        <ScrollArea className="">
          <div className="space-y-4 h-full">
            <div className="bg-gray-50 h-full overflow-y-scroll max-h-[60vh] ps-0  rounded-lg p-4">
              {/* <Image
                width={800}
                height={400}
                src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300"
                alt="iPhone"
                className="w-full h-48 object-cover rounded-lg mb-2"
              /> */}

              {response ? (
                <ReactMarkdown>{formattedMarkdown}</ReactMarkdown>
              ) : (
                <div dir="rtl" className="rtl">
                  <Flex direction="column" gap="2">
                    <Text>
                      <Skeleton>Lorem ipsum dolor sit amet.</Skeleton>
                    </Text>

                    <Skeleton>
                      <Text>Lorem ipsum dolor sit amet</Text>
                    </Skeleton>
                  </Flex>
                  <Flex direction="column" gap="2" pt={"5"}>
                    <Text>
                      <Skeleton>Lorem ipsum dolor sit amet.</Skeleton>
                    </Text>

                    <Skeleton>
                      <Text>Lorem ipsum dolor sit amet</Text>
                    </Skeleton>
                  </Flex>
                </div>
              )}
              {/* <AccordionDemo data={data.data} /> */}
            </div>
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default ProductRecommendations;
