
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import QuestionBankLayout from './QuestionBankLayout';
import QuestionBank from '@/pages/QuestionBank';

const QuestionBankService = () => {
  return (
    <Routes>
      <Route path="/" element={<QuestionBankLayout />}>
        <Route index element={<QuestionBank />} />
      </Route>
    </Routes>
  );
};

export default QuestionBankService;
