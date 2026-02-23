import React, { useEffect, useState } from "react";
import { askDocumentAssistant } from "../../api_page/index";
import { parseBotResponse } from "../../utils/parseBotResponse";

const DocumentSummary = ({ documentId }) => {

  const [summaryElements, setSummaryElements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {

    const fetchSummary = async () => {
      if (!documentId) return;

      try {
        setLoading(true);

        const res = await askDocumentAssistant(
          documentId,
          `
        Provide a professional executive summary of this document.

        Guidelines:
        - Identify the nature and purpose of the document.
        - Highlight the most important clauses and terms.
        - Clearly describe obligations, rights, financial terms, and termination provisions if present.
        - Mention notable legal risks or ambiguities if applicable.
        - Organize the summary using clear headings and bullet points where appropriate.
        - Do not assume information that is not present in the document.
        `
        );

        const parsed = parseBotResponse(res.answer);
        setSummaryElements(parsed);

      } catch (error) {
        console.error("Summary error:", error);
        setSummaryElements([
          { type: "paragraph", content: "Unable to generate summary." }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();

  }, [documentId]);

  // Strip HTML tags before copying
  const stripHTML = (html) => {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  };

  const handleCopy = async () => {
    try {
      const textContent = summaryElements
        .map((el) => {
          if (el.type === "heading") {
            return `\n${stripHTML(el.content).toUpperCase()}\n`;
          }

          if (el.type === "paragraph") {
            return stripHTML(el.content);
          }

          if (el.type === "list") {
            return el.content
              .map((item) => `• ${stripHTML(item)}`)
              .join("\n");
          }

          if (el.type === "table") {
            return el.content
              .map((row) =>
                row
                  .slice(1, -1)
                  .split("|")
                  .map((c) => c.trim())
                  .join(" | ")
              )
              .join("\n");
          }

          return "";
        })
        .join("\n\n");

      await navigator.clipboard.writeText(textContent);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const renderElements = () => {
    return summaryElements.map((el, index) => {

      switch (el.type) {

        case "heading":
          return (
            <h3
              key={index}
              className="text-lg font-semibold text-gray-800 mt-4"
              dangerouslySetInnerHTML={{ __html: el.content }}
            />
          );

        case "paragraph":
          return (
            <p
              key={index}
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: el.content }}
            />
          );

        case "list":
          return (
            <ul key={index} className="list-disc list-inside mt-2 space-y-1">
              {el.content.map((item, i) => (
                <li
                  key={i}
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              ))}
            </ul>
          );

        case "table":
          return (
            <table key={index} className="table-auto border mt-4 w-full">
              <tbody>
                {el.content.map((row, i) => {
                  const cells = row
                    .slice(1, -1)
                    .split("|")
                    .map((c) => c.trim());

                  return (
                    <tr key={i}>
                      {cells.map((cell, j) => (
                        <td
                          key={j}
                          className="border px-3 py-2"
                          dangerouslySetInnerHTML={{ __html: cell }}
                        />
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          );

        case "spacing":
          return <div key={index} className={el.className}></div>;

        default:
          return null;
      }

    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h2 className="ml-2 text-xl font-semibold text-gray-800">
            Executive Summary
          </h2>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center px-3 py-1 bg-blue-50 text-blue-600 rounded border border-blue-200"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>

      <div className="border-l-4 border-blue-400 pl-4 py-1">
        <h3 className="text-lg font-medium text-gray-800">
          Document Summary
        </h3>
      </div>

      <div className="mt-4 space-y-4">
        {loading ? (
          <div className="text-gray-500">
            Generating executive summary...
          </div>
        ) : (
          renderElements()
        )}
      </div>
    </div>
  );
};

export default DocumentSummary;