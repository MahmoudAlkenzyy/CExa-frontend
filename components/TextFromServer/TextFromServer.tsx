"use client";

import React from "react";

export function renderTextWithImages(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp"];

  // فقرة فقرة (سطر سطر)
  const paragraphs = text.split(/\n+/).filter(Boolean);

  return paragraphs.map((para, index) => {
    let currentText = para.trim();
    let isH3 = currentText.startsWith("###");
    let isH2 = !isH3 && currentText.startsWith("##");
    let isBullet = !isH3 && !isH2 && currentText.startsWith("-");

    // Remove markdown symbols for rendering
    if (isH3) currentText = currentText.replace(/^###\s*/, "");
    else if (isH2) currentText = currentText.replace(/^##\s*/, "");
    else if (isBullet) currentText = currentText.replace(/^- \s*/, "");

    const parts = currentText.split(urlRegex);

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
            className="text-blue-400 underline"
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

    if (isH3) {
      return (
        <h3 key={index} className="text-base font-bold  mt-4 mb-2 pb-1">
          {formattedParts}
        </h3>
      );
    }

    if (isH2) {
      return (
        <h2
          key={index}
          className="text-lg font-bold text-white mt-5 mb-3  pb-1"
        >
          {formattedParts}
        </h2>
      );
    }

    return (
      <div key={index} className="mb-2">
        {isBullet ? (
          <li className="list-disc list-inside text-white py-0.5">
            {formattedParts}
          </li>
        ) : (
          <p className="text-white leading-relaxed">{formattedParts}</p>
        )}
      </div>
    );
  });
}

export default function ProductTextRenderer({ apiText }: { apiText: string }) {
  return <div className="p-4  text-left ">{renderTextWithImages(apiText)}</div>;
}
