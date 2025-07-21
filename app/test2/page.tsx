"use client";

import { useState } from "react";

const ChatComponent = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    if (!question) return;

    try {
      const res = await fetch("/api/azure-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rec: question }),
      });

      const data = await res.json();
      console.log({ data });

      // setResponse(data.choices[0]?.message?.content || "لا يوجد رد!");
    } catch (error) {
      console.error("Error:", error);
      setResponse("حدث خطأ أثناء جلب الرد!");
    }
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">💬 Azure OpenAI Chat</h1>
      <textarea
        className="border text-black p-2 w-full my-4"
        placeholder="اكتب سؤالك هنا..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSend}
      >
        إرسال
      </button>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">🔹 الرد:</h2>
        <p className="bg-gray-100 p-3">{response}</p>
      </div>
    </div>
  );
};

export default ChatComponent;
