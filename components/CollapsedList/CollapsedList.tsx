import React, { useCallback, useEffect } from "react";
// import ReactMarkdown from "react-markdown";
// import Markdown from "markdown-to-jsx";
import ProductTextRenderer from "../TextFromServer/TextFromServer";

interface CollapsedListProps {
  items: { text: string; title: string | undefined }[];
  setItems: React.Dispatch<
    React.SetStateAction<
      {
        text: string;
        title: string | undefined;
      }[]
    >
  >;
}

export default function CollapsedList({ items, setItems }: CollapsedListProps) {
  //   console.log({ items1: items.reverse() });
  const formatToMarkdown = (text: string) => {
    return text
      .replace("ما يلي:", "ما يلي:\n") // إضافة سطر جديد بعد المقدمة
      .replace(/- (.*?): (.*?)\./g, "- **$1:** $2") // تحويل العناصر إلى Markdown list
      .replace(/\[doc\d+\]/g, ""); // إزالة أي روابط أو مراجع غير ضرورية
  };

  const fetchTitle = useCallback(async () => {
    // Early return if no items exist
    if (items.length === 0) {
      console.warn("No items available to fetch title");
      return;
    }

    try {
      const lastItemText = items[items.length - 1].text || "";
      if (items[items.length - 1].title) return;
      const res = await fetch(
        "https://cexa-v2.eastus.cloudapp.azure.com:5012/summary",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model_response: lastItemText,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const json = await res.json();

      // More defensive update
      setItems((prev) => {
        if (prev.length === 0) return prev; // Handle case where items were cleared

        return prev.map((item, index) =>
          index === prev.length - 1
            ? { ...item, title: json.title || json.summary || json.response }
            : item
        );
      });

      //   console.log("Title updated successfully:", json);
    } catch (error) {
      console.error("Error fetching title:", error);
      // Optional: Set error state or show user notification
    }
  }, [items, setItems]);

  useEffect(() => {
    fetchTitle();
    // console.log("res2");
  }, [fetchTitle]);
  //   console.log(items, items.slice(0, -1));

  return (
    <div className="space-y-3 my-4">
      {items.map((item, idx) => {
        const formattedMarkdown = formatToMarkdown(item.text);
        return (
          <details key={idx} className="border rounded-lg overflow-hidden">
            <summary className="cursor-pointer bg-blue-100 px-4 py-2 font-medium">
              {`${item.title || idx + 1}`}
            </summary>
            <div className="px-4 py-2 bg-white text-gray-800 max-h-[300px] overflow-y-auto">
              {/* <Markdown> */}
              {<ProductTextRenderer apiText={formattedMarkdown} />}
              {/* </Markdown> */}
            </div>
          </details>
        );
      })}
    </div>
  );
}
