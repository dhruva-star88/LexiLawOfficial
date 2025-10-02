import React from 'react';
import ActionCard from './ActionCard';
import { UploadIcon, MessageCircleIcon } from 'lucide-react';
const ActionSection: React.FC = () => {
  return <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            Choose Your Action
          </h2>
          <p className="text-gray-600 mt-2 md:mt-0">
            Select what you'd like to do with your legal documents
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <ActionCard icon={<UploadIcon size={32} />} title="Upload & Analyze" description="Upload your legal documents for comprehensive AI analysis and risk assessment" features={['OCR Processing', 'Risk Scoring', 'Clause Extraction']} buttonText="Start Upload" />
          <ActionCard icon={<MessageCircleIcon size={32} />} title="AI Assistant" description="Chat with our AI to get instant answers and insights about your legal documents" features={['Real-time Chat', 'Context Aware', 'Streaming']} buttonText="Start Chat" />
        </div>
      </div>
    </section>;
};
export default ActionSection;