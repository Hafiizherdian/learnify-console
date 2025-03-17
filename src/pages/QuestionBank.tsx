
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Search, Filter, Trash2, Pencil, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  text: string;
  type: 'multipleChoice' | 'trueFalse' | 'openEnded';
  options: Option[];
  explanation: string;
  category: string;
  subcategory: string;
  difficulty: string;
  points: number;
  tags: string[];
  createdAt: Date;
  trueAnswer?: boolean;
  modelAnswer?: string;
}

const QuestionBank = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Load questions from localStorage on component mount
  useEffect(() => {
    const storedQuestions = localStorage.getItem('questions');
    if (storedQuestions) {
      try {
        const parsedQuestions = JSON.parse(storedQuestions);
        // Convert string dates to Date objects
        const questionsWithDates = parsedQuestions.map((q: any) => ({
          ...q,
          createdAt: new Date(q.createdAt)
        }));
        setQuestions(questionsWithDates);
      } catch (error) {
        console.error('Error parsing questions:', error);
        toast({
          title: 'Error',
          description: 'Gagal memuat pertanyaan.',
          variant: 'destructive',
        });
      }
    }
  }, [toast]);

  // Filter questions based on search and filters
  const filteredQuestions = questions.filter(question => {
    const matchesSearch = 
      question.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = 
      categoryFilter === 'all' || question.category === categoryFilter;
    
    const matchesDifficulty = 
      difficultyFilter === 'all' || question.difficulty === difficultyFilter;
    
    const matchesType = 
      typeFilter === 'all' || question.type === typeFilter;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesType;
  });

  // Delete a question
  const handleDeleteQuestion = (id: string) => {
    const updatedQuestions = questions.filter(q => q.id !== id);
    setQuestions(updatedQuestions);
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
    
    toast({
      title: 'Pertanyaan Dihapus',
      description: 'Pertanyaan telah berhasil dihapus.',
    });
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Get question type display text
  const getQuestionTypeText = (type: string) => {
    switch (type) {
      case 'multipleChoice':
        return 'Pilihan Ganda';
      case 'trueFalse':
        return 'Benar/Salah';
      case 'openEnded':
        return 'Uraian';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-bold text-gray-800">Bank Pertanyaan</h1>
        <Button 
          className="flex items-center gap-2"
          onClick={() => navigate('/create')}
        >
          <PlusCircle className="h-4 w-4" />
          <span>Buat Pertanyaan</span>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Cari & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Cari pertanyaan..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  <SelectItem value="mathematics">Matematika</SelectItem>
                  <SelectItem value="science">Sains</SelectItem>
                  <SelectItem value="language">Bahasa</SelectItem>
                  <SelectItem value="history">Sejarah</SelectItem>
                  <SelectItem value="geography">Geografi</SelectItem>
                  <SelectItem value="other">Lainnya</SelectItem>
                </SelectContent>
              </Select>

              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Kesulitan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tingkat</SelectItem>
                  <SelectItem value="easy">Mudah</SelectItem>
                  <SelectItem value="medium">Sedang</SelectItem>
                  <SelectItem value="hard">Sulit</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Tipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tipe</SelectItem>
                  <SelectItem value="multipleChoice">Pilihan Ganda</SelectItem>
                  <SelectItem value="trueFalse">Benar/Salah</SelectItem>
                  <SelectItem value="openEnded">Uraian</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Pertanyaan</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Kesulitan</TableHead>
                <TableHead>Dibuat</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuestions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    {questions.length === 0 ? (
                      <div className="flex flex-col items-center gap-2">
                        <p>Belum ada pertanyaan. Buat pertanyaan pertama Anda!</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => navigate('/create')}
                          className="mt-2"
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Buat Pertanyaan
                        </Button>
                      </div>
                    ) : (
                      "Tidak ada pertanyaan yang sesuai dengan kriteria pencarian Anda."
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                filteredQuestions.map((question) => (
                  <TableRow key={question.id}>
                    <TableCell className="font-medium">
                      <div className="truncate max-w-xs">{question.text}</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {question.tags.slice(0, 3).map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {question.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{question.tags.length - 3} lainnya
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getQuestionTypeText(question.type)}</TableCell>
                    <TableCell>
                      <div className="capitalize">{question.category}</div>
                      {question.subcategory && (
                        <div className="text-xs text-gray-500">{question.subcategory}</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                          question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }
                      >
                        {question.difficulty === 'easy' ? 'Mudah' :
                         question.difficulty === 'medium' ? 'Sedang' :
                         'Sulit'}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(question.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" title="Lihat">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Edit">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteQuestion(question.id)}
                          title="Hapus"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionBank;
