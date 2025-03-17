
import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

// Lazy load services to simulate independent deployments
const DashboardService = lazy(() => import('./dashboard/DashboardService'));
const QuestionBankService = lazy(() => import('./question-bank/QuestionBankService'));
const QuestionCreatorService = lazy(() => import('./question-creator/QuestionCreatorService'));

// Loading fallback component
const ServiceLoading = () => (
  <div className="h-[50vh] w-full flex items-center justify-center">
    <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
    <span className="ml-2 text-gray-600">Memuat layanan mikro...</span>
  </div>
);

const ServiceRouter = () => {
  return (
    <Suspense fallback={<ServiceLoading />}>
      <Routes>
        <Route path="/dashboard/*" element={<DashboardService />} />
        <Route path="/questions/*" element={<QuestionBankService />} />
        <Route path="/create/*" element={<QuestionCreatorService />} />
      </Routes>
    </Suspense>
  );
};

export default ServiceRouter;
