import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnswerButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: "orthographe" | "maths" | "concentration";
  isCorrect?: boolean | null;
  disabled?: boolean;
}

const bgVariants = {
  orthographe: "bg-orthographe hover:bg-orthographe-dark",
  maths: "bg-maths hover:bg-maths-dark",
  concentration: "bg-concentration hover:bg-concentration-dark",
};

const AnswerButton = ({ 
  children, 
  onClick, 
  variant = "orthographe", 
  isCorrect = null,
  disabled = false 
}: AnswerButtonProps) => {
  const getStateClasses = () => {
    if (isCorrect === true) return "bg-success hover:bg-success ring-4 ring-success/50";
    if (isCorrect === false) return "bg-destructive hover:bg-destructive ring-4 ring-destructive/50";
    return bgVariants[variant];
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-4 px-6 rounded-2xl text-primary-foreground font-bold text-xl transition-colors duration-200 ${getStateClasses()} disabled:opacity-70`}
    >
      {children}
    </motion.button>
  );
};

export default AnswerButton;
