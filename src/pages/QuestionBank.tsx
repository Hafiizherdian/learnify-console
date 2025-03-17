
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Plus, 
  Filter, 
  SortAsc, 
  SortDesc, 
  Download, 
  FileQuestion,
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Copy,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';

// Mock data for questions
const questionsData = [
  {
    id: '1',
    title: 'What is the capital of France?',
    category: 'Geography',
    difficulty: 'Easy',
    type: 'Multiple Choice',
    createdAt: '2023-06-10T10:30:00.000Z',
    status: 'Active',
  },
  {
    id: '2',
    title: 'How does photosynthesis work in plants?',
    category: 'Biology',
    difficulty: 'Medium',
    type: 'Essay',
    createdAt: '2023-06-09T14:15:00.000Z',
    status: 'Active',
  },
  {
    id: '3',
    title: 'Solve for x: 2x + 5 = 15',
    category: 'Mathematics',
    difficulty: 'Easy',
    type: 'Fill in the blank',
    createdAt: '2023-06-08T09:45:00.000Z',
    status: 'Draft',
  },
  {
    id: '4',
    title: 'What causes earthquakes and how are they measured?',
    category: 'Geology',
    difficulty: 'Medium',
    type: 'Multiple Choice',
    createdAt: '2023-06-07T16:20:00.000Z',
    status: 'Active',
  },
  {
    id: '5',
    title: 'Explain the concept of supply and demand in economics',
    category: 'Economics',
    difficulty: 'Hard',
    type: 'Essay',
    createdAt: '2023-06-06T11:10:00.000Z',
    status: 'Active',
  },
  {
    id: '6',
    title: 'What are the main causes of World War II?',
    category: 'History',
    difficulty: 'Medium',
    type: 'Multiple Choice',
    createdAt: '2023-06-05T13:40:00.000Z',
    status: 'Draft',
  },
  {
    id: '7',
    title: 'How does the human circulatory system work?',
    category: 'Biology',
    difficulty: 'Medium',
    type: 'Multiple Choice',
    createdAt: '2023-06-04T09:30:00.000Z',
    status: 'Active',
  },
  {
    id: '8',
    title: 'What is the significance of Shakespeare\'s "Hamlet"?',
    category: 'Literature',
    difficulty: 'Hard',
    type: 'Essay',
    createdAt: '2023-06-03T15:50:00.000Z',
    status: 'Active',
  },
];

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const QuestionBank = () => {
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSelectAll = () => {
    if (selectedQuestions.length === questionsData.length) {
      setSelectedQuestions([]);
    } else {
      setSelectedQuestions(questionsData.map(q => q.id));
    }
  };
  
  const handleSelect = (id: string) => {
    if (selectedQuestions.includes(id)) {
      setSelectedQuestions(selectedQuestions.filter(qId => qId !== id));
    } else {
      setSelectedQuestions([...selectedQuestions, id]);
    }
  };
  
  const filteredQuestions = questionsData.filter(question => 
    question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    question.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input 
            placeholder="Search questions..." 
            className="pl-9 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex gap-1">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <Button variant="outline" size="sm" className="flex gap-1">
            <SortAsc className="h-4 w-4" />
            <span className="hidden sm:inline">Sort</span>
          </Button>
          <Button size="sm" className="flex gap-1 bg-brand-blue hover:bg-brand-blue/90">
            <Plus className="h-4 w-4" />
            <span>New Question</span>
          </Button>
        </div>
      </div>
      
      {selectedQuestions.length > 0 && (
        <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-brand-blue">
            <span className="font-medium">{selectedQuestions.length}</span> questions selected
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-brand-blue text-brand-blue hover:text-brand-blue hover:bg-blue-50">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button variant="destructive" size="sm">
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      )}
      
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="w-[40px] px-4 py-3 text-left">
                    <Checkbox 
                      checked={selectedQuestions.length === questionsData.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-sm text-gray-600">Question</th>
                  <th className="px-4 py-3 text-left font-medium text-sm text-gray-600">Category</th>
                  <th className="px-4 py-3 text-left font-medium text-sm text-gray-600">Difficulty</th>
                  <th className="px-4 py-3 text-left font-medium text-sm text-gray-600">Type</th>
                  <th className="px-4 py-3 text-left font-medium text-sm text-gray-600">Created</th>
                  <th className="px-4 py-3 text-left font-medium text-sm text-gray-600">Status</th>
                  <th className="w-[60px]"></th>
                </tr>
              </thead>
              <tbody>
                {filteredQuestions.map(question => (
                  <tr key={question.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <Checkbox 
                        checked={selectedQuestions.includes(question.id)}
                        onCheckedChange={() => handleSelect(question.id)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FileQuestion className="h-5 w-5 text-gray-400" />
                        <span className="font-medium text-gray-800">{question.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {question.category}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={
                        question.difficulty === 'Easy' 
                          ? 'bg-green-50 text-green-700 border-green-200' 
                          : question.difficulty === 'Medium'
                            ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                            : 'bg-red-50 text-red-700 border-red-200'
                      }>
                        {question.difficulty}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{question.type}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{formatDate(question.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <div className={`h-2 w-2 rounded-full ${
                          question.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}></div>
                        <span className="text-sm text-gray-600">{question.status}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Pencil className="h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Copy className="h-4 w-4" />
                            <span>Duplicate</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionBank;
