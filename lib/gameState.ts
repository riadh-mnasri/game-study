import { ProfileId, ProfileStats, Subject, SubjectProgress } from "./types";

const STORAGE_KEY = "eduquest_stats";

const defaultSubject = (): SubjectProgress => ({
  xp: 0,
  level: 1,
  totalCorrect: 0,
  totalAttempts: 0,
  badges: [],
});

const defaultStats = (profileId: ProfileId): ProfileStats => ({
  profileId,
  subjects: {
    maths: defaultSubject(),
    francais: defaultSubject(),
    anglais: defaultSubject(),
  },
  streak: 0,
  totalXp: 0,
});

export function loadAllStats(): Record<ProfileId, ProfileStats> {
  if (typeof window === "undefined") return {} as Record<ProfileId, ProfileStats>;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initStats();
    return JSON.parse(raw);
  } catch {
    return initStats();
  }
}

function initStats(): Record<ProfileId, ProfileStats> {
  const stats = {
    syma: defaultStats("syma"),
    sany: defaultStats("sany"),
    seji: defaultStats("seji"),
  };
  saveAllStats(stats);
  return stats;
}

export function saveAllStats(stats: Record<ProfileId, ProfileStats>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

export function getProfileStats(profileId: ProfileId): ProfileStats {
  const all = loadAllStats();
  return all[profileId] ?? defaultStats(profileId);
}

export function addXp(
  profileId: ProfileId,
  subject: Subject,
  correct: boolean,
  streak: number
): { newXp: number; leveledUp: boolean; newLevel: number } {
  const all = loadAllStats();
  const profile = all[profileId] ?? defaultStats(profileId);
  const sub = profile.subjects[subject];

  sub.totalAttempts += 1;
  let xpGained = 0;

  if (correct) {
    xpGained = 10;
    if (streak > 0 && streak % 3 === 0) xpGained += 5; // streak bonus
    sub.totalCorrect += 1;
    sub.xp += xpGained;
    profile.totalXp += xpGained;
  }

  const oldLevel = sub.level;
  sub.level = Math.floor(sub.xp / 100) + 1;
  const leveledUp = sub.level > oldLevel;

  // Badges
  if (sub.totalCorrect >= 5 && !sub.badges.includes("first_steps"))
    sub.badges.push("first_steps");
  if (sub.totalCorrect >= 20 && !sub.badges.includes("explorer"))
    sub.badges.push("explorer");
  if (sub.totalCorrect >= 50 && !sub.badges.includes("champion"))
    sub.badges.push("champion");

  sub.lastPlayed = new Date().toISOString();

  const today = new Date().toDateString();
  if (profile.lastStreakDate !== today) {
    profile.streak = correct ? profile.streak + 1 : 0;
    profile.lastStreakDate = today;
  }

  all[profileId] = profile;
  saveAllStats(all);

  return { newXp: xpGained, leveledUp, newLevel: sub.level };
}

export function xpForNextLevel(xp: number): { current: number; needed: number; percent: number } {
  const level = Math.floor(xp / 100);
  const current = xp - level * 100;
  return { current, needed: 100, percent: current };
}
