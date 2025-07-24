export interface Question {
  id: string;
  text: string;
  date: string;
  totalVotes: number;
  yesVotes: number;
  noVotes: number;
  comments: Comment[];
  isActive: boolean;
  category: 'technology' | 'society' | 'environment' | 'politics' | 'science' | 'culture';
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProposedQuestion {
  id: string;
  text: string;
  category: 'technology' | 'society' | 'environment' | 'politics' | 'science' | 'culture';
  tags: string[];
  submittedBy: string;
  votes: number;
  status: 'active' | 'selected' | 'rejected';
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  content: string;
  timestamp: string;
  isAnonymous: boolean;
  isPinned: boolean;
  userId?: string;
}

export interface Vote {
  id: string;
  questionId: string;
  choice: 'yes' | 'no';
  timestamp: string;
  userIp: string;
}

export interface ShareCard {
  questionText: string;
  userVote: 'yes' | 'no';
  globalPercentage: number;
  totalVotes: number;
}

export interface ApiResponse<T> {
  success: boolean;
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

export interface ProposedQuestionsResponse {
  data: ProposedQuestion[];
} 