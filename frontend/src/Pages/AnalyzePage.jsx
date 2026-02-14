import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import DocumentSummary from "../components/DocumentSummary";
import RiskAnalysis from "../components/RiskAnalysis";
import ClauseBreakdown from "../components/ClauseBreakdown";
import ChatBot from "../components/DocumentAnalysisPage/ChatBot";

export default function AnalyzePage() {

  const location = useLocation();
  const documents = location.state?.documents || [];

  // Assuming single document for now
  const documentId = documents.length > 0 ? documents[0].id : null;

  if (!documentId) {
    return (
      <div className="w-full min-h-screen bg-gray-50">
        <Navbar />
        <div className="text-center mt-20 text-red-600">
          No document selected. Please upload and analyze first.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="grid grid-cols-1 gap-8">

          <div className="bg-white rounded-lg shadow p-6">
            <DocumentSummary documentId={documentId} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <RiskAnalysis documentId={documentId} />
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <ClauseBreakdown documentId={documentId} />
            </div>
          </div>

          <ChatBot documentId={documentId} />
        </div>
      </main>
    </div>
  );
}
