import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import FloatingBubbles from "@/components/FloatingBubbles";
import NavigationHeader from "@/components/NavigationHeader";
import ExerciseCard from "@/components/ExerciseCard";
import AnswerButton from "@/components/AnswerButton";
import ProgressBar from "@/components/ProgressBar";
import SuccessOverlay from "@/components/SuccessOverlay";
import { Pencil } from "lucide-react";

interface Question {
  sentence: string;
  options: string[];
  correctIndex: number;
}

const questions: Question[] = [
  {
    sentence: "Le chat ___ sur le canapé.",
    options: ["dort", "dor", "dors"],
    correctIndex: 0,
  },
  {
    sentence: "Nous ___ à l'école demain.",
    options: ["iront", "irons", "iron"],
    correctIndex: 1,
  },
  {
    sentence: "Elle ___ un joli dessin.",
    options: ["fait", "fais", "fai"],
    correctIndex: 0,
  },
  {
    sentence: "Les oiseaux ___ dans le ciel.",
    options: ["vole", "vols", "volent"],
    correctIndex: 2,
  },
  {
    sentence: "Je ___ mes devoirs tous les soirs.",
    options: ["fais", "fait", "fai"],
    correctIndex: 0,
  },
];

const Orthographe = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [completed, setCompleted] = useState(false);

  const question = questions[currentQuestion];

  const handleAnswer = useCallback((index: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    
    if (index === question.correctIndex) {
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(prev => prev + 1);
          setSelectedAnswer(null);
        } else {
          setShowSuccess(true);
          setCompleted(true);
        }
      }, 800);
    } else {
      setTimeout(() => {
        setSelectedAnswer(null);
      }, 1000);
    }
  }, [currentQuestion, question.correctIndex, selectedAnswer]);

  const resetGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowSuccess(false);
    setCompleted(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingBubbles />
      
      <main className="relative z-10 container py-8 px-4 max-w-2xl mx-auto">
        <NavigationHeader showHome showLogout={false} />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-orthographe text-primary-foreground mb-4">
            <Pencil className="w-6 h-6" />
            <h1 className="text-heading">Orthographe</h1>
          </div>
          <p className="text-muted-foreground text-lg">Trouve le bon mot pour compléter la phrase !</p>
        </motion.div>

        <ProgressBar 
          current={completed ? questions.length : currentQuestion} 
          total={questions.length} 
          variant="orthographe" 
        />

        {!completed ? (
          <ExerciseCard variant="orthographe" className="mt-8">
            <motion.p
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl md:text-3xl font-semibold text-center mb-8 text-foreground"
            >
              {question.sentence}
            </motion.p>
            
            <div className="grid gap-4">
              {question.options.map((option, index) => (
                <AnswerButton
                  key={`${currentQuestion}-${index}`}
                  onClick={() => handleAnswer(index)}
                  variant="orthographe"
                  isCorrect={
                    selectedAnswer === index
                      ? index === question.correctIndex
                      : null
                  }
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </AnswerButton>
              ))}
            </div>
          </ExerciseCard>
        ) : (
          <ExerciseCard variant="orthographe" className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Félicitations ! 🎉
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Tu as terminé tous les exercices d'orthographe !
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="px-8 py-4 rounded-2xl bg-orthographe text-primary-foreground font-bold text-xl"
            >
              Rejouer 🔄
            </motion.button>
          </ExerciseCard>
        )}
      </main>

      <SuccessOverlay 
        show={showSuccess} 
        message="Super travail ! ⭐" 
        onComplete={() => setShowSuccess(false)} 
      />
    </div>
  );
};

export default Orthographe;
