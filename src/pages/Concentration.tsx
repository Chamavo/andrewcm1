```javascript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Brain, Home, Play, Sparkles } from 'lucide-react';
import { generateSession } from '@/utils/concentration/concentrationEngine';
import { ConcentrationExercise, SessionPhase } from '@/types/concentrationTypes';
import SessionRunner from '@/components/concentration/SessionRunner';

type ViewState = 'home' | 'session';

const Concentration: React.FC = () => {
    const navigate = useNavigate();
    const [view, setView] = useState<ViewState>('home');
    const [currentSession, setCurrentSession] = useState<ConcentrationExercise[]>([]);
    const [sessionPhase, setSessionPhase] = useState<SessionPhase>('warmup');

    const startSession = (phase: SessionPhase) => {
        const exercises = generateSession(phase);
        setCurrentSession(exercises);
        setSessionPhase(phase);
        setView('session');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fdfbf7] to-[#e8e0d5] font-sans">
            <header className="p-4 flex justify-between items-center sticky top-0 z-10 bg-white/50 backdrop-blur-md">
                <div className="flex items-center gap-2 text-amber-800">
                    <Brain className="w-8 h-8" />
                    <h1 className="text-2xl font-black">Concentration</h1>
                </div>
                <div className="flex gap-2">
                    {view === 'session' && (
                        <Button variant="ghost" onClick={() => setView('home')} className="text-amber-800">
                            Quitter
                        </Button>
                    )}
                    <Button variant="ghost" onClick={() => navigate('/')} className="gap-2 text-amber-800 hover:text-amber-900 hover:bg-amber-100/50">
                        <Home className="w-5 h-5" />
                        <span className="hidden sm:inline">Accueil</span>
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <AnimatePresence mode="wait">
                    {view === 'home' ? (
                        <motion.div 
                            key="home"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center"
                        >
                            <h2 className="text-4xl md:text-6xl font-black text-amber-900 mb-6">Prêt à muscler ton cerveau ? 🧠</h2>
                            <p className="text-xl text-amber-700/80 mb-12 max-w-2xl mx-auto">
                                Choisis ta séance pour entraîner ta mémoire, ta logique et ton attention !
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => startSession('core')}
                                    className="bg-white rounded-3xl p-8 shadow-xl border-b-8 border-amber-200 cursor-pointer group"
                                >
                                    <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                                        <span className="text-4xl">📅</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Séance du jour</h3>
                                    <p className="text-gray-500">60 minutes guidées</p>
                                    <span className="inline-block mt-4 px-4 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-bold">Recommandé</span>
                                </motion.div>

                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => startSession('warmup')}
                                    className="bg-white rounded-3xl p-8 shadow-xl border-b-8 border-blue-200 cursor-pointer group"
                                >
                                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                                        <span className="text-4xl">🎮</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Entraînement libre</h3>
                                    <p className="text-gray-500">Mode Échauffement (Court)</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    ) : (
                        <SessionRunner 
                            key="session"
                            exercises={currentSession}
                            phase={sessionPhase}
                            onComplete={() => setView('home')}
                        />
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default Concentration;
```
