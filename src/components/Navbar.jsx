import React from 'react';
const Navbar = () => {
  return <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-blue-500 text-white p-2 rounded-md mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-800">LexiLaw</h1>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-500 border-b-2 border-transparent hover:border-blue-500 pb-1">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-500 border-b-2 border-transparent hover:border-blue-500 pb-1">
              Upload
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-500 border-b-2 border-transparent hover:border-blue-500 pb-1">
              Chat
            </a>
          </div>
        </div>
      </div>
    </nav>;
};
export default Navbar;