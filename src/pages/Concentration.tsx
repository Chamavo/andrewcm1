import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingBubbles from "@/components/FloatingBubbles";
import NavigationHeader from "@/components/NavigationHeader";
import ExerciseCard from "@/components/ExerciseCard";
import ProgressBar from "@/components/ProgressBar";
import SuccessOverlay from "@/components/SuccessOverlay";
import { Brain, Eye, Timer } from "lucide-react";

const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🦁", "🐮", "🐷"];

interface MemoryCard {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const generateCards = (): MemoryCard[] => {
  const selectedEmojis = emojis.slice(0, 6);
  const pairs = [...selectedEmojis, ...selectedEmojis];
  
  return pairs
    .sort(() => Math.random() - 0.5)
    .map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));
};

const Concentration = () => {
  const [cards, setCards] = useState<MemoryCard[]>(() => generateCards());
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const matchedPairs = cards.filter(c => c.isMatched).length / 2;
  const totalPairs = 6;

  const startGame = () => {
    setShowPreview(true);
    setGameStarted(true);
    
    // Show all cards for 3 seconds
    setCards(prev => prev.map(card => ({ ...card, isFlipped: true })));
    
    setTimeout(() => {
      setCards(prev => prev.map(card => ({ ...card, isFlipped: false })));
      setShowPreview(false);
    }, 3000);
  };

  const handleCardClick = useCallback((cardId: number) => {
    if (isProcessing || showPreview) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);
    
    setCards(prev =>
      prev.map(c =>
        c.id === cardId ? { ...c, isFlipped: true } : c
      )
    );

    if (newFlippedCards.length === 2) {
      setIsProcessing(true);
      setMoves(prev => prev + 1);
      
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      if (firstCard?.emoji === secondCard?.emoji) {
        setTimeout(() => {
          setCards(prev =>
            prev.map(c =>
              c.id === firstId || c.id === secondId
                ? { ...c, isMatched: true }
                : c
            )
          );
          setFlippedCards([]);
          setIsProcessing(false);
        }, 500);
      } else {
        setTimeout(() => {
          setCards(prev =>
            prev.map(c =>
              c.id === firstId || c.id === secondId
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCards([]);
          setIsProcessing(false);
        }, 1000);
      }
    }
  }, [cards, flippedCards, isProcessing, showPreview]);

  useEffect(() => {
    if (matchedPairs === totalPairs && gameStarted) {
      setTimeout(() => setShowSuccess(true), 500);
    }
  }, [matchedPairs, gameStarted]);

  const resetGame = () => {
    setCards(generateCards());
    setFlippedCards([]);
    setMoves(0);
    setShowSuccess(false);
    setIsProcessing(false);
    setGameStarted(false);
    setShowPreview(false);
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
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-concentration text-primary-foreground mb-4">
            <Brain className="w-6 h-6" />
            <h1 className="text-heading">Concentration</h1>
          </div>
          <p className="text-muted-foreground text-lg">Retrouve les paires d'animaux !</p>
        </motion.div>

        <ProgressBar 
          current={matchedPairs} 
          total={totalPairs} 
          variant="concentration" 
        />

        <ExerciseCard variant="concentration" className="mt-8">
          {!gameStarted ? (
            <div className="text-center py-8">
              <Eye className="w-16 h-16 mx-auto text-concentration mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Jeu de mémoire
              </h2>
              <p className="text-muted-foreground mb-6">
                Observe bien les cartes pendant 3 secondes, puis retrouve les paires !
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
                className="px-8 py-4 rounded-2xl bg-concentration text-primary-foreground font-bold text-xl"
              >
                Commencer ! 🎮
              </motion.button>
            </div>
          ) : matchedPairs === totalPairs ? (
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Incroyable mémoire ! 🧠
              </h2>
              <p className="text-lg text-muted-foreground mb-2">
                Tu as trouvé toutes les paires en {moves} coups !
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetGame}
                className="mt-6 px-8 py-4 rounded-2xl bg-concentration text-primary-foreground font-bold text-xl"
              >
                Rejouer 🔄
              </motion.button>
            </div>
          ) : (
            <>
              {showPreview && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center gap-2 mb-4 text-concentration"
                >
                  <Timer className="w-5 h-5" />
                  <span className="font-semibold">Mémorise les positions !</span>
                </motion.div>
              )}
              
              <div className="flex justify-center mb-4">
                <span className="text-muted-foreground">
                  Coups : <strong className="text-foreground">{moves}</strong>
                </span>
              </div>
              
              <div className="grid grid-cols-4 gap-3">
                <AnimatePresence>
                  {cards.map(card => (
                    <motion.button
                      key={card.id}
                      whileHover={!card.isFlipped && !card.isMatched ? { scale: 1.05 } : {}}
                      whileTap={!card.isFlipped && !card.isMatched ? { scale: 0.95 } : {}}
                      onClick={() => handleCardClick(card.id)}
                      className={`aspect-square rounded-2xl text-4xl flex items-center justify-center transition-all duration-300 ${
                        card.isFlipped || card.isMatched
                          ? "bg-concentration-light"
                          : "bg-concentration hover:bg-concentration-dark"
                      } ${card.isMatched ? "ring-4 ring-success" : ""}`}
                      disabled={card.isFlipped || card.isMatched || isProcessing}
                    >
                      <motion.span
                        initial={{ rotateY: 180, opacity: 0 }}
                        animate={{
                          rotateY: card.isFlipped || card.isMatched ? 0 : 180,
                          opacity: card.isFlipped || card.isMatched ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {card.emoji}
                      </motion.span>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}
        </ExerciseCard>
      </main>

      <SuccessOverlay 
        show={showSuccess} 
        message="Champion ! 🏆" 
        onComplete={() => setShowSuccess(false)} 
      />
    </div>
  );
};

export default Concentration;
