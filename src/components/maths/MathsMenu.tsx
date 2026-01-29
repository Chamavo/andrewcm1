import { motion } from "framer-motion";
import { Home, Trophy, BookOpen, FileText, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { levels, revisionCategories, sujets } from "@/data/mathsLevels";
import { useMathsProgress } from "@/hooks/useMathsProgress";

type Tab = "progression" | "revisions" | "sujets";

interface MathsMenuProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  onStartLevel: (index: number) => void;
  onStartRevision: (categoryId: string) => void;
  onStartSujet: (sujetId: string) => void;
}

const MathsMenu = ({
  activeTab,
  setActiveTab,
  onStartLevel,
  onStartRevision,
  onStartSujet,
}: MathsMenuProps) => {
  const { progress, getLevelProgress, getRevisionProgress, getSujetProgress, getCompletedLevelsCount } = useMathsProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-maths via-primary to-maths-dark p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground drop-shadow-lg mb-2">
            🧮 Calcul Mental
          </h1>
          <div className="flex items-center justify-center gap-4 text-primary-foreground/90">
            <div className="flex items-center gap-1">
              <Trophy className="w-5 h-5" />
              <span>{getCompletedLevelsCount()}/{levels.length} niveaux</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-star" />
              <span>{progress.totalStars} étoiles</span>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-6">
          {[
            { id: "progression" as Tab, label: "Progression", icon: Trophy },
            { id: "revisions" as Tab, label: "Révisions", icon: BookOpen },
            { id: "sujets" as Tab, label: "Sujets", icon: FileText },
          ].map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant={activeTab === tab.id ? "default" : "outline"}
              className={`flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-primary-foreground text-maths"
                  : "bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/30"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "progression" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {levels.map((level, index) => {
              const levelProgress = getLevelProgress(index);
              const isCompleted = levelProgress?.completed;
              const bestScore = levelProgress?.bestScore || 0;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => onStartLevel(index)}
                    className="w-full h-auto p-4 bg-card/95 hover:bg-card text-foreground flex flex-col items-start gap-2 rounded-2xl shadow-lg relative overflow-hidden"
                  >
                    {isCompleted && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle className="w-5 h-5 text-success" />
                      </div>
                    )}
                    <span className="text-xl font-bold text-maths">{level.name}</span>
                    <span className="text-sm text-muted-foreground text-left">{level.description}</span>
                    <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
                      <span>{level.questions.length} questions</span>
                      {bestScore > 0 && (
                        <span className="text-success font-medium">
                          Record: {bestScore}/{level.questions.length}
                        </span>
                      )}
                    </div>
                  </Button>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {activeTab === "revisions" && (
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
                    <span className="text-sm opacity-90">{category.questions.length} exercices</span>
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
        )}

        {activeTab === "sujets" && (
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
                      <FileText className="w-8 h-8 text-maths" />
                      <div className="text-left">
                        <span className="text-xl font-bold block">{sujet.name}</span>
                        <span className="text-sm text-muted-foreground">{sujet.description}</span>
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
        )}

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <Link to="/">
            <Button variant="outline" className="bg-primary-foreground/80 hover:bg-primary-foreground text-foreground">
              <Home className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default MathsMenu;
