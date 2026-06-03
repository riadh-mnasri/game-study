"use client";
import { xpForNextLevel } from "@/lib/gameState";

interface Props {
  xp: number;
  level: number;
  color: string;
}

export default function XpBar({ xp, level, color }: Props) {
  const { current, needed, percent } = xpForNextLevel(xp);
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>Niveau {level}</span>
        <span>{current}/{needed} XP</span>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-3 rounded-full transition-all duration-700"
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
