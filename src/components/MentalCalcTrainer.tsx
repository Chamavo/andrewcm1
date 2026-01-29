import { useState, useCallback } from "react";
import { levels, revisionCategories, sujets } from "@/data/mathsLevels";
import { useMathsProgress } from "@/hooks/useMathsProgress";
import MathsMenu from "./maths/MathsMenu";
import MathsGame from "./maths/MathsGame";
import MathsResult from "./maths/MathsResult";

type Tab = "progression" | "revisions" | "sujets";
type GameState = "menu" | "playing" | "result";
type GameMode = "level" | "revision" | "sujet";

const MentalCalcTrainer = () => {
  const [gameState, setGameState] = useState<GameState>("menu");
  const [activeTab, setActiveTab] = useState<Tab>("progression");
  const [gameMode, setGameMode] = useState<GameMode>("level");
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentCategoryId, setCurrentCategoryId] = useState("");
  const [currentSujetId, setCurrentSujetId] = useState("");
  const [lastScore, setLastScore] = useState(0);
  const [lastTotal, setLastTotal] = useState(0);

  const { updateLevelProgress, updateRevisionProgress, updateSujetProgress } = useMathsProgress();

  const startLevel = useCallback((levelIndex: number) => {
    setCurrentLevelIndex(levelIndex);
    setGameMode("level");
    setGameState("playing");
  }, []);

  const startRevision = useCallback((categoryId: string) => {
    setCurrentCategoryId(categoryId);
    setGameMode("revision");
    setGameState("playing");
  }, []);

  const startSujet = useCallback((sujetId: string) => {
    setCurrentSujetId(sujetId);
    setGameMode("sujet");
    setGameState("playing");
  }, []);

  const handleGameComplete = useCallback((score: number, totalQuestions: number) => {
    setLastScore(score);
    setLastTotal(totalQuestions);

    // Save progress based on game mode
    if (gameMode === "level") {
      updateLevelProgress(currentLevelIndex, score, totalQuestions);
    } else if (gameMode === "revision") {
      updateRevisionProgress(currentCategoryId, score, totalQuestions);
    } else if (gameMode === "sujet") {
      updateSujetProgress(currentSujetId, score, totalQuestions);
    }

    setGameState("result");
  }, [gameMode, currentLevelIndex, currentCategoryId, currentSujetId, updateLevelProgress, updateRevisionProgress, updateSujetProgress]);

  const handleRetry = useCallback(() => {
    setGameState("playing");
  }, []);

  const handleNextLevel = useCallback(() => {
    if (currentLevelIndex < levels.length - 1) {
      setCurrentLevelIndex((prev) => prev + 1);
      setGameState("playing");
    }
  }, [currentLevelIndex]);

  const handleBackToMenu = useCallback(() => {
    setGameState("menu");
  }, []);

  const handleBlocked = useCallback(() => {
    // Redirect to revisions tab
    setActiveTab("revisions");
    setGameState("menu");
  }, []);

  // Get current game data
  const getCurrentGameData = () => {
    if (gameMode === "level") {
      const level = levels[currentLevelIndex];
      return {
        title: level.name,
        questions: level.questions,
      };
    } else if (gameMode === "revision") {
      const category = revisionCategories.find((c) => c.id === currentCategoryId);
      return {
        title: category?.name || "Révisions",
        questions: category?.questions || [],
      };
    } else {
      const sujet = sujets.find((s) => s.id === currentSujetId);
      return {
        title: sujet?.name || "Sujet",
        questions: sujet?.questions || [],
      };
    }
  };

  // Menu screen
  if (gameState === "menu") {
    return (
      <MathsMenu
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onStartLevel={startLevel}
        onStartRevision={startRevision}
        onStartSujet={startSujet}
      />
    );
  }

  // Playing screen
  if (gameState === "playing") {
    const { title, questions } = getCurrentGameData();
    return (
      <MathsGame
        title={title}
        questions={questions}
        onComplete={handleGameComplete}
        onBlocked={handleBlocked}
        isLevelMode={gameMode === "level"}
      />
    );
  }

  // Result screen
  return (
    <MathsResult
      score={lastScore}
      totalQuestions={lastTotal}
      onRetry={handleRetry}
      onNextLevel={handleNextLevel}
      onBackToMenu={handleBackToMenu}
      showNextLevel={gameMode === "level" && currentLevelIndex < levels.length - 1}
    />
  );
};

export default MentalCalcTrainer;
