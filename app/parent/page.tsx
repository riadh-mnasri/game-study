"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PROFILES } from "@/lib/profiles";
import { loadAllStats } from "@/lib/gameState";
import { ProfileStats, ProfileId } from "@/lib/types";
import { xpForNextLevel } from "@/lib/gameState";

const SUBJECTS = [
  { key: "maths" as const, emoji: "🔢", label: "Maths" },
  { key: "francais" as const, emoji: "📖", label: "Français" },
  { key: "anglais" as const, emoji: "🌍", label: "Anglais" },
];

const BADGE_LABELS: Record<string, string> = {
  first_steps: "🌱 Premiers pas",
  explorer: "🗺️ Explorateur",
  champion: "🏆 Champion",
};

export default function ParentPage() {
  const [allStats, setAllStats] = useState<Record<ProfileId, ProfileStats> | null>(null);

  useEffect(() => {
    setAllStats(loadAllStats());
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <Link href="/" className="text-gray-400 text-sm hover:text-gray-600 block mb-1">← Retour</Link>
            <h1 className="text-3xl font-extrabold text-gray-800">📊 Tableau de bord parent</h1>
            <p className="text-gray-400 mt-1">Suivi de la progression de vos enfants</p>
          </div>
        </div>

        {/* Global summary */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {PROFILES.map((profile) => {
            const stats = allStats?.[profile.id];
            const totalXp = stats?.totalXp ?? 0;
            const globalLevel = Math.floor(totalXp / 300) + 1;
            const totalCorrect = SUBJECTS.reduce((acc, s) => acc + (stats?.subjects[s.key]?.totalCorrect ?? 0), 0);
            const totalAttempts = SUBJECTS.reduce((acc, s) => acc + (stats?.subjects[s.key]?.totalAttempts ?? 0), 0);
            const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

            return (
              <div key={profile.id} className={`bg-gradient-to-br ${profile.bgGradient} rounded-2xl p-5 text-white shadow-md`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{profile.emoji}</span>
                  <div>
                    <div className="font-bold text-lg">{profile.name}</div>
                    <div className="text-white/70 text-xs">{profile.level}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white/20 rounded-xl p-2">
                    <div className="font-bold">{totalXp}</div>
                    <div className="text-xs text-white/70">XP</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-2">
                    <div className="font-bold">N.{globalLevel}</div>
                    <div className="text-xs text-white/70">Niveau</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-2">
                    <div className="font-bold">{accuracy}%</div>
                    <div className="text-xs text-white/70">Réussite</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed progress per child */}
        {PROFILES.map((profile) => {
          const stats = allStats?.[profile.id];

          return (
            <div key={profile.id} className="bg-white rounded-3xl shadow-md p-6 mb-6">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-4xl">{profile.emoji}</span>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{profile.name}</h2>
                  <p className="text-gray-400 text-sm">{profile.level} · 🔥 {stats?.streak ?? 0} jour(s) de série</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SUBJECTS.map(({ key, emoji, label }) => {
                  const sub = stats?.subjects[key];
                  const xp = sub?.xp ?? 0;
                  const level = sub?.level ?? 1;
                  const correct = sub?.totalCorrect ?? 0;
                  const attempts = sub?.totalAttempts ?? 0;
                  const accuracy = attempts > 0 ? Math.round((correct / attempts) * 100) : 0;
                  const { percent } = xpForNextLevel(xp);
                  const lastPlayed = sub?.lastPlayed
                    ? new Date(sub.lastPlayed).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })
                    : null;

                  return (
                    <div key={key} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">{emoji}</span>
                        <div>
                          <div className="font-semibold text-gray-700">{label}</div>
                          <div className="text-xs text-gray-400">Niveau {level}</div>
                        </div>
                      </div>

                      {/* XP bar */}
                      <div className="mb-3">
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 rounded-full transition-all"
                            style={{ width: `${percent}%`, backgroundColor: profile.color }}
                          />
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{xp} XP total</div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-center mb-3">
                        <div className="bg-white rounded-xl p-2">
                          <div className="font-bold text-gray-700">{correct}/{attempts}</div>
                          <div className="text-xs text-gray-400">Réponses</div>
                        </div>
                        <div className="bg-white rounded-xl p-2">
                          <div className="font-bold" style={{ color: accuracy >= 80 ? "#16a34a" : accuracy >= 50 ? "#d97706" : "#dc2626" }}>
                            {accuracy}%
                          </div>
                          <div className="text-xs text-gray-400">Précision</div>
                        </div>
                      </div>

                      {/* Badges */}
                      {(sub?.badges?.length ?? 0) > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {sub!.badges.map((b) => (
                            <span key={b} className="text-xs px-2 py-0.5 bg-yellow-50 text-yellow-700 rounded-full border border-yellow-200">
                              {BADGE_LABELS[b] ?? b}
                            </span>
                          ))}
                        </div>
                      )}

                      {lastPlayed && (
                        <div className="text-xs text-gray-400">Dernière session : {lastPlayed}</div>
                      )}
                      {!lastPlayed && (
                        <div className="text-xs text-gray-300 italic">Pas encore commencé</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
