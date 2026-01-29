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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 p-4 md:p-8">
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
              📚 Révisions
            </h1>
            <p className="text-white/80">Entraîne-toi par thème</p>
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

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => onStartRevision(category.id)}
                  className={`w-full h-auto p-6 ${category.color} hover:opacity-90 text-primary-foreground flex flex-col items-center gap-3 rounded-2xl shadow-lg`}
                >
                  <span className="text-4xl">{category.icon}</span>
                  <span className="text-xl font-bold">{category.name}</span>
                  <span className="text-sm opacity-90">
                    {category.questions.length} exercices
                  </span>
                  {bestScore > 0 && (
                    <span className="text-xs bg-primary-foreground/20 px-2 py-1 rounded-full">
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
