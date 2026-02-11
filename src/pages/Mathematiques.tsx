import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MathDashboard from '@/components/maths/MathDashboard';
import MathSession from '@/components/maths/MathSession';
import MathLevelEnd from '@/components/maths/MathLevelEnd';
import { getCurrentLevel, updateCurrentLevel } from '@/utils/maths/levelBlockingSystem';
import { generateLevelExercises, Exercise } from '@/utils/maths/exerciseGenerator';
import { AppSession } from '@/types/mathsTypes';

type ViewState = 'dashboard' | 'session' | 'result';

const Mathematiques: React.FC = () => {
    const navigate = useNavigate();
    const [currentView, setCurrentView] = useState<ViewState>('dashboard');
    const [level, setLevel] = useState(1);
    const [currentSessionLevel, setCurrentSessionLevel] = useState(1);
    const [exercises, setExercises] = useState<Exercise[]>([]);

    // Result state
    const [lastScore, setLastScore] = useState(0);
    const [lastTime, setLastTime] = useState(0);
    const [lastSuccess, setLastSuccess] = useState(false);

    const [username] = useState('Élève'); // Hardcoded based on current session logic

    useEffect(() => {
        const loadLevel = async () => {
            const l = await getCurrentLevel(username, 'progression');
            setLevel(l);
        };
        loadLevel();
    }, [username]);

    const handleStartLevel = (lvl: number) => {
        const newExercises = generateLevelExercises(lvl);
        // Ensure we limit to 10 questions if generator returns more
        const sessionExercises = newExercises.slice(0, 10);

        setExercises(sessionExercises);
        setCurrentSessionLevel(lvl);
        setCurrentView('session');
    };

    const handleSessionComplete = async (score: number, timeSpent: number) => {
        setLastScore(score);
        setLastTime(timeSpent);
        const success = score >= 8;
        setLastSuccess(success);

        if (success && currentSessionLevel === level) {
            // Unlock next level
            const nextLevel = level + 1;
            await updateCurrentLevel(username, nextLevel);
            setLevel(nextLevel);
        }

        setCurrentView('result');
    };

    const handleRetry = () => {
        handleStartLevel(currentSessionLevel);
    };

    const handleNextLevel = () => {
        handleStartLevel(currentSessionLevel + 1);
    };

    const handleBackToDashboard = () => {
        setCurrentView('dashboard');
    };

    const handleExitApp = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {currentView === 'dashboard' && (
                <MathDashboard
                    username={username}
                    currentLevel={level}
                    onStartLevel={handleStartLevel}
                    onBack={handleExitApp}
                />
            )}

            {currentView === 'session' && (
                <MathSession
                    level={currentSessionLevel}
                    exercises={exercises}
                    onComplete={handleSessionComplete}
                    onExit={handleBackToDashboard}
                />
            )}

            {currentView === 'result' && (
                <MathLevelEnd
                    score={lastScore}
                    total={10}
                    timeSpent={lastTime}
                    isSuccess={lastSuccess}
                    onRetry={handleRetry}
                    onNext={handleNextLevel}
                    onHome={handleBackToDashboard}
                />
            )}
        </div>
    );
};

export default Mathematiques;
