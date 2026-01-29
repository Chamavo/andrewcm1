import { motion } from "framer-motion";
import { Trophy, RotateCcw, Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MathsResultProps {
  score: number;
  totalQuestions: number;
  onRetry: () => void;
  onNextLevel?: () => void;
  onBackToMenu: () => void;
  showNextLevel?: boolean;
}

const MathsResult = ({
  score,
  totalQuestions,
  onRetry,
  onNextLevel,
  onBackToMenu,
  showNextLevel = false,
}: MathsResultProps) => {
  const isPerfect = score === totalQuestions;
  const isExcellent = score >= totalQuestions * 0.8;
  const isGood = score >= totalQuestions * 0.6;

  return (
    <div className="min-h-screen bg-gradient-to-br from-maths via-primary to-maths-dark p-4 md:p-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-3xl p-8 shadow-2xl max-w-md w-full text-center"
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Trophy
            className={`w-24 h-24 mx-auto mb-4 ${
              isPerfect ? "text-star" : "text-maths"
            }`}
          />
        </motion.div>

        <h2 className="text-3xl font-bold text-foreground mb-2">
          {isPerfect
            ? "🎉 Parfait !"
            : isExcellent
            ? "👏 Excellent !"
            : isGood
            ? "👍 Bien joué !"
            : "💪 Continue !"}
        </h2>

        <p className="text-xl text-muted-foreground mb-6">
          Tu as obtenu{" "}
          <span className="font-bold text-maths">
            {score}/{totalQuestions}
          </span>{" "}
          bonnes réponses
        </p>

        <div className="flex flex-col gap-3">
          <Button
            onClick={onRetry}
            className="w-full py-4 text-lg font-bold bg-gradient-to-r from-success to-success-light hover:opacity-90 rounded-xl text-success-foreground"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Réessayer
          </Button>

          {showNextLevel && isPerfect && onNextLevel && (
            <Button
              onClick={onNextLevel}
              className="w-full py-4 text-lg font-bold bg-gradient-to-r from-maths to-primary hover:opacity-90 rounded-xl text-primary-foreground"
            >
              Niveau suivant
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          )}

          <Button
            onClick={onBackToMenu}
            variant="outline"
            className="w-full py-4 text-lg font-bold rounded-xl"
          >
            <Home className="w-5 h-5 mr-2" />
            Menu
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default MathsResult;
