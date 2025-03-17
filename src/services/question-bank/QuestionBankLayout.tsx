
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const QuestionBankLayout = () => {
  return (
    <div className="space-y-4">
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-gray-800">Layanan Bank Pertanyaan</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-4">Kelola dan cari semua pertanyaan Anda</p>
          <Outlet />
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionBankLayout;
