import { motion } from "framer-motion";
import { Star, Sparkles } from "lucide-react";

const WelcomeHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center mb-10 md:mb-14"
    >
      <motion.div
        className="inline-flex items-center gap-2 mb-4"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles className="w-8 h-8 text-star star-reward" />
        <Star className="w-6 h-6 text-star star-reward" />
        <Sparkles className="w-8 h-8 text-star star-reward" />
      </motion.div>
      
      <h1 className="text-display text-foreground mb-4">
        Bienvenue dans l'espace de travail de{" "}
        <motion.span
          className="inline-block text-primary"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Duke Koungou
        </motion.span>
        {" "}! 🎮
      </h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-body-lg text-muted-foreground max-w-lg mx-auto"
      >
        Choisis une activité et amuse-toi à apprendre !
      </motion.p>
    </motion.div>
  );
};

export default WelcomeHeader;
