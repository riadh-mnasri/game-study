"use client";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { PROFILES } from "@/lib/profiles";
import { getProfileStats } from "@/lib/gameState";
import { ProfileStats } from "@/lib/types";
import { xpForNextLevel } from "@/lib/gameState";

const SUBJECTS = [
  { key: "maths", emoji: "🔢", label: "Maths", bg: "from-blue-500 to-indigo-600", light: "bg-blue-50", text: "text-blue-600" },
  { key: "francais", emoji: "📖", label: "Français", bg: "from-purple-500 to-pink-500", light: "bg-purple-50", text: "text-purple-600" },
  { key: "anglais", emoji: "🌍", label: "Anglais", bg: "from-emerald-500 to-teal-600", light: "bg-emerald-50", text: "text-emerald-600" },
] as const;

const BADGE_LABELS: Record<string, string> = {
  first_steps: "🌱 Premiers pas",
  explorer: "🗺️ Explorateur",
  champion: "🏆 Champion",
};

const MOTIVATIONS = [
  (name: string) => `Prêt(e) pour l'aventure, ${name} ? 🚀`,
  (name: string) => `Bravo ${name} ! Tu progresses super bien ! 🌟`,
  (name: string) => `${name}, tu es une vraie étoile ! ⭐`,
  (name: string) => `${name}, tu es un(e) champion(ne) absolu(e) ! 🏆`,
];

export default function ProfilePage({ params }: { params: Promise<{ profileId: string }> }) {
  const { profileId } = use(params);
  const profile = PROFILES.find((p) => p.id === profileId);
  const [stats, setStats] = useState<ProfileStats | null>(null);

  useEffect(() => {
    if (profile) setStats(getProfileStats(profile.id));
  }, [profile]);

  if (!profile) return notFound();

  const totalXp = stats?.totalXp ?? 0;
  const globalLevel = Math.floor(totalXp / 300) + 1;
  const streak = stats?.streak ?? 0;
  const motivIdx = Math.min(Math.floor(totalXp / 150), MOTIVATIONS.length - 1);
  const { current: xpCurrent, percent: xpPercent } = xpForNextLevel(totalXp % 300);

  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(160deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}>
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${profile.bgGradient} opacity-30`} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 pt-6 pb-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-bold mb-6 transition-colors">
            ← Retour
          </Link>

          <div className="flex items-center gap-6">
            {/* Mascot */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-8xl"
            >
              {profile.emoji}
            </motion.div>

            <div className="flex-1">
              <h1 className="text-5xl font-black text-white mb-1">{profile.name}</h1>
              <p className="text-white/60 font-bold mb-3">{profile.level}</p>

              <div className="flex flex-wrap gap-2">
                <span className="glass text-white text-sm font-bold px-3 py-1 rounded-full">
                  ⭐ {totalXp} XP
                </span>
                <span className="glass text-white text-sm font-bold px-3 py-1 rounded-full">
                  🏅 Niveau {globalLevel}
                </span>
                {streak > 0 && (
                  <motion.span
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="glass text-orange-300 text-sm font-bold px-3 py-1 rounded-full"
                  >
                    🔥 {streak} jour{streak > 1 ? "s" : ""} de suite !
                  </motion.span>
                )}
              </div>

              {/* Global XP bar */}
              <div className="mt-3">
                <div className="flex justify-between text-white/50 text-xs font-semibold mb-1">
                  <span>Niv. {globalLevel}</span>
                  <span>{xpCurrent}/300 XP → Niv. {globalLevel + 1}</span>
                </div>
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${xpPercent}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className={`h-3 rounded-full bg-gradient-to-r ${profile.bgGradient}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Cards */}
      <div className="max-w-3xl mx-auto px-4 -mt-4">
        <h2 className="text-white/70 font-bold text-sm uppercase tracking-widest mb-4">Choisir une matière</h2>
        <div className="grid grid-cols-1 gap-4 mb-6">
          {SUBJECTS.map(({ key, emoji, label, bg, light, text }, i) => {
            const sub = stats?.subjects[key];
            const xp = sub?.xp ?? 0;
            const level = sub?.level ?? 1;
            const correct = sub?.totalCorrect ?? 0;
            const attempts = sub?.totalAttempts ?? 0;
            const accuracy = attempts > 0 ? Math.round((correct / attempts) * 100) : null;
            const { percent } = xpForNextLevel(xp);

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, type: "spring" }}
              >
                <Link href={`/${profile.id}/${key}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, x: 6 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-xl cursor-pointer"
                  >
                    <div className="flex items-center">
                      {/* Colored left strip */}
                      <div className={`bg-gradient-to-b ${bg} w-20 h-full min-h-[90px] flex items-center justify-center text-4xl shrink-0`}>
                        {emoji}
                      </div>

                      <div className="flex-1 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="font-black text-gray-800 text-lg">{label}</div>
                            <div className="text-xs text-gray-400 font-semibold">Niveau {level}</div>
                          </div>
                          <div className="text-right">
                            {accuracy !== null ? (
                              <>
                                <div className={`text-xl font-black ${text}`}>{accuracy}%</div>
                                <div className="text-xs text-gray-400">précision</div>
                              </>
                            ) : (
                              <div className={`text-sm font-black ${text} bg-gradient-to-r ${bg} text-white px-3 py-1 rounded-full`}>
                                Jouer !
                              </div>
                            )}
                          </div>
                        </div>

                        {/* XP bar */}
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percent}%` }}
                            transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                            className={`h-2 rounded-full bg-gradient-to-r ${bg}`}
                          />
                        </div>

                        {/* Badges */}
                        {(sub?.badges?.length ?? 0) > 0 && (
                          <div className="flex gap-1 mt-2 flex-wrap">
                            {sub!.badges.map((b) => (
                              <span key={b} className={`text-xs px-2 py-0.5 ${light} ${text} rounded-full font-bold`}>
                                {BADGE_LABELS[b] ?? b}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Motivational banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`rounded-3xl p-5 bg-gradient-to-r ${profile.bgGradient} text-white text-center mb-8 shadow-xl`}
        >
          <p className="font-black text-xl">{MOTIVATIONS[motivIdx](profile.name)}</p>
        </motion.div>
      </div>
    </main>
  );
}
