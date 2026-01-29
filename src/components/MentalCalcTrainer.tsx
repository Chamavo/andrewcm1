import { useState, useCallback } from "react";
import { levels, revisionCategories, sujets } from "@/data/mathsLevels";
import { useMathsProgress, getMaxErrorsForLevel } from "@/hooks/useMathsProgress";
import MathsSubMenu from "./maths/MathsSubMenu";
import ProgressionView from "./maths/ProgressionView";
import RevisionsView from "./maths/RevisionsView";
import SujetsView from "./maths/SujetsView";
import MathsGame from "./maths/MathsGame";
import MathsResult from "./maths/MathsResult";

type Tab = "progression" | "revisions" | "sujets";
type GameState = "submenu" | "tab-view" | "playing" | "result";
type GameMode = "level" | "revision" | "sujet";

const MentalCalcTrainer = () => {
  const [gameState, setGameState] = useState<GameState>("submenu");
  const [activeTab, setActiveTab] = useState<Tab>("progression");
  const [gameMode, setGameMode] = useState<GameMode>("level");
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentCategoryId, setCurrentCategoryId] = useState("");
  const [currentSujetId, setCurrentSujetId] = useState("");
  const [lastScore, setLastScore] = useState(0);
  const [lastTotal, setLastTotal] = useState(0);
  const [lastErrors, setLastErrors] = useState(0);

  const { updateLevelProgress, updateRevisionProgress, updateSujetProgress, isLevelUnlocked } = useMathsProgress();

  const handleSelectTab = useCallback((tab: Tab) => {
    setActiveTab(tab);
    setGameState("tab-view");
  }, []);

  const handleBackToSubMenu = useCallback(() => {
    setGameState("submenu");
  }, []);

  const startLevel = useCallback((levelIndex: number) => {
    if (!isLevelUnlocked(levelIndex)) return;
    setCurrentLevelIndex(levelIndex);
    setGameMode("level");
    setGameState("playing");
  }, [isLevelUnlocked]);

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

  const handleGameComplete = useCallback((score: number, totalQuestions: number, errors: number) => {
    setLastScore(score);
    setLastTotal(totalQuestions);
    setLastErrors(errors);

    // Save progress based on game mode
    if (gameMode === "level") {
      updateLevelProgress(currentLevelIndex, score, totalQuestions, errors);
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
    setGameState("tab-view");
  }, []);

  const handleBlocked = useCallback(() => {
    // Redirect to revisions
    setActiveTab("revisions");
    setGameState("tab-view");
  }, []);

  // Get current game data
  const getCurrentGameData = () => {
    if (gameMode === "level") {
      const level = levels[currentLevelIndex];
      return {
        title: level.name,
        questions: level.questions,
        maxErrors: getMaxErrorsForLevel(currentLevelIndex),
      };
    } else if (gameMode === "revision") {
      const category = revisionCategories.find((c) => c.id === currentCategoryId);
      return {
        title: category?.name || "Révisions",
        questions: category?.questions || [],
        maxErrors: undefined, // No blocking for revisions
      };
    } else {
      const sujet = sujets.find((s) => s.id === currentSujetId);
      return {
        title: sujet?.name || "Sujet",
        questions: sujet?.questions || [],
        maxErrors: undefined, // No blocking for sujets
      };
    }
  };

  // Sub-menu screen (main entry point)
  if (gameState === "submenu") {
    return <MathsSubMenu onSelectTab={handleSelectTab} />;
  }

  // Tab views
  if (gameState === "tab-view") {
    if (activeTab === "progression") {
      return (
        <ProgressionView
          onStartLevel={startLevel}
          onBack={handleBackToSubMenu}
        />
      );
    } else if (activeTab === "revisions") {
      return (
        <RevisionsView
          onStartRevision={startRevision}
          onBack={handleBackToSubMenu}
        />
      );
    } else {
      return (
        <SujetsView
          onStartSujet={startSujet}
          onBack={handleBackToSubMenu}
        />
      );
    }
  }

  // Playing screen
  if (gameState === "playing") {
    const { title, questions, maxErrors } = getCurrentGameData();
    return (
      <MathsGame
        title={title}
        questions={questions}
        onComplete={handleGameComplete}
        onBlocked={handleBlocked}
        isLevelMode={gameMode === "level"}
        maxErrors={maxErrors}
        levelIndex={gameMode === "level" ? currentLevelIndex : undefined}
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
      showNextLevel={gameMode === "level" && currentLevelIndex < levels.length - 1 && lastErrors <= getMaxErrorsForLevel(currentLevelIndex)}
    />
  );
};

export default MentalCalcTrainer;
