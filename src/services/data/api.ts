
import axios from 'axios';

// API URLs untuk microservices
const DASHBOARD_API = 'http://localhost:3001/api/dashboard';
const QUESTIONS_API = 'http://localhost:3002/api/questions';
const CREATOR_API = 'http://localhost:3003/api';

// Interface untuk tipe data
export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
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
  createdAt: Date | string;
  trueAnswer?: boolean;
  modelAnswer?: string;
}

export interface DashboardStats {
  totalQuestions: number;
  categories: number;
  aiGenerated: number;
  difficultyLevels: number;
}

export interface ActivityData {
  name: string;
  pertanyaan: number;
}

export interface CategoryData {
  name: string;
  value: number;
}

export interface RecentQuestion {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  createdAt: string;
}

// Dashboard API calls
export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await axios.get(`${DASHBOARD_API}/stats`);
  return response.data;
};

export const getActivityData = async (): Promise<ActivityData[]> => {
  const response = await axios.get(`${DASHBOARD_API}/activity`);
  return response.data;
};

export const getCategoryData = async (): Promise<CategoryData[]> => {
  const response = await axios.get(`${DASHBOARD_API}/categories`);
  return response.data;
};

export const getRecentQuestions = async (): Promise<RecentQuestion[]> => {
  const response = await axios.get(`${DASHBOARD_API}/recent-questions`);
  return response.data;
};

// Question Bank API calls
export const getAllQuestions = async (): Promise<Question[]> => {
  const response = await axios.get(QUESTIONS_API);
  return response.data;
};

export const getQuestionById = async (id: string): Promise<Question> => {
  const response = await axios.get(`${QUESTIONS_API}/${id}`);
  return response.data;
};

export const createQuestion = async (question: Omit<Question, 'id' | 'createdAt'>): Promise<Question> => {
  const response = await axios.post(QUESTIONS_API, question);
  return response.data;
};

export const updateQuestion = async (question: Question): Promise<Question> => {
  const response = await axios.put(`${QUESTIONS_API}/${question.id}`, question);
  return response.data;
};

export const deleteQuestion = async (id: string): Promise<void> => {
  await axios.delete(`${QUESTIONS_API}/${id}`);
};

// Creator API calls
export const getCategories = async (): Promise<{id: string, name: string}[]> => {
  const response = await axios.get(`${CREATOR_API}/categories`);
  return response.data;
};

export const getDifficulties = async (): Promise<{id: string, name: string}[]> => {
  const response = await axios.get(`${CREATOR_API}/difficulties`);
  return response.data;
};

export const submitQuestion = async (question: Omit<Question, 'id' | 'createdAt'>): Promise<Question> => {
  const response = await axios.post(`${CREATOR_API}/create`, question);
  return response.data;
};
