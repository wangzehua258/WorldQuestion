import { Question, Comment, ApiResponse, QuestionsResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log('API request URL:', url); // Debug log
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      console.log('API response status:', response.status); // Debug log
      
      const data = await response.json();
      console.log('API response data:', data); // Debug log
      
      // For 400 responses, return the data (which contains the error message)
      if (response.status === 400) {
        return data;
      }
      
      // For other error statuses, throw an error
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Questions API
  async getCurrentQuestion(): Promise<ApiResponse<Question>> {
    return this.request<ApiResponse<Question>>('/questions/current');
  }

  async getHistoricalQuestions(page: number = 1, limit: number = 10): Promise<ApiResponse<QuestionsResponse>> {
    return this.request<ApiResponse<QuestionsResponse>>(`/questions/history?page=${page}&limit=${limit}`);
  }

  async getQuestionById(id: string): Promise<ApiResponse<Question>> {
    return this.request<ApiResponse<Question>>(`/questions/${id}`);
  }

  async voteOnQuestion(questionId: string, choice: 'yes' | 'no'): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/questions/${questionId}/vote`, {
      method: 'POST',
      body: JSON.stringify({ choice }),
    });
  }

  async getQuestionStats(questionId: string): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/questions/${questionId}/stats`);
  }

  // Comments API
  async getComments(questionId: string, limit: number = 10, pinned: boolean = false): Promise<ApiResponse<Comment[]>> {
    return this.request<ApiResponse<Comment[]>>(`/questions/${questionId}/comments?limit=${limit}&pinned=${pinned}`);
  }

  async addComment(questionId: string, content: string, isAnonymous: boolean = true): Promise<ApiResponse<Comment>> {
    return this.request<ApiResponse<Comment>>(`/questions/${questionId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content, isAnonymous }),
    });
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>('/health');
  }
}

// Create singleton instance
export const apiService = new ApiService();

// Helper functions for common operations
export const api = {
  // Questions
  getCurrentQuestion: () => apiService.getCurrentQuestion(),
  getHistoricalQuestions: (page?: number, limit?: number) => apiService.getHistoricalQuestions(page, limit),
  getQuestionById: (id: string) => apiService.getQuestionById(id),
  voteOnQuestion: (questionId: string, choice: 'yes' | 'no') => apiService.voteOnQuestion(questionId, choice),
  getQuestionStats: (questionId: string) => apiService.getQuestionStats(questionId),
  
  // Comments
  getComments: (questionId: string, limit?: number, pinned?: boolean) => apiService.getComments(questionId, limit, pinned),
  addComment: (questionId: string, content: string, isAnonymous?: boolean) => apiService.addComment(questionId, content, isAnonymous),
  
  // Health
  healthCheck: () => apiService.healthCheck(),
}; 