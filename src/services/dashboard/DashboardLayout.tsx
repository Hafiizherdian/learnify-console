
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardLayout = () => {
  return (
    <div className="space-y-4">
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-gray-800">Layanan Dasbor</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-4">Visualisasi data dan statistik pertanyaan Anda</p>
          <Outlet />
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardLayout;
