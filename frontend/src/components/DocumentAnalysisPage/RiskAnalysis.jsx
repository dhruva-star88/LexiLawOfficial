import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const RiskAnalysis = ({ data }) => {

  const clauses = data?.clauses || [];

  // ============================
  // Risk Distribution Calculation
  // ============================
  const riskData = useMemo(() => {
    const riskCounts = {
      LOW: 0,
      MEDIUM: 0,
      "MEDIUM-HIGH": 0,
      HIGH: 0,
    };

    clauses.forEach((c) => {
      const level = c.risk_level?.toUpperCase();
      if (riskCounts[level] !== undefined) {
        riskCounts[level]++;
      }
    });

    return [
      { name: "Low Risk", value: riskCounts.LOW, color: "#4ade80" },
      { name: "Medium", value: riskCounts.MEDIUM, color: "#fbbf24" },
      { name: "Medium-High", value: riskCounts["MEDIUM-HIGH"], color: "#f97316" },
      { name: "High Risk", value: riskCounts.HIGH, color: "#ef4444" },
    ];
  }, [clauses]);

  // ============================
  // Summary Cards
  // ============================
  const summaryData = useMemo(() => {
    return [
      {
        title: "Overall Risk",
        value: data?.overall_risk || "N/A",
        color:
          data?.overall_risk === "High"
            ? "bg-red-500"
            : data?.overall_risk === "Medium"
            ? "bg-orange-500"
            : "bg-green-500",
        description: "Calculated from clause-level scoring",
      },
      {
        title: "Total Clauses",
        value: clauses.length,
        color: "bg-gray-200",
        description: "Identified & analyzed",
      },
      {
        title: "High Risk Items",
        value: data?.high_risk_items || 0,
        color: "bg-red-100",
        description: "Need immediate attention",
      },
      {
        title: "Risk Score",
        value: `${data?.risk_score || 0}/10`,
        color: "bg-blue-100",
        description: "Weighted normalized score",
      },
    ];
  }, [data, clauses]);

  if (!data) {
    return <div className="text-gray-500">Analyzing document...</div>;
  }

  return (
    <div>

      {/* ================= Document Overview ================= */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Document Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryData.map((item, index) => (
            <div key={index} className="bg-white rounded-lg border p-4">

              <div className="flex items-center mb-2">

                {/* Icons preserved exactly same logic */}
                {item.title === "Overall Risk" && (
                  <div className={`p-2 rounded-md ${item.color} text-white`}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd"
                        d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001z"
                        clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                {item.title === "Total Clauses" && (
                  <div className={`p-2 rounded-md ${item.color}`}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </div>
                )}

                {item.title === "High Risk Items" && (
                  <div className={`p-2 rounded-md ${item.color} text-red-600`}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                )}

                {item.title === "Risk Score" && (
                  <div className={`p-2 rounded-md ${item.color} text-blue-600`}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2z" />
                    </svg>
                  </div>
                )}

              </div>

              <div className="mt-2">
                <h3 className="text-gray-500 text-sm">{item.title}</h3>
                <p className="text-2xl font-bold">{item.value}</p>
                <p className="text-gray-500 text-xs mt-1">{item.description}</p>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* ================= Risk Distribution ================= */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Risk Distribution
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={riskData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {riskData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>

              <Tooltip formatter={(value) => [`${value} clauses`, "Count"]} />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default RiskAnalysis;