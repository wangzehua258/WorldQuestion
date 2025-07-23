import { Question } from '@/types';

export const sampleQuestions: Question[] = [
  {
    id: '1',
    text: 'Will artificial intelligence eventually replace human workers in most industries?',
    date: '2024-01-15',
    totalVotes: 15420,
    yesVotes: 8234,
    noVotes: 7186,
    isActive: true,
    category: 'technology',
    tags: ['AI', 'automation', 'employment'],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    aiSummary: 'Based on current voting trends, people are more concerned about AI replacing jobs than excited about its potential. This reflects widespread anxiety about automation and economic displacement.',
    comments: [
      {
        id: '1',
        content: 'AI will transform work, but humans will adapt and find new roles. History shows we always do.',
        timestamp: '2024-01-15T10:30:00Z',
        isAnonymous: true,
        isPinned: true
      },
      {
        id: '2',
        content: 'The pace of AI advancement is unprecedented. We need to prepare for massive job displacement.',
        timestamp: '2024-01-15T11:15:00Z',
        isAnonymous: true,
        isPinned: true
      },
      {
        id: '3',
        content: 'It depends on how we choose to implement AI. We can design it to augment rather than replace.',
        timestamp: '2024-01-15T12:00:00Z',
        isAnonymous: true,
        isPinned: true
      },
      {
        id: '4',
        content: 'I work in tech and see this happening already. Many jobs are being automated.',
        timestamp: '2024-01-15T13:45:00Z',
        isAnonymous: true,
        isPinned: false
      },
      {
        id: '5',
        content: 'Humans have unique creativity and emotional intelligence that AI cannot replicate.',
        timestamp: '2024-01-15T14:20:00Z',
        isAnonymous: true,
        isPinned: false
      }
    ]
  },
  {
    id: '2',
    text: 'Should humanity prioritize Mars colonization over solving Earth\'s problems?',
    date: '2024-01-14',
    totalVotes: 12850,
    yesVotes: 10280,
    noVotes: 2570,
    isActive: false,
    category: 'science',
    tags: ['space', 'mars', 'colonization'],
    createdAt: '2024-01-14T00:00:00Z',
    updatedAt: '2024-01-14T00:00:00Z',
    aiSummary: 'The overwhelming support for Mars colonization shows humanity\'s innate desire for exploration and expansion, despite the practical challenges of space travel.',
    comments: [
      {
        id: '6',
        content: 'Mars colonization is humanity\'s insurance policy. We need a backup plan for our species.',
        timestamp: '2024-01-14T09:20:00Z',
        isAnonymous: true,
        isPinned: true
      },
      {
        id: '7',
        content: 'We should fix Earth first. Mars won\'t solve our immediate problems here.',
        timestamp: '2024-01-14T10:45:00Z',
        isAnonymous: true,
        isPinned: true
      }
    ]
  },
  {
    id: '3',
    text: 'Has social media made the world a better or worse place overall?',
    date: '2024-01-13',
    totalVotes: 18920,
    yesVotes: 5676,
    noVotes: 13244,
    isActive: false,
    category: 'society',
    tags: ['social media', 'technology', 'society'],
    createdAt: '2024-01-13T00:00:00Z',
    updatedAt: '2024-01-13T00:00:00Z',
    aiSummary: 'The majority believe social media has made the world worse, reflecting growing concerns about its negative impacts on mental health and society.',
    comments: [
      {
        id: '8',
        content: 'Social media connects people globally but also creates echo chambers and spreads misinformation.',
        timestamp: '2024-01-13T14:30:00Z',
        isAnonymous: true,
        isPinned: true
      },
      {
        id: '9',
        content: 'It\'s a tool. Like any tool, it can be used for good or bad. The problem is how we use it.',
        timestamp: '2024-01-13T15:10:00Z',
        isAnonymous: true,
        isPinned: true
      }
    ]
  }
];

export const getCurrentQuestion = (): Question => {
  return sampleQuestions[0];
};

export const getHistoricalQuestions = (): Question[] => {
  return sampleQuestions.slice(1);
}; 