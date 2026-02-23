import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import DocumentSummary from "../components/DocumentAnalysisPage/DocumentSummary";
import RiskAnalysis from "../components/DocumentAnalysisPage/RiskAnalysis";
import ClauseBreakdown from "../components/DocumentAnalysisPage/ClauseBreakdown";
import ChatBot from "../components/DocumentAnalysisPage/ChatBot";
import { getRiskAnalysis } from "../api_page";

export default function AnalyzePage() {
  const location = useLocation();
  const documents = location.state?.documents || [];
  const documentId = documents.length > 0 ? documents[0].id : null;

  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!documentId) return;

    const fetchAnalysis = async () => {
      setLoading(true);
      try {
        const result = await getRiskAnalysis(documentId);
        setAnalysisData(result);
      } catch (error) {
        console.error("Failed to fetch analysis:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [documentId]);

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

          {loading ? (
            <div className="text-center py-10">Loading analysis...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <RiskAnalysis data={analysisData} />
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <ClauseBreakdown data={analysisData} />
              </div>
            </div>
          )}

          <ChatBot documentId={documentId} />
        </div>
      </main>
    </div>
  );
}