import React from "react";
import { FileIcon, TrashIcon } from "lucide-react";
export function RecentDocuments({ documents, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Recent Documents
      </h2>
      <div className="space-y-4">
        {documents.length > 0 ? (
          documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-start space-x-3 p-3 bg-gray-50 rounded-md"
            >
              <FileIcon className="h-5 w-5 text-blue-500 mt-1" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {doc.name}
                </p>
                <p className="text-xs text-gray-500">{doc.date}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-xs text-blue-500 border border-blue-500 rounded hover:bg-blue-50">
                  View
                </button>
                <button
                  onClick={() => onDelete(doc.id)}
                  className="p-1 bg-red-50 text-red-500 rounded hover:bg-red-100"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            No documents uploaded yet
          </p>
        )}
      </div>
    </div>
  );
}