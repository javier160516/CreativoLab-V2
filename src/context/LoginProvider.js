import { createContext, useState, useContext } from "react";

const LoginContext = createContext();

const LoginProvider = ({children}) => {
    const [logueado, setLogueado] = useState(true);

    return <LoginContext.Provider value={{logueado, setLogueado}}>
        {children}
    </LoginContext.Provider>
}

export const useLogin = () => useContext(LoginContext)

export default LoginProvider;