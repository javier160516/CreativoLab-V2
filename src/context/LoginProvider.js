import React from 'react';
import { createContext, useState, useContext, useRef, useEffect } from "react";
const LoginContext = createContext();

const LoginProvider = ({ children }) => {
    const [logueado, setLogueado] = useState(false);
    return <LoginContext.Provider value={{ logueado, setLogueado }}>
        {children}
    </LoginContext.Provider>
}

export const useLogin = () => useContext(LoginContext)

export default LoginProvider;