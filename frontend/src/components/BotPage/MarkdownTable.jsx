import React from 'react';

export default function MarkdownTable({ rows }) {
  const applyBold = (str) => {
    return str.replace(/\*\*(.*?)\*\*/g, (_, inner) => `<strong>${inner}</strong>`);
  };

  const headers = rows[0]
    .split('|')
    .map(h => h.trim())
    .filter(Boolean)
    .map(h => applyBold(h));

  const bodyRows = rows.slice(2);

  return (
    <table className="table-auto border-collapse border border-gray-400 my-3 w-full text-sm">
      <thead>
        <tr>
          {headers.map((head, idx) => (
            <th
              key={idx}
              className="border border-gray-300 px-2 py-1 bg-gray-100"
              dangerouslySetInnerHTML={{ __html: head }}
            />
          ))}
        </tr>
      </thead>

      <tbody>
        {bodyRows.map((row, ri) => {
          const cells = row
            .split('|')
            .map(c => c.trim())
            .filter(Boolean)
            .map(c => applyBold(c));

          return (
            <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {cells.map((cell, ci) => (
                <td
                  key={ci}
                  className="border border-gray-300 px-2 py-1"
                  dangerouslySetInnerHTML={{ __html: cell }}
                />
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
