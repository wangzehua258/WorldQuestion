export interface Question {
  id: string;
  text: string;
  date: string;
  totalVotes: number;
  yesVotes: number;
  noVotes: number;
  comments: Comment[];
  trendAnalysis: string;
  isActive: boolean;
  category: 'technology' | 'society' | 'environment' | 'politics' | 'science' | 'culture';
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  text: string;
  timestamp: string;
  isAnonymous: boolean;
  userId?: string;
}

export interface VoteResult {
  questionId: string;
  vote: 'yes' | 'no';
  timestamp: string;
}

export interface ShareCard {
  questionText: string;
  userVote: 'yes' | 'no';
  globalPercentage: number;
  totalVotes: number;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

export interface QuestionsResponse {
  questions: Question[];
  totalPages: number;
  currentPage: number;
  total: number;
} 