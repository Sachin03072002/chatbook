import { createContext } from "react";
import { useProvideAuth } from "../hooks";
const inittialState = {
    user: null,
    login: () => { },
    logout: () => { },
    loading: true,
    signup: () => { },
    updateUser: () => { },
};
export const AuthContext = createContext(inittialState);
export const AuthProvider = ({ children }) => {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}