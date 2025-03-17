
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

// Mock data for recent questions
const recentQuestions = [
  {
    id: '1',
    title: 'What is the capital of France?',
    category: 'Geography',
    difficulty: 'Easy',
    createdAt: '2023-06-10T10:30:00.000Z',
  },
  {
    id: '2',
    title: 'How does photosynthesis work?',
    category: 'Biology',
    difficulty: 'Medium',
    createdAt: '2023-06-09T14:15:00.000Z',
  },
  {
    id: '3',
    title: 'Solve for x: 2x + 5 = 15',
    category: 'Mathematics',
    difficulty: 'Easy',
    createdAt: '2023-06-08T09:45:00.000Z',
  },
  {
    id: '4',
    title: 'What causes earthquakes?',
    category: 'Geology',
    difficulty: 'Medium',
    createdAt: '2023-06-07T16:20:00.000Z',
  }
];

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

const RecentQuestions = () => {
  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Recent Questions</CardTitle>
        <Link to="/questions">
          <Button variant="ghost" className="text-sm text-brand-blue">View all</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentQuestions.map((question) => (
            <div key={question.id} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{question.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                    {question.category}
                  </Badge>
                  <Badge variant="outline" className={`text-xs ${
                    question.difficulty === 'Easy' 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : question.difficulty === 'Medium'
                        ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                        : 'bg-red-50 text-red-700 border-red-200'
                  }`}>
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
      </CardContent>
    </Card>
  );
};

export default RecentQuestions;
