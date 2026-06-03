"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PROFILES } from "@/lib/profiles";
import { loadAllStats } from "@/lib/gameState";
import { ProfileStats, ProfileId } from "@/lib/types";
import { xpForNextLevel } from "@/lib/gameState";

const SUBJECTS = [
  { key: "maths" as const, emoji: "🔢", label: "Maths", color: "#4F46E5" },
  { key: "francais" as const, emoji: "📖", label: "Français", color: "#A855F7" },
  { key: "anglais" as const, emoji: "🌍", label: "Anglais", color: "#10B981" },
];

const BADGE_LABELS: Record<string, string> = {
  first_steps: "🌱 Premiers pas",
  explorer: "🗺️ Explorateur",
  champion: "🏆 Champion",
};

function AccuracyRing({ percent, color }: { percent: number; color: string }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;
  return (
    <svg width="72" height="72" className="rotate-[-90deg]">
      <circle cx="36" cy="36" r={r} fill="none" stroke="#e5e7eb" strokeWidth="6" />
      <motion.circle
        cx="36" cy="36" r={r}
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - dash }}
        transition={{ duration: 1, delay: 0.3 }}
      />
      <text
        x="36" y="36"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="13"
        fontWeight="800"
        fill={color}
        style={{ fontFamily: "Nunito, sans-serif", transform: "rotate(90deg)", transformOrigin: "36px 36px" }}
      >
        {percent}%
      </text>
    </svg>
  );
}

export default function ParentPage() {
  const [allStats, setAllStats] = useState<Record<ProfileId, ProfileStats> | null>(null);

  useEffect(() => {
    setAllStats(loadAllStats());
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="text-white/50 text-sm hover:text-white font-bold block mb-2 transition-colors">← Retour</Link>
          <h1 className="text-3xl font-black text-white">📊 Tableau de bord parent</h1>
          <p className="text-white/50 font-semibold mt-1">Suivi en temps réel de la progression de vos enfants</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Global summary cards */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {PROFILES.map((profile, i) => {
            const stats = allStats?.[profile.id];
            const totalXp = stats?.totalXp ?? 0;
            const globalLevel = Math.floor(totalXp / 300) + 1;
            const totalCorrect = SUBJECTS.reduce((acc, s) => acc + (stats?.subjects[s.key]?.totalCorrect ?? 0), 0);
            const totalAttempts = SUBJECTS.reduce((acc, s) => acc + (stats?.subjects[s.key]?.totalAttempts ?? 0), 0);
            const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
            const { percent } = xpForNextLevel(totalXp % 300);

            return (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg"
              >
                <div className={`bg-gradient-to-br ${profile.bgGradient} p-4 flex items-center gap-3`}>
                  <span className="text-4xl">{profile.emoji}</span>
                  <div>
                    <div className="font-black text-white text-xl">{profile.name}</div>
                    <div className="text-white/70 text-xs font-bold">{profile.level}</div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-gray-50 rounded-xl p-2 text-center">
                      <div className="font-black text-gray-800">{totalXp} XP</div>
                      <div className="text-xs text-gray-400">Total</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-2 text-center">
                      <div className="font-black text-gray-800">Niv. {globalLevel}</div>
                      <div className="text-xs text-gray-400">Niveau</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400 font-bold">Précision globale</span>
                    <span className="text-xs font-black" style={{ color: profile.color }}>{accuracy}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 1 }}
                      className={`h-2 rounded-full bg-gradient-to-r ${profile.bgGradient}`}
                    />
                  </div>
                  <div className="mt-2 text-xs text-gray-400 font-semibold">
                    🔥 {stats?.streak ?? 0} jour{(stats?.streak ?? 0) > 1 ? "s" : ""} de série
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed per child */}
        {PROFILES.map((profile) => {
          const stats = allStats?.[profile.id];
          const totalAttempts = SUBJECTS.reduce((acc, s) => acc + (stats?.subjects[s.key]?.totalAttempts ?? 0), 0);

          return (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-lg p-6 mb-6 overflow-hidden relative"
            >
              {/* decorative bg */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${profile.bgGradient} opacity-10 rounded-full translate-x-10 -translate-y-10`} />

              <div className="flex items-center gap-3 mb-6 relative">
                <span className="text-4xl">{profile.emoji}</span>
                <div>
                  <h2 className="text-2xl font-black text-gray-800">{profile.name}</h2>
                  <p className="text-gray-400 font-semibold text-sm">
                    {profile.level} · {totalAttempts} question{totalAttempts > 1 ? "s" : ""} tentée{totalAttempts > 1 ? "s" : ""}
                    {(stats?.streak ?? 0) > 0 && ` · 🔥 ${stats!.streak} jour(s) de suite`}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SUBJECTS.map(({ key, emoji, label, color }) => {
                  const sub = stats?.subjects[key];
                  const xp = sub?.xp ?? 0;
                  const level = sub?.level ?? 1;
                  const correct = sub?.totalCorrect ?? 0;
                  const attempts = sub?.totalAttempts ?? 0;
                  const accuracy = attempts > 0 ? Math.round((correct / attempts) * 100) : 0;
                  const lastPlayed = sub?.lastPlayed
                    ? new Date(sub.lastPlayed).toLocaleDateString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })
                    : null;

                  return (
                    <div key={key} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{emoji}</span>
                          <div>
                            <div className="font-black text-gray-700">{label}</div>
                            <div className="text-xs text-gray-400 font-semibold">Niv. {level} · {xp} XP</div>
                          </div>
                        </div>
                        {attempts > 0 && <AccuracyRing percent={accuracy} color={color} />}
                      </div>

                      {attempts > 0 ? (
                        <>
                          <div className="flex gap-2 mb-3">
                            <div className="flex-1 bg-white rounded-xl p-2 text-center">
                              <div className="font-black text-gray-700">{correct}/{attempts}</div>
                              <div className="text-xs text-gray-400">Réponses</div>
                            </div>
                            <div className="flex-1 bg-white rounded-xl p-2 text-center">
                              <div className="font-black" style={{ color: accuracy >= 80 ? "#16a34a" : accuracy >= 50 ? "#d97706" : "#dc2626" }}>
                                {accuracy >= 80 ? "🟢" : accuracy >= 50 ? "🟡" : "🔴"} {accuracy >= 80 ? "Excellent" : accuracy >= 50 ? "Bien" : "À revoir"}
                              </div>
                              <div className="text-xs text-gray-400">Niveau</div>
                            </div>
                          </div>

                          {(sub?.badges?.length ?? 0) > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {sub!.badges.map((b) => (
                                <span key={b} className="text-xs px-2 py-0.5 bg-yellow-50 text-yellow-700 rounded-full border border-yellow-200 font-bold">
                                  {BADGE_LABELS[b] ?? b}
                                </span>
                              ))}
                            </div>
                          )}

                          {lastPlayed && (
                            <div className="text-xs text-gray-400 font-semibold">🕐 {lastPlayed}</div>
                          )}
                        </>
                      ) : (
                        <div className="text-sm text-gray-300 italic text-center py-2">Pas encore commencé</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}
