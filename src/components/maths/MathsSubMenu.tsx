import { motion } from "framer-motion";
import { Trophy, BookOpen, Lightbulb, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type Tab = "progression" | "revisions" | "problemes";

interface MathsSubMenuProps {
  onSelectTab: (tab: Tab) => void;
}

const MathsSubMenu = ({ onSelectTab }: MathsSubMenuProps) => {
  const menuItems = [
    {
      id: "progression" as Tab,
      title: "Progression",
      subtitle: "Avance niveau par niveau !",
      icon: Trophy,
      gradient: "from-[hsl(145,85%,42%)] to-[hsl(160,90%,45%)]",
      shadow: "shadow-[0_12px_40px_-8px_hsl(145,85%,42%,0.5)]",
    },
    {
      id: "revisions" as Tab,
      title: "Révisions",
      subtitle: "Entraîne-toi par thème !",
      icon: BookOpen,
      gradient: "from-[hsl(190,100%,45%)] to-[hsl(200,100%,50%)]",
      shadow: "shadow-[0_12px_40px_-8px_hsl(190,100%,45%,0.5)]",
    },
    {
      id: "problemes" as Tab,
      title: "Problèmes",
      subtitle: "Résous des problèmes CM1 !",
      icon: Lightbulb,
      gradient: "from-[hsl(330,90%,55%)] to-[hsl(350,95%,60%)]",
      shadow: "shadow-[0_12px_40px_-8px_hsl(330,90%,55%,0.5)]",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(190,100%,97%)] to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[hsl(190,100%,35%)] drop-shadow-sm mb-2">
            🧮 Mathématiques
          </h1>
          <p className="text-muted-foreground text-lg font-medium">
            Choisis ton mode d'entraînement
          </p>
        </motion.div>

        {/* Big Buttons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => onSelectTab(item.id)}
                className={`w-full h-full min-h-[200px] md:min-h-[280px] rounded-3xl p-6 md:p-8 bg-gradient-to-br ${item.gradient} text-white ${item.shadow} hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center gap-4 border-4 border-white/30`}
              >
                <motion.div
                  className="rounded-full bg-white/25 p-4 md:p-6 backdrop-blur-sm"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <item.icon className="w-12 h-12 md:w-16 md:h-16" strokeWidth={2.5} />
                </motion.div>
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-extrabold mb-1 drop-shadow-md">{item.title}</h2>
                  <p className="text-white/90 text-sm md:text-base font-medium">{item.subtitle}</p>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <Link to="/">
            <Button
              variant="outline"
              className="bg-white hover:bg-muted text-foreground border-2 border-border font-semibold shadow-md"
            >
              <Home className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default MathsSubMenu;
