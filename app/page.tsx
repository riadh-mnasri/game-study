"use client";
import Link from "next/link";
import { PROFILES } from "@/lib/profiles";
import { loadAllStats } from "@/lib/gameState";
import { useEffect, useState } from "react";
import { ProfileStats, ProfileId } from "@/lib/types";
import { motion } from "framer-motion";

const FLOATING = ["⭐", "🌟", "✨", "💫", "🎯", "🏆", "🎮", "📚", "🎉", "🌈"];

export default function Home() {
  const [allStats, setAllStats] = useState<Record<ProfileId, ProfileStats> | null>(null);

  useEffect(() => {
    setAllStats(loadAllStats());
  }, []);

  return (
    <main className="min-h-screen overflow-hidden relative" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)" }}>
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {FLOATING.map((emoji, i) => (
          <div
            key={i}
            className="absolute text-2xl select-none opacity-20"
            style={{
              left: `${(i * 11 + 5) % 95}%`,
              top: `${(i * 17 + 8) % 85}%`,
              animation: `float ${3 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-center mb-12"
        >
          <div className="text-7xl mb-4" style={{ animation: "float 3s ease-in-out infinite" }}>🎓</div>
          <h1 className="text-6xl font-black text-white mb-2 drop-shadow-lg tracking-tight">
            Edu<span className="text-yellow-300">Quest</span>
          </h1>
          <p className="text-white/80 text-xl font-semibold">L&apos;aventure du savoir commence ici !</p>
        </motion.div>

        {/* Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {PROFILES.map((profile, i) => {
            const stats = allStats?.[profile.id];
            const totalXp = stats?.totalXp ?? 0;
            const streak = stats?.streak ?? 0;
            const globalLevel = Math.floor(totalXp / 300) + 1;
            const totalCorrect = ["maths", "francais", "anglais"].reduce(
              (acc, s) => acc + (stats?.subjects[s as keyof typeof stats.subjects]?.totalCorrect ?? 0), 0
            );

            return (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15, type: "spring", bounce: 0.4 }}
              >
                <Link href={`/${profile.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -8 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative rounded-3xl overflow-hidden cursor-pointer"
                    style={{ boxShadow: `0 20px 60px rgba(0,0,0,0.3)` }}
                  >
                    {/* Card gradient top */}
                    <div className={`bg-gradient-to-br ${profile.bgGradient} p-6 pb-8`}>
                      <div className="absolute top-3 right-3 glass rounded-full px-3 py-1 text-white text-xs font-bold">
                        {profile.level}
                      </div>

                      {/* Mascot */}
                      <div
                        className="text-7xl text-center mb-3 block"
                        style={{ animation: "float 3s ease-in-out infinite", animationDelay: `${i * 0.5}s` }}
                      >
                        {profile.emoji}
                      </div>
                      <h2 className="text-3xl font-black text-white text-center drop-shadow">{profile.name}</h2>
                    </div>

                    {/* Stats section */}
                    <div className="bg-white p-4">
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="text-center bg-indigo-50 rounded-xl py-2">
                          <div className="text-lg font-black text-indigo-600">{globalLevel}</div>
                          <div className="text-xs text-gray-400 font-semibold">Niveau</div>
                        </div>
                        <div className="text-center bg-yellow-50 rounded-xl py-2">
                          <div className="text-lg font-black text-yellow-600">{totalXp}</div>
                          <div className="text-xs text-gray-400 font-semibold">XP</div>
                        </div>
                        <div className="text-center bg-orange-50 rounded-xl py-2">
                          <div className="text-lg font-black text-orange-500">
                            {streak > 0 ? `🔥${streak}` : totalCorrect > 0 ? `✅${totalCorrect}` : "0"}
                          </div>
                          <div className="text-xs text-gray-400 font-semibold">{streak > 0 ? "Série" : "Réussis"}</div>
                        </div>
                      </div>

                      <motion.div
                        className={`w-full py-2.5 rounded-2xl text-white font-black text-center text-sm bg-gradient-to-r ${profile.bgGradient}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {totalXp === 0 ? "🚀 Commencer !" : "▶ Continuer !"}
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Parent Dashboard */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <Link href="/parent">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="glass text-white font-bold px-8 py-3 rounded-full border border-white/30 hover:bg-white/20 transition-colors"
            >
              📊 Tableau de bord parent
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
