import { motion } from "framer-motion";
import { ArrowLeft, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sujets } from "@/data/mathsLevels";
import { useMathsProgress } from "@/hooks/useMathsProgress";

interface ProblemesViewProps {
  onStartProbleme: (problemeId: string) => void;
  onBack: () => void;
}

const ProblemesView = ({ onStartProbleme, onBack }: ProblemesViewProps) => {
  const { getSujetProgress } = useMathsProgress();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(330,90%,97%)] to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
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
            <h1 className="text-3xl md:text-4xl font-bold text-[hsl(330,90%,45%)] drop-shadow-sm mb-2">
              💡 Problèmes CM1
            </h1>
            <p className="text-muted-foreground font-medium">
              Résous des problèmes avec l'aide de l'IA
            </p>
          </div>
        </motion.div>

        {/* Problèmes Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {sujets.map((probleme, index) => {
            const problemeProgress = getSujetProgress(probleme.id);
            const bestScore = problemeProgress?.bestScore || 0;

            return (
              <motion.div
                key={probleme.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => onStartProbleme(probleme.id)}
                  className="w-full h-auto p-6 bg-white hover:bg-muted text-foreground flex flex-col items-start gap-3 rounded-2xl shadow-lg border-2 border-[hsl(330,90%,85%)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-gradient-to-br from-[hsl(330,90%,55%)] to-[hsl(350,95%,60%)] p-2">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <span className="text-xl font-bold block">{probleme.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {probleme.description}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
                    <span>⏱️ {probleme.duration} min</span>
                    <span>💡 {probleme.questions.length} problèmes</span>
                    {bestScore > 0 && (
                      <span className="text-[hsl(145,85%,42%)] font-semibold">
                        Record: {bestScore}/{probleme.questions.length}
                      </span>
                    )}
                  </div>
                </Button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* AI Helper info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-gradient-to-r from-[hsl(330,90%,55%)] to-[hsl(350,95%,60%)] rounded-2xl p-6 text-white shadow-lg"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-white/20 p-3">
              <Lightbulb className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Aide IA disponible</h3>
              <p className="text-white/90">
                En cas de mauvaise réponse, l'IA te donnera des indices pour t'aider à comprendre et trouver la bonne solution !
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProblemesView;
