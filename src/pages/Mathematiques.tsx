import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LearnerHome from '@/components/maths/LearnerHome';
import ProgressionSection from '@/components/maths/ProgressionSection';
import ComprendreLeMondeSection from '@/components/maths/ComprendreLeMondeSection';
import { getCurrentLevel } from '@/utils/maths/levelBlockingSystem';
import { AppSession, AppView } from '@/types/mathsTypes';

const Mathematiques: React.FC = () => {
    const navigate = useNavigate();
    const [currentView, setCurrentView] = useState<AppView>('home');
    const [session, setSession] = useState<AppSession>({
        username: 'Élève',
        level: 1,
        isTeacher: false,
        role: 'student'
    });

    useEffect(() => {
        // Load initial level from blocking system
        const level = getCurrentLevel('Élève', 'progression');
        setSession(prev => ({ ...prev, level }));
    }, []);

    const handleUpdateSession = (updatedSession: AppSession) => {
        setSession(updatedSession);
    };

    const handleBackToApp = () => {
        navigate('/');
    };

    const renderContent = () => {
        switch (currentView) {
            case 'calcul':
                return (
                    <ProgressionSection
                        session={session}
                        onBack={() => setCurrentView('home')}
                        onLogout={() => { }} // No logout, just stay or back
                        onUpdateSession={handleUpdateSession}
                    />
                );

            case 'monde':
                return (
                    <ComprendreLeMondeSection
                        username={session.username}
                        onBack={() => setCurrentView('home')}
                        onLogout={() => { }}
                    />
                );

            default:
                return (
                    <LearnerHome
                        username={session.username}
                        level={session.level}
                        onSelectCalcul={() => setCurrentView('calcul')}
                        onSelectMonde={() => setCurrentView('monde')}
                        onBackToApp={handleBackToApp}
                    />
                );
        }
    };

    return (
        <div className="min-h-screen">
            {renderContent()}
        </div>
    );
};

export default Mathematiques;
