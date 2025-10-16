import React from 'react';
import WorkflowPath from './WorkflowPath';
const WorkflowSection = () => {
  const documentWorkflow = [{
    title: "Upload Document",
    description: "Securely upload your legal document"
  }, {
    title: "Preprocess Document",
    description: "OCR, segmentation, and embeddings extraction"
  }, {
    title: "AI Analysis",
    description: "Advanced RAG pipeline analyzes document content"
  }, {
    title: "Interactive Summary",
    description: "Review AI-generated insights and summaries"
  }];
  const botWorkflow = [{
    title: "Ask Legal Question",
    description: "Submit your legal query in natural language"
  }, {
    title: "Generate Embedding",
    description: "AI processes your question for context"
  }, {
    title: "LLM Processing",
    description: "Advanced language model analyzes your query"
  }, {
    title: "Get Answer",
    description: "Receive detailed, accurate legal information"
  }];
  const bookingWorkflow = [{
    title: "Browse Lawyers",
    description: "Filter by specialization and location"
  }, {
    title: "View Profiles",
    description: "Check experience, ratings, and availability"
  }, {
    title: "Select Lawyer",
    description: "Choose the best professional for your needs"
  }, {
    title: "Book Consultation",
    description: "Schedule your meeting at a convenient time"
  }];
  return <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform offers three powerful ways to address your legal needs, each with a simple and efficient workflow
          </p>
        </div>
        <div className="space-y-16">
          <WorkflowPath title="Document Upload & Analysis" description="Transform complex legal documents into clear, actionable insights" steps={documentWorkflow} color="blue" />
          <WorkflowPath title="General Legal Bot" description="Get immediate answers to your legal questions from our AI assistant" steps={botWorkflow} color="green" />
          <WorkflowPath title="Lawyer Booking" description="Connect with qualified legal professionals for personalized advice" steps={bookingWorkflow} color="purple" />
        </div>
      </div>
    </section>;
};
export default WorkflowSection;