
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// 1. Définir le "Shape" des données
interface ProgressData {
    solvedProblems: number[]; // Liste des ID résolus
    lastPath: string;         // Dernier endroit visité
}

interface UserContextType {
    user: string | null;
    login: (username: string) => void;
    logout: () => void;
    progress: ProgressData;
    markProblemSolved: (id: number) => void;
    updateLastPath: (path: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Helper to get key
    const getStorageKey = (username: string) => `christian_cm2_progress_${username}`;

    const [user, setUser] = useState<string | null>(() => localStorage.getItem('andrew_cm1_user'));

    // Initial state with lazy initializer to load synchronously
    const [progress, setProgress] = useState<ProgressData>(() => {
        const currentUser = localStorage.getItem('andrew_cm1_user');
        if (currentUser) {
            const saved = localStorage.getItem(getStorageKey(currentUser));
            if (saved) {
                try {
                    return JSON.parse(saved);
                } catch (e) {
                    console.error("Failed to parse progress", e);
                }
            }
        }
        return { solvedProblems: [], lastPath: '/' };
    });

    const navigate = useNavigate();
    const location = useLocation();

    // Load progress when user changes (e.g. login/logout)
    useEffect(() => {
        if (user) {
            const saved = localStorage.getItem(getStorageKey(user));
            if (saved) {
                try {
                    setProgress(JSON.parse(saved));
                } catch (e) {
                    console.error("Failed to parse progress", e);
                }
            } else {
                setProgress({ solvedProblems: [], lastPath: '/' });
            }
        } else {
            setProgress({ solvedProblems: [], lastPath: '/' });
        }
    }, [user]);

    // Save progress helper
    const saveProgress = (username: string, newProgress: ProgressData) => {
        localStorage.setItem(getStorageKey(username), JSON.stringify(newProgress));
    };

    const login = (username: string) => {
        // Pre-load progress to ensure it's available for the restore effect in AppRoutes
        const saved = localStorage.getItem(getStorageKey(username));
        if (saved) {
            try {
                setProgress(JSON.parse(saved));
            } catch (e) { /* ignore */ }
        } else {
            setProgress({ solvedProblems: [], lastPath: '/' });
        }

        setUser(username);
        localStorage.setItem('andrew_cm1_user', username);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('andrew_cm1_user');
        setProgress({ solvedProblems: [], lastPath: '/' });
        navigate('/');
    };

    const markProblemSolved = (id: number) => {
        if (!user) return;

        setProgress(prev => {
            if (prev.solvedProblems.includes(id)) return prev;

            const newProgress = {
                ...prev,
                solvedProblems: [...prev.solvedProblems, id]
            };
            saveProgress(user, newProgress);
            return newProgress;
        });
    };

    const updateLastPath = (path: string) => {
        if (!user) return;
        // Don't save login page as last path
        if (path === '/login') return;

        setProgress(prev => {
            const newProgress = { ...prev, lastPath: path };
            saveProgress(user, newProgress);
            return newProgress;
        });
    };

    return (
        <UserContext.Provider value={{ user, login, logout, progress, markProblemSolved, updateLastPath }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
