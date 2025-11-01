import React, { useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeatureSection from "./components/FeatureSection";
import ActionSection from "./components/ActionSection";
import WorkflowSection from "./components/WorkflowSection";
import Footer from "./components/Footer";

export function App() {
  const actionSectionRef = useRef(null);

  const handleScrollToActionSection = () => {
    actionSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <Hero onGetStarted={handleScrollToActionSection} />

        <FeatureSection />

        <div ref={actionSectionRef}>
          <ActionSection />
        </div>

        <WorkflowSection />
      </main>

      <Footer />
    </div>
  );
}
