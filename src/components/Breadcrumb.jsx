import React from 'react';
import { HomeIcon } from 'lucide-react';
export function Breadcrumb() {
  return <nav className="flex items-center text-sm text-gray-500 mb-8">
      <a href="#" className="flex items-center hover:text-gray-700">
        <HomeIcon className="h-4 w-4 mr-1" />
        Home
      </a>
      <span className="mx-2">/</span>
      <span className="text-blue-500">Upload</span>
    </nav>;
}