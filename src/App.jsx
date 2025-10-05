import React, { useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeatureSection from "./components/FeatureSection";
import ActionSection from "./components/ActionSection";
import WorkflowSection from "./components/WorkflowSection";
import BookLawyerSection from "./components/BookLawyerSection";
import Footer from "./components/Footer";

export function App() {
  const bookLawyerRef = useRef(null);
  const actionSectionRef = useRef(null);

  const handleScrollToBooking = () => {
    bookLawyerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToActionSection = () => {
    actionSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar onLawyerBookingClick={handleScrollToBooking} />
      <main className="flex-1">
        <Hero onGetStarted={handleScrollToActionSection} />

        <FeatureSection />

        <div ref={actionSectionRef}>
          <ActionSection onFindLawyerClick={handleScrollToBooking} />
        </div>

        <WorkflowSection />

        <div ref={bookLawyerRef}>
          <BookLawyerSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
