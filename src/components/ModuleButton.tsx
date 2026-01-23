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

const variantClasses = {
  orthographe: "module-button-orthographe",
  maths: "module-button-maths",
  concentration: "module-button-concentration",
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
        className={`module-button ${variantClasses[variant]} flex flex-col items-center justify-center gap-4 text-primary-foreground min-h-[200px] md:min-h-[240px]`}
      >
        <motion.div
          className="rounded-full bg-primary-foreground/20 p-5"
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="w-12 h-12 md:w-16 md:h-16" strokeWidth={2.5} />
        </motion.div>
        <div className="text-center">
          <h2 className="text-heading font-bold mb-1">{title}</h2>
          <p className="text-body-lg opacity-90">{subtitle}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ModuleButton;
