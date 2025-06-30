"use client";

import React from "react";


function renderTextWithImages(text: string) {
  const imageRegex = /(https?:\/\/[^\s]+)/g;

  const parts = text.split(imageRegex);

  return parts.map((part, index) => {
    if (part.match(imageRegex)) {
      return (
        <>
        <br/>
        <img
          key={index}
          src={part}
          alt="Product"
          className="inline-block max-w-[150px] mx-2 my-2 rounded shadow"
          /> 
          <br/>
          </>
      );
    } else {
      return <span key={index}>{part}</span>;
    }
  });
}

export default function ProductTextRenderer({ apiText }: { apiText: string }) {
  return (
    <div className="p-4 text-right leading-8 text-gray-800">
      {renderTextWithImages(apiText)}
    </div>
  );
}
