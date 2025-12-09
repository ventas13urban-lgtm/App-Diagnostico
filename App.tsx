import React, { useState } from 'react';
import Layout from './components/Layout';
import Step1Size from './components/Step1Size';
import Step2Industry from './components/Step2Industry';
import Step3Spend from './components/Step3Spend';
import Step4Digital from './components/Step4Digital';
import Step5Results from './components/Step5Results';
import Step6Booking from './components/Step6Booking';
import { DiagnosticState } from './types';
import { TOTAL_STEPS } from './constants';

const INITIAL_STATE: DiagnosticState = {
  step: 0,
  companySize: 4, // Default: 4 empleados
  selectedIndustry: null, // Default: Ninguno
  adSpend: 0, // Default: 0 pesos
  digitalPercent: 50, // Default: 50%
  bookingDate: null,
  bookingTime: null,
};

const App: React.FC = () => {
  const [state, setState] = useState<DiagnosticState>(INITIAL_STATE);

  const updateState = (updates: Partial<DiagnosticState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    setState((prev) => ({ ...prev, step: Math.min(prev.step + 1, TOTAL_STEPS - 1) }));
  };

  const handleBack = () => {
    setState((prev) => ({ ...prev, step: Math.max(prev.step - 1, 0) }));
  };

  const renderStep = () => {
    const props = {
      state,
      updateState,
      onNext: handleNext,
      onBack: handleBack,
    };

    // key={state.step} forces the component to remount, triggering the entry animation
    switch (state.step) {
      case 0:
        return <Step1Size key={0} {...props} />;
      case 1:
        return <Step2Industry key={1} {...props} />;
      case 2:
        return <Step3Spend key={2} {...props} />;
      case 3:
        return <Step4Digital key={3} {...props} />;
      case 4:
        return <Step5Results key={4} {...props} />;
      case 5:
        return <Step6Booking key={5} {...props} />;
      default:
        return <div>Error: Unknown step</div>;
    }
  };

  return (
    <Layout step={state.step} totalSteps={TOTAL_STEPS}>
      {renderStep()}
    </Layout>
  );
};

export default App;