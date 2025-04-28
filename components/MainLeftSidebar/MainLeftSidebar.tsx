import React, { useState, useEffect, useCallback } from "react";
import { Card, ScrollArea } from "@radix-ui/themes";
// import AccordionDemo from "../Accordion/Accordion";
import { ReactMarkdown } from "./../../node_modules/react-markdown/lib/react-markdown";
import {
  AzureKeyCredential,
  TextAnalyticsClient,
  RecognizeCategorizedEntitiesResultArray,
  TextAnalyticsErrorResult,
} from "@azure/ai-text-analytics";

export interface NerDTO {
  text: string;
  category: string;
  offset: number;
  length: number;
  confidenceScore: number;
}
interface MainLeftSidebarProps {
  rec: string;
}
const MainLeftSidebar: React.FC<MainLeftSidebarProps> = ({ rec }) => {
  // const [text, setText] = useState("عايز اسأل عن تليفونات سامسونج");
  const [entities, setEntities] = useState<NerDTO[]>([]);
  const [data, setData] = useState<{
    name: string;
    data: { name: string; price: number }[];
  }>({
    name: "",
    data: [],
  });

  const [response, setResponse] = useState("");

  const handleSend = useCallback(async () => {
    if (!rec) return;

    try {
      const res = await fetch("/api/azure-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rec }),
      });

      const data = await res.json();
      console.log({ RAG: data });

      setResponse(data.choices[0]?.message?.content || "لا يوجد رد!");
    } catch (error) {
      console.error("Error:", error);
      setResponse("حدث خطأ أثناء جلب الرد!");
    }
  }, [rec]);

  const analyzeEntities = useCallback(async () => {
    const endpoint = process.env.NEXT_PUBLIC_AZURE_NER_ENDPOINT || "";
    const key = process.env.NEXT_PUBLIC_AZURE_NER_KEY || "";
    const client = new TextAnalyticsClient(
      endpoint,
      new AzureKeyCredential(key)
    );
    const results: RecognizeCategorizedEntitiesResultArray =
      await client.recognizeEntities([rec]);

    const mappedEntities: NerDTO[] = results.flatMap((result) => {
      if ("entities" in result) {
        return result.entities.map((entity) => ({
          text: entity.text,
          category: entity.category,
          offset: entity.offset,
          length: entity.length,
          confidenceScore: entity.confidenceScore,
        }));
      } else {
        console.error(
          `Error: ${(result as TextAnalyticsErrorResult).error.message}`
        );
        return [];
      }
    });

    setEntities(mappedEntities);
  }, [rec]);
  const formatToMarkdown = (text: string) => {
    return text
      .replace("ما يلي:", "ما يلي:\n") // إضافة سطر جديد بعد المقدمة
      .replace(/- (.*?): (.*?)\./g, "- **$1:** $2") // تحويل العناصر إلى Markdown list
      .replace(/\[doc1\]/g, ""); // إزالة أي روابط أو مراجع غير ضرورية
  };

  const formattedMarkdown = formatToMarkdown(response);
  useEffect(() => {
    if (rec) analyzeEntities();
  }, [analyzeEntities, rec]);
  useEffect(() => {
    handleSend();
  }, [handleSend]);
  useEffect(() => {
    if (
      entities[0]?.category === "Product" &&
      "موبايلات سامسونج".includes(entities[0].text)
    ) {
      setData({
        name: "موبايلات سامسونج",
        data: [
          { name: "Samsung Galaxy S23", price: 25000 },
          { name: "Samsung Galaxy A54", price: 12000 },
          { name: "Samsung Galaxy Z Flip5", price: 45000 },
          { name: "Samsung Galaxy Z Fold5", price: 65000 },
          { name: "Samsung Galaxy M14", price: 8000 },
          { name: "Samsung Galaxy A34", price: 11000 },
          { name: "Samsung Galaxy Note 20 Ultra", price: 35000 },
        ],
      });
    } else if (
      entities[0]?.category === "Product" &&
      "موبايلات أوبو".includes(entities[0].text)
    ) {
      setData({
        name: "موبايلات أوبو",
        data: [
          { name: "OPPO Find X3 Pro", price: 35000 },
          { name: "OPPO Reno6 Pro", price: 25000 },
          { name: "OPPO A94", price: 15000 },
          { name: "OPPO F19 Pro", price: 18000 },
          { name: "OPPO A74", price: 12000 },
          { name: "OPPO Reno5", price: 20000 },
          { name: "OPPO Find X2", price: 30000 },
        ],
      });
    } //  else if (
    //   entities[0]?.category === "Product" &&
    //   "موبايلات شاومي".includes(entities[0].text)
    // ) {
    //   setData({
    //     name: "موبايلات شاومي",
    //     data: [
    //       { name: "Xiaomi Mi 11", price: 20000 },
    //       { name: "Xiaomi Redmi Note 10", price: 12000 },
    //       { name: "Xiaomi Poco X3 Pro", price: 15000 },
    //       { name: "Xiaomi Mi 10T Pro", price: 18000 },
    //       { name: "Xiaomi Redmi 9", price: 8000 },
    //       { name: "Xiaomi Mi 11 Ultra", price: 25000 },
    //       { name: "Xiaomi Mi Mix 4", price: 30000 },
    //     ],
    //   });
    // }
  }, [entities]);
  return (
    <div className="w-full  ">
      <Card className="p-4 bg-white h-full ">
        <h2 className="font-semibold mb-4">توصيات المنتجات والخدمات</h2>
        <ScrollArea className="h-[600px]">
          <div className="space-y-4">
            <div className="bg-gray-50  h-[300px] rounded-lg p-4">
              {/* <Image
                width={800}
                height={400}
                src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300"
                alt="iPhone"
                className="w-full h-48 object-cover rounded-lg mb-2"
              /> */}
              <h3 dir="" className="font-medium py-1 pb-3 text-end">
                {data.name}
              </h3>
              <ReactMarkdown>{formattedMarkdown}</ReactMarkdown>
              {/* <AccordionDemo data={data.data} /> */}
            </div>
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default MainLeftSidebar;
