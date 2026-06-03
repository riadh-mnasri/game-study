"use client";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROFILES } from "@/lib/profiles";
import { getProfileStats } from "@/lib/gameState";
import { ProfileStats } from "@/lib/types";
import SubjectCard from "@/components/SubjectCard";

const SUBJECTS = [
  { key: "maths", emoji: "🔢", label: "Mathématiques" },
  { key: "francais", emoji: "📖", label: "Français" },
  { key: "anglais", emoji: "🌍", label: "Anglais" },
] as const;

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

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className={`bg-gradient-to-br ${profile.bgGradient} px-4 py-10 text-white`}>
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-white/70 text-sm hover:text-white mb-4 block">
            ← Retour à l&apos;accueil
          </Link>
          <div className="flex items-center gap-5">
            <div className="text-7xl">{profile.emoji}</div>
            <div>
              <h1 className="text-4xl font-extrabold">{profile.name}</h1>
              <p className="text-white/80 text-lg">{profile.level}</p>
              <div className="flex gap-4 mt-2 text-sm">
                <span className="bg-white/20 px-3 py-1 rounded-full">⭐ {totalXp} XP</span>
                <span className="bg-white/20 px-3 py-1 rounded-full">🏅 Niveau {globalLevel}</span>
                {streak > 0 && (
                  <span className="bg-white/20 px-3 py-1 rounded-full">🔥 {streak} jour{streak > 1 ? "s" : ""} de suite</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Cards */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold text-gray-700 mb-5">Choisir une matière</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SUBJECTS.map(({ key, emoji, label }) => (
            <SubjectCard
              key={key}
              profileId={profile.id}
              subject={key}
              emoji={emoji}
              label={label}
              progress={stats?.subjects[key] ?? { xp: 0, level: 1, totalCorrect: 0, totalAttempts: 0, badges: [] }}
              color={profile.color}
            />
          ))}
        </div>

        {/* Motivational message */}
        <div className={`mt-8 rounded-2xl p-5 bg-gradient-to-br ${profile.bgGradient} text-white text-center`}>
          <div className="text-3xl mb-2">💪</div>
          <p className="font-semibold text-lg">
            {totalXp === 0
              ? `Prêt(e) pour l'aventure, ${profile.name} ? Lance-toi !`
              : totalXp < 100
              ? `Bravo ${profile.name} ! Tu progresses bien, continue !`
              : totalXp < 500
              ? `${profile.name}, tu es une vraie étoile du savoir ! ⭐`
              : `${profile.name}, tu es un(e) champion(ne) ! 🏆`}
          </p>
        </div>
      </div>
    </main>
  );
}
