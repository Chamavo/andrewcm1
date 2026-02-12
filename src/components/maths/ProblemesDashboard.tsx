
import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Check } from 'lucide-react';
import { getAllProblems, getProblemStatus, TOTAL_PROBLEMS } from '@/utils/maths/problemManager';

interface ProblemesDashboardProps {
    onSelectProblem: (id: number) => void;
    onBack: () => void;
}

const ProblemesDashboard: React.FC<ProblemesDashboardProps> = ({ onSelectProblem, onBack }) => {
    // Generate 1 to 150
    const allIds = Array.from({ length: TOTAL_PROBLEMS }, (_, i) => i + 1);
    const problems = getAllProblems();

    // Group by parts
    const part1 = allIds.filter(id => id <= 50);
    const part2 = allIds.filter(id => id > 50 && id <= 100);
    const part3 = allIds.filter(id => id > 100);

    const renderGrid = (ids: number[], title: string, colorClass: string) => (
        <div className="mb-12">
            <h3 className={`text-2xl font-bold mb-6 ${colorClass}`}>{title}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {ids.map(id => {
                    const problem = problems.find(p => p.id === id);
                    const isMissing = !problem;
                    const status = getProblemStatus(id);
                    const isSolved = status === 'solved';

                    return (
                        <motion.button
                            key={id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => !isMissing && onSelectProblem(id)}
                            disabled={isMissing}
                            className={`
                                relative aspect-square rounded-2xl p-2 flex flex-col items-center justify-center gap-1 shadow-sm transition-all
                                ${isMissing
                                    ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                                    : isSolved
                                        ? 'bg-green-50 border-2 border-green-400 text-green-700 shadow-green-100'
                                        : 'bg-white hover:shadow-md cursor-pointer border-2 border-transparent hover:border-blue-200 text-slate-700'
                                }
                            `}
                        >
                            <span className={`text-lg font-bold`}>
                                {id}
                            </span>
                            {isMissing ? (
                                <Lock className="w-4 h-4 opacity-50" />
                            ) : isSolved ? (
                                <Check className="w-4 h-4 text-green-600" />
                            ) : (
                                <div className="w-2 h-2 rounded-full bg-blue-400 opacity-20" />
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={onBack}
                        className="p-2 rounded-full hover:bg-slate-200 transition-colors"
                    >
                        ← Retour
                    </button>
                    <h1 className="text-3xl font-black text-slate-800">150 Problèmes</h1>
                </div>

                {renderGrid(part1, "Partie 1 : Début d'année", "text-blue-600")}
                {renderGrid(part2, "Partie 2 : Milieu d'année", "text-purple-600")}
                {renderGrid(part3, "Partie 3 : Fin d'année", "text-pink-600")}
            </div>
        </div>
    );
};

export default ProblemesDashboard;
