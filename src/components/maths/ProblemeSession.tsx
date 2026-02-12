
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, Copy, HelpCircle, Eye, EyeOff } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MathProblem, saveProblemStatus } from '@/utils/maths/problemManager';

interface ProblemeSessionProps {
    problem: MathProblem;
    onBack: () => void;
    onComplete: (success: boolean) => void;
}

const ProblemeSession: React.FC<ProblemeSessionProps> = ({ problem, onBack, onComplete }) => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const handleSolved = () => {
        saveProblemStatus(problem.id, 'solved');
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
        setTimeout(() => {
            onComplete(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center">
            {/* Header */}
            <div className="w-full max-w-4xl flex items-center justify-between mb-8">
                <button
                    onClick={onBack}
                    className="p-2 rounded-full hover:bg-slate-200 transition-colors flex items-center gap-2 text-slate-600 font-bold"
                >
                    <ArrowLeft className="w-6 h-6" />
                    Retour
                </button>
                <h2 className="text-2xl font-black text-slate-800">Problème {problem.id}</h2>
                <div className="w-24" /> {/* Spacer */}
            </div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-xl p-8 md:p-12 max-w-4xl w-full"
            >
                <div className="prose prose-lg max-w-none mb-8">
                    <h1 className="text-3xl font-black text-blue-600 mb-6">{problem.title}</h1>
                    <div className="text-xl text-slate-700 whitespace-pre-wrap leading-relaxed font-medium">
                        {problem.text}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-4">

                    {/* Hint Button */}
                    <button
                        onClick={() => setShowHint(!showHint)}
                        className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-yellow-100 text-yellow-700 font-bold hover:bg-yellow-200 transition-colors w-full sm:w-auto self-start"
                    >
                        <HelpCircle className="w-5 h-5" />
                        {showHint ? "Masquer l'indice" : "Besoin d'un indice ?"}
                    </button>

                    <AnimatePresence>
                        {showHint && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 text-yellow-800 italic">
                                    💡 Indice : Lis bien la question et repère les chiffres importants. Fais un schéma si besoin !
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="h-8" />

                    {/* Answer Section */}
                    <div className="border-t-2 border-slate-100 pt-8">
                        {!showAnswer ? (
                            <div className="flex justify-center">
                                <button
                                    onClick={() => setShowAnswer(true)}
                                    className="flex items-center gap-3 bg-slate-800 text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-slate-700 transition-all hover:scale-105 shadow-lg shadow-slate-300"
                                >
                                    <Eye className="w-6 h-6" />
                                    Voir la solution
                                </button>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-green-50 rounded-2xl p-8 border-2 border-green-100 text-center"
                            >
                                <h3 className="text-2xl font-black text-green-700 mb-4">Solution</h3>
                                <div className="text-xl text-slate-800 font-medium whitespace-pre-wrap mb-8">
                                    {problem.answer}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button
                                        onClick={handleSolved}
                                        className="flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-600 transition-all shadow-lg shadow-green-200 hover:scale-105"
                                    >
                                        <Check className="w-6 h-6" />
                                        J'ai trouvé !
                                    </button>
                                    <button
                                        onClick={() => setShowAnswer(false)} // Just hide or mark as failed?
                                        className="flex items-center justify-center gap-2 bg-white text-slate-500 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 border-2 border-slate-200 transition-all"
                                    >
                                        <EyeOff className="w-5 h-5" />
                                        Masquer
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ProblemeSession;
