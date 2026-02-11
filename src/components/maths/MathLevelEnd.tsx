import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, RefreshCw, ArrowRight } from 'lucide-react';

interface MathLevelEndProps {
    score: number;
    total: number;
    timeSpent: number;
    onRetry: () => void;
    onNext: () => void;
    onHome: () => void;
    isSuccess: boolean;
}

const MathLevelEnd: React.FC<MathLevelEndProps> = ({ score, total, timeSpent, onRetry, onNext, onHome, isSuccess }) => {
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}m ${s}s`;
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 max-w-lg w-full text-center border-b-8 border-slate-200"
            >
                {isSuccess ? (
                    <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 text-6xl animate-bounce">
                        🏆
                    </div>
                ) : (
                    <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-6xl">
                        💪
                    </div>
                )}

                <h2 className="text-4xl font-black text-slate-800 mb-2">
                    {isSuccess ? 'Niveau Réussi !' : 'Essaie encore !'}
                </h2>

                <p className="text-slate-500 mb-8 text-lg">
                    {isSuccess ? "Tu es un champion des maths !" : "L'entraînement, c'est le secret."}
                </p>

                <div className="bg-slate-50 rounded-2xl p-6 mb-8 flex justify-around border border-slate-100">
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-400 uppercase">Score</span>
                        <span className={`text-3xl font-black ${isSuccess ? 'text-green-500' : 'text-slate-700'}`}>
                            {score}/{total}
                        </span>
                    </div>
                    <div className="w-px bg-slate-200"></div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-400 uppercase">Temps</span>
                        <span className="text-3xl font-black text-slate-700">
                            {formatTime(timeSpent)}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    {isSuccess && (
                        <button
                            onClick={onNext}
                            className="w-full bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform hover:-translate-y-1 active:translate-y-0"
                        >
                            Niveau Suivant <ArrowRight />
                        </button>
                    )}

                    <button
                        onClick={onRetry}
                        className={`w-full text-xl font-bold py-4 rounded-xl shadow-sm border-2 flex items-center justify-center gap-2 transition-transform hover:-translate-y-1 active:translate-y-0 ${!isSuccess
                                ? 'bg-blue-500 hover:bg-blue-600 text-white border-transparent'
                                : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                            }`}
                    >
                        <RefreshCw className={isSuccess ? "w-5 h-5" : "w-6 h-6"} />
                        {isSuccess ? "Rejouer ce niveau" : "Réessayer"}
                    </button>

                    <button
                        onClick={onHome}
                        className="mt-2 text-slate-400 hover:text-slate-600 font-medium py-2"
                    >
                        Retour au menu
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default MathLevelEnd;
