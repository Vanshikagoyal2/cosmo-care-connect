import { useState } from "react";
import { Hero } from "@/components/Hero";
import { ChatInterface } from "@/components/ChatInterface";

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'chat'>('landing');

  const handleGetStarted = () => {
    setCurrentView('chat');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  return (
    <div className="min-h-screen">
      {currentView === 'landing' ? (
        <Hero onGetStarted={handleGetStarted} />
      ) : (
        <ChatInterface onBack={handleBackToLanding} />
      )}
    </div>
  );
};

export default Index;