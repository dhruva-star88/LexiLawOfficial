import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureSection from './components/FeatureSection';
import ActionSection from './components/ActionSection';
import WorkflowSection from './components/WorkflowSection';
import BookLawyerSection from './components/BookLawyerSection';
import Footer from './components/Footer';
export function App() {
  return <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeatureSection />
        <ActionSection />
        <WorkflowSection />
        <BookLawyerSection />
      </main>
      <Footer />
    </div>;
}