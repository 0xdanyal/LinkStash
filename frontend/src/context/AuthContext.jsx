import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [email, setEmail] = useState(localStorage.getItem('email') || '');

    const login = (token, email) => {
        setToken(token); setEmail(email);
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
    };

    const logout = () => {
        setToken(''); setEmail('');
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    };

    return (
        <AuthContext.Provider value={{ token, email, login, logout, isAuth: !!token }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);