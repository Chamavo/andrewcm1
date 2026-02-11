import { getExercisesForLevel, StructuredExercise } from '@/data/maths/structuredExercises';
import { parseFraction } from './fractionUtils';

export interface Exercise {
    id: string;
    question: string;
    answer: number;
    category: string;
    level: number;
    hint?: string;
    isQCM?: boolean;
    choices?: number[];
    competence?: string;
    difficulty?: number;
    questionType?: 'spirale' | 'cible' | 'mixte';
    tempsEstime?: number;
}

const generateId = (): string => `ex-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

const parseAnswer = (reponse: number | string): number => {
    if (typeof reponse === 'number') return reponse;
    const timeMatch = reponse.match(/(\d+)h\s*(\d{1,2})/);
    if (timeMatch) return parseInt(timeMatch[1]) * 60 + parseInt(timeMatch[2]);
    const hoursOnlyMatch = reponse.match(/^(\d+)h$/);
    if (hoursOnlyMatch) return parseInt(hoursOnlyMatch[1]) * 60;
    return parseFraction(reponse) || 0;
};

export const generateChoices = (correctAnswer: number): number[] => {
    const choices = [correctAnswer];
    const isDecimal = correctAnswer % 1 !== 0;
    while (choices.length < 4) {
        let wrong: number;
        if (isDecimal) {
            wrong = parseFloat((correctAnswer + (Math.random() * 0.4 - 0.2)).toFixed(2));
        } else {
            wrong = correctAnswer + (Math.floor(Math.random() * 20) - 10);
        }
        if (!choices.includes(wrong) && wrong >= 0) choices.push(wrong);
    }
    return choices.sort(() => Math.random() - 0.5);
};

const convertToExercise = (structured: StructuredExercise, level: number): Exercise => {
    const answer = parseAnswer(structured.reponse);
    return {
        id: generateId(),
        question: structured.enonce,
        answer,
        category: structured.type,
        level,
        hint: structured.astuce,
        isQCM: structured.type === 'fractions' || Math.random() > 0.7,
        choices: generateChoices(answer)
    };
};

export const generateLevelExercises = (level: number): Exercise[] => {
    const structured = getExercisesForLevel(level);
    return structured.map(s => convertToExercise(s, level)).sort(() => Math.random() - 0.5);
};

export const ALL_LEVELS = Array.from({ length: 50 }, (_, i) => i + 1);

export const getNextLevel = (currentLevel: number): number => {
    const idx = ALL_LEVELS.indexOf(currentLevel);
    return idx < ALL_LEVELS.length - 1 ? ALL_LEVELS[idx + 1] : currentLevel;
};

export const getLevelInfo = (level: number) => ({
    questionsCount: 10,
    timeSeconds: level <= 20 ? 600 : 900,
    isSpecial: level % 5 === 0,
    name: `Niveau ${level}`,
    grade: level <= 20 ? 'CM1' : 'CM2' as const
});
