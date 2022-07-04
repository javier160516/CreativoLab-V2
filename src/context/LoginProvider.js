import React from 'react';
import { createContext, useState, useContext, useRef, useEffect } from "react";
import { AppState } from "react-native";
import {Logout} from '../helpers/Logout'
const LoginContext = createContext();

const LoginProvider = ({ children }) => {
    const [logueado, setLogueado] = useState(false);
    const appState = useRef(AppState.currentState);
    useEffect(() => {
        const subscription = AppState.addEventListener("change", nextAppState => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === "active"
            ) {
                setTimeout(async () => {
                    Logout();
                    setLogueado(false);
                }, 36000000)
            }
            appState.current = nextAppState;
        });
        return () => {
            subscription.remove();
        };
    }, []);
    
    return <LoginContext.Provider value={{ logueado, setLogueado }}>
        {children}
    </LoginContext.Provider>
}

export const useLogin = () => useContext(LoginContext)

export default LoginProvider;