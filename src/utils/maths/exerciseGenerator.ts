import { getExercisesForLevel, StructuredExercise } from '@/data/maths/structuredExercises';
import { parseFraction } from './fractionUtils';
import { strategies, getFallbackStrategy } from './exerciseStrategies';

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

const generateProceduralExercises = (level: number): Exercise[] => {
    const exercises: Exercise[] = [];
    const count = 10;
    const strategy = strategies[level] || getFallbackStrategy();

    for (let i = 0; i < count; i++) {
        const partial = strategy(level);
        const answer = partial.answer ?? 0;

        exercises.push({
            id: generateId(),
            question: partial.question ?? "",
            answer,
            category: partial.category ?? "calcul",
            level,
            isQCM: partial.isQCM ?? Math.random() > 0.6,
            choices: generateChoices(answer)
        });
    }

    return exercises;
};

export const generateLevelExercises = (level: number): Exercise[] => {
    const structured = getExercisesForLevel(level);

    if (structured.length > 0) {
        const converted = structured.map(s => convertToExercise(s, level));
        if (converted.length >= 10) return converted;

        const needed = 10 - converted.length;
        const procedural = generateProceduralExercises(level).slice(0, needed);
        return [...converted, ...procedural];
    }

    return generateProceduralExercises(level);
};

export const ALL_LEVELS = Array.from({ length: 50 }, (_, i) => i + 1);

export const getNextLevel = (currentLevel: number): number => {
    const idx = ALL_LEVELS.indexOf(currentLevel);
    return idx < ALL_LEVELS.length - 1 ? ALL_LEVELS[idx + 1] : currentLevel;
};

export const getLevelInfo = (level: number) => ({
    questionsCount: 10,
    timeSeconds: 360, // 6 minutes for all levels
    isSpecial: level % 5 === 0,
    name: `Niveau ${level}`,
    grade: level <= 20 ? 'CM1' : 'CM2' as const
});
