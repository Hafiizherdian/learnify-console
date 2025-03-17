
import React from 'react';
import StatsCard from '@/components/dashboard/StatsCard';
import ActivityChart from '@/components/dashboard/ActivityChart';
import CategoryDistribution from '@/components/dashboard/CategoryDistribution';
import RecentQuestions from '@/components/dashboard/RecentQuestions';
import { FileQuestion, PieChart, Brain, Target } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Questions" 
          value="245" 
          icon={<FileQuestion className="h-5 w-5" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard 
          title="Categories" 
          value="18" 
          icon={<PieChart className="h-5 w-5" />}
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard 
          title="AI Generated" 
          value="78" 
          icon={<Brain className="h-5 w-5" />}
          description="32% of total questions"
        />
        <StatsCard 
          title="Difficulty Levels" 
          value="3" 
          icon={<Target className="h-5 w-5" />}
          description="Easy, Medium, Hard"
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
