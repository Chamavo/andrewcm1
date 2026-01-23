import { motion } from "framer-motion";

const bubbles = [
  { size: 80, x: "10%", y: "20%", delay: 0, color: "hsl(20 90% 55% / 0.15)" },
  { size: 120, x: "85%", y: "15%", delay: 1, color: "hsl(180 70% 45% / 0.15)" },
  { size: 60, x: "75%", y: "70%", delay: 2, color: "hsl(270 60% 55% / 0.15)" },
  { size: 100, x: "15%", y: "75%", delay: 0.5, color: "hsl(45 95% 55% / 0.2)" },
  { size: 50, x: "50%", y: "10%", delay: 1.5, color: "hsl(200 85% 50% / 0.15)" },
  { size: 70, x: "30%", y: "50%", delay: 2.5, color: "hsl(145 70% 45% / 0.15)" },
];

const FloatingBubbles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {bubbles.map((bubble, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: bubble.x,
            top: bubble.y,
            backgroundColor: bubble.color,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingBubbles;
