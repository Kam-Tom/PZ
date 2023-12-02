import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import LoginRegister from "./LoginRegister";

function MainPage() {
    const navigate = useNavigate();

    return (
        <Routes>

            <Route
                path="/"
                element={
                    <>
                        <Navbar />
                    </>
                }
            />

            <Route
                path="/login-register"
                element={<LoginRegister />}
            />
        
            <Route
                path="/*"
                element={() => {
                    navigate("/", { replace: true });
                    return null;
                }}
            />
        
        </Routes>
    );
}

export default MainPage;
