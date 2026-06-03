"use client";
import { use, useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PROFILES } from "@/lib/profiles";
import { addXp } from "@/lib/gameState";
import { getRandomExercises } from "@/lib/exercises";
import { Exercise, ProfileId, Subject } from "@/lib/types";
import Confetti from "@/components/Confetti";
import { sounds } from "@/lib/sounds";

const SUBJECT_META: Record<string, { label: string; emoji: string; bg: string }> = {
  maths: { label: "Mathématiques", emoji: "🔢", bg: "from-blue-500 to-indigo-600" },
  francais: { label: "Français", emoji: "📖", bg: "from-purple-500 to-pink-500" },
  anglais: { label: "Anglais", emoji: "🌍", bg: "from-emerald-500 to-teal-600" },
};

// Kahoot-inspired distinct colors for each option
const OPTION_STYLES = [
  { base: "from-[#1368CE] to-[#0e52a8]", hover: "hover:from-[#1a7de8] hover:to-[#1368CE]", letter: "A" },
  { base: "from-[#D89E00] to-[#b07f00]", hover: "hover:from-[#f0b000] hover:to-[#D89E00]", letter: "B" },
  { base: "from-[#D43B47] to-[#b02d38]", hover: "hover:from-[#e8444f] hover:to-[#D43B47]", letter: "C" },
  { base: "from-[#26890C] to-[#1e6e0a]", hover: "hover:from-[#2ea00f] hover:to-[#26890C]", letter: "D" },
];

const HEARTS = 3;
const TOTAL_QUESTIONS = 10;

const MASCOT_REACTIONS = {
  idle: "😊",
  correct: "🥳",
  wrong: "😬",
  streak: "🔥",
  levelup: "🤩",
};

type Phase = "playing" | "result";

interface FloatingXp { id: number; amount: number; x: number }

export default function ExercisePage({ params }: { params: Promise<{ profileId: string; subject: string }> }) {
  const { profileId, subject } = use(params);
  const profile = PROFILES.find((p) => p.id === profileId);

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [hearts, setHearts] = useState(HEARTS);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [xpGained, setXpGained] = useState(0);
  const [phase, setPhase] = useState<Phase>("playing");
  const [leveledUp, setLeveledUp] = useState(false);
  const [mascot, setMascot] = useState<keyof typeof MASCOT_REACTIONS>("idle");
  const [floatingXps, setFloatingXps] = useState<FloatingXp[]>([]);
  const [confettiTrigger, setConfettiTrigger] = useState(false);
  const [confettiType, setConfettiType] = useState<"correct" | "win" | "levelup">("correct");
  const [shakeKey, setShakeKey] = useState(0);
  const [questionKey, setQuestionKey] = useState(0);
  const floatingIdRef = useRef(0);

  const subjectMeta = SUBJECT_META[subject];

  const restart = useCallback(() => {
    if (!profile) return;
    const ex = getRandomExercises(profile.id as ProfileId, subject as Subject, TOTAL_QUESTIONS);
    setExercises(ex);
    setCurrent(0);
    setSelected(null);
    setHearts(HEARTS);
    setStreak(0);
    setMaxStreak(0);
    setScore(0);
    setXpGained(0);
    setPhase("playing");
    setLeveledUp(false);
    setMascot("idle");
    setFloatingXps([]);
    setConfettiTrigger(false);
    setQuestionKey(0);
  }, [profile, subject]);

  useEffect(() => { restart(); }, [restart]);

  if (!profile || !subjectMeta) return notFound();

  const exercise = exercises[current];
  const progressPercent = exercises.length > 0 ? (current / exercises.length) * 100 : 0;

  const handleAnswer = (idx: number) => {
    if (selected !== null || !exercise) return;
    sounds.click();
    setSelected(idx);

    const correct = idx === exercise.correct;
    const newStreak = correct ? streak + 1 : 0;
    setStreak(newStreak);
    if (newStreak > maxStreak) setMaxStreak(newStreak);

    const { newXp, leveledUp: lu } = addXp(
      profile.id as ProfileId,
      subject as Subject,
      correct,
      newStreak
    );

    if (correct) {
      sounds.correct();
      setScore((s) => s + 1);
      setXpGained((x) => x + newXp);
      setMascot(newStreak >= 3 ? "streak" : "correct");
      setConfettiTrigger(false);
      setTimeout(() => { setConfettiTrigger(true); setConfettiType("correct"); }, 10);

      // Floating XP
      const id = floatingIdRef.current++;
      setFloatingXps((prev) => [...prev, { id, amount: newXp, x: 40 + Math.random() * 20 }]);
      setTimeout(() => setFloatingXps((prev) => prev.filter((f) => f.id !== id)), 1200);

      if (lu) {
        setLeveledUp(true);
        sounds.levelup();
        setTimeout(() => { setConfettiTrigger(true); setConfettiType("levelup"); }, 500);
      }
    } else {
      sounds.wrong();
      setMascot("wrong");
      setHearts((h) => Math.max(0, h - 1));
      setShakeKey((k) => k + 1);
    }

    setTimeout(() => {
      setSelected(null);
      setMascot("idle");
      const newHearts = correct ? hearts : hearts - 1;
      if ((!correct && newHearts <= 0) || current + 1 >= exercises.length) {
        sounds.win();
        setPhase("result");
        setTimeout(() => { setConfettiTrigger(true); setConfettiType("win"); }, 200);
      } else {
        setCurrent((c) => c + 1);
        setQuestionKey((k) => k + 1);
      }
    }, 1400);
  };

  // ─── RESULT SCREEN ───────────────────────────────────────────────
  if (phase === "result") {
    const pct = Math.round((score / TOTAL_QUESTIONS) * 100);
    const stars = pct >= 90 ? 3 : pct >= 60 ? 2 : pct >= 30 ? 1 : 0;
    const messages = ["Continue, tu peux le faire ! 💪", "Pas mal du tout ! 😊", "Super travail ! 🌟", `PARFAIT ${profile.name} ! 🏆🎉`];

    return (
      <main className="min-h-screen flex items-center justify-center px-4"
        style={{ background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)` }}>
        <Confetti trigger={confettiTrigger} type={confettiType} />

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full text-center"
        >
          {/* Stars */}
          <div className="flex justify-center gap-2 mb-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -30 }}
                animate={i < stars ? { scale: 1, rotate: 0 } : { scale: 0.4, rotate: 0 }}
                transition={{ delay: 0.3 + i * 0.2, type: "spring", bounce: 0.6 }}
                className={`text-5xl ${i < stars ? "" : "opacity-20"}`}
              >
                ⭐
              </motion.div>
            ))}
          </div>

          {/* Mascot */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-6xl mb-3"
          >
            {stars === 3 ? "🏆" : stars === 2 ? "🥈" : stars === 1 ? "💪" : "😅"}
          </motion.div>

          <h2 className="text-3xl font-black text-gray-800 mb-1">{messages[stars]}</h2>
          <p className="text-gray-400 font-semibold mb-6">{score}/{TOTAL_QUESTIONS} bonnes réponses</p>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: "Score", value: `${pct}%`, color: "indigo" },
              { label: "XP gagnés", value: `+${xpGained}`, color: "yellow" },
              { label: "Série max", value: `🔥${maxStreak}`, color: "orange" },
            ].map(({ label, value, color }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={`bg-${color}-50 rounded-2xl p-3`}
              >
                <div className={`text-2xl font-black text-${color}-600`}>{value}</div>
                <div className="text-xs text-gray-400 font-semibold">{label}</div>
              </motion.div>
            ))}
          </div>

          {leveledUp && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-yellow-100 border-2 border-yellow-300 rounded-2xl p-3 mb-4 text-yellow-800 font-black text-lg"
            >
              🎉 Niveau supérieur débloqué !
            </motion.div>
          )}

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={restart}
              className={`flex-1 py-3.5 rounded-2xl font-black text-white text-lg bg-gradient-to-r ${profile.bgGradient} shadow-lg`}
            >
              🔄 Rejouer
            </motion.button>
            <Link href={`/${profile.id}`} className="flex-1">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="w-full py-3.5 rounded-2xl font-black text-gray-600 bg-gray-100 text-lg"
              >
                🏠 Accueil
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  if (!exercise) {
    return <main className="min-h-screen flex items-center justify-center">
      <div className="text-white text-xl">Chargement...</div>
    </main>;
  }

  // ─── PLAYING SCREEN ───────────────────────────────────────────────
  return (
    <main className="min-h-screen flex flex-col" style={{ background: "linear-gradient(160deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}>
      <Confetti trigger={confettiTrigger} type={confettiType} />

      {/* Floating XP texts */}
      {floatingXps.map((f) => (
        <div
          key={f.id}
          className="fixed z-50 pointer-events-none font-black text-3xl text-yellow-300 drop-shadow-lg animate-float-up"
          style={{ left: `${f.x}%`, top: "45%" }}
        >
          +{f.amount} XP ⭐
        </div>
      ))}

      {/* TOP BAR */}
      <div className="px-4 pt-4 pb-2">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          {/* Close */}
          <Link href={`/${profile.id}`}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center font-black text-lg hover:bg-white/20"
            >
              ✕
            </motion.button>
          </Link>

          {/* Progress bar */}
          <div className="flex-1 h-4 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className={`h-4 rounded-full bg-gradient-to-r ${subjectMeta.bg}`}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>

          {/* Q counter */}
          <div className="text-white/70 font-bold text-sm w-14 text-right">
            {current + 1}/{exercises.length}
          </div>
        </div>

        {/* Hearts & Streak */}
        <div className="max-w-2xl mx-auto flex items-center justify-between mt-2 px-1">
          <div className="flex gap-1" key={shakeKey}>
            {Array.from({ length: HEARTS }, (_, i) => (
              <motion.span
                key={i}
                animate={i >= hearts ? { scale: [1, 1.3, 0.5], opacity: [1, 1, 0.3] } : {}}
                className="text-2xl"
              >
                {i < hearts ? "❤️" : "🖤"}
              </motion.span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {streak >= 2 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="glass text-white font-black px-3 py-1 rounded-full text-sm"
              >
                🔥 {streak} combo !
              </motion.div>
            )}
            <div className="glass text-yellow-300 font-black px-3 py-1 rounded-full text-sm">
              ⭐ {xpGained} XP
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-4 max-w-2xl mx-auto w-full">

        {/* Subject label */}
        <div className="flex items-center gap-2 text-white/50 text-sm font-bold mb-4">
          <span>{subjectMeta.emoji}</span>
          <span>{subjectMeta.label}</span>
        </div>

        {/* Mascot */}
        <motion.div
          key={mascot}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          className="text-5xl mb-4"
          style={mascot !== "idle" ? { animation: "wiggle 0.5s ease-in-out" } : {}}
        >
          {MASCOT_REACTIONS[mascot]}
        </motion.div>

        {/* Question card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={questionKey}
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="w-full bg-white rounded-3xl p-6 mb-6 text-center card-shadow"
          >
            <p className="text-2xl font-extrabold text-gray-800 leading-relaxed">
              {exercise.question}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Answer buttons */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`opts-${questionKey}`}
            className="w-full grid grid-cols-1 gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {exercise.options.map((option, idx) => {
              const style = OPTION_STYLES[idx % OPTION_STYLES.length];
              let override = "";
              if (selected !== null) {
                if (idx === exercise.correct) override = "from-green-500 to-green-600 animate-pulse-green";
                else if (idx === selected) override = `from-red-500 to-red-600 animate-pulse-red ${shakeKey > 0 ? "animate-shake" : ""}`;
                else override = "opacity-40 from-gray-500 to-gray-600";
              }

              return (
                <motion.button
                  key={idx}
                  whileHover={selected === null ? { scale: 1.02, x: 4 } : {}}
                  whileTap={selected === null ? { scale: 0.97 } : {}}
                  onClick={() => handleAnswer(idx)}
                  disabled={selected !== null}
                  className={`w-full p-4 rounded-2xl text-white font-black text-lg text-left flex items-center gap-4 bg-gradient-to-r transition-all duration-150 ${override || `${style.base} ${style.hover}`} disabled:cursor-default shadow-lg`}
                >
                  <span className="w-9 h-9 rounded-xl bg-black/20 flex items-center justify-center text-sm font-black shrink-0">
                    {style.letter}
                  </span>
                  <span className="flex-1">{option}</span>
                  {selected !== null && idx === exercise.correct && (
                    <span className="text-2xl">✅</span>
                  )}
                  {selected !== null && idx === selected && idx !== exercise.correct && (
                    <span className="text-2xl">❌</span>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
