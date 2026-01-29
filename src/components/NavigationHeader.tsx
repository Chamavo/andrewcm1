import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationHeaderProps {
  showHome?: boolean;
  showLogout?: boolean;
  title?: string;
  onLogout?: () => void;
}

const NavigationHeader = ({ 
  showHome = true, 
  showLogout = false, 
  title,
  onLogout 
}: NavigationHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between gap-4 mb-6"
    >
      {showHome ? (
        <Link to="/">
          <Button
            variant="outline"
            className="bg-card/90 hover:bg-card text-foreground shadow-md hover:shadow-lg transition-all"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline ml-2">Accueil</span>
          </Button>
        </Link>
      ) : (
        <div />
      )}

      {title && (
        <h1 className="text-xl font-bold text-foreground hidden md:block">{title}</h1>
      )}

      {showLogout && onLogout ? (
        <Button
          variant="outline"
          onClick={onLogout}
          className="bg-card/90 hover:bg-destructive/10 text-foreground hover:text-destructive shadow-md hover:shadow-lg transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline ml-2">Déconnexion</span>
        </Button>
      ) : (
        <div />
      )}
    </motion.div>
  );
};

export default NavigationHeader;
