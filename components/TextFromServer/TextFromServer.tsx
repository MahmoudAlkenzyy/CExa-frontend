"use client";

import React from "react";

export function renderTextWithImages(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp"];

  // فقرة فقرة (سطر سطر)
  const paragraphs = text.split(/\n+/).filter(Boolean);

  return paragraphs.map((para, index) => {
    const parts = para.split(urlRegex);

    const formattedParts = parts.map((part, i) => {
      const lower = part.toLowerCase();
      const isImage = imageExtensions.some((ext) => lower.endsWith(ext));

      if (part.match(urlRegex) && isImage) {
        return (
          <React.Fragment key={i}>
            <img
              src={part}
              alt="Product"
              className="inline-block max-w-[150px] mx-2 my-2 rounded shadow"
            />
          </React.Fragment>
        );
      } else if (part.match(urlRegex)) {
        return (
          <a
            key={i}
            href={part}
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {part}
          </a>
        );
      }

      // bold **text**
      const boldRegex = /\*\*(.*?)\*\*/g;
      const boldParts = [];
      let lastIndex = 0;
      let match;
      while ((match = boldRegex.exec(part)) !== null) {
        boldParts.push(part.substring(lastIndex, match.index));
        boldParts.push(
          <strong
            key={`${i}-${match.index}`}
            className="font-semibold text-white"
          >
            {match[1]}
          </strong>,
        );
        lastIndex = match.index + match[0].length;
      }
      boldParts.push(part.substring(lastIndex));

      return <React.Fragment key={i}>{boldParts}</React.Fragment>;
    });

    // Check for bullet point
    const isBullet = para.trim().startsWith("-");

    return (
      <div key={index} className="mb-2">
        {isBullet ? (
          <li className="list-disc list-inside text-white">{formattedParts}</li>
        ) : (
          <p className="text-white">{formattedParts}</p>
        )}
      </div>
    );
  });
}

export default function ProductTextRenderer({ apiText }: { apiText: string }) {
  return <div className="p-4  text-left ">{renderTextWithImages(apiText)}</div>;
}
