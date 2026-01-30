import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface ModuleButtonProps {
  to: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  variant: "orthographe" | "maths" | "concentration";
  delay?: number;
}

const variantStyles = {
  orthographe: {
    gradient: "from-[hsl(25,100%,55%)] to-[hsl(35,100%,60%)]",
    shadow: "shadow-[0_12px_40px_-8px_hsl(25,100%,55%,0.5)]",
  },
  maths: {
    gradient: "from-[hsl(190,100%,45%)] to-[hsl(200,100%,50%)]",
    shadow: "shadow-[0_12px_40px_-8px_hsl(190,100%,45%,0.5)]",
  },
  concentration: {
    gradient: "from-[hsl(280,80%,55%)] to-[hsl(290,85%,60%)]",
    shadow: "shadow-[0_12px_40px_-8px_hsl(280,80%,55%,0.5)]",
  },
};

const ModuleButton = ({ to, icon: Icon, title, subtitle, variant, delay = 0 }: ModuleButtonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        to={to}
        className={`rounded-3xl p-8 flex flex-col items-center justify-center gap-4 text-white min-h-[200px] md:min-h-[240px] bg-gradient-to-br ${variantStyles[variant].gradient} ${variantStyles[variant].shadow} hover:shadow-2xl transition-all duration-300 border-4 border-white/30`}
      >
        <motion.div
          className="rounded-full bg-white/25 p-5 backdrop-blur-sm"
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="w-12 h-12 md:w-16 md:h-16" strokeWidth={2.5} />
        </motion.div>
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-1 drop-shadow-md">{title}</h2>
          <p className="text-lg font-medium text-white/90">{subtitle}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ModuleButton;
