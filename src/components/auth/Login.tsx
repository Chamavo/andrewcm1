
import React, { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';
import { User, ArrowRight } from 'lucide-react';

const Login: React.FC = () => {
    const [inputName, setInputName] = useState('');
    const { login } = useUser();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = inputName.trim();
        if (trimmed) {
            // Enforce "Andrew" if strictly required by prompt "on se connecte avec le prénom Andrew"
            // But usually nice to allow case-insensitive or similar. 
            // Prompt says: "on se connecte avec le prénom Andrew". 
            // I will allow any name for flexibility but maybe pre-fill or suggest Andrew.
            // For now, allow any name, but the user prompt specifically mentions Andrew. 
            // I'll stick to a simple input.

            login(trimmed);
            // Navigation is handled by the "Smart Routing" effect in AppRoutes (restoring session)
            // or we can default to home if no session.
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-md text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <User className="w-10 h-10 text-blue-600" />
                </div>

                <h1 className="text-3xl font-black text-slate-800 mb-2">Bienvenue !</h1>
                <p className="text-slate-500 mb-8">Connecte-toi pour sauvegarder tes progrès</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="text-left">
                        <label className="text-sm font-bold text-slate-700 ml-2 block mb-2">Ton Prénom</label>
                        <input
                            type="text"
                            value={inputName}
                            onChange={(e) => setInputName(e.target.value)}
                            placeholder="Ex: Andrew"
                            className="w-full text-lg p-4 rounded-xl border-2 border-slate-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-slate-700 placeholder:font-normal"
                            autoFocus
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!inputName.trim()}
                        className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl text-xl font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        C'est parti !
                        <ArrowRight className="w-6 h-6" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
