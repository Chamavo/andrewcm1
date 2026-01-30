import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Zap, AlertTriangle, BookOpen, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import confetti from "canvas-confetti";
import { Question } from "@/data/mathsLevels";

interface MathsGameProps {
  title: string;
  questions: Question[];
  onComplete: (score: number, totalQuestions: number, errors: number) => void;
  onBlocked?: () => void;
  onBack?: () => void;
  isLevelMode?: boolean;
  maxErrors?: number;
  levelIndex?: number;
  accentColor?: string;
}

const MathsGame = ({
  title,
  questions,
  onComplete,
  onBlocked,
  onBack,
  isLevelMode = false,
  maxErrors,
  levelIndex,
  accentColor = "text-maths",
}: MathsGameProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [showFeedback, setShowFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [streak, setStreak] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = (currentQuestionIndex / totalQuestions) * 100;

  // Determine max errors allowed
  const effectiveMaxErrors = maxErrors !== undefined ? maxErrors : 999;

  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#22c55e", "#3b82f6", "#f59e0b", "#ec4899"],
    });
  }, []);

  const handleSubmit = () => {
    if (!currentQuestion || userAnswer === "" || isBlocked) return;

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
      const newErrors = errors + 1;
      setErrors(newErrors);

      // Check if blocked (only in level mode)
      if (isLevelMode && newErrors > effectiveMaxErrors) {
        setTimeout(() => {
          setIsBlocked(true);
        }, 1500);
        return;
      }
    }

    setTimeout(() => {
      setShowFeedback(null);
      setUserAnswer("");

      if (currentQuestionIndex + 1 >= totalQuestions) {
        const finalScore = score + (isCorrect ? 1 : 0);
        const finalErrors = errors + (isCorrect ? 0 : 1);
        if (finalScore === totalQuestions) {
          triggerConfetti();
        }
        onComplete(finalScore, totalQuestions, finalErrors);
      } else {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && showFeedback === null && !isBlocked) {
      handleSubmit();
    }
  };

  // Blocked screen
  if (isBlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-destructive via-destructive/80 to-accent p-4 md:p-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-3xl p-8 shadow-2xl max-w-md w-full text-center"
        >
          <motion.div
            animate={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <AlertTriangle className="w-20 h-20 mx-auto mb-4 text-destructive" />
          </motion.div>

          <h2 className="text-2xl font-bold text-foreground mb-2">
            Trop d'erreurs ! 😅
          </h2>

          <p className="text-muted-foreground mb-2">
            Tu as fait plus de {effectiveMaxErrors} erreur{effectiveMaxErrors > 1 ? "s" : ""} dans ce niveau.
          </p>

          <p className="text-lg text-foreground mb-6">
            Pas de panique ! Révise un peu avant de continuer. 📚
          </p>

          <div className="bg-muted/50 rounded-xl p-4 mb-6">
            <p className="text-sm text-muted-foreground">
              Score actuel : <span className="font-bold text-foreground">{score}/{currentQuestionIndex + 1}</span>
            </p>
            <p className="text-sm text-destructive font-medium">
              Erreurs : {errors}
            </p>
          </div>

          <Button
            onClick={onBlocked}
            className="w-full py-4 text-lg font-bold bg-gradient-to-r from-concentration to-concentration-dark hover:opacity-90 rounded-xl text-primary-foreground"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Aller aux révisions
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(190,100%,97%)] to-white p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card/95 rounded-2xl p-4 mb-4 shadow-lg"
        >
          <div className="flex justify-between items-center mb-2">
            {onBack ? (
              <Button
                onClick={onBack}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Retour
              </Button>
            ) : (
              <span className="font-bold text-[hsl(190,100%,35%)]">{title}</span>
            )}
            <div className="flex items-center gap-4">
              {/* Error counter for level mode */}
              {isLevelMode && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`flex items-center gap-1 ${
                    errors >= effectiveMaxErrors ? "text-destructive" : "text-muted-foreground"
                  }`}
                >
                  <XCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">{errors}/{effectiveMaxErrors + 1}</span>
                </motion.div>
              )}
              {streak >= 3 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1 text-accent"
                >
                  <Zap className="w-5 h-5" />
                  <span className="font-bold">{streak}</span>
                </motion.div>
              )}
              <span className="text-muted-foreground">
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
            className="bg-card rounded-3xl p-8 shadow-2xl"
          >
            <div className="text-center mb-8">
              <motion.div
                className="text-4xl md:text-5xl font-bold text-foreground mb-4"
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
                className="w-full text-center text-3xl md:text-4xl font-bold p-4 border-4 border-[hsl(190,100%,80%)] rounded-2xl focus:border-[hsl(190,100%,45%)] focus:outline-none transition-colors bg-background text-foreground"
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
                        ? "bg-success-light/95"
                        : "bg-destructive/20"
                    }`}
                  >
                    {showFeedback === "correct" ? (
                      <div className="flex items-center gap-2 text-[hsl(145,85%,35%)]">
                        <CheckCircle className="w-12 h-12" />
                        <span className="text-3xl font-bold">Bravo !</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-destructive">
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
                className="w-full py-6 text-xl font-bold bg-gradient-to-r from-[hsl(190,100%,45%)] to-[hsl(200,100%,50%)] hover:opacity-90 rounded-2xl text-white shadow-lg"
              >
                Valider ✓
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MathsGame;
