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
    description: "Pourcentages",
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
