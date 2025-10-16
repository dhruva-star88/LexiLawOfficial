import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const ClauseBreakdown = () => {
  const [riskLevel, setRiskLevel] = useState('All Risk Levels');
  const [clauseType, setClauseType] = useState('All Clause Types');
  const clauseData = [{
    name: 'Other',
    count: 13
  }, {
    name: 'Termination',
    count: 5
  }, {
    name: 'Payment',
    count: 4
  }, {
    name: 'Liability',
    count: 1
  }, {
    name: 'Governing Law',
    count: 2
  }];
  const clauseDetails = [{
    id: 'C-0001',
    type: 'Other',
    title: 'RENTAL AGREEMENT',
    riskLevel: 'WHITE',
    score: '0.20'
  }, {
    id: 'C-0002',
    type: 'Other',
    title: 'This Rental Agreement ("Agreement") is executed on this 21st day of September, 2025 at Bengaluru, India, between Mr. Rajesh Kumar ("Landlord")...',
    riskLevel: 'WHITE',
    score: '0.20'
  }, {
    id: 'C-0003',
    type: 'Other',
    title: 'Property Details',
    riskLevel: 'WHITE',
    score: '0.20'
  }, {
    id: 'C-0004',
    type: 'Other',
    title: 'Rent and Payment Terms',
    riskLevel: 'YELLOW',
    score: '0.45'
  }];
  return <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Clause Breakdown</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={clauseData} margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={value => [`${value} clauses`, 'Count']} />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Detailed Clause Analysis</h2>
        <div className="flex justify-between mb-4">
          <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={riskLevel} onChange={e => setRiskLevel(e.target.value)}>
            <option>All Risk Levels</option>
            <option>High Risk</option>
            <option>Medium-High</option>
            <option>Medium</option>
            <option>Low Risk</option>
          </select>
          <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={clauseType} onChange={e => setClauseType(e.target.value)}>
            <option>All Clause Types</option>
            <option>Other</option>
            <option>Termination</option>
            <option>Payment</option>
            <option>Liability</option>
            <option>Governing Law</option>
          </select>
        </div>
        <div className="space-y-4">
          {clauseDetails.map(clause => <div key={clause.id} className="border-l-4 border-green-500 bg-white p-4 rounded-r shadow-sm">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="text-gray-500 font-medium">
                    {clause.type}
                  </div>
                  <div className="ml-2 text-xs text-gray-400">
                    {clause.id}
                  </div>
                </div>
                <div className="flex items-center">
                  <span className={`px-2 py-1 text-xs rounded ${clause.riskLevel === 'WHITE' ? 'bg-gray-100 text-gray-600' : 'bg-yellow-100 text-yellow-600'}`}>
                    {clause.riskLevel}
                  </span>
                  <span className="ml-2 text-sm">Score: {clause.score}</span>
                </div>
              </div>
              <div className="mt-2 text-gray-700 text-sm line-clamp-1">
                {clause.title}
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};
export default ClauseBreakdown;