export type EventType = 'SIX' | 'FOUR' | 'WICKET' | 'NOBALL' | 'MILESTONE' | 'EXCITEMENT' | 'MEME' | 'DARE';

export interface MatchEvent {
  id: string;
  type: EventType;
  timestamp: number;
  minute: string; // Changed to string for Overs (e.g. "14.2")
  title: string;
  description: string;
  metadata?: any;
}

export interface MatchData {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  homeWickets: number;
  awayScore: number;
  awayWickets: number;
  homeOvers: string;
  awayOvers: string;
  homeCRR?: string;
  status: 'LIVE' | 'FINISHED' | 'SCHEDULED';
  currentInnings: 1 | 2;
  excitement: number; // 0-100
  momentum: number; // -100 to 100
  batsmen: { name: string; runs: number; balls: number }[];
  bowler: { name: string; overs: string; wickets: number; runs: number };
}

export interface UserChallenge {
  id: string;
  userId: string;
  userName: string;
  targetValue: string; // e.g. "CSK score 180+"
  dare: string; // e.g. "Do 20 pushups on camera"
  isRevealed: boolean;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  participants: string[];
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  isSpeaking?: boolean;
}

export interface Meme {
  id: string;
  imageUrl: string;
  title: string;
  likes: number;
  author: string;
}

export interface Dare {
  id: string;
  title: string;
  reward: number;
  timeLeft: number;
  participants: number;
}
