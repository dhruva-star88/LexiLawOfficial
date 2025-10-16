import React from "react";
import { LightbulbIcon } from "lucide-react";
export function Tips() {
  return (
    <div className="mt-8 border-l-4 border-blue-500 pl-4">
      <div className="flex items-center">
        <LightbulbIcon className="h-5 w-5 text-blue-500 mr-2" />
        <h3 className="text-lg font-medium text-gray-800">
          Tips for better results
        </h3>
      </div>
      <p className="mt-2 text-sm text-gray-600">
        Ensure your documents are clearly scanned and all text is legible for
        the best analysis results.
      </p>
    </div>
  );
}
