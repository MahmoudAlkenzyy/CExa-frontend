"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card, Flex, ScrollArea, Skeleton, Text } from "@radix-ui/themes";
// import AccordionDemo from "../Accordion/Accordion";
import CollapsedList from "../CollapsedList/CollapsedList";
import { RandomId } from "../../constant";
import ProductTextRenderer from "./../TextFromServer/TextFromServer";
export interface NerDTO {
  text: string;
  category: string;
  offset: number;
  length: number;
  confidenceScore: number;
}

const ProductRecommendations = () => {
  const WS_URL = "https://cexa.eastus.cloudapp.azure.com:5002";

  const wsRef = useRef<WebSocket | null>(null);
  const [response, setResponse] = useState("");
  const responseRef = useRef("");
  const [history, setHistory] = useState<
    { text: string; title: string | undefined }[]
  >([]);
  //   const [isDone, setIsDone] = useState(false);

  {
    /**
        
        {
      const msg = event.data as string;

      if (msg === "This is not relevant") {
        return;
      }
      if (msg === "This is not from our products") {
        responseRef.current = "هذا ليس من منتجاتنا";
        return;
      }

      // 2) End marker — push to history, then clear
      if (msg === "End Here!!") {
        setHistory((prev) => [
          ...prev,
          { text: responseRef.current, title: undefined },
        ]);
        // setResponse("");
        return;
      }

      // 3) Start marker — just clear buffer
      if (msg === "Start Here!!") {
        responseRef.current = "";
        return;
      }
      //   console.log(responseRef.current);

      // 4) Otherwise accumulate
      responseRef.current += msg;
    };
        */
  }
  useEffect(() => {
    const sendInitData = (socket: WebSocket) => {
      socket.onopen = () => {
        socket.send(RandomId);
      };
    };
    // 1) Open connection
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log(`🟢 Connected to ${WS_URL}`);
    };
    ws.onmessage = (event) => {
      const msg = event.data as string;

      if (msg === "This is not relevant") {
        responseRef.current = "هذا ليس من منتجاتنا";
        return;
      }
      if (msg === "This is not from our products") {
        setResponse("هذا ليس من منتجاتنا");
        return;
      }

      if (msg === "Start Here!!") {
        setResponse(""); // clear response
        return;
      }

      if (msg === "End Here!!") {
        setHistory((prev) => [
          ...prev,
          { text: responseRef.current, title: undefined },
        ]);
        return;
      }

      // Append streamed message
      responseRef.current += msg;
      setResponse((prev) => prev + msg);
    };

    ws.onerror = (err) => {
      console.error("⚠️ WebSocket error:", err);
    };

    ws.onclose = (ev) => {
      console.log(`🔴 WebSocket closed: code=${ev.code}, reason=${ev.reason}`);
    };

    sendInitData(wsRef.current);
    // 3) Clean up on unmount
    return () => {
      ws.close();
    };
  }, []);
  //   console.log(response);

  const formatToMarkdown = (text: string) => {
    return text
      .replace("ما يلي:", "ما يلي:\n")
      .replace(/- (.*?): (.*?)\./g, "- **$1:** $2")
      .replace(/\[doc\d+\]/g, "");
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
            <div className="bg-gray-50 h-full overflow-y-scroll max-h-[60vh] ps-0 overflow-x-hidden  rounded-lg p-4">
              {/* <Image
                width={800}
                height={400}
                src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300"
                alt="iPhone"
                className="w-full h-48 object-cover rounded-lg mb-2"
              /> */}

              {response ? (
                <>
                  {/* {response} */}
                  <ProductTextRenderer apiText={formattedMarkdown} />

                  <CollapsedList items={history} setItems={setHistory} />
                </>
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
