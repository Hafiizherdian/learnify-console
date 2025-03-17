
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getActivityData } from '@/services/data/api';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded shadow-sm text-xs">
        <p className="font-semibold">{`${label}: ${payload[0].value} pertanyaan`}</p>
      </div>
    );
  }
  return null;
};

const ActivityChart = () => {
  const { data: activityData, isLoading, error } = useQuery({
    queryKey: ['activityData'],
    queryFn: getActivityData,
    retry: 2,
    staleTime: 5 * 60 * 1000, // Data dianggap segar selama 5 menit
  });

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Aktivitas Mingguan</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64 text-gray-500">
            Gagal memuat data aktivitas
          </div>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={activityData}
                margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }} 
                  tickLine={false}
                  axisLine={{ stroke: '#EDF2F7' }}
                />
                <YAxis 
                  width={30}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={{fill: 'rgba(236, 240, 243, 0.5)'}}
                />
                <Bar 
                  dataKey="pertanyaan" 
                  fill="#4C6FFF" 
                  radius={[4, 4, 0, 0]}
                  barSize={36}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityChart;
