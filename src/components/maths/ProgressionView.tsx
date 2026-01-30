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
    <div className="min-h-screen bg-gradient-to-b from-[hsl(145,85%,97%)] to-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Button
            onClick={onBack}
            variant="outline"
            className="bg-white hover:bg-muted text-foreground border-2 border-border font-semibold shadow-md mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>

          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-[hsl(145,85%,35%)] drop-shadow-sm mb-2">
              🏆 Progression
            </h1>
            <div className="flex items-center justify-center gap-4 text-muted-foreground font-medium">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-5 h-5 text-[hsl(145,85%,42%)]" />
                <span>{getCompletedLevelsCount()}/{levels.length} niveaux</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-[hsl(45,100%,50%)]" />
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
                  className={`w-full h-auto p-4 flex flex-col items-center gap-2 rounded-2xl shadow-lg relative transition-all border-2 ${
                    isUnlocked
                      ? isCompleted
                        ? "bg-gradient-to-br from-[hsl(145,85%,42%)] to-[hsl(160,90%,45%)] text-white border-[hsl(145,85%,50%)] shadow-[0_8px_30px_-8px_hsl(145,85%,42%,0.5)]"
                        : "bg-white hover:bg-muted text-foreground border-[hsl(145,85%,85%)]"
                      : "bg-muted text-muted-foreground cursor-not-allowed border-muted"
                  }`}
                >
                  {/* Status Icon */}
                  <div className="absolute top-2 right-2">
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : !isUnlocked ? (
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    ) : null}
                  </div>

                  {/* Level Number */}
                  <span
                    className={`text-2xl font-extrabold ${
                      isCompleted ? "text-white" : isUnlocked ? "text-[hsl(145,85%,42%)]" : "text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </span>

                  {/* Level Name */}
                  <span
                    className={`text-xs text-center line-clamp-2 font-medium ${
                      isCompleted ? "text-white/90" : isUnlocked ? "text-muted-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {level.name}
                  </span>

                  {/* Best Score */}
                  {bestScore > 0 && (
                    <span
                      className={`text-xs font-semibold ${
                        isCompleted ? "text-white/90" : "text-[hsl(145,85%,42%)]"
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
          className="mt-8 text-center text-muted-foreground text-sm bg-white rounded-2xl p-4 shadow-md border-2 border-[hsl(145,85%,85%)]"
        >
          <p className="font-medium">🔒 Les niveaux se débloquent au fur et à mesure de ta progression</p>
          <p className="mt-1">
            ⚠️ Niveaux 1-2 : 0 erreur autorisée | Niveaux 3+ : 1 erreur autorisée
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressionView;
