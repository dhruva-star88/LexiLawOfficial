import React from 'react';
const ActionCard = ({
  icon,
  title,
  description,
  features,
  buttonText
}) => {
  return <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <div className="flex justify-center gap-2 mb-6">
        {features.map((feature, index) => <span key={index} className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full">
            {feature}
          </span>)}
      </div>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md inline-flex items-center transition-colors">
        {buttonText}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14" />
          <path d="M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>;
};
export default ActionCard;