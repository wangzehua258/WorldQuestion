import { Question, ApiResponse, QuestionsResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'API request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Get current question
  async getCurrentQuestion(): Promise<Question> {
    return this.request<Question>('/questions/current');
  }

  // Get all questions (for history)
  async getQuestions(page = 1, limit = 10, category?: string): Promise<QuestionsResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    if (category) {
      params.append('category', category);
    }

    return this.request<QuestionsResponse>(`/questions?${params}`);
  }

  // Get question by ID
  async getQuestionById(id: string): Promise<Question> {
    return this.request<Question>(`/questions/${id}`);
  }

  // Vote on a question
  async voteOnQuestion(questionId: string, vote: 'yes' | 'no', sessionId?: string): Promise<Question> {
    return this.request<Question>(`/questions/${questionId}/vote`, {
      method: 'POST',
      body: JSON.stringify({ vote, sessionId }),
    });
  }

  // Add comment to question
  async addComment(questionId: string, text: string, isAnonymous = true, userId?: string): Promise<Comment> {
    return this.request<Comment>(`/questions/${questionId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ text, isAnonymous, userId }),
    });
  }

  // Get trending questions
  async getTrendingQuestions(): Promise<Question[]> {
    return this.request<Question[]>('/questions/trending/top');
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.request<{ status: string; timestamp: string }>('/health');
  }
}

export const apiService = new ApiService(); 