import React from "react";
import Navbar from "../components/Navbar";
import DocumentSummary from "../components/DocumentSummary";
import RiskAnalysis from "../components/RiskAnalysis";
import ClauseBreakdown from "../components/ClauseBreakdown";
import ChatBot from "../components/ChatBot";
export default function AnalyzePage() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <DocumentSummary />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <RiskAnalysis />
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <ClauseBreakdown />
            </div>
          </div>

          <ChatBot />
        </div>
      </main>
    </div>
  );
}
