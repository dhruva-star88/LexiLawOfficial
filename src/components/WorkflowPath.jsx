import React from 'react';
const WorkflowPath = ({
  title,
  description,
  steps,
  color
}) => {
  const getColorClass = colorName => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-500',
        light: 'bg-blue-100',
        icon: 'text-blue-500'
      },
      green: {
        bg: 'bg-green-50',
        text: 'text-green-700',
        border: 'border-green-500',
        light: 'bg-green-100',
        icon: 'text-green-500'
      },
      purple: {
        bg: 'bg-purple-50',
        text: 'text-purple-700',
        border: 'border-purple-500',
        light: 'bg-purple-100',
        icon: 'text-purple-500'
      }
    };
    return colorMap[colorName] || colorMap.blue;
  };
  const colors = getColorClass(color);
  return <div className="rounded-lg overflow-hidden shadow-sm border border-gray-200">
      <div className={`p-6 ${colors.bg}`}>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start">
          {steps.map((step, index) => <div key={index} className="flex flex-1 md:flex-col items-start">
              <div className="flex items-center mb-4 md:mb-0 md:flex-col md:items-center">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full ${colors.light} ${colors.icon} flex items-center justify-center font-bold text-xl`}>
                  {index + 1}
                </div>
                {index < steps.length - 1 && <div className="hidden md:block h-12 w-px my-2 border-l-2 border-dashed border-gray-300"></div>}
                {index < steps.length - 1 && <div className="md:hidden w-12 h-px mx-2 border-t-2 border-dashed border-gray-300"></div>}
              </div>
              <div className="ml-4 md:ml-0 md:text-center md:mt-2 flex-1 pb-6 md:pb-0">
                <h4 className={`font-semibold ${colors.text} mb-1`}>{step.title}</h4>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};
export default WorkflowPath;