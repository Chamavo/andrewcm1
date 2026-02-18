import { useState, useEffect, useCallback } from 'react';
import { Exercise, generateExercise } from '@/types/orthographe';

interface ExerciseWithDbId extends Exercise {
    dbId?: string;
}

export const useExercises = () => {
    const [dbExercises, setDbExercises] = useState<ExerciseWithDbId[]>([]);
    const [isLoading, setIsLoading] = useState(false); // No loading needed for local
    const [exerciseCount, setExerciseCount] = useState(0);

    const loadExercises = useCallback(async () => {
        // No external DB loading needed for now
        // We rely on dynamic generation
        setIsLoading(false);
    }, []);

    useEffect(() => {
        loadExercises();
    }, [loadExercises]);

    const getExercise = useCallback((level: number, usedIds: number[]): ExerciseWithDbId => {
        return generateExercise(level, usedIds);
    }, []);

    const validateAnswer = useCallback(async (
        exercise: ExerciseWithDbId,
        userAnswer: string
    ): Promise<{ isCorrect: boolean; correctAnswer?: string }> => {
        const isCorrect = userAnswer.trim().toLowerCase() === exercise.correctAnswer.toLowerCase();
        return {
            isCorrect,
            correctAnswer: isCorrect ? undefined : exercise.correctAnswer
        };
    }, []);

    return {
        dbExercises,
        exerciseCount,
        isLoading,
        loadExercises,
        getExercise,
        validateAnswer,
    };
};
