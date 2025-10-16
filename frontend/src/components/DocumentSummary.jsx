import React from "react";
const DocumentSummary = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h2 className="ml-2 text-xl font-semibold text-gray-800">
            Executive Summary
          </h2>
        </div>
        <button className="flex items-center px-3 py-1 bg-blue-50 text-blue-600 rounded border border-blue-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Copy
        </button>
      </div>
      <div className="border-l-4 border-blue-400 pl-4 py-1">
        <h3 className="text-lg font-medium text-gray-800">Document Summary</h3>
      </div>
      <div className="mt-4 text-gray-700 space-y-4 leading-relaxed">

        <p>
          <span className="font-semibold text-gray-800">Type:</span> <br />
          <span>
            This document is a <strong>Rental Agreement</strong> — a legally
            binding contract between{" "}
            <strong>Mr. Rajesh Kumar (Landlord)</strong> and{" "}
            <strong>Mr. Amit Sharma (Tenant)</strong> for a 2BHK apartment in{" "}
            <strong>Bengaluru</strong>.
          </span>
        </p>

        <p>
          <span className="font-semibold text-gray-800">Overview:</span>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>
              The Landlord rents the property to the Tenant under agreed terms
              and conditions.
            </li>
            <li>
              The Tenant agrees to pay rent on time and maintain the premises
              responsibly.
            </li>
          </ul>
        </p>

        <p>
          <span className="font-semibold text-gray-800">
            Landlord’s Obligations:
          </span>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Provide the property in habitable condition.</li>
            <li>Handle all major and structural repairs.</li>
          </ul>
        </p>

        <p>
          <span className="font-semibold text-gray-800">
            Landlord’s Rights:
          </span>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Receive timely rent payments.</li>
            <li>
              Ensure property use is restricted to residential purposes only.
            </li>
          </ul>
        </p>

        <p>
          <span className="font-semibold text-gray-800">
            Tenant’s Obligations:
          </span>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Pay rent on or before the due date.</li>
            <li>
              Maintain the property’s condition and handle minor repairs below
              INR 2,000.
            </li>
            <li>Use the premises solely for residential purposes.</li>
          </ul>
        </p>

        <p>
          <span className="font-semibold text-gray-800">Tenant’s Rights:</span>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Enjoy peaceful possession of the property.</li>
            <li>
              Receive a refundable security deposit after termination (subject
              to deductions).
            </li>
          </ul>
        </p>

        <p>
          <span className="font-semibold text-gray-800">Key Terms:</span>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Tenure: 11 months (October 1, 2025 – August 31, 2026)</li>
            <li>Monthly Rent: INR 25,000, payable by the 5th of each month</li>
            <li>Late Payment Penalty: 2% per month after 10 days</li>
            <li>Security Deposit: INR 1,50,000 (refundable)</li>
            <li>Subletting and commercial use are strictly prohibited.</li>
          </ul>
        </p>

        <p>
          <span className="font-semibold text-gray-800">Notable Risks:</span>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Disputes over property damage or late rent payments.</li>
            <li>Early termination disagreements.</li>
          </ul>
        </p>

        <p>
          <span className="font-semibold text-gray-800">
            Risk Mitigation Clauses:
          </span>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Defined maintenance responsibilities.</li>
            <li>Penalties for delayed payments.</li>
            <li>Clear rules for security deposit deductions or forfeiture.</li>
          </ul>
        </p>
      </div>
    </div>
  );
};
export default DocumentSummary;
