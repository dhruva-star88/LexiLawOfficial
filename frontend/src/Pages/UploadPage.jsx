import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { UploadArea } from "../components/UploadArea";
import { RecentDocuments } from "../components/RecentDocuments";
import { Tips } from "../components/Tips";
import { uploadDocument, analyseDocument } from "../api_page/index";

export default function UploadPage() {
  const [recentDocuments, setRecentDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔥 Upload to Backend
  const handleFileUpload = async (acceptedFiles) => {
    setLoading(true);

    try {
      const uploadedDocs = [];

      for (const file of acceptedFiles) {
        const res = await uploadDocument(file);

        uploadedDocs.push({
          id: res.data.id, // 👈 REAL document_id from backend
          name: file.name,
          date: new Date().toLocaleString(),
        });
      }

      setRecentDocuments((prev) => [...uploadedDocs, ...prev]);
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      alert("Upload failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setRecentDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  // 🔥 Analyse All Uploaded Documents
  const handleAnalyze = async () => {
    if (recentDocuments.length === 0) return;

    try {
      setLoading(true);

      for (const doc of recentDocuments) {
        await analyseDocument(doc.id);
      }

      // Navigate after analysis completes
      navigate("/analyze", {
        state: { documents: recentDocuments },
      });

    } catch (error) {
      console.error("Analysis failed:", error.response?.data || error.message);
      alert("Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-4">
            Upload Legal Document
          </h1>
          <p className="text-gray-600 mb-2">
            Upload your legal documents for AI-powered analysis.
          </p>
          <p className="text-gray-600">
            We support PDF, DOCX, PNG, and JPEG files up to 20MB.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2">
            <UploadArea onFileUpload={handleFileUpload} />
            <Tips />
          </div>

          {/* RIGHT SIDE */}
          <div>
            <RecentDocuments
              documents={recentDocuments}
              onDelete={handleDelete}
            />

            {/* ANALYZE BUTTON */}
            <div className="mt-6 text-center">
              <button
                onClick={handleAnalyze}
                disabled={recentDocuments.length === 0 || loading}
                className={`px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-200 ${
                  recentDocuments.length === 0 || loading
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {loading ? "Processing..." : "Analyze Documents"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
