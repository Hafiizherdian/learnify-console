
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import Dashboard from '@/pages/Dashboard';

const DashboardService = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default DashboardService;
