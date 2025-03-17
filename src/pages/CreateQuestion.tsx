
import React, { useState } from 'react';
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

const CreateQuestion = () => {
  const { toast } = useToast();
  const [questionType, setQuestionType] = useState('multipleChoice');
  const [options, setOptions] = useState([
    { id: '1', text: '', isCorrect: true },
    { id: '2', text: '', isCorrect: false },
    { id: '3', text: '', isCorrect: false },
    { id: '4', text: '', isCorrect: false },
  ]);

  const addOption = () => {
    setOptions([
      ...options, 
      { id: String(options.length + 1), text: '', isCorrect: false }
    ]);
  };

  const removeOption = (id: string) => {
    if (options.length <= 2) {
      toast({
        title: "Cannot remove option",
        description: "At least two options are required.",
        variant: "destructive",
      });
      return;
    }
    
    setOptions(options.filter(option => option.id !== id));
  };

  const handleOptionChange = (id: string, text: string) => {
    setOptions(
      options.map(option => 
        option.id === id ? { ...option, text } : option
      )
    );
  };

  const handleCorrectAnswerChange = (id: string) => {
    setOptions(
      options.map(option => ({
        ...option,
        isCorrect: option.id === id
      }))
    );
  };

  const handleGenerateQuestion = () => {
    toast({
      title: "AI Question Generation",
      description: "Generating question based on your parameters...",
    });
  };

  const handleSaveQuestion = () => {
    toast({
      title: "Question Saved",
      description: "Your question has been saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Create New Question</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleGenerateQuestion}
          >
            <Wand2 className="h-4 w-4" />
            <span>Generate with AI</span>
          </Button>
          <Button 
            className="flex items-center gap-2 bg-brand-blue hover:bg-brand-blue/90"
            onClick={handleSaveQuestion}
          >
            <Save className="h-4 w-4" />
            <span>Save</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Question Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question">Question Text</Label>
                <Textarea 
                  id="question" 
                  placeholder="Enter your question here..." 
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Question Type</Label>
                <Tabs defaultValue="multipleChoice" onValueChange={setQuestionType} className="w-full">
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="multipleChoice">Multiple Choice</TabsTrigger>
                    <TabsTrigger value="trueFalse">True/False</TabsTrigger>
                    <TabsTrigger value="openEnded">Open-Ended</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="multipleChoice" className="space-y-4 pt-4">
                    <div className="space-y-4">
                      <Label>Answer Options</Label>
                      {options.map((option) => (
                        <div key={option.id} className="flex items-center gap-3">
                          <RadioGroup 
                            value={options.find(o => o.isCorrect)?.id || ''}
                            onValueChange={handleCorrectAnswerChange}
                            className="flex items-center"
                          >
                            <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                          </RadioGroup>
                          
                          <Input 
                            placeholder={`Option ${option.id}`}
                            value={option.text}
                            onChange={(e) => handleOptionChange(option.id, e.target.value)}
                            className="flex-1"
                          />
                          
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeOption(option.id)}
                          >
                            <Trash2 className="h-4 w-4 text-gray-500" />
                          </Button>
                        </div>
                      ))}
                      
                      <Button 
                        variant="outline" 
                        className="w-full mt-2 flex items-center gap-2"
                        onClick={addOption}
                      >
                        <PlusCircle className="h-4 w-4" />
                        <span>Add Option</span>
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="trueFalse" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>Correct Answer</Label>
                      <RadioGroup defaultValue="true">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="true" />
                          <Label htmlFor="true">True</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="false" />
                          <Label htmlFor="false">False</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="openEnded" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="answer">Model Answer (Optional)</Label>
                      <Textarea 
                        id="answer" 
                        placeholder="Enter a model answer or scoring guide..." 
                        className="min-h-[100px]"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Explanation (Optional)</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Provide an explanation for this question..." 
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Question Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select defaultValue="mathematics">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="language">Language</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="geography">Geography</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subcategory">Subcategory (Optional)</Label>
                <Input id="subcategory" placeholder="E.g., Algebra, World History" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="points">Points</Label>
                <Input 
                  id="points" 
                  type="number" 
                  defaultValue="1" 
                  min="1" 
                  step="1"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (Comma separated)</Label>
                <Input id="tags" placeholder="E.g., exam, practice, chapter1" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Preview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 min-h-[200px]">
                <p className="text-sm text-gray-500 italic">
                  Question preview will appear here as you type...
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateQuestion;
