"use client";
import { use, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROFILES } from "@/lib/profiles";
import { addXp } from "@/lib/gameState";
import { getRandomExercises } from "@/lib/exercises";
import { Exercise, ProfileId, Subject } from "@/lib/types";

const SUBJECT_LABELS: Record<string, { label: string; emoji: string }> = {
  maths: { label: "Mathématiques", emoji: "🔢" },
  francais: { label: "Français", emoji: "📖" },
  anglais: { label: "Anglais", emoji: "🌍" },
};

const HEARTS = 3;
const TOTAL_QUESTIONS = 10;

type Phase = "playing" | "result";

export default function ExercisePage({ params }: { params: Promise<{ profileId: string; subject: string }> }) {
  const { profileId, subject } = use(params);
  const profile = PROFILES.find((p) => p.id === profileId);

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [hearts, setHearts] = useState(HEARTS);
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [xpGained, setXpGained] = useState(0);
  const [phase, setPhase] = useState<Phase>("playing");
  const [leveledUp, setLeveledUp] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const subjectInfo = SUBJECT_LABELS[subject];

  const restart = useCallback(() => {
    if (!profile) return;
    const ex = getRandomExercises(profile.id as ProfileId, subject as Subject, TOTAL_QUESTIONS);
    setExercises(ex);
    setCurrent(0);
    setSelected(null);
    setHearts(HEARTS);
    setStreak(0);
    setScore(0);
    setXpGained(0);
    setPhase("playing");
    setLeveledUp(false);
    setShowFeedback(false);
  }, [profile, subject]);

  useEffect(() => {
    restart();
  }, [restart]);

  if (!profile || !subjectInfo) return notFound();

  const exercise = exercises[current];

  const handleAnswer = (idx: number) => {
    if (selected !== null || !exercise) return;
    setSelected(idx);

    const correct = idx === exercise.correct;
    setIsCorrect(correct);
    setShowFeedback(true);

    const newStreak = correct ? streak + 1 : 0;
    setStreak(newStreak);

    const { newXp, leveledUp: lu } = addXp(
      profile.id as ProfileId,
      subject as Subject,
      correct,
      newStreak
    );
    if (correct) {
      setScore((s) => s + 1);
      setXpGained((x) => x + newXp);
    } else {
      setHearts((h) => Math.max(0, h - 1));
    }
    if (lu) setLeveledUp(true);

    setTimeout(() => {
      setShowFeedback(false);
      setSelected(null);
      if (!correct && hearts <= 1) {
        setPhase("result");
      } else if (current + 1 >= exercises.length) {
        setPhase("result");
      } else {
        setCurrent((c) => c + 1);
      }
    }, 1200);
  };

  const progressPercent = exercises.length > 0 ? ((current) / exercises.length) * 100 : 0;

  if (phase === "result") {
    const pct = Math.round((score / TOTAL_QUESTIONS) * 100);
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-8 shadow-xl max-w-md w-full text-center">
          <div className="text-6xl mb-4">
            {pct >= 80 ? "🏆" : pct >= 50 ? "⭐" : "💪"}
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
            {pct >= 80 ? "Excellent !" : pct >= 50 ? "Bien joué !" : "Continue !"}
          </h2>
          <p className="text-gray-500 mb-6">
            {score}/{TOTAL_QUESTIONS} bonnes réponses
          </p>

          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="bg-indigo-50 rounded-2xl p-3">
              <div className="text-2xl font-bold text-indigo-600">{score}</div>
              <div className="text-xs text-gray-400">Bonnes rép.</div>
            </div>
            <div className="bg-yellow-50 rounded-2xl p-3">
              <div className="text-2xl font-bold text-yellow-600">+{xpGained}</div>
              <div className="text-xs text-gray-400">XP gagnés</div>
            </div>
            <div className="bg-orange-50 rounded-2xl p-3">
              <div className="text-2xl font-bold text-orange-600">{streak}</div>
              <div className="text-xs text-gray-400">Max série</div>
            </div>
          </div>

          {leveledUp && (
            <div className="bg-yellow-100 border border-yellow-300 rounded-2xl p-3 mb-4 text-yellow-800 font-semibold">
              🎉 Niveau supérieur atteint !
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={restart}
              className={`flex-1 py-3 rounded-xl font-bold text-white bg-gradient-to-r ${profile.bgGradient} hover:opacity-90 transition-opacity`}
            >
              Rejouer 🔄
            </button>
            <Link href={`/${profile.id}`} className="flex-1">
              <button className="w-full py-3 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors">
                Retour
              </button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!exercise) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400 text-xl">Chargement...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top bar */}
      <div className={`bg-gradient-to-r ${profile.bgGradient} px-4 py-3`}>
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href={`/${profile.id}`} className="text-white/80 hover:text-white text-sm">
            ✕
          </Link>
          <div className="flex-1 mx-4">
            <div className="w-full h-2 bg-white/30 rounded-full">
              <div
                className="h-2 bg-white rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <div className="flex items-center gap-3 text-white text-sm font-semibold">
            <span>{Array.from({ length: HEARTS }, (_, i) => (i < hearts ? "❤️" : "🖤")).join("")}</span>
            {streak >= 2 && <span className="bg-white/20 px-2 py-0.5 rounded-full">🔥{streak}</span>}
          </div>
        </div>
      </div>

      {/* Exercise */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <span>{subjectInfo.emoji}</span>
          <span>{subjectInfo.label}</span>
          <span>·</span>
          <span>Question {current + 1}/{exercises.length}</span>
          <span>·</span>
          <span className="text-indigo-500 font-semibold">+{xpGained} XP</span>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-6">
          <p className="text-2xl font-bold text-gray-800 text-center leading-relaxed">
            {exercise.question}
          </p>
        </div>

        {/* Feedback overlay */}
        {showFeedback && (
          <div className={`fixed inset-0 flex items-center justify-center z-50 pointer-events-none`}>
            <div className={`text-8xl animate-bounce ${isCorrect ? "" : ""}`}>
              {isCorrect ? "✅" : "❌"}
            </div>
          </div>
        )}

        {/* Options */}
        <div className="grid grid-cols-1 gap-3">
          {exercise.options.map((option, idx) => {
            let bg = "bg-white border-2 border-gray-200 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50";
            if (selected !== null) {
              if (idx === exercise.correct) {
                bg = "bg-green-50 border-2 border-green-400 text-green-800";
              } else if (idx === selected && idx !== exercise.correct) {
                bg = "bg-red-50 border-2 border-red-400 text-red-800";
              } else {
                bg = "bg-white border-2 border-gray-100 text-gray-400";
              }
            }
            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={selected !== null}
                className={`w-full p-4 rounded-2xl text-left font-semibold text-lg transition-all duration-150 ${bg} disabled:cursor-default`}
              >
                <span className="inline-block w-8 h-8 rounded-full bg-gray-100 text-gray-500 text-sm text-center leading-8 mr-3 font-bold">
                  {String.fromCharCode(65 + idx)}
                </span>
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
