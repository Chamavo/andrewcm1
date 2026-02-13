import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProblem, MathProblem } from '@/utils/maths/problemManager';
import { generateLevelExercises, Exercise } from '@/utils/maths/exerciseGenerator';

export type ViewState = 'landing' | 'calcul_dashboard' | 'calcul_session' | 'calcul_result' | 'problemes_dashboard' | 'probleme_session';

export const useMathNavigation = () => {
    const navigate = useNavigate();
    const [currentView, setCurrentView] = useState<ViewState>('landing');

    // Calcul State
    const [currentSessionLevel, setCurrentSessionLevel] = useState(1);
    const [exercises, setExercises] = useState<Exercise[]>([]);

    // Result state
    const [lastScore, setLastScore] = useState(0);
    const [lastTime, setLastTime] = useState(0);
    const [lastSuccess, setLastSuccess] = useState(false);

    // Problemes State
    const [selectedProblem, setSelectedProblem] = useState<MathProblem | null>(null);

    const handleStartLevel = (lvl: number) => {
        const newExercises = generateLevelExercises(lvl);
        // Ensure we limit to 10 questions if generator returns more
        const sessionExercises = newExercises.slice(0, 10);

        setExercises(sessionExercises);
        setCurrentSessionLevel(lvl);
        setCurrentView('calcul_session');
    };

    const handleSelectProblem = (id: number) => {
        const problem = getProblem(id);
        if (problem) {
            setSelectedProblem(problem);
            setCurrentView('probleme_session');
        }
    };

    const handleProblemBack = () => {
        setSelectedProblem(null);
        setCurrentView('problemes_dashboard');
    };

    const handleBackToLanding = () => setCurrentView('landing');
    const handleBackToDashboard = () => setCurrentView('calcul_dashboard');
    const handleExitApp = () => navigate('/');

    return {
        currentView,
        setCurrentView,
        currentSessionLevel,
        exercises,
        lastScore,
        setLastScore,
        lastTime,
        setLastTime,
        lastSuccess,
        setLastSuccess,
        selectedProblem,
        setSelectedProblem,
        handleStartLevel,
        handleSelectProblem,
        handleProblemBack,
        handleBackToLanding,
        handleBackToDashboard,
        handleExitApp,
    };
};
