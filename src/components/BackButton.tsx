import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const BackButton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-card text-foreground font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
      >
        <ArrowLeft className="w-5 h-5" />
        <Home className="w-5 h-5" />
        <span className="hidden sm:inline">Accueil</span>
      </Link>
    </motion.div>
  );
};

export default BackButton;
