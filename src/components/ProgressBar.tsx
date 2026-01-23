import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface ProgressBarProps {
  current: number;
  total: number;
  variant?: "orthographe" | "maths" | "concentration";
}

const bgVariants = {
  orthographe: "bg-orthographe",
  maths: "bg-maths",
  concentration: "bg-concentration",
};

const lightBgVariants = {
  orthographe: "bg-orthographe-light",
  maths: "bg-maths-light",
  concentration: "bg-concentration-light",
};

const ProgressBar = ({ current, total, variant = "orthographe" }: ProgressBarProps) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-muted-foreground font-semibold">
          Question {current} / {total}
        </span>
        <div className="flex gap-1">
          {Array.from({ length: total }).map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 transition-all duration-300 ${
                i < current ? "text-star fill-star star-reward" : "text-muted"
              }`}
            />
          ))}
        </div>
      </div>
      <div className={`h-4 rounded-full ${lightBgVariants[variant]} overflow-hidden`}>
        <motion.div
          className={`h-full rounded-full ${bgVariants[variant]}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
