import { useState, useEffect, useCallback } from 'react';
import type {
    ProgressionExercise,
    ProgressionProgress,
} from '@/types/progression';
import { generateExercise } from '@/types/orthographe';

const MAX_EXERCISES_PER_LEVEL = 10;
const LS_KEY_PREFIX = 'progression_module_';

export type ModuleStatus = 'loading_data' | 'fetching_progress' | 'generating_pool' | 'ready' | 'error';

export const useProgressionModule = (studentName: string) => {
    const [status, setStatus] = useState<ModuleStatus>('loading_data');
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState<ProgressionProgress>({
        student_id: studentName,
        current_level: 1,
        exercises_done: 0,
        correct_answers: 0,
        consecutive_perfect: 0,
        all_completed: false,
        failures_count: 0,
        lockout_until: null,
        exercises_pool: [],
        answered_indices: [],
    });
    const [exercises, setExercises] = useState<ProgressionExercise[]>([]);
    const [sessionTimeRemaining, setSessionTimeRemaining] = useState<number | null>(null);
    const [globalLockoutRemaining, setGlobalLockoutRemaining] = useState<number | null>(null);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setStatus('fetching_progress');
                const lsKey = `${LS_KEY_PREFIX}${studentName}`;
                const stored = localStorage.getItem(lsKey);

                if (stored) {
                    try {
                        const d = JSON.parse(stored);
                        setProgress({
                            student_id: d.student_id,
                            current_level: d.current_level,
                            exercises_done: d.exercises_done,
                            correct_answers: d.correct_answers,
                            consecutive_perfect: d.consecutive_perfect,
                            all_completed: d.all_completed,
                            failures_count: d.failures_count || 0,
                            lockout_until: d.lockout_until,
                            exercises_pool: d.exercises_pool || [],
                            answered_indices: d.answered_indices || [],
                        });

                        if (d.exercises_pool && d.exercises_pool.length > 0) {
                            setExercises(d.exercises_pool);
                            setStatus('ready');
                        } else {
                            setStatus('generating_pool');
                        }
                    } catch (e) {
                        console.error("Failed to parse local progression", e);
                        setStatus('generating_pool');
                    }
                } else {
                    // New User
                    setStatus('generating_pool');
                }
            } catch (err: any) {
                setError(err.message);
                setStatus('error');
            }
        };

        loadInitialData();
    }, [studentName]);

    const generateExercisesPool = useCallback(async () => {
        setStatus('generating_pool');
        const newPool = Array.from({ length: 20 }, (_, i) => {
            const ex = generateExercise(progress.current_level, []);
            return {
                id: String(ex.id),
                question: ex.question,
                correctAnswer: ex.correctAnswer,
                options: ex.options,
                category: ex.category,
                hint: ex.hint
            };
        });

        setExercises(newPool);
        setStatus('ready');

        // Save pool
        const lsKey = `${LS_KEY_PREFIX}${studentName}`;
        const updated = {
            ...progress,
            exercises_pool: newPool,
            answered_indices: [],
            exercises_done: 0,
            correct_answers: 0
        };
        setProgress(updated);
        localStorage.setItem(lsKey, JSON.stringify(updated));

    }, [progress.current_level, studentName, progress]);

    useEffect(() => {
        if (status === 'generating_pool') {
            generateExercisesPool();
        }
    }, [status, generateExercisesPool]);

    const recordAnswer = useCallback((isCorrect: boolean, exerciseIndex: number) => {
        const newDone = progress.exercises_done + 1;
        const newCorrect = progress.correct_answers + (isCorrect ? 1 : 0);
        const newAnsweredIndices = [...progress.answered_indices, exerciseIndex];
        const lsKey = `${LS_KEY_PREFIX}${studentName}`;

        const currentLevelTotal = MAX_EXERCISES_PER_LEVEL;

        if (newDone >= currentLevelTotal) {
            const isPass = (newCorrect / currentLevelTotal) >= 0.9;
            if (isPass) {
                const nextLevel = progress.current_level + 1;

                const updated = {
                    ...progress,
                    current_level: nextLevel,
                    exercises_done: 0,
                    correct_answers: 0,
                    answered_indices: [] as number[],
                    exercises_pool: [] as any[]
                };
                setProgress(updated);
                localStorage.setItem(lsKey, JSON.stringify(updated));
                setStatus('generating_pool');

                return { levelComplete: true, advanced: true, perfectSession: newCorrect === currentLevelTotal };
            } else {
                const updated = {
                    ...progress,
                    exercises_done: 0,
                    correct_answers: 0,
                    answered_indices: [] as number[]
                };
                setProgress(updated);
                localStorage.setItem(lsKey, JSON.stringify(updated));

                return { levelComplete: true, advanced: false, perfectSession: false };
            }
        }

        const updated = {
            ...progress,
            exercises_done: newDone,
            correct_answers: newCorrect,
            answered_indices: newAnsweredIndices
        };
        setProgress(updated);
        localStorage.setItem(lsKey, JSON.stringify(updated));

        return null;
    }, [progress, studentName]);

    const overallPercentage = Math.round(((progress.current_level - 1) / 50) * 100);

    return {
        status,
        error,
        progress,
        exercises,
        currentLevel: { nb_exercices: MAX_EXERCISES_PER_LEVEL } as any,
        overallPercentage,
        recordAnswer,
        generateExercises: generateExercisesPool,
        isSessionLocked: false,
        sessionTimeRemaining: 3600,
        globalLockoutRemaining: null
    };
};
