import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_URLL = 'https://task-management-uujy.onrender.com/api/auth';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                loading: false,
            };
        case 'AUTH_ERROR':
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const checkLoggedIn = () => {
            const token = localStorage.getItem('token');
            if (token) {
                dispatch({ type: 'LOGIN_SUCCESS', payload: { token } });
            } else {
                dispatch({ type: 'AUTH_ERROR' });
            }
        };
        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post(`${API_URLL}/login`, { email, password });
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
        } catch (err) {
            console.error('Login error:', err);
            throw err.response?.data?.msg || 'Login failed';
        }
    };

    const register = async (username, email, password) => {
        try {
            const res = await axios.post(`${API_URLL}/register`, { username, email, password });
            dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
        } catch (err) {
            console.error('Register error:', err);
            throw err.response?.data?.msg || 'Registration failed';
        }
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
