import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ExerciseCardProps {
  children: ReactNode;
  variant?: "orthographe" | "maths" | "concentration";
  className?: string;
}

const bgVariants = {
  orthographe: "bg-orthographe-light border-orthographe/30",
  maths: "bg-maths-light border-maths/30",
  concentration: "bg-concentration-light border-concentration/30",
};

const ExerciseCard = ({ children, variant = "orthographe", className = "" }: ExerciseCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`card-playful ${bgVariants[variant]} border-2 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default ExerciseCard;
