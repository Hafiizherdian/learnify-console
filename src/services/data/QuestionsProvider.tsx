
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Tipe untuk data pertanyaan
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

// Context untuk berbagi data pertanyaan
interface QuestionsContextType {
  questions: Question[];
  addQuestion: (question: Omit<Question, 'id' | 'createdAt'>) => void;
  updateQuestion: (question: Question) => void;
  deleteQuestion: (id: string) => void;
  getQuestionById: (id: string) => Question | undefined;
}

const QuestionsContext = createContext<QuestionsContextType | undefined>(undefined);

export const useQuestions = () => {
  const context = useContext(QuestionsContext);
  if (!context) {
    throw new Error('useQuestions harus digunakan dalam QuestionsProvider');
  }
  return context;
};

interface QuestionsProviderProps {
  children: ReactNode;
}

export const QuestionsProvider = ({ children }: QuestionsProviderProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);

  // Load questions from localStorage on mount
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
      }
    }
  }, []);

  // Save questions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('questions', JSON.stringify(questions));
  }, [questions]);

  const addQuestion = (questionData: Omit<Question, 'id' | 'createdAt'>) => {
    const newQuestion = {
      ...questionData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    
    setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
  };

  const updateQuestion = (updatedQuestion: Question) => {
    setQuestions(prevQuestions => 
      prevQuestions.map(q => 
        q.id === updatedQuestion.id ? updatedQuestion : q
      )
    );
  };

  const deleteQuestion = (id: string) => {
    setQuestions(prevQuestions => 
      prevQuestions.filter(q => q.id !== id)
    );
  };

  const getQuestionById = (id: string) => {
    return questions.find(q => q.id === id);
  };

  const value = {
    questions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    getQuestionById
  };

  return (
    <QuestionsContext.Provider value={value}>
      {children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsProvider;
