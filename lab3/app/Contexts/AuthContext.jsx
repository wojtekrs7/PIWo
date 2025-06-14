import {createContext, useContext, useEffect, useState} from "react";
import {auth, provider} from "../../src/firebase";
import {onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        return onAuthStateChanged(auth, setUser);
    }, []);

    const login = () => signInWithPopup(auth, provider);
    const logout = () => signOut(auth);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
