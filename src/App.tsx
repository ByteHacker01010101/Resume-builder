import React, { useState, useEffect } from 'react';
import { FunnelStep, ResumeData, Review } from './types/resume';
import { ThemeProvider } from './contexts/ThemeContext';
import LandingPage from './components/LandingPage';
import ResumeBuilder from './components/ResumeBuilder';
import ThankYouPage from './components/ThankYouPage';
import CoverLetterGenerator from './components/CoverLetterGenerator';

function App() {
  const [currentStep, setCurrentStep] = useState<FunnelStep | 'coverletter'>('landing');
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Load reviews from localStorage on app start
  useEffect(() => {
    const savedReviews = localStorage.getItem('kickresume-reviews');
    if (savedReviews) {
      try {
        const parsed = JSON.parse(savedReviews);
        setReviews(parsed);
      } catch (error) {
        console.error('Error loading reviews:', error);
      }
    }
  }, []);

  const handleGetStarted = () => {
    setCurrentStep('builder');
  };

  const handleBuilderComplete = (data: ResumeData) => {
    setResumeData(data);
    setCurrentStep('thankyou');
  };

  const handleStartOver = () => {
    setCurrentStep('landing');
    setResumeData(null);
  };

  const handleAddReview = (review: Review) => {
    const updatedReviews = [review, ...reviews];
    setReviews(updatedReviews);
    
    // Save to localStorage
    localStorage.setItem('kickresume-reviews', JSON.stringify(updatedReviews));
  };

  const handleGenerateCoverLetter = () => {
    setCurrentStep('coverletter');
  };
  return (
    <ThemeProvider>
      <div className="App">
        {currentStep === 'landing' && (
          <LandingPage 
            onGetStarted={handleGetStarted} 
            reviews={reviews}
          />
        )}
        
        {currentStep === 'builder' && (
          <ResumeBuilder 
            onComplete={handleBuilderComplete}
            onGenerateCoverLetter={resumeData ? handleGenerateCoverLetter : undefined}
          />
        )}
        
        {currentStep === 'thankyou' && (
          <ThankYouPage 
            onStartOver={handleStartOver}
            onAddReview={handleAddReview}
            onGenerateCoverLetter={resumeData ? handleGenerateCoverLetter : undefined}
          />
        )}
        
        {currentStep === 'coverletter' && resumeData && (
          <CoverLetterGenerator 
            resumeData={resumeData}
            onBack={() => setCurrentStep('thankyou')}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;