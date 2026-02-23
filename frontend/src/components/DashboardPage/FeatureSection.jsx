import React from 'react';
import FeatureCard from './FeatureCard';
import { EyeIcon, SearchIcon, AlertTriangleIcon, MessageSquareIcon, UsersIcon, CalendarIcon, FileTextIcon, BrainIcon, ZapIcon } from 'lucide-react';
const FeatureSection = () => {
  const features = [{
    icon: <FileTextIcon size={24} />,
    title: 'Document Analysis',
    description: 'Upload and analyze legal documents with AI to extract key information and identify potential issues'
  }, {
    icon: <EyeIcon size={24} />,
    title: 'OCR Technology',
    description: 'Extract text from PDFs, images, and scanned documents with advanced optical character recognition'
  }, {
    icon: <BrainIcon size={24} />,
    title: 'AI Document Analyzer',
    description: 'Our RAG pipeline processes documents to provide comprehensive analysis and insights'
  }, {
    icon: <MessageSquareIcon size={24} />,
    title: 'Legal Bot Assistant',
    description: 'Ask questions about legal matters and get instant, intelligent responses from our AI'
  }, {
    icon: <UsersIcon size={24} />,
    title: 'Lawyer Network',
    description: 'Browse profiles of qualified legal professionals filtered by specialization and availability'
  }, {
    icon: <CalendarIcon size={24} />,
    title: 'Easy Booking',
    description: 'Schedule consultations with lawyers directly through our platform with just a few clicks'
  }, {
    icon: <ZapIcon size={24} />,
    title: 'Interactive Summaries',
    description: 'Review AI-generated document summaries with highlighted key points and risk assessments'
  }, {
    icon: <AlertTriangleIcon size={24} />,
    title: 'Risk Assessment',
    description: 'AI-powered risk scoring helps you identify potential issues before they become problems'
  }, {
    icon: <SearchIcon size={24} />,
    title: 'Clause Extraction',
    description: 'Automatically identify and categorize key clauses, terms, and conditions in your documents'
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />)}
        </div>
      </div>
    </section>;
};
export default FeatureSection;