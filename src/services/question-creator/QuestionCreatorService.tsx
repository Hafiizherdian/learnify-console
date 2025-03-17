
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import QuestionCreatorLayout from './QuestionCreatorLayout';
import CreateQuestion from '@/pages/CreateQuestion';

const QuestionCreatorService = () => {
  return (
    <Routes>
      <Route path="/" element={<QuestionCreatorLayout />}>
        <Route index element={<CreateQuestion />} />
      </Route>
    </Routes>
  );
};

export default QuestionCreatorService;
