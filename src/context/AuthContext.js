import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        user: null,
    });
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setAuthState({ user: JSON.parse(storedUser) });
        }
        setLoading(false)

    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.get('http://localhost:4000/users', { params: { username, password } });
            console.log(response)
            const user = response.data[0];

            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                setAuthState({ user });
                return true;
            } else {
                console.error('Login failed: user not found');
                return false;
            }
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setAuthState({ user: null });
    };

    const isAdmin = () => {
        return authState.user && authState.user.role === 'admin';
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout, isAdmin }}>
            {loading ? <Loading/> : children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
