import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface ModuleButtonProps {
  to?: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  variant: "orthographe" | "maths" | "concentration" | "soon";
  delay?: number;
  inactive?: boolean;
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
  soon: {
    gradient: "from-slate-400 to-slate-500",
    shadow: "shadow-[0_12px_40px_-8px_rgba(148,163,184,0.5)]",
  }
};

const ModuleButton = ({ to, icon: Icon, title, subtitle, variant, delay = 0, inactive = false }: ModuleButtonProps) => {
  const content = (
    <div
      className={`rounded-3xl p-8 flex flex-col items-center justify-center gap-4 text-white min-h-[200px] md:min-h-[240px] bg-gradient-to-br ${variantStyles[variant].gradient} ${variantStyles[variant].shadow} transition-all duration-300 border-4 border-white/30 ${inactive ? 'opacity-70 cursor-not-allowed grayscale-[0.2]' : 'hover:shadow-2xl'}`}
    >
      <motion.div
        className="rounded-full bg-white/25 p-5 backdrop-blur-sm"
        whileHover={inactive ? {} : { rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.5 }}
      >
        <Icon className="w-12 h-12 md:w-16 md:h-16" strokeWidth={2.5} />
      </motion.div>
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-1 drop-shadow-md">{title}</h2>
        <p className="text-lg font-medium text-white/90">{subtitle}</p>
        {inactive && <span className="mt-2 inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider">Bientôt disponible</span>}
      </div>
    </div>
  );

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
      whileHover={inactive ? {} : { scale: 1.05, y: -8 }}
      whileTap={inactive ? {} : { scale: 0.95 }}
    >
      {!inactive && to ? (
        <Link to={to}>{content}</Link>
      ) : (
        content
      )}
    </motion.div>
  );
};

export default ModuleButton;
