import {useEffect, useState} from "react";
import {auth, provider} from "../../src/firebase";
import {onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";

export default function AuthPanel() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        return onAuthStateChanged(auth, setUser);
    }, []);

    const handleLogin = async () => {
        await signInWithPopup(auth, provider);
    };

    const handleLogout = async () => {
        await signOut(auth);
    };

    return (
        <div style={{ marginLeft: "auto" }}>
            {user ? (
                <>
                    <span style={{ marginRight: "1em" }}>Zalogowany jako: {user.displayName}</span>
                    <button onClick={handleLogout}>Wyloguj</button>
                </>
            ) : (
                <button onClick={handleLogin}>Zaloguj się</button>
            )}
        </div>
    );
}
