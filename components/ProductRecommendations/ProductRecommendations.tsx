"use client";
import React, { useState, useEffect, useRef } from "react";
import { Flex, ScrollArea, Skeleton, Text } from "@radix-ui/themes";
// import AccordionDemo from "../Accordion/Accordion";
import { RandomId } from "../../constant";
import ProductTextRenderer from "./../TextFromServer/TextFromServer";

export interface NerDTO {
  text: string;
  category: string;
  offset: number;
  length: number;
  confidenceScore: number;
}

import useSpeachStore from "@/lib/store";

const ProductRecommendations = () => {
  const { language } = useSpeachStore();
  const WS_URL = "https://cexa-v2.westus.cloudapp.azure.com:5002";

  const wsRef = useRef<WebSocket | null>(null);
  const [streamingText, setStreamingText] = useState("");

  useEffect(() => {
    const sendInitData = (socket: WebSocket) => {
      socket.onopen = () => {
        socket.send(RandomId);
      };
    };
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const msg = event.data as string;
      console.log({ msg });

      if (msg === "This is not relevant") {
        return;
      }
      if (msg === "This is not from our products") {
        setStreamingText(
          language === "ar"
            ? "هذا ليس من منتجاتنا"
            : "This is not from our products",
        );
        return;
      }

      if (msg === "End Here!!") {
        return;
      }

      if (msg === "Start Here!!") {
        setStreamingText("");
        return;
      }

      setStreamingText((prev) => prev + msg);
    };

    ws.onerror = (err) => {
      console.error("⚠️ WebSocket error:", err);
    };

    ws.onclose = (ev) => {
      console.log(`🔴 WebSocket closed: code=${ev.code}, reason=${ev.reason}`);
    };

    sendInitData(wsRef.current);
    return () => {
      ws.close();
    };
  }, [language]);

  const formatToMarkdown = (text: string) => {
    return text
      .replace("ما يلي:", "ما يلي:\n")
      .replace(/- (.*?): (.*?)\./g, "- **$1:** $2")
      .replace(/\[doc\d+\]/g, "");
  };

  const formattedMarkdown = formatToMarkdown(streamingText);

  return (
    <div dir={language === "ar" ? "rtl" : "ltr"} className="w-full h-full  ">
      <div className="p-4 ps-0 text-white h-full text-sm border-[#1B3E9099] border-[1px] max-h-[450px] overflow-hidden rounded-3xl">
        <h2 className="font-semibold text-lg mb-2 px-4 text-white rounded py-2 ">
          {language === "ar"
            ? "توصيات المنتجات والخدمات"
            : "Product and Service Recommendations"}
        </h2>
        <ScrollArea className=" no-scrollbar np-scrollbar overflow-y-auto">
          <div className="space-y-4 h-full">
            <div className="max-h-[100%]  overflow-y-scroll  ps-0 overflow-x-hidden no-scrollbar  rounded-lg p-4">
              {streamingText ? (
                <div className="">
                  <ProductTextRenderer apiText={formattedMarkdown} />
                </div>
              ) : (
                <div dir={language === "ar" ? "rtl" : "ltr"}>
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
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ProductRecommendations;
