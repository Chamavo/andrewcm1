import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
    BookOpen,
    PenTool,
    FileText,
    Award,
    LogOut,
    ArrowRight,
    Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/orthographeClient';

interface StudentHomePageProps {
    studentName: string;
    onModuleSelect: (module: 'progression') => void;
    onLogout: () => void;
}

const TOTAL_PROGRESSION_LEVELS = 50;

export const StudentHomePage = ({
    studentName,
    onModuleSelect,
    onLogout
}: StudentHomePageProps) => {
    const [progressionCompleted, setProgressionCompleted] = useState(false);
    const [currentLevel, setCurrentLevel] = useState(1);
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        const loadProgressionStatus = async () => {
            const { data, error } = await supabase
                .from('progression_levels')
                .select('current_level, all_completed')
                .eq('student_id', studentName)
                .maybeSingle();

            if (error) {
                console.error('Error loading progression status:', error);
                return;
            }

            if (data) {
                setProgressionCompleted(data.all_completed);
                setCurrentLevel(data.current_level);
                setPercentage(Math.round(((data.current_level - 1) / TOTAL_PROGRESSION_LEVELS) * 100));
            }
        };

        loadProgressionStatus();
    }, [studentName]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="flex justify-end p-4">
                <Button variant="outline" onClick={onLogout} className="bg-white/10 border-white/20 text-white hover:bg-white/20 gap-2">
                    <LogOut className="w-4 h-4" /> Quitter
                </Button>
            </div>

            <div className="max-w-5xl mx-auto px-4 pb-8 flex flex-col items-center">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">✨ Bonjour ! 👋 ⭐</h1>
                    <p className="text-xl text-white/80">Bienvenue dans ton module <span className="text-amber-400 font-semibold">Orthographe</span> ! 🏆</p>
                </motion.div>

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => onModuleSelect('progression')}
                    className="w-full max-w-2xl rounded-3xl p-8 mb-12 text-left bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transition-all border border-white/10 shadow-2xl group flex flex-col gap-6"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-4xl shadow-inner">🏔️</div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">🏔️ Progression</h2>
                                <p className="text-white/80 text-lg">Niveau {currentLevel} / {TOTAL_PROGRESSION_LEVELS}</p>
                            </div>
                        </div>
                        <ArrowRight className="w-8 h-8 text-white group-hover:translate-x-2 transition-transform" />
                    </div>

                    <div className="w-full">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-white/70 text-sm">Progression globale</span>
                            <span className="text-white font-black text-xl">{percentage}%</span>
                        </div>
                        <div className="h-4 bg-black/20 rounded-full overflow-hidden border border-white/5">
                            <motion.div className="h-full bg-white rounded-full" initial={{ width: 0 }} animate={{ width: `${percentage}%` }} transition={{ duration: 1 }} />
                        </div>
                    </div>
                </motion.button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                    <div className="bg-white/5 rounded-3xl p-6 text-center border border-white/10 opacity-50 cursor-not-allowed">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4"><Lock className="w-6 h-6 text-white/40" /></div>
                        <h3 className="text-white font-bold opacity-70">Dictées</h3>
                    </div>
                    <div className="bg-white/5 rounded-3xl p-6 text-center border border-white/10 opacity-50 cursor-not-allowed">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4"><Lock className="w-6 h-6 text-white/40" /></div>
                        <h3 className="text-white font-bold opacity-70">Rédaction</h3>
                    </div>
                </div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-12 bg-white/5 rounded-3xl p-8 text-center max-w-2xl border border-white/10 backdrop-blur-sm">
                    <p className="text-white/80 text-lg italic">"Le français, c'est comme un muscle : plus tu t'entraînes, plus tu deviens fort !"</p>
                </motion.div>
            </div>
        </div>
    );
};
