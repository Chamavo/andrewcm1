import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { ProgressionView } from '@/components/orthographe/ProgressionView';
import { StudentHomePage } from '@/components/orthographe/StudentHomePage';
import { useProgress } from '@/hooks/useProgress';
import { useNavigate } from 'react-router-dom';

type View = 'home' | 'progression' | 'dictee' | 'etude' | 'orthographe' | 'redaction';

const OrthographePage = () => {
    const [view, setView] = useState<View>('home');
    const [studentName] = useState('Andrew'); // Bypass login as requested
    const navigate = useNavigate();

    const {
        userProgress,
        loadProgress,
        setUserProgress
    } = useProgress();

    useEffect(() => {
        loadProgress(studentName);
    }, [loadProgress, studentName]);

    const handleModuleSelect = useCallback((module: string) => {
        switch (module) {
            case 'progression':
                setView('progression');
                break;
            // Other modules can be added here once components are copied
            default:
                toast.info("Ce module sera bientôt disponible !");
        }
    }, []);

    const handleBackToMenu = useCallback(() => {
        setView('home');
    }, []);

    const handleExit = useCallback(() => {
        navigate('/');
    }, [navigate]);

    if (view === 'home') {
        return (
            <StudentHomePage
                studentName={studentName}
                onModuleSelect={handleModuleSelect as any}
                onLogout={handleExit}
            />
        );
    }

    if (view === 'progression') {
        return (
            <ProgressionView
                studentName={studentName}
                onComplete={handleBackToMenu}
                onBack={handleBackToMenu}
            />
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="bg-white/10 rounded-2xl p-8 text-center max-w-md backdrop-blur-lg">
                <h2 className="text-2xl font-bold text-white mb-4">Module en construction</h2>
                <p className="text-white/70 mb-6">La vue "{view}" est en cours d'intégration.</p>
                <button
                    onClick={handleBackToMenu}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-xl transition-all"
                >
                    Retour au menu
                </button>
            </div>
        </div>
    );
};

export default OrthographePage;
