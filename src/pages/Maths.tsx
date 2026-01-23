import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import FloatingBubbles from "@/components/FloatingBubbles";
import BackButton from "@/components/BackButton";
import ExerciseCard from "@/components/ExerciseCard";
import AnswerButton from "@/components/AnswerButton";
import ProgressBar from "@/components/ProgressBar";
import SuccessOverlay from "@/components/SuccessOverlay";
import { Calculator } from "lucide-react";

interface MathQuestion {
  num1: number;
  num2: number;
  operation: "+" | "-" | "×";
  answer: number;
}

const generateQuestions = (): MathQuestion[] => {
  const questions: MathQuestion[] = [];
  
  for (let i = 0; i < 5; i++) {
    const operations: ("+" | "-" | "×")[] = ["+", "-", "×"];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let num1: number, num2: number, answer: number;
    
    switch (operation) {
      case "+":
        num1 = Math.floor(Math.random() * 20) + 5;
        num2 = Math.floor(Math.random() * 20) + 5;
        answer = num1 + num2;
        break;
      case "-":
        num1 = Math.floor(Math.random() * 20) + 15;
        num2 = Math.floor(Math.random() * 10) + 1;
        answer = num1 - num2;
        break;
      case "×":
        num1 = Math.floor(Math.random() * 8) + 2;
        num2 = Math.floor(Math.random() * 8) + 2;
        answer = num1 * num2;
        break;
    }
    
    questions.push({ num1, num2, operation, answer });
  }
  
  return questions;
};

const generateOptions = (correctAnswer: number): number[] => {
  const options = new Set<number>([correctAnswer]);
  
  while (options.size < 4) {
    const offset = Math.floor(Math.random() * 10) - 5;
    if (offset !== 0) {
      const wrongAnswer = correctAnswer + offset;
      if (wrongAnswer > 0) {
        options.add(wrongAnswer);
      }
    }
  }
  
  return Array.from(options).sort(() => Math.random() - 0.5);
};

const Maths = () => {
  const [questions, setQuestions] = useState<MathQuestion[]>(() => generateQuestions());
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [completed, setCompleted] = useState(false);

  const question = questions[currentQuestion];
  const options = useMemo(
    () => generateOptions(question.answer),
    [question.answer]
  );

  const handleAnswer = useCallback((answer: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answer);
    
    if (answer === question.answer) {
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
  }, [currentQuestion, question.answer, selectedAnswer, questions.length]);

  const resetGame = () => {
    setQuestions(generateQuestions());
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowSuccess(false);
    setCompleted(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingBubbles />
      
      <main className="relative z-10 container py-8 px-4 max-w-2xl mx-auto">
        <div className="mb-8">
          <BackButton />
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-maths text-primary-foreground mb-4">
            <Calculator className="w-6 h-6" />
            <h1 className="text-heading">Mathématiques</h1>
          </div>
          <p className="text-muted-foreground text-lg">Trouve le résultat du calcul !</p>
        </motion.div>

        <ProgressBar 
          current={completed ? questions.length : currentQuestion} 
          total={questions.length} 
          variant="maths" 
        />

        {!completed ? (
          <ExerciseCard variant="maths" className="mt-8">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mb-8"
            >
              <p className="text-5xl md:text-6xl font-bold text-foreground">
                {question.num1} {question.operation} {question.num2} = ?
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-4">
              {options.map((option, index) => (
                <AnswerButton
                  key={`${currentQuestion}-${index}`}
                  onClick={() => handleAnswer(option)}
                  variant="maths"
                  isCorrect={
                    selectedAnswer === option
                      ? option === question.answer
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
          <ExerciseCard variant="maths" className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Excellent calcul ! 🧮
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Tu es un champion des maths !
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="px-8 py-4 rounded-2xl bg-maths text-primary-foreground font-bold text-xl"
            >
              Nouveaux calculs 🔄
            </motion.button>
          </ExerciseCard>
        )}
      </main>

      <SuccessOverlay 
        show={showSuccess} 
        message="Génial ! 🎯" 
        onComplete={() => setShowSuccess(false)} 
      />
    </div>
  );
};

export default Maths;
