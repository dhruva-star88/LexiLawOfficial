import React from 'react';
interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}
const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description
}) => {
  return <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
      <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>;
};
export default FeatureCard;