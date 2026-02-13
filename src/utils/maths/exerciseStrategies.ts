import { Exercise } from './exerciseGenerator';
import { intToWords } from './numberToFrench';

export type ExerciseStrategy = (level: number) => Partial<Exercise>;

export const strategies: Record<number, ExerciseStrategy> = {
    // 1-2: Dictée de nombres
    1: () => {
        const val = Math.floor(Math.random() * 9000) + 1000;
        return {
            question: `Écris le nombre : ${intToWords(val)}`,
            answer: val,
            category: "dictee",
            isQCM: false
        };
    },
    2: () => {
        const val = Math.floor(Math.random() * 900000) + 10000;
        return {
            question: `Écris le nombre : ${intToWords(val)}`,
            answer: val,
            category: "dictee",
            isQCM: false
        };
    },
    // 3-4: Tables Addition / Soustraction
    3: () => {
        const a = Math.floor(Math.random() * 9) + 2;
        const b = Math.floor(Math.random() * 9) + 2;
        return { question: `${a} + ${b} =`, answer: a + b, category: "addition" };
    },
    4: () => {
        const a = Math.floor(Math.random() * 18) + 2;
        const b = Math.floor(Math.random() * 9) + 2;
        const max = Math.max(a, b);
        const min = Math.min(a, b);
        return { question: `${max} - ${min} =`, answer: max - min, category: "soustraction" };
    },
    // 5: Ajouter 1 chiffre à 2 chiffres
    5: () => {
        const a = Math.floor(Math.random() * 80) + 10;
        const b = Math.floor(Math.random() * 9) + 1;
        return { question: `${a} + ${b} =`, answer: a + b, category: "addition_complexe" };
    },
    // 6-7: Tables Multiplication
    6: () => {
        const a = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
        const b = Math.floor(Math.random() * 9) + 2;
        return { question: `${b} × ${a} =`, answer: b * a, category: "multiplication" };
    },
    7: () => {
        const a = [6, 7][Math.floor(Math.random() * 2)];
        const b = Math.floor(Math.random() * 9) + 2;
        return { question: `${b} × ${a} =`, answer: b * a, category: "multiplication" };
    },
    // 8-9: Multiples
    8: () => {
        const factor = Math.floor(Math.random() * 50);
        return { question: `Quel est le double de ${factor} ?`, answer: factor * 2, category: "multiples" };
    },
    9: () => {
        const factor = Math.floor(Math.random() * 20);
        return { question: `Combien font 5 × ${factor} ?`, answer: factor * 5, category: "multiples" };
    },
    10: () => {
        const a = [8, 9][Math.floor(Math.random() * 2)];
        const b = Math.floor(Math.random() * 9) + 2;
        return { question: `${b} × ${a} =`, answer: b * a, category: "multiplication" };
    },
    11: () => {
        const a = 11;
        const b = Math.floor(Math.random() * 80) + 10;
        return { question: `${b} × ${a} =`, answer: b * a, category: "multiplication_11" };
    },
    12: () => {
        const squares = [4, 9, 16, 25, 36, 49, 64, 81, 100];
        const val = squares[Math.floor(Math.random() * squares.length)];
        return { question: `√${val} = ?`, answer: Math.sqrt(val), category: "racine" };
    },
    17: () => {
        const factors = [10, 100, 1000];
        const factor = factors[Math.floor(Math.random() * factors.length)];
        const b = Math.floor(Math.random() * 100) + 2;
        return { question: `${b} × ${factor} =`, answer: b * factor, category: "puissance_10" };
    },
    18: () => {
        const factors = [10, 100, 1000];
        const factor = factors[Math.floor(Math.random() * factors.length)];
        const b = parseFloat((Math.random() * 50).toFixed(3));
        return { question: `${b} × ${factor} =`, answer: parseFloat((b * factor).toFixed(3)), category: "puissance_10_dec" };
    },
    19: () => {
        const b = Math.floor(Math.random() * 20) + 1;
        return { question: `${b} × 25 =`, answer: b * 25, category: "multiplication_25" };
    },
    20: () => {
        const divisors = [10, 100, 1000];
        const divisor = divisors[Math.floor(Math.random() * divisors.length)];
        const val = Math.floor(Math.random() * 5000) + 100;
        return { question: `${val} ÷ ${divisor} =`, answer: val / divisor, category: "division_10" };
    },
    21: () => {
        const b = Math.floor(Math.random() * 20) * 2;
        return { question: `${b} × 1,5 =`, answer: b * 1.5, category: "multiplication_1_5" };
    },
    22: () => {
        const intVal = Math.floor(Math.random() * 50) + 1;
        const decVal = parseFloat(Math.random().toFixed(2));
        return { question: `${intVal} + ${decVal} =`, answer: intVal + decVal, category: "addition_decimale" };
    },
    23: () => {
        const pairs = [
            { n: 1, d: 2 }, { n: 1, d: 4 }, { n: 3, d: 4 },
            { n: 1, d: 5 }, { n: 2, d: 5 }, { n: 3, d: 5 }, { n: 4, d: 5 },
            { n: 1, d: 10 }, { n: 3, d: 10 }
        ];
        const p = pairs[Math.floor(Math.random() * pairs.length)];
        return { question: `${p.n}/${p.d} = ? (décimal)`, answer: p.n / p.d, category: "fraction_decimal" };
    },
    24: () => {
        const b = Math.floor(Math.random() * 40) + 1;
        return { question: `${b} × 0,5 =`, answer: b * 0.5, category: "multiplication_0_5" };
    },
    25: () => {
        const b = Math.floor(Math.random() * 40) + 1;
        return { question: `${b} ÷ 0,5 =`, answer: b / 0.5, category: "division_0_5" };
    },
    26: () => {
        const b = Math.floor(Math.random() * 20) * 4;
        return { question: `${b} × 0,25 =`, answer: b * 0.25, category: "multiplication_0_25" };
    },
    27: () => {
        const b = Math.floor(Math.random() * 20) + 1;
        return { question: `${b} ÷ 0,25 =`, answer: b / 0.25, category: "division_0_25" };
    },
    28: () => {
        const d = Math.floor(Math.random() * 8) + 2;
        const n1 = Math.floor(Math.random() * (d - 1)) + 1;
        const n2 = Math.floor(Math.random() * (d - n1)) + 1;
        return { question: `${n1}/${d} + ${n2}/${d} = ? (forme a/b)`, answer: (n1 + n2) / d, category: "addition_fraction" };
    },
};

// Add ranges 13-16
for (let l = 13; l <= 16; l++) {
    strategies[l] = (level) => {
        const rangeStart = (level - 13) * 20 + 10;
        const factors = [rangeStart, rangeStart + 10];
        const factor = factors[Math.floor(Math.random() * factors.length)];
        const b = Math.floor(Math.random() * 20) + 2;
        return { question: `${b} × ${factor} =`, answer: b * factor, category: "multiplication_dizaines" };
    };
}

export const getFallbackStrategy = (): ExerciseStrategy => (level) => {
    const mode = Math.floor(Math.random() * 6);
    let question = "";
    let answer = 0;
    if (mode === 0) {
        const a = Math.floor(Math.random() * 50) + 10;
        const b = Math.floor(Math.random() * 9) + 2;
        question = `${a} × ${b} =`;
        answer = a * b;
    } else if (mode === 1) {
        const b = Math.floor(Math.random() * 9) + 2;
        const res = Math.floor(Math.random() * 20) + 10;
        const a = b * res;
        question = `${a} ÷ ${b} =`;
        answer = res;
    } else if (mode === 2) {
        const is05 = Math.random() > 0.5;
        const factor = is05 ? 0.5 : 0.25;
        const val = Math.floor(Math.random() * 100);
        const isMult = Math.random() > 0.5;
        const op = isMult ? '×' : '÷';
        question = `${val} ${op} ${factor.toString().replace('.', ',')} =`;
        answer = isMult ? val * factor : val / factor;
    } else {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        const c = Math.floor(Math.random() * 10) + 1;
        question = `${a} × ${b} + ${c} =`;
        answer = a * b + c;
    }
    return { question, answer, category: "mixte_avance" };
};
