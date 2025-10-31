import React from 'react';
import MarkdownTable from './MarkdownTable';
import { parseBotResponse } from '../../utils/parseBotResponse';

export default function RenderBotMessage({ message }) {
    if (message.sender !== "bot" || typeof message.text !== "string") {
        // For user or non-string messages just render plain text
        return <>{message.text}</>;
    }

    const parsed = parseBotResponse(message.text);

    return (
    <>
      {parsed.map((el, idx) => {
        switch (el.type) {
          case "heading":
            return (
              <h3 key={idx} className="font-semibold mt-3 text-gray-900" dangerouslySetInnerHTML={{ __html: el.content }} />
            );
          case "paragraph":
            return (
              <p key={idx} className="my-1 text-gray-800" dangerouslySetInnerHTML={{ __html: el.content }} />
            );
          case "list":
            return (
              <ul key={idx} className="ml-5 list-disc text-gray-800 space-y-1">
                {el.content.map((item, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            );
          case "listItem":
            // backward-compat: single list item
            return (
              <li key={idx} className="ml-4 list-disc text-gray-800" dangerouslySetInnerHTML={{ __html: el.content }} />
            );
          case "table":
            return <MarkdownTable key={idx} rows={el.content} />;
          case "html":
            return <div key={idx} dangerouslySetInnerHTML={{ __html: el.content }} />;
          default:
            return (
              <p key={idx} className="my-1 text-gray-800" dangerouslySetInnerHTML={{ __html: el.content }} />
            );
        }
      })}
    </>
  );
}