import { motion } from "framer-motion";
import { Lock, CheckCircle, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { levels } from "@/data/mathsLevels";
import { useMathsProgress, getMaxErrorsForLevel } from "@/hooks/useMathsProgress";

interface ProgressionViewProps {
  onStartLevel: (index: number) => void;
  onBack: () => void;
}

const ProgressionView = ({ onStartLevel, onBack }: ProgressionViewProps) => {
  const { getLevelProgress, isLevelUnlocked, getCompletedLevelsCount, progress } = useMathsProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-success via-maths to-maths-dark p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-primary-foreground hover:bg-primary-foreground/20 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>

          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground drop-shadow-lg mb-2">
              🏆 Progression
            </h1>
            <div className="flex items-center justify-center gap-4 text-primary-foreground/90">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-5 h-5" />
                <span>{getCompletedLevelsCount()}/{levels.length} niveaux</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-star" />
                <span>{progress.totalStars} étoiles</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Levels Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4"
        >
          {levels.map((level, index) => {
            const levelProgress = getLevelProgress(index);
            const isCompleted = levelProgress?.completed;
            const isUnlocked = isLevelUnlocked(index);
            const bestScore = levelProgress?.bestScore || 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
                whileHover={isUnlocked ? { scale: 1.05 } : {}}
                whileTap={isUnlocked ? { scale: 0.95 } : {}}
              >
                <Button
                  onClick={() => isUnlocked && onStartLevel(index)}
                  disabled={!isUnlocked}
                  className={`w-full h-auto p-4 flex flex-col items-center gap-2 rounded-2xl shadow-lg relative transition-all ${
                    isUnlocked
                      ? isCompleted
                        ? "bg-gradient-to-br from-success to-success-light text-success-foreground hover:opacity-90"
                        : "bg-card/95 hover:bg-card text-foreground"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  {/* Status Icon */}
                  <div className="absolute top-2 right-2">
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-success-foreground" />
                    ) : !isUnlocked ? (
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    ) : null}
                  </div>

                  {/* Level Number */}
                  <span
                    className={`text-2xl font-bold ${
                      isCompleted ? "text-success-foreground" : isUnlocked ? "text-maths" : "text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </span>

                  {/* Level Name */}
                  <span
                    className={`text-xs text-center line-clamp-2 ${
                      isCompleted ? "text-success-foreground/90" : isUnlocked ? "text-muted-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {level.name}
                  </span>

                  {/* Best Score */}
                  {bestScore > 0 && (
                    <span
                      className={`text-xs font-medium ${
                        isCompleted ? "text-success-foreground/80" : "text-success"
                      }`}
                    >
                      {bestScore}/{level.questions.length}
                    </span>
                  )}
                </Button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-primary-foreground/80 text-sm"
        >
          <p>🔒 Les niveaux se débloquent au fur et à mesure de ta progression</p>
          <p className="mt-1">
            ⚠️ Niveaux 1-2 : 0 erreur autorisée | Niveaux 3+ : 1 erreur autorisée
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressionView;
