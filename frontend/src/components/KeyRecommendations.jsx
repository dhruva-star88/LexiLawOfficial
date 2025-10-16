import React from 'react';
const KeyRecommendations = () => {
  const recommendations = [{
    id: 1,
    title: "Legal Review:",
    content: "Both parties should have this agreement reviewed by a lawyer specializing in property law in Karnataka to ensure compliance with the Karnataka Rent Act and to understand their rights and obligations fully."
  }, {
    id: 2,
    title: "Potential Risks:",
    content: "Watch out for ambiguities in the \"minor repairs\" clause. Clearly define what constitutes \"structural repairs\" versus \"minor repairs\" to avoid future disputes."
  }, {
    id: 3,
    title: "Next Steps:",
    content: "The Tenant should conduct a thorough inspection of the property before moving in and document any existing damages."
  }];
  return <div>
      <div className="flex items-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <h2 className="text-xl font-semibold text-gray-800 ml-2">Key Recommendations</h2>
      </div>
      <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
        <ul className="space-y-4">
          <li className="text-gray-700">
            <span className="font-medium">SECTION:**</span>
          </li>
          {recommendations.map(rec => <li key={rec.id} className="flex space-x-2">
              <span className="font-medium text-gray-700">{rec.id}. **{rec.title}**</span>
              <span className="text-gray-700">{rec.content}</span>
            </li>)}
        </ul>
      </div>
    </div>;
};
export default KeyRecommendations;