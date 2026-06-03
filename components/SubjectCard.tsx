"use client";
import Link from "next/link";
import { SubjectProgress } from "@/lib/types";
import XpBar from "./XpBar";

interface Props {
  profileId: string;
  subject: string;
  emoji: string;
  label: string;
  progress: SubjectProgress;
  color: string;
}

const BADGE_LABELS: Record<string, string> = {
  first_steps: "🌱 Premiers pas",
  explorer: "🗺️ Explorateur",
  champion: "🏆 Champion",
};

export default function SubjectCard({ profileId, subject, emoji, label, progress, color }: Props) {
  const accuracy =
    progress.totalAttempts > 0
      ? Math.round((progress.totalCorrect / progress.totalAttempts) * 100)
      : 0;

  return (
    <Link href={`/${profileId}/${subject}`}>
      <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-opacity-50"
        style={{ ["--hover-color" as string]: color }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{emoji}</span>
            <div>
              <div className="font-bold text-gray-800">{label}</div>
              <div className="text-xs text-gray-400">Niv. {progress.level}</div>
            </div>
          </div>
          {progress.totalAttempts > 0 && (
            <div className="text-right">
              <div className="text-sm font-semibold" style={{ color }}>{accuracy}%</div>
              <div className="text-xs text-gray-400">précision</div>
            </div>
          )}
        </div>

        <XpBar xp={progress.xp} level={progress.level} color={color} />

        {progress.badges.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {progress.badges.map((b) => (
              <span key={b} className="text-xs px-2 py-0.5 bg-yellow-50 text-yellow-700 rounded-full border border-yellow-200">
                {BADGE_LABELS[b] ?? b}
              </span>
            ))}
          </div>
        )}

        {progress.totalAttempts === 0 && (
          <div className="mt-3 text-center text-sm text-gray-400 italic">Commencer ▶</div>
        )}
      </div>
    </Link>
  );
}
