import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for the context
type CheckoutContextType = {
  step: number;
  subSteps: SubStepsType;
  nextStep: () => void;
  nextSubStep: () => void;
  prevStep: () => void;
  setSubSteps: React.Dispatch<React.SetStateAction<{ [key: number]: number }>>;
};

type SubStepsType = {
  [key: number]: number;
};

// Create the context
const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined,
);

// Provide the context to components
export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(1);
  const [subSteps, setSubSteps] = useState<SubStepsType>({ 0: 0, 1: 0, 2: 0 });

  const nextSubStep = () => {
    setSubSteps((prevSubSteps) => ({
      ...prevSubSteps,
      [step]: prevSubSteps[step] + 1,
    }));
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    if (subSteps[step] > 0) {
      setSubSteps((prev) => ({
        ...prev,
        [step]: prev[step] - 1,
      }));
    } else if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  return (
    <CheckoutContext.Provider
      value={{ step, subSteps, nextStep, nextSubStep, prevStep, setSubSteps }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

// Custom hook to use the Checkout context
export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};
