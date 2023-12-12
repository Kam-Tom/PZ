import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import LoginRegister from "../Account/LoginRegister";
import AdminPage from "../Admin/AdminPage";

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
                path="/account"
                element={
                    <>
                        <LoginRegister />
                    </>
                }
            />

            <Route
                path="/admin"
                element={
                    <>
                        <AdminPage />
                    </>
                }
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
