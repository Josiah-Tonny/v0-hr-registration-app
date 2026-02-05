'use client';

import { Button } from '@/components/ui/button';

export interface WizardStep {
  id: string;
  label: string;
  component: React.ReactNode;
}

interface FormWizardProps {
  steps: WizardStep[];
  onComplete?: (data: any) => void;
  onStepChange?: (stepIndex: number) => void;
}

export function FormWizard({ steps, onComplete, onStepChange }: FormWizardProps) {
  const [currentStep, setCurrentStep] = React.useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      onStepChange?.(nextStep);
    } else {
      onComplete?.({});
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      onStepChange?.(prevStep);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stepper */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <button
              onClick={() => {
                setCurrentStep(index);
                onStepChange?.(index);
              }}
              className={`flex flex-col items-center gap-2 flex-1 ${index === currentStep ? 'opacity-100' : 'opacity-60'}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                index < currentStep
                  ? 'bg-green-500 text-white'
                  : index === currentStep
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600'
              }`}>
                {index < currentStep ? '✓' : index + 1}
              </div>
              <span className="text-xs font-medium text-gray-700 text-center">{step.label}</span>
            </button>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 ${index < currentStep ? 'bg-green-500' : 'bg-gray-200'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 min-h-96">
        {steps[currentStep].component}
      </div>

      {/* Navigation */}
      <div className="flex gap-3 justify-between">
        <Button variant="outline" onClick={handlePrev} disabled={currentStep === 0}>
          Previous
        </Button>
        <div className="text-sm text-gray-600">
          Step {currentStep + 1} of {steps.length}
        </div>
        <Button onClick={handleNext}>
          {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
        </Button>
      </div>
    </div>
  );
}

import React from 'react';
