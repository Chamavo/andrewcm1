import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { ProgressionView } from '@/components/orthographe/ProgressionView';
import { StudentHomePage } from '@/components/orthographe/StudentHomePage';
import { DicteeModule } from '@/components/orthographe/DicteeModule';
import { RedactionModule } from '@/components/orthographe/RedactionModule';
import { useProgress } from '@/hooks/useProgress';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';

type View = 'home' | 'progression' | 'dictee' | 'etude' | 'orthographe' | 'redaction';

const OrthographePage = () => {
    const [view, setView] = useState<View>('home');
    const { user, logout } = useUser();
    const navigate = useNavigate();

    const {
        userProgress,
        loadProgress,
        setUserProgress
    } = useProgress();

    useEffect(() => {
        if (user) {
            loadProgress(user);
        }
    }, [loadProgress, user]);

    const handleModuleSelect = useCallback((module: string) => {
        switch (module) {
            case 'progression':
                setView('progression');
                break;
            case 'dictee':
                setView('dictee');
                break;
            case 'redaction':
                setView('redaction');
                break;
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

    const handleLogout = useCallback(() => {
        logout();
    }, [logout]);

    if (view === 'home') {
        return (
            <StudentHomePage
                studentName={user || 'Élève'}
                onModuleSelect={handleModuleSelect as any}
                onLogout={handleLogout}
                onBackToMenu={handleExit}
                stats={userProgress}
            />
        );
    }

    if (view === 'progression') {
        return (
            <ProgressionView
                studentName={user || 'Élève'}
                onComplete={handleBackToMenu}
                onBack={handleBackToMenu}
            />
        );
    }

    if (view === 'dictee') {
        return <DicteeModule onBack={handleBackToMenu} />;
    }

    if (view === 'redaction') {
        return <RedactionModule onBack={handleBackToMenu} />;
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="bg-slate-50 rounded-2xl p-8 text-center max-w-md border-2 border-slate-100 shadow-xl">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Module en construction</h2>
                <p className="text-slate-600 mb-6">La vue "{view}" est en cours d'intégration.</p>
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
