export function parseBotResponse(text) {
  if (!text || typeof text !== "string") return [];

  const lines = text.split("\n");
  const elements = [];
  let currentTable = [];
  let currentList = [];

  // Only convert markdown bold **text**
  const applyMarkdownBold = (str) => {
    return str.replace(/\*\*(.*?)\*\*/g, (_, inner) => `<strong>${inner}</strong>`);
  };

  // Allow HTML like <strong>Text</strong> or <br> to pass through untouched
  const sanitize = (str) => applyMarkdownBold(str);

  const pushCurrentTable = () => {
    if (currentTable.length > 0) {
      elements.push({ type: "table", content: currentTable.slice() });
      currentTable = [];
    }
  };

  const pushCurrentList = () => {
    if (currentList.length > 0) {
      elements.push({ type: "list", content: currentList.slice() });
      currentList = [];
    }
  };

  lines.forEach((rawLine) => {
    const line = rawLine.replace(/\r/g, "");
    const trimmed = line.trim();
    if (trimmed.length === 0) {
      // blank line separates blocks
      pushCurrentList();
      pushCurrentTable();
      return;
    }

    // TABLE ROW
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      currentTable.push(trimmed);
      return;
    }

    // If we hit a non-table line while table is open, close table first
    if (currentTable.length > 0) {
      pushCurrentTable();
    }

    // MARKDOWN HEADING
    if (/^#{2,6}\s+/.test(trimmed)) {
      pushCurrentList();
      elements.push({
        type: "heading",
        content: sanitize(trimmed.replace(/^#+\s*/, "")),
      });
      return;
    }

    // MARKDOWN LIST ITEM
    if (/^[-•*]\s+/.test(trimmed)) {
      currentList.push(sanitize(trimmed.replace(/^[-•*]\s*/, "")));
      return;
    }

    // If we hit a non-list line while list is open, close list first
    if (currentList.length > 0) {
      pushCurrentList();
    }

    // HTML BLOCKS (like <strong>text</strong>, <br>, etc.)
    if (/^<.*?>/.test(trimmed)) {
      elements.push({
        type: "html",
        content: trimmed, // keep native HTML untouched
      });
      return;
    }

    // DEFAULT PARAGRAPH
    elements.push({
      type: "paragraph",
      content: sanitize(trimmed),
    });
  });

  // flush any remaining blocks
  pushCurrentList();
  pushCurrentTable();

  return elements;
}