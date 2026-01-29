import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Trophy, RotateCcw, Home, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import confetti from "canvas-confetti";
import { Link } from "react-router-dom";

interface Question {
  question: string;
  answer: number;
}

const levels: { name: string; description: string; questions: Question[] }[] = [
  {
    name: "Niveau 1",
    description: "Additions et soustractions avec passage de dizaine",
    questions: [
      { question: "8 + 7 = ?", answer: 15 },
      { question: "14 − 9 = ?", answer: 5 },
      { question: "27 + 8 = ?", answer: 35 },
      { question: "20 − 9 = ?", answer: 11 },
      { question: "46 + 7 = ?", answer: 53 },
      { question: "32 − 8 = ?", answer: 24 },
      { question: "58 + 6 = ?", answer: 64 },
      { question: "41 − 7 = ?", answer: 34 },
      { question: "9 + 8 = ?", answer: 17 },
      { question: "15 − 7 = ?", answer: 8 },
    ],
  },
  {
    name: "Niveau 2",
    description: "Multiplications et divisions par 10, 100, 1000",
    questions: [
      { question: "45 × 10 = ?", answer: 450 },
      { question: "340 ÷ 10 = ?", answer: 34 },
      { question: "3,7 × 100 = ?", answer: 370 },
      { question: "750 ÷ 100 = ?", answer: 7.5 },
      { question: "2,5 × 1000 = ?", answer: 2500 },
      { question: "4500 ÷ 1000 = ?", answer: 4.5 },
      { question: "80 × 0,1 = ?", answer: 8 },
      { question: "48 × 0,5 = ?", answer: 24 },
      { question: "120 × 0,25 = ?", answer: 30 },
      { question: "64 × 0,5 = ?", answer: 32 },
    ],
  },
  {
    name: "Niveau 3",
    description: "Tables de multiplication",
    questions: [
      { question: "6 × 4 = ?", answer: 24 },
      { question: "7 × 5 = ?", answer: 35 },
      { question: "8 × 3 = ?", answer: 24 },
      { question: "9 × 4 = ?", answer: 36 },
      { question: "6 × 5 = ?", answer: 30 },
      { question: "7 × 8 = ?", answer: 56 },
      { question: "9 × 6 = ?", answer: 54 },
      { question: "8 × 7 = ?", answer: 56 },
      { question: "24 ÷ 6 = ?", answer: 4 },
      { question: "56 ÷ 8 = ?", answer: 7 },
    ],
  },
  {
    name: "Niveau 4",
    description: "Fractions simples",
    questions: [
      { question: "1/2 de 16 = ?", answer: 8 },
      { question: "1/3 de 21 = ?", answer: 7 },
      { question: "1/4 de 24 = ?", answer: 6 },
      { question: "1/2 de 30 = ?", answer: 15 },
      { question: "1/3 de 27 = ?", answer: 9 },
      { question: "1/4 de 40 = ?", answer: 10 },
      { question: "1/2 de 48 = ?", answer: 24 },
      { question: "1/3 de 18 = ?", answer: 6 },
      { question: "1/4 de 32 = ?", answer: 8 },
      { question: "1/2 de 26 = ?", answer: 13 },
    ],
  },
  {
    name: "Niveau 5",
    description: "Pourcentages simples",
    questions: [
      { question: "25% de 40 = ?", answer: 10 },
      { question: "50% de 60 = ?", answer: 30 },
      { question: "10% de 50 = ?", answer: 5 },
      { question: "75% de 20 = ?", answer: 15 },
      { question: "20% de 100 = ?", answer: 20 },
      { question: "50% de 90 = ?", answer: 45 },
      { question: "25% de 120 = ?", answer: 30 },
      { question: "10% de 200 = ?", answer: 20 },
      { question: "75% de 80 = ?", answer: 60 },
      { question: "20% de 150 = ?", answer: 30 },
    ],
  },
  {
    name: "Niveau 6",
    description: "Doubles et moitiés",
    questions: [
      { question: "Double de 35 = ?", answer: 70 },
      { question: "Moitié de 48 = ?", answer: 24 },
      { question: "Double de 125 = ?", answer: 250 },
      { question: "Moitié de 150 = ?", answer: 75 },
      { question: "Double de 450 = ?", answer: 900 },
      { question: "Moitié de 360 = ?", answer: 180 },
      { question: "Double de 75 = ?", answer: 150 },
      { question: "Moitié de 250 = ?", answer: 125 },
      { question: "Double de 225 = ?", answer: 450 },
      { question: "Moitié de 90 = ?", answer: 45 },
    ],
  },
  {
    name: "Niveau 7",
    description: "Compléments à 100 et 1000",
    questions: [
      { question: "67 + ? = 100", answer: 33 },
      { question: "45 + ? = 100", answer: 55 },
      { question: "82 + ? = 100", answer: 18 },
      { question: "350 + ? = 1000", answer: 650 },
      { question: "720 + ? = 1000", answer: 280 },
      { question: "175 + ? = 1000", answer: 825 },
      { question: "58 + ? = 100", answer: 42 },
      { question: "460 + ? = 1000", answer: 540 },
      { question: "91 + ? = 100", answer: 9 },
      { question: "555 + ? = 1000", answer: 445 },
    ],
  },
  {
    name: "Niveau 8",
    description: "Multiplications par 5 et 25",
    questions: [
      { question: "24 × 5 = ?", answer: 120 },
      { question: "36 × 5 = ?", answer: 180 },
      { question: "48 × 5 = ?", answer: 240 },
      { question: "8 × 25 = ?", answer: 200 },
      { question: "12 × 25 = ?", answer: 300 },
      { question: "16 × 25 = ?", answer: 400 },
      { question: "52 × 5 = ?", answer: 260 },
      { question: "20 × 25 = ?", answer: 500 },
      { question: "44 × 5 = ?", answer: 220 },
      { question: "24 × 25 = ?", answer: 600 },
    ],
  },
  {
    name: "Niveau 9",
    description: "Divisions simples",
    questions: [
      { question: "144 ÷ 12 = ?", answer: 12 },
      { question: "96 ÷ 8 = ?", answer: 12 },
      { question: "125 ÷ 5 = ?", answer: 25 },
      { question: "180 ÷ 9 = ?", answer: 20 },
      { question: "156 ÷ 12 = ?", answer: 13 },
      { question: "200 ÷ 8 = ?", answer: 25 },
      { question: "135 ÷ 9 = ?", answer: 15 },
      { question: "168 ÷ 7 = ?", answer: 24 },
      { question: "225 ÷ 15 = ?", answer: 15 },
      { question: "192 ÷ 6 = ?", answer: 32 },
    ],
  },
  {
    name: "Niveau 10",
    description: "Additions de nombres décimaux",
    questions: [
      { question: "3,5 + 2,8 = ?", answer: 6.3 },
      { question: "7,2 + 4,9 = ?", answer: 12.1 },
      { question: "5,6 + 3,7 = ?", answer: 9.3 },
      { question: "8,4 + 6,8 = ?", answer: 15.2 },
      { question: "2,75 + 1,25 = ?", answer: 4 },
      { question: "9,3 + 5,7 = ?", answer: 15 },
      { question: "4,8 + 7,6 = ?", answer: 12.4 },
      { question: "6,5 + 8,5 = ?", answer: 15 },
      { question: "3,25 + 4,75 = ?", answer: 8 },
      { question: "1,9 + 8,2 = ?", answer: 10.1 },
    ],
  },
  {
    name: "Niveau 11",
    description: "Soustractions de nombres décimaux",
    questions: [
      { question: "8,5 − 3,2 = ?", answer: 5.3 },
      { question: "12,4 − 7,8 = ?", answer: 4.6 },
      { question: "15,6 − 9,9 = ?", answer: 5.7 },
      { question: "20 − 8,5 = ?", answer: 11.5 },
      { question: "10 − 3,75 = ?", answer: 6.25 },
      { question: "7,2 − 4,6 = ?", answer: 2.6 },
      { question: "18,3 − 9,7 = ?", answer: 8.6 },
      { question: "25 − 12,5 = ?", answer: 12.5 },
      { question: "14,8 − 6,9 = ?", answer: 7.9 },
      { question: "30 − 17,25 = ?", answer: 12.75 },
    ],
  },
  {
    name: "Niveau 12",
    description: "Multiplications à 2 chiffres",
    questions: [
      { question: "12 × 15 = ?", answer: 180 },
      { question: "14 × 12 = ?", answer: 168 },
      { question: "16 × 11 = ?", answer: 176 },
      { question: "13 × 14 = ?", answer: 182 },
      { question: "15 × 15 = ?", answer: 225 },
      { question: "18 × 12 = ?", answer: 216 },
      { question: "11 × 17 = ?", answer: 187 },
      { question: "19 × 11 = ?", answer: 209 },
      { question: "14 × 16 = ?", answer: 224 },
      { question: "12 × 18 = ?", answer: 216 },
    ],
  },
  {
    name: "Niveau 13",
    description: "Fractions équivalentes",
    questions: [
      { question: "2/4 = ?/8", answer: 4 },
      { question: "3/5 = ?/10", answer: 6 },
      { question: "1/3 = ?/12", answer: 4 },
      { question: "2/3 = ?/9", answer: 6 },
      { question: "4/5 = ?/20", answer: 16 },
      { question: "5/6 = ?/12", answer: 10 },
      { question: "3/4 = ?/16", answer: 12 },
      { question: "2/7 = ?/14", answer: 4 },
      { question: "1/2 = ?/10", answer: 5 },
      { question: "3/8 = ?/24", answer: 9 },
    ],
  },
  {
    name: "Niveau 14",
    description: "Conversions d'unités (longueurs)",
    questions: [
      { question: "3 m = ? cm", answer: 300 },
      { question: "450 cm = ? m", answer: 4.5 },
      { question: "2,5 km = ? m", answer: 2500 },
      { question: "800 m = ? km", answer: 0.8 },
      { question: "75 mm = ? cm", answer: 7.5 },
      { question: "1,2 m = ? cm", answer: 120 },
      { question: "3500 m = ? km", answer: 3.5 },
      { question: "50 cm = ? m", answer: 0.5 },
      { question: "2 km 500 m = ? m", answer: 2500 },
      { question: "6,8 cm = ? mm", answer: 68 },
    ],
  },
  {
    name: "Niveau 15",
    description: "Conversions d'unités (masses)",
    questions: [
      { question: "3 kg = ? g", answer: 3000 },
      { question: "2500 g = ? kg", answer: 2.5 },
      { question: "750 g = ? kg", answer: 0.75 },
      { question: "1,5 kg = ? g", answer: 1500 },
      { question: "4 t = ? kg", answer: 4000 },
      { question: "500 kg = ? t", answer: 0.5 },
      { question: "3,25 kg = ? g", answer: 3250 },
      { question: "1200 g = ? kg", answer: 1.2 },
      { question: "2 kg 300 g = ? g", answer: 2300 },
      { question: "875 g = ? kg", answer: 0.875 },
    ],
  },
  {
    name: "Niveau 16",
    description: "Calculs avec les heures",
    questions: [
      { question: "2h30 + 1h45 = ?h?min → minutes totales", answer: 255 },
      { question: "180 min = ? h", answer: 3 },
      { question: "1h20 en minutes = ?", answer: 80 },
      { question: "3h − 45min = ? min", answer: 135 },
      { question: "2h15 + 2h45 = ? h", answer: 5 },
      { question: "150 min = ?h?min → heures", answer: 2 },
      { question: "45 min + 35 min = ?h?min → min", answer: 20 },
      { question: "4h − 1h30 = ?h?min → min", answer: 30 },
      { question: "90 min = ?h?min → heures", answer: 1 },
      { question: "3h20 en minutes = ?", answer: 200 },
    ],
  },
  {
    name: "Niveau 17",
    description: "Périmètres et aires",
    questions: [
      { question: "Périmètre carré côté 8 cm = ?", answer: 32 },
      { question: "Aire carré côté 5 cm = ?", answer: 25 },
      { question: "Périmètre rectangle 6×4 cm = ?", answer: 20 },
      { question: "Aire rectangle 7×3 cm = ?", answer: 21 },
      { question: "Périmètre carré côté 12 cm = ?", answer: 48 },
      { question: "Aire carré côté 9 cm = ?", answer: 81 },
      { question: "Périmètre rectangle 10×5 cm = ?", answer: 30 },
      { question: "Aire rectangle 8×6 cm = ?", answer: 48 },
      { question: "Côté carré périmètre 36 cm = ?", answer: 9 },
      { question: "Aire rectangle 15×4 cm = ?", answer: 60 },
    ],
  },
  {
    name: "Niveau 18",
    description: "Multiples et diviseurs",
    questions: [
      { question: "Premier multiple de 7 > 50 = ?", answer: 56 },
      { question: "Plus grand diviseur de 24 < 24 = ?", answer: 12 },
      { question: "5ème multiple de 6 = ?", answer: 30 },
      { question: "36 ÷ ? = 4", answer: 9 },
      { question: "? × 8 = 72", answer: 9 },
      { question: "Plus petit multiple commun de 4 et 6 = ?", answer: 12 },
      { question: "Nombre de diviseurs de 12 = ?", answer: 6 },
      { question: "4ème multiple de 9 = ?", answer: 36 },
      { question: "? × 7 = 63", answer: 9 },
      { question: "Premier multiple de 8 > 30 = ?", answer: 32 },
    ],
  },
  {
    name: "Niveau 19",
    description: "Calculs enchaînés",
    questions: [
      { question: "(5 + 3) × 4 = ?", answer: 32 },
      { question: "6 × (8 − 3) = ?", answer: 30 },
      { question: "(12 + 8) ÷ 4 = ?", answer: 5 },
      { question: "7 × 5 + 15 = ?", answer: 50 },
      { question: "100 − 6 × 8 = ?", answer: 52 },
      { question: "(9 + 6) × 3 = ?", answer: 45 },
      { question: "48 ÷ (2 + 6) = ?", answer: 6 },
      { question: "5 × 8 − 12 = ?", answer: 28 },
      { question: "(25 − 10) × 4 = ?", answer: 60 },
      { question: "36 ÷ 4 + 8 × 3 = ?", answer: 33 },
    ],
  },
  {
    name: "Niveau 20",
    description: "Problèmes rapides",
    questions: [
      { question: "3 cahiers à 2,50€ = ?€", answer: 7.5 },
      { question: "45 bonbons ÷ 9 enfants = ?", answer: 5 },
      { question: "Prix soldé −20% sur 50€ = ?€", answer: 40 },
      { question: "Distance 60 km/h × 3h = ? km", answer: 180 },
      { question: "Monnaie sur 20€ pour 13,50€ = ?€", answer: 6.5 },
      { question: "5 paquets de 12 gâteaux = ?", answer: 60 },
      { question: "1/4 de 80€ = ?€", answer: 20 },
      { question: "Périmètre jardin 25m × 15m = ? m", answer: 80 },
      { question: "3 pizzas pour 8 personnes = ? parts", answer: 24 },
      { question: "15% de 200€ = ?€", answer: 30 },
    ],
  },
];

type GameState = "menu" | "playing" | "result";

const MentalCalcTrainer = () => {
  const [gameState, setGameState] = useState<GameState>("menu");
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  const currentLevelData = levels[currentLevel];
  const currentQuestion = currentLevelData?.questions[currentQuestionIndex];
  const totalQuestions = currentLevelData?.questions.length || 0;
  const progress = ((currentQuestionIndex) / totalQuestions) * 100;

  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState, timeLeft]);

  const startLevel = (levelIndex: number) => {
    setCurrentLevel(levelIndex);
    setCurrentQuestionIndex(0);
    setScore(0);
    setStreak(0);
    setUserAnswer("");
    setTimeLeft(levels[levelIndex].questions.length * 15); // 15 seconds per question
    setGameState("playing");
  };

  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#22c55e", "#3b82f6", "#f59e0b", "#ec4899"],
    });
  }, []);

  const handleSubmit = () => {
    if (!currentQuestion || userAnswer === "") return;

    const numericAnswer = parseFloat(userAnswer.replace(",", "."));
    const isCorrect = Math.abs(numericAnswer - currentQuestion.answer) < 0.01;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      setShowFeedback("correct");
      if (streak >= 2) {
        triggerConfetti();
      }
    } else {
      setStreak(0);
      setShowFeedback("incorrect");
    }

    setTimeout(() => {
      setShowFeedback(null);
      setUserAnswer("");
      
      if (currentQuestionIndex + 1 >= totalQuestions) {
        if (score + (isCorrect ? 1 : 0) === totalQuestions) {
          triggerConfetti();
        }
        setGameState("result");
      } else {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && showFeedback === null) {
      handleSubmit();
    }
  };

  const resetGame = () => {
    setGameState("menu");
    setCurrentLevel(0);
    setCurrentQuestionIndex(0);
    setScore(0);
    setStreak(0);
    setUserAnswer("");
  };

  // Menu screen
  if (gameState === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-2">
              🧮 Calcul Mental
            </h1>
            <p className="text-white/90 text-lg">Choisis ton niveau et entraîne-toi !</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {levels.map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => startLevel(index)}
                  className="w-full h-auto p-6 bg-white/90 hover:bg-white text-gray-800 flex flex-col items-start gap-2 rounded-2xl shadow-lg"
                >
                  <span className="text-2xl font-bold text-blue-600">{level.name}</span>
                  <span className="text-sm text-gray-600 text-left">{level.description}</span>
                  <span className="text-xs text-gray-500">{level.questions.length} questions</span>
                </Button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <Link to="/">
              <Button variant="outline" className="bg-white/80 hover:bg-white">
                <Home className="w-4 h-4 mr-2" />
                Retour à l'accueil
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  // Playing screen
  if (gameState === "playing") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-4 md:p-8 flex items-center justify-center">
        <div className="w-full max-w-lg">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 rounded-2xl p-4 mb-4 shadow-lg"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-blue-600">{currentLevelData.name}</span>
              <div className="flex items-center gap-4">
                {streak >= 3 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1 text-orange-500"
                  >
                    <Zap className="w-5 h-5" />
                    <span className="font-bold">{streak}</span>
                  </motion.div>
                )}
                <span className="text-gray-600">
                  {currentQuestionIndex + 1}/{totalQuestions}
                </span>
              </div>
            </div>
            <Progress value={progress} className="h-3" />
          </motion.div>

          {/* Question card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white rounded-3xl p-8 shadow-2xl"
            >
              <div className="text-center mb-8">
                <motion.div
                  className="text-5xl md:text-6xl font-bold text-gray-800 mb-4"
                  animate={showFeedback ? { scale: [1, 1.1, 1] } : {}}
                >
                  {currentQuestion?.question}
                </motion.div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={showFeedback !== null}
                  placeholder="Ta réponse..."
                  className="w-full text-center text-3xl md:text-4xl font-bold p-4 border-4 border-blue-300 rounded-2xl focus:border-blue-500 focus:outline-none transition-colors"
                  autoFocus
                />

                {/* Feedback overlay */}
                <AnimatePresence>
                  {showFeedback && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className={`absolute inset-0 flex items-center justify-center rounded-2xl ${
                        showFeedback === "correct"
                          ? "bg-green-100/90"
                          : "bg-red-100/90"
                      }`}
                    >
                      {showFeedback === "correct" ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="w-12 h-12" />
                          <span className="text-3xl font-bold">Bravo !</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1 text-red-600">
                          <div className="flex items-center gap-2">
                            <XCircle className="w-10 h-10" />
                            <span className="text-2xl font-bold">Dommage !</span>
                          </div>
                          <span className="text-lg">
                            Réponse : {currentQuestion?.answer}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-6"
              >
                <Button
                  onClick={handleSubmit}
                  disabled={userAnswer === "" || showFeedback !== null}
                  className="w-full py-6 text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-2xl"
                >
                  Valider ✓
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // Result screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-4 md:p-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full text-center"
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Trophy
            className={`w-24 h-24 mx-auto mb-4 ${
              score === totalQuestions ? "text-yellow-500" : "text-blue-500"
            }`}
          />
        </motion.div>

        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {score === totalQuestions
            ? "🎉 Parfait !"
            : score >= totalQuestions * 0.8
            ? "👏 Excellent !"
            : score >= totalQuestions * 0.6
            ? "👍 Bien joué !"
            : "💪 Continue !"}
        </h2>

        <p className="text-xl text-gray-600 mb-6">
          Tu as obtenu{" "}
          <span className="font-bold text-blue-600">
            {score}/{totalQuestions}
          </span>{" "}
          bonnes réponses
        </p>

        <div className="flex flex-col gap-3">
          <Button
            onClick={() => startLevel(currentLevel)}
            className="w-full py-4 text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Réessayer ce niveau
          </Button>

          {score === totalQuestions && currentLevel < levels.length - 1 && (
            <Button
              onClick={() => startLevel(currentLevel + 1)}
              className="w-full py-4 text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-xl"
            >
              Niveau suivant →
            </Button>
          )}

          <Button
            onClick={resetGame}
            variant="outline"
            className="w-full py-4 text-lg font-bold rounded-xl"
          >
            <Home className="w-5 h-5 mr-2" />
            Menu des niveaux
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default MentalCalcTrainer;
