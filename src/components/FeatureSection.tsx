import React from 'react';
import FeatureCard from './FeatureCard';
import { EyeIcon, SearchIcon, AlertTriangleIcon, MessageSquareIcon, LayoutIcon, ShieldIcon } from 'lucide-react';
const FeatureSection: React.FC = () => {
  const features = [{
    icon: <EyeIcon size={24} />,
    title: 'OCR Technology',
    description: 'Extract text from PDFs, images, and scanned documents with Google Document AI precision'
  }, {
    icon: <SearchIcon size={24} />,
    title: 'Clause Extraction',
    description: 'Automatically identify and categorize key clauses, terms, and conditions in your documents'
  }, {
    icon: <AlertTriangleIcon size={24} />,
    title: 'Risk Assessment',
    description: 'AI-powered risk scoring helps you identify potential issues before they become problems'
  }, {
    icon: <MessageSquareIcon size={24} />,
    title: 'AI Chat Assistant',
    description: 'Ask questions about your documents and get instant, intelligent responses powered by Gemini'
  }, {
    icon: <LayoutIcon size={24} />,
    title: 'Interactive Results',
    description: 'Explore findings in a comprehensive table with PDF highlighting and visual risk indicators'
  }, {
    icon: <ShieldIcon size={24} />,
    title: 'Secure Processing',
    description: 'Enterprise-grade security ensures your sensitive documents remain private and protected'
  }];
  return <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            Powerful Features
          </h2>
          <p className="text-gray-600 mt-2 md:mt-0">
            Everything you need to understand and analyze legal documents
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />)}
        </div>
      </div>
    </section>;
};
export default FeatureSection;