
import axios from 'axios';

// API URLs for microservices using environment variables from Vite
const API_GATEWAY = import.meta.env.VITE_API_GATEWAY || 'http://localhost:3000/api';

const DASHBOARD_API = `${API_GATEWAY}/dashboard`;
const QUESTIONS_API = `${API_GATEWAY}/questions`;
const CREATOR_API = `${API_GATEWAY}/creator`;

console.log('API Gateway URL:', API_GATEWAY);
console.log('Dashboard API URL:', DASHBOARD_API);
console.log('Questions API URL:', QUESTIONS_API);
console.log('Creator API URL:', CREATOR_API);

// Create axios instances for each service with timeout and retry config
const dashboardApiClient = axios.create({
  baseURL: DASHBOARD_API,
  timeout: 10000,
});

const questionsApiClient = axios.create({
  baseURL: QUESTIONS_API,
  timeout: 10000,
});

const creatorApiClient = axios.create({
  baseURL: CREATOR_API,
  timeout: 10000,
});

// Health check functions
export const checkGatewayHealth = async (): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_GATEWAY.replace('/api', '')}/health`);
    return response.status === 200;
  } catch (error) {
    console.error('API Gateway health check failed:', error);
    return false;
  }
};

// Interface for types
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
  const response = await dashboardApiClient.get('/stats');
  return response.data;
};

export const getActivityData = async (): Promise<ActivityData[]> => {
  const response = await dashboardApiClient.get('/activity');
  return response.data;
};

export const getCategoryData = async (): Promise<CategoryData[]> => {
  const response = await dashboardApiClient.get('/categories');
  return response.data;
};

export const getRecentQuestions = async (): Promise<RecentQuestion[]> => {
  const response = await dashboardApiClient.get('/recent-questions');
  return response.data;
};

// Question Bank API calls
export const getAllQuestions = async (): Promise<Question[]> => {
  const response = await questionsApiClient.get('');
  return response.data;
};

export const getQuestionById = async (id: string): Promise<Question> => {
  const response = await questionsApiClient.get(`/${id}`);
  return response.data;
};

export const createQuestion = async (question: Omit<Question, 'id' | 'createdAt'>): Promise<Question> => {
  const response = await questionsApiClient.post('', question);
  return response.data;
};

export const updateQuestion = async (question: Question): Promise<Question> => {
  const response = await questionsApiClient.put(`/${question.id}`, question);
  return response.data;
};

export const deleteQuestion = async (id: string): Promise<void> => {
  await questionsApiClient.delete(`/${id}`);
};

// Creator API calls
export const getCategories = async (): Promise<{id: string, name: string}[]> => {
  const response = await creatorApiClient.get('/categories');
  return response.data;
};

export const getDifficulties = async (): Promise<{id: string, name: string}[]> => {
  const response = await creatorApiClient.get('/difficulties');
  return response.data;
};

export const submitQuestion = async (question: Omit<Question, 'id' | 'createdAt'>): Promise<Question> => {
  const response = await creatorApiClient.post('/create', question);
  return response.data;
};

export const saveDraft = async (question: Partial<Question>): Promise<Question> => {
  const response = await creatorApiClient.post('/drafts', question);
  return response.data;
};

export const getDrafts = async (): Promise<Question[]> => {
  const response = await creatorApiClient.get('/drafts');
  return response.data;
};
