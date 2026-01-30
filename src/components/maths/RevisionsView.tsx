import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { revisionCategories } from "@/data/mathsLevels";
import { useMathsProgress } from "@/hooks/useMathsProgress";

interface RevisionsViewProps {
  onStartRevision: (categoryId: string) => void;
  onBack: () => void;
}

const RevisionsView = ({ onStartRevision, onBack }: RevisionsViewProps) => {
  const { getRevisionProgress } = useMathsProgress();

  // Brighter color mapping for categories
  const categoryColors: Record<string, { bg: string; shadow: string }> = {
    numeration: {
      bg: "from-[hsl(220,90%,55%)] to-[hsl(230,95%,60%)]",
      shadow: "shadow-[0_12px_40px_-8px_hsl(220,90%,55%,0.5)]",
    },
    calcul: {
      bg: "from-[hsl(145,85%,42%)] to-[hsl(160,90%,45%)]",
      shadow: "shadow-[0_12px_40px_-8px_hsl(145,85%,42%,0.5)]",
    },
    fractions: {
      bg: "from-[hsl(25,100%,55%)] to-[hsl(35,100%,58%)]",
      shadow: "shadow-[0_12px_40px_-8px_hsl(25,100%,55%,0.5)]",
    },
    grandeurs: {
      bg: "from-[hsl(280,80%,55%)] to-[hsl(290,85%,60%)]",
      shadow: "shadow-[0_12px_40px_-8px_hsl(280,80%,55%,0.5)]",
    },
    geometrie: {
      bg: "from-[hsl(330,90%,55%)] to-[hsl(350,95%,60%)]",
      shadow: "shadow-[0_12px_40px_-8px_hsl(330,90%,55%,0.5)]",
    },
    problemes: {
      bg: "from-[hsl(190,100%,45%)] to-[hsl(200,100%,50%)]",
      shadow: "shadow-[0_12px_40px_-8px_hsl(190,100%,45%,0.5)]",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(190,100%,97%)] to-white p-4 md:p-8">
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
            <h1 className="text-3xl md:text-4xl font-bold text-[hsl(190,100%,35%)] drop-shadow-sm mb-2">
              📚 Révisions
            </h1>
            <p className="text-muted-foreground font-medium">Entraîne-toi par thème</p>
          </div>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {revisionCategories.map((category, index) => {
            const catProgress = getRevisionProgress(category.id);
            const bestScore = catProgress?.bestScore || 0;
            const colors = categoryColors[category.id] || categoryColors.calcul;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => onStartRevision(category.id)}
                  className={`w-full h-auto p-6 bg-gradient-to-br ${colors.bg} ${colors.shadow} hover:opacity-95 text-white flex flex-col items-center gap-3 rounded-2xl border-4 border-white/30`}
                >
                  <span className="text-4xl drop-shadow-md">{category.icon}</span>
                  <span className="text-xl font-extrabold drop-shadow-md">{category.name}</span>
                  <span className="text-sm font-medium text-white/90">
                    {category.questions.length} exercices
                  </span>
                  {bestScore > 0 && (
                    <span className="text-xs bg-white/25 px-3 py-1 rounded-full font-semibold backdrop-blur-sm">
                      Record: {bestScore}/{category.questions.length}
                    </span>
                  )}
                </Button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default RevisionsView;
