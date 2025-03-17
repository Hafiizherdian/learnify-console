
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Trash2, Wand2, Save, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Define the question structure
interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuestionData {
  id?: string;
  text: string;
  type: 'multipleChoice' | 'trueFalse' | 'openEnded';
  options: Option[];
  explanation: string;
  category: string;
  subcategory: string;
  difficulty: string;
  points: number;
  tags: string[];
  createdAt?: Date;
  trueAnswer?: boolean; // for true/false questions
  modelAnswer?: string; // for open-ended questions
}

const CreateQuestion = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Initialize with default values
  const [questionData, setQuestionData] = useState<QuestionData>({
    text: '',
    type: 'multipleChoice',
    options: [
      { id: '1', text: '', isCorrect: true },
      { id: '2', text: '', isCorrect: false },
      { id: '3', text: '', isCorrect: false },
      { id: '4', text: '', isCorrect: false },
    ],
    explanation: '',
    category: 'mathematics',
    subcategory: '',
    difficulty: 'medium',
    points: 1,
    tags: [],
  });
  
  // Track if form is valid
  const [isValid, setIsValid] = useState(false);

  // Handle question text changes
  const handleQuestionTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestionData({ ...questionData, text: e.target.value });
  };

  // Handle explanation changes
  const handleExplanationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestionData({ ...questionData, explanation: e.target.value });
  };
  
  // Handle question type changes
  const handleQuestionTypeChange = (value: string) => {
    const newType = value as 'multipleChoice' | 'trueFalse' | 'openEnded';
    
    let newOptions = questionData.options;
    
    // If switching to true/false, reset options
    if (newType === 'trueFalse') {
      newOptions = [
        { id: 'true', text: 'Benar', isCorrect: true },
        { id: 'false', text: 'Salah', isCorrect: false },
      ];
    } 
    // If switching to multiple choice from true/false, reset options
    else if (newType === 'multipleChoice' && questionData.type === 'trueFalse') {
      newOptions = [
        { id: '1', text: '', isCorrect: true },
        { id: '2', text: '', isCorrect: false },
        { id: '3', text: '', isCorrect: false },
        { id: '4', text: '', isCorrect: false },
      ];
    }
    
    setQuestionData({ 
      ...questionData, 
      type: newType,
      options: newOptions,
      trueAnswer: newType === 'trueFalse' ? true : undefined,
      modelAnswer: newType === 'openEnded' ? '' : undefined,
    });
  };

  // Add new option
  const addOption = () => {
    const newOption = { 
      id: String(questionData.options.length + 1), 
      text: '', 
      isCorrect: false 
    };
    
    setQuestionData({
      ...questionData,
      options: [...questionData.options, newOption]
    });
  };

  // Remove option
  const removeOption = (id: string) => {
    if (questionData.options.length <= 2) {
      toast({
        title: "Tidak dapat menghapus pilihan",
        description: "Minimal dua pilihan diperlukan.",
        variant: "destructive",
      });
      return;
    }
    
    setQuestionData({
      ...questionData,
      options: questionData.options.filter(option => option.id !== id)
    });
  };

  // Handle option text changes
  const handleOptionChange = (id: string, text: string) => {
    setQuestionData({
      ...questionData,
      options: questionData.options.map(option => 
        option.id === id ? { ...option, text } : option
      )
    });
  };

  // Handle correct answer changes for multiple choice
  const handleCorrectAnswerChange = (id: string) => {
    setQuestionData({
      ...questionData,
      options: questionData.options.map(option => ({
        ...option,
        isCorrect: option.id === id
      }))
    });
  };
  
  // Handle true/false answer change
  const handleTrueFalseChange = (value: string) => {
    const isTrue = value === 'true';
    setQuestionData({
      ...questionData,
      trueAnswer: isTrue,
      options: [
        { id: 'true', text: 'Benar', isCorrect: isTrue },
        { id: 'false', text: 'Salah', isCorrect: !isTrue },
      ]
    });
  };
  
  // Handle model answer change for open-ended questions
  const handleModelAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestionData({
      ...questionData,
      modelAnswer: e.target.value
    });
  };
  
  // Handle category change
  const handleCategoryChange = (value: string) => {
    setQuestionData({ ...questionData, category: value });
  };
  
  // Handle subcategory change
  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionData({ ...questionData, subcategory: e.target.value });
  };
  
  // Handle difficulty change
  const handleDifficultyChange = (value: string) => {
    setQuestionData({ ...questionData, difficulty: value });
  };
  
  // Handle points change
  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionData({ 
      ...questionData, 
      points: parseInt(e.target.value) || 1 
    });
  };
  
  // Handle tags change
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    setQuestionData({
      ...questionData,
      tags: tagsArray
    });
  };

  // AI generation function (mock for now)
  const handleGenerateQuestion = () => {
    toast({
      title: "Generasi Pertanyaan dengan AI",
      description: "Menghasilkan pertanyaan berdasarkan parameter Anda...",
    });
    
    // Simulate AI generating a question after a delay
    setTimeout(() => {
      const generatedQuestion: QuestionData = {
        text: "Berapakah hasil dari 3 + 4 × 2?",
        type: "multipleChoice",
        options: [
          { id: "1", text: "14", isCorrect: false },
          { id: "2", text: "11", isCorrect: true },
          { id: "3", text: "10", isCorrect: false },
          { id: "4", text: "7", isCorrect: false }
        ],
        explanation: "Sesuai dengan urutan operasi (PEMDAS), perkalian dilakukan sebelum penjumlahan. Jadi, 4 × 2 = 8, kemudian 3 + 8 = 11.",
        category: "mathematics",
        subcategory: "Aritmatika",
        difficulty: "easy",
        points: 1,
        tags: ["aritmatika", "urutan operasi", "matematika dasar"],
      };
      
      setQuestionData(generatedQuestion);
      
      toast({
        title: "Pertanyaan Dihasilkan",
        description: "AI telah menghasilkan contoh pertanyaan untuk Anda.",
      });
    }, 1500);
  };

  // Save question function
  const handleSaveQuestion = () => {
    // Basic validation
    if (!questionData.text.trim()) {
      toast({
        title: "Error Validasi",
        description: "Teks pertanyaan diperlukan.",
        variant: "destructive",
      });
      return;
    }
    
    if (questionData.type === 'multipleChoice') {
      // Check if any option is empty
      const hasEmptyOption = questionData.options.some(option => !option.text.trim());
      if (hasEmptyOption) {
        toast({
          title: "Error Validasi",
          description: "Semua pilihan harus memiliki teks.",
          variant: "destructive",
        });
        return;
      }
      
      // Check if at least one option is marked as correct
      const hasCorrectOption = questionData.options.some(option => option.isCorrect);
      if (!hasCorrectOption) {
        toast({
          title: "Error Validasi",
          description: "Setidaknya satu pilihan harus ditandai sebagai benar.",
          variant: "destructive",
        });
        return;
      }
    }
    
    // For now, simulate saving to a database
    const savedQuestion = {
      ...questionData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    
    // Save to localStorage for persistence
    const existingQuestions = JSON.parse(localStorage.getItem('questions') || '[]');
    localStorage.setItem('questions', JSON.stringify([...existingQuestions, savedQuestion]));
    
    toast({
      title: "Pertanyaan Disimpan",
      description: "Pertanyaan Anda telah berhasil disimpan.",
    });
    
    // Reset form or navigate to question bank
    setTimeout(() => {
      navigate('/questions');
    }, 1000);
  };
  
  // Validate form
  useEffect(() => {
    const isFormValid = !!questionData.text.trim() && (
      (questionData.type === 'multipleChoice' && 
        !questionData.options.some(o => !o.text.trim()) && 
        questionData.options.some(o => o.isCorrect)) ||
      questionData.type === 'trueFalse' ||
      (questionData.type === 'openEnded')
    );
    
    setIsValid(isFormValid);
  }, [questionData]);

  // Preview component
  const QuestionPreview = () => {
    if (!questionData.text) {
      return (
        <p className="text-sm text-gray-500 italic">
          Pratinjau pertanyaan akan muncul di sini saat Anda mengetik...
        </p>
      );
    }
    
    return (
      <div className="space-y-4">
        <h3 className="font-medium">{questionData.text}</h3>
        
        {questionData.type === 'multipleChoice' && (
          <div className="space-y-2">
            {questionData.options.map(option => (
              <div key={option.id} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full border ${option.isCorrect ? 'bg-green-500 border-green-600' : 'border-gray-300'}`}></div>
                <span>{option.text || `[Pilihan ${option.id}]`}</span>
              </div>
            ))}
          </div>
        )}
        
        {questionData.type === 'trueFalse' && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full border ${questionData.trueAnswer ? 'bg-green-500 border-green-600' : 'border-gray-300'}`}></div>
              <span>Benar</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full border ${!questionData.trueAnswer ? 'bg-green-500 border-green-600' : 'border-gray-300'}`}></div>
              <span>Salah</span>
            </div>
          </div>
        )}
        
        {questionData.type === 'openEnded' && (
          <div className="border border-dashed border-gray-300 p-3 rounded-md">
            <p className="text-sm text-gray-500">Area respons terbuka</p>
          </div>
        )}
        
        {questionData.explanation && (
          <div className="mt-4 p-3 bg-blue-50 rounded-md">
            <p className="text-sm font-medium text-blue-800">Penjelasan:</p>
            <p className="text-sm text-blue-700">{questionData.explanation}</p>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mt-4">
          {questionData.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Buat Pertanyaan Baru</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleGenerateQuestion}
          >
            <Wand2 className="h-4 w-4" />
            <span>Hasilkan dengan AI</span>
          </Button>
          <Button 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            onClick={handleSaveQuestion}
            disabled={!isValid}
          >
            <Save className="h-4 w-4" />
            <span>Simpan</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Detail Pertanyaan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question">Teks Pertanyaan</Label>
                <Textarea 
                  id="question" 
                  placeholder="Masukkan pertanyaan Anda di sini..." 
                  className="min-h-[100px]"
                  value={questionData.text}
                  onChange={handleQuestionTextChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Jenis Pertanyaan</Label>
                <Tabs 
                  value={questionData.type} 
                  onValueChange={handleQuestionTypeChange} 
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="multipleChoice">Pilihan Ganda</TabsTrigger>
                    <TabsTrigger value="trueFalse">Benar/Salah</TabsTrigger>
                    <TabsTrigger value="openEnded">Terbuka</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="multipleChoice" className="space-y-4 pt-4">
                    <div className="space-y-4">
                      <Label>Pilihan Jawaban</Label>
                      {questionData.options.map((option) => (
                        <div key={option.id} className="flex items-center gap-3">
                          <RadioGroup 
                            value={questionData.options.find(o => o.isCorrect)?.id || ''}
                            onValueChange={handleCorrectAnswerChange}
                            className="flex items-center"
                          >
                            <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                          </RadioGroup>
                          
                          <Input 
                            placeholder={`Pilihan ${option.id}`}
                            value={option.text}
                            onChange={(e) => handleOptionChange(option.id, e.target.value)}
                            className="flex-1"
                          />
                          
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeOption(option.id)}
                            type="button"
                          >
                            <Trash2 className="h-4 w-4 text-gray-500" />
                          </Button>
                        </div>
                      ))}
                      
                      <Button 
                        variant="outline" 
                        className="w-full mt-2 flex items-center gap-2"
                        onClick={addOption}
                        type="button"
                      >
                        <PlusCircle className="h-4 w-4" />
                        <span>Tambah Pilihan</span>
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="trueFalse" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>Jawaban Benar</Label>
                      <RadioGroup 
                        value={questionData.trueAnswer ? 'true' : 'false'} 
                        onValueChange={handleTrueFalseChange}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="true" />
                          <Label htmlFor="true">Benar</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="false" />
                          <Label htmlFor="false">Salah</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="openEnded" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="answer">Jawaban Model (Opsional)</Label>
                      <Textarea 
                        id="answer" 
                        placeholder="Masukkan jawaban model atau panduan penilaian..." 
                        className="min-h-[100px]"
                        value={questionData.modelAnswer || ''}
                        onChange={handleModelAnswerChange}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Penjelasan (Opsional)</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Berikan penjelasan untuk pertanyaan ini..." 
                className="min-h-[100px]"
                value={questionData.explanation}
                onChange={handleExplanationChange}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Pengaturan Pertanyaan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Select 
                  value={questionData.category}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mathematics">Matematika</SelectItem>
                    <SelectItem value="science">Sains</SelectItem>
                    <SelectItem value="language">Bahasa</SelectItem>
                    <SelectItem value="history">Sejarah</SelectItem>
                    <SelectItem value="geography">Geografi</SelectItem>
                    <SelectItem value="other">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subcategory">Subkategori (Opsional)</Label>
                <Input 
                  id="subcategory" 
                  placeholder="Mis. Aljabar, Sejarah Dunia" 
                  value={questionData.subcategory}
                  onChange={handleSubcategoryChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="difficulty">Tingkat Kesulitan</Label>
                <Select 
                  value={questionData.difficulty}
                  onValueChange={handleDifficultyChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kesulitan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Mudah</SelectItem>
                    <SelectItem value="medium">Sedang</SelectItem>
                    <SelectItem value="hard">Sulit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="points">Poin</Label>
                <Input 
                  id="points" 
                  type="number" 
                  min="1" 
                  step="1"
                  value={questionData.points}
                  onChange={handlePointsChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Tag (Dipisahkan koma)</Label>
                <Input 
                  id="tags" 
                  placeholder="Mis. ujian, latihan, bab1" 
                  value={questionData.tags.join(', ')}
                  onChange={handleTagsChange}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Pratinjau</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 min-h-[200px]">
                <QuestionPreview />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateQuestion;
