
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Question, 
  getAllQuestions, 
  createQuestion, 
  updateQuestion as apiUpdateQuestion, 
  deleteQuestion as apiDeleteQuestion,
  getQuestionById as apiGetQuestionById
} from './api';

// Context untuk berbagi data pertanyaan
interface QuestionsContextType {
  questions: Question[];
  loading: boolean;
  error: string | null;
  addQuestion: (question: Omit<Question, 'id' | 'createdAt'>) => Promise<void>;
  updateQuestion: (question: Question) => Promise<void>;
  deleteQuestion: (id: string) => Promise<void>;
  getQuestionById: (id: string) => Question | undefined;
  refreshQuestions: () => Promise<void>;
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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk mendapatkan semua pertanyaan dari API
  const refreshQuestions = async () => {
    try {
      setLoading(true);
      const data = await getAllQuestions();
      
      // Mengkonversi string dates ke Date objects jika diperlukan
      const questionsWithDates = data.map(q => ({
        ...q,
        createdAt: new Date(q.createdAt)
      }));
      
      setQuestions(questionsWithDates);
      setError(null);
    } catch (err) {
      console.error('Error fetching questions:', err);
      setError('Gagal mengambil data pertanyaan. Menggunakan data lokal.');
      
      // Fallback ke localStorage jika API gagal
      const storedQuestions = localStorage.getItem('questions');
      if (storedQuestions) {
        try {
          const parsedQuestions = JSON.parse(storedQuestions);
          const questionsWithDates = parsedQuestions.map((q: any) => ({
            ...q,
            createdAt: new Date(q.createdAt)
          }));
          setQuestions(questionsWithDates);
        } catch (error) {
          console.error('Error parsing questions from localStorage:', error);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // Load questions on mount
  useEffect(() => {
    refreshQuestions();
  }, []);

  // Fungsi untuk menambahkan pertanyaan baru
  const addQuestion = async (questionData: Omit<Question, 'id' | 'createdAt'>) => {
    try {
      setLoading(true);
      const newQuestion = await createQuestion(questionData);
      
      setQuestions(prevQuestions => [
        ...prevQuestions, 
        {...newQuestion, createdAt: new Date(newQuestion.createdAt)}
      ]);
      
      // Juga update localStorage sebagai backup
      const updatedQuestions = [...questions, newQuestion];
      localStorage.setItem('questions', JSON.stringify(updatedQuestions));
      
    } catch (err) {
      console.error('Error adding question:', err);
      setError('Gagal menambahkan pertanyaan');
      
      // Fallback ke localStorage jika API gagal
      const newQuestion = {
        ...questionData,
        id: crypto.randomUUID(),
        createdAt: new Date(),
      };
      
      setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
      localStorage.setItem('questions', JSON.stringify([...questions, newQuestion]));
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk memperbarui pertanyaan
  const updateQuestion = async (updatedQuestion: Question) => {
    try {
      setLoading(true);
      await apiUpdateQuestion(updatedQuestion);
      
      setQuestions(prevQuestions => 
        prevQuestions.map(q => 
          q.id === updatedQuestion.id ? 
            {...updatedQuestion, createdAt: new Date(updatedQuestion.createdAt)} : 
            q
        )
      );
      
      // Update localStorage sebagai backup
      const updatedQuestions = questions.map(q => 
        q.id === updatedQuestion.id ? updatedQuestion : q
      );
      localStorage.setItem('questions', JSON.stringify(updatedQuestions));
      
    } catch (err) {
      console.error('Error updating question:', err);
      setError('Gagal memperbarui pertanyaan');
      
      // Fallback ke localStorage jika API gagal
      setQuestions(prevQuestions => 
        prevQuestions.map(q => 
          q.id === updatedQuestion.id ? updatedQuestion : q
        )
      );
      
      const updatedQuestions = questions.map(q => 
        q.id === updatedQuestion.id ? updatedQuestion : q
      );
      localStorage.setItem('questions', JSON.stringify(updatedQuestions));
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menghapus pertanyaan
  const deleteQuestion = async (id: string) => {
    try {
      setLoading(true);
      await apiDeleteQuestion(id);
      
      setQuestions(prevQuestions => 
        prevQuestions.filter(q => q.id !== id)
      );
      
      // Update localStorage sebagai backup
      const updatedQuestions = questions.filter(q => q.id !== id);
      localStorage.setItem('questions', JSON.stringify(updatedQuestions));
      
    } catch (err) {
      console.error('Error deleting question:', err);
      setError('Gagal menghapus pertanyaan');
      
      // Fallback ke localStorage jika API gagal
      setQuestions(prevQuestions => 
        prevQuestions.filter(q => q.id !== id)
      );
      
      const updatedQuestions = questions.filter(q => q.id !== id);
      localStorage.setItem('questions', JSON.stringify(updatedQuestions));
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk mendapatkan pertanyaan berdasarkan ID
  const getQuestionById = (id: string) => {
    return questions.find(q => q.id === id);
  };

  const value = {
    questions,
    loading,
    error,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    getQuestionById,
    refreshQuestions
  };

  return (
    <QuestionsContext.Provider value={value}>
      {children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsProvider;
