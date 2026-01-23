import { motion, AnimatePresence } from "framer-motion";
import { Star, PartyPopper } from "lucide-react";
import { useEffect } from "react";
import confetti from "canvas-confetti";

interface SuccessOverlayProps {
  show: boolean;
  message?: string;
  onComplete?: () => void;
}

const SuccessOverlay = ({ show, message = "Bravo ! 🎉", onComplete }: SuccessOverlayProps) => {
  useEffect(() => {
    if (show) {
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF6B35', '#00B4D8', '#9B5DE5', '#FFD700', '#00F5D4'],
      });

      // Auto-dismiss after animation
      const timer = setTimeout(() => {
        onComplete?.();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="card-playful bg-success text-success-foreground px-12 py-10 text-center"
          >
            <motion.div
              className="flex justify-center gap-3 mb-4"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: 3 }}
            >
              <Star className="w-10 h-10 fill-current star-reward" />
              <PartyPopper className="w-12 h-12" />
              <Star className="w-10 h-10 fill-current star-reward" />
            </motion.div>
            <h2 className="text-display text-success-foreground">{message}</h2>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessOverlay;
