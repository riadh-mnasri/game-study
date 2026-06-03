export type ProfileId = "syma" | "sany" | "seji";
export type Subject = "maths" | "francais" | "anglais";
export type Difficulty = "easy" | "medium" | "hard";

export interface Profile {
  id: ProfileId;
  name: string;
  level: string;
  emoji: string;
  color: string;
  bgGradient: string;
  borderColor: string;
}

export interface Exercise {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
  image?: string;
}

export interface SubjectProgress {
  xp: number;
  level: number;
  totalCorrect: number;
  totalAttempts: number;
  badges: string[];
  lastPlayed?: string;
}

export interface ProfileStats {
  profileId: ProfileId;
  subjects: Record<Subject, SubjectProgress>;
  streak: number;
  lastStreakDate?: string;
  totalXp: number;
}
