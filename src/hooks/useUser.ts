import { useState } from 'react';

/**
 * Hook to manage user information and session.
 * Replaces hardcoded "Andrew" throughout the application.
 */
export const useUser = () => {
    // For now, we keep the default "Andrew" as requested for simpler migration,
    // but centralizing it allows for easy implementation of a login system later.
    const [username, setUsername] = useState('Andrew');

    return {
        username,
        setUsername,
        isGuest: username === 'Andrew',
    };
};
