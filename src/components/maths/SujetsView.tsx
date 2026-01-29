import { motion } from "framer-motion";
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sujets } from "@/data/mathsLevels";
import { useMathsProgress } from "@/hooks/useMathsProgress";

interface SujetsViewProps {
  onStartSujet: (sujetId: string) => void;
  onBack: () => void;
}

const SujetsView = ({ onStartSujet, onBack }: SujetsViewProps) => {
  const { getSujetProgress } = useMathsProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-white hover:bg-white/20 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>

          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-2">
              📝 Sujets d'examen
            </h1>
            <p className="text-white/80">Passe des examens blancs chronométrés</p>
          </div>
        </motion.div>

        {/* Sujets Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {sujets.map((sujet, index) => {
            const sujetProgress = getSujetProgress(sujet.id);
            const bestScore = sujetProgress?.bestScore || 0;

            return (
              <motion.div
                key={sujet.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => onStartSujet(sujet.id)}
                  className="w-full h-auto p-6 bg-card/95 hover:bg-card text-foreground flex flex-col items-start gap-3 rounded-2xl shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-purple-500" />
                    <div className="text-left">
                      <span className="text-xl font-bold block">{sujet.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {sujet.description}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
                    <span>⏱️ {sujet.duration} min</span>
                    <span>📝 {sujet.questions.length} questions</span>
                    {bestScore > 0 && (
                      <span className="text-success font-medium">
                        Record: {bestScore}/{sujet.questions.length}
                      </span>
                    )}
                  </div>
                </Button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default SujetsView;
