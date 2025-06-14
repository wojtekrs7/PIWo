import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../app/root";
import Home from "../app/routes/home";
import New from "../app/routes/new";
import { AuthProvider } from "../app/Contexts/AuthContext";
import { BooksProvider } from "../app/Contexts/BooksContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <BooksProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App />}>
                            <Route index element={<Home />} />
                            <Route path="new" element={<New />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </BooksProvider>
        </AuthProvider>
    </React.StrictMode>
);
