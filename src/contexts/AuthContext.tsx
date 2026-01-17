import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    handleAuthClick,
    handleSignoutClick,
    getUserProfile,
    initializeGoogleSignIn,
} from '../services/googleCalendarService.native';

export interface UserProfile {
    name: string;
    avatar: string;
    email?: string;
}

interface AuthContextType {
    user: UserProfile | null;
    loading: boolean;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: false,
    login: async () => { },
    logout: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(false);

    // Initialize Google Sign-In on mount & Check for existing session
    useEffect(() => {
        const init = async () => {
            await initializeGoogleSignIn();

            // Check if user is already signed in
            const profile = await getUserProfile();
            if (profile) {
                setUser(profile);
            }
        };
        init();
    }, []);

    const login = async () => {
        setLoading(true);
        try {
            await handleAuthClick();
            const profile = await getUserProfile();
            if (profile) {
                setUser(profile);
            }
        } catch (error) {
            console.error('Login failed', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await handleSignoutClick();
            setUser(null);
        } catch (error) {
            console.error('Logout failed', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
