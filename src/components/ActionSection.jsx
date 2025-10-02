import React from 'react';
import ActionCard from './ActionCard';
import { UploadIcon, MessageCircleIcon, UsersIcon } from 'lucide-react';
const ActionSection = () => {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <ActionCard icon={<UploadIcon size={32} />} title="Document Upload & Analysis" description="Upload legal documents for AI-powered analysis and comprehensive risk assessment" features={['OCR Processing', 'AI Analysis', 'Interactive Summary']} buttonText="Upload Document" />
          <ActionCard icon={<MessageCircleIcon size={32} />} title="General Legal Bot" description="Get instant answers to your legal questions with our advanced AI assistant" features={['Ask Questions', 'Legal Guidance', 'LLM Responses']} buttonText="Ask Questions" />
          <ActionCard icon={<UsersIcon size={32} />} title="Lawyer Booking" description="Browse and book consultations with qualified legal professionals in your area" features={['Browse Profiles', 'Check Availability', 'Book Consultation']} buttonText="Find Lawyers" />
        </div>
      </div>
    </section>;
};
export default ActionSection;