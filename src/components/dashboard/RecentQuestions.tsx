
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { getRecentQuestions, RecentQuestion } from '@/services/data/api';

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    month: 'short',
    day: 'numeric',
  });
};

const getDifficultyClass = (difficulty: string) => {
  switch(difficulty.toLowerCase()) {
    case 'mudah':
    case 'easy':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'sedang':
    case 'medium':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    case 'sulit':
    case 'hard':
      return 'bg-red-50 text-red-700 border-red-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

const RecentQuestions = () => {
  const { data: recentQuestions, isLoading, error } = useQuery({
    queryKey: ['recentQuestions'],
    queryFn: getRecentQuestions,
    retry: 2,
    staleTime: 5 * 60 * 1000, // Data dianggap segar selama 5 menit
  });

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Pertanyaan Terbaru</CardTitle>
        <Link to="/questions">
          <Button variant="ghost" className="text-sm text-brand-blue">Lihat semua</Button>
        </Link>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center p-6">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : error ? (
          <div className="text-center p-6 text-gray-500">
            Gagal memuat pertanyaan terbaru.
          </div>
        ) : (
          <div className="space-y-4">
            {recentQuestions?.map((question: RecentQuestion) => (
              <div key={question.id} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{question.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                      {question.category}
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${getDifficultyClass(question.difficulty)}`}>
                      {question.difficulty}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {formatDate(question.createdAt)}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" asChild>
                  <Link to={`/questions/${question.id}/edit`}>
                    <Pencil className="h-4 w-4 text-gray-500" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentQuestions;
