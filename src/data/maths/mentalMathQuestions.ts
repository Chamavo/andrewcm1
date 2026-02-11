export interface MentalMathQuestion {
    id: string;
    level: number;
    question: string;
    answer: number;
    category: 'arithmetic' | 'fractions' | 'geometry' | 'logic' | 'comparison';
}

export const mentalMathQuestions: MentalMathQuestion[] = [
    // ============= LEVEL 1 =============
    { id: "L1_01", level: 1, question: "27 + 9 = ?", answer: 36, category: "arithmetic" },
    { id: "L1_02", level: 1, question: "45 + 19 = ?", answer: 64, category: "arithmetic" },
    { id: "L1_03", level: 1, question: "38 + 11 = ?", answer: 49, category: "arithmetic" },
    { id: "L1_16", level: 1, question: "La moitié de 24 = ?", answer: 12, category: "fractions" },
    { id: "L1_28", level: 1, question: "Périmètre d'un carré de côté 5 cm = ? cm", answer: 20, category: "geometry" },

    // ============= LEVEL 2 =============
    { id: "L2_01", level: 2, question: "67 + 29 = ?", answer: 96, category: "arithmetic" },
    { id: "L2_02", level: 2, question: "83 + 19 = ?", answer: 102, category: "arithmetic" },
    { id: "L2_16", level: 2, question: "La moitié de 58 = ?", answer: 29, category: "fractions" },
    { id: "L2_28", level: 2, question: "Périmètre d'un carré de côté 12 cm = ? cm", answer: 48, category: "geometry" },

    // ============= LEVEL 3 =============
    { id: "L3_01", level: 3, question: "145 + 99 = ?", answer: 244, category: "arithmetic" },
    { id: "L3_16", level: 3, question: "La moitié de 126 = ?", answer: 63, category: "fractions" },
    { id: "L3_28", level: 3, question: "Périmètre d'un carré de côté 15 cm = ? cm", answer: 60, category: "geometry" },

    // ============= LEVEL 4 =============
    { id: "L4_01", level: 4, question: "267 + 199 = ?", answer: 466, category: "arithmetic" },
    { id: "L4_16", level: 4, question: "La moitié de 246 = ?", answer: 123, category: "fractions" },
    { id: "L4_28", level: 4, question: "Périmètre d'un carré de côté 18 cm = ? cm", answer: 72, category: "geometry" },

    // ============= LEVEL 5 =============
    { id: "L5_01", level: 5, question: "387 + 299 = ?", answer: 686, category: "arithmetic" },
    { id: "L5_16", level: 5, question: "La moitié de 378 = ?", answer: 189, category: "fractions" },
    { id: "L5_28", level: 5, question: "Périmètre d'un carré de côté 23 cm = ? cm", answer: 92, category: "geometry" },
];
