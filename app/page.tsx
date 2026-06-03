"use client";
import Link from "next/link";
import { PROFILES } from "@/lib/profiles";
import { loadAllStats } from "@/lib/gameState";
import { useEffect, useState } from "react";
import { ProfileStats, ProfileId } from "@/lib/types";

export default function Home() {
  const [allStats, setAllStats] = useState<Record<ProfileId, ProfileStats> | null>(null);

  useEffect(() => {
    setAllStats(loadAllStats());
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🎓</div>
          <h1 className="text-5xl font-extrabold text-gray-800 mb-3">
            Edu<span className="text-indigo-500">Quest</span>
          </h1>
          <p className="text-gray-500 text-lg">L&apos;aventure du savoir commence ici !</p>
        </div>

        {/* Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {PROFILES.map((profile) => {
            const stats = allStats?.[profile.id];
            const totalXp = stats?.totalXp ?? 0;
            const streak = stats?.streak ?? 0;
            const globalLevel = Math.floor(totalXp / 300) + 1;

            return (
              <Link href={`/${profile.id}`} key={profile.id}>
                <div className={`relative rounded-3xl p-6 bg-gradient-to-br ${profile.bgGradient} shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-6 -translate-x-6" />

                  <div className="relative z-10">
                    <div className="text-6xl mb-4 text-center">{profile.emoji}</div>
                    <h2 className="text-3xl font-extrabold text-white text-center mb-1">{profile.name}</h2>
                    <p className="text-white/80 text-sm text-center mb-5">{profile.level}</p>

                    <div className="bg-white/20 backdrop-blur rounded-2xl p-3 grid grid-cols-2 gap-2 text-white text-center">
                      <div>
                        <div className="text-2xl font-bold">{globalLevel}</div>
                        <div className="text-xs text-white/80">Niveau</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{streak > 0 ? `🔥${streak}` : "0"}</div>
                        <div className="text-xs text-white/80">Série</div>
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <span className="bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-full">
                        {totalXp} XP total ⭐
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Parent Dashboard Link */}
        <div className="text-center">
          <Link href="/parent">
            <button className="bg-white text-gray-600 border-2 border-gray-200 rounded-full px-6 py-3 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
              📊 Tableau de bord parent
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
