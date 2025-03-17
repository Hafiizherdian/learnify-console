
import React, { useEffect, useState } from 'react';
import StatsCard from '@/components/dashboard/StatsCard';
import ActivityChart from '@/components/dashboard/ActivityChart';
import CategoryDistribution from '@/components/dashboard/CategoryDistribution';
import RecentQuestions from '@/components/dashboard/RecentQuestions';
import { FileQuestion, PieChart, Brain, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getDashboardStats, DashboardStats } from '@/services/data/api';
import { useQuery } from '@tanstack/react-query';

const Dashboard = () => {
  const { toast } = useToast();
  
  // Menggunakan React Query untuk mengambil data statistik dashboard
  const { data: statsData, isLoading, error } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: getDashboardStats,
    retry: 2,
    staleTime: 5 * 60 * 1000, // Data dianggap segar selama 5 menit
  });

  // Menampilkan error toast jika terjadi kesalahan
  useEffect(() => {
    if (error) {
      toast({
        title: 'Terjadi Kesalahan',
        description: 'Gagal memuat data dashboard. Menggunakan data sampel.',
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Pertanyaan" 
          value={isLoading ? "..." : statsData?.totalQuestions.toString() || "245"} 
          icon={<FileQuestion className="h-5 w-5" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard 
          title="Kategori" 
          value={isLoading ? "..." : statsData?.categories.toString() || "18"} 
          icon={<PieChart className="h-5 w-5" />}
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard 
          title="Dibuat oleh AI" 
          value={isLoading ? "..." : statsData?.aiGenerated.toString() || "78"} 
          icon={<Brain className="h-5 w-5" />}
          description="32% dari total pertanyaan"
        />
        <StatsCard 
          title="Tingkat Kesulitan" 
          value={isLoading ? "..." : statsData?.difficultyLevels.toString() || "3"} 
          icon={<Target className="h-5 w-5" />}
          description="Mudah, Sedang, Sulit"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ActivityChart />
        <CategoryDistribution />
      </div>
      
      <RecentQuestions />
    </div>
  );
};

export default Dashboard;
