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

// Fallback procedural generation if structured data is missing
const generateProceduralExercises = (level: number): Exercise[] => {
    const exercises: Exercise[] = [];
    const count = 10;

    for (let i = 0; i < count; i++) {
        const id = generateId();
        let question = "";
        let answer = 0;
        let category = "calcul";

        // Simple difficulty scaling
        if (level <= 10) {
            // Addition/Subtraction
            const isAdd = Math.random() > 0.5;
            const a = Math.floor(Math.random() * (10 * level)) + 5;
            const b = Math.floor(Math.random() * (5 * level)) + 2;
            if (isAdd) {
                question = `${a} + ${b} =`;
                answer = a + b;
                category = "addition";
            } else {
                const max = Math.max(a, b);
                const min = Math.min(a, b);
                question = `${max} - ${min} =`;
                answer = max - min;
                category = "soustraction";
            }
        } else if (level <= 20) {
            // Multiplication tables
            const a = Math.floor(Math.random() * 10) + 2;
            const b = Math.floor(Math.random() * 10) + 2;
            question = `${a} × ${b} =`;
            answer = a * b;
            category = "multiplication";
        } else if (level <= 30) {
            // Complex Multiplication (1 digit x 2 digits)
            const a = Math.floor(Math.random() * 9) + 2;
            const b = Math.floor(Math.random() * 20) + 10;
            question = `${b} × ${a} =`;
            answer = a * b;
            category = "multiplication_complexe";
        } else if (level <= 40) {
            // Division simple / operations atrous
            const b = Math.floor(Math.random() * 9) + 2;
            const res = Math.floor(Math.random() * 12) + 2;
            const a = b * res;
            question = `${a} ÷ ${b} =`;
            answer = res;
            category = "division";
        } else {
            // Mixed / Complex (Levels 41-50)
            const op = Math.random();
            if (op < 0.33) {
                // Large Addition
                const a = Math.floor(Math.random() * 500) + 100;
                const b = Math.floor(Math.random() * 500) + 100;
                question = `${a} + ${b} =`;
                answer = a + b;
                category = "addition_complexe";
            } else if (op < 0.66) {
                // Large Subtraction
                const a = Math.floor(Math.random() * 500) + 200;
                const b = Math.floor(Math.random() * 200) + 10;
                question = `${a} - ${b} =`;
                answer = a - b;
                category = "soustraction_complexe";
            } else {
                // Triple operation or logic
                const a = Math.floor(Math.random() * 10) + 2;
                const b = Math.floor(Math.random() * 10) + 2;
                const c = Math.floor(Math.random() * 10) + 1;
                question = `${a} × ${b} + ${c} =`;
                answer = a * b + c;
                category = "mixte";
            }
        }

        exercises.push({
            id,
            question,
            answer,
            category,
            level,
            isQCM: Math.random() > 0.4,
            choices: generateChoices(answer)
        });
    }

    return exercises;
};

export const generateLevelExercises = (level: number): Exercise[] => {
    const structured = getExercisesForLevel(level);

    // If structured exercises exist, use them but ensuring we have 10
    // If not enough structured exercises, complement with procedural
    if (structured.length > 0) {
        const converted = structured.map(s => convertToExercise(s, level));
        if (converted.length >= 10) return converted;

        // Add procedural to reach 10
        const needed = 10 - converted.length;
        const procedural = generateProceduralExercises(level).slice(0, needed);
        return [...converted, ...procedural];
    }

    // Fallback completely procedural
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
