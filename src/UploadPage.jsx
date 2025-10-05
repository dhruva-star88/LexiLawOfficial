import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Breadcrumb } from "./components/Breadcrumb";
import { UploadArea } from "./components/UploadArea";
import { RecentDocuments } from "./components/RecentDocuments";
import { Tips } from "./components/Tips";

export default function UploadPage() {
  const [recentDocuments, setRecentDocuments] = useState([
    {
      id: "1",
      name: "Rental_Agreement_Example.pdf",
      date: "9/21/2025, 11:09:56 PM",
    },
    {
      id: "2",
      name: "rentalramesh.pdf",
      date: "9/21/2025, 7:27:26 PM",
    },
  ]);

  const handleFileUpload = (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      date: new Date().toLocaleString(),
      file,
    }));
    setRecentDocuments((prev) => [...newFiles, ...prev]);
  };

  const handleDelete = (id) => {
    setRecentDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        <Breadcrumb />
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-teal-800 mb-4">
            Upload Legal Document
          </h1>
          <p className="text-gray-600 mb-2">
            Upload your legal documents for AI-powered analysis and risk
            assessment.
          </p>
          <p className="text-gray-600">
            We support PDF, DOCX, PNG, and JPEG files up to 20MB.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <UploadArea onFileUpload={handleFileUpload} />
            <Tips />
          </div>
          <div>
            <RecentDocuments
              documents={recentDocuments}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </main>
    </div>
  );
}