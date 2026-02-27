import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ClauseBreakdown = ({ data }) => {
  const [riskLevel, setRiskLevel] = useState("All Risk Levels");
  const [clauseType, setClauseType] = useState("All Clause Types");

  // 🔹 Build chart dynamically from backend clauses
  const clauseData = useMemo(() => {
    if (!data?.clauses) return [];

    const counts = {};

    data.clauses.forEach((clause) => {
      counts[clause.clause_type] =
        (counts[clause.clause_type] || 0) + 1;
    });

    return Object.keys(counts).map((key) => ({
      name: key,
      count: counts[key],
    }));
  }, [data]);

  // 🔹 Filter clauses dynamically
  const clauseDetails = useMemo(() => {
    if (!data?.clauses) return [];

    return data.clauses.filter((clause) => {
      const riskMatch =
        riskLevel === "All Risk Levels" ||
        clause.risk_level === riskLevel.toUpperCase();

      const typeMatch =
        clauseType === "All Clause Types" ||
        clause.clause_type === clauseType;

      return riskMatch && typeMatch;
    });
  }, [data, riskLevel, clauseType]);

  return (
    <div>
      {/* Chart Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Clause Breakdown
        </h2>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={clauseData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`${value} clauses`, "Count"]}
              />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Clause Analysis */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Detailed Clause Analysis
        </h2>

        <div className="flex justify-between mb-4">
          <select
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={riskLevel}
            onChange={(e) => setRiskLevel(e.target.value)}
          >
            <option>All Risk Levels</option>
            <option>LOW</option>
            <option>MEDIUM</option>
            <option>MEDIUM-HIGH</option>
            <option>HIGH</option>
          </select>

          <select
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={clauseType}
            onChange={(e) => setClauseType(e.target.value)}
          >
            <option>All Clause Types</option>
            {[...new Set(data?.clauses?.map((c) => c.clause_type))].map(
              (type) => (
                <option key={type}>{type}</option>
              )
            )}
          </select>
        </div>

        {/* ✅ Scrollable Container */}
        <div className="max-h-96 overflow-y-auto pr-2 space-y-4">
          {clauseDetails.map((clause) => (
            <div
              key={clause.clause_id}
              className="border-l-4 border-green-500 bg-white p-4 rounded-r shadow-sm"
            >
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="text-gray-500 font-medium">
                    {clause.clause_type}
                  </div>
                  <div className="ml-2 text-xs text-gray-400">
                    {clause.clause_id}
                  </div>
                </div>

                <div className="flex items-center">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      clause.risk_level === "LOW"
                        ? "bg-green-100 text-green-600"
                        : clause.risk_level === "MEDIUM"
                        ? "bg-yellow-100 text-yellow-600"
                        : clause.risk_level === "MEDIUM-HIGH"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {clause.risk_level}
                  </span>

                  <span className="ml-2 text-sm">
                    Score: {clause.risk_score}
                  </span>
                </div>
              </div>

              {/* show full summary instead of truncating */}
              <div className="mt-2 text-gray-700 text-sm whitespace-pre-line break-words">
                {clause.summary}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClauseBreakdown;