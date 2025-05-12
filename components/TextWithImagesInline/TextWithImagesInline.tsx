"use client";

import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Components } from "react-markdown";

interface Props {
  text: string;
}

const TextWithImagesInline: React.FC<Props> = ({ text }) => {
  // Convert markdown image links to images
  const mdWithImages = text.replace(
    /\[([^\]]+)\]\((https?:\/\/\S+\.(?:jpg|jpeg|png|gif))\)/g,
    "![$1]($2)"
  );

  const customComponents: Components = {
    img({ node, ...props }) {
      const src = props.src ?? "";
      const alt = props.alt ?? "image";
      return (
        <Image
          src={src}
          alt={alt}
          width={160}
          height={160}
          className="inline-block w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg shadow-md mx-2 my-2"
          unoptimized
        />
      );
    },
    a({ node, ...props }) {
      return (
        <a
          {...props}
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {props.children}
        </a>
      );
    },
  };

  return (
    <div className="prose max-w-none prose-sm md:prose-base text-gray-900 dark:prose-invert leading-relaxed">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={customComponents}>
        {mdWithImages}
      </ReactMarkdown>
    </div>
  );
};

export default TextWithImagesInline;
