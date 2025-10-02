import React from 'react';
const Hero: React.FC = () => {
  return <div className="bg-blue-50 py-16 md:py-24">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Simplify Legal Documents with{' '}
            <span className="text-blue-500">AI</span>{' '}
            <span className="text-blue-400">Intelligence</span>
          </h1>
          <p className="text-gray-600 mb-8 max-w-lg">
            Transform complex contracts and legal documents into clear,
            actionable insights. Our AI-powered platform extracts clauses,
            identifies risks, and provides instant answers to your legal
            questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md flex items-center justify-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Start Analyzing
            </button>
            <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-md flex items-center justify-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
              Watch Demo
            </button>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md mx-auto">
            <div className="flex mb-4">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-auto text-sm text-gray-500">
                Contract Analysis
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex">
                <div className="bg-red-100 text-red-600 text-xs font-semibold py-1 px-3 rounded-l-md">
                  HIGH RISK
                </div>
                <div className="border-l-4 border-red-500 bg-gray-50 p-3 flex-1 text-sm">
                  Termination clause without notice period
                </div>
              </div>
              <div className="flex">
                <div className="bg-yellow-100 text-yellow-600 text-xs font-semibold py-1 px-3 rounded-l-md">
                  MEDIUM RISK
                </div>
                <div className="border-l-4 border-yellow-500 bg-gray-50 p-3 flex-1 text-sm">
                  Liability limitations may be unclear
                </div>
              </div>
              <div className="flex">
                <div className="bg-green-100 text-green-600 text-xs font-semibold py-1 px-3 rounded-l-md">
                  LOW RISK
                </div>
                <div className="border-l-4 border-green-500 bg-gray-50 p-3 flex-1 text-sm">
                  Standard payment terms specified
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Hero;