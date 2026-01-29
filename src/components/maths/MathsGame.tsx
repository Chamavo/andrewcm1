import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import confetti from "canvas-confetti";
import { Question } from "@/data/mathsLevels";

interface MathsGameProps {
  title: string;
  questions: Question[];
  onComplete: (score: number, totalQuestions: number) => void;
  accentColor?: string;
}

const MathsGame = ({ title, questions, onComplete, accentColor = "text-maths" }: MathsGameProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [streak, setStreak] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = (currentQuestionIndex / totalQuestions) * 100;

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
        const finalScore = score + (isCorrect ? 1 : 0);
        if (finalScore === totalQuestions) {
          triggerConfetti();
        }
        onComplete(finalScore, totalQuestions);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-maths via-primary to-maths-dark p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card/95 rounded-2xl p-4 mb-4 shadow-lg"
        >
          <div className="flex justify-between items-center mb-2">
            <span className={`font-bold ${accentColor}`}>{title}</span>
            <div className="flex items-center gap-4">
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
                className="w-full text-center text-3xl md:text-4xl font-bold p-4 border-4 border-maths/30 rounded-2xl focus:border-maths focus:outline-none transition-colors bg-background text-foreground"
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
                      <div className="flex items-center gap-2 text-success">
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
                className="w-full py-6 text-xl font-bold bg-gradient-to-r from-maths to-primary hover:opacity-90 rounded-2xl text-primary-foreground"
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
