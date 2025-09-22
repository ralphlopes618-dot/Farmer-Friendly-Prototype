import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Button from './Button';

const GuidedTour = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [targetElement, setTargetElement] = useState(null);

  const tourSteps = [
    {
      target: '[data-tour="navigation"]',
      title: 'Navigation Menu',
      content: 'Use this menu to access all features. On mobile, tap the menu icon in the top right.',
      position: 'right'
    },
    {
      target: '[data-tour="language-switcher"]',
      title: 'Language Settings',
      content: 'Change the app language to Hindi, Telugu, or English for better understanding.',
      position: 'bottom'
    },
    {
      target: '[data-tour="yield-prediction"]',
      title: 'Yield Prediction',
      content: 'Get accurate crop yield estimates based on your soil type, region, and crop selection.',
      position: 'top'
    },
    {
      target: '[data-tour="crop-recommendation"]',
      title: 'Crop Recommendation',
      content: 'Find the best crops to grow based on your soil conditions and local climate.',
      position: 'top'
    },
    {
      target: '[data-tour="disease-detection"]',
      title: 'Disease Detection',
      content: 'Upload photos of your plants to identify diseases and get treatment recommendations.',
      position: 'top'
    },
    {
      target: '[data-tour="chatbot"]',
      title: 'AI Assistant',
      content: 'Ask questions anytime! The chatbot can help with farming advice in your preferred language.',
      position: 'left'
    }
  ];

  useEffect(() => {
    if (isOpen && currentStep < tourSteps.length) {
      const element = document.querySelector(tourSteps[currentStep].target);
      setTargetElement(element);
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [isOpen, currentStep]);

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getTooltipPosition = () => {
    if (!targetElement) return { top: '50%', left: '50%' };
    
    const rect = targetElement.getBoundingClientRect();
    const step = tourSteps[currentStep];
    
    switch (step.position) {
      case 'top':
        return {
          top: rect.top - 20,
          left: rect.left + rect.width / 2,
          transform: 'translate(-50%, -100%)'
        };
      case 'bottom':
        return {
          top: rect.bottom + 20,
          left: rect.left + rect.width / 2,
          transform: 'translate(-50%, 0%)'
        };
      case 'left':
        return {
          top: rect.top + rect.height / 2,
          left: rect.left - 20,
          transform: 'translate(-100%, -50%)'
        };
      case 'right':
        return {
          top: rect.top + rect.height / 2,
          left: rect.right + 20,
          transform: 'translate(0%, -50%)'
        };
      default:
        return {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        };
    }
  };

  if (!isOpen || currentStep >= tourSteps.length) return null;

  const step = tourSteps[currentStep];

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      
      {/* Highlight */}
      {targetElement && (
        <div
          className="absolute border-4 border-green-400 rounded-lg pointer-events-none"
          style={{
            top: targetElement.getBoundingClientRect().top - 4,
            left: targetElement.getBoundingClientRect().left - 4,
            width: targetElement.getBoundingClientRect().width + 8,
            height: targetElement.getBoundingClientRect().height + 8,
          }}
        />
      )}

      {/* Tooltip */}
      <div
        className="absolute z-10 bg-white rounded-lg shadow-lg p-6 max-w-sm"
        style={getTooltipPosition()}
      >
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">
            {step.title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 ml-4"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <p className="text-gray-600 mb-4">
          {step.content}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {currentStep + 1} of {tourSteps.length}
          </div>
          
          <div className="flex space-x-2">
            {currentStep > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={prevStep}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
            )}
            
            <Button
              variant="primary"
              size="sm"
              onClick={nextStep}
            >
              {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
              {currentStep < tourSteps.length - 1 && (
                <ArrowRight className="h-4 w-4 ml-1" />
              )}
            </Button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default GuidedTour;